/**
 * Khmer Heritage - Discovery Common Utilities (KH-015)
 * Classifies discovered licenses, categorizes media types, handles unknown-size estimations,
 * aggregates storage statistics, and computes multi-scale projections.
 */

import type {
  DiscoveredMediaType,
  LicenseClassification,
  ScaleProjectionTier,
  StorageTierComparison,
  LicenseTier,
} from './types.ts';
import { evaluateKhmerRelevance, KHMER_RELEVANCE_KEYWORDS } from './pilotCommon.ts';

export { evaluateKhmerRelevance, KHMER_RELEVANCE_KEYWORDS };

export interface LicenseClassificationResult {
  classification: LicenseClassification;
  license: string;
  licenseTier: LicenseTier | 'unsupported_quarantine' | 'unknown';
  isCommercialAllowed: boolean;
  isPublicDomain: boolean;
  quarantineOrRejectionReason?: string;
}

/**
 * Classifies an item license into ACCEPTABLE, QUARANTINE, REJECTED, or UNKNOWN
 * adhering strictly to the fail-closed policy.
 */
export function classifyDiscoveryLicense(
  rawLicense: string = '',
  isPublicDomainFlag: boolean = false,
  rightsStatement: string = ''
): LicenseClassificationResult {
  const normLicense = (rawLicense || '').trim().toLowerCase();
  const normRights = (rightsStatement || '').trim().toLowerCase();

  // Missing or completely empty license declaration -> UNKNOWN (fail-closed)
  if (!normLicense && !isPublicDomainFlag && !normRights) {
    return {
      classification: 'UNKNOWN',
      license: 'Unknown / Unspecified',
      licenseTier: 'unknown',
      isCommercialAllowed: false,
      isPublicDomain: false,
      quarantineOrRejectionReason: 'Missing licensing and copyright declaration in source metadata',
    };
  }

  // 1. Explicit CC0 or Public Domain -> ACCEPTABLE
  if (
    isPublicDomainFlag ||
    normLicense.includes('cc0') ||
    normLicense.includes('public domain') ||
    normLicense.includes('cc-zero') ||
    normLicense.includes('pd') ||
    normRights.includes('noc_us') ||
    normRights.includes('publicdomain')
  ) {
    return {
      classification: 'ACCEPTABLE',
      license: 'CC0-1.0 (Public Domain)',
      licenseTier: 'cc0',
      isCommercialAllowed: true,
      isPublicDomain: true,
    };
  }

  // 2. Non-Commercial / No-Derivatives restrictions -> QUARANTINE
  if (
    normLicense.includes('nc') ||
    normLicense.includes('non-commercial') ||
    normLicense.includes('noncommercial') ||
    normRights.includes('non-commercial')
  ) {
    return {
      classification: 'QUARANTINE',
      license: rawLicense || 'CC BY-NC',
      licenseTier: 'unsupported_quarantine',
      isCommercialAllowed: false,
      isPublicDomain: false,
      quarantineOrRejectionReason: 'Non-Commercial (NC) restriction is incompatible with open redistribution',
    };
  }

  if (
    normLicense.includes('nd') ||
    normLicense.includes('no-derivatives') ||
    normLicense.includes('noderivatives')
  ) {
    return {
      classification: 'QUARANTINE',
      license: rawLicense || 'CC BY-ND',
      licenseTier: 'unsupported_quarantine',
      isCommercialAllowed: false,
      isPublicDomain: false,
      quarantineOrRejectionReason: 'No-Derivatives (ND) restriction prevents responsive CDN variant generation',
    };
  }

  if (
    normLicense.includes('all rights reserved') ||
    normLicense.includes('copyright') ||
    normRights.includes('inc_uri') ||
    normRights.includes('in copyright')
  ) {
    return {
      classification: 'QUARANTINE',
      license: 'All Rights Reserved',
      licenseTier: 'unsupported_quarantine',
      isCommercialAllowed: false,
      isPublicDomain: false,
      quarantineOrRejectionReason: 'All Rights Reserved / In Copyright requires specific institutional review',
    };
  }

  // 3. Open Commercial CC-BY / CC-BY-SA -> ACCEPTABLE
  if (normLicense.includes('cc by-sa') || normLicense.includes('cc-by-sa')) {
    return {
      classification: 'ACCEPTABLE',
      license: 'CC-BY-SA',
      licenseTier: 'cc_by_sa',
      isCommercialAllowed: true,
      isPublicDomain: false,
    };
  }

  if (normLicense.includes('cc by') || normLicense.includes('cc-by')) {
    return {
      classification: 'ACCEPTABLE',
      license: 'CC-BY',
      licenseTier: 'cc_by',
      isCommercialAllowed: true,
      isPublicDomain: false,
    };
  }

  // 4. Default unrecognized declaration -> UNKNOWN
  return {
    classification: 'UNKNOWN',
    license: rawLicense || 'Unrecognized License',
    licenseTier: 'unknown',
    isCommercialAllowed: false,
    isPublicDomain: false,
    quarantineOrRejectionReason: `Unverified licensing text: "${rawLicense || rightsStatement}"`,
  };
}

