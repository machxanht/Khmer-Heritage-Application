/**
 * Khmer Heritage — Unified Content Pipeline & Corpus Test Runner
 * Executes:
 *  1. Production Sample Corpus Validation (Deterministic offline integrity)
 *  2. Scalability & Performance Benchmarks (10 -> 100 entries)
 *  3. Edge Cases & Validation Guardrails (14 test cases)
 */

import { sampleEntries } from '../data/sampleEntries.ts';
import { defaultSourcesRegistry } from '../data/sources.ts';
import { validateHeritageCorpus } from './validator.ts';
import { runScalabilityBenchmark } from './scalabilityTest.ts';
import { runValidationEdgeCasesSuite } from './__tests__/validatorEdgeCases.test.ts';
import { exportContentBundle } from './exporter.ts';
import { validateContentBundle } from './validateBundle.ts';
import { runR2ProviderTestSuite } from '../services/providers/__tests__/r2Provider.test.ts';
import { runOfflineCacheTests } from '../services/providers/__tests__/offlineCache.test.ts';
import { runDeployR2Tests } from './__tests__/deployR2.test.ts';
import { runSourceRegistryTestSuite } from './__tests__/sourceRegistry.test.ts';
import { runIngestionPilotTests } from './__tests__/ingestionPilot.test.ts';
import { runDiscoveryCrawlerTests } from './__tests__/discoveryCrawler.test.ts';

