/**
 * Content Service Interface (Foundation Provider)
 * Prepared for Cloudflare R2 / Static JSON Manifest consumption.
 */

import { FOUNDATION_CATEGORIES, PROJECT_INFO } from '../core/constants.ts';
import { Category, DataManifest, EntryDetail, EntrySummary } from '../types/schema.ts';

export interface IContentService {
  getManifest(): Promise<DataManifest>;
  getCategories(): Promise<Category[]>;
  getEntriesByCategory(categoryId: string): Promise<EntrySummary[]>;
  getEntryDetail(slugOrId: string): Promise<EntryDetail | null>;
}

export class FoundationContentService implements IContentService {
  async getManifest(): Promise<DataManifest> {
    return {
      version: PROJECT_INFO.version,
      schemaVersion: 1,
      lastUpdated: new Date().toISOString(),
      categoriesCount: FOUNDATION_CATEGORIES.length,
      entriesCount: 0,
      cdnBaseUrl: 'https://r2.khmer-heritage.internal/v1',
    };
  }

  async getCategories(): Promise<Category[]> {
    return FOUNDATION_CATEGORIES;
  }

  async getEntriesByCategory(_categoryId: string): Promise<EntrySummary[]> {
    return [];
  }

  async getEntryDetail(_slugOrId: string): Promise<EntryDetail | null> {
    return null;
  }
}

export const contentService = new FoundationContentService();