/**
 * Categorizes MIME types into standard media taxonomy.
 */
export function detectMediaType(mimeType: string = '', urlOrFilename: string = ''): DiscoveredMediaType {
  const mime = mimeType.toLowerCase();
  const target = (mime + ' ' + urlOrFilename).toLowerCase();

  if (mime.startsWith('image/') || target.match(/\.(jpg|jpeg|png|webp|avif|tiff|tif|svg|gif)$/i)) {
    return 'images';
  }
  if (mime.startsWith('audio/') || target.match(/\.(mp3|ogg|flac|wav|m4a|aac|opus)$/i)) {
    return 'audio';
  }
  if (mime.startsWith('video/') || target.match(/\.(mp4|webm|ogv|mov|mkv)$/i)) {
    return 'video';
  }
  if (mime.includes('pdf') || mime.includes('epub') || target.match(/\.(pdf|djvu|txt|epub|doc|docx)$/i)) {
    return 'documents';
  }
  return 'other';
}

/**
 * Estimates original and optimized byte sizes for a discovered media asset.
 * Distinguishes KNOWN measurements from empirical estimation models.
 */
export function estimateDiscoveredMediaBytes(
  mediaType: DiscoveredMediaType,
  knownBytes?: number,
  width?: number,
  height?: number,
  durationSeconds?: number
): {
  isSizeKnown: boolean;
  sizeEstimationMethod: string;
  estimatedOriginalBytes: number;
  estimatedOptimizedBytes: number;
} {
  if (knownBytes && knownBytes > 0) {
    let estimatedOptimizedBytes = knownBytes;
    if (mediaType === 'images') {
      // In KH-014B: 11.85 MB raw original compressed to ~680 KB across 3 WebP variants (Hero, Gallery, Thumb)
      const ratio = 17.49;
      estimatedOptimizedBytes = Math.max(80_000, Math.round(knownBytes / ratio));
    } else if (mediaType === 'audio') {
      // High-res WAV/FLAC to 128kbps Opus/WebM audio ~6.5x reduction
      estimatedOptimizedBytes = Math.round(knownBytes / 6.5);
    } else if (mediaType === 'video') {
      // Archival master to 720p/1080p AV1/H.264 ~4x reduction
      estimatedOptimizedBytes = Math.round(knownBytes / 4.0);
    } else if (mediaType === 'documents') {
      // PDF/DJVU compression & fast-web-view linearize ~1.8x reduction
      estimatedOptimizedBytes = Math.round(knownBytes / 1.8);
    }

    return {
      isSizeKnown: true,
      sizeEstimationMethod: 'EXPLICIT_SOURCE_METADATA',
      estimatedOriginalBytes: knownBytes,
      estimatedOptimizedBytes,
    };
  }

  // Empirical estimation fallback models based on media type & dimensions
  let originalBytes = 12_500_000;
  let optimizedBytes = 680_000;
  let method = 'EMPIRICAL_AVERAGE_IMAGE';

  switch (mediaType) {
    case 'images':
      if (width && height && width * height > 16_000_000) {
        // Ultra-high resolution archival scan (>16MP, e.g. 5400x3600)
        originalBytes = 22_000_000;
        optimizedBytes = 950_000;
        method = 'EMPIRICAL_ULTRA_HI_RES_IMAGE_MODEL';
      } else {
        originalBytes = 12_500_000;
        optimizedBytes = 680_000;
        method = 'EMPIRICAL_MUSEUM_ARCHIVAL_IMAGE_MODEL';
      }
      break;

    case 'audio':
      if (durationSeconds && durationSeconds > 0) {
        // Assume CD-quality WAV (10 MB / minute) -> Opus (1 MB / minute)
        originalBytes = Math.round((durationSeconds / 60) * 10_000_000);
        optimizedBytes = Math.round((durationSeconds / 60) * 1_000_000);
        method = 'EMPIRICAL_AUDIO_DURATION_MODEL';
      } else {
        originalBytes = 35_000_000; // ~3.5 min track
        optimizedBytes = 3_500_000;
        method = 'EMPIRICAL_AUDIO_TRACK_AVERAGE';
      }
      break;

    case 'video':
      if (durationSeconds && durationSeconds > 0) {
        originalBytes = Math.round((durationSeconds / 60) * 150_000_000);
        optimizedBytes = Math.round((durationSeconds / 60) * 20_000_000);
        method = 'EMPIRICAL_VIDEO_DURATION_MODEL';
      } else {
        originalBytes = 250_000_000;
        optimizedBytes = 35_000_000;
        method = 'EMPIRICAL_VIDEO_CLIP_AVERAGE';
      }
      break;

    case 'documents':
      originalBytes = 18_000_000; // Multi-page palm leaf manuscript / archival booklet
      optimizedBytes = 8_500_000;
      method = 'EMPIRICAL_MANUSCRIPT_PDF_AVERAGE';
      break;

    default:
      originalBytes = 5_000_000;
      optimizedBytes = 1_000_000;
      method = 'EMPIRICAL_GENERIC_MEDIA_FALLBACK';
  }

  return {
    isSizeKnown: false,
    sizeEstimationMethod: method,
    estimatedOriginalBytes: originalBytes,
    estimatedOptimizedBytes: optimizedBytes,
  };
}