export async function runAllPipelineAudits(): Promise<boolean> {
  const overallStart = performance.now();
  console.log('╔═══════════════════════════════════════════════════════════════════════════╗');
  console.log('║           KHMER HERITAGE — CONTENT PIPELINE & CORPUS READINESS            ║');
  console.log('╚═══════════════════════════════════════════════════════════════════════════╝\n');

  // STAGE 1: Current Sample Corpus Validation
  console.log('▶ STAGE 1: AUDITING PRODUCTION VERIFIED CORPUS...');
  const corpusStart = performance.now();
  const report = validateHeritageCorpus(sampleEntries, { sourcesRegistry: defaultSourcesRegistry });
  const corpusEnd = performance.now();
  const corpusMs = +(corpusEnd - corpusStart).toFixed(2);

  console.log(`  • Verified Entries:       ${report.validEntries}/${report.totalEntries}`);
  console.log(`  • Verified Source Records: ${report.validSources}/${report.totalSources}`);
  console.log(`  • Media Assets Audited:   ${report.totalMediaChecked}`);
  console.log(`  • Total Validation Errors: ${report.totalErrors}`);
  console.log(`  • Total Warnings:          ${report.totalWarnings}`);
  console.log(`  • Broken Reference Count:  ${report.brokenReferences.length}`);
  console.log(`  • Broken Source Ref Count: ${report.brokenSourceReferences.length}`);
  console.log(`  • Execution Time:          ${corpusMs} ms\n`);

  if (report.totalErrors > 0) {
    console.error('❌ STAGE 1 FAILED: Errors found in production verified corpus!');
    return false;
  }

  // STAGE 2: Validation Edge Cases & Security Guardrails
  console.log('▶ STAGE 2: EXECUTING VALIDATION EDGE CASES & GUARDRAILS...');
  const edgeCaseResults = runValidationEdgeCasesSuite();
  edgeCaseResults.results.forEach((r, idx) => {
    const symbol = r.passed ? '✓ PASS' : '✗ FAIL';
    console.log(`  [${symbol}] Test ${String(idx + 1).padStart(2, '0')}: ${r.name} (${r.expectedErrorCode})`);
  });
  console.log(`  • Result: ${edgeCaseResults.passed}/${edgeCaseResults.total} assertions passed.\n`);

  if (edgeCaseResults.failed > 0) {
    console.error(`❌ STAGE 2 FAILED: ${edgeCaseResults.failed} edge cases failed!`);
    return false;
  }

  // STAGE 3: Scalability & Performance Benchmarking
  console.log('▶ STAGE 3: RUNNING CORPUS SCALABILITY BENCHMARKS (10 to 100 entries)...');
  const sizes = [10, 25, 50, 100];
  const benchmarkResults = sizes.map((size) => runScalabilityBenchmark(size));

  console.log('  ┌─────────┬──────────────┬──────────────┬──────────────┬──────────────┬──────────────┐');
  console.log('  │ Corpus  │ Normalization│ Validation   │ Provider Map │ 1,000 Search │ Throughput   │');
  console.log('  ├─────────┼──────────────┼──────────────┼──────────────┼──────────────┼──────────────┤');
  benchmarkResults.forEach((b) => {
    const sizeStr = `${b.fixtureSize} items`.padEnd(7);
    const normStr = `${b.normalizationMs} ms`.padEnd(12);
    const valStr = `${b.validationMs} ms`.padEnd(12);
    const provStr = `${b.providerEmulationMs} ms`.padEnd(12);
    const searchStr = `${b.searchBenchmarkTotalMs} ms`.padEnd(12);
    const tpStr = `${b.totalThroughputEntriesPerSec} ent/s`.padEnd(12);
    console.log(`  │ ${sizeStr} │ ${normStr} │ ${valStr} │ ${provStr} │ ${searchStr} │ ${tpStr} │`);
  });
  console.log('  └─────────┴──────────────┴──────────────┴──────────────┴──────────────┴──────────────┘\n');

  // STAGE 4: Production Content Bundle Export & Integrity Audit
  console.log('▶ STAGE 4: EXPORTING & AUDITING PRODUCTION CONTENT BUNDLE (content/v1/)...');
  const bundleExportStart = performance.now();
  const exportResult = exportContentBundle();
  const bundleReport = validateContentBundle({ bundleDir: exportResult.outputDir });
  const bundleEnd = performance.now();
  const bundleMs = +(bundleEnd - bundleExportStart).toFixed(2);

  console.log(`  • Exported Files:          ${exportResult.exportedFiles.length}`);
  console.log(`  • Manifest Valid:          ${bundleReport.manifestValid ? '✓ PASS' : '✗ FAIL'}`);
  console.log(`  • Categories Valid:        ${bundleReport.categoriesValid ? '✓ PASS' : '✗ FAIL'} (${bundleReport.categoriesValid ? '12/12' : 'FAIL'})`);
  console.log(`  • Index Valid:             ${bundleReport.indexValid ? '✓ PASS' : '✗ FAIL'} (16 summaries)`);
  console.log(`  • Entry Details Audited:   ${bundleReport.entriesValidCount}/${bundleReport.entriesAuditedCount} valid`);
  console.log(`  • Content Hash (SHA-256):  ${bundleReport.computedContentHash}`);
  console.log(`  • Hash Match Verified:     ${bundleReport.hashMatches ? '✓ PASS' : '✗ FAIL'}`);
  console.log(`  • Bundle Errors / Warnings: ${bundleReport.totalErrors} / ${bundleReport.totalWarnings}`);
  console.log(`  • Execution Time:          ${bundleMs} ms\n`);

  if (bundleReport.totalErrors > 0) {
    console.error(`❌ STAGE 4 FAILED: ${bundleReport.totalErrors} errors found in production content bundle!`);
    bundleReport.errors.forEach((err) => console.error(`    - ${err.field}: ${err.message}`));
    return false;
  }

  // STAGE 5: Cloudflare R2 / Remote Content Provider Suite
  console.log('▶ STAGE 5: TESTING R2 CONTENT PROVIDER & REMOTE INGESTION LAYER...');
  const r2Report = await runR2ProviderTestSuite();
  r2Report.results.forEach((r, idx) => {
    const symbol = r.passed ? '✓ PASS' : '✗ FAIL';
    console.log(`  [${symbol}] [${r.suite}] Test ${String(idx + 1).padStart(2, '0')}: ${r.name} (${r.durationMs} ms)`);
  });
  console.log(`  • Result: ${r2Report.passed}/${r2Report.total} R2 provider test cases passed in ${r2Report.durationMs} ms.\n`);

  if (r2Report.failed > 0) {
    console.error(`❌ STAGE 5 FAILED: ${r2Report.failed} R2 provider test cases failed!`);
    r2Report.results
      .filter((r) => !r.passed)
      .forEach((r) => console.error(`    - [${r.suite}] ${r.name}: ${r.error}`));
    return false;
  }

  // STAGE 6: Offline Cache & Resilient Fallback Layer
  console.log('▶ STAGE 6: TESTING OFFLINE CACHE, CORRUPTION RECOVERY & FALLBACK CHAIN...');
  const offlineReport = await runOfflineCacheTests();
  offlineReport.results.forEach((r, idx) => {
    const symbol = r.passed ? '✓ PASS' : '✗ FAIL';
    console.log(`  [${symbol}] Test ${String(idx + 1).padStart(2, '0')}: ${r.name} (${r.durationMs} ms)`);
  });
  console.log(`  • Result: ${offlineReport.passed}/${offlineReport.total} offline cache tests passed.\n`);

  if (offlineReport.failed > 0) {
    console.error(`❌ STAGE 6 FAILED: ${offlineReport.failed} offline cache test cases failed!`);
    offlineReport.results
      .filter((r) => !r.passed)
      .forEach((r) => console.error(`    - ${r.name}: ${r.error}`));
    return false;
  }

  // STAGE 7: Cloudflare R2 Deployment Pipeline & AWS SigV4 Signer
  console.log('▶ STAGE 7: TESTING R2 DEPLOYMENT ENGINE, CACHE POLICIES & SIGV4 AUTH...');
  const deployReport = await runDeployR2Tests();
  deployReport.results.forEach((r, idx) => {
    const symbol = r.passed ? '✓ PASS' : '✗ FAIL';
    console.log(`  [${symbol}] Test ${String(idx + 1).padStart(2, '0')}: ${r.name} (${r.durationMs} ms)`);
  });
  console.log(`  • Result: ${deployReport.passed}/${deployReport.total} R2 deployment tests passed in ${deployReport.durationMs} ms.\n`);

  if (deployReport.failed > 0) {
    console.error(`❌ STAGE 7 FAILED: ${deployReport.failed} R2 deployment test cases failed!`);
    deployReport.results
      .filter((r) => !r.passed)
      .forEach((r) => console.error(`    - ${r.name}: ${r.error}`));
    return false;
  }

  // STAGE 8: Content Source Catalog, Licensing & Media Estimator
  console.log('▶ STAGE 8: AUDITING SCHOLARLY SOURCE REGISTRY, LICENSES & ESTIMATOR...');
  const sourceReport = await runSourceRegistryTestSuite();
  sourceReport.results.forEach((r, idx) => {
    const symbol = r.passed ? '✓ PASS' : '✗ FAIL';
    console.log(`  [${symbol}] Test ${String(idx + 1).padStart(2, '0')}: ${r.name} (${r.durationMs} ms)`);
  });
  console.log(`  • Result: ${sourceReport.passed}/${sourceReport.total} source registry tests passed in ${sourceReport.durationMs} ms.\n`);

  if (sourceReport.failed > 0) {
    console.error(`❌ STAGE 8 FAILED: ${sourceReport.failed} source registry test cases failed!`);
    sourceReport.results
      .filter((r) => !r.passed)
      .forEach((r) => console.error(`    - ${r.name}: ${r.error}`));
    return false;
  }

  // STAGE 9: Controlled Content Ingestion Pilot & Adapters (KH-014B)
  const pilotReport = await runIngestionPilotTests();
  console.log(`  • Result: ${pilotReport.passed}/${pilotReport.passed + pilotReport.failed} pilot tests passed.\n`);

  if (pilotReport.failed > 0) {
    console.error(`❌ STAGE 9 FAILED: ${pilotReport.failed} pilot tests failed!`);
    return false;
  }

  // STAGE 10: Controlled Corpus Metadata Discovery & Scale Projections (KH-015)
  console.log('▶ STAGE 10: DISCOVERY CRAWLER, LICENSE GATES & SCALE PROJECTIONS...');
  const discoveryReport = await runDiscoveryCrawlerTests();
  discoveryReport.results.forEach((r, idx) => {
    const symbol = r.passed ? '✓ PASS' : '✗ FAIL';
    console.log(`  [${symbol}] Test ${String(idx + 1).padStart(2, '0')}: ${r.test}`);
  });
  console.log(`  • Result: ${discoveryReport.passed}/${discoveryReport.passed + discoveryReport.failed} discovery tests passed.\n`);

  if (discoveryReport.failed > 0) {
    console.error(`❌ STAGE 10 FAILED: ${discoveryReport.failed} discovery tests failed!`);
    discoveryReport.results
      .filter((r) => !r.passed)
      .forEach((r) => console.error(`    - ${r.test}: ${r.message}`));
    return false;
  }

  const overallEnd = performance.now();
  const overallMs = +(overallEnd - overallStart).toFixed(2);

  console.log('╔═══════════════════════════════════════════════════════════════════════════╗');
  console.log(`║ ALL 10 AUDIT STAGES PASSED IN ${overallMs.toString().padEnd(6)} ms                                  ║`);
  console.log('║ STATUS: CORPUS, BUNDLE, R2, OFFLINE CACHE, SIGV4, CATALOG, PILOT & DISCOVERY║');
  console.log('╚═══════════════════════════════════════════════════════════════════════════╝\n');

  return true;
}


// Direct Execution
if (import.meta.url === `file://${process.argv[1]}` || process.argv.includes('--run-all')) {
  runAllPipelineAudits().then((passed) => {
    if (!passed) {
      process.exit(1);
    }
  });
}
