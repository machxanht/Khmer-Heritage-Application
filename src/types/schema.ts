/**
 * Khmer Heritage Core Schema Definitions
 * Shared type contracts across Android, iOS, and Web platforms.
 */

export type LocaleCode = 'km' | 'en';

export type LocalizedString = {
  km: string;
  en: string;
};

export type LicenseTier =
  | 'public_domain'
  | 'cc0'
  | 'cc_by'
  | 'cc_by_sa'
  | 'in_house_original'
  | 'direct_permission';

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
  dimensions?: {
    width: number;
    height: number;
  };
}

export interface Citation {
  id: string;
  title: string;
  author: string;
  year?: number;
  publisher?: string;
  url?: string;
  isbn?: string;
  doi?: string;
}

export interface Category {
  id: string;
  slug: string;
  title: LocalizedString;
  description: LocalizedString;
  iconName: string;
  sortOrder: number;
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
  era?: string;
  coverMedia?: MediaAsset;
  updatedAt: string;
}

export interface EntryDetail extends EntrySummary {
  content: {
    sections: Array<{
      id: string;
      heading: LocalizedString;
      body: LocalizedString;
    }>;
  };
  coordinates?: GeoCoordinates;
  gallery: MediaAsset[];
  relatedEntryIds: string[];
  citations: Citation[];
  version: number;
  createdAt: string;
}

export interface DataManifest {
  version: string;
  schemaVersion: number;
  lastUpdated: string;
  categoriesCount: number;
  entriesCount: number;
  cdnBaseUrl: string;
}
