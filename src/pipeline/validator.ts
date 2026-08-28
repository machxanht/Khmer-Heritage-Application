/**
 * Content Pipeline Validation Layer
 * Pure, deterministic validation engine for Khmer Heritage entries and corpus.
 * Zero external runtime dependencies, 100% offline & standalone.
 * Pipeline Step: SOURCE REGISTRY -> NORMALIZE -> VALIDATE -> CONTENT DATA
 */

import {
  Citation,
  EntrySection,
  HeritageEntry,
  LicenseTier,
  LICENSE_LABEL,
  LocalizedString,
  MediaAsset,
  SourceRecord,
} from '../types/schema.ts';
import {
  CorpusValidationReport,
  EntryValidationResult,
  ItemReviewFlag,
  LICENSES_REQUIRING_ATTRIBUTION,
  SourceValidationResult,
  VALID_CATEGORIES,
  VALID_LICENSES,
  VALID_MEDIA_TYPES,
  VALID_REVIEW_STATUSES,
  VALID_SOURCE_TYPES,
  ValidationIssue,
  ValidationOptions,
} from './types.ts';
import { sourcesRegistry as defaultSourcesRegistry } from '../data/sources.ts';

/**
 * Validates a localized string structure.
 */
export function validateLocalizedString(
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
 * Validates a single SourceRecord in the Source Registry.
 */
export function validateSourceRecord(source: SourceRecord): SourceValidationResult {
  const errors: ValidationIssue[] = [];
  const warnings: ValidationIssue[] = [];

  if (!source || typeof source !== 'object') {
    errors.push({
      field: 'source',
      message: 'SourceRecord must be a valid object.',
      severity: 'error',
      code: 'SOURCE_OBJECT_INVALID',
    });
    return {
      sourceId: 'unknown',
      isValid: false,
      errors,
      warnings,
    };
  }

  const id = source.id || '';
  if (!id || typeof id !== 'string' || id.trim().length === 0) {
    errors.push({
      field: 'id',
      message: 'Source id is required.',
      severity: 'error',
      code: 'SOURCE_ID_MISSING',
    });
  } else if (!/^src-[a-z0-9-_]+$/i.test(id)) {
    warnings.push({
      field: 'id',
      message: `Source id "${id}" should ideally follow the convention "src-<author/authority>-<year/code>".`,
      severity: 'warning',
      code: 'SOURCE_ID_CONVENTION',
      receivedValue: id,
    });
  }

  if (!source.type || !VALID_SOURCE_TYPES.includes(source.type)) {
    errors.push({
      field: 'type',
      message: `Source type must be one of: ${VALID_SOURCE_TYPES.join(', ')}. Received: ${source.type}`,
      severity: 'error',
      code: 'SOURCE_TYPE_INVALID',
      receivedValue: source.type,
    });
  }

  if (!source.title || typeof source.title !== 'string' || source.title.trim().length === 0) {
    errors.push({
      field: 'title',
      message: 'Source title is required and cannot be empty.',
      severity: 'error',
      code: 'SOURCE_TITLE_MISSING',
    });
  }

  if (!source.author || typeof source.author !== 'string' || source.author.trim().length === 0) {
    errors.push({
      field: 'author',
      message: 'Source author or issuing institution is required.',
      severity: 'error',
      code: 'SOURCE_AUTHOR_MISSING',
    });
  }

  if (!source.reviewStatus || !VALID_REVIEW_STATUSES.includes(source.reviewStatus)) {
    errors.push({
      field: 'reviewStatus',
      message: `Source reviewStatus must be one of: ${VALID_REVIEW_STATUSES.join(', ')}. Received: ${source.reviewStatus}`,
      severity: 'error',
      code: 'SOURCE_REVIEW_STATUS_INVALID',
      receivedValue: source.reviewStatus,
    });
  }

  if (source.url) {
    if (typeof source.url !== 'string' || !/^(https?:\/\/|\/)/i.test(source.url)) {
      errors.push({
        field: 'url',
        message: `Source URL "${source.url}" must be a valid HTTP/HTTPS URL or relative path.`,
        severity: 'error',
        code: 'SOURCE_URL_INVALID',
        receivedValue: source.url,
      });
    }
  }

  if (source.license && !VALID_LICENSES.includes(source.license)) {
    errors.push({
      field: 'license',
      message: `Source license must be one of: ${VALID_LICENSES.join(', ')}. Received: ${source.license}`,
      severity: 'error',
      code: 'SOURCE_LICENSE_INVALID',
      receivedValue: source.license,
    });
  }

  if (source.license && LICENSES_REQUIRING_ATTRIBUTION.includes(source.license)) {
    if (!source.attribution || source.attribution.trim().length === 0) {
      errors.push({
        field: 'attribution',
        message: `Attribution is required for license tier: ${source.license}`,
        severity: 'error',
        code: 'SOURCE_ATTRIBUTION_MISSING',
      });
    }
  }

  return {
    sourceId: id || 'unknown',
    isValid: errors.length === 0,
    errors,
    warnings,
  };
}

/**
 * Validates a media asset structure, provenance, and licensing metadata.
 */
export function validateMediaAsset(
  fieldPath: string,
  media: MediaAsset | undefined | null,
  issues: ValidationIssue[],
  sourcesRegistry?: Record<string, SourceRecord>
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

  if (media.sourceUrl && typeof media.sourceUrl === 'string' && media.sourceUrl.trim().length > 0) {
    if (!/^(https?:\/\/|\/)/i.test(media.sourceUrl.trim())) {
      issues.push({
        field: `${fieldPath}.sourceUrl`,
        message: `${fieldPath}.sourceUrl "${media.sourceUrl}" must be a valid HTTP/HTTPS URL or relative path.`,
        severity: 'warning',
        code: 'MEDIA_SOURCE_URL_INVALID',
        receivedValue: media.sourceUrl,
      });
    }
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

  // License tier validation
  if (!media.license || !VALID_LICENSES.includes(media.license)) {
    issues.push({
      field: `${fieldPath}.license`,
      message: `${fieldPath}.license must be one of: ${VALID_LICENSES.join(', ')}. Received: ${media.license}`,
      severity: 'error',
      code: 'MEDIA_LICENSE_INVALID',
      receivedValue: media.license,
    });
  }

  // Attribution enforcement for licenses that mandate it
  if (LICENSES_REQUIRING_ATTRIBUTION.includes(media.license)) {
    if (!media.attribution || typeof media.attribution !== 'string' || media.attribution.trim().length === 0) {
      issues.push({
        field: `${fieldPath}.attribution`,
        message: `${fieldPath}.attribution is required for license tier "${media.license}" (${LICENSE_LABEL[media.license] || media.license}).`,
        severity: 'error',
        code: 'MEDIA_ATTRIBUTION_MISSING',
      });
    }
  }

  // Review status validation if provided
  if (media.reviewStatus && !VALID_REVIEW_STATUSES.includes(media.reviewStatus)) {
    issues.push({
      field: `${fieldPath}.reviewStatus`,
      message: `${fieldPath}.reviewStatus must be one of: ${VALID_REVIEW_STATUSES.join(', ')}. Received: ${media.reviewStatus}`,
      severity: 'error',
      code: 'MEDIA_REVIEW_STATUS_INVALID',
      receivedValue: media.reviewStatus,
    });
  }

  // Creator & Provenance enforcement
  if (!media.creator || typeof media.creator !== 'string' || media.creator.trim().length === 0) {
    issues.push({
      field: `${fieldPath}.creator`,
      message: `${fieldPath}.creator is required for provenance tracking.`,
      severity: 'error',
      code: 'MEDIA_CREATOR_MISSING',
    });
  }

  if (!media.source || typeof media.source !== 'string' || media.source.trim().length === 0) {
    issues.push({
      field: `${fieldPath}.source`,
      message: `${fieldPath}.source institution or repository is required.`,
      severity: 'error',
      code: 'MEDIA_SOURCE_MISSING',
    });
  }

  // Cross-reference checking for sourceId
  if (media.sourceId && sourcesRegistry) {
    if (!sourcesRegistry[media.sourceId]) {
      issues.push({
        field: `${fieldPath}.sourceId`,
        message: `Media references unknown sourceId "${media.sourceId}" that is not registered in sources.ts.`,
        severity: 'error',
        code: 'MEDIA_SOURCE_ID_BROKEN',
        receivedValue: media.sourceId,
      });
    }
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
  issues: ValidationIssue[],
  sourcesRegistry?: Record<string, SourceRecord>
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
      validateMediaAsset(`${fieldPath}[${index}].media[${mIdx}]`, m, issues, sourcesRegistry);
    });
  }
}