/**
 * Calculates Multi-Scale Storage Projections (1K to 100K entries).
 */
export function calculateMultiScaleProjections(
  avgOriginalBytesPerItem: number,
  avgOptimizedBytesPerItem: number
): Record<string, ScaleProjectionTier> {
  const scales = [
    { count: 1_000, label: '1K' },
    { count: 5_000, label: '5K' },
    { count: 10_000, label: '10K' },
    { count: 25_000, label: '25K' },
    { count: 50_000, label: '50K' },
    { count: 100_000, label: '100K' },
  ];

  const result: Record<string, ScaleProjectionTier> = {};

  for (const s of scales) {
    const origGB = +((s.count * avgOriginalBytesPerItem) / (1024 * 1024 * 1024)).toFixed(2);
    const optGB = +((s.count * avgOptimizedBytesPerItem) / (1024 * 1024 * 1024)).toFixed(2);
    const savingsPercent = origGB > 0 ? +(((origGB - optGB) / origGB) * 100).toFixed(1) : 0;

    // Cloudflare R2 Pricing: 10 GB free per month, then $0.015 / GB-month
    const r2BillableGB = Math.max(0, optGB - 10);
    const estMonthlyR2USD = +(r2BillableGB * 0.015).toFixed(2);

    // Backblaze B2 Pricing: 10 GB free, then $0.006 / GB-month
    const b2BillableGB = Math.max(0, optGB - 10);
    const estMonthlyB2USD = +(b2BillableGB * 0.006).toFixed(2);

    result[`scale${s.label}GB`] = {
      scaleCount: s.count,
      label: s.label,
      estimatedOriginalGB: origGB,
      estimatedOptimizedGB: optGB,
      savingsPercent,
      estMonthlyR2USD,
      estMonthlyB2USD,
    };
  }

  return result;
}

/**
 * Storage architecture tier analysis (10 GB to 1 TB thresholds).
 */
