/**
 * Content Pipeline Types & Validation Contracts
 * Standard validation contracts for the Khmer Heritage Platform.
 */

import type { HeritageEntry, LicenseTier, ReviewStatus, SourceRecord, SourceType } from '../types/schema.ts';

export type { HeritageEntry, LicenseTier, ReviewStatus, SourceRecord, SourceType };

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

export interface OptimizedMediaVariant {
  variant: 'hero' | 'gallery' | 'thumbnail';
  width: number;
  height: number;
  format: 'webp' | 'avif' | 'jpeg';
  sizeBytes: number;
  quality: number;
}

export interface IngestedMediaItem {
  id: string;
  sourceUrl: string;
  mimeType: string;
  title: string;
  license: string;
  isPublicDomain: boolean;
  isCommercialAllowed: boolean;
  originalSizeBytes: number;
  originalWidth?: number;
  originalHeight?: number;
  variants: OptimizedMediaVariant[];
  totalOptimizedBytes: number;
  compressionRatio: number;
}

export interface CandidateRecord {
  sourceId: string;
  sourceName: string;
  sourceItemId: string;
  title: string;
  creator?: string;
  date?: string;
  medium?: string;
  dimensions?: string;
  classification?: string;
  culture?: string;
  originalUrl: string;
  mediaItems: IngestedMediaItem[];
  relevanceScore: number;
  relevanceKeywords: string[];
  isRelevanceAccepted: boolean;
  license: string;
  licenseUrl?: string;
  licenseTier: LicenseTier | 'unsupported_quarantine';
  isCommercialAllowed: boolean;
  licenseGatePassed: boolean;
  quarantineReason?: string;
  attribution: string;
  retrievedAt: string;
  suggestedCategory: ValidCategoryId;
}

export interface IngestionPilotSourceResult {
  sourceId: string;
  sourceName: string;
  apiUrl: string;
  recordsDiscovered: number;
  recordsEvaluated: number;
  recordsAccepted: number;
  recordsRejected: number;
  recordsQuarantined: number;
  mediaAssetsDiscovered: number;
  mediaAssetsSampled: number;
  totalOriginalMediaBytes: number;
  totalOptimizedMediaBytes: number;
  totalJsonBytes: number;
  averageOriginalBytesPerItem: number;
  averageOptimizedBytesPerItem: number;
  medianOptimizedBytesPerItem: number;
  compressionRatio: number;
  licenseDistribution: Record<string, number>;
  rejectionReasons: Record<string, number>;
  records: CandidateRecord[];
}

export interface IngestionPilotSummary {
  timestamp: string;
  pilotVersion: string;
  pilotSizeTarget: number;
  sources: Record<string, IngestionPilotSourceResult>;
  totals: {
    recordsDiscovered: number;
    recordsEvaluated: number;
    recordsAccepted: number;
    recordsRejected: number;
    recordsQuarantined: number;
    mediaSampled: number;
    originalMediaBytes: number;
    optimizedMediaBytes: number;
    totalJsonBytes: number;
    overallCompressionRatio: number;
    averageBytesPerAcceptedItem: number;
    medianBytesPerAcceptedItem: number;
  };
  storageExtrapolations: {
    scale1kGB: { original: number; optimized: number; savingsPct: number; estMonthlyR2USD: number };
    scale5kGB: { original: number; optimized: number; savingsPct: number; estMonthlyR2USD: number };
    scale10kGB: { original: number; optimized: number; savingsPct: number; estMonthlyR2USD: number };
    scale50kGB: { original: number; optimized: number; savingsPct: number; estMonthlyR2USD: number };
  };
  theoreticalModelComparison: {
    kh014AModeledAvgOptimizedMB: number;
    pilotMeasuredAvgOptimizedMB: number;
    deltaPercent: number;
    assessment: string;
  };
  quotaAndRuntimeObservations: {
    metApiLatencyMs: number;
    smithsonianApiLatencyMs: number;
    wikimediaApiLatencyMs: number;
    rateLimitsRespected: boolean;
    memoryUsageMB: number;
    executionTimeMs: number;
  };
}

export interface PilotCheckpoint {
  timestamp: string;
  targetSampleSize: number;
  completedSources: string[];
  sourceResults: Record<string, IngestionPilotSourceResult>;
}

// --------------------------------------------------------------------------
// KH-015: Controlled Corpus Metadata Discovery Types
// --------------------------------------------------------------------------

export type LicenseClassification = 'ACCEPTABLE' | 'QUARANTINE' | 'REJECTED' | 'UNKNOWN';
export type DiscoveredMediaType = 'images' | 'audio' | 'video' | 'documents' | 'other';

