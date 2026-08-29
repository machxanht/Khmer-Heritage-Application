/**
 * Khmer Heritage — Controlled Ingestion Pilot Automated Tests (KH-018)
 * Unit and integration test suite covering the 100-asset pilot dataset, magic bytes detection,
 * fail-closed license gating, responsive transformations, provenance manifests, checkpointing,
 * and storage baseline model reconciliation.
 */

import { promises as fs } from 'fs';
import path from 'path';
import sharp from 'sharp';
import {
  CANONICAL_SNAPSHOT_ID,
  CONTROLLED_PILOT_ASSETS,
  QUARANTINED_TEST_FIXTURES,
} from '../pilotDataset.ts';
import {
  detectMagicBytes,
  validateMediaBuffer,
  computeSha256,
} from '../mediaValidator.ts';
import {
  downloadMediaAsset,
  createSyntheticBufferForAsset,
} from '../mediaDownloader.ts';
import {
  transformImage,
  transformAudio,
  transformVideo,
  transformDocument,
  transformThreeD,
} from '../mediaTransformPipeline.ts';
import {
  createProvenanceManifest,
  validateProvenanceManifest,
} from '../provenanceManifest.ts';
import { runControlledPilot } from '../controlledIngestPilot.ts';

export interface ControlledPilotTestResult {
  test: string;
  passed: boolean;
  message?: string;
}

export interface ControlledPilotTestSuiteReport {
  passed: number;
  failed: number;
  total: number;
  results: ControlledPilotTestResult[];
  durationMs: number;
}