/**
 * Validates an academic citation object.
 */
export function validateCitation(
  fieldPath: string,
  citation: Citation,
  index: number,
  issues: ValidationIssue[],
  sourcesRegistry?: Record<string, SourceRecord>
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

  // Cross-reference checking with Source Registry
  if (citation.sourceId && sourcesRegistry) {
    if (!sourcesRegistry[citation.sourceId]) {
      issues.push({
        field: `${fieldPath}[${index}].sourceId`,
        message: `Citation references unknown sourceId "${citation.sourceId}" that is not registered in sources.ts.`,
        severity: 'error',
        code: 'CITATION_SOURCE_ID_BROKEN',
        receivedValue: citation.sourceId,
      });
    }
  }

  if (citation.license && !VALID_LICENSES.includes(citation.license)) {
    issues.push({
      field: `${fieldPath}[${index}].license`,
      message: `Citation license must be one of: ${VALID_LICENSES.join(', ')}. Received: ${citation.license}`,
      severity: 'error',
      code: 'CITATION_LICENSE_INVALID',
      receivedValue: citation.license,
    });
  }

  if (citation.url && typeof citation.url === 'string' && citation.url.trim().length > 0) {
    if (!/^(https?:\/\/|\/)/i.test(citation.url.trim())) {
      issues.push({
        field: `${fieldPath}[${index}].url`,
        message: `Citation URL "${citation.url}" must be a valid HTTP/HTTPS URL or relative path.`,
        severity: 'warning',
        code: 'CITATION_URL_INVALID',
        receivedValue: citation.url,
      });
    }
  }

  if (citation.sourceType && !VALID_SOURCE_TYPES.includes(citation.sourceType)) {
    issues.push({
      field: `${fieldPath}[${index}].sourceType`,
      message: `Citation sourceType must be one of: ${VALID_SOURCE_TYPES.join(', ')}. Received: ${citation.sourceType}`,
      severity: 'error',
      code: 'CITATION_SOURCE_TYPE_INVALID',
      receivedValue: citation.sourceType,
    });
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
  const sourcesRegistry = options.sourcesRegistry || defaultSourcesRegistry;

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
  validateMediaAsset('coverMedia', entry.coverMedia, issues, sourcesRegistry);

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
      validateSection('content.sections', sec, idx, issues, sourcesRegistry);
    });
  }

  // 7. Gallery Assets validation
  if (entry.gallery && Array.isArray(entry.gallery)) {
    entry.gallery.forEach((g, idx) => {
      validateMediaAsset(`gallery[${idx}]`, g, issues, sourcesRegistry);
    });
  }

  // 8. Citations & Bibliography validation
  const citations = entry.citations || entry.bibliography || [];
  if (Array.isArray(citations)) {
    citations.forEach((c, idx) => {
      validateCitation('citations', c, idx, issues, sourcesRegistry);
    });
  }

  // 9. Source Registry Cross-References
  if (entry.sourceIds && Array.isArray(entry.sourceIds)) {
    entry.sourceIds.forEach((srcId, idx) => {
      if (typeof srcId !== 'string' || srcId.trim().length === 0) {
        issues.push({
          field: `sourceIds[${idx}]`,
          message: `Source ID at index ${idx} is empty.`,
          severity: 'error',
          code: 'SOURCE_ID_EMPTY',
        });
      } else if (sourcesRegistry && !sourcesRegistry[srcId]) {
        issues.push({
          field: `sourceIds[${idx}]`,
          message: `Entry references sourceId "${srcId}" which does not exist in the Source Registry.`,
          severity: 'error',
          code: 'SOURCE_ID_UNRESOLVED',
          receivedValue: srcId,
        });
      }
    });
  }

  // 10. Relational integrity (internal check)
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

  // 11. Geographic Coordinates validation (if present)
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

  // 12. Audio Metadata validation (if present)
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

  // 13. Review Status validation (if present)
  if (entry.reviewStatus && !VALID_REVIEW_STATUSES.includes(entry.reviewStatus)) {
    issues.push({
      field: 'reviewStatus',
      message: `Entry reviewStatus must be one of: ${VALID_REVIEW_STATUSES.join(', ')}. Received: ${entry.reviewStatus}`,
      severity: 'error',
      code: 'ENTRY_REVIEW_STATUS_INVALID',
      receivedValue: entry.reviewStatus,
    });
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
 * Validates an entire corpus of Heritage Entries and the Source Registry.
 */
export function validateHeritageCorpus(
  entries: HeritageEntry[],
  options: ValidationOptions = {}
): CorpusValidationReport {
  const sourcesRegistry = options.sourcesRegistry || defaultSourcesRegistry;
  const allEntryIds = new Set<string>();
  const idCounts = new Map<string, number>();
  const slugCounts = new Map<string, number>();

  // Pass 1: Validate Source Registry
  const sourceResults: SourceValidationResult[] = Object.values(sourcesRegistry).map(validateSourceRecord);
  const sourceIdCounts = new Map<string, number>();
  Object.keys(sourcesRegistry).forEach((sId) => {
    sourceIdCounts.set(sId, (sourceIdCounts.get(sId) || 0) + 1);
  });
  const duplicateSourceIds = Array.from(sourceIdCounts.entries())
    .filter(([_, count]) => count > 1)
    .map(([id]) => id);

  const validSources = sourceResults.filter((s) => s.isValid).length;

  // Pass 2: Index all Entry IDs and Slugs
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

  // Pass 3: Validate each entry
  const entryResults: EntryValidationResult[] = entries.map((entry) => {
    const res = validateHeritageEntry(entry, allEntryIds, { ...options, sourcesRegistry });

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

  // Broken related references collection
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

  // Broken source references collection
  const brokenSourceReferences: Array<{ sourceEntryId: string; missingSourceId: string }> = [];
  entries.forEach((entry) => {
    const srcIds = entry.sourceIds || [];
    srcIds.forEach((sId) => {
      if (!sourcesRegistry[sId]) {
        brokenSourceReferences.push({
          sourceEntryId: entry.id,
          missingSourceId: sId,
        });
      }
    });
  });

  // License & Source Type Distributions & Provenance Metrics
  const licenseDistribution: Record<string, number> = {};
  const sourceTypeDistribution: Record<string, number> = {};
  const itemsNeedingHumanReview: ItemReviewFlag[] = [];
  let totalMediaChecked = 0;
  let missingAttributions = 0;

  // Track sources distributions
  Object.values(sourcesRegistry).forEach((src) => {
    sourceTypeDistribution[src.type] = (sourceTypeDistribution[src.type] || 0) + 1;
    if (src.reviewStatus === 'needs_human_review' || src.reviewStatus === 'unverified' || src.type === 'unknown_needs_review') {
      itemsNeedingHumanReview.push({
        id: src.id,
        category: 'source',
        reason: 'Source record is marked as needing review or unverified.',
        reviewStatus: src.reviewStatus,
      });
    }
  });

  // Track entries & media distributions
  entries.forEach((entry) => {
    if (entry.reviewStatus === 'needs_human_review' || entry.reviewStatus === 'unverified') {
      itemsNeedingHumanReview.push({
        id: entry.id,
        category: 'entry',
        reason: 'Entry marked as needing human review.',
        reviewStatus: entry.reviewStatus,
      });
    }

    const allMedia: MediaAsset[] = [];
    if (entry.coverMedia) allMedia.push(entry.coverMedia);
    if (entry.gallery) allMedia.push(...entry.gallery);
    if (entry.content?.sections) {
      entry.content.sections.forEach((s) => {
        if (s.media) allMedia.push(...s.media);
      });
    }

    allMedia.forEach((m) => {
      totalMediaChecked++;
      if (m.license) {
        licenseDistribution[m.license] = (licenseDistribution[m.license] || 0) + 1;
      }
      if (LICENSES_REQUIRING_ATTRIBUTION.includes(m.license) && (!m.attribution || m.attribution.trim().length === 0)) {
        missingAttributions++;
      }
      if (m.reviewStatus === 'needs_human_review' || m.reviewStatus === 'unverified') {
        itemsNeedingHumanReview.push({
          id: m.id,
          category: 'media',
          reason: `Media asset "${m.id}" in entry "${entry.id}" requires review.`,
          reviewStatus: m.reviewStatus,
        });
      }
    });
  });

  const totalErrors = entryResults.reduce((acc, r) => acc + r.errors.length, 0) +
    sourceResults.reduce((acc, s) => acc + s.errors.length, 0) +
    (duplicateSourceIds.length > 0 ? duplicateSourceIds.length : 0);

  const totalWarnings = entryResults.reduce((acc, r) => acc + r.warnings.length, 0) +
    sourceResults.reduce((acc, s) => acc + s.warnings.length, 0);

  const validEntries = entryResults.filter((r) => r.isValid).length;

  return {
    timestamp: new Date().toISOString(),
    totalEntries: entries.length,
    validEntries,
    invalidEntries: entries.length - validEntries,
    totalSources: Object.keys(sourcesRegistry).length,
    validSources,
    totalMediaChecked,
    missingAttributions,
    totalErrors,
    totalWarnings,
    duplicateIds,
    duplicateSlugs,
    duplicateSourceIds,
    brokenReferences,
    brokenSourceReferences,
    itemsNeedingHumanReview,
    licenseDistribution,
    sourceTypeDistribution,
    entryResults,
    sourceResults,
  };
}
