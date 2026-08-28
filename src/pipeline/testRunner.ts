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

  const overallEnd = performance.now();
  const overallMs = +(overallEnd - overallStart).toFixed(2);

  console.log('╔═══════════════════════════════════════════════════════════════════════════╗');
  console.log(`║ ALL AUDIT STAGES PASSED IN ${overallMs.toString().padEnd(6)} ms                                     ║`);
  console.log('║ STATUS: CORPUS READINESS CONFIRMED — READY TO SCALE                       ║');
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