export interface DiscoveredMediaAsset {
  url: string;
  mimeType: string;
  mediaType: DiscoveredMediaType;
  width?: number;
  height?: number;
  durationSeconds?: number;
  originalSizeBytes?: number;
  isSizeKnown: boolean;
  sizeEstimationMethod?: string;
  estimatedOriginalBytes: number;
  estimatedOptimizedBytes: number;
}

export interface DiscoveredRecord {
  sourceId: string;
  sourceName: string;
  sourceItemId: string;
  title: string;
  creator?: string;
  date?: string;
  description?: string;
  categories: string[];
  culture?: string;
  medium?: string;
  dimensions?: string;
  classification?: string;
  originalUrl: string;
  relevanceScore: number;
  relevanceKeywords: string[];
  isKhmerRelevant: boolean;
  rawLicense: string;
  licenseUrl?: string;
  licenseClassification: LicenseClassification;
  licenseTier?: LicenseTier | 'unsupported_quarantine' | 'unknown';
  isCommercialAllowed: boolean;
  isPublicDomain: boolean;
  quarantineOrRejectionReason?: string;
  attribution: string;
  media: DiscoveredMediaAsset[];
  hasMedia: boolean;
  discoveredAt: string;
}

export interface DiscoveryPaginationInfo {
  totalPagesChecked: number;
  totalRecordsExamined: number;
  cursorOrOffset?: string | number;
  hasMore: boolean;
}

export interface DiscoverySourceResult {
  sourceId: string;
  sourceName: string;
  apiUrl?: string;
  paginationInfo: DiscoveryPaginationInfo;
  recordsExamined: number;
  khmerRelevantRecords: number;
  recordsAccepted: number;
  recordsRejected: number;
  recordsQuarantined: number;
  recordsUnknownLicense: number;
  itemsWithMedia: number;
  itemsWithoutMedia: number;
  mediaTypeCounts: {
    images: number;
    audio: number;
    video: number;
    documents: number;
    other: number;
  };
  knownMediaSizeBytes: number;
  estimatedMediaSizeBytes: number;
  estimatedOptimizedMediaSizeBytes: number;
  licenseDistribution: Record<string, number>;
  rejectionReasons: Record<string, number>;
  records: DiscoveredRecord[];
}

export interface ScaleProjectionTier {
  scaleCount: number;
  label: string;
  estimatedOriginalGB: number;
  estimatedOptimizedGB: number;
  savingsPercent: number;
  estMonthlyR2USD: number;
  estMonthlyB2USD: number;
}

export interface StorageTierComparison {
  thresholdGB: number;
  label: string;
  fitsOptimizedAtScale: string;
  monthlyCostR2USD: number;
  monthlyCostB2USD: number;
  recommendationNotes: string;
}

export interface DeduplicationCluster {
  canonicalEntityId: string;
  canonicalTitle: string;
  suggestedCategory: string;
  sourceItemCount: number;
  sources: string[];
  sourceItemIds: string[];
  canonicalMediaCount: number;
  representativeRecord: DiscoveredRecord;
}

export interface DeduplicationSummary {
  totalDiscoveredRecords: number;
  uniqueCanonicalEntities: number;
  duplicateClustersCount: number;
  crossSourceLinkCount: number;
  deduplicationRatio: number;
  clusters: DeduplicationCluster[];
}

export interface MediaTypeStorageBreakdown {
  mediaType: DiscoveredMediaType;
  itemCount: number;
  knownBytes: number;
  estimatedOriginalBytes: number;
  estimatedOptimizedBytes: number;
  avgOriginalBytes: number;
  avgOptimizedBytes: number;
  compressionRatio: number;
}

export interface ExpandedCorpusDiscoverySummary extends CorpusDiscoverySummary {
  discoveryVersion: string; // e.g. "KH-016-v1.0"
  tierBreakdown: {
    tier1Sources: string[];
    tier2Sources: string[];
    pilotSources: string[];
  };
  deduplication: DeduplicationSummary;
  mediaTypeBreakdown: Record<DiscoveredMediaType, MediaTypeStorageBreakdown>;
  crawlPolicyDistribution: Record<CrawlPolicy, number>;
  sourceInstitutionalProfiles: Record<
    string,
    {
      sourceName: string;
      officialUrl: string;
      apiUrl?: string;
      crawlPolicy: CrawlPolicy;
      licenseModel: LicenseModel;
      commercialUsePolicy: CommercialUsePolicy;
      mediaSupport: DiscoveredMediaType[];
    }
  >;
}

