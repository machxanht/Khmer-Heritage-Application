/**
 * Cloudflare R2 Content Provider — Unit & Integration Test Suite
 * Tests remote manifest ingestion, HTTP fetching, format verification, edge case error recovery, and local fallback.
 */

import * as fs from 'fs';
import * as path from 'path';
import { R2ContentProvider } from '../R2ContentProvider.ts';
import { StaticContentProvider } from '../StaticContentProvider.ts';
import { FoundationContentService } from '../../contentService.ts';
import { Category, DataManifest, EntryDetail, EntrySummary } from '../../../types/schema.ts';

export interface R2TestCaseResult {
  suite: string;
  name: string;
  passed: boolean;
  error?: string;
  durationMs: number;
}

export interface R2TestSuiteReport {
  total: number;
  passed: number;
  failed: number;
  durationMs: number;
  results: R2TestCaseResult[];
}

export async function runR2ProviderTestSuite(): Promise<R2TestSuiteReport> {
  const suiteStart = performance.now();
  const results: R2TestCaseResult[] = [];

  // Helper to record assertions
  async function test(suite: string, name: string, fn: () => Promise<void> | void) {
    const start = performance.now();
    try {
      await fn();
      results.push({
        suite,
        name,
        passed: true,
        durationMs: +(performance.now() - start).toFixed(2),
      });
    } catch (err: any) {
      results.push({
        suite,
        name,
        passed: false,
        error: err.message || String(err),
        durationMs: +(performance.now() - start).toFixed(2),
      });
    }
  }

  // Load real content/v1 bundle files for mock fetch simulation
  const contentDir = path.resolve(process.cwd(), 'content/v1');
  const realManifest = JSON.parse(fs.readFileSync(path.join(contentDir, 'manifest.json'), 'utf-8'));
  const realCategories = JSON.parse(fs.readFileSync(path.join(contentDir, 'categories.json'), 'utf-8'));
  const realIndex = JSON.parse(fs.readFileSync(path.join(contentDir, 'entries/index.json'), 'utf-8'));
  const realEntryWat = JSON.parse(fs.readFileSync(path.join(contentDir, 'entries/e-angkor-wat.json'), 'utf-8'));

  // --------------------------------------------------------------------------
  // 1. MANIFEST SUITE
  // --------------------------------------------------------------------------
  await test('Manifest', 'should successfully fetch and validate compliant remote manifest', async () => {
    const mockFetch = async (url: string | URL | Request) => {
      const urlStr = String(url);
      if (urlStr.endsWith('/manifest.json')) {
        return new Response(JSON.stringify(realManifest), { status: 200, headers: { 'Content-Type': 'application/json' } });
      }
      return new Response('Not found', { status: 404 });
    };

    const provider = new R2ContentProvider({
      baseUrl: 'https://cdn.khmer-heritage.org/v1',
      fetchFn: mockFetch as any,
    });

    const manifest = await provider.getManifest();
    if (!manifest || manifest.schemaVersion !== 1) {
      throw new Error(`Expected schemaVersion 1, got ${manifest?.schemaVersion}`);
    }
    if (manifest.contentHash !== realManifest.contentHash) {
      throw new Error(`Expected contentHash ${realManifest.contentHash}, got ${manifest.contentHash}`);
    }
    if (provider.getHealthStatus() !== 'healthy') {
      throw new Error(`Expected healthStatus 'healthy', got '${provider.getHealthStatus()}'`);
    }
  });

  await test('Manifest', 'should detect malformed manifest and fallback to static provider', async () => {
    const mockFetch = async () => {
      // Missing required schemaVersion and contentHash
      return new Response(JSON.stringify({ bad: 'manifest' }), { status: 200 });
    };

    const fallback = new StaticContentProvider();
    const provider = new R2ContentProvider({
      baseUrl: 'https://cdn.khmer-heritage.org/v1',
      fallbackProvider: fallback,
      fetchFn: mockFetch as any,
    });

    const manifest = await provider.getManifest();
    if (!manifest || !manifest.contentHash) {
      throw new Error('Fallback provider should have returned valid fallback manifest');
    }
    if (provider.getHealthStatus() !== 'fallback') {
      throw new Error(`Expected healthStatus 'fallback', got '${provider.getHealthStatus()}'`);
    }
  });

  await test('Manifest', 'should reject schema version mismatch in strict mode', async () => {
    const mockFetch = async () => {
      return new Response(JSON.stringify({ ...realManifest, schemaVersion: 99 }), { status: 200 });
    };

    const provider = new R2ContentProvider({
      baseUrl: 'https://cdn.khmer-heritage.org/v1',
      expectedSchemaVersion: 1,
      strictValidation: true,
      fetchFn: mockFetch as any,
    });

    const manifest = await provider.getManifest();
    if (!manifest) throw new Error('Expected fallback manifest');
    if (provider.getHealthStatus() !== 'fallback') {
      throw new Error('Provider should be in fallback state due to schema mismatch');
    }
  });

  // --------------------------------------------------------------------------
  // 2. FETCH & NETWORK SUITE
  // --------------------------------------------------------------------------
  await test('Fetch', 'should handle network failure gracefully with local fallback', async () => {
    const mockFetch = async () => {
      throw new TypeError('Failed to fetch (Network unreachable)');
    };

    const provider = new R2ContentProvider({
      baseUrl: 'https://cdn.khmer-heritage.org/v1',
      fetchFn: mockFetch as any,
    });

    const categories = await provider.getCategories();
    if (!categories || categories.length !== 12) {
      throw new Error(`Expected 12 fallback categories, got ${categories?.length}`);
    }
    if (provider.getHealthStatus() !== 'fallback') {
      throw new Error('Provider should transition to fallback on network failure');
    }
    if (!provider.getLastError()?.message.includes('Network unreachable')) {
      throw new Error(`Expected lastError with network message, got: ${provider.getLastError()?.message}`);
    }
  });

  await test('Fetch', 'should handle HTTP 500 server error with fallback', async () => {
    const mockFetch = async () => {
      return new Response('Internal Server Error', { status: 500, statusText: 'Internal Server Error' });
    };

    const provider = new R2ContentProvider({
      baseUrl: 'https://cdn.khmer-heritage.org/v1',
      fetchFn: mockFetch as any,
    });

    const summaries = await provider.getEntrySummaries();
    if (!summaries || summaries.length !== 16) {
      throw new Error(`Expected 16 fallback summaries, got ${summaries?.length}`);
    }
    if (provider.getHealthStatus() !== 'fallback') {
      throw new Error('Expected fallback status on HTTP 500');
    }
  });

  await test('Fetch', 'should handle malformed non-JSON response gracefully', async () => {
    const mockFetch = async () => {
      return new Response('<html><head><title>502 Bad Gateway</title></head></html>', { status: 200 });
    };

    const provider = new R2ContentProvider({
      baseUrl: 'https://cdn.khmer-heritage.org/v1',
      fetchFn: mockFetch as any,
    });

    const categories = await provider.getCategories();
    if (!categories || categories.length !== 12) {
      throw new Error(`Expected fallback categories, got ${categories?.length}`);
    }
    if (provider.getHealthStatus() !== 'fallback') {
      throw new Error('Expected fallback status on JSON parse error');
    }
  });

  await test('Fetch', 'should abort on network timeout and fallback', async () => {
    const mockFetch = async (_url: any, options: any) => {
      // Hang until aborted
      return new Promise<Response>((_, reject) => {
        if (options?.signal) {
          options.signal.addEventListener('abort', () => {
            const err = new Error('The operation was aborted');
            err.name = 'AbortError';
            reject(err);
          });
        }
      });
    };

    const provider = new R2ContentProvider({
      baseUrl: 'https://cdn.khmer-heritage.org/v1',
      timeoutMs: 50, // fast timeout
      fetchFn: mockFetch as any,
    });

    const summaries = await provider.getEntrySummaries();
    if (!summaries || summaries.length !== 16) {
      throw new Error(`Expected 16 fallback summaries on timeout, got ${summaries?.length}`);
    }
    if (provider.getHealthStatus() !== 'fallback') {
      throw new Error('Expected fallback status on timeout');
    }
  });

  // --------------------------------------------------------------------------
  // 3. ENTRIES & CATEGORIES SUITE
  // --------------------------------------------------------------------------
  await test('Entries', 'should fetch remote entry categories and cache in memory', async () => {
    let fetchCount = 0;
    const mockFetch = async (url: any) => {
      fetchCount++;
      if (String(url).endsWith('/categories.json')) {
        return new Response(JSON.stringify(realCategories), { status: 200 });
      }
      return new Response('Not found', { status: 404 });
    };

    const provider = new R2ContentProvider({
      baseUrl: 'https://cdn.khmer-heritage.org/v1',
      fetchFn: mockFetch as any,
    });

    const cat1 = await provider.getCategories();
    const cat2 = await provider.getCategories(); // should use cache

    if (cat1.length !== 12 || cat2.length !== 12) {
      throw new Error(`Expected 12 categories, got ${cat1.length}`);
    }
    if (fetchCount !== 1) {
      throw new Error(`Expected 1 network call due to memory caching, but got ${fetchCount}`);
    }
  });

  await test('Entries', 'should fetch entry detail by ID and resolve by slug', async () => {
    const mockFetch = async (url: any) => {
      const u = String(url);
      if (u.endsWith('/entries/index.json')) {
        return new Response(JSON.stringify(realIndex), { status: 200 });
      }
      if (u.endsWith('/entries/e-angkor-wat.json')) {
        return new Response(JSON.stringify(realEntryWat), { status: 200 });
      }
      return new Response('Not found', { status: 404 });
    };

    const provider = new R2ContentProvider({
      baseUrl: 'https://cdn.khmer-heritage.org/v1',
      fetchFn: mockFetch as any,
    });

    // Fetch by slug
    const bySlug = await provider.getEntryDetail('angkor-wat');
    if (!bySlug || bySlug.id !== 'e-angkor-wat') {
      throw new Error(`Expected angkor-wat entry, got: ${bySlug?.id}`);
    }

    // Fetch by ID
    const byId = await provider.getEntryDetail('e-angkor-wat');
    if (!byId || byId.slug !== 'angkor-wat') {
      throw new Error(`Expected angkor-wat entry, got: ${byId?.slug}`);
    }

    // Verify key fields
    if (byId.citations.length === 0 || byId.content.sections.length === 0) {
      throw new Error('Entry detail missing citations or sections');
    }
  });

  await test('Entries', 'should fallback to local entry detail on 404 missing remote file', async () => {
    const mockFetch = async (url: any) => {
      const u = String(url);
      if (u.endsWith('/entries/index.json')) {
        return new Response(JSON.stringify(realIndex), { status: 200 });
      }
      // 404 for detail
      return new Response('Not found', { status: 404, statusText: 'Not Found' });
    };

    const provider = new R2ContentProvider({
      baseUrl: 'https://cdn.khmer-heritage.org/v1',
      fetchFn: mockFetch as any,
    });

    const entry = await provider.getEntryDetail('e-angkor-wat');
    if (!entry || entry.id !== 'e-angkor-wat') {
      throw new Error(`Expected fallback to provide angkor-wat, got ${entry?.id}`);
    }
  });

  await test('Entries', 'should reject corrupted entry detail format and fallback', async () => {
    const mockFetch = async (url: any) => {
      const u = String(url);
      if (u.endsWith('/entries/index.json')) {
        return new Response(JSON.stringify(realIndex), { status: 200 });
      }
      // Corrupt payload (missing title and content.sections)
      return new Response(JSON.stringify({ id: 'e-angkor-wat', slug: 'angkor-wat' }), { status: 200 });
    };

    const provider = new R2ContentProvider({
      baseUrl: 'https://cdn.khmer-heritage.org/v1',
      fetchFn: mockFetch as any,
    });

    const entry = await provider.getEntryDetail('e-angkor-wat');
    if (!entry || !entry.content?.sections) {
      throw new Error('Expected fallback to provide valid entry with sections');
    }
  });

  // --------------------------------------------------------------------------
  // 4. FILTERING & SERVICE INTEGRATION
  // --------------------------------------------------------------------------
  await test('Service', 'should filter entries by category using remote index', async () => {
    const mockFetch = async (url: any) => {
      const u = String(url);
      if (u.endsWith('/entries/index.json')) {
        return new Response(JSON.stringify(realIndex), { status: 200 });
      }
      return new Response('Not found', { status: 404 });
    };

    const provider = new R2ContentProvider({
      baseUrl: 'https://cdn.khmer-heritage.org/v1',
      fetchFn: mockFetch as any,
    });

    const musicEntries = await provider.getEntriesByCategory('music');
    if (musicEntries.length !== 3) {
      throw new Error(`Expected 3 music entries, got ${musicEntries.length}`);
    }

    const templeEntries = await provider.getEntriesByCategory('temples');
    if (templeEntries.length !== 3) {
      throw new Error(`Expected 3 temple entries, got ${templeEntries.length}`);
    }
  });

  await test('Service', 'FoundationContentService should seamlessly integrate with R2ContentProvider', async () => {
    const mockFetch = async (url: any) => {
      const u = String(url);
      if (u.endsWith('/manifest.json')) return new Response(JSON.stringify(realManifest), { status: 200 });
      if (u.endsWith('/categories.json')) return new Response(JSON.stringify(realCategories), { status: 200 });
      if (u.endsWith('/entries/index.json')) return new Response(JSON.stringify(realIndex), { status: 200 });
      if (u.endsWith('/entries/e-angkor-wat.json')) return new Response(JSON.stringify(realEntryWat), { status: 200 });
      return new Response('Not found', { status: 404 });
    };

    const r2Provider = new R2ContentProvider({
      baseUrl: 'https://r2.khmer-heritage.org/v1',
      fetchFn: mockFetch as any,
    });

    const service = new FoundationContentService(r2Provider);
    if (service.getProviderId() !== 'cloudflare-r2') {
      throw new Error(`Expected providerId 'cloudflare-r2', got '${service.getProviderId()}'`);
    }

    const manifest = await service.getManifest();
    const categories = await service.getCategories();
    const summaries = await service.getEntrySummaries();
    const detail = await service.getEntryDetail('angkor-wat');

    if (!manifest.contentHash || categories.length !== 12 || summaries.length !== 16 || !detail) {
      throw new Error('Service failed to retrieve complete dataset from R2 provider');
    }

    // Hot-swap back to static
    service.setProvider(new StaticContentProvider());
    if (service.getProviderId() !== 'static-bundled') {
      throw new Error(`Expected swapped providerId 'static-bundled', got '${service.getProviderId()}'`);
    }
  });

  const suiteEnd = performance.now();
  const totalDurationMs = +(suiteEnd - suiteStart).toFixed(2);
  const passed = results.filter((r) => r.passed).length;
  const failed = results.filter((r) => !r.passed).length;

  return {
    total: results.length,
    passed,
    failed,
    durationMs: totalDurationMs,
    results,
  };
}
