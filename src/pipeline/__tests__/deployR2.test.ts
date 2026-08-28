/**
 * Cloudflare R2 Deployment Engine Test Suite
 * Tests plan generation, HTTP cache header assignments, credentials guards, dry-run mode,
 * and AWS SigV4 signed PUT upload execution.
 */

import * as fs from 'node:fs';
import * as path from 'node:path';
import { buildDeployPlan, deployToR2, uploadObjectToR2 } from '../deployR2.ts';

export interface TestResult {
  name: string;
  passed: boolean;
  durationMs: number;
  error?: string;
}

export interface TestSuiteReport {
  total: number;
  passed: number;
  failed: number;
  durationMs: number;
  results: TestResult[];
}

export async function runDeployR2Tests(): Promise<TestSuiteReport> {
  const startSuite = performance.now();
  const results: TestResult[] = [];

  const runTest = async (name: string, fn: () => Promise<void> | void) => {
    const t0 = performance.now();
    try {
      await fn();
      results.push({
        name,
        passed: true,
        durationMs: +(performance.now() - t0).toFixed(2),
      });
    } catch (err: any) {
      results.push({
        name,
        passed: false,
        durationMs: +(performance.now() - t0).toFixed(2),
        error: err.message || String(err),
      });
    }
  };

  const bundleDir = path.resolve(process.cwd(), 'content/v1');

  // Test 1: Plan generation assigns accurate relative paths and R2 keys
  await runTest('buildDeployPlan generates plans for manifest, categories, index, and entries', () => {
    const plans = buildDeployPlan(bundleDir);
    if (plans.length !== 19) {
      throw new Error(`Expected 19 planned files, received ${plans.length}`);
    }

    const manifestPlan = plans.find((p) => p.relativePath === 'manifest.json');
    if (!manifestPlan || manifestPlan.r2Key !== 'v1/manifest.json') {
      throw new Error('manifest.json plan missing or has invalid r2Key');
    }

    const categoriesPlan = plans.find((p) => p.relativePath === 'categories.json');
    if (!categoriesPlan || categoriesPlan.r2Key !== 'v1/categories.json') {
      throw new Error('categories.json plan missing or has invalid r2Key');
    }

    const indexPlan = plans.find((p) => p.relativePath === 'entries/index.json');
    if (!indexPlan || indexPlan.r2Key !== 'v1/entries/index.json') {
      throw new Error('entries/index.json plan missing or has invalid r2Key');
    }
  });

  // Test 2: Cache-Control policies conform strictly to architectural specifications
  await runTest('buildDeployPlan assigns specific Cache-Control headers', () => {
    const plans = buildDeployPlan(bundleDir);

    const manifestPlan = plans.find((p) => p.relativePath === 'manifest.json');
    if (manifestPlan?.cacheControl !== 'public, max-age=300, must-revalidate') {
      throw new Error(`Invalid manifest Cache-Control: ${manifestPlan?.cacheControl}`);
    }

    const catPlan = plans.find((p) => p.relativePath === 'categories.json');
    if (catPlan?.cacheControl !== 'public, max-age=3600, stale-while-revalidate=86400') {
      throw new Error(`Invalid categories Cache-Control: ${catPlan?.cacheControl}`);
    }

    const indexPlan = plans.find((p) => p.relativePath === 'entries/index.json');
    if (indexPlan?.cacheControl !== 'public, max-age=3600, stale-while-revalidate=86400') {
      throw new Error(`Invalid index Cache-Control: ${indexPlan?.cacheControl}`);
    }

    const entryPlan = plans.find((p) => p.relativePath.startsWith('entries/e-'));
    if (entryPlan?.cacheControl !== 'public, max-age=86400, stale-while-revalidate=604800') {
      throw new Error(`Invalid entry detail Cache-Control: ${entryPlan?.cacheControl}`);
    }
  });

  // Test 3: Dry-run mode evaluates and plans without making network calls
  await runTest('deployToR2 with dryRun: true produces DRY_RUN_PASSED status', async () => {
    const report = await deployToR2({
      bundleDir,
      dryRun: true,
      bucketName: 'test-bucket',
    });

    if (report.status !== 'DRY_RUN_PASSED') {
      throw new Error(`Expected status DRY_RUN_PASSED, received ${report.status}`);
    }
    if (!report.bundleValid) {
      throw new Error('Expected bundle to be valid');
    }
    if (report.filesPlannedCount !== 19) {
      throw new Error(`Expected 19 planned files, received ${report.filesPlannedCount}`);
    }
    if (report.filesUploadedCount !== 0) {
      throw new Error('Dry run should upload 0 files');
    }
  });

  // Test 4: Missing credentials cleanly report BLOCKED_MISSING_CREDENTIALS
  await runTest('deployToR2 without credentials reports BLOCKED_MISSING_CREDENTIALS', async () => {
    const report = await deployToR2({
      bundleDir,
      dryRun: false,
      accountId: '',
      accessKeyId: '',
      secretAccessKey: '',
    });

    if (report.status !== 'BLOCKED_MISSING_CREDENTIALS') {
      throw new Error(`Expected status BLOCKED_MISSING_CREDENTIALS, received ${report.status}`);
    }
    if (!report.messages.some((m) => m.includes('Missing Cloudflare R2 credentials'))) {
      throw new Error('Expected warning message regarding missing credentials');
    }
  });

  // Test 5: uploadObjectToR2 constructs valid SigV4 headers and executes PUT request
  await runTest('uploadObjectToR2 generates AWS SigV4 authorization header and calls fetch', async () => {
    let capturedUrl = '';
    let capturedHeaders: Record<string, string> = {};
    let capturedMethod = '';

    const mockFetch = async (url: any, init: any) => {
      capturedUrl = String(url);
      capturedMethod = init.method;
      capturedHeaders = init.headers;
      return {
        ok: true,
        status: 200,
        statusText: 'OK',
        text: async () => '',
      } as any;
    };

    const dummyBody = Buffer.from(JSON.stringify({ test: 'data' }), 'utf8');

    const result = await uploadObjectToR2({
      accountId: 'mock-account-id',
      accessKeyId: 'mock-access-key',
      secretAccessKey: 'mock-secret-key-abcdef1234567890',
      bucketName: 'mock-bucket',
      r2Key: 'v1/manifest.json',
      contentType: 'application/json; charset=utf-8',
      cacheControl: 'public, max-age=300, must-revalidate',
      body: dummyBody,
      fetchFn: mockFetch as any,
    });

    if (!result.ok || result.status !== 200) {
      throw new Error(`Expected upload to succeed, got status ${result.status}: ${result.error}`);
    }

    if (capturedUrl !== 'https://mock-account-id.r2.cloudflarestorage.com/mock-bucket/v1/manifest.json') {
      throw new Error(`Unexpected upload endpoint: ${capturedUrl}`);
    }
    if (capturedMethod !== 'PUT') {
      throw new Error(`Expected PUT method, got ${capturedMethod}`);
    }
    if (!capturedHeaders['Authorization'] || !capturedHeaders['Authorization'].startsWith('AWS4-HMAC-SHA256')) {
      throw new Error(`Invalid Authorization header: ${capturedHeaders['Authorization']}`);
    }
    if (capturedHeaders['Cache-Control'] !== 'public, max-age=300, must-revalidate') {
      throw new Error(`Invalid Cache-Control header: ${capturedHeaders['Cache-Control']}`);
    }
    if (!capturedHeaders['x-amz-date'] || !capturedHeaders['x-amz-content-sha256']) {
      throw new Error('Missing AWS SigV4 date or content-sha256 headers');
    }
  });

  // Test 6: deployToR2 completes upload cycle when mock credentials and fetch are supplied
  await runTest('deployToR2 uploads all 19 files successfully when authenticated', async () => {
    let putCallsCount = 0;
    const mockFetch = async () => {
      putCallsCount++;
      return {
        ok: true,
        status: 200,
        statusText: 'OK',
        text: async () => '',
      } as any;
    };

    const report = await deployToR2({
      bundleDir,
      dryRun: false,
      accountId: 'mock-account',
      accessKeyId: 'mock-key',
      secretAccessKey: 'mock-secret',
      bucketName: 'khmer-heritage-test',
      fetchFn: mockFetch as any,
    });

    if (report.status !== 'SUCCESS') {
      throw new Error(`Expected status SUCCESS, got ${report.status}`);
    }
    if (report.filesUploadedCount !== 19) {
      throw new Error(`Expected 19 uploaded files, got ${report.filesUploadedCount}`);
    }
    if (putCallsCount !== 19) {
      throw new Error(`Expected 19 PUT calls, got ${putCallsCount}`);
    }
  });

  const endSuite = performance.now();
  const durationMs = +(endSuite - startSuite).toFixed(2);
  const passed = results.filter((r) => r.passed).length;
  const failed = results.filter((r) => !r.passed).length;

  return {
    total: results.length,
    passed,
    failed,
    durationMs,
    results,
  };
}
