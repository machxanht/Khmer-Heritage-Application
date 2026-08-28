/**
 * Content Pipeline Types & Validation Contracts
 * Standard validation contracts for the Khmer Heritage Platform.
 */

import { HeritageEntry, LicenseTier } from '../types/schema.ts';

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

export interface CorpusValidationReport {
  timestamp: string;
  totalEntries: number;
  validEntries: number;
  invalidEntries: number;
  totalErrors: number;
  totalWarnings: number;
  duplicateIds: string[];
  duplicateSlugs: string[];
  brokenReferences: Array<{
    sourceEntryId: string;
    targetReferenceId: string;
  }>;
  entryResults: EntryValidationResult[];
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
}
