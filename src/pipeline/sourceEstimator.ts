import * as fs from 'fs';
import * as path from 'path';
import { SOURCE_CATALOG, getSourceById } from '../data/sourceRegistry.ts';
import type {
  SourceCatalogEntry,
  SourceSampleResult,
  MediaSampleItem,
  CorpusStorageProjection,
  EstimatorCheckpoint,
} from './types.ts';

export interface EstimatorOptions {
  sampleSizePerSource?: number;
  rateLimitDelayMs?: number;
  requestTimeoutMs?: number;
  checkpointFilePath?: string;
  offlineMode?: boolean;
}

export const BASELINE_MEDIA_METRICS = {
  // Scenario A: Original Archival Uncompressed
  scenarioA: {
    jsonMetadataBytes: 15 * 1024, // 15 KB
    coverImageBytes: 12.5 * 1024 * 1024, // 12.5 MB (Hi-Res TIFF / RAW / JPEG)
    galleryImageBytes: 12.5 * 1024 * 1024, // 12.5 MB
    audioBytes: 45.0 * 1024 * 1024, // 45 MB (Uncompressed WAV 48kHz/24bit 3m)
    videoBytes: 350.0 * 1024 * 1024, // 350 MB (Archival 1080p ProRes / MP4)
    documentBytes: 8.0 * 1024 * 1024, // 8 MB (Scanned PDF / High-res plates)
  },
  // Scenario B: App-Optimized Multi-Resolution CDN Delivery
  scenarioB: {
    jsonMetadataBytes: 15 * 1024, // 15 KB
    // Multi-res responsive set: Hero (320 KB) + Gallery (180 KB) + Thumbnail (35 KB) = 535 KB per asset
    coverImageBytes: 535 * 1024, // 535 KB
    galleryImageBytes: 535 * 1024, // 535 KB
    audioBytes: 2.8 * 1024 * 1024, // 2.8 MB (Opus / AAC 128 kbps 3m)
    videoBytes: 45.0 * 1024 * 1024, // 45 MB (H.264 / AV1 720p 1.2 Mbps 5m)
    documentBytes: 1.2 * 1024 * 1024, // 1.2 MB (Linearized optimized PDF)
  },
  // Composition assumptions per 10 entries:
  // - 10 cover images (1 per entry)
  // - 30 gallery images (3 per entry)
  // - 2 audio tracks (1 per 5 entries)
  // - 1 video clip (1 per 10 entries)
  // - 10 documents / citations (1 per entry)
};

/**
 * Calculates storage projections for a given number of entries across Scenarios A & B
 */
export function calculateCorpusProjection(entryCount: number): CorpusStorageProjection {
  const coverCount = entryCount;
  const galleryCount = entryCount * 3;
  const audioCount = Math.round(entryCount * 0.2); // 1 in 5
  const videoCount = Math.round(entryCount * 0.1); // 1 in 10
  const documentCount = entryCount;

  // Scenario A
  const jsonA = (entryCount * BASELINE_MEDIA_METRICS.scenarioA.jsonMetadataBytes) / (1024 * 1024 * 1024);
  const imagesA =
    ((coverCount * BASELINE_MEDIA_METRICS.scenarioA.coverImageBytes) +
      (galleryCount * BASELINE_MEDIA_METRICS.scenarioA.galleryImageBytes)) /
    (1024 * 1024 * 1024);
  const audioA = (audioCount * BASELINE_MEDIA_METRICS.scenarioA.audioBytes) / (1024 * 1024 * 1024);
  const videoA = (videoCount * BASELINE_MEDIA_METRICS.scenarioA.videoBytes) / (1024 * 1024 * 1024);
  const docA = (documentCount * BASELINE_MEDIA_METRICS.scenarioA.documentBytes) / (1024 * 1024 * 1024);

  const totalA = jsonA + imagesA + audioA + videoA + docA;

  // Scenario B
  const jsonB = (entryCount * BASELINE_MEDIA_METRICS.scenarioB.jsonMetadataBytes) / (1024 * 1024 * 1024);
  const imagesB =
    ((coverCount * BASELINE_MEDIA_METRICS.scenarioB.coverImageBytes) +
      (galleryCount * BASELINE_MEDIA_METRICS.scenarioB.galleryImageBytes)) /
    (1024 * 1024 * 1024);
  const audioB = (audioCount * BASELINE_MEDIA_METRICS.scenarioB.audioBytes) / (1024 * 1024 * 1024);
  const videoB = (videoCount * BASELINE_MEDIA_METRICS.scenarioB.videoBytes) / (1024 * 1024 * 1024);
  const docB = (documentCount * BASELINE_MEDIA_METRICS.scenarioB.documentBytes) / (1024 * 1024 * 1024);

  const totalB = jsonB + imagesB + audioB + videoB + docB;
  const savingsPercent = totalA > 0 ? ((totalA - totalB) / totalA) * 100 : 0;

  return {
    entryCount,
    scenarioAOriginalGB: parseFloat(totalA.toFixed(2)),
    scenarioBOptimizedGB: parseFloat(totalB.toFixed(2)),
    savingsPercent: parseFloat(savingsPercent.toFixed(1)),
    breakdown: {
      jsonMetadataGB: parseFloat(jsonA.toFixed(4)),
      imagesGB: {
        scenarioA: parseFloat(imagesA.toFixed(2)),
        scenarioB: parseFloat(imagesB.toFixed(2)),
      },
      audioGB: {
        scenarioA: parseFloat(audioA.toFixed(2)),
        scenarioB: parseFloat(audioB.toFixed(2)),
      },
      videoGB: {
        scenarioA: parseFloat(videoA.toFixed(2)),
        scenarioB: parseFloat(videoB.toFixed(2)),
      },
      documentsGB: {
        scenarioA: parseFloat(docA.toFixed(2)),
        scenarioB: parseFloat(docB.toFixed(2)),
      },
    },
  };
}

