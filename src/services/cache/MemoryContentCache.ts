/**
 * Memory Content Cache (L1 Cache)
 * Ultra-fast in-memory cache for high-frequency access during application runtime.
 */

import {
  Category,
  DataManifest,
  EntryDetail,
  EntrySummary,
} from '../../types/schema.ts';
import { CacheDiagnostics, CacheEntry, IContentCache } from './IContentCache.ts';

export class MemoryContentCache implements IContentCache {
  readonly cacheId = 'memory-l1';

  private manifestCache: CacheEntry<DataManifest> | null = null;
  private categoriesCache: CacheEntry<Category[]> | null = null;
  private entrySummariesCache: CacheEntry<EntrySummary[]> | null = null;
  private readonly entryDetailsCache: Map<string, CacheEntry<EntryDetail>> = new Map();
  private lastCachedAt?: number;

  async getManifest(): Promise<DataManifest | null> {
    if (!this.manifestCache) return null;
    if (this.isExpired(this.manifestCache)) {
      this.manifestCache = null;
      return null;
    }
    return this.manifestCache.data;
  }

  async setManifest(manifest: DataManifest): Promise<void> {
    const now = Date.now();
    this.manifestCache = {
      data: manifest,
      cachedAt: now,
      schemaVersion: manifest.schemaVersion,
      contentHash: manifest.contentHash,
    };
    this.lastCachedAt = now;
  }

  async getCategories(): Promise<Category[] | null> {
    if (!this.categoriesCache) return null;
    if (this.isExpired(this.categoriesCache)) {
      this.categoriesCache = null;
      return null;
    }
    return this.categoriesCache.data;
  }

  async setCategories(categories: Category[]): Promise<void> {
    const now = Date.now();
    this.categoriesCache = {
      data: categories,
      cachedAt: now,
      schemaVersion: 1,
    };
    this.lastCachedAt = now;
  }

  async getEntrySummaries(): Promise<EntrySummary[] | null> {
    if (!this.entrySummariesCache) return null;
    if (this.isExpired(this.entrySummariesCache)) {
      this.entrySummariesCache = null;
      return null;
    }
    return this.entrySummariesCache.data;
  }

  async setEntrySummaries(summaries: EntrySummary[]): Promise<void> {
    const now = Date.now();
    this.entrySummariesCache = {
      data: summaries,
      cachedAt: now,
      schemaVersion: 1,
    };
    this.lastCachedAt = now;
  }

  async getEntryDetail(slugOrId: string): Promise<EntryDetail | null> {
    const entry = this.entryDetailsCache.get(slugOrId);
    if (!entry) return null;
    if (this.isExpired(entry)) {
      this.entryDetailsCache.delete(slugOrId);
      return null;
    }
    return entry.data;
  }

  async setEntryDetail(entry: EntryDetail): Promise<void> {
    const now = Date.now();
    const cacheItem: CacheEntry<EntryDetail> = {
      data: entry,
      cachedAt: now,
      schemaVersion: entry.version || 1,
    };
    // Cache by both ID and slug for O(1) multi-key lookup
    this.entryDetailsCache.set(entry.id, cacheItem);
    this.entryDetailsCache.set(entry.slug, cacheItem);
    this.lastCachedAt = now;
  }

  async invalidateAll(): Promise<void> {
    this.manifestCache = null;
    this.categoriesCache = null;
    this.entrySummariesCache = null;
    this.entryDetailsCache.clear();
    this.lastCachedAt = undefined;
  }

  async invalidateEntry(slugOrId: string): Promise<void> {
    const existing = this.entryDetailsCache.get(slugOrId);
    if (existing) {
      this.entryDetailsCache.delete(existing.data.id);
      this.entryDetailsCache.delete(existing.data.slug);
    } else {
      this.entryDetailsCache.delete(slugOrId);
    }
  }

  async getDiagnostics(): Promise<CacheDiagnostics> {
    // Count unique entries (since entries are indexed by both ID and slug)
    const uniqueIds = new Set<string>();
    this.entryDetailsCache.forEach((item) => uniqueIds.add(item.data.id));

    return {
      providerId: this.cacheId,
      hasManifest: !!this.manifestCache,
      hasCategories: !!this.categoriesCache,
      hasEntrySummaries: !!this.entrySummariesCache,
      cachedEntriesCount: uniqueIds.size,
      storageType: 'memory',
      lastCachedAt: this.lastCachedAt,
    };
  }

  isAvailable(): boolean {
    return true;
  }

  private isExpired(entry: CacheEntry<any>): boolean {
    if (!entry.expiresAt) return false;
    return Date.now() > entry.expiresAt;
  }
}
