/**
 * Test Suite: Controlled Corpus Metadata Discovery (KH-015)
 * Verifies pagination, checkpoint/resume, license classification, metadata-only probing,
 * unknown size estimations, storage aggregation, and scale projections.
 */

import * as fs from 'fs';
import * as path from 'path';
import {
  classifyDiscoveryLicense,
  detectMediaType,
  estimateDiscoveredMediaBytes,
  calculateMultiScaleProjections,
  buildStorageTierAnalysis,
} from '../discoveryCommon.ts';
import { discoverMetMuseumCorpus } from '../adapters/metDiscoveryAdapter.ts';
import { discoverSmithsonianCorpus } from '../adapters/smithsonianDiscoveryAdapter.ts';
import { discoverWikimediaCorpus } from '../adapters/wikimediaDiscoveryAdapter.ts';
import { runDiscoveryCrawler } from '../discoveryCrawler.ts';

export async function runDiscoveryCrawlerTests(): Promise<{
  passed: number;
  failed: number;
  results: Array<{ test: string; passed: boolean; message?: string }>;
}> {
  const results: Array<{ test: string; passed: boolean; message?: string }> = [];

  const assert = (condition: boolean, testName: string, detail?: string) => {
    if (condition) {
      results.push({ test: testName, passed: true });
    } else {
      results.push({ test: testName, passed: false, message: detail || 'Assertion failed' });
    }
  };

  // 1. License Classification Tests
  const cc0 = classifyDiscoveryLicense('CC0-1.0', true);
  assert(cc0.classification === 'ACCEPTABLE' && cc0.isPublicDomain, 'CC0 classified as ACCEPTABLE');

  const ccBySa = classifyDiscoveryLicense('CC-BY-SA 4.0', false);
  assert(ccBySa.classification === 'ACCEPTABLE' && ccBySa.isCommercialAllowed, 'CC-BY-SA classified as ACCEPTABLE');

  const ccByNc = classifyDiscoveryLicense('CC BY-NC 4.0', false);
  assert(ccByNc.classification === 'QUARANTINE' && !ccByNc.isCommercialAllowed, 'CC BY-NC classified as QUARANTINE');

  const arr = classifyDiscoveryLicense('All Rights Reserved', false);
  assert(arr.classification === 'QUARANTINE', 'All Rights Reserved classified as QUARANTINE');

  const emptyLic = classifyDiscoveryLicense('', false);
  assert(emptyLic.classification === 'UNKNOWN', 'Empty license classified as UNKNOWN (fail-closed)');

  // 2. Media Type Detection Tests
  assert(detectMediaType('image/jpeg', 'photo.jpg') === 'images', 'Detects image MIME/extension');
  assert(detectMediaType('audio/ogg', 'music.ogg') === 'audio', 'Detects audio MIME/extension');
  assert(detectMediaType('video/webm', 'dance.webm') === 'video', 'Detects video MIME/extension');
  assert(detectMediaType('application/pdf', 'manuscript.pdf') === 'documents', 'Detects document MIME/extension');

  // 3. Known vs Unknown Size Estimation Tests
  const knownImg = estimateDiscoveredMediaBytes('images', 15_000_000, 4000, 3000);
  assert(knownImg.isSizeKnown && knownImg.estimatedOriginalBytes === 15_000_000, 'Preserves known media byte size');
  assert(knownImg.estimatedOptimizedBytes < knownImg.estimatedOriginalBytes, 'Calculates optimized estimate for known bytes');

  const unknownImg = estimateDiscoveredMediaBytes('images', undefined, 5000, 4000);
  assert(!unknownImg.isSizeKnown && unknownImg.sizeEstimationMethod.includes('ULTRA_HI_RES'), 'Applies empirical model for unknown image size');

  const unknownAudio = estimateDiscoveredMediaBytes('audio', undefined, 0, 0, 180);
  assert(!unknownAudio.isSizeKnown && unknownAudio.sizeEstimationMethod === 'EMPIRICAL_AUDIO_DURATION_MODEL', 'Applies duration model for unknown audio size');

  // 4. Multi-Scale Projections Tests (1K, 5K, 10K, 25K, 50K, 100K)
  const avgOrig = 12_000_000;
  const avgOpt = 680_000;
  const projections = calculateMultiScaleProjections(avgOrig, avgOpt);

  assert(Boolean(projections['scale1KGB'] && projections['scale5KGB'] && projections['scale10KGB']), 'Generates 1K, 5K, 10K scale tiers');
  assert(Boolean(projections['scale25KGB'] && projections['scale50KGB'] && projections['scale100KGB']), 'Generates 25K, 50K, 100K scale tiers');
  assert(projections['scale1KGB'].estimatedOptimizedGB < projections['scale1KGB'].estimatedOriginalGB, 'Optimization yields lower GB at scale');
  assert(projections['scale10KGB'].estMonthlyR2USD === 0, '10K scale fits within R2 free tier ($0/mo)');
  assert(projections['scale100KGB'].estimatedOptimizedGB > 0, '100K scale calculates positive GB storage');

  // 5. Storage Tier Architecture Analysis Tests
  const analysis = buildStorageTierAnalysis(avgOpt);
  assert(analysis.tierComparisons.length === 7, 'Includes 7 storage threshold tiers (10GB to 1TB)');
  assert(analysis.recommendation === 'R2_CURRENT_BUCKET', 'Recommends R2_CURRENT_BUCKET architecture');
  assert(analysis.r2FreeTierAssessment.includes('10 GB'), 'Includes Cloudflare R2 free tier assessment');

  // 6. Met Museum Adapter Discovery & Pagination
  const metResult = await discoverMetMuseumCorpus({ offlineMode: true, batchSize: 5, maxRecords: 15 });
  assert(metResult.recordsExamined > 0, 'Met Museum adapter examined candidate records');
  assert(metResult.recordsAccepted > 0, 'Met Museum adapter accepted relevant CC0 objects');
  assert(metResult.recordsRejected > 0, 'Met Museum adapter rejected non-Khmer objects');
  assert(metResult.recordsQuarantined > 0, 'Met Museum adapter quarantined copyrighted items');
  assert(metResult.paginationInfo.totalPagesChecked > 1, 'Met Museum adapter executed batch pagination');

  // 7. Smithsonian Adapter Discovery
  const smithsonianResult = await discoverSmithsonianCorpus({ offlineMode: true, batchSize: 4, maxRecords: 10 });
  assert(smithsonianResult.recordsAccepted > 0, 'Smithsonian adapter discovered Freer-Sackler Khmer sculptures');
  assert(smithsonianResult.mediaTypeCounts.images > 0, 'Smithsonian adapter categorized images');

  // 8. Wikimedia Commons Adapter Discovery
  const wikimediaResult = await discoverWikimediaCorpus({ offlineMode: true, batchSize: 5, maxRecords: 15 });
  assert(wikimediaResult.recordsAccepted > 0, 'Wikimedia adapter discovered CC-BY/CC-BY-SA media');
  assert(wikimediaResult.mediaTypeCounts.audio > 0, 'Wikimedia adapter discovered and categorized audio');
  assert(wikimediaResult.mediaTypeCounts.documents > 0, 'Wikimedia adapter discovered and categorized manuscripts');
  assert(wikimediaResult.knownMediaSizeBytes > 0, 'Wikimedia adapter captured exact known media byte sizes');

  // 9. Discovery Orchestrator & Checkpoint / Resume
  const testOutputDir = path.join(process.cwd(), 'content', 'discovery-test');
  const testCheckpointFile = path.join(testOutputDir, '.test-checkpoint.json');

  if (fs.existsSync(testOutputDir)) {
    fs.rmSync(testOutputDir, { recursive: true, force: true });
  }

  const discoverySummary = await runDiscoveryCrawler({
    outputDir: testOutputDir,
    checkpointFile: testCheckpointFile,
    offlineMode: true,
    resumeFromCheckpoint: false,
    metOptions: { maxRecords: 10, batchSize: 5 },
    smithsonianOptions: { maxRecords: 8, batchSize: 4 },
    wikimediaOptions: { maxRecords: 12, batchSize: 6 },
  });

  assert(discoverySummary.globalTotals.recordsExamined > 0, 'Orchestrator aggregated examined records across all sources');
  assert(discoverySummary.globalTotals.recordsAccepted > 0, 'Orchestrator aggregated accepted records');
  assert(fs.existsSync(path.join(testOutputDir, 'met-discovery.json')), 'Wrote met-discovery.json');
  assert(fs.existsSync(path.join(testOutputDir, 'smithsonian-discovery.json')), 'Wrote smithsonian-discovery.json');
  assert(fs.existsSync(path.join(testOutputDir, 'wikimedia-discovery.json')), 'Wrote wikimedia-discovery.json');
  assert(fs.existsSync(path.join(testOutputDir, 'corpus-estimate.json')), 'Wrote corpus-estimate.json');
  assert(fs.existsSync(path.join(testOutputDir, 'license-summary.json')), 'Wrote license-summary.json');
  assert(fs.existsSync(path.join(testOutputDir, 'discovery-summary.json')), 'Wrote discovery-summary.json');

  // Verify Checkpoint Resume
  const resumedSummary = await runDiscoveryCrawler({
    outputDir: testOutputDir,
    checkpointFile: testCheckpointFile,
    offlineMode: true,
    resumeFromCheckpoint: true,
  });

  assert(resumedSummary.globalTotals.recordsAccepted === discoverySummary.globalTotals.recordsAccepted, 'Resume loaded existing completed sources without redundant re-crawl');

  // Clean up test directory
  try {
    fs.rmSync(testOutputDir, { recursive: true, force: true });
  } catch {}

  const passed = results.filter((r) => r.passed).length;
  const failed = results.filter((r) => !r.passed).length;

  return { passed, failed, results };
}