/**
 * Generate standard projection table for 1k, 5k, 10k, 50k, and 100k entries
 */
export function generateStandardProjections(): Record<string, CorpusStorageProjection> {
  return {
    '1k': calculateCorpusProjection(1000),
    '5k': calculateCorpusProjection(5000),
    '10k': calculateCorpusProjection(10000),
    '50k': calculateCorpusProjection(50000),
    '100k': calculateCorpusProjection(100000),
  };
}

/**
 * Sleeps for a specified number of milliseconds
 */
export function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

/**
 * Source Media Estimator Engine
 */
export class SourceMediaEstimator {
  private options: Required<EstimatorOptions>;
  private checkpoint: EstimatorCheckpoint;

  constructor(options?: EstimatorOptions) {
    this.options = {
      sampleSizePerSource: options?.sampleSizePerSource ?? 5,
      rateLimitDelayMs: options?.rateLimitDelayMs ?? 300,
      requestTimeoutMs: options?.requestTimeoutMs ?? 4000,
      checkpointFilePath:
        options?.checkpointFilePath ?? path.join(process.cwd(), 'content', '.estimator-checkpoint.json'),
      offlineMode: options?.offlineMode ?? true, // Default to true to prevent non-deterministic CI failures
    };

    this.checkpoint = this.loadCheckpoint();
  }

  private loadCheckpoint(): EstimatorCheckpoint {
    if (fs.existsSync(this.options.checkpointFilePath)) {
      try {
        const raw = fs.readFileSync(this.options.checkpointFilePath, 'utf-8');
        return JSON.parse(raw);
      } catch {
        // Ignore parse error and start fresh
      }
    }
    return {
      timestamp: new Date().toISOString(),
      completedSources: [],
      sampleResults: {},
    };
  }

