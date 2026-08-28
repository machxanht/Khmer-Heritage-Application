/**
 * Deterministic JSON Content Exporter
 * Converts canonical TypeScript heritage corpus into versioned production JSON bundle.
 * Architecture: TS Data (src/data/entries/*.ts) -> Canonical Exporter -> JSON Bundle (content/v1/)
 */

import * as fs from 'node:fs';
import * as path from 'node:path';
import * as crypto from 'node:crypto';
import { curatedCorpus } from '../data/entries/index.ts';
import { categories as canonicalCategories } from '../data/heritage.ts';
import {
  Category,
  DataManifest,
  EntryDetail,
  EntrySummary,
  HeritageEntry,
} from '../types/schema.ts';
import { BundleExportResult } from './types.ts';

/**
 * Computes a deterministic SHA-256 hash of the canonical corpus data.
 */
export function computeCorpusHash(
  categories: Category[],
  entries: HeritageEntry[]
): string {
  const hash = crypto.createHash('sha256');

  // Deterministically sort categories by id
  const sortedCategories = [...categories].sort((a, b) => a.id.localeCompare(b.id));
  hash.update(JSON.stringify(sortedCategories));

  // Deterministically sort entries by id
  const sortedEntries = [...entries].sort((a, b) => a.id.localeCompare(b.id));
  hash.update(JSON.stringify(sortedEntries));

  return hash.digest('hex');
}

/**
 * Transforms full EntryDetail into a lightweight EntrySummary for discovery/index.
 */
export function createEntrySummary(entry: EntryDetail): EntrySummary {
  return {
    id: entry.id,
    slug: entry.slug,
    categoryId: entry.categoryId,
    category: entry.category,
    title: entry.title,
    summary: entry.summary,
    era: entry.era,
    coverMedia: entry.coverMedia,
    updatedAt: entry.updatedAt,
    reviewStatus: entry.reviewStatus,
    coordinates: entry.coordinates || entry.location?.coordinates,
  };
}

export interface ExportOptions {
  outputDir?: string;
  cdnBaseUrl?: string;
  contentVersion?: string;
  schemaVersion?: number;
  fixedTimestamp?: string;
}

/**
 * Exports the canonical TypeScript heritage corpus to a deterministic JSON bundle.
 */
export function exportContentBundle(options: ExportOptions = {}): BundleExportResult {
  const targetDir = options.outputDir || path.resolve(process.cwd(), 'content/v1');
  const entriesDir = path.join(targetDir, 'entries');
  const cdnBaseUrl = options.cdnBaseUrl || 'https://r2.khmer-heritage.internal/v1';
  const contentVersion = options.contentVersion || '1.0.0';
  const schemaVersion = options.schemaVersion || 1;
  const timestamp = options.fixedTimestamp || '2026-08-28T00:00:00.000Z';

  // Ensure target directories exist
  fs.mkdirSync(entriesDir, { recursive: true });

  const exportedFiles: string[] = [];

  // 1. Prepare Categories
  const categories: Category[] = canonicalCategories;
  const categoriesPath = path.join(targetDir, 'categories.json');
  fs.writeFileSync(categoriesPath, JSON.stringify(categories, null, 2) + '\n', 'utf-8');
  exportedFiles.push(categoriesPath);

  // 2. Prepare Entries & Index
  const entries: HeritageEntry[] = curatedCorpus;
  const indexSummaries: EntrySummary[] = entries.map(createEntrySummary);
  
  // Write entries/index.json
  const indexPath = path.join(entriesDir, 'index.json');
  fs.writeFileSync(indexPath, JSON.stringify(indexSummaries, null, 2) + '\n', 'utf-8');
  exportedFiles.push(indexPath);

  // Write each individual entry JSON
  for (const entry of entries) {
    const entryFilePath = path.join(entriesDir, `${entry.id}.json`);
    fs.writeFileSync(entryFilePath, JSON.stringify(entry, null, 2) + '\n', 'utf-8');
    exportedFiles.push(entryFilePath);
  }

  // 3. Compute Deterministic Hash & Generate Manifest
  const rawHash = computeCorpusHash(categories, entries);
  const contentHash = `sha256-${rawHash}`;

  const manifest: DataManifest = {
    schemaVersion,
    contentVersion,
    version: contentVersion,
    generatedAt: timestamp,
    lastUpdated: timestamp,
    contentHash,
    entriesCount: entries.length,
    categoriesCount: categories.length,
    cdnBaseUrl,
    entryIndexUrl: '/content/v1/entries/index.json',
    categoriesUrl: '/content/v1/categories.json',
    entryIds: entries.map((e) => e.id),
  };

  const manifestPath = path.join(targetDir, 'manifest.json');
  fs.writeFileSync(manifestPath, JSON.stringify(manifest, null, 2) + '\n', 'utf-8');
  exportedFiles.push(manifestPath);

  return {
    outputDir: targetDir,
    manifest,
    exportedEntriesCount: entries.length,
    exportedCategoriesCount: categories.length,
    exportedFiles,
    contentHash,
  };
}
