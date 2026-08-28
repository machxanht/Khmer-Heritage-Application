/**
 * Persistent Browser Storage Cache (L2 Cache)
 * Stores verified content bundles across user sessions with schema validation,
 * corruption auto-detection, TTL support, and safe quota handling.
 */

import {
  Category,
  DataManifest,
  EntryDetail,
  EntrySummary,
} from '../../types/schema.ts';
import { CacheDiagnostics, CacheEntry, IContentCache } from './IContentCache.ts';

export interface BrowserStorageOptions {
  prefix?: string;
  storage?: Storage;
  manifestTtlMs?: number;       // Default: 5 minutes (300,000 ms)
  categoriesTtlMs?: number;     // Default: 24 hours (86,400,000 ms)
  entrySummariesTtlMs?: number; // Default: 6 hours (21,600,000 ms)
  entryDetailTtlMs?: number;    // Default: 7 days (604,800,000 ms)
  logger?: (msg: string, level?: 'info' | 'warn' | 'error') => void;
}

export class BrowserStorageCache implements IContentCache {
  readonly cacheId = 'browser-persisted-l2';
  private readonly prefix: string;
  private readonly storage: Storage | null;
  private readonly manifestTtlMs: number;
  private readonly categoriesTtlMs: number;
  private readonly entrySummariesTtlMs: number;
  private readonly entryDetailTtlMs: number;
  private readonly logger: (msg: string, level?: 'info' | 'warn' | 'error') => void;

  // Fallback in-memory map if browser storage is unavailable or disabled
  private readonly memoryFallback: Map<string, string> = new Map();

  constructor(options: BrowserStorageOptions = {}) {
    this.prefix = options.prefix || 'kh_cache_v1:';
    this.manifestTtlMs = options.manifestTtlMs ?? 5 * 60 * 1000;
    this.categoriesTtlMs = options.categoriesTtlMs ?? 24 * 60 * 60 * 1000;
    this.entrySummariesTtlMs = options.entrySummariesTtlMs ?? 6 * 60 * 60 * 1000;
    this.entryDetailTtlMs = options.entryDetailTtlMs ?? 7 * 24 * 60 * 60 * 1000;
    this.logger = options.logger ?? ((msg, level = 'info') => {
      if (level === 'error') console.error(`[BrowserStorageCache] ${msg}`);
      else if (level === 'warn') console.warn(`[BrowserStorageCache] ${msg}`);
    });

    if (options.storage) {
      this.storage = options.storage;
    } else if (typeof window !== 'undefined' && typeof window.localStorage !== 'undefined') {
      try {
        const testKey = `${this.prefix}__test__`;
        window.localStorage.setItem(testKey, '1');
        window.localStorage.removeItem(testKey);
        this.storage = window.localStorage;
      } catch {
        this.storage = null;
      }
    } else {
      this.storage = null;
    }
  }

  isAvailable(): boolean {
    return this.storage !== null || this.memoryFallback !== null;
  }

  private getItem(key: string): string | null {
    if (this.storage) {
      try {
        return this.storage.getItem(key);
      } catch (err) {
        this.logger(`Failed to read from storage: ${(err as Error).message}`, 'warn');
        return this.memoryFallback.get(key) || null;
      }
    }
    return this.memoryFallback.get(key) || null;
  }

  private setItem(key: string, value: string): void {
    if (this.storage) {
      try {
        this.storage.setItem(key, value);
        return;
      } catch (err: any) {
        // QuotaExceededError handling
        this.logger(`Storage quota exceeded or write failed: ${err.message}. Using fallback.`, 'warn');
      }
    }
    this.memoryFallback.set(key, value);
  }

  private removeItem(key: string): void {
    if (this.storage) {
      try {
        this.storage.removeItem(key);
      } catch {}
    }
    this.memoryFallback.delete(key);
  }

  private readValidatedCache<T>(
    key: string,
    validator: (data: unknown) => data is T
  ): T | null {
    const raw = this.getItem(key);
    if (!raw) return null;

    try {
      const parsed: CacheEntry<T> = JSON.parse(raw);
      if (!parsed || typeof parsed !== 'object' || !('data' in parsed)) {
        this.logger(`Corrupt cache entry for ${key}, discarding.`, 'warn');
        this.removeItem(key);
        return null;
      }

      // Check TTL expiry
      if (parsed.expiresAt && Date.now() > parsed.expiresAt) {
        this.removeItem(key);
        return null;
      }

      // Check data integrity with validator
      if (!validator(parsed.data)) {
        this.logger(`Invalid data structure in cache for ${key}, purging.`, 'warn');
        this.removeItem(key);
        return null;
      }

      return parsed.data;
    } catch (parseErr) {
      this.logger(`JSON parse failure reading cache ${key}, discarding: ${(parseErr as Error).message}`, 'warn');
      this.removeItem(key);
      return null;
    }
  }

