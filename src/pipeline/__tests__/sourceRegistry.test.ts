import * as fs from 'node:fs';
import * as path from 'node:path';
import {
  SOURCE_CATALOG,
  EXCLUDED_SOURCES,
  getSourceById,
  getSourcesByCrawlPolicy,
  getCommercialAllowedSources,
  isSourceCommercialAllowed,
  validateSourceEntry,
  validateSourceRegistry,
  exportSourceCatalogJson,
} from '../../data/sourceRegistry.ts';
import {
  calculateCorpusProjection,
  generateStandardProjections,
  SourceMediaEstimator,
} from '../sourceEstimator.ts';
import type { SourceCatalogEntry } from '../types.ts';

export interface TestResult {
  name: string;
  passed: boolean;
  durationMs: number;
  error?: string;
}

export interface SourceRegistryTestSuiteReport {
  total: number;
  passed: number;
  failed: number;
  durationMs: number;
  results: TestResult[];
}

export async function runSourceRegistryTestSuite(): Promise<SourceRegistryTestSuiteReport> {
  const startSuite = performance.now();
  const results: TestResult[] = [];

  const runTest = async (name: string, fn: () => Promise<void> | void) => {
    const t0 = performance.now();
    try {
      await fn();
      results.push({
        name,
        passed: true,
        durationMs: +(performance.now() - t0).toFixed(2),
      });
    } catch (err: any) {
      results.push({
        name,
        passed: false,
        durationMs: +(performance.now() - t0).toFixed(2),
        error: err.message || String(err),
      });
    }
  };

  // Test 1: Production Registry Completeness
  await runTest('validateSourceRegistry audits all catalog entries with 0 errors', () => {
    const res = validateSourceRegistry();
    if (!res.valid) {
      throw new Error(`Registry validation failed: ${res.errors.join(', ')}`);
    }
  });

  // Test 2: Required baseline sources
  await runTest('SOURCE_CATALOG includes all required academic, museum, and open sources', () => {
    if (SOURCE_CATALOG.length < 20) {
      throw new Error(`Expected at least 20 verified sources, found ${SOURCE_CATALOG.length}`);
    }
    const required = [
      'efeo',
      'apsara_authority',
      'rufa_phnom_penh',
      'unesco_whc',
      'national_museum_cambodia',
      'center_for_khmer_studies',
      'mcfa_cambodia',
      'buddhist_institute_cambodia',
      'met_museum_open_access',
      'smithsonian_open_access',
      'musee_guimet',
      'british_library_eap',
      'library_of_congress',
      'gallica_bnf',
      'wikimedia_commons',
      'internet_archive',
      'persee_befeo',
      'bophana_center',
      'smithsonian_folkways',
      'khmer_heritage_in_house',
    ];
    for (const req of required) {
      const src = getSourceById(req);
      if (!src) throw new Error(`Required source ID ${req} not found in catalog`);
      if (!src.officialUrl.startsWith('http')) throw new Error(`Invalid officialUrl for ${req}`);
    }
  });

  // Test 3: Unique IDs
  await runTest('All source IDs are strictly unique', () => {
    const ids = SOURCE_CATALOG.map((s) => s.id);
    const unique = new Set(ids);
    if (unique.size !== ids.length) {
      throw new Error(`Duplicate IDs detected in catalog: ${ids.length} vs ${unique.size}`);
    }
  });

  // Test 4: CC0 & Public Domain Commercial Verification
  await runTest('CC0 sources (The Met, Smithsonian) permit unrestricted commercial use', () => {
    const met = getSourceById('met_museum_open_access');
    if (!met || met.commercialUse !== 'unrestricted' || met.licenseModel !== 'cc0') {
      throw new Error('Met Museum source configuration invalid for CC0');
    }
    const si = getSourceById('smithsonian_open_access');
    if (!si || si.commercialUse !== 'unrestricted' || si.licenseModel !== 'cc0') {
      throw new Error('Smithsonian source configuration invalid for CC0');
    }
    if (!isSourceCommercialAllowed('met_museum_open_access') || !isSourceCommercialAllowed('smithsonian_open_access')) {
      throw new Error('isSourceCommercialAllowed returned false for CC0 source');
    }
  });

  // Test 5: Attribution Templates
  await runTest('Attribution templates exist for all sources requiring attribution', () => {
    for (const source of SOURCE_CATALOG) {
      if (source.attributionRequired && (!source.attributionTemplate || source.attributionTemplate.length < 5)) {
        throw new Error(`Source ${source.id} requires attribution but has invalid template`);
      }
    }
  });

  // Test 6: Non-Commercial and Restricted Sources Flagged
  await runTest('Non-commercial and restricted sources are correctly isolated', () => {
    const bl = getSourceById('british_library_eap');
    if (!bl || bl.commercialUse !== 'non_commercial_only') {
      throw new Error('British Library EAP must be flagged as non_commercial_only');
    }
    const guimet = getSourceById('musee_guimet');
    if (!guimet || guimet.commercialUse !== 'paid_license_required' || guimet.redistributionPolicy !== 'prohibited') {
      throw new Error('Musée Guimet must be flagged with commercial restrictions');
    }
  });

  // Test 7: Excluded Sources List
  await runTest('EXCLUDED_SOURCES contains prohibited aggregators with legal rationale', () => {
    if (EXCLUDED_SOURCES.length < 5) {
      throw new Error(`Expected at least 5 excluded sources, found ${EXCLUDED_SOURCES.length}`);
    }
    const pinterest = EXCLUDED_SOURCES.find((s) => s.name === 'Pinterest');
    if (!pinterest || !pinterest.reason.includes('Terms of Service')) {
      throw new Error('Pinterest exclusion rationale missing or invalid');
    }
  });

  // Test 8: Storage Projections Math
  await runTest('Storage projections calculate >85% reduction across all scales', () => {
    const projections = generateStandardProjections();
    for (const [key, p] of Object.entries(projections)) {
      if (p.savingsPercent < 85) {
        throw new Error(`Scale ${key} projection savings ${p.savingsPercent}% is less than 85%`);
      }
      if (p.scenarioAOriginalGB <= p.scenarioBOptimizedGB) {
        throw new Error(`Scale ${key} Scenario A must exceed Scenario B`);
      }
    }
  });

  // Test 9: Estimator Checkpoint & Resumability
  await runTest('SourceMediaEstimator samples and generates valid checkpoint', async () => {
    const testPath = path.join(process.cwd(), 'content', '.runner-test-checkpoint.json');
    if (fs.existsSync(testPath)) fs.unlinkSync(testPath);

    const estimator = new SourceMediaEstimator({
      offlineMode: true,
      checkpointFilePath: testPath,
    });

    const met = getSourceById('met_museum_open_access')!;
    const res = await estimator.sampleSource(met);
    if (!res || res.mediaDiscovered === 0 || !fs.existsSync(testPath)) {
      if (fs.existsSync(testPath)) fs.unlinkSync(testPath);
      throw new Error('Sampling or checkpoint write failed');
    }
    fs.unlinkSync(testPath);
  });

  // Test 10: JSON Export
  await runTest('exportSourceCatalogJson outputs valid parsed structure', () => {
    const str = exportSourceCatalogJson();
    const parsed = JSON.parse(str);
    if (!parsed.sources || parsed.sources.length !== SOURCE_CATALOG.length) {
      throw new Error('Exported JSON structure mismatch');
    }
  });

  const endSuite = performance.now();
  const passed = results.filter((r) => r.passed).length;
  const failed = results.filter((r) => !r.passed).length;

  return {
    total: results.length,
    passed,
    failed,
    durationMs: +(endSuite - startSuite).toFixed(2),
    results,
  };
}
