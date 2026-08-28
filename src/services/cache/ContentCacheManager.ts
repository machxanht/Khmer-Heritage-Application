/**
 * Content Cache Manager
 * Tiered Cache Coordinator (L1 Memory Cache + L2 Persistent Browser Storage)
 * Ensures zero unnecessary network roundtrips and high-availability offline capability.
 */

import {
  Category,
  DataManifest,
  EntryDetail,
  EntrySummary,
} from '../../types/schema.ts';
import { BrowserStorageCache, BrowserStorageOptions } from './BrowserStorageCache.ts';
import { CacheDiagnostics, IContentCache } from './IContentCache.ts';
import { MemoryContentCache } from './MemoryContentCache.ts';

export interface CacheManagerOptions {
  enablePersistentStorage?: boolean;
  storageOptions?: BrowserStorageOptions;
  customL1Cache?: IContentCache;
  customL2Cache?: IContentCache;
}

export class ContentCacheManager implements IContentCache {
  readonly cacheId = 'tiered-cache-manager';

  private readonly l1Cache: IContentCache;
  private readonly l2Cache: IContentCache | null;

  constructor(options: CacheManagerOptions = {}) {
    this.l1Cache = options.customL1Cache || new MemoryContentCache();

    const enablePersistent = options.enablePersistentStorage ?? true;
    if (options.customL2Cache) {
      this.l2Cache = options.customL2Cache;
    } else if (enablePersistent) {
      this.l2Cache = new BrowserStorageCache(options.storageOptions);
    } else {
      this.l2Cache = null;
    }
  }

  isAvailable(): boolean {
    return this.l1Cache.isAvailable() || (this.l2Cache?.isAvailable() ?? false);
  }

  async getManifest(): Promise<DataManifest | null> {
    // 1. Check L1 Memory
    const l1 = await this.l1Cache.getManifest();
    if (l1) return l1;

    // 2. Check L2 Storage
    if (this.l2Cache) {
      const l2 = await this.l2Cache.getManifest();
      if (l2) {
        // Backfill L1
        await this.l1Cache.setManifest(l2);
        return l2;
      }
    }

    return null;
  }

  async setManifest(manifest: DataManifest): Promise<void> {
    await this.l1Cache.setManifest(manifest);
    if (this.l2Cache) {
      await this.l2Cache.setManifest(manifest);
    }
  }

  async getCategories(): Promise<Category[] | null> {
    // 1. Check L1 Memory
    const l1 = await this.l1Cache.getCategories();
    if (l1) return l1;

    // 2. Check L2 Storage
    if (this.l2Cache) {
      const l2 = await this.l2Cache.getCategories();
      if (l2) {
        // Backfill L1
        await this.l1Cache.setCategories(l2);
        return l2;
      }
    }

    return null;
  }

  async setCategories(categories: Category[]): Promise<void> {
    await this.l1Cache.setCategories(categories);
    if (this.l2Cache) {
      await this.l2Cache.setCategories(categories);
    }
  }

  async getEntrySummaries(): Promise<EntrySummary[] | null> {
    // 1. Check L1 Memory
    const l1 = await this.l1Cache.getEntrySummaries();
    if (l1) return l1;

    // 2. Check L2 Storage
    if (this.l2Cache) {
      const l2 = await this.l2Cache.getEntrySummaries();
      if (l2) {
        // Backfill L1
        await this.l1Cache.setEntrySummaries(l2);
        return l2;
      }
    }

    return null;
  }

  async setEntrySummaries(summaries: EntrySummary[]): Promise<void> {
    await this.l1Cache.setEntrySummaries(summaries);
    if (this.l2Cache) {
      await this.l2Cache.setEntrySummaries(summaries);
    }
  }

  async getEntryDetail(slugOrId: string): Promise<EntryDetail | null> {
    // 1. Check L1 Memory
    const l1 = await this.l1Cache.getEntryDetail(slugOrId);
    if (l1) return l1;

    // 2. Check L2 Storage
    if (this.l2Cache) {
      const l2 = await this.l2Cache.getEntryDetail(slugOrId);
      if (l2) {
        // Backfill L1
        await this.l1Cache.setEntryDetail(l2);
        return l2;
      }
    }

    return null;
  }

  async setEntryDetail(entry: EntryDetail): Promise<void> {
    await this.l1Cache.setEntryDetail(entry);
    if (this.l2Cache) {
      await this.l2Cache.setEntryDetail(entry);
    }
  }

  async invalidateAll(): Promise<void> {
    await this.l1Cache.invalidateAll();
    if (this.l2Cache) {
      await this.l2Cache.invalidateAll();
    }
  }

  async invalidateEntry(slugOrId: string): Promise<void> {
    await this.l1Cache.invalidateEntry(slugOrId);
    if (this.l2Cache) {
      await this.l2Cache.invalidateEntry(slugOrId);
    }
  }

  async getDiagnostics(): Promise<CacheDiagnostics> {
    const l1Diag = await this.l1Cache.getDiagnostics();
    const l2Diag = this.l2Cache ? await this.l2Cache.getDiagnostics() : null;

    return {
      providerId: this.cacheId,
      hasManifest: l1Diag.hasManifest || (l2Diag?.hasManifest ?? false),
      hasCategories: l1Diag.hasCategories || (l2Diag?.hasCategories ?? false),
      hasEntrySummaries: l1Diag.hasEntrySummaries || (l2Diag?.hasEntrySummaries ?? false),
      cachedEntriesCount: Math.max(l1Diag.cachedEntriesCount, l2Diag?.cachedEntriesCount ?? 0),
      storageType: l2Diag ? l2Diag.storageType : 'memory',
      lastCachedAt: l1Diag.lastCachedAt,
    };
  }
}
