/**
 * Content Pipeline Types & Validation Contracts
 * Standard validation contracts for the Khmer Heritage Platform.
 */

import { HeritageEntry, LicenseTier, ReviewStatus, SourceRecord, SourceType } from '../types/schema.ts';

export const VALID_CATEGORIES = [
  'temples',
  'history',
  'arts',
  'music',
  'rituals',
  'script',
  'costumes',
  'cuisine',
  'crafts',
  'landmarks',
  'figures',
  'mythology',
] as const;

export type ValidCategoryId = typeof VALID_CATEGORIES[number];

export const VALID_LICENSES: LicenseTier[] = [
  'public_domain',
  'cc0',
  'cc_by',
  'cc_by_sa',
  'in_house_original',
  'direct_permission',
];

export const LICENSES_REQUIRING_ATTRIBUTION: LicenseTier[] = [
  'cc_by',
  'cc_by_sa',
  'in_house_original',
  'direct_permission',
];

export const VALID_SOURCE_TYPES: SourceType[] = [
  'academic_publication',
  'unesco_institutional',
  'museum_archive',
  'government_heritage_authority',
  'open_licensed_media',
  'public_domain',
  'original_commissioned',
  'unknown_needs_review',
];

export const VALID_REVIEW_STATUSES: ReviewStatus[] = [
  'verified_peer_reviewed',
  'institutional_certified',
  'preliminary_review',
  'needs_human_review',
  'unverified',
];

export const VALID_MEDIA_TYPES = ['image', 'audio', 'video', 'model3d'] as const;

export type ValidationSeverity = 'error' | 'warning' | 'info';

export interface ValidationIssue {
  field: string;
  message: string;
  severity: ValidationSeverity;
  receivedValue?: unknown;
  code: string;
}

export interface EntryValidationResult {
  entryId: string;
  slug: string;
  isValid: boolean;
  errors: ValidationIssue[];
  warnings: ValidationIssue[];
}

export interface SourceValidationResult {
  sourceId: string;
  isValid: boolean;
  errors: ValidationIssue[];
  warnings: ValidationIssue[];
}

export interface ItemReviewFlag {
  id: string;
  category: 'entry' | 'media' | 'source';
  reason: string;
  reviewStatus: ReviewStatus | SourceType;
}

export interface CorpusValidationReport {
  timestamp: string;
  totalEntries: number;
  validEntries: number;
  invalidEntries: number;
  totalSources: number;
  validSources: number;
  totalMediaChecked: number;
  missingAttributions: number;
  totalErrors: number;
  totalWarnings: number;
  duplicateIds: string[];
  duplicateSlugs: string[];
  duplicateSourceIds: string[];
  brokenReferences: Array<{
    sourceEntryId: string;
    targetReferenceId: string;
  }>;
  brokenSourceReferences: Array<{
    sourceEntryId: string;
    missingSourceId: string;
  }>;
  itemsNeedingHumanReview: ItemReviewFlag[];
  licenseDistribution: Record<string, number>;
  sourceTypeDistribution: Record<string, number>;
  entryResults: EntryValidationResult[];
  sourceResults?: SourceValidationResult[];
}

export interface NormalizeOptions {
  trimStrings?: boolean;
  populateMissingLocales?: boolean;
  defaultLicense?: LicenseTier;
}

export interface ValidationOptions {
  strictLocales?: boolean; // If true, requires all 4 locales (km, en, vi, th)
  allowExternalUrls?: boolean;
  requireCoordinatesForSites?: boolean;
  sourcesRegistry?: Record<string, SourceRecord>;
}
