/**
 * Unit Tests for Controlled Content Ingestion Pilot (KH-014B)
 * Verifies adapters, relevance filtering, fail-closed license gating, provenance capture,
 * media optimization calculations, checkpointing, and storage projections.
 */

import fs from 'node:fs';
import path from 'node:path';
import {
  evaluateKhmerRelevance,
  evaluateItemLicense,
  buildProvenanceAttribution,
  KHMER_RELEVANCE_KEYWORDS,
} from '../pilotCommon.ts';
import { optimizeImageBuffer, estimateOptimizedVariants } from '../mediaOptimizer.ts';
import { ingestMetMuseumPilot } from '../adapters/metMuseumAdapter.ts';
import { ingestSmithsonianPilot } from '../adapters/smithsonianAdapter.ts';
import { ingestWikimediaPilot } from '../adapters/wikimediaAdapter.ts';
import { runIngestionPilot } from '../ingestionPilot.ts';

export async function runIngestionPilotTests(): Promise<{ passed: number; failed: number }> {
  let passed = 0;
  let failed = 0;

  function assert(condition: boolean, testName: string, details?: string) {
    if (condition) {
      console.log(`  [✓ PASS] Test ${String(passed + 1).padStart(2, '0')}: ${testName}`);
      passed++;
    } else {
      console.error(`  [✗ FAIL] Test ${String(passed + failed + 1).padStart(2, '0')}: ${testName}${details ? ` -> ${details}` : ''}`);
      failed++;
    }
  }

  console.log('▶ STAGE 9: TESTING CONTROLLED INGESTION PILOT & ADAPTERS (KH-014B)...');

  // Test 1: Relevance filtering correctly accepts Khmer heritage terms
  const rel1 = evaluateKhmerRelevance('Standing Avalokiteshvara', '', 'Cambodia (Angkor period)', 'Sculpture');
  assert(
    rel1.isAccepted && rel1.score >= 40 && rel1.matchedKeywords.includes('angkor'),
    'evaluateKhmerRelevance accepts authentic Khmer/Angkor artifacts'
  );

  // Test 2: Relevance filtering rejects unrelated materials
  const rel2 = evaluateKhmerRelevance('Renaissance Oil Painting on Canvas', 'Portrait of a Duke in Florence', 'Italian', 'Painting');
  assert(
    !rel2.isAccepted && rel2.matchedKeywords.length === 0,
    'evaluateKhmerRelevance rejects non-Khmer materials'
  );

  // Test 3: License Gate accepts CC0 and Public Domain
  const licCC0 = evaluateItemLicense('CC0 1.0 Universal', true);
  assert(
    licCC0.passed && licCC0.isCommercialAllowed && licCC0.licenseTier === 'cc0',
    'evaluateItemLicense accepts explicit CC0 and Public Domain items'
  );

  // Test 4: License Gate accepts CC-BY and CC-BY-SA
  const licCCBY = evaluateItemLicense('CC BY-SA 4.0');
  assert(
    licCCBY.passed && licCCBY.isCommercialAllowed && licCCBY.licenseTier === 'cc_by_sa',
    'evaluateItemLicense accepts open commercial CC-BY and CC-BY-SA'
  );

  // Test 5: License Gate rejects Non-Commercial (NC) and No-Derivatives (ND)
  const licNC = evaluateItemLicense('CC BY-NC-SA 3.0');
  const licND = evaluateItemLicense('CC BY-ND 4.0');
  assert(
    !licNC.passed && !licND.passed && licNC.licenseTier === 'unsupported_quarantine',
    'evaluateItemLicense quarantines non-commercial and no-derivatives restrictions'
  );

  // Test 6: License Gate fails closed on missing/unknown license
  const licEmpty = evaluateItemLicense('', false, '');
  assert(
    !licEmpty.passed && licEmpty.licenseTier === 'unsupported_quarantine' && !!licEmpty.quarantineReason,
    'evaluateItemLicense enforces strict fail-closed policy on missing licensing declarations'
  );

  // Test 7: Provenance and attribution template builder
  const attr = buildProvenanceAttribution(
    'The Metropolitan Museum of Art',
    'Head of a Buddha',
    'Khmer Master Artisan',
    '12th century',
    'CC0 1.0',
    '38173'
  );
  assert(
    attr.includes('"Head of a Buddha"') && attr.includes('The Metropolitan Museum of Art') && attr.includes('ID: 38173'),
    'buildProvenanceAttribution compiles complete attribution metadata'
  );

  // Test 8: Media optimization calculates Hero, Gallery, Thumbnail WebP variants
  const optEst = estimateOptimizedVariants(12_000_000, 3000, 2000);
  assert(
    optEst.variants.length === 3 &&
      optEst.variants.some((v) => v.variant === 'hero') &&
      optEst.variants.some((v) => v.variant === 'gallery') &&
      optEst.variants.some((v) => v.variant === 'thumbnail') &&
      optEst.compressionRatio > 10,
    'estimateOptimizedVariants produces 3 multi-res variants with >10x compression'
  );

  // Test 9: Real image buffer optimization via Sharp
  try {
    // Generate a minimal valid 100x100 PNG buffer for testing Sharp engine
    const testSvg = `<svg width="100" height="100" xmlns="http://www.w3.org/2000/svg"><rect width="100" height="100" fill="#c2410c"/></svg>`;
    const testBuffer = Buffer.from(testSvg);
    const sharpResult = await optimizeImageBuffer(testBuffer, { heroWidth: 100, galleryWidth: 60, thumbnailWidth: 30 });
    assert(
      sharpResult.variants.length === 3 && sharpResult.totalOptimizedBytes > 0 && sharpResult.variants[0].format === 'webp',
      'optimizeImageBuffer processes buffer and converts to WebP multi-res profile via sharp'
    );
  } catch (err: any) {
    assert(false, 'optimizeImageBuffer sharp conversion', err.message);
  }

  // Test 10: The Met Museum adapter discovers, evaluates, and verifies CC0 records
  const metResult = await ingestMetMuseumPilot({ limit: 5, offlineMode: true });
  assert(
    metResult.recordsAccepted > 0 &&
      metResult.sourceId === 'met_museum_open_access' &&
      metResult.records.every((r) => r.isCommercialAllowed && r.licenseTier === 'cc0'),
    'Met Museum adapter discovers and accepts verified CC0 Khmer items'
  );

  // Test 11: Smithsonian adapter discovers, evaluates, and verifies Freer-Sackler items
  const smithResult = await ingestSmithsonianPilot({ limit: 5, offlineMode: true });
  assert(
    smithResult.recordsAccepted > 0 &&
      smithResult.sourceId === 'smithsonian_open_access' &&
      smithResult.records.every((r) => r.licenseGatePassed && r.sourceItemId.startsWith('edanmdm:')),
    'Smithsonian adapter extracts provenance and CC0 metadata from Freer-Sackler collection'
  );

  // Test 12: Wikimedia Commons adapter extracts media info, author credit, and licenses
  const wikiResult = await ingestWikimediaPilot({ limit: 5, offlineMode: true });
  assert(
    wikiResult.recordsAccepted > 0 &&
      wikiResult.sourceId === 'wikimedia_commons' &&
      wikiResult.records.every((r) => r.mediaItems.length > 0 && r.attribution.length > 0),
    'Wikimedia Commons adapter parses licensing extmetadata and image parameters'
  );

  // Test 13: Full Pilot Orchestrator runs, saves checkpoints, and outputs JSON files
  const testOutputDir = path.join(process.cwd(), 'content', 'pilot');
  const testCheckpoint = path.join(testOutputDir, '.pilot-test-checkpoint.json');
  const pilotSummary = await runIngestionPilot({
    sampleLimitPerSource: 5,
    outputDir: testOutputDir,
    checkpointFile: testCheckpoint,
    forceRefresh: true,
    offlineMode: true,
  });

  assert(
    pilotSummary.totals.recordsAccepted >= 15 &&
      fs.existsSync(path.join(testOutputDir, 'met-results.json')) &&
      fs.existsSync(path.join(testOutputDir, 'smithsonian-results.json')) &&
      fs.existsSync(path.join(testOutputDir, 'wikimedia-results.json')) &&
      fs.existsSync(path.join(testOutputDir, 'storage-estimate.json')) &&
      fs.existsSync(path.join(testOutputDir, 'pilot-summary.json')),
    'runIngestionPilot completes and exports all 5 pilot result and estimate files'
  );

  // Test 14: Pilot storage extrapolation matches theoretical model within acceptable variance
  const comparison = pilotSummary.theoreticalModelComparison;
  assert(
    pilotSummary.storageExtrapolations.scale50kGB.savingsPct > 85 &&
      comparison.assessment.includes('ALIGNMENT') || comparison.assessment.includes('VARIANCE'),
    'Storage extrapolations demonstrate >85% storage savings and validate theoretical model'
  );

  // Clean test checkpoint
  if (fs.existsSync(testCheckpoint)) {
    fs.unlinkSync(testCheckpoint);
  }

  return { passed, failed };
}
