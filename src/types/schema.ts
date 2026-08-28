/**
 * Khmer Heritage Core Schema Definitions
 * Standardized type contracts aligned with docs/CONTENT_SCHEMA.md and docs/DATA_ARCHITECTURE.md.
 * Shared across Android, iOS, and Web platforms.
 */

export type LocaleCode = 'km' | 'en' | 'vi' | 'th';

export type LocalizedString = {
  km: string;
  en: string;
  vi?: string;
  th?: string;
};

export type LicenseTier =
  | 'public_domain'
  | 'cc0'
  | 'cc_by'
  | 'cc_by_sa'
  | 'in_house_original'
  | 'direct_permission';

export const LICENSE_LABEL: Record<LicenseTier, string> = {
  public_domain: 'Public Domain',
  cc0: 'CC0 / No Rights Reserved',
  cc_by: 'CC BY 4.0',
  cc_by_sa: 'CC BY-SA 4.0',
  in_house_original: 'Khmer Heritage Original',
  direct_permission: 'Direct Museum Permission',
};

export type SourceType =
  | 'academic_publication'
  | 'unesco_institutional'
  | 'museum_archive'
  | 'government_heritage_authority'
  | 'open_licensed_media'
  | 'public_domain'
  | 'original_commissioned'
  | 'unknown_needs_review';

export type ReviewStatus =
  | 'verified_peer_reviewed'
  | 'institutional_certified'
  | 'preliminary_review'
  | 'needs_human_review'
  | 'unverified';

export interface MediaProvenance {
  repository?: string;
  collection?: string;
  accessionNumber?: string;
  creditLine?: string;
  captureDate?: string;
  physicalLocation?: string;
  rightsNotice?: string;
}

export interface SourceRecord {
  id: string;
  type: SourceType;
  title: string;
  author: string;
  institution?: string;
  publication?: string;
  publisher?: string;
  year?: number;
  publicationDate?: string;
  accessDate?: string;
  url?: string;
  isbn?: string;
  doi?: string;
  license?: LicenseTier;
  attribution?: string;
  reviewStatus: ReviewStatus;
  notes?: string;
}

export interface MediaAsset {
  id: string;
  url: string;
  thumbnailUrl?: string;
  type: 'image' | 'audio' | 'video' | 'model3d';
  title: LocalizedString;
  description?: LocalizedString;
  creator: string;
  source: string;
  sourceUrl: string;
  license: LicenseTier;
  licenseUrl: string;
  attribution: string;
  sourceId?: string;
  provenance?: MediaProvenance;
  reviewStatus?: ReviewStatus;
  dimensions?: {
    width: number;
    height: number;
  };
}

export interface Citation {
  id: string;
  title: string;
  author: string;
  sourceId?: string;
  institution?: string;
  year?: number;
  publicationDate?: string;
  accessDate?: string;
  publisher?: string;
  url?: string;
  isbn?: string;
  doi?: string;
  license?: LicenseTier;
  attribution?: string;
  sourceType?: SourceType;
  reviewStatus?: ReviewStatus;
}

export interface Category {
  id: string;
  slug: string;
  title: LocalizedString;
  description?: LocalizedString;
  blurb?: LocalizedString;
  iconName?: string;
  sortOrder?: number;
  count?: number;
}

export interface GeoCoordinates {
  latitude: number;
  longitude: number;
  altitude?: number;
}

export interface EntrySummary {
  id: string;
  slug: string;
  categoryId: string;
  title: LocalizedString;
  summary: LocalizedString;
  era: LocalizedString;
  coverMedia: MediaAsset;
  updatedAt?: string;
}

export interface KeyFactItem {
  key: string;
  label: LocalizedString;
  value: LocalizedString;
}

export interface HeritageLocation {
  coordinates: GeoCoordinates;
  province?: LocalizedString;
  country?: string;
  siteName?: LocalizedString;
}

export interface AudioMediaMetadata {
  soundscapeId?: string;
  audioPreviewUrl?: string;
  acousticNotes?: LocalizedString;
  tuningHz?: number[];
  instruments?: string[];
}

export interface KeyFacts {
  era?: LocalizedString;
  author?: LocalizedString;
  creator?: LocalizedString;
  builder?: LocalizedString;
  founder?: LocalizedString;
  ruler?: LocalizedString;
  religion?: LocalizedString;
  tradition?: LocalizedString;
  architecturalStyle?: LocalizedString;
  artStyle?: LocalizedString;
  unescoStatus?: LocalizedString;
  material?: LocalizedString;
  location?: LocalizedString;
  items?: KeyFactItem[];
}

export interface EntrySection {
  id: string;
  heading: LocalizedString;
  body: LocalizedString;
  media?: MediaAsset[];
  citations?: Citation[];
}

export interface EntrySummary {
  id: string;
  slug: string;
  categoryId: string;
  category?: string;
  title: LocalizedString;
  summary: LocalizedString;
  era: LocalizedString;
  coverMedia: MediaAsset;
  updatedAt?: string;
}

export interface EntryDetail extends EntrySummary {
  category?: string;
  keyFacts?: KeyFacts;
  content: {
    sections: EntrySection[];
  };
  scholarlySections?: EntrySection[];
  location?: HeritageLocation;
  coordinates?: GeoCoordinates;
  gallery: MediaAsset[];
  relatedEntryIds: string[];
  relatedEntries?: string[];
  sourceIds?: string[];
  citations: Citation[];
  bibliography?: Citation[];
  audioMetadata?: AudioMediaMetadata;
  reviewStatus?: ReviewStatus;
  scholarlyReviewer?: string;
  version?: number;
  createdAt?: string;
}

export type HeritageEntry = EntryDetail;

export interface Era {
  id: string;
  label: LocalizedString;
  range: LocalizedString;
  note: LocalizedString;
  sortOrder?: number;
}

export type EraBand = Era;

export interface Trail {
  id: string;
  title: LocalizedString;
  blurb: LocalizedString;
  coverUrl: string;
  stops: number;
  entrySlugs?: string[];
}

export interface HeritageSite {
  id: string;
  name: LocalizedString;
  province: LocalizedString;
  coordinates: GeoCoordinates;
  era: string;
  style: LocalizedString;
  unesco: boolean;
  condition: 'excellent' | 'stable' | 'at_risk';
  entrySlug: string;
}

export interface Instrument {
  id: string;
  name: LocalizedString;
  family: LocalizedString;
  ensemble: 'Pinpeat' | 'Mohori' | 'Ayai' | 'Kar' | string;
  origin: LocalizedString;
  toneHz: number[];
  audioUrl?: string;
}

export interface DataManifest {
  version: string;
  schemaVersion: number;
  lastUpdated: string;
  categoriesCount: number;
  entriesCount: number;
  cdnBaseUrl: string;
}