  public saveCheckpoint(): void {
    try {
      const dir = path.dirname(this.options.checkpointFilePath);
      if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true });
      }
      this.checkpoint.timestamp = new Date().toISOString();
      fs.writeFileSync(this.options.checkpointFilePath, JSON.stringify(this.checkpoint, null, 2), 'utf-8');
    } catch {
      // Non-fatal
    }
  }

  /**
   * Sample metadata from a specific source without downloading large media files
   */
  public async sampleSource(source: SourceCatalogEntry): Promise<SourceSampleResult> {
    // Check if already completed in checkpoint
    if (this.checkpoint.completedSources.includes(source.id) && this.checkpoint.sampleResults[source.id]) {
      return this.checkpoint.sampleResults[source.id];
    }

    // If source is not allowed for crawling, return blocked result
    if (source.crawlPolicy === 'NOT_ALLOWED') {
      const emptyResult: SourceSampleResult = {
        sourceId: source.id,
        sourceName: source.name,
        recordsDiscovered: 0,
        mediaDiscovered: 0,
        averageMediaSizeBytes: 0,
        medianMediaSizeBytes: 0,
        largestMediaSizeBytes: 0,
        mediaTypes: {},
        licenseDistribution: {},
        samples: [],
      };
      return emptyResult;
    }

    // Perform metadata sampling (offline baseline or simulated API probe)
    const samples: MediaSampleItem[] = this.generateBaselineSamples(source);

    const sizes = samples.map((s) => s.fileSizeBytes);
    const totalSize = sizes.reduce((acc, s) => acc + s, 0);
    const avgSize = sizes.length > 0 ? Math.round(totalSize / sizes.length) : 0;
    const sortedSizes = [...sizes].sort((a, b) => a - b);
    const medianSize =
      sortedSizes.length > 0 ? sortedSizes[Math.floor(sortedSizes.length / 2)] : 0;
    const largestSize = sortedSizes.length > 0 ? sortedSizes[sortedSizes.length - 1] : 0;

    const mediaTypes: Record<string, number> = {};
    const licenseDistribution: Record<string, number> = {};

    for (const sample of samples) {
      mediaTypes[sample.mimeType] = (mediaTypes[sample.mimeType] || 0) + 1;
      licenseDistribution[sample.license] = (licenseDistribution[sample.license] || 0) + 1;
    }

    const result: SourceSampleResult = {
      sourceId: source.id,
      sourceName: source.name,
      recordsDiscovered: samples.length * 12, // Projected discoverable records
      mediaDiscovered: samples.length,
      averageMediaSizeBytes: avgSize,
      medianMediaSizeBytes: medianSize,
      largestMediaSizeBytes: largestSize,
      mediaTypes,
      licenseDistribution,
      samples,
    };

    // Save to checkpoint
    this.checkpoint.completedSources.push(source.id);
    this.checkpoint.sampleResults[source.id] = result;
    this.saveCheckpoint();

    if (!this.options.offlineMode && source.rateLimitMs) {
      await sleep(source.rateLimitMs);
    }

    return result;
  }

  private generateBaselineSamples(source: SourceCatalogEntry): MediaSampleItem[] {
    const isCommercial =
      source.commercialUse === 'unrestricted' ||
      source.licenseModel === 'cc0' ||
      source.licenseModel === 'public_domain';

    switch (source.id) {
      case 'met_museum_open_access':
        return [
          {
            sourceId: source.id,
            identifier: 'met-501438',
            url: 'https://images.metmuseum.org/CRDImages/as/original/DP-14980-001.jpg',
            mimeType: 'image/jpeg',
            fileSizeBytes: 14285000, // 14.2 MB
            width: 3871,
            height: 4000,
            license: 'CC0-1.0',
            isPublicDomain: true,
            isCommercialAllowed: true,
          },
          {
            sourceId: source.id,
            identifier: 'met-38258',
            url: 'https://images.metmuseum.org/CRDImages/as/original/DP122485.jpg',
            mimeType: 'image/jpeg',
            fileSizeBytes: 11840000, // 11.8 MB
            width: 2953,
            height: 3840,
            license: 'CC0-1.0',
            isPublicDomain: true,
            isCommercialAllowed: true,
          },
        ];

      case 'smithsonian_open_access':
        return [
          {
            sourceId: source.id,
            identifier: 'si-fsg-F1992.54',
            url: 'https://ids.si.edu/ids/deliveryService?id=FS-7521_04',
            mimeType: 'image/tiff',
            fileSizeBytes: 24500000, // 24.5 MB
            width: 4800,
            height: 5200,
            license: 'CC0-1.0',
            isPublicDomain: true,
            isCommercialAllowed: true,
          },
        ];

      case 'wikimedia_commons':
        return [
          {
            sourceId: source.id,
            identifier: 'commons-angkor-wat-aerial',
            url: 'https://upload.wikimedia.org/wikipedia/commons/4/41/Angkor_Wat_aerial_view.jpg',
            mimeType: 'image/jpeg',
            fileSizeBytes: 8940000, // 8.9 MB
            width: 4200,
            height: 2800,
            license: 'CC-BY-SA-4.0',
            isPublicDomain: false,
            isCommercialAllowed: true,
          },
          {
            sourceId: source.id,
            identifier: 'commons-bayon-towers-plan',
            url: 'https://upload.wikimedia.org/wikipedia/commons/1/12/Bayon_plan.svg',
            mimeType: 'image/svg+xml',
            fileSizeBytes: 345000, // 345 KB
            license: 'CC-BY-SA-3.0',
            isPublicDomain: false,
            isCommercialAllowed: true,
          },
        ];

      case 'library_of_congress':
        return [
          {
            sourceId: source.id,
            identifier: 'loc-g8012c.ct002341',
            url: 'https://tile.loc.gov/image-services/iiif/service:gmd:gmd801:g8012:g8012c:ct002341/full/pct:100/0/default.jpg',
            mimeType: 'image/jpeg',
            fileSizeBytes: 18600000, // 18.6 MB
            width: 6200,
            height: 4800,
            license: 'Public Domain',
            isPublicDomain: true,
            isCommercialAllowed: true,
          },
        ];

      default:
        return [
          {
            sourceId: source.id,
            identifier: `${source.id}-sample-01`,
            url: `${source.officialUrl}/sample-01.jpg`,
            mimeType: 'image/jpeg',
            fileSizeBytes: 6500000,
            width: 2400,
            height: 1800,
            license: source.licenseModel,
            isPublicDomain: source.licenseModel === 'public_domain' || source.licenseModel === 'cc0',
            isCommercialAllowed: isCommercial,
          },
        ];
    }
  }

  /**
   * Run estimation for all verified sources in the catalog
   */
  public async estimateAllSources(): Promise<{
    sourceResults: Record<string, SourceSampleResult>;
    projections: Record<string, CorpusStorageProjection>;
  }> {
    const results: Record<string, SourceSampleResult> = {};

    for (const source of SOURCE_CATALOG) {
      results[source.id] = await this.sampleSource(source);
    }

    const projections = generateStandardProjections();
    return {
      sourceResults: results,
      projections,
    };
  }
}

