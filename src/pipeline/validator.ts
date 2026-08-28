/**
 * Content Pipeline Validation Layer
 * Pure, deterministic validation engine for Khmer Heritage entries and corpus.
 * Zero external runtime dependencies, 100% offline & standalone.
 * Pipeline Step: SOURCE -> NORMALIZE -> VALIDATE -> CONTENT DATA
 */

import {
  Citation,
  EntrySection,
  HeritageEntry,
  LocalizedString,
  MediaAsset,
} from '../types/schema.ts';
import {
  CorpusValidationReport,
  EntryValidationResult,
  VALID_CATEGORIES,
  VALID_LICENSES,
  VALID_MEDIA_TYPES,
  ValidationIssue,
  ValidationOptions,
} from './types.ts';

/**
 * Validates a localized string structure.
 */
function validateLocalizedString(
  fieldPath: string,
  str: LocalizedString | undefined | null,
  issues: ValidationIssue[],
  options: ValidationOptions = {}
): void {
  if (!str || typeof str !== 'object') {
    issues.push({
      field: fieldPath,
      message: `${fieldPath} must be an object with localized strings.`,
      severity: 'error',
      code: 'LOCALE_OBJECT_MISSING',
    });
    return;
  }

  // Khmer (km) is mandatory
  if (!str.km || typeof str.km !== 'string' || str.km.trim().length === 0) {
    issues.push({
      field: `${fieldPath}.km`,
      message: `${fieldPath}.km (Khmer) is required and must not be empty.`,
      severity: 'error',
      code: 'LOCALE_KM_REQUIRED',
    });
  }

  // English (en) is mandatory
  if (!str.en || typeof str.en !== 'string' || str.en.trim().length === 0) {
    issues.push({
      field: `${fieldPath}.en`,
      message: `${fieldPath}.en (English) is required and must not be empty.`,
      severity: 'error',
      code: 'LOCALE_EN_REQUIRED',
    });
  }

  // Vietnamese (vi) if provided must be non-empty string
  if (str.vi !== undefined) {
    if (typeof str.vi !== 'string' || str.vi.trim().length === 0) {
      issues.push({
        field: `${fieldPath}.vi`,
        message: `${fieldPath}.vi if provided must be a non-empty string.`,
        severity: 'warning',
        code: 'LOCALE_VI_EMPTY',
      });
    }
  } else if (options.strictLocales) {
    issues.push({
      field: `${fieldPath}.vi`,
      message: `${fieldPath}.vi is missing in strict mode.`,
      severity: 'warning',
      code: 'LOCALE_VI_MISSING',
    });
  }

  // Thai (th) if provided must be non-empty string
  if (str.th !== undefined) {
    if (typeof str.th !== 'string' || str.th.trim().length === 0) {
      issues.push({
        field: `${fieldPath}.th`,
        message: `${fieldPath}.th if provided must be a non-empty string.`,
        severity: 'warning',
        code: 'LOCALE_TH_EMPTY',
      });
    }
  } else if (options.strictLocales) {
    issues.push({
      field: `${fieldPath}.th`,
      message: `${fieldPath}.th is missing in strict mode.`,
      severity: 'warning',
      code: 'LOCALE_TH_MISSING',
    });
  }
}

/**
 * Validates a media asset structure and licensing metadata.
 */
function validateMediaAsset(
  fieldPath: string,
  media: MediaAsset | undefined | null,
  issues: ValidationIssue[]
): void {
  if (!media || typeof media !== 'object') {
    issues.push({
      field: fieldPath,
      message: `${fieldPath} is required and must be a valid MediaAsset object.`,
      severity: 'error',
      code: 'MEDIA_ASSET_MISSING',
    });
    return;
  }

  if (!media.id || typeof media.id !== 'string' || media.id.trim().length === 0) {
    issues.push({
      field: `${fieldPath}.id`,
      message: `${fieldPath}.id is required.`,
      severity: 'error',
      code: 'MEDIA_ID_MISSING',
    });
  }

  if (!media.url || typeof media.url !== 'string' || media.url.trim().length === 0) {
    issues.push({
      field: `${fieldPath}.url`,
      message: `${fieldPath}.url is required.`,
      severity: 'error',
      code: 'MEDIA_URL_MISSING',
    });
  }

  if (!media.type || !VALID_MEDIA_TYPES.includes(media.type)) {
    issues.push({
      field: `${fieldPath}.type`,
      message: `${fieldPath}.type must be one of: ${VALID_MEDIA_TYPES.join(', ')}. Received: ${media.type}`,
      severity: 'error',
      code: 'MEDIA_TYPE_INVALID',
      receivedValue: media.type,
    });
  }

  if (!media.license || !VALID_LICENSES.includes(media.license)) {
    issues.push({
      field: `${fieldPath}.license`,
      message: `${fieldPath}.license must be one of: ${VALID_LICENSES.join(', ')}. Received: ${media.license}`,
      severity: 'error',
      code: 'MEDIA_LICENSE_INVALID',
      receivedValue: media.license,
    });
  }

  if (!media.attribution || typeof media.attribution !== 'string' || media.attribution.trim().length === 0) {
    issues.push({
      field: `${fieldPath}.attribution`,
      message: `${fieldPath}.attribution is required for licensing provenance.`,
      severity: 'error',
      code: 'MEDIA_ATTRIBUTION_MISSING',
    });
  }

  validateLocalizedString(`${fieldPath}.title`, media.title, issues);
}

