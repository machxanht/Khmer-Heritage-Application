/**
 * Offline Cache & Resilient Fallback Test Suite
 * Tests memory and browser storage caching, cache corruption auto-recovery,
 * TTL expiry, manifest validation, and seamless fallback degradation.
 */

import { Category, DataManifest, EntryDetail, EntrySummary, MediaAsset } from '../../../types/schema.ts';
import { BrowserStorageCache } from '../../cache/BrowserStorageCache.ts';
import { ContentCacheManager } from '../../cache/ContentCacheManager.ts';
import { MemoryContentCache } from '../../cache/MemoryContentCache.ts';
import { FoundationContentService } from '../../contentService.ts';
import { R2ContentProvider } from '../R2ContentProvider.ts';
import { StaticContentProvider } from '../StaticContentProvider.ts';

interface TestCaseResult {
  name: string;
  passed: boolean;
  error?: string;
  durationMs: number;
}

export async function runOfflineCacheTests(): Promise<{
  total: number;
  passed: number;
  failed: number;
  results: TestCaseResult[];
}> {
  const results: TestCaseResult[] = [];

  const runTest = async (name: string, fn: () => Promise<void>) => {
    const start = performance.now();
    try {
      await fn();
      results.push({
        name,
        passed: true,
        durationMs: Math.round(performance.now() - start),
      });
    } catch (err: any) {
      results.push({
        name,
        passed: false,
        error: err.message,
        durationMs: Math.round(performance.now() - start),
      });
    }
  };

  const sampleManifest: DataManifest = {
    version: '1.0.0',
    schemaVersion: 1,
    contentVersion: '1.0.0',
    lastUpdated: '2026-08-28T00:00:00Z',
    entriesCount: 16,
    categoriesCount: 12,
    contentHash: 'sha256-abc123mockhash',
    cdnBaseUrl: 'https://cdn.khmer-heritage.org/v1',
  };

  const sampleCategories: Category[] = [
    {
      id: 'temples',
      slug: 'temples',
      title: { km: 'ប្រាសាទ', en: 'Temples', vi: 'Đền đài', th: 'ปราสาท' },
      iconName: 'landmark',
      description: { km: 'ប្រាសាទបុរាណ', en: 'Ancient temples', vi: 'Đền cổ', th: 'ปราสาทโบราณ' },
      sortOrder: 1,
    },
  ];

  const sampleCoverMedia: MediaAsset = {
    id: 'm-angkor-01',
    url: 'https://images.unsplash.com/photo-1569154941061-e231b4725ef1',
    type: 'image',
    title: { km: 'ប្រាសាទអង្គរវត្ត', en: 'Angkor Wat Main Tower' },
    creator: 'Photographer',
    source: 'Wikimedia Commons',
    sourceUrl: 'https://commons.wikimedia.org',
    license: 'cc_by_sa',
    licenseUrl: 'https://creativecommons.org/licenses/by-sa/4.0/',
    attribution: 'Test photo (CC BY-SA 4.0)',
  };

  const sampleSummaries: EntrySummary[] = [
    {
      id: 'e-angkor-wat',
      slug: 'angkor-wat',
      categoryId: 'temples',
      title: { km: 'អង្គរវត្ត', en: 'Angkor Wat', vi: 'Angkor Wat', th: 'นครวัด' },
      summary: { km: 'ប្រាសាទអង្គរវត្ត', en: 'The great temple', vi: 'Đền Angkor', th: 'นครวัด' },
      era: { km: 'សម័យអង្គរ', en: 'Angkorian Era' },
      coverMedia: sampleCoverMedia,
    },
  ];

  const sampleDetail: EntryDetail = {
    id: 'e-angkor-wat',
    slug: 'angkor-wat',
    categoryId: 'temples',
    title: { km: 'អង្គរវត្ត', en: 'Angkor Wat', vi: 'Angkor Wat', th: 'นครวัด' },
    summary: { km: 'ប្រាសាទអង្គរវត្ត', en: 'The great temple', vi: 'Đền Angkor', th: 'นครวัด' },
    era: { km: 'សម័យអង្គរ', en: 'Angkorian Era' },
    coverMedia: sampleCoverMedia,
    gallery: [sampleCoverMedia],
    relatedEntryIds: [],
    citations: [],
    content: {
      sections: [
        {
          id: 'sec-overview',
          heading: { km: 'ទិដ្ឋភាពទូទៅ', en: 'Overview', vi: 'Tổng quan', th: 'ภาพรวม' },
          body: { km: 'ខ្លឹមសារ', en: 'Content detail here', vi: 'Chi tiết', th: 'รายละเอียด' },
        },
      ],
    },
    version: 1,
  };

  // Mock Storage engine for in-memory simulation of localStorage
  class MockStorage implements Storage {
    private store = new Map<string, string>();
    get length() { return this.store.size; }
    clear(): void { this.store.clear(); }
    getItem(key: string): string | null { return this.store.get(key) || null; }
    key(index: number): string | null { return Array.from(this.store.keys())[index] || null; }
    removeItem(key: string): void { this.store.delete(key); }
    setItem(key: string, value: string): void { this.store.set(key, value); }
  }

  // --- Test 1: MemoryContentCache operations ---
  await runTest('MemoryContentCache: set, get, multi-key indexing, and invalidation', async () => {
    const cache = new MemoryContentCache();
    await cache.setManifest(sampleManifest);
    await cache.setCategories(sampleCategories);
    await cache.setEntrySummaries(sampleSummaries);
    await cache.setEntryDetail(sampleDetail);

    const m = await cache.getManifest();
    if (!m || m.contentHash !== sampleManifest.contentHash) throw new Error('Manifest get mismatch');

    const c = await cache.getCategories();
    if (!c || c.length !== 1 || c[0].id !== 'temples') throw new Error('Categories get mismatch');

    const s = await cache.getEntrySummaries();
    if (!s || s.length !== 1 || s[0].slug !== 'angkor-wat') throw new Error('Summaries get mismatch');

    // Multi-key lookup: by ID and by slug
    const dById = await cache.getEntryDetail('e-angkor-wat');
    const dBySlug = await cache.getEntryDetail('angkor-wat');
    if (!dById || !dBySlug || dById.id !== dBySlug.id) throw new Error('Multi-key lookup failed');

    const diag = await cache.getDiagnostics();
    if (!diag.hasManifest || diag.cachedEntriesCount !== 1) throw new Error('Diagnostics mismatch');

    await cache.invalidateAll();
    if (await cache.getManifest() !== null) throw new Error('Cache not cleared');
  });

  // --- Test 2: BrowserStorageCache serialization, TTL, and validation ---
  await runTest('BrowserStorageCache: serialization, TTL expiration, and diagnostics', async () => {
    const mockStore = new MockStorage();
    const cache = new BrowserStorageCache({
      storage: mockStore,
      manifestTtlMs: 50, // 50ms TTL for testing
    });

    await cache.setManifest(sampleManifest);
    await cache.setCategories(sampleCategories);
    await cache.setEntryDetail(sampleDetail);

    const m1 = await cache.getManifest();
    if (!m1 || m1.schemaVersion !== 1) throw new Error('Manifest reading failed');

    // Wait for TTL to expire
    await new Promise((r) => setTimeout(r, 60));
    const m2 = await cache.getManifest();
    if (m2 !== null) throw new Error('Expired manifest was not purged');

    // Non-expired categories should still be present
    const cats = await cache.getCategories();
    if (!cats || cats.length !== 1) throw new Error('Categories should still be valid');
  });

  // --- Test 3: BrowserStorageCache corruption auto-recovery ---
  await runTest('BrowserStorageCache: auto-detects and purges corrupted JSON entries', async () => {
    const mockStore = new MockStorage();
    const cache = new BrowserStorageCache({ storage: mockStore, prefix: 'kh_test:' });

    // Inject corrupted raw string directly into storage
    mockStore.setItem('kh_test:entry:e-angkor-wat', '{ corrupted json payload broken... !!!');
    mockStore.setItem('kh_test:categories', JSON.stringify({ wrongStructure: true }));

    const corruptedEntry = await cache.getEntryDetail('e-angkor-wat');
    if (corruptedEntry !== null) throw new Error('Corrupted entry should return null');

    // Verify corrupt key was purged from storage
    if (mockStore.getItem('kh_test:entry:e-angkor-wat') !== null) {
      throw new Error('Corrupt key was not purged from storage');
    }

    const corruptedCategories = await cache.getCategories();
    if (corruptedCategories !== null) throw new Error('Corrupted categories should return null');
  });

  // --- Test 4: ContentCacheManager tiered resolution (L1 -> L2 -> Warm) ---
  await runTest('ContentCacheManager: tiered cache resolution and automatic L1 warming', async () => {
    const mockStore = new MockStorage();
    const l2 = new BrowserStorageCache({ storage: mockStore });
    const l1 = new MemoryContentCache();
    const manager = new ContentCacheManager({
      customL1Cache: l1,
      customL2Cache: l2,
    });

    // Write to L2 directly
    await l2.setEntryDetail(sampleDetail);

    // L1 should initially be empty
    if (await l1.getEntryDetail('angkor-wat') !== null) throw new Error('L1 should be empty initially');

    // Resolve through Manager -> should fetch from L2 and warm L1
    const detail = await manager.getEntryDetail('angkor-wat');
    if (!detail || detail.id !== 'e-angkor-wat') throw new Error('Manager failed to resolve from L2');

    // L1 should now be warmed
    const warmedL1 = await l1.getEntryDetail('angkor-wat');
    if (!warmedL1 || warmedL1.id !== 'e-angkor-wat') throw new Error('L1 was not warmed from L2 read');
  });

  // --- Test 5: Remote Success -> Caches Populated ---
  await runTest('R2ContentProvider: remote success populates L1 and L2 offline caches', async () => {
    const mockStore = new MockStorage();
    const cacheManager = new ContentCacheManager({
      customL2Cache: new BrowserStorageCache({ storage: mockStore }),
    });

    const mockFetch = async (url: string | URL | Request) => {
      const u = url.toString();
      if (u.endsWith('/manifest.json')) return new Response(JSON.stringify(sampleManifest), { status: 200 });
      if (u.endsWith('/categories.json')) return new Response(JSON.stringify(sampleCategories), { status: 200 });
      if (u.endsWith('/entries/index.json')) return new Response(JSON.stringify(sampleSummaries), { status: 200 });
      if (u.endsWith('/entries/e-angkor-wat.json')) return new Response(JSON.stringify(sampleDetail), { status: 200 });
      return new Response('Not Found', { status: 404 });
    };

    const provider = new R2ContentProvider({
      baseUrl: 'https://cdn.example.com/v1',
      cacheManager,
      fetchFn: mockFetch as any,
    });

    const m = await provider.getManifest();
    const c = await provider.getCategories();
    const s = await provider.getEntrySummaries();
    const d = await provider.getEntryDetail('angkor-wat');

    if (provider.getHealthStatus() !== 'healthy') throw new Error('Expected healthStatus to be healthy');
    if (!m || !c || !s || !d) throw new Error('Data fetch failed');

    // Verify cache manager now holds the items
    const cachedManifest = await cacheManager.getManifest();
    const cachedDetail = await cacheManager.getEntryDetail('angkor-wat');
    if (!cachedManifest || !cachedDetail) throw new Error('Cache was not populated on remote success');
  });

  // --- Test 6: Remote Failure -> Cached Content Fallback ---
  await runTest('R2ContentProvider: remote failure gracefully falls back to cached content', async () => {
    const mockStore = new MockStorage();
    const cacheManager = new ContentCacheManager({
      customL2Cache: new BrowserStorageCache({ storage: mockStore }),
    });

    // Pre-populate cache (as if from a previous online session)
    await cacheManager.setManifest(sampleManifest);
    await cacheManager.setCategories(sampleCategories);
    await cacheManager.setEntrySummaries(sampleSummaries);
    await cacheManager.setEntryDetail(sampleDetail);

    // Network is offline / throws
    const offlineFetch = async () => {
      throw new Error('TypeError: Failed to fetch (Network disconnected)');
    };

    const provider = new R2ContentProvider({
      baseUrl: 'https://cdn.example.com/v1',
      cacheManager,
      fetchFn: offlineFetch as any,
    });

    const manifest = await provider.getManifest();
    const categories = await provider.getCategories();
    const summaries = await provider.getEntrySummaries();
    const detail = await provider.getEntryDetail('angkor-wat');

    if (!manifest || manifest.contentHash !== sampleManifest.contentHash) throw new Error('Fallback manifest mismatch');
    if (!categories || categories.length !== 1) throw new Error('Fallback categories mismatch');
    if (!summaries || summaries.length !== 1) throw new Error('Fallback summaries mismatch');
    if (!detail || detail.id !== 'e-angkor-wat') throw new Error('Fallback entry detail mismatch');
    if (provider.getHealthStatus() !== 'cached') {
      throw new Error(`Expected healthStatus 'cached', got '${provider.getHealthStatus()}'`);
    }
  });

  // --- Test 7: Remote Failure + No Cache -> Local Bundled Fallback ---
  await runTest('R2ContentProvider: remote failure without cache falls back to local static bundle', async () => {
    const emptyCacheManager = new ContentCacheManager({ enablePersistentStorage: false });
    const offlineFetch = async () => {
      throw new Error('Network error 500');
    };

    const provider = new R2ContentProvider({
      baseUrl: 'https://cdn.example.com/v1',
      cacheManager: emptyCacheManager,
      fetchFn: offlineFetch as any,
    });

    const manifest = await provider.getManifest();
    const categories = await provider.getCategories();
    const entries = await provider.getEntries();

    if (!manifest || manifest.entriesCount !== 16) throw new Error('Local static fallback manifest mismatch');
    if (!categories || categories.length !== 12) throw new Error('Local static fallback categories mismatch');
    if (!entries || entries.length !== 16) throw new Error('Local static fallback entries count mismatch');
    if (provider.getHealthStatus() !== 'fallback') {
      throw new Error(`Expected healthStatus 'fallback', got '${provider.getHealthStatus()}'`);
    }
  });

  // --- Test 8: Invalid Cache Discard & Fallback ---
  await runTest('R2ContentProvider: invalid / corrupted cache is discarded and falls back safely', async () => {
    const mockStore = new MockStorage();
    // Put corrupt JSON in storage
    mockStore.setItem('kh_cache_v1:manifest', 'CORRUPT_NOT_JSON');
    mockStore.setItem('kh_cache_v1:categories', JSON.stringify({ bad: 123 }));

    const cacheManager = new ContentCacheManager({
      customL2Cache: new BrowserStorageCache({ storage: mockStore }),
    });

    const failingFetch = async () => {
      throw new Error('HTTP 503 Service Unavailable');
    };

    const provider = new R2ContentProvider({
      baseUrl: 'https://cdn.example.com/v1',
      cacheManager,
      fetchFn: failingFetch as any,
    });

    const manifest = await provider.getManifest();
    const categories = await provider.getCategories();

    // Must return valid bundled static data, not throwing or returning corrupt object
    if (!manifest || manifest.entriesCount !== 16) throw new Error('Failed to recover from corrupt cache');
    if (!categories || categories.length !== 12) throw new Error('Failed to recover categories from corrupt cache');
  });

  // --- Test 9: Schema Version Incompatibility Rejection ---
  await runTest('R2ContentProvider: incompatible remote schema version rejected & handled gracefully', async () => {
    const incompatibleManifest = {
      schemaVersion: 999, // Incompatible future schema
      contentVersion: '99.0.0',
      entriesCount: 50,
      categoriesCount: 20,
      contentHash: 'sha256-future',
    };

    const mockFetch = async (url: string | URL | Request) => {
      if (url.toString().endsWith('/manifest.json')) {
        return new Response(JSON.stringify(incompatibleManifest), { status: 200 });
      }
      return new Response('Not Found', { status: 404 });
    };

    const provider = new R2ContentProvider({
      baseUrl: 'https://cdn.example.com/v1',
      expectedSchemaVersion: 1,
      fetchFn: mockFetch as any,
    });

    const manifest = await provider.getManifest();
    // Should reject incompatible remote manifest and fall back to local bundled manifest (version 1)
    if (manifest.schemaVersion !== 1) {
      throw new Error(`Incompatible manifest was not rejected: schemaVersion ${manifest.schemaVersion}`);
    }
  });

  // --- Test 10: FoundationContentService Integration ---
  await runTest('FoundationContentService: seamlessly operates with R2ContentProvider and offline cache', async () => {
    const mockStore = new MockStorage();
    const cacheManager = new ContentCacheManager({
      customL2Cache: new BrowserStorageCache({ storage: mockStore }),
    });

    const mockFetch = async (url: string | URL | Request) => {
      const u = url.toString();
      if (u.endsWith('/manifest.json')) return new Response(JSON.stringify(sampleManifest), { status: 200 });
      if (u.endsWith('/categories.json')) return new Response(JSON.stringify(sampleCategories), { status: 200 });
      if (u.endsWith('/entries/index.json')) return new Response(JSON.stringify(sampleSummaries), { status: 200 });
      if (u.endsWith('/entries/e-angkor-wat.json')) return new Response(JSON.stringify(sampleDetail), { status: 200 });
      return new Response('Not Found', { status: 404 });
    };

    const r2Provider = new R2ContentProvider({
      baseUrl: 'https://cdn.example.com/v1',
      cacheManager,
      fetchFn: mockFetch as any,
    });

    const service = new FoundationContentService(r2Provider);
    if (service.getProviderId() !== 'cloudflare-r2') throw new Error('Provider ID mismatch');

    const summaries = await service.getEntrySummaries();
    if (summaries.length !== 1 || summaries[0].slug !== 'angkor-wat') throw new Error('Summary fetch failed');

    const detail = await service.getEntryDetail('angkor-wat');
    if (!detail || detail.id !== 'e-angkor-wat') throw new Error('Entry detail fetch failed');

    // Hot swap back to static
    service.setProvider(new StaticContentProvider());
    if (service.getProviderId() !== 'static-bundled') throw new Error('Hot-swap failed');
    const staticSummaries = await service.getEntrySummaries();
    if (staticSummaries.length !== 16) throw new Error('Static provider summary length mismatch');
  });

  const passed = results.filter((r) => r.passed).length;
  const failed = results.filter((r) => !r.passed).length;

  return {
    total: results.length,
    passed,
    failed,
    results,
  };
}

// Standalone execution
if (typeof process !== 'undefined' && process.argv[1]?.endsWith('offlineCache.test.ts')) {
  (async () => {
    console.log('Running Offline Cache & Resilient Fallback Unit Tests...');
    const report = await runOfflineCacheTests();
    console.log(`Passed: ${report.passed}/${report.total} (${report.failed} failed)`);
    report.results.forEach((r) => {
      console.log(` ${r.passed ? '✓' : '✗'} ${r.name} (${r.durationMs}ms)`);
      if (r.error) console.log(`   Error: ${r.error}`);
    });
    process.exit(report.failed > 0 ? 1 : 0);
  })();
}