  private writeCache<T>(key: string, data: T, ttlMs: number, schemaVersion = 1): void {
    const now = Date.now();
    const entry: CacheEntry<T> = {
      data,
      cachedAt: now,
      expiresAt: now + ttlMs,
      schemaVersion,
    };
    try {
      this.setItem(key, JSON.stringify(entry));
    } catch (err) {
      this.logger(`Failed to stringify cache entry for ${key}: ${(err as Error).message}`, 'warn');
    }
  }

  // --- Manifest ---

  async getManifest(): Promise<DataManifest | null> {
    return this.readValidatedCache<DataManifest>(
      `${this.prefix}manifest`,
      (data): data is DataManifest => {
        if (!data || typeof data !== 'object') return false;
        const m = data as Partial<DataManifest>;
        return typeof m.schemaVersion === 'number' && typeof m.contentHash === 'string' && typeof m.entriesCount === 'number';
      }
    );
  }

  async setManifest(manifest: DataManifest): Promise<void> {
    this.writeCache(`${this.prefix}manifest`, manifest, this.manifestTtlMs, manifest.schemaVersion);
  }

  // --- Categories ---

  async getCategories(): Promise<Category[] | null> {
    return this.readValidatedCache<Category[]>(
      `${this.prefix}categories`,
      (data): data is Category[] => {
        if (!Array.isArray(data) || data.length === 0) return false;
        return data.every((c) => c && typeof c === 'object' && c.id && c.title?.en);
      }
    );
  }

  async setCategories(categories: Category[]): Promise<void> {
    this.writeCache(`${this.prefix}categories`, categories, this.categoriesTtlMs);
  }

  // --- Entry Summaries ---

  async getEntrySummaries(): Promise<EntrySummary[] | null> {
    return this.readValidatedCache<EntrySummary[]>(
      `${this.prefix}entry_summaries`,
      (data): data is EntrySummary[] => {
        if (!Array.isArray(data) || data.length === 0) return false;
        return data.every((s) => s && typeof s === 'object' && s.id && s.slug && s.title);
      }
    );
  }

  async setEntrySummaries(summaries: EntrySummary[]): Promise<void> {
    this.writeCache(`${this.prefix}entry_summaries`, summaries, this.entrySummariesTtlMs);
  }

  // --- Entry Detail ---

  async getEntryDetail(slugOrId: string): Promise<EntryDetail | null> {
    const key = `${this.prefix}entry:${slugOrId}`;
    return this.readValidatedCache<EntryDetail>(
      key,
      (data): data is EntryDetail => {
        if (!data || typeof data !== 'object') return false;
        const e = data as Partial<EntryDetail>;
        return !!e.id && !!e.slug && !!e.title && !!e.content?.sections;
      }
    );
  }

  async setEntryDetail(entry: EntryDetail): Promise<void> {
    // Write under both ID and slug keys
    this.writeCache(`${this.prefix}entry:${entry.id}`, entry, this.entryDetailTtlMs, entry.version);
    this.writeCache(`${this.prefix}entry:${entry.slug}`, entry, this.entryDetailTtlMs, entry.version);
  }

  async invalidateAll(): Promise<void> {
    if (this.storage) {
      try {
        const keysToRemove: string[] = [];
        for (let i = 0; i < this.storage.length; i++) {
          const k = this.storage.key(i);
          if (k && k.startsWith(this.prefix)) {
            keysToRemove.push(k);
          }
        }
        keysToRemove.forEach((k) => this.storage?.removeItem(k));
      } catch {}
    }
    this.memoryFallback.clear();
  }

  async invalidateEntry(slugOrId: string): Promise<void> {
    this.removeItem(`${this.prefix}entry:${slugOrId}`);
  }

  async getDiagnostics(): Promise<CacheDiagnostics> {
    let hasManifest = false;
    let hasCategories = false;
    let hasEntrySummaries = false;
    const entryIds = new Set<string>();

    const checkKey = (k: string) => {
      if (k === `${this.prefix}manifest`) hasManifest = true;
      if (k === `${this.prefix}categories`) hasCategories = true;
      if (k === `${this.prefix}entry_summaries`) hasEntrySummaries = true;
      if (k.startsWith(`${this.prefix}entry:`)) {
        const idOrSlug = k.replace(`${this.prefix}entry:`, '');
        entryIds.add(idOrSlug);
      }
    };

    if (this.storage) {
      try {
        for (let i = 0; i < this.storage.length; i++) {
          const k = this.storage.key(i);
          if (k && k.startsWith(this.prefix)) checkKey(k);
        }
      } catch {}
    }

    this.memoryFallback.forEach((_, k) => {
      if (k.startsWith(this.prefix)) checkKey(k);
    });

    return {
      providerId: this.cacheId,
      hasManifest,
      hasCategories,
      hasEntrySummaries,
      cachedEntriesCount: entryIds.size,
      storageType: this.storage ? 'browser-storage' : 'memory',
    };
  }
}
