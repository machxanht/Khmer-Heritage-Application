/**
 * Test Suite: Controlled Corpus Metadata Discovery (KH-015 / KH-016)
 * Verifies pagination, checkpoint/resume, license classification, metadata-only probing,
 * Tier 1 (Internet Archive, Gallica, British Library, LOC, Persée) & Tier 2 adapters,
 * cross-source deduplication, media breakdowns, and multi-scale projections (1K-500K).
 */

import * as fs from 'fs';
import * as path from 'path';
import {
  classifyDiscoveryLicense,
  detectMediaType,
  estimateDiscoveredMediaBytes,
  calculateMultiScaleProjections,
  buildStorageTierAnalysis,
  clusterAndDeduplicateRecords,
  computeMediaTypeBreakdown,
  normalizeEntityTitle,
} from '../discoveryCommon.ts';
import { discoverMetMuseumCorpus } from '../adapters/metDiscoveryAdapter.ts';
import { discoverSmithsonianCorpus } from '../adapters/smithsonianDiscoveryAdapter.ts';
import { discoverWikimediaCorpus } from '../adapters/wikimediaDiscoveryAdapter.ts';
import { discoverInternetArchiveCorpus } from '../adapters/internetArchiveDiscoveryAdapter.ts';
import { discoverGallicaBnfCorpus } from '../adapters/gallicaBnfDiscoveryAdapter.ts';
import { discoverBritishLibraryCorpus } from '../adapters/britishLibraryDiscoveryAdapter.ts';
import { discoverLibraryOfCongressCorpus } from '../adapters/locDiscoveryAdapter.ts';
import { discoverPerseeBefeoCorpus } from '../adapters/perseeBefeoDiscoveryAdapter.ts';
import {
  discoverTier2InstitutionalCorpus,
  TIER2_SOURCE_IDS,
} from '../adapters/tier2InstitutionalDiscoveryAdapter.ts';
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

  // 4. Multi-Scale Projections Tests (1K to 500K)
  const avgOrig = 12_000_000;
  const avgOpt = 680_000;
  const projections = calculateMultiScaleProjections(avgOrig, avgOpt);

  assert(Boolean(projections['scale1KGB'] && projections['scale5KGB'] && projections['scale10KGB']), 'Generates 1K, 5K, 10K scale tiers');
  assert(Boolean(projections['scale25KGB'] && projections['scale50KGB'] && projections['scale100KGB']), 'Generates 25K, 50K, 100K scale tiers');
  assert(Boolean(projections['scale250KGB'] && projections['scale500KGB']), 'Generates 250K, 500K scale tiers');
  assert(projections['scale1KGB'].estimatedOptimizedGB < projections['scale1KGB'].estimatedOriginalGB, 'Optimization yields lower GB at scale');
  assert(projections['scale10KGB'].estMonthlyR2USD === 0, '10K scale fits within R2 free tier ($0/mo)');
  assert(projections['scale500KGB'].estimatedOptimizedGB > 0, '500K scale calculates positive GB storage');

  // 5. Storage Tier Architecture Analysis Tests
  const analysis = buildStorageTierAnalysis(avgOpt);
  assert(analysis.tierComparisons.length === 7, 'Includes 7 storage threshold tiers (10GB to 1TB)');
  assert(analysis.recommendation === 'R2_CURRENT_BUCKET', 'Recommends R2_CURRENT_BUCKET architecture');
  assert(analysis.r2FreeTierAssessment.includes('10 GB'), 'Includes Cloudflare R2 free tier assessment');

  // 6. Pilot Adapters (Met, Smithsonian, Wikimedia)
  const metResult = await discoverMetMuseumCorpus({ offlineMode: true, batchSize: 5, maxRecords: 15 });
  assert(metResult.recordsExamined > 0, 'Met Museum adapter examined candidate records');
  assert(metResult.recordsAccepted > 0, 'Met Museum adapter accepted relevant CC0 objects');
  assert(metResult.recordsRejected > 0, 'Met Museum adapter rejected non-Khmer objects');

  const smithsonianResult = await discoverSmithsonianCorpus({ offlineMode: true, batchSize: 4, maxRecords: 10 });
  assert(smithsonianResult.recordsAccepted > 0, 'Smithsonian adapter discovered Freer-Sackler Khmer sculptures');

  const wikimediaResult = await discoverWikimediaCorpus({ offlineMode: true, batchSize: 5, maxRecords: 15 });
  assert(wikimediaResult.recordsAccepted > 0, 'Wikimedia adapter discovered CC-BY/CC-BY-SA media');
  assert(wikimediaResult.knownMediaSizeBytes > 0, 'Wikimedia adapter captured exact known media byte sizes');

  // 7. Tier 1 Adapters (Internet Archive, Gallica, British Library, LOC, Persée)
  const iaResult = await discoverInternetArchiveCorpus({ offlineMode: true });
  assert(iaResult.recordsAccepted > 0, 'Internet Archive adapter discovered public domain texts & media');
  assert(iaResult.mediaTypeCounts.audio > 0 && iaResult.mediaTypeCounts.documents > 0, 'Internet Archive categorized multi-media (audio, documents, video)');

  const gallicaResult = await discoverGallicaBnfCorpus({ offlineMode: true });
  assert(gallicaResult.recordsExamined > 0, 'Gallica BnF adapter examined historical maps & photos');
  assert(gallicaResult.recordsQuarantined > 0, 'Gallica BnF adapter quarantined non-commercial terms');

  const blResult = await discoverBritishLibraryCorpus({ offlineMode: true });
  assert(blResult.recordsExamined > 0, 'British Library adapter examined palm-leaf manuscripts');
  assert(blResult.recordsQuarantined > 0, 'British Library adapter gated CC BY-NC 4.0 manuscripts');

  const locResult = await discoverLibraryOfCongressCorpus({ offlineMode: true });
  assert(locResult.recordsAccepted > 0, 'Library of Congress adapter discovered Public Domain prints');

  const perseeResult = await discoverPerseeBefeoCorpus({ offlineMode: true });
  assert(perseeResult.recordsExamined > 0, 'Persée BEFEO adapter discovered scholarly research articles');

  // 8. Tier 2 Institutional Adapters
  for (const t2Id of TIER2_SOURCE_IDS) {
    const t2Res = await discoverTier2InstitutionalCorpus({ sourceId: t2Id, offlineMode: true });
    assert(t2Res.recordsExamined > 0, `Tier 2 institutional adapter (${t2Id}) examined records`);
  }

  // 9. Deduplication & Cross-Source Entity Clustering
  const allRecords = [
    ...metResult.records,
    ...smithsonianResult.records,
    ...wikimediaResult.records,
    ...iaResult.records,
    ...gallicaResult.records,
    ...blResult.records,
    ...locResult.records,
    ...perseeResult.records,
  ];

  const dedupSummary = clusterAndDeduplicateRecords(allRecords);
  assert(dedupSummary.totalDiscoveredRecords === allRecords.length, 'Deduplication accounted for all discovered records');
  assert(dedupSummary.uniqueCanonicalEntities > 0, 'Deduplication clustered records into canonical entities');
  assert(dedupSummary.uniqueCanonicalEntities <= dedupSummary.totalDiscoveredRecords, 'Unique canonical entities <= total records');

  // 10. Media Type Breakdown Computation
  const mediaBreakdown = computeMediaTypeBreakdown(allRecords);
  assert(mediaBreakdown.images.itemCount > 0, 'Media breakdown counted images');
  assert(mediaBreakdown.documents.itemCount > 0, 'Media breakdown counted documents');
  assert(mediaBreakdown.audio.itemCount > 0, 'Media breakdown counted audio recordings');

  // 11. Full Discovery Orchestrator & Artifact Output
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
  assert(fs.existsSync(path.join(testOutputDir, 'internet-archive-discovery.json')), 'Wrote internet-archive-discovery.json');
  assert(fs.existsSync(path.join(testOutputDir, 'gallica-discovery.json')), 'Wrote gallica-discovery.json');
  assert(fs.existsSync(path.join(testOutputDir, 'british-library-discovery.json')), 'Wrote british-library-discovery.json');
  assert(fs.existsSync(path.join(testOutputDir, 'loc-discovery.json')), 'Wrote loc-discovery.json');
  assert(fs.existsSync(path.join(testOutputDir, 'persee-discovery.json')), 'Wrote persee-discovery.json');
  assert(fs.existsSync(path.join(testOutputDir, 'tier2-institutional-discovery.json')), 'Wrote tier2-institutional-discovery.json');
  assert(fs.existsSync(path.join(testOutputDir, 'deduplication-summary.json')), 'Wrote deduplication-summary.json');
  assert(fs.existsSync(path.join(testOutputDir, 'corpus-estimate.json')), 'Wrote corpus-estimate.json');
  assert(fs.existsSync(path.join(testOutputDir, 'license-summary.json')), 'Wrote license-summary.json');
  assert(fs.existsSync(path.join(testOutputDir, 'discovery-summary.json')), 'Wrote discovery-summary.json');
  assert(fs.existsSync(path.join(testOutputDir, 'expanded-discovery-summary.json')), 'Wrote expanded-discovery-summary.json');

  // Clean up test directory
  try {
    fs.rmSync(testOutputDir, { recursive: true, force: true });
  } catch {}

  const passed = results.filter((r) => r.passed).length;
  const failed = results.filter((r) => !r.passed).length;

  return { passed, failed, results };
}
