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

export interface BundleExportResult {
  outputDir: string;
  manifest: import('../types/schema.ts').DataManifest;
  exportedEntriesCount: number;
  exportedCategoriesCount: number;
  exportedFiles: string[];
  contentHash: string;
}

export interface BundleValidationReport {
  timestamp: string;
  bundleDir: string;
  manifestValid: boolean;
  categoriesValid: boolean;
  indexValid: boolean;
  entriesAuditedCount: number;
  entriesValidCount: number;
  totalErrors: number;
  totalWarnings: number;
  errors: ValidationIssue[];
  warnings: ValidationIssue[];
  computedContentHash: string;
  manifestContentHash: string;
  hashMatches: boolean;
}

export type CrawlPolicy =
  | 'SAFE_FOR_METADATA_DISCOVERY'
  | 'SAFE_WITH_RATE_LIMIT'
  | 'API_ONLY'
  | 'MANUAL_REVIEW_REQUIRED'
  | 'NOT_ALLOWED'
  | 'UNKNOWN';

export type SourceCatalogCategory =
  | 'academic_institutional'
  | 'museum_archive'
  | 'open_repository'
  | 'digitized_publications'
  | 'audio_music'
  | 'video'
  | 'direct_commissioned';

export type LicenseModel =
  | 'item-level'
  | 'cc0'
  | 'cc_by'
  | 'cc_by_sa'
  | 'public_domain'
  | 'non_commercial_only'
  | 'all_rights_reserved'
  | 'institutional_agreement';

export type CommercialUsePolicy =
  | 'unrestricted'
  | 'item_dependent'
  | 'non_commercial_only'
  | 'prohibited_without_license'
  | 'paid_license_required';

export type RedistributionPolicy =
  | 'full_permitted'
  | 'permitted_matching_license'
  | 'non_commercial_only'
  | 'prohibited'
  | 'requires_permission';

export interface SourceCatalogEntry {
  id: string;
  name: string;
  category: SourceCatalogCategory;
  officialUrl: string;
  apiUrl?: string;
  iiifUrl?: string;
  hasMedia: boolean;
  hasMetadata: boolean;
  licenseModel: LicenseModel;
  commercialUse: CommercialUsePolicy;
  attributionRequired: boolean;
  attributionTemplate?: string;
  redistributionPolicy: RedistributionPolicy;
  crawlPolicy: CrawlPolicy;
  khmerRelevance: string;
  rateLimitMs?: number;
  notes?: string;
}

export interface MediaSampleItem {
  sourceId: string;
  identifier: string;
  url: string;
  mimeType: string;
  fileSizeBytes: number;
  width?: number;
  height?: number;
  durationSeconds?: number;
  license: string;
  isPublicDomain: boolean;
  isCommercialAllowed: boolean;
}

export interface SourceSampleResult {
  sourceId: string;
  sourceName: string;
  recordsDiscovered: number;
  mediaDiscovered: number;
  averageMediaSizeBytes: number;
  medianMediaSizeBytes: number;
  largestMediaSizeBytes: number;
  mediaTypes: Record<string, number>;
  licenseDistribution: Record<string, number>;
  samples: MediaSampleItem[];
}

export interface CorpusStorageProjection {
  entryCount: number;
  scenarioAOriginalGB: number;
  scenarioBOptimizedGB: number;
  savingsPercent: number;
  breakdown: {
    jsonMetadataGB: number;
    imagesGB: {
      scenarioA: number;
      scenarioB: number;
    };
    audioGB: {
      scenarioA: number;
      scenarioB: number;
    };
    videoGB: {
      scenarioA: number;
      scenarioB: number;
    };
    documentsGB: {
      scenarioA: number;
      scenarioB: number;
    };
  };
}

export interface EstimatorCheckpoint {
  timestamp: string;
  completedSources: string[];
  sampleResults: Record<string, SourceSampleResult>;
}

