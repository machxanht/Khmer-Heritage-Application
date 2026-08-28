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
      contentVersion: '1.0.0',
      schemaVersion: 1,
      generatedAt: '2026-08-28T00:00:00.000Z',
      lastUpdated: '2026-08-28T00:00:00.000Z',
      categoriesCount: defaultCategories.length,
      entriesCount: defaultEntries.length,
      contentHash: 'local-static-bundled-v1',
      cdnBaseUrl: 'https://r2.khmer-heritage.internal/v1',
      entryIndexUrl: '/content/v1/entries/index.json',
      categoriesUrl: '/content/v1/categories.json',
      entryIds: defaultEntries.map((e) => e.id),
    };
  }

  async getCategories(): Promise<Category[]> {
    return defaultCategories;
  }

  async getEntries(): Promise<EntryDetail[]> {
    return defaultEntries;
  }

  async getEntrySummaries(): Promise<EntrySummary[]> {
    return defaultEntries.map((e) => ({
      id: e.id,
      slug: e.slug,
      categoryId: e.categoryId,
      category: e.category,
      title: e.title,
      summary: e.summary,
      era: e.era,
      coverMedia: e.coverMedia,
      updatedAt: e.updatedAt,
      reviewStatus: e.reviewStatus,
      coordinates: e.coordinates || e.location?.coordinates,
    }));
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
