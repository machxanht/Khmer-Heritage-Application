/**
 * Content Cache Contract
 * Defines unified caching interfaces for memory and persistent browser storage.
 */

import {
  Category,
  DataManifest,
  EntryDetail,
  EntrySummary,
} from '../../types/schema.ts';

export interface CacheEntry<T> {
  data: T;
  cachedAt: number; // Unix timestamp ms
  schemaVersion: number;
  contentHash?: string;
  expiresAt?: number; // Optional TTL expiry timestamp
}

export interface CacheDiagnostics {
  providerId: string;
  hasManifest: boolean;
  hasCategories: boolean;
  hasEntrySummaries: boolean;
  cachedEntriesCount: number;
  storageType: 'memory' | 'browser-storage' | 'indexeddb' | 'none';
  lastCachedAt?: number;
}

export interface IContentCache {
  readonly cacheId: string;

  getManifest(): Promise<DataManifest | null>;
  setManifest(manifest: DataManifest): Promise<void>;

  getCategories(): Promise<Category[] | null>;
  setCategories(categories: Category[]): Promise<void>;

  getEntrySummaries(): Promise<EntrySummary[] | null>;
  setEntrySummaries(summaries: EntrySummary[]): Promise<void>;

  getEntryDetail(slugOrId: string): Promise<EntryDetail | null>;
  setEntryDetail(entry: EntryDetail): Promise<void>;

  invalidateAll(): Promise<void>;
  invalidateEntry(slugOrId: string): Promise<void>;

  getDiagnostics(): Promise<CacheDiagnostics>;
  isAvailable(): boolean;
}
