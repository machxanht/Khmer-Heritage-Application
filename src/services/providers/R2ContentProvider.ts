/**
 * Cloudflare R2 / Remote CDN Content Provider with Offline Cache Foundation
 * Fetches versioned static JSON content bundles from remote storage (or local static CDN)
 * with schema verification, deterministic integrity validation, tiered L1/L2 caching,
 * and resilient local fallback.
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
} from '../../types/schema.ts';
import { ContentCacheManager } from '../cache/ContentCacheManager.ts';
import { IContentCache } from '../cache/IContentCache.ts';
import { IContentProvider } from './IContentProvider.ts';
import { StaticContentProvider } from './StaticContentProvider.ts';

export interface R2ContentProviderOptions {
  /**
   * Base URL for the remote versioned content distribution.
   * Defaults to import.meta.env.VITE_CONTENT_BASE_URL or '/content/v1'.
   */
  baseUrl?: string;

  /**
   * Local fallback provider to use if remote is unreachable or invalid.
   * Defaults to new StaticContentProvider().
   */
  fallbackProvider?: IContentProvider;

  /**
   * Cache manager for tiered in-memory and persistent browser storage.
   * Defaults to new ContentCacheManager().
   */
  cacheManager?: IContentCache;

  /**
   * Custom fetch function (allows mocking in Node test suites or custom headers).
   */
  fetchFn?: typeof fetch;

  /**
   * Network request timeout in milliseconds (default: 8000ms).
   */
  timeoutMs?: number;

  /**
   * Expected schema version. Default: 1.
   */
  expectedSchemaVersion?: number;

  /**
   * Whether to enforce strict schema/hash validation before serving remote data.
   * Default: true.
   */
  strictValidation?: boolean;

  /**
   * Logger function or null to disable logs.
   */
  logger?: (msg: string, level?: 'info' | 'warn' | 'error') => void;
}

export type ProviderHealthStatus = 'uninitialized' | 'healthy' | 'cached' | 'fallback';

export class R2ContentProvider implements IContentProvider {
  readonly providerId = 'cloudflare-r2';
  private readonly baseUrl: string;
  private readonly fallbackProvider: IContentProvider;
  private readonly cacheManager: IContentCache;
  private readonly fetchFn: typeof fetch;
  private readonly timeoutMs: number;
  private readonly expectedSchemaVersion: number;
  private readonly strictValidation: boolean;
  private readonly logger: (msg: string, level?: 'info' | 'warn' | 'error') => void;

  private healthStatus: ProviderHealthStatus = 'uninitialized';
  private lastError: Error | null = null;

  constructor(options: R2ContentProviderOptions = {}) {
    // Resolve base URL safely across Vite client and Node.js environments
    let resolvedBaseUrl: string = options.baseUrl || '';
    if (!resolvedBaseUrl) {
      if (typeof import.meta !== 'undefined' && (import.meta as any).env?.VITE_CONTENT_BASE_URL) {
        resolvedBaseUrl = (import.meta as any).env.VITE_CONTENT_BASE_URL;
      } else if (typeof process !== 'undefined' && process.env?.VITE_CONTENT_BASE_URL) {
        resolvedBaseUrl = process.env.VITE_CONTENT_BASE_URL || '/content/v1';
      } else {
        resolvedBaseUrl = '/content/v1';
      }
    }
    // Remove trailing slash for consistent path concatenation
    this.baseUrl = (resolvedBaseUrl || '/content/v1').replace(/\/+$/, '');

    this.fallbackProvider = options.fallbackProvider || new StaticContentProvider();
    this.cacheManager = options.cacheManager || new ContentCacheManager();
    this.fetchFn = options.fetchFn || (typeof fetch !== 'undefined' ? fetch.bind(globalThis) : async () => {
      throw new Error('fetch is not available in current environment');
    });
    this.timeoutMs = options.timeoutMs ?? 8000;
    this.expectedSchemaVersion = options.expectedSchemaVersion ?? 1;
    this.strictValidation = options.strictValidation ?? true;
    this.logger = options.logger ?? ((msg, level = 'info') => {
      if (level === 'error') console.error(`[R2ContentProvider] ${msg}`);
      else if (level === 'warn') console.warn(`[R2ContentProvider] ${msg}`);
    });
  }

  getHealthStatus(): ProviderHealthStatus {
    return this.healthStatus;
  }

  getLastError(): Error | null {
    return this.lastError;
  }

  getBaseUrl(): string {
    return this.baseUrl;
  }

  getCacheManager(): IContentCache {
    return this.cacheManager;
  }

  async clearCache(): Promise<void> {
    await this.cacheManager.invalidateAll();
  }

