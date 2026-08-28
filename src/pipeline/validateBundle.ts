/**
 * JSON Content Bundle Validator
 * Validates the exported production content bundle in `content/v1/`
 * Asserts structural completeness, schema compliance, referential integrity, and cryptographic hash validity.
 */

import * as fs from 'node:fs';
import * as path from 'node:path';
import { defaultSourcesRegistry } from '../data/sources.ts';
import { Category, DataManifest, EntrySummary, HeritageEntry } from '../types/schema.ts';
import { computeCorpusHash } from './exporter.ts';
import { BundleValidationReport, VALID_CATEGORIES, ValidationIssue } from './types.ts';
import { validateHeritageEntry } from './validator.ts';

export interface ValidateBundleOptions {
  bundleDir?: string;
  strictLocales?: boolean;
}

export function validateContentBundle(
  options: ValidateBundleOptions = {}
): BundleValidationReport {
  const bundleDir = options.bundleDir || path.resolve(process.cwd(), 'content/v1');
  const errors: ValidationIssue[] = [];
  const warnings: ValidationIssue[] = [];

  let manifestValid = false;
  let categoriesValid = false;
  let indexValid = false;
  let entriesAuditedCount = 0;
  let entriesValidCount = 0;
  let computedContentHash = '';
  let manifestContentHash = '';
  let hashMatches = false;

  // 1. Validate manifest.json
  const manifestPath = path.join(bundleDir, 'manifest.json');
  let manifest: DataManifest | null = null;

  if (!fs.existsSync(manifestPath)) {
    errors.push({
      field: 'manifest.json',
      code: 'MANIFEST_MISSING',
      message: `Manifest file missing at path: ${manifestPath}`,
      severity: 'error',
    });
  } else {
    try {
      const manifestRaw = fs.readFileSync(manifestPath, 'utf-8');
      manifest = JSON.parse(manifestRaw) as DataManifest;
      manifestContentHash = manifest.contentHash || '';

      if (manifest.schemaVersion !== 1) {
        errors.push({
          field: 'manifest.schemaVersion',
          code: 'INVALID_SCHEMA_VERSION',
          message: `Expected schemaVersion to be 1, found ${manifest.schemaVersion}`,
          severity: 'error',
          receivedValue: manifest.schemaVersion,
        });
      }

      if (manifest.entriesCount !== 16) {
        errors.push({
          field: 'manifest.entriesCount',
          code: 'INVALID_ENTRIES_COUNT',
          message: `Expected 16 entries in manifest, found ${manifest.entriesCount}`,
          severity: 'error',
          receivedValue: manifest.entriesCount,
        });
      }

      if (manifest.categoriesCount !== 12) {
        errors.push({
          field: 'manifest.categoriesCount',
          code: 'INVALID_CATEGORIES_COUNT',
          message: `Expected 12 categories in manifest, found ${manifest.categoriesCount}`,
          severity: 'error',
          receivedValue: manifest.categoriesCount,
        });
      }

      if (!manifest.contentHash || !manifest.contentHash.startsWith('sha256-')) {
        errors.push({
          field: 'manifest.contentHash',
          code: 'INVALID_CONTENT_HASH_FORMAT',
          message: `Content hash must start with 'sha256-', found ${manifest.contentHash}`,
          severity: 'error',
          receivedValue: manifest.contentHash,
        });
      }

      manifestValid = errors.filter((e) => e.field.startsWith('manifest')).length === 0;
    } catch (e: any) {
      errors.push({
        field: 'manifest.json',
        code: 'MANIFEST_CORRUPTED_JSON',
        message: `Failed to parse manifest.json: ${e?.message}`,
        severity: 'error',
      });
    }
  }

  // 2. Validate categories.json
  const categoriesPath = path.join(bundleDir, 'categories.json');
  let categories: Category[] = [];

  if (!fs.existsSync(categoriesPath)) {
    errors.push({
      field: 'categories.json',
      code: 'CATEGORIES_FILE_MISSING',
      message: `Categories file missing at path: ${categoriesPath}`,
      severity: 'error',
    });
  } else {
    try {
      const rawCategories = fs.readFileSync(categoriesPath, 'utf-8');
      categories = JSON.parse(rawCategories);

      if (!Array.isArray(categories)) {
        errors.push({
          field: 'categories.json',
          code: 'CATEGORIES_NOT_ARRAY',
          message: 'categories.json must contain a JSON array',
          severity: 'error',
        });
      } else {
        if (categories.length !== 12) {
          errors.push({
            field: 'categories.json',
            code: 'CATEGORIES_COUNT_MISMATCH',
            message: `Expected exactly 12 cultural categories, found ${categories.length}`,
            severity: 'error',
            receivedValue: categories.length,
          });
        }

        const validCatSet = new Set<string>(VALID_CATEGORIES);
        categories.forEach((cat, idx) => {
          if (!cat.id || !validCatSet.has(cat.id)) {
            errors.push({
              field: `categories[${idx}].id`,
              code: 'INVALID_CATEGORY_ID',
              message: `Unknown category ID '${cat.id}' in categories.json`,
              severity: 'error',
              receivedValue: cat.id,
            });
          }
          if (!cat.title?.km || !cat.title?.en || !cat.title?.vi || !cat.title?.th) {
            errors.push({
              field: `categories[${idx}].title`,
              code: 'CATEGORY_INCOMPLETE_LOCALES',
              message: `Category '${cat.id}' missing required localized titles`,
              severity: 'error',
            });
          }
        });

        categoriesValid = errors.filter((e) => e.field.startsWith('categories')).length === 0;
      }
    } catch (e: any) {
      errors.push({
        field: 'categories.json',
        code: 'CATEGORIES_CORRUPTED_JSON',
        message: `Failed to parse categories.json: ${e?.message}`,
        severity: 'error',
      });
    }
  }

  // 3. Validate entries/index.json
  const indexPath = path.join(bundleDir, 'entries', 'index.json');
  let indexSummaries: EntrySummary[] = [];

  if (!fs.existsSync(indexPath)) {
    errors.push({
      field: 'entries/index.json',
      code: 'INDEX_FILE_MISSING',
      message: `Entry index file missing at path: ${indexPath}`,
      severity: 'error',
    });
  } else {
    try {
      const rawIndex = fs.readFileSync(indexPath, 'utf-8');
      indexSummaries = JSON.parse(rawIndex);

      if (!Array.isArray(indexSummaries)) {
        errors.push({
          field: 'entries/index.json',
          code: 'INDEX_NOT_ARRAY',
          message: 'entries/index.json must contain a JSON array',
          severity: 'error',
        });
      } else {
        if (indexSummaries.length !== 16) {
          errors.push({
            field: 'entries/index.json',
            code: 'INDEX_COUNT_MISMATCH',
            message: `Expected exactly 16 entry summaries in index.json, found ${indexSummaries.length}`,
            severity: 'error',
            receivedValue: indexSummaries.length,
          });
        }

        indexSummaries.forEach((summary, idx) => {
          if (!summary.id) {
            errors.push({
              field: `entries/index[${idx}].id`,
              code: 'SUMMARY_MISSING_ID',
              message: `Entry summary at index ${idx} missing id`,
              severity: 'error',
            });
          }
          if (!summary.slug) {
            errors.push({
              field: `entries/index[${idx}].slug`,
              code: 'SUMMARY_MISSING_SLUG',
              message: `Entry summary at index ${idx} missing slug`,
              severity: 'error',
            });
          }
          if (!summary.coverMedia || !summary.coverMedia.id || !summary.coverMedia.url) {
            errors.push({
              field: `entries/index[${idx}].coverMedia`,
              code: 'SUMMARY_INVALID_COVER_MEDIA',
              message: `Entry summary '${summary.id}' has invalid coverMedia`,
              severity: 'error',
            });
          }
        });

        indexValid = errors.filter((e) => e.field.startsWith('entries/index')).length === 0;
      }
    } catch (e: any) {
      errors.push({
        field: 'entries/index.json',
        code: 'INDEX_CORRUPTED_JSON',
        message: `Failed to parse entries/index.json: ${e?.message}`,
        severity: 'error',
      });
    }
  }

  // 4. Validate Individual Entry Detail JSON Files
  const entriesDir = path.join(bundleDir, 'entries');
  const allParsedEntries: HeritageEntry[] = [];
  const knownEntryIds = new Set<string>(indexSummaries.map((s) => s.id));

  if (fs.existsSync(entriesDir)) {
    for (const summary of indexSummaries) {
      const entryFilePath = path.join(entriesDir, `${summary.id}.json`);
      entriesAuditedCount++;

      if (!fs.existsSync(entryFilePath)) {
        errors.push({
          field: `entries/${summary.id}.json`,
          code: 'ENTRY_FILE_MISSING',
          message: `Entry detail JSON file missing: ${entryFilePath}`,
          severity: 'error',
        });
        continue;
      }

      try {
        const rawEntry = fs.readFileSync(entryFilePath, 'utf-8');
        const entryObj: HeritageEntry = JSON.parse(rawEntry);
        allParsedEntries.push(entryObj);

        // Run full schema and academic citation validator on the parsed JSON entry
        const entryReport = validateHeritageEntry(entryObj, knownEntryIds, {
          strictLocales: options.strictLocales,
          sourcesRegistry: defaultSourcesRegistry,
        });

        if (entryReport.isValid) {
          entriesValidCount++;
        } else {
          entryReport.errors.forEach((err) => {
            errors.push({
              ...err,
              field: `entries/${summary.id}.json -> ${err.field}`,
            });
          });
        }

        entryReport.warnings.forEach((warn) => {
          warnings.push({
            ...warn,
            field: `entries/${summary.id}.json -> ${warn.field}`,
          });
        });
      } catch (e: any) {
        errors.push({
          field: `entries/${summary.id}.json`,
          code: 'ENTRY_CORRUPTED_JSON',
          message: `Failed to parse JSON for entry ${summary.id}: ${e?.message}`,
          severity: 'error',
        });
      }
    }
  }

  // 5. Verify Cryptographic Content Hash
  if (categories.length > 0 && allParsedEntries.length === 16) {
    const rawHash = computeCorpusHash(categories, allParsedEntries);
    computedContentHash = `sha256-${rawHash}`;
    hashMatches = computedContentHash === manifestContentHash;

    if (!hashMatches) {
      errors.push({
        field: 'manifest.contentHash',
        code: 'CONTENT_HASH_MISMATCH',
        message: `Content hash in manifest (${manifestContentHash}) does not match computed bundle hash (${computedContentHash})`,
        severity: 'error',
        receivedValue: manifestContentHash,
      });
    }
  }

  return {
    timestamp: new Date().toISOString(),
    bundleDir,
    manifestValid: manifestValid && hashMatches,
    categoriesValid,
    indexValid,
    entriesAuditedCount,
    entriesValidCount,
    totalErrors: errors.length,
    totalWarnings: warnings.length,
    errors,
    warnings,
    computedContentHash,
    manifestContentHash,
    hashMatches,
  };
}
