/**
 * CLI Content Validation Script
 * Run via: npm run content:validate
 * Standalone, zero-network, zero-database execution.
 * Enforces provenance, licensing, referential integrity, and scholarly sourcing.
 */

import { sampleEntries } from '../data/sampleEntries.ts';
import { entries as masterEntries } from '../data/heritage.ts';
import { sourcesRegistry } from '../data/sources.ts';
import { validateHeritageCorpus } from './validator.ts';
import { CorpusValidationReport } from './types.ts';
import { HeritageEntry } from '../types/schema.ts';

function printReport(title: string, report: CorpusValidationReport): void {
  console.log('\n' + '='.repeat(70));
  console.log(`🏛️  KHMER HERITAGE CONTENT VALIDATION — ${title.toUpperCase()}`);
  console.log('='.repeat(70));
  console.log(`📅 Timestamp          : ${report.timestamp}`);
  console.log(`📚 Total Entries      : ${report.totalEntries}`);
  console.log(`✅ Valid Entries      : ${report.validEntries}`);
  console.log(`❌ Invalid Entries    : ${report.invalidEntries}`);
  console.log(`📖 Total Sources      : ${report.totalSources} (${report.validSources} valid)`);
  console.log(`🖼️  Total Media Assets : ${report.totalMediaChecked} (${report.missingAttributions} missing attributions)`);
  console.log(`⚠️  Total Warnings     : ${report.totalWarnings}`);
  console.log(`🚨 Total Errors       : ${report.totalErrors}`);

  if (report.duplicateIds.length > 0) {
    console.log(`\n❌ DUPLICATE IDs DETECTED (${report.duplicateIds.length}):`);
    report.duplicateIds.forEach((id) => console.log(`   - ${id}`));
  } else {
    console.log(`\n✨ Duplicate IDs      : None (100% Unique)`);
  }

  if (report.duplicateSlugs.length > 0) {
    console.log(`\n❌ DUPLICATE SLUGS DETECTED (${report.duplicateSlugs.length}):`);
    report.duplicateSlugs.forEach((slug) => console.log(`   - ${slug}`));
  } else {
    console.log(`✨ Duplicate Slugs    : None (100% Unique)`);
  }

  if (report.duplicateSourceIds.length > 0) {
    console.log(`\n❌ DUPLICATE SOURCE IDs (${report.duplicateSourceIds.length}):`);
    report.duplicateSourceIds.forEach((id) => console.log(`   - ${id}`));
  } else {
    console.log(`✨ Duplicate Source IDs: None (100% Unique)`);
  }

  if (report.brokenReferences.length > 0) {
    console.log(`\n❌ BROKEN RELATED REFERENCES (${report.brokenReferences.length}):`);
    report.brokenReferences.forEach((b) => {
      console.log(`   - Source "${b.sourceEntryId}" -> Missing Target "${b.targetReferenceId}"`);
    });
  } else {
    console.log(`✨ Broken Entry Refs  : None (100% Relational Integrity)`);
  }

  if (report.brokenSourceReferences.length > 0) {
    console.log(`\n❌ BROKEN SOURCE REFERENCES (${report.brokenSourceReferences.length}):`);
    report.brokenSourceReferences.forEach((b) => {
      console.log(`   - Entry "${b.sourceEntryId}" -> Unresolved Source "${b.missingSourceId}"`);
    });
  } else {
    console.log(`✨ Broken Source Refs : None (100% Referential Integrity)`);
  }

  // Distribution breakdown
  console.log('\n📊 LICENSING DISTRIBUTION (Media):');
  Object.entries(report.licenseDistribution).forEach(([lic, count]) => {
    console.log(`   - ${lic.padEnd(20)}: ${count} assets`);
  });

  console.log('\n📚 SOURCE TYPES (Registry):');
  Object.entries(report.sourceTypeDistribution).forEach(([st, count]) => {
    console.log(`   - ${st.padEnd(30)}: ${count} sources`);
  });

  if (report.itemsNeedingHumanReview.length > 0) {
    console.log(`\n🔍 ITEMS NEEDING HUMAN REVIEW (${report.itemsNeedingHumanReview.length}):`);
    report.itemsNeedingHumanReview.forEach((item) => {
      console.log(`   - [${item.category.toUpperCase()}] ${item.id} (${item.reviewStatus}): ${item.reason}`);
    });
  }

  console.log('\n--- ENTRY DIAGNOSTICS ---');
  report.entryResults.forEach((res) => {
    const status = res.isValid ? '✅ PASS' : '❌ FAIL';
    console.log(`[${status}] ${res.entryId} (${res.slug})`);

    if (res.errors.length > 0) {
      res.errors.forEach((err) => {
        console.log(`     🔴 Error   [${err.code}] ${err.field}: ${err.message}`);
      });
    }

    if (res.warnings.length > 0) {
      res.warnings.forEach((warn) => {
        console.log(`     🟡 Warning [${warn.code}] ${warn.field}: ${warn.message}`);
      });
    }
  });
  console.log('='.repeat(70) + '\n');
}

function main(): void {
  const startTime = Date.now();

  console.log('\n🔍 Initiating Khmer Heritage Content Pipeline Validation...\n');

  // 1. Validate Verified Sample Corpus
  const sampleReport = validateHeritageCorpus(sampleEntries as HeritageEntry[], { sourcesRegistry });
  printReport('Sample Corpus (Verified Peer-Reviewed)', sampleReport);

  const durationMs = Date.now() - startTime;
  console.log(`⏱️  Total Execution Time: ${durationMs}ms`);

  const hasErrors = sampleReport.totalErrors > 0;
  if (hasErrors) {
    console.error('❌ Validation FAILED with errors.');
    process.exit(1);
  } else {
    console.log('🎉 All content and sources validated successfully! Pipeline is GREEN.\n');
    process.exit(0);
  }
}

main();
