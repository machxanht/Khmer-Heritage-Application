/**
 * Content Service Interface (Foundation Provider)
 * Standard async content provider designed for seamless migration to Cloudflare R2 static JSON CDN.
 */

import { PROJECT_INFO } from '../core/constants.ts';
import {
  Category,
  DataManifest,
  EntryDetail,
  EntrySummary,
  Era,
  HeritageSite,
  Instrument,
  Trail,
} from '../types/schema.ts';
import {
  categories as defaultCategories,
  entries as defaultEntries,
  eras as defaultEras,
  instruments as defaultInstruments,
  sites as defaultSites,
  trails as defaultTrails,
} from '../data/heritage.ts';

export interface IContentService {
  getManifest(): Promise<DataManifest>;
  getCategories(): Promise<Category[]>;
  getEntries(): Promise<EntryDetail[]>;
  getEntriesByCategory(categoryId: string): Promise<EntrySummary[]>;
  getEntryDetail(slugOrId: string): Promise<EntryDetail | null>;
  getSites(): Promise<HeritageSite[]>;
  getEras(): Promise<Era[]>;
  getTrails(): Promise<Trail[]>;
  getInstruments(): Promise<Instrument[]>;
}

export class FoundationContentService implements IContentService {
  async getManifest(): Promise<DataManifest> {
    return {
      version: PROJECT_INFO.version,
      schemaVersion: 1,
      lastUpdated: new Date().toISOString(),
      categoriesCount: defaultCategories.length,
      entriesCount: defaultEntries.length,
      cdnBaseUrl: 'https://r2.khmer-heritage.internal/v1',
    };
  }

  async getCategories(): Promise<Category[]> {
    return defaultCategories;
  }

  async getEntries(): Promise<EntryDetail[]> {
    return defaultEntries;
  }

  async getEntriesByCategory(categoryId: string): Promise<EntrySummary[]> {
    return defaultEntries.filter(
      (e) => e.categoryId === categoryId || e.categoryId === categoryId.toLowerCase()
    );
  }

  async getEntryDetail(slugOrId: string): Promise<EntryDetail | null> {
    const found = defaultEntries.find(
      (e) => e.slug === slugOrId || e.id === slugOrId
    );
    return found || null;
  }

  async getSites(): Promise<HeritageSite[]> {
    return defaultSites;
  }

  async getEras(): Promise<Era[]> {
    return defaultEras;
  }

  async getTrails(): Promise<Trail[]> {
    return defaultTrails;
  }

  async getInstruments(): Promise<Instrument[]> {
    return defaultInstruments;
  }
}

export const contentService = new FoundationContentService();
