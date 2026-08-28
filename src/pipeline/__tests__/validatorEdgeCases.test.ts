/**
 * Khmer Heritage — Validation Edge Cases & Security Guardrails Test Suite
 * Asserts that malformed, corrupted, or non-compliant content records are strictly rejected by the validator.
 * 100% offline, pure deterministic unit tests.
 */

import { HeritageEntry } from '../../types/schema.ts';
import { sampleEntries } from '../../data/sampleEntries.ts';
import { defaultSourcesRegistry } from '../../data/sources.ts';
import { validateHeritageCorpus, validateHeritageEntry, validateSourceRecord } from '../validator.ts';

export interface TestCaseResult {
  name: string;
  category: string;
  passed: boolean;
  expectedErrorCode: string;
  foundErrorCode?: string;
  errorDetails?: string;
}

export function runValidationEdgeCasesSuite(): {
  total: number;
  passed: number;
  failed: number;
  results: TestCaseResult[];
} {
  const results: TestCaseResult[] = [];
  const baseEntry: HeritageEntry = JSON.parse(JSON.stringify(sampleEntries[0]));

  function assertRejection(
    name: string,
    category: string,
    mutator: (entry: HeritageEntry) => void,
    expectedErrorCode: string
  ) {
    const testEntry: HeritageEntry = JSON.parse(JSON.stringify(baseEntry));
    mutator(testEntry);
    const report = validateHeritageEntry(testEntry, new Set(['e-bayon', 'e-angkor-wat', 'e-angkor-thom']));
    
    const foundError = report.errors.find((e) => e.code === expectedErrorCode);
    const passed = !!foundError && !report.isValid;

    results.push({
      name,
      category,
      passed,
      expectedErrorCode,
      foundErrorCode: foundError?.code || (report.errors[0]?.code ?? 'NO_ERROR_FOUND'),
      errorDetails: foundError?.message || report.errors[0]?.message,
    });
  }

  function assertCorpusRejection(
    name: string,
    category: string,
    entriesGenerator: () => HeritageEntry[],
    expectedErrorCode: string
  ) {
    const entries = entriesGenerator();
    const report = validateHeritageCorpus(entries, { sourcesRegistry: defaultSourcesRegistry });
    
    let found = false;
    let foundCode: string | undefined;

    // Check entry errors
    for (const r of report.entryResults) {
      const err = r.errors.find((e) => e.code === expectedErrorCode);
      if (err) {
        found = true;
        foundCode = err.code;
        break;
      }
    }

    // Check corpus duplicate array if applicable
    if (!found && expectedErrorCode === 'DUPLICATE_ID' && report.duplicateIds.length > 0) {
      found = true;
      foundCode = 'DUPLICATE_ID';
    }
    if (!found && expectedErrorCode === 'DUPLICATE_SLUG' && report.duplicateSlugs.length > 0) {
      found = true;
      foundCode = 'DUPLICATE_SLUG';
    }

    results.push({
      name,
      category,
      passed: found,
      expectedErrorCode,
      foundErrorCode: foundCode || 'NO_MATCHING_CODE',
    });
  }

  // 1. Duplicate ID Detection
  assertCorpusRejection(
    'Reject corpus containing duplicate entry IDs',
    'Uniqueness',
    () => [
      { ...baseEntry, id: 'e-dup-01', slug: 'slug-01' },
      { ...baseEntry, id: 'e-dup-01', slug: 'slug-02' },
    ],
    'DUPLICATE_ID'
  );

  // 2. Duplicate Slug Detection
  assertCorpusRejection(
    'Reject corpus containing duplicate URL slugs',
    'Uniqueness',
    () => [
      { ...baseEntry, id: 'e-entry-01', slug: 'same-slug' },
      { ...baseEntry, id: 'e-entry-02', slug: 'same-slug' },
    ],
    'DUPLICATE_SLUG'
  );

  // 3. Broken Related Entry Reference
  assertRejection(
    'Reject entry referencing non-existent relatedEntryIds',
    'Relational Integrity',
    (e) => {
      e.relatedEntryIds = ['e-non-existent-temple-xyz'];
    },
    'RELATED_REF_BROKEN'
  );

  // 4. Empty Source ID in Array
  assertRejection(
    'Reject entry with empty string in sourceIds array',
    'Source & Provenance',
    (e) => {
      e.sourceIds = [''];
    },
    'SOURCE_ID_EMPTY'
  );

  // 5. Unresolved Source ID
  assertRejection(
    'Reject entry referencing unregistered sourceId',
    'Source & Provenance',
    (e) => {
      e.sourceIds = ['src-unregistered-ghost-id-999'];
    },
    'SOURCE_ID_UNRESOLVED'
  );

  // 6. Missing Attribution on CC BY-SA Media
  assertRejection(
    'Reject media asset requiring attribution when attribution string is empty',
    'Licensing Compliance',
    (e) => {
      e.coverMedia.license = 'cc_by_sa';
      e.coverMedia.attribution = '';
    },
    'MEDIA_ATTRIBUTION_MISSING'
  );

  // 7. Invalid Geographic Coordinates (Latitude > 90)
  assertRejection(
    'Reject entry with out-of-range latitude (+120 degrees)',
    'Geographic Integrity',
    (e) => {
      e.coordinates = { latitude: 120.5, longitude: 103.867 };
    },
    'COORDINATE_LAT_INVALID'
  );

  // 8. Invalid Geographic Coordinates (Longitude < -180)
  assertRejection(
    'Reject entry with out-of-range longitude (-200 degrees)',
    'Geographic Integrity',
    (e) => {
      e.coordinates = { latitude: 13.4125, longitude: -200.0 };
    },
    'COORDINATE_LNG_INVALID'
  );

  // 9. Missing Required Khmer Localized String
  assertRejection(
    'Reject entry when primary title.km is missing or empty',
    'Multilingual Completeness',
    (e) => {
      e.title.km = '';
    },
    'LOCALE_KM_REQUIRED'
  );

  // 10. Missing Required English Localized String
  assertRejection(
    'Reject entry when primary title.en is missing or empty',
    'Multilingual Completeness',
    (e) => {
      e.title.en = '';
    },
    'LOCALE_EN_REQUIRED'
  );

  // 11. Invalid Taxonomy Pillar Category
  assertRejection(
    'Reject entry with unapproved categoryId not in 12 canonical pillars',
    'Taxonomy Structure',
    (e) => {
      e.categoryId = 'cyberpunk_futurism';
    },
    'CATEGORY_ID_INVALID'
  );

  // 12. Invalid Media License Enum
  assertRejection(
    'Reject media asset with non-standard license enum string',
    'Licensing Compliance',
    (e) => {
      (e.coverMedia as any).license = 'unrestricted_free_all';
    },
    'MEDIA_LICENSE_INVALID'
  );

  // 13. Invalid Entry Review Status
  assertRejection(
    'Reject entry with invalid reviewStatus',
    'Review Governance',
    (e) => {
      (e as any).reviewStatus = 'ai_hallucinated_unreviewed';
    },
    'ENTRY_REVIEW_STATUS_INVALID'
  );

  // 14. Invalid Source URL in Source Record
  const sourceValidation = validateSourceRecord({
    id: 'src-test-invalid-url',
    type: 'academic_publication',
    title: 'Test Source',
    author: 'Test Author',
    reviewStatus: 'verified_peer_reviewed',
    url: 'not-a-valid-url-format',
  });
  const sourceUrlErr = sourceValidation.errors.find((e) => e.code === 'SOURCE_URL_INVALID');
  results.push({
    name: 'Reject source record with malformed URL scheme',
    category: 'Source & Provenance',
    passed: !!sourceUrlErr,
    expectedErrorCode: 'SOURCE_URL_INVALID',
    foundErrorCode: sourceUrlErr?.code || 'NO_ERROR_FOUND',
  });

  const passed = results.filter((r) => r.passed).length;
  const failed = results.length - passed;

  return {
    total: results.length,
    passed,
    failed,
    results,
  };
}

// Direct CLI Execution
if (import.meta.url === `file://${process.argv[1]}` || process.argv.includes('--run-edge-cases')) {
  console.log('='.repeat(70));
  console.log('  KHMER HERITAGE — VALIDATION EDGE CASES & GUARDRAILS AUDIT');
  console.log('='.repeat(70));

  const { total, passed, failed, results } = runValidationEdgeCasesSuite();

  results.forEach((r, idx) => {
    const symbol = r.passed ? '✓ PASS' : '✗ FAIL';
    console.log(`[${symbol}] Test ${String(idx + 1).padStart(2, '0')}: ${r.name}`);
    console.log(`         Category: ${r.category} | Expected: ${r.expectedErrorCode} | Received: ${r.foundErrorCode}`);
  });

  console.log('\n' + '-'.repeat(70));
  console.log(`  EDGE CASES SUMMARY: ${passed}/${total} PASSED (${failed} FAILED)`);
  console.log('='.repeat(70));

  if (failed > 0) {
    process.exit(1);
  }
}