export interface CorpusDiscoverySummary {
  timestamp: string;
  discoveryVersion: string;
  sources: Record<string, DiscoverySourceResult>;
  globalTotals: {
    recordsExamined: number;
    khmerRelevantRecords: number;
    recordsAccepted: number;
    recordsRejected: number;
    recordsQuarantined: number;
    recordsUnknownLicense: number;
    itemsWithMedia: number;
    itemsWithoutMedia: number;
    mediaCounts: {
      images: number;
      audio: number;
      video: number;
      documents: number;
      other: number;
    };
    knownOriginalBytes: number;
    estimatedOriginalBytes: number;
    estimatedOptimizedBytes: number;
    overallCompressionRatio: number;
    averageOptimizedBytesPerAcceptedItem: number;
  };
  scaleProjections: Record<string, ScaleProjectionTier>;
  sourceSpecificProjections: Record<string, Record<string, ScaleProjectionTier>>;
  storageArchitectureAnalysis: {
    tierComparisons: StorageTierComparison[];
    recommendation: 'R2_CURRENT_BUCKET' | 'R2_SEPARATE_BUCKET' | 'R2_B2_HYBRID' | 'B2_ARCHIVE';
    r2FreeTierAssessment: string;
    detailedRationale: string;
  };
  quotaAndRuntimeObservations: {
    apiLatenciesMs: Record<string, number>;
    rateLimitsEncountered: boolean;
    rateLimitObservations: string[];
    memoryUsageMB: number;
    executionTimeMs: number;
  };
  knownLimitations: string[];
}

export interface DiscoveryCheckpoint {
  timestamp: string;
  completedSources: string[];
  sourceCursors: Record<string, string | number>;
  sourceResults: Record<string, DiscoverySourceResult>;
}

// ==========================================
// KH-017: Verified Corpus Inventory & Storage Baseline Types
// ==========================================

export type CorpusInventoryDataClassification = 'MEASURED' | 'ESTIMATED' | 'PROJECTED';
export type CountMechanism = 'MEASURED_API_COUNT' | 'COUNT_ENDPOINT_AVAILABLE' | 'ESTIMATE_ONLY';

export interface SourceQueryDetail {
  query: string;
  count: number;
  classification: CorpusInventoryDataClassification;
  notes?: string;
}

export interface SourceInventoryEntry {
  sourceId: string;
  sourceName: string;
  tier: 'pilot' | 'tier1' | 'tier2';
  officialEndpoint: string;
  discoveryMechanism: CountMechanism;
  crawlPolicy: CrawlPolicy;
  totalSearchableRecords: {
    count: number;
    classification: CorpusInventoryDataClassification;
    notes: string;
  };
  queryCounts: SourceQueryDetail[];
  deduplicatedQueryTotal: {
    count: number;
    classification: CorpusInventoryDataClassification;
    notes: string;
  };
  khmerRelevantRecords: {
    count: number;
    classification: CorpusInventoryDataClassification;
  };
  productionEligible: {
    count: number;
    classification: CorpusInventoryDataClassification;
  };
  quarantined: {
    count: number;
    classification: CorpusInventoryDataClassification;
    reasons: string[];
  };
  rejected: {
    count: number;
    classification: CorpusInventoryDataClassification;
  };
  unknownLicense: {
    count: number;
    classification: CorpusInventoryDataClassification;
  };
  mediaDistribution: {
    images: number;
    audio: number;
    video: number;
    documents: number;
    manuscripts: number;
    maps: number;
    threeD: number;
    other: number;
  };
  storage: {
    knownOriginalBytes: number;
    estimatedOriginalBytes: number;
    estimatedOptimizedBytes: number;
    unknownBytesCount: number;
  };
  licenseDistribution: Record<string, number>;
  apiLimitations: string[];
  rateLimits: string;
  quotaObservations: string;
}

export interface ProductionEligibleInventory {
  timestamp: string;
  totalDiscovered: number;
  productionEligibleCorpus: number;
  productionEligiblePercentage: number;
  quarantinedCount: number;
  rejectedCount: number;
  unknownCount: number;
  sources: Record<
    string,
    {
      sourceName: string;
      tier: string;
      productionEligibleCount: number;
      eligibleLicenses: Record<string, number>;
      quarantineCount: number;
      quarantineReasons: string[];
    }
  >;
  licenseBreakdown: {
    cc0: number;
    ccBy: number;
    ccBySa: number;
    publicDomain: number;
    ccByNcQuarantined: number;
    ccByNdQuarantined: number;
    allRightsReservedQuarantined: number;
    inCopyrightQuarantined: number;
    unknown: number;
  };
}

