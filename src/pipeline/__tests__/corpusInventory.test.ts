/**
 * Khmer Heritage — Verified Corpus Inventory & Storage Baseline Test Suite (KH-017)
 * Validates 14-source inventory counts, query deduplication, license gating,
 * production eligibility, media-type storage footprints, R2/B2 cost models, and artifact exports.
 */

import * as fs from 'fs';
import * as path from 'path';
import {
  compileCorpusInventory,
  exportCorpusInventoryArtifacts,
  calculateR2MonthlyCost,
  calculateB2MonthlyCost,
  VERIFIED_SOURCE_INVENTORIES,
  STANDARD_DISCOVERY_QUERIES,
  STORAGE_UNIT_METRICS,
} from '../corpusInventory.ts';

export interface InventoryTestCaseResult {
  test: string;
  passed: boolean;
  message?: string;
}

export interface InventoryTestSuiteReport {
  passed: number;
  failed: number;
  total: number;
  results: InventoryTestCaseResult[];
  durationMs: number;
}

export async function runCorpusInventoryTests(): Promise<InventoryTestSuiteReport> {
  const startTime = performance.now();
  const results: InventoryTestCaseResult[] = [];

  function assert(name: string, condition: boolean, failMsg?: string) {
    results.push({
      test: name,
      passed: condition,
      message: condition ? undefined : failMsg || 'Assertion failed',
    });
  }

  try {
    // 1. Source Inventory Coverage (All 14 Sources)
    const sourceIds = Object.keys(VERIFIED_SOURCE_INVENTORIES);
    assert('Inventory covers exactly 14 approved sources', sourceIds.length === 14, `Found ${sourceIds.length} sources`);

    const requiredSources = [
      'met_museum_open_access',
      'smithsonian_open_access',
      'wikimedia_commons',
      'internet_archive',
      'gallica_bnf',
      'british_library_eap',
      'library_of_congress',
      'persee_befeo',
      'national_museum_cambodia',
      'apsara_authority',
      'efeo',
      'center_for_khmer_studies',
      'buddhist_institute',
      'mcfa_cambodia',
    ];

    for (const reqId of requiredSources) {
      assert(`Source ${reqId} is defined with verified metadata`, !!VERIFIED_SOURCE_INVENTORIES[reqId]);
    }

    // 2. Query Strategy & Multi-Query Deduplication
    assert('Standard discovery query list contains required core keywords', STANDARD_DISCOVERY_QUERIES.length >= 10);
    assert('Query list includes "Khmer"', STANDARD_DISCOVERY_QUERIES.includes('Khmer'));
    assert('Query list includes "Cambodia"', STANDARD_DISCOVERY_QUERIES.includes('Cambodia'));
    assert('Query list includes "Angkor"', STANDARD_DISCOVERY_QUERIES.includes('Angkor'));
    assert('Query list includes "Khmer sculpture"', STANDARD_DISCOVERY_QUERIES.includes('Khmer sculpture'));

    // Check Met Museum query deduplication logic
    const metInv = VERIFIED_SOURCE_INVENTORIES['met_museum_open_access'];
    const metSumQueries = metInv.queryCounts.reduce((acc, q) => acc + q.count, 0);
    assert(
      'Met Museum deduplicated query count is less than raw sum of query counts',
      metInv.deduplicatedQueryTotal.count < metSumQueries,
      `Deduplicated ${metInv.deduplicatedQueryTotal.count} vs sum ${metSumQueries}`
    );
    assert('Met Museum discovery mechanism is MEASURED_API_COUNT', metInv.discoveryMechanism === 'MEASURED_API_COUNT');

    // 3. License Inventory & Production Eligibility
    const master = compileCorpusInventory();
    assert('Master compilation succeeds without error', !!master && master.task === 'KH-017');
    assert('Master global totalDiscovered is greater than 100,000 items', master.globalCorpusSummary.totalDiscovered.value > 100000);
    assert('Master global productionEligible is > 40,000 items', master.globalCorpusSummary.productionEligible.value > 40000);
    assert('Master global quarantined is > 70,000 items', master.globalCorpusSummary.quarantined.value > 70000);

    // Sum of production eligible + quarantined + rejected + unknown equals total discovered
    const sumCategories =
      master.globalCorpusSummary.productionEligible.value +
      master.globalCorpusSummary.quarantined.value +
      master.globalCorpusSummary.rejected.value +
      master.globalCorpusSummary.unknown.value;
    assert(
      'Sum of production eligible, quarantined, rejected, and unknown matches total discovered',
      sumCategories === master.globalCorpusSummary.totalDiscovered.value,
      `Sum: ${sumCategories}, Total: ${master.globalCorpusSummary.totalDiscovered.value}`
    );

    // Fail-Closed Licensing Checks for Non-Commercial and Institutional Repositories
    const gallicaInv = master.sourceInventories['gallica_bnf'];
    assert('Gallica BnF production eligible is 0 due to Non-Commercial condition', gallicaInv.productionEligible.count === 0);
    assert('Gallica BnF items are 100% quarantined', gallicaInv.quarantined.count === gallicaInv.deduplicatedQueryTotal.count);

    const blInv = master.sourceInventories['british_library_eap'];
    assert('British Library EAP production eligible is 0 due to CC BY-NC 4.0', blInv.productionEligible.count === 0);
    assert('British Library EAP manuscripts are 100% quarantined', blInv.quarantined.count === blInv.deduplicatedQueryTotal.count);

    const efeoInv = master.sourceInventories['efeo'];
    assert('EFEO production eligible is 0 due to institutional authorization requirement', efeoInv.productionEligible.count === 0);

    const metProdEligible = master.sourceInventories['met_museum_open_access'].productionEligible.count;
    assert('Met Museum items are 100% production eligible under CC0', metProdEligible === metInv.deduplicatedQueryTotal.count);

    const wikimediaProdEligible = master.sourceInventories['wikimedia_commons'].productionEligible.count;
    assert('Wikimedia Commons has > 25,000 production eligible open assets', wikimediaProdEligible > 25000);

    // 4. Data Classification Tagging (MEASURED vs ESTIMATED vs PROJECTED)
    assert('Total discovered is classified as MEASURED', master.globalCorpusSummary.totalDiscovered.classification === 'MEASURED');
    assert('Production eligible is classified as MEASURED', master.globalCorpusSummary.productionEligible.classification === 'MEASURED');
    assert('Deduplicated entities is classified as ESTIMATED', master.globalCorpusSummary.deduplicatedEntities.classification === 'ESTIMATED');
    assert('Known original storage is classified as MEASURED', master.globalCorpusSummary.knownOriginalStorageBytes.classification === 'MEASURED');
    assert('Estimated optimized storage is classified as ESTIMATED', master.globalCorpusSummary.estimatedOptimizedStorageGB.classification === 'ESTIMATED');

    // 5. Media-Type Breakdown & Compression Modeling
    const mediaBreakdown = master.mediaInventory.breakdown;
    assert('Media inventory contains images, audio, video, documents', !!mediaBreakdown.images && !!mediaBreakdown.audio && !!mediaBreakdown.video && !!mediaBreakdown.documents);
    assert('Image compression ratio is empirical ~18.39x', mediaBreakdown.images.compressionRatio === 18.39);
    assert('Audio compression ratio is empirical 6.50x', mediaBreakdown.audio.compressionRatio === 6.50);
    assert('Video compression ratio is empirical 4.00x', mediaBreakdown.video.compressionRatio === 4.00);
    assert('Document compression ratio is empirical 1.80x', mediaBreakdown.documents.compressionRatio === 1.80);
    assert('Audio compression is distinct from Image compression ratio', mediaBreakdown.audio.compressionRatio !== mediaBreakdown.images.compressionRatio);

    // 6. Storage Baseline Scenarios (Conservative, Expected, Optimized)
    const storageBaseline = master.storageBaseline;
    assert('Storage baseline includes Conservative scenario', !!storageBaseline.baselineScenarios.conservative);
    assert('Storage baseline includes Expected scenario', !!storageBaseline.baselineScenarios.expected);
    assert('Storage baseline includes Optimized scenario', !!storageBaseline.baselineScenarios.optimized);

    const conservativeRaw = storageBaseline.baselineScenarios.conservative.totalCorpusRawGB;
    const expectedRaw = storageBaseline.baselineScenarios.expected.totalCorpusRawGB;
    const optimizedGB = storageBaseline.baselineScenarios.optimized.totalCorpusOptimizedGB;

    assert(
      'Conservative raw storage exceeds expected raw storage',
      conservativeRaw > expectedRaw,
      `Conservative: ${conservativeRaw} GB, Expected: ${expectedRaw} GB`
    );
    assert(
      'Optimized storage is significantly smaller than expected raw storage',
      optimizedGB < expectedRaw,
      `Optimized: ${optimizedGB} GB, Expected Raw: ${expectedRaw} GB`
    );
    assert(
      'Optimized storage savings percentage is > 65%',
      storageBaseline.baselineScenarios.optimized.storageSavingsPercent > 65,
      `Savings: ${storageBaseline.baselineScenarios.optimized.storageSavingsPercent}%`
    );

    // 7. Multi-Scale Projections (10K, 25K, 50K, 100K, 250K, 500K, 1M)
    const projections = storageBaseline.scaleProjections;
    assert('Projections include all 7 required scale tiers', projections.length === 7);

    const proj10k = projections.find((p) => p.scaleLabel === '10K');
    assert('10K projection exists', !!proj10k);
    assert('10K projection has correct item count 10,000', proj10k?.itemCount === 10000);
    assert('10K projection is classified as PROJECTED', proj10k?.isMeasuredOrProjected === 'PROJECTED');

    const proj1M = projections.find((p) => p.scaleLabel === '1M');
    assert('1M projection exists with 1,000,000 items', proj1M?.itemCount === 1000000);
    assert('1M raw storage exceeds 15,000 GB', (proj1M?.rawStorageGB || 0) > 15000);

    // 8. Cloudflare R2 & Backblaze B2 Cost Calculations
    // 10 GB Free Tier check
    assert('R2 cost for 8 GB storage is $0.00 (within 10 GB free tier)', calculateR2MonthlyCost(8.0) === 0.0);
    assert('R2 cost for 10 GB storage is $0.00 (exact free tier limit)', calculateR2MonthlyCost(10.0) === 0.0);
    assert('R2 cost for 20 GB storage is $0.15 (10 GB billable * $0.015)', calculateR2MonthlyCost(20.0) === 0.15);
    assert('R2 cost for 110 GB storage is $1.50 (100 GB billable * $0.015)', calculateR2MonthlyCost(110.0) === 1.5);

    assert('B2 cost for 8 GB storage is $0.00 (within 10 GB free tier)', calculateB2MonthlyCost(8.0) === 0.0);
    assert('B2 cost for 20 GB storage is $0.06 (10 GB billable * $0.006)', calculateB2MonthlyCost(20.0) === 0.06);

    // 9. Architecture Recommendations (Primary + 2 Alternatives)
    const archRecs = storageBaseline.architectureRecommendations;
    assert('Primary recommendation is Cloudflare R2 Single-Tier', archRecs.primary.name.includes('Cloudflare R2'));
    assert('Primary recommendation has detailed rationale', archRecs.primary.rationale.length > 50);
    assert('Alternative 1 is Hybrid R2 + B2 Cold Archival', archRecs.alternative1.name.includes('Hybrid'));
    assert('Alternative 2 is B2 Primary with Cloudflare CDN', archRecs.alternative2.name.includes('Backblaze B2'));

    // 10. Checkpoint & Artifact Generation Verification
    const testOutputDir = path.join(process.cwd(), 'content', 'discovery');
    const exportedFiles = exportCorpusInventoryArtifacts(master, testOutputDir);
    assert('Export generated exactly 6 inventory artifacts', exportedFiles.length === 6);

    const requiredArtifacts = [
      'source-inventory.json',
      'production-eligible-inventory.json',
      'media-inventory.json',
      'license-inventory.json',
      'deduplication-inventory.json',
      'storage-baseline.json',
    ];

    for (const artName of requiredArtifacts) {
      const artPath = path.join(testOutputDir, artName);
      assert(`Artifact ${artName} exists on disk`, fs.existsSync(artPath));
      const content = JSON.parse(fs.readFileSync(artPath, 'utf-8'));
      assert(`Artifact ${artName} contains valid JSON data`, !!content);
    }
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : String(err);
    assert('Corpus inventory test suite ran without uncaught fatal exceptions', false, message);
  }

  const durationMs = +(performance.now() - startTime).toFixed(2);
  const passed = results.filter((r) => r.passed).length;
  const failed = results.filter((r) => !r.passed).length;

  return {
    passed,
    failed,
    total: results.length,
    results,
    durationMs,
  };
}
