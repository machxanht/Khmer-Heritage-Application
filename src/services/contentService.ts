/**
 * Content Service Architecture (Foundation Provider)
 * Provides a unified async access layer for all components.
 * Supports hot-swapping data providers (Static -> Cloudflare R2 / Headless CMS) seamlessly.
 */

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
import { IContentProvider } from './providers/IContentProvider.ts';
import { StaticContentProvider } from './providers/StaticContentProvider.ts';

export type { IContentProvider };

export interface IContentService {
  setProvider(provider: IContentProvider): void;
  getProviderId(): string;
  getManifest(): Promise<DataManifest>;
  getCategories(): Promise<Category[]>;
  getEntries(): Promise<EntryDetail[]>;
  getEntrySummaries(): Promise<EntrySummary[]>;
  getEntriesByCategory(categoryId: string): Promise<EntrySummary[]>;
  getEntryDetail(slugOrId: string): Promise<EntryDetail | null>;
  getSites(): Promise<HeritageSite[]>;
  getEras(): Promise<Era[]>;
  getTrails(): Promise<Trail[]>;
  getInstruments(): Promise<Instrument[]>;
}

export class FoundationContentService implements IContentService {
  private provider: IContentProvider;

  constructor(initialProvider?: IContentProvider) {
    this.provider = initialProvider || new StaticContentProvider();
  }

  /**
   * Dynamically swaps the active content provider (e.g. from static bundle to R2/CMS).
   */
  setProvider(provider: IContentProvider): void {
    this.provider = provider;
  }

  getProviderId(): string {
    return this.provider.providerId;
  }

  async getManifest(): Promise<DataManifest> {
    return this.provider.getManifest();
  }

  async getCategories(): Promise<Category[]> {
    return this.provider.getCategories();
  }

  async getEntries(): Promise<EntryDetail[]> {
    return this.provider.getEntries();
  }

  async getEntrySummaries(): Promise<EntrySummary[]> {
    if (this.provider.getEntrySummaries) {
      return this.provider.getEntrySummaries();
    }
    const full = await this.provider.getEntries();
    return full.map((e) => ({
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
    return this.provider.getEntriesByCategory(categoryId);
  }

  async getEntryDetail(slugOrId: string): Promise<EntryDetail | null> {
    return this.provider.getEntryDetail(slugOrId);
  }

  async getSites(): Promise<HeritageSite[]> {
    return this.provider.getSites();
  }

  async getEras(): Promise<Era[]> {
    return this.provider.getEras();
  }

  async getTrails(): Promise<Trail[]> {
    return this.provider.getTrails();
  }

  async getInstruments(): Promise<Instrument[]> {
    return this.provider.getInstruments();
  }
}

export const contentService = new FoundationContentService();
