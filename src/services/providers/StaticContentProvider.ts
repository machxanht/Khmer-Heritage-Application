/**
 * Static Memory Content Provider
 * Default offline implementation serving bundled data.
 */

import { PROJECT_INFO } from '../../core/constants.ts';
import {
  categories as defaultCategories,
  entries as defaultEntries,
  eras as defaultEras,
  instruments as defaultInstruments,
  sites as defaultSites,
  trails as defaultTrails,
} from '../../data/heritage.ts';
import {
  Category,
  DataManifest,
  EntryDetail,
  EntrySummary,
  Era,
  HeritageSite,
  Instrument,
  Trail,
} from '../../types/schema.ts';
import { IContentProvider } from './IContentProvider.ts';

export class StaticContentProvider implements IContentProvider {
  readonly providerId = 'static-bundled';

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
    const target = categoryId.toLowerCase();
    return defaultEntries.filter(
      (e) => (e.categoryId && e.categoryId.toLowerCase() === target) ||
             (e.category && e.category.toLowerCase() === target)
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