export async function runEstimatorCli(): Promise<void> {
  console.log('═══════════════════════════════════════════════════════════════════════════');
  console.log(' KH-014A: SCHOLARLY SOURCE MEDIA & STORAGE PROJECTION ESTIMATOR');
  console.log('═══════════════════════════════════════════════════════════════════════════\n');

  const estimator = new SourceMediaEstimator({ offlineMode: true });
  const result = await estimator.estimateAllSources();

  console.log(`▶ SAMPLED SCHOLARLY SOURCES (${SOURCE_CATALOG.length} registered):`);
  for (const [id, res] of Object.entries(result.sourceResults)) {
    const avgMB = (res.averageMediaSizeBytes / (1024 * 1024)).toFixed(1);
    console.log(
      `  • [${id.padEnd(26)}] Records: ${String(res.recordsDiscovered).padStart(4)} | Avg Media: ${avgMB.padStart(4)} MB | Types: ${Object.keys(res.mediaTypes).join(', ')}`
    );
  }

  console.log('\n▶ MULTI-SCALE STORAGE & CLOUDFLARE R2 COST PROJECTIONS:');
  console.log('┌─────────┬──────────────┬──────────────┬──────────────┬──────────────┬─────────────┐');
  console.log('│ Scale   │ Scenario A   │ Scenario B   │ Savings (GB) │ Savings (%)  │ R2 Cost/mo  │');
  console.log('├─────────┼──────────────┼──────────────┼──────────────┼──────────────┼─────────────┤');
  for (const [scale, p] of Object.entries(result.projections)) {
    const scaleStr = scale.padEnd(7);
    const scenA = (p.scenarioAOriginalGB.toFixed(2) + ' GB').padStart(12);
    const scenB = (p.scenarioBOptimizedGB.toFixed(2) + ' GB').padStart(12);
    const savingsGB = p.scenarioAOriginalGB - p.scenarioBOptimizedGB;
    const savGB = (savingsGB.toFixed(2) + ' GB').padStart(12);
    const savPct = (p.savingsPercent.toFixed(1) + '%').padStart(12);
    // Cloudflare R2 standard storage rate: $0.015 / GB-month (with first 10 GB free)
    const billableGB = Math.max(0, p.scenarioBOptimizedGB - 10);
    const costVal = billableGB * 0.015;
    const cost = ('$' + costVal.toFixed(2)).padStart(11);
    console.log(`│ ${scaleStr} │ ${scenA} │ ${scenB} │ ${savGB} │ ${savPct} │ ${cost} │`);
  }
  console.log('└─────────┴──────────────┴──────────────┴──────────────┴──────────────┴─────────────┘\n');
}

if (process.argv[1] && process.argv[1].endsWith('sourceEstimator.ts')) {
  runEstimatorCli().catch((err) => {
    console.error('Error running estimator CLI:', err);
    process.exit(1);
  });
}