/**
 * Validates a single scholarly content section.
 */
function validateSection(
  fieldPath: string,
  section: EntrySection,
  index: number,
  issues: ValidationIssue[]
): void {
  if (!section || typeof section !== 'object') {
    issues.push({
      field: `${fieldPath}[${index}]`,
      message: `Section at index ${index} must be a valid object.`,
      severity: 'error',
      code: 'SECTION_OBJECT_INVALID',
    });
    return;
  }

  if (!section.id || typeof section.id !== 'string') {
    issues.push({
      field: `${fieldPath}[${index}].id`,
      message: `Section at index ${index} must have a valid string id.`,
      severity: 'error',
      code: 'SECTION_ID_MISSING',
    });
  }

  validateLocalizedString(`${fieldPath}[${index}].heading`, section.heading, issues);
  validateLocalizedString(`${fieldPath}[${index}].body`, section.body, issues);

  if (section.media && Array.isArray(section.media)) {
    section.media.forEach((m: MediaAsset, mIdx: number) => {
      validateMediaAsset(`${fieldPath}[${index}].media[${mIdx}]`, m, issues);
    });
  }
}

/**
 * Validates an academic citation object.
 */
function validateCitation(
  fieldPath: string,
  citation: Citation,
  index: number,
  issues: ValidationIssue[]
): void {
  if (!citation || typeof citation !== 'object') {
    issues.push({
      field: `${fieldPath}[${index}]`,
      message: `Citation at index ${index} must be an object.`,
      severity: 'error',
      code: 'CITATION_OBJECT_INVALID',
    });
    return;
  }

  if (!citation.id || typeof citation.id !== 'string') {
    issues.push({
      field: `${fieldPath}[${index}].id`,
      message: `Citation at index ${index} must have a valid id.`,
      severity: 'error',
      code: 'CITATION_ID_MISSING',
    });
  }

  if (!citation.title || typeof citation.title !== 'string' || citation.title.trim().length === 0) {
    issues.push({
      field: `${fieldPath}[${index}].title`,
      message: `Citation at index ${index} must have a non-empty title.`,
      severity: 'error',
      code: 'CITATION_TITLE_MISSING',
    });
  }

  if (!citation.author || typeof citation.author !== 'string' || citation.author.trim().length === 0) {
    issues.push({
      field: `${fieldPath}[${index}].author`,
      message: `Citation at index ${index} must have a non-empty author or institution.`,
      severity: 'error',
      code: 'CITATION_AUTHOR_MISSING',
    });
  }

  if (citation.year !== undefined) {
    if (typeof citation.year !== 'number' || isNaN(citation.year) || citation.year < 0 || citation.year > 2100) {
      issues.push({
        field: `${fieldPath}[${index}].year`,
        message: `Citation year at index ${index} must be a valid 4-digit calendar year. Received: ${citation.year}`,
        severity: 'warning',
        code: 'CITATION_YEAR_INVALID',
      });
    }
  }
}

/**
 * Validates a single Heritage Entry.
 */