export async function runControlledPilotTestSuite(): Promise<ControlledPilotTestSuiteReport> {
  const startTime = performance.now();
  const results: ControlledPilotTestResult[] = [];

  function assert(name: string, condition: boolean, failMsg?: string) {
    results.push({
      test: name,
      passed: condition,
      message: condition ? undefined : failMsg || 'Assertion failed',
    });
  }

  const testDir = '.pilot-cache/test-pilot-suite';

  try {
    await fs.mkdir(testDir, { recursive: true });

    // 1. Dataset checks
    assert('Pilot dataset contains exactly 100 assets', CONTROLLED_PILOT_ASSETS.length === 100);
    assert('Snapshot ID is canonical KH-SNAP-20260829-017B', CANONICAL_SNAPSHOT_ID === 'KH-SNAP-20260829-017B');

    const sourceCounts: Record<string, number> = {};
    const mediaCounts: Record<string, number> = {};
    for (const a of CONTROLLED_PILOT_ASSETS) {
      sourceCounts[a.sourceId] = (sourceCounts[a.sourceId] || 0) + 1;
      mediaCounts[a.mediaType] = (mediaCounts[a.mediaType] || 0) + 1;
    }

    assert('Source distribution Met (15)', sourceCounts['met_museum_open_access'] === 15);
    assert('Source distribution Smithsonian (15)', sourceCounts['smithsonian_open_access'] === 15);
    assert('Source distribution Wikimedia (40)', sourceCounts['wikimedia_commons'] === 40);
    assert('Source distribution Internet Archive (20)', sourceCounts['internet_archive'] === 20);
    assert('Source distribution Library of Congress (10)', sourceCounts['library_of_congress'] === 10);

    assert('Media distribution Images (65)', mediaCounts['image'] === 65);
    assert('Media distribution Audio (12)', mediaCounts['audio'] === 12);
    assert('Media distribution Video (6)', mediaCounts['video'] === 6);
    assert('Media distribution Documents (15)', mediaCounts['document'] === 15);
    assert('Media distribution 3D Models (2)', mediaCounts['three_d'] === 2);

    // 2. Magic Bytes & Validator
    const jpegBuf = await sharp({
      create: { width: 10, height: 10, channels: 3, background: { r: 255, g: 0, b: 0 } },
    })
      .jpeg()
      .toBuffer();

    const jpegMagic = detectMagicBytes(jpegBuf);
    assert('JPEG magic bytes detected accurately', jpegMagic.verified && jpegMagic.format === 'jpeg');

    const pdfBuf = Buffer.from('%PDF-1.4\n1 0 obj<<>>endobj\ntrailer<<>>\n%%EOF', 'utf8');
    const pdfMagic = detectMagicBytes(pdfBuf);
    assert('PDF magic bytes detected accurately', pdfMagic.verified && pdfMagic.mime === 'application/pdf');

    const oggBuf = Buffer.from([0x4f, 0x67, 0x67, 0x53, 0x00, 0x02]);
    const oggMagic = detectMagicBytes(oggBuf);
    assert('OggS magic bytes detected accurately', oggMagic.verified && oggMagic.mime === 'audio/ogg');

    const mp4Buf = Buffer.from([0x00, 0x00, 0x00, 0x20, 0x66, 0x74, 0x79, 0x70, 0x69, 0x73, 0x6f, 0x6d]);
    const mp4Magic = detectMagicBytes(mp4Buf);
    assert('MP4 magic bytes detected accurately', mp4Magic.verified && mp4Magic.mime === 'video/mp4');

    // 3. Fail-closed license gating on quarantine fixtures
    for (const q of QUARANTINED_TEST_FIXTURES) {
      const qRes = await downloadMediaAsset(q, { offlineMode: true });
      assert(`Quarantine asset ${q.id} blocked by license gate`, qRes.result.status === 'QUARANTINED');
    }

    // 4. Media transforms
    const sampleImg = await sharp({
      create: { width: 800, height: 600, channels: 3, background: { r: 100, g: 150, b: 200 } },
    })
      .jpeg()
      .toBuffer();

    const tfRes = await transformImage(
      sampleImg,
      CONTROLLED_PILOT_ASSETS[0],
      CONTROLLED_PILOT_ASSETS[0].originalUrl,
      new Date().toISOString(),
      computeSha256(sampleImg),
      testDir
    );

    assert('Image transformation produces 3 WebP variants', tfRes.variants.length === 3);
    assert('Provenance manifest generated with valid snapshot', tfRes.manifest.snapshotId === CANONICAL_SNAPSHOT_ID);

    const docAsset = CONTROLLED_PILOT_ASSETS.find((a) => a.mediaType === 'document')!;
    const docBuf = await createSyntheticBufferForAsset(docAsset);
    const docRes = await transformDocument(
      docBuf,
      docAsset,
      docAsset.originalUrl,
      new Date().toISOString(),
      computeSha256(docBuf),
      testDir
    );
    assert('Document transformation produces web-optimized PDF', docRes.variants.length === 1);

    // 5. Pilot execution & Storage Baseline Reconciliation
    const pilotReport = await runControlledPilot({
      limit: 100,
      outDir: testDir,
      offlineMode: true,
      resume: false,
    });

    assert('Pilot completes 100/100 successful items', pilotReport.successful === 100);
    assert('Storage baseline model status is SUPPORTED', pilotReport.storageAccounting.overallModelStatus === 'SUPPORTED');
    assert('Magic bytes integrity verified for all 100 items', pilotReport.integrityStats.magicBytesVerified === 100);
    assert('License gates verified for all 100 items', pilotReport.integrityStats.licenseGateVerified === 100);
    assert('Provenance manifests verified for all 100 items', pilotReport.integrityStats.provenanceVerified === 100);

    // 6. Resumability
    const resumeReport = await runControlledPilot({
      limit: 100,
      outDir: testDir,
      checkpointPath: path.join(testDir, 'checkpoint.json'),
      offlineMode: true,
      resume: true,
    });
    assert('Resumed pilot execution succeeded', resumeReport.successful === 100);

    await fs.rm(testDir, { recursive: true, force: true }).catch(() => {});
  } catch (err: any) {
    results.push({
      test: 'Controlled Pilot Test Suite Execution',
      passed: false,
      message: err.message || String(err),
    });
  }

  const passed = results.filter((r) => r.passed).length;
  const failed = results.filter((r) => !r.passed).length;
  const durationMs = +(performance.now() - startTime).toFixed(2);

  return {
    passed,
    failed,
    total: results.length,
    results,
    durationMs,
  };
}