export interface MediaInventorySummary {
  timestamp: string;
  totalAssets: number;
  breakdown: {
    images: { count: number; percentage: number; knownBytes: number; estRawBytes: number; estOptimizedBytes: number; compressionRatio: number };
    audio: { count: number; percentage: number; knownBytes: number; estRawBytes: number; estOptimizedBytes: number; compressionRatio: number };
    video: { count: number; percentage: number; knownBytes: number; estRawBytes: number; estOptimizedBytes: number; compressionRatio: number };
    documents: { count: number; percentage: number; knownBytes: number; estRawBytes: number; estOptimizedBytes: number; compressionRatio: number };
    manuscripts: { count: number; percentage: number; knownBytes: number; estRawBytes: number; estOptimizedBytes: number; compressionRatio: number };
    maps: { count: number; percentage: number; knownBytes: number; estRawBytes: number; estOptimizedBytes: number; compressionRatio: number };
    threeD: { count: number; percentage: number; knownBytes: number; estRawBytes: number; estOptimizedBytes: number; compressionRatio: number };
    other: { count: number; percentage: number; knownBytes: number; estRawBytes: number; estOptimizedBytes: number; compressionRatio: number };
  };
  totalKnownBytes: number;
  totalEstimatedRawBytes: number;
  totalEstimatedOptimizedBytes: number;
}

export interface StorageBaselineSummary {
  timestamp: string;
  baselineScenarios: {
    conservative: {
      description: string;
      perItemRawBytes: { images: number; audio: number; video: number; documents: number };
      totalCorpusRawGB: number;
      totalCorpusOptimizedGB: number;
    };
    expected: {
      description: string;
      perItemRawBytes: { images: number; audio: number; video: number; documents: number };
      totalCorpusRawGB: number;
      totalCorpusOptimizedGB: number;
    };
    optimized: {
      description: string;
      compressionRatios: { images: number; audio: number; video: number; documents: number };
      totalCorpusRawGB: number;
      totalCorpusOptimizedGB: number;
      overallCompressionRatio: number;
      storageSavingsPercent: number;
    };
  };
  scaleProjections: Array<{
    scaleLabel: string;
    itemCount: number;
    rawStorageGB: number;
    optimizedStorageGB: number;
    mediaBreakdownGB: {
      images: { raw: number; optimized: number };
      audio: { raw: number; optimized: number };
      video: { raw: number; optimized: number };
      documents: { raw: number; optimized: number };
    };
    r2CostMonthlyUSD: number;
    b2CostMonthlyUSD: number;
    isMeasuredOrProjected: CorpusInventoryDataClassification;
  }>;
  costModels: {
    cloudflareR2: {
      freeAllowanceGB: number;
      pricePerGBMonthUSD: number;
      egressPricePerGBUSD: number;
      notes: string;
    };
    backblazeB2: {
      freeAllowanceGB: number;
      pricePerGBMonthUSD: number;
      egressAllowance: string;
      egressPricePerGBUSD: number;
      notes: string;
    };
  };
  architectureRecommendations: {
    primary: {
      name: string;
      type: string;
      estimatedMonthlyCostUSD: number;
      pros: string[];
      cons: string[];
      rationale: string;
    };
    alternative1: {
      name: string;
      type: string;
      estimatedMonthlyCostUSD: number;
      pros: string[];
      cons: string[];
      rationale: string;
    };
    alternative2: {
      name: string;
      type: string;
      estimatedMonthlyCostUSD: number;
      pros: string[];
      cons: string[];
      rationale: string;
    };
  };
}

export interface CorpusInventoryMaster {
  timestamp: string;
  task: string; // "KH-017"
  version: string;
  sourceInventories: Record<string, SourceInventoryEntry>;
  globalCorpusSummary: {
    totalDiscovered: { value: number; classification: CorpusInventoryDataClassification };
    khmerRelevant: { value: number; classification: CorpusInventoryDataClassification };
    productionEligible: { value: number; classification: CorpusInventoryDataClassification };
    quarantined: { value: number; classification: CorpusInventoryDataClassification };
    rejected: { value: number; classification: CorpusInventoryDataClassification };
    unknown: { value: number; classification: CorpusInventoryDataClassification };
    deduplicatedEntities: { value: number; classification: CorpusInventoryDataClassification };
    duplicateClustersCount: number;
    crossSourceLinksCount: number;
    knownOriginalStorageBytes: { value: number; classification: CorpusInventoryDataClassification };
    estimatedOriginalStorageGB: { value: number; classification: CorpusInventoryDataClassification };
    estimatedOptimizedStorageGB: { value: number; classification: CorpusInventoryDataClassification };
  };
  storageBaseline: StorageBaselineSummary;
  productionEligibleInventory: ProductionEligibleInventory;
  mediaInventory: MediaInventorySummary;
}