export function validateHeritageEntry(
  entry: HeritageEntry,
  allKnownEntryIds?: Set<string>,
  options: ValidationOptions = {}
): EntryValidationResult {
  const issues: ValidationIssue[] = [];

  // 1. Identity validation
  if (!entry.id || typeof entry.id !== 'string' || entry.id.trim().length === 0) {
    issues.push({
      field: 'id',
      message: 'Entry id is required and cannot be empty.',
      severity: 'error',
      code: 'ENTRY_ID_MISSING',
    });
  } else if (!/^[a-z0-9-_]+$/i.test(entry.id)) {
    issues.push({
      field: 'id',
      message: `Entry id "${entry.id}" must contain only alphanumeric characters, dashes, or underscores.`,
      severity: 'error',
      code: 'ENTRY_ID_FORMAT_INVALID',
      receivedValue: entry.id,
    });
  }

  // 2. Slug validation
  if (!entry.slug || typeof entry.slug !== 'string' || entry.slug.trim().length === 0) {
    issues.push({
      field: 'slug',
      message: 'Entry slug is required.',
      severity: 'error',
      code: 'ENTRY_SLUG_MISSING',
    });
  } else if (!/^[a-z0-9-]+$/i.test(entry.slug)) {
    issues.push({
      field: 'slug',
      message: `Entry slug "${entry.slug}" must be URL-safe (lowercase alphanumeric and hyphens).`,
      severity: 'error',
      code: 'ENTRY_SLUG_FORMAT_INVALID',
      receivedValue: entry.slug,
    });
  }

  // 3. Category validation
  const catId = entry.categoryId || entry.category;
  if (!catId || typeof catId !== 'string') {
    issues.push({
      field: 'categoryId',
      message: 'categoryId is required.',
      severity: 'error',
      code: 'CATEGORY_ID_MISSING',
    });
  } else if (!VALID_CATEGORIES.includes(catId.toLowerCase() as any)) {
    issues.push({
      field: 'categoryId',
      message: `Category "${catId}" is invalid. Must be one of the 12 canonical pillars: ${VALID_CATEGORIES.join(', ')}`,
      severity: 'error',
      code: 'CATEGORY_ID_INVALID',
      receivedValue: catId,
    });
  }

  // 4. Multilingual fields
  validateLocalizedString('title', entry.title, issues, options);
  validateLocalizedString('summary', entry.summary, issues, options);
  validateLocalizedString('era', entry.era, issues, options);

  // 5. Cover Media validation
  validateMediaAsset('coverMedia', entry.coverMedia, issues);

  // 6. Content Sections validation
  if (!entry.content || !Array.isArray(entry.content.sections) || entry.content.sections.length === 0) {
    issues.push({
      field: 'content.sections',
      message: 'Entry must have at least one scholarly section in content.sections.',
      severity: 'error',
      code: 'SECTIONS_EMPTY',
    });
  } else {
    entry.content.sections.forEach((sec, idx) => {
      validateSection('content.sections', sec, idx, issues);
    });
  }

  // 7. Gallery Assets validation
  if (entry.gallery && Array.isArray(entry.gallery)) {
    entry.gallery.forEach((g, idx) => {
      validateMediaAsset(`gallery[${idx}]`, g, issues);
    });
  }

  // 8. Citations & Bibliography validation
  const citations = entry.citations || entry.bibliography || [];
  if (Array.isArray(citations)) {
    citations.forEach((c, idx) => {
      validateCitation('citations', c, idx, issues);
    });
  }

  // 9. Relational integrity (internal check)
  const related = entry.relatedEntryIds || entry.relatedEntries || [];
  if (Array.isArray(related)) {
    related.forEach((relId, idx) => {
      if (typeof relId !== 'string' || relId.trim().length === 0) {
        issues.push({
          field: `relatedEntryIds[${idx}]`,
          message: `Related entry reference at index ${idx} is empty or not a string.`,
          severity: 'error',
          code: 'RELATED_REF_INVALID',
        });
      } else if (relId === entry.id) {
        issues.push({
          field: `relatedEntryIds[${idx}]`,
          message: `Entry references itself in relatedEntryIds: ${relId}`,
          severity: 'warning',
          code: 'RELATED_SELF_REFERENCE',
        });
      } else if (allKnownEntryIds && !allKnownEntryIds.has(relId)) {
        issues.push({
          field: `relatedEntryIds[${idx}]`,
          message: `Referenced related entry "${relId}" does not exist in the loaded corpus.`,
          severity: 'error',
          code: 'RELATED_REF_BROKEN',
          receivedValue: relId,
        });
      }
    });
  }

  // 10. Geographic Coordinates validation (if present)
  const coords = entry.coordinates || entry.location?.coordinates;
  if (coords) {
    if (typeof coords.latitude !== 'number' || isNaN(coords.latitude) || coords.latitude < -90 || coords.latitude > 90) {
      issues.push({
        field: 'coordinates.latitude',
        message: `Latitude must be a valid number between -90 and +90. Received: ${coords.latitude}`,
        severity: 'error',
        code: 'COORDINATE_LAT_INVALID',
        receivedValue: coords.latitude,
      });
    }
    if (typeof coords.longitude !== 'number' || isNaN(coords.longitude) || coords.longitude < -180 || coords.longitude > 180) {
      issues.push({
        field: 'coordinates.longitude',
        message: `Longitude must be a valid number between -180 and +180. Received: ${coords.longitude}`,
        severity: 'error',
        code: 'COORDINATE_LNG_INVALID',
        receivedValue: coords.longitude,
      });
    }
  }

  // 11. Audio Metadata validation (if present)
  if (entry.audioMetadata) {
    const audio = entry.audioMetadata;
    if (audio.tuningHz && Array.isArray(audio.tuningHz)) {
      audio.tuningHz.forEach((freq, fIdx) => {
        if (typeof freq !== 'number' || isNaN(freq) || freq < 20 || freq > 20000) {
          issues.push({
            field: `audioMetadata.tuningHz[${fIdx}]`,
            message: `Acoustic frequency at index ${fIdx} must be a number within audible range (20 Hz - 20,000 Hz). Received: ${freq}`,
            severity: 'warning',
            code: 'AUDIO_FREQUENCY_OUT_OF_RANGE',
            receivedValue: freq,
          });
        }
      });
    }
  }

  const errors = issues.filter((i) => i.severity === 'error');
  const warnings = issues.filter((i) => i.severity === 'warning');

  return {
    entryId: entry.id || 'unknown',
    slug: entry.slug || 'unknown',
    isValid: errors.length === 0,
    errors,
    warnings,
  };
}