  /**
   * Internal HTTP helper with timeout and error handling.
   */
  private async fetchJson<T>(relativePath: string): Promise<T> {
    const cleanPath = relativePath.startsWith('/') ? relativePath : `/${relativePath}`;
    const url = `${this.baseUrl}${cleanPath}`;

    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), this.timeoutMs);

    try {
      const response = await this.fetchFn(url, {
        signal: controller.signal,
        headers: {
          Accept: 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP ${response.status} ${response.statusText} fetching ${url}`);
      }

      const text = await response.text();
      let data: unknown;
      try {
        data = JSON.parse(text);
      } catch (parseErr) {
        throw new Error(`Invalid JSON received from ${url}: ${(parseErr as Error).message}`);
      }

      return data as T;
    } catch (err: any) {
      if (err.name === 'AbortError') {
        throw new Error(`Request timed out after ${this.timeoutMs}ms fetching ${url}`);
      }
      throw err;
    } finally {
      clearTimeout(timer);
    }
  }

  /**
   * Validates remote DataManifest.
   */
  private validateManifest(manifest: unknown): DataManifest {
    if (!manifest || typeof manifest !== 'object') {
      throw new Error('Manifest is missing or not a valid JSON object');
    }
    const m = manifest as Partial<DataManifest>;
    if (typeof m.schemaVersion !== 'number') {
      throw new Error('Manifest missing valid schemaVersion');
    }
    if (this.strictValidation && m.schemaVersion !== this.expectedSchemaVersion) {
      throw new Error(
        `Manifest schemaVersion ${m.schemaVersion} is incompatible with expected schemaVersion ${this.expectedSchemaVersion}`
      );
    }
    if (typeof m.entriesCount !== 'number' || m.entriesCount < 0) {
      throw new Error('Manifest missing or invalid entriesCount');
    }
    if (typeof m.categoriesCount !== 'number' || m.categoriesCount < 0) {
      throw new Error('Manifest missing or invalid categoriesCount');
    }
    if (!m.contentHash || typeof m.contentHash !== 'string' || m.contentHash.trim().length === 0) {
      throw new Error('Manifest missing deterministic contentHash');
    }
    return manifest as DataManifest;
  }

  /**
   * Validates categories array.
   */
  private validateCategories(categories: unknown): Category[] {
    if (!Array.isArray(categories)) {
      throw new Error('Categories response is not an array');
    }
    if (categories.length === 0) {
      throw new Error('Categories response is empty');
    }
    for (let i = 0; i < categories.length; i++) {
      const cat = categories[i];
      if (!cat || typeof cat !== 'object' || !cat.id || !cat.title || !cat.title.km || !cat.title.en) {
        throw new Error(`Category at index ${i} is missing required fields (id, localized title)`);
      }
    }
    return categories as Category[];
  }

  /**
   * Validates entry summary index.
   */
  private validateEntryIndex(index: unknown): EntrySummary[] {
    if (!Array.isArray(index)) {
      throw new Error('Entry index is not an array');
    }
    if (index.length === 0) {
      throw new Error('Entry index is empty');
    }
    for (let i = 0; i < index.length; i++) {
      const item = index[i];
      if (!item || typeof item !== 'object' || !item.id || !item.slug || !item.title || !item.categoryId) {
        throw new Error(
          `Entry summary at index ${i} is missing required fields (id, slug, title, categoryId)`
        );
      }
    }
    return index as EntrySummary[];
  }

  /**
   * Validates single EntryDetail.
   */
  private validateEntryDetail(entry: unknown, expectedIdOrSlug: string): EntryDetail {
    if (!entry || typeof entry !== 'object') {
      throw new Error(`Entry detail for ${expectedIdOrSlug} is not a valid JSON object`);
    }
    const e = entry as Partial<EntryDetail>;
    if (!e.id || !e.slug || !e.title || !e.categoryId || !e.content?.sections) {
      throw new Error(
        `Entry detail for ${expectedIdOrSlug} is missing core fields (id, slug, title, content.sections)`
      );
    }
    return entry as EntryDetail;
  }

  // --- IContentProvider Implementation with Tiered Cache & Fallback Guard ---

  async getManifest(): Promise<DataManifest> {
    // 1. Try Cache First
    const cached = await this.cacheManager.getManifest();
    if (cached) {
      this.healthStatus = 'cached';
      return cached;
    }

    // 2. Remote Fetch
    try {
      const raw = await this.fetchJson<unknown>('/manifest.json');
      const valid = this.validateManifest(raw);
      await this.cacheManager.setManifest(valid);
      this.healthStatus = 'healthy';
      this.lastError = null;
      return valid;
    } catch (err: any) {
      this.handleRemoteError(err, 'getManifest');

      // 3. Fallback to cached content if any
      const staleCached = await this.cacheManager.getManifest();
      if (staleCached) {
        this.healthStatus = 'cached';
        return staleCached;
      }

      // 4. Fallback to local static provider
      return this.fallbackProvider.getManifest();
    }
  }

  async getCategories(): Promise<Category[]> {
    // 1. Try Cache First
    const cached = await this.cacheManager.getCategories();
    if (cached) {
      this.healthStatus = 'cached';
      return cached;
    }

    // 2. Remote Fetch
    try {
      const raw = await this.fetchJson<unknown>('/categories.json');
      const valid = this.validateCategories(raw);
      await this.cacheManager.setCategories(valid);
      this.healthStatus = 'healthy';
      return valid;
    } catch (err: any) {
      this.handleRemoteError(err, 'getCategories');

      // 3. Fallback to cached content
      const staleCached = await this.cacheManager.getCategories();
      if (staleCached) {
        this.healthStatus = 'cached';
        return staleCached;
      }

      // 4. Fallback to local static provider
      return this.fallbackProvider.getCategories();
    }
  }

  async getEntrySummaries(): Promise<EntrySummary[]> {
    // 1. Try Cache First
    const cached = await this.cacheManager.getEntrySummaries();
    if (cached) {
      this.healthStatus = 'cached';
      return cached;
    }

    // 2. Remote Fetch
    try {
      const raw = await this.fetchJson<unknown>('/entries/index.json');
      const valid = this.validateEntryIndex(raw);
      await this.cacheManager.setEntrySummaries(valid);
      this.healthStatus = 'healthy';
      return valid;
    } catch (err: any) {
      this.handleRemoteError(err, 'getEntrySummaries');

      // 3. Fallback to cached content
      const staleCached = await this.cacheManager.getEntrySummaries();
      if (staleCached) {
        this.healthStatus = 'cached';
        return staleCached;
      }

      // 4. Fallback to local static provider
      if (this.fallbackProvider.getEntrySummaries) {
        return this.fallbackProvider.getEntrySummaries();
      }
      const full = await this.fallbackProvider.getEntries();
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
  }

  async getEntriesByCategory(categoryId: string): Promise<EntrySummary[]> {
    try {
      const summaries = await this.getEntrySummaries();
      const target = categoryId.toLowerCase();
      return summaries.filter(
        (s) =>
          (s.categoryId && s.categoryId.toLowerCase() === target) ||
          (s.category && s.category.toLowerCase() === target)
      );
    } catch (err: any) {
      this.handleRemoteError(err, `getEntriesByCategory(${categoryId})`);
      return this.fallbackProvider.getEntriesByCategory(categoryId);
    }
  }

  async getEntryDetail(slugOrId: string): Promise<EntryDetail | null> {
    // 1. Try Cache First
    const cached = await this.cacheManager.getEntryDetail(slugOrId);
    if (cached) {
      this.healthStatus = 'cached';
      return cached;
    }

    // 2. Remote Fetch
    try {
      let targetId = slugOrId;
      // If slugOrId doesn't look like an ID (e.g. e-*), look it up in the entry index
      if (!targetId.startsWith('e-')) {
        try {
          const index = await this.getEntrySummaries();
          const match = index.find((i) => i.slug === slugOrId || i.id === slugOrId);
          if (match) {
            targetId = match.id;
          }
        } catch {}
      }

      const raw = await this.fetchJson<unknown>(`/entries/${targetId}.json`);
      const valid = this.validateEntryDetail(raw, slugOrId);

      // Write to cache under both ID and slug
      await this.cacheManager.setEntryDetail(valid);
      this.healthStatus = 'healthy';
      return valid;
    } catch (err: any) {
      this.handleRemoteError(err, `getEntryDetail(${slugOrId})`);

      // 3. Fallback to cached content
      const staleCached = await this.cacheManager.getEntryDetail(slugOrId);
      if (staleCached) {
        this.healthStatus = 'cached';
        return staleCached;
      }

      // 4. Fallback to local static provider
      return this.fallbackProvider.getEntryDetail(slugOrId);
    }
  }

  async getEntries(): Promise<EntryDetail[]> {
    try {
      const summaries = await this.getEntrySummaries();
      const details = await Promise.all(
        summaries.map((s) => this.getEntryDetail(s.id))
      );
      const validDetails = details.filter((d): d is EntryDetail => d !== null);
      if (validDetails.length === summaries.length) {
        return validDetails;
      }
      return this.fallbackProvider.getEntries();
    } catch (err: any) {
      this.handleRemoteError(err, 'getEntries');
      return this.fallbackProvider.getEntries();
    }
  }

  async getSites(): Promise<HeritageSite[]> {
    return this.fallbackProvider.getSites();
  }

  async getEras(): Promise<Era[]> {
    return this.fallbackProvider.getEras();
  }

  async getTrails(): Promise<Trail[]> {
    return this.fallbackProvider.getTrails();
  }

  async getInstruments(): Promise<Instrument[]> {
    return this.fallbackProvider.getInstruments();
  }

  private handleRemoteError(err: unknown, operation: string): void {
    const error = err instanceof Error ? err : new Error(String(err));
    this.lastError = error;
    this.healthStatus = 'fallback';
    this.logger(
      `Remote operation '${operation}' failed: ${error.message}. Delegating to cache / local fallback.`,
      'warn'
    );
  }
}
