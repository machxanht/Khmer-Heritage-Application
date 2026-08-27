export type LocaleCode = "km" | "en";

export interface LocalizedString {
  km: string;
  en: string;
}

export type LicenseTier =
  | "public_domain"
  | "cc0"
  | "cc_by"
  | "cc_by_sa"
  | "in_house_original"
  | "direct_permission";

export interface MediaAsset {
  id: string;
  url: string;
  thumbnailUrl?: string;
  type: "image" | "audio" | "video";
  title: LocalizedString;
  description?: LocalizedString;
  creator: string;
  source: string;
  sourceUrl: string;
  license: LicenseTier;
  licenseUrl: string;
  attribution: string;
}

export interface Citation {
  id: string;
  title: string;
  author: string;
  year?: number;
  publisher?: string;
  url?: string;
}

export interface EntryDetail {
  id: string;
  slug: string;
  categoryId: string;
  title: LocalizedString;
  summary: LocalizedString;
  era: LocalizedString;
  coverMedia: MediaAsset;
  content: {
    sections: Array<{
      id: string;
      heading: LocalizedString;
      body: LocalizedString;
    }>;
  };
  coordinates?: { latitude: number; longitude: number };
  gallery: MediaAsset[];
  relatedEntryIds: string[];
  citations: Citation[];
}

export interface Category {
  id: string;
  slug: string;
  title: LocalizedString;
  blurb: LocalizedString;
  count: number;
}

export interface EraBand {
  id: string;
  label: LocalizedString;
  range: LocalizedString;
  note: LocalizedString;
}

export interface Trail {
  id: string;
  title: LocalizedString;
  stops: number;
  blurb: LocalizedString;
  coverUrl: string;
}

export interface Instrument {
  id: string;
  name: LocalizedString;
  ensemble: "Pinpeat" | "Mohori" | "Kar" | "Ayai";
  family: LocalizedString;
  origin: LocalizedString;
  toneHz: number[];
}

export interface HeritageSite {
  id: string;
  entrySlug: string;
  name: LocalizedString;
  province: LocalizedString;
  era: string;
  style: LocalizedString;
  condition: "excellent" | "stable" | "at_risk";
  unesco: boolean;
  coordinates: { latitude: number; longitude: number };
}

export const LICENSE_LABEL: Record<LicenseTier, string> = {
  public_domain: "Public Domain",
  cc0: "CC0",
  cc_by: "CC BY 4.0",
  cc_by_sa: "CC BY-SA 4.0",
  in_house_original: "In-house Original",
  direct_permission: "Direct Permission",
};
