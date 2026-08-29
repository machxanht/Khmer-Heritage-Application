/**
 * Khmer Heritage — Provenance Manifest Generator & Validator (KH-018)
 * Canonical Snapshot: KH-SNAP-20260829-017B
 */

import { promises as fs } from 'fs';
import path from 'path';
import type {
  ControlledPilotAsset,
  ControlledPilotMediaType,
  ProvenanceManifest,
} from './types.ts';
import { CANONICAL_SNAPSHOT_ID } from './pilotDataset.ts';

export const PREDICTED_COMPRESSION_RATIOS: Record<ControlledPilotMediaType, number> = {
  image: 0.165, // ~16.5% of original (6.06:1 compression)
  audio: 0.22, // ~22.0% of original (Opus 48kbps target, 4.55:1 compression)
  video: 0.35, // ~35.0% of original (AV1/H.265 modern encoding, 2.86:1 compression)
  document: 0.40, // ~40.0% of original (JBIG2 / stream compression, 2.50:1 compression)
  three_d: 0.18, // ~18.0% of original (Draco mesh compression, 5.56:1 compression)
};

export interface CreateManifestParams {
  asset: ControlledPilotAsset;
  finalUrl: string;
  retrievedAt: string;
  originalMime: string;
  originalBytes: number;
  originalSha256: string;
  metadata?: {
    width?: number;
    height?: number;
    duration?: number;
    pageCount?: number;
  };
  variants: Array<{
    variant: string;
    format: string;
    width?: number;
    height?: number;
    quality?: number;
    sizeBytes: number;
    bitrate?: number;
  }>;
}

export function createProvenanceManifest(params: CreateManifestParams): ProvenanceManifest {
  const { asset, finalUrl, retrievedAt, originalMime, originalBytes, originalSha256, metadata, variants } = params;

  const optimizedBytes = variants.reduce((sum, v) => sum + v.sizeBytes, 0);
  const compressionRatio = originalBytes > 0 ? Number((optimizedBytes / originalBytes).toFixed(4)) : 1.0;

  const predictedRatio = PREDICTED_COMPRESSION_RATIOS[asset.mediaType] || 0.3;
  const predictedOptimizedBytes = Math.round(originalBytes * predictedRatio);
  const variancePercentage =
    predictedOptimizedBytes > 0
      ? Number((((optimizedBytes - predictedOptimizedBytes) / predictedOptimizedBytes) * 100).toFixed(2))
      : 0;

  return {
    snapshotId: CANONICAL_SNAPSHOT_ID,
    sourceId: asset.sourceId,
    sourceItemId: asset.sourceItemId,
    canonicalEntityId: asset.canonicalEntityId,
    title: asset.title,
    license: asset.license,
    licenseUrl: asset.licenseUrl,
    attribution: asset.attribution,
    originalUrl: asset.originalUrl,
    finalUrl,
    retrievedAt,
    mediaType: asset.mediaType,
    original: {
      mime: originalMime,
      bytes: originalBytes,
      sha256: originalSha256,
      ...(metadata?.width ? { width: metadata.width } : {}),
      ...(metadata?.height ? { height: metadata.height } : {}),
      ...(metadata?.duration ? { duration: metadata.duration } : {}),
      ...(metadata?.pageCount ? { pageCount: metadata.pageCount } : {}),
    },
    variants,
    optimizedBytes,
    compressionRatio,
    predictedOptimizedBytes,
    variancePercentage,
  };
}

export function validateProvenanceManifest(manifest: ProvenanceManifest): {
  isValid: boolean;
  errors: string[];
} {
  const errors: string[] = [];

  if (manifest.snapshotId !== CANONICAL_SNAPSHOT_ID) {
    errors.push(`Snapshot ID mismatch: expected ${CANONICAL_SNAPSHOT_ID}, got ${manifest.snapshotId}`);
  }
  if (!manifest.sourceId) errors.push('Missing sourceId');
  if (!manifest.sourceItemId) errors.push('Missing sourceItemId');
  if (!manifest.canonicalEntityId) errors.push('Missing canonicalEntityId');
  if (!manifest.title) errors.push('Missing title');
  if (!manifest.license) errors.push('Missing license');
  if (!manifest.attribution) errors.push('Missing attribution');
  if (!manifest.originalUrl) errors.push('Missing originalUrl');
  if (!manifest.finalUrl) errors.push('Missing finalUrl');
  if (!manifest.retrievedAt) errors.push('Missing retrievedAt');
  if (!manifest.mediaType) errors.push('Missing mediaType');

  if (!manifest.original) {
    errors.push('Missing original media descriptor');
  } else {
    if (!manifest.original.mime) errors.push('Missing original.mime');
    if (!manifest.original.bytes || manifest.original.bytes <= 0) errors.push('Invalid original.bytes');
    if (!manifest.original.sha256 || manifest.original.sha256.length !== 64) errors.push('Invalid original.sha256');
  }

  if (!Array.isArray(manifest.variants) || manifest.variants.length === 0) {
    errors.push('Manifest must contain at least one optimized variant');
  }

  return {
    isValid: errors.length === 0,
    errors,
  };
}

export async function writeProvenanceManifest(
  manifest: ProvenanceManifest,
  baseDir: string = 'content/pilot-ingest'
): Promise<string> {
  const manifestsDir = path.join(baseDir, 'manifests');
  await fs.mkdir(manifestsDir, { recursive: true });
  const filename = `${manifest.sourceId}_${manifest.sourceItemId.replace(/[^a-zA-Z0-9_-]/g, '_')}.manifest.json`;
  const filePath = path.join(manifestsDir, filename);
  await fs.writeFile(filePath, JSON.stringify(manifest, null, 2), 'utf8');
  return filePath;
}