export function buildStorageTierAnalysis(
  avgOptimizedBytesPerItem: number
): {
  tierComparisons: StorageTierComparison[];
  recommendation: 'R2_CURRENT_BUCKET' | 'R2_SEPARATE_BUCKET' | 'R2_B2_HYBRID' | 'B2_ARCHIVE';
  r2FreeTierAssessment: string;
  detailedRationale: string;
} {
  const avgMB = avgOptimizedBytesPerItem / (1024 * 1024);

  const tiers: StorageTierComparison[] = [
    {
      thresholdGB: 10,
      label: '10 GB (R2 Free Tier)',
      fitsOptimizedAtScale: `Accommodates up to ~${Math.floor((10 * 1024) / avgMB).toLocaleString()} optimized items`,
      monthlyCostR2USD: 0.0,
      monthlyCostB2USD: 0.0,
      recommendationNotes: 'Ideal for initial launch and curated high-priority Angkor heritage corpus (100% Free).',
    },
    {
      thresholdGB: 25,
      label: '25 GB',
      fitsOptimizedAtScale: `Accommodates up to ~${Math.floor((25 * 1024) / avgMB).toLocaleString()} optimized items`,
      monthlyCostR2USD: +((25 - 10) * 0.015).toFixed(2),
      monthlyCostB2USD: +((25 - 10) * 0.006).toFixed(2),
      recommendationNotes: 'Extremely affordable ($0.23/mo R2). Covers broad museum collections.',
    },
    {
      thresholdGB: 50,
      label: '50 GB',
      fitsOptimizedAtScale: `Accommodates up to ~${Math.floor((50 * 1024) / avgMB).toLocaleString()} optimized items`,
      monthlyCostR2USD: +((50 - 10) * 0.015).toFixed(2),
      monthlyCostB2USD: +((50 - 10) * 0.006).toFixed(2),
      recommendationNotes: 'Supports comprehensive national heritage catalog across all 12 cultural categories ($0.60/mo).',
    },
    {
      thresholdGB: 100,
      label: '100 GB',
      fitsOptimizedAtScale: `Accommodates up to ~${Math.floor((100 * 1024) / avgMB).toLocaleString()} optimized items`,
      monthlyCostR2USD: +((100 - 10) * 0.015).toFixed(2),
      monthlyCostB2USD: +((100 - 10) * 0.006).toFixed(2),
      recommendationNotes: 'Full-scale national archive with deep multi-angle photographic surveys ($1.35/mo).',
    },
    {
      thresholdGB: 250,
      label: '250 GB',
      fitsOptimizedAtScale: `Accommodates up to ~${Math.floor((250 * 1024) / avgMB).toLocaleString()} optimized items`,
      monthlyCostR2USD: +((250 - 10) * 0.015).toFixed(2),
      monthlyCostB2USD: +((250 - 10) * 0.006).toFixed(2),
      recommendationNotes: 'Large institutional scale. Still under $3.60/mo with zero egress fees on R2.',
    },
    {
      thresholdGB: 500,
      label: '500 GB',
      fitsOptimizedAtScale: `Accommodates up to ~${Math.floor((500 * 1024) / avgMB).toLocaleString()} optimized items`,
      monthlyCostR2USD: +((500 - 10) * 0.015).toFixed(2),
      monthlyCostB2USD: +((500 - 10) * 0.006).toFixed(2),
      recommendationNotes: 'Massive archive including high-definition video performances and audio recordings ($7.35/mo).',
    },
    {
      thresholdGB: 1000,
      label: '1 TB (1,000 GB)',
      fitsOptimizedAtScale: `Accommodates up to ~${Math.floor((1000 * 1024) / avgMB).toLocaleString()} optimized items`,
      monthlyCostR2USD: +((1000 - 10) * 0.015).toFixed(2),
      monthlyCostB2USD: +((1000 - 10) * 0.006).toFixed(2),
      recommendationNotes: 'Exhaustive historical repository ($14.85/mo on R2 or $5.94/mo on B2).',
    },
  ];

  return {
    tierComparisons: tiers,
    recommendation: 'R2_CURRENT_BUCKET',
    r2FreeTierAssessment:
      'Cloudflare R2 provides 10 GB of free persistent storage every month with $0 egress bandwidth fees. With our multi-resolution WebP optimization (~680 KB per complete CDN variant set), the platform can host up to ~14,700 items completely free of charge.',
    detailedRationale:
      'Cloudflare R2 (current single bucket with versioned prefix /v1/) is strongly recommended for the first 10,000–50,000 items. Zero egress fees eliminate unpredictable bandwidth bills. If video or raw uncompressed master archives exceed 250 GB in future phases, a hybrid model (R2 for web-optimized CDN assets + Backblaze B2 for cold master archival preservation) can be introduced seamlessly.',
  };
}