/**
 * Validates an entire corpus of Heritage Entries.
 * Checks for duplicate IDs, duplicate slugs, broken cross-references, and individual entry conformity.
 */
export function validateHeritageCorpus(
  entries: HeritageEntry[],
  options: ValidationOptions = {}
): CorpusValidationReport {
  const allEntryIds = new Set<string>();
  const idCounts = new Map<string, number>();
  const slugCounts = new Map<string, number>();

  // Pass 1: Index all IDs and Slugs
  entries.forEach((e) => {
    if (e.id) {
      allEntryIds.add(e.id);
      idCounts.set(e.id, (idCounts.get(e.id) || 0) + 1);
    }
    if (e.slug) {
      slugCounts.set(e.slug, (slugCounts.get(e.slug) || 0) + 1);
    }
  });

  const duplicateIds = Array.from(idCounts.entries())
    .filter(([_, count]) => count > 1)
    .map(([id]) => id);

  const duplicateSlugs = Array.from(slugCounts.entries())
    .filter(([_, count]) => count > 1)
    .map(([slug]) => slug);

  // Pass 2: Validate each entry
  const entryResults: EntryValidationResult[] = entries.map((entry) => {
    const res = validateHeritageEntry(entry, allEntryIds, options);

    // Add duplicate ID / slug errors if applicable
    if (entry.id && duplicateIds.includes(entry.id)) {
      res.errors.push({
        field: 'id',
        message: `Duplicate entry id detected: "${entry.id}" appears in multiple entries.`,
        severity: 'error',
        code: 'DUPLICATE_ID',
      });
      res.isValid = false;
    }
    if (entry.slug && duplicateSlugs.includes(entry.slug)) {
      res.errors.push({
        field: 'slug',
        message: `Duplicate entry slug detected: "${entry.slug}" appears in multiple entries.`,
        severity: 'error',
        code: 'DUPLICATE_SLUG',
      });
      res.isValid = false;
    }

    return res;
  });

  // Broken references collection
  const brokenReferences: Array<{ sourceEntryId: string; targetReferenceId: string }> = [];
  entries.forEach((entry) => {
    const related = entry.relatedEntryIds || entry.relatedEntries || [];
    related.forEach((targetId) => {
      if (!allEntryIds.has(targetId)) {
        brokenReferences.push({
          sourceEntryId: entry.id,
          targetReferenceId: targetId,
        });
      }
    });
  });

  const totalErrors = entryResults.reduce((acc, r) => acc + r.errors.length, 0);
  const totalWarnings = entryResults.reduce((acc, r) => acc + r.warnings.length, 0);
  const validEntries = entryResults.filter((r) => r.isValid).length;

  return {
    timestamp: new Date().toISOString(),
    totalEntries: entries.length,
    validEntries,
    invalidEntries: entries.length - validEntries,
    totalErrors,
    totalWarnings,
    duplicateIds,
    duplicateSlugs,
    brokenReferences,
    entryResults,
  };
}
