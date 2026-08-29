/**
 * Khmer Heritage - Pilot Common Utilities
 * Relevance filtering, license gating, rate limiting, and provenance generation.
 */

import type { CandidateRecord, IngestedMediaItem, ValidCategoryId, LicenseTier } from './types.ts';
import { VALID_CATEGORIES } from './types.ts';
import { estimateOptimizedVariants } from './mediaOptimizer.ts';

export const KHMER_RELEVANCE_KEYWORDS = [
  'khmer',
  'angkor',
  'cambodia',
  'cambodian',
  'bayon',
  'banteay srei',
  'phnom kulen',
  'apsara',
  'pinpeat',
  'chapei',
  'preah',
  'koh ker',
  'sambor prei kuk',
  'hariharalaya',
  'chenla',
  'funan',
  'sastra slek rit',
  'reamker',
  'krama',
  'amok',
  'sdok kok thom',
  'jayavarman',
  'suryavarman',
  'yasovarman',
  'lolei',
  'bakong',
  'preah vihear',
  'ta prohm',
  'baphuon',
  'kbal spean',
  'roluos',
  'preah khan',
  'banteay kdei',
  'neak pean',
  'phimeanakas',
  'banteay samre',
  'prasat',
];

export interface RelevanceEvaluation {
  score: number;
  matchedKeywords: string[];
  isAccepted: boolean;
  suggestedCategory: ValidCategoryId;
}

export function evaluateKhmerRelevance(
  title: string = '',
  description: string = '',
  culture: string = '',
  classification: string = '',
  categories: string[] = []
): RelevanceEvaluation {
  const combinedText = [
    title,
    description,
    culture,
    classification,
    ...categories,
  ]
    .join(' ')
    .toLowerCase();

  const matchedKeywords: string[] = [];
  for (const kw of KHMER_RELEVANCE_KEYWORDS) {
    if (combinedText.includes(kw)) {
      matchedKeywords.push(kw);
    }
  }

  // Calculate relevance score based on distinct keyword occurrences and specific weightings
  let score = matchedKeywords.length * 20;

  // Boost if culture or title explicitly mentions Khmer or Angkor
  if (culture.toLowerCase().includes('khmer') || culture.toLowerCase().includes('cambodia')) {
    score += 40;
  }
  if (title.toLowerCase().includes('khmer') || title.toLowerCase().includes('angkor')) {
    score += 30;
  }

  // Categorization heuristics
  let suggestedCategory: ValidCategoryId = 'history';
  if (combinedText.includes('temple') || combinedText.includes('wat') || combinedText.includes('bayon') || combinedText.includes('prasat')) {
    suggestedCategory = 'temples';
  } else if (combinedText.includes('statue') || combinedText.includes('sculpture') || combinedText.includes('bronze') || combinedText.includes('carving') || combinedText.includes('relief') || combinedText.includes('art')) {
    suggestedCategory = 'arts';
  } else if (combinedText.includes('music') || combinedText.includes('pinpeat') || combinedText.includes('chapei') || combinedText.includes('instrument') || combinedText.includes('drum')) {
    suggestedCategory = 'music';
  } else if (combinedText.includes('dance') || combinedText.includes('apsara') || combinedText.includes('ritual') || combinedText.includes('ceremony') || combinedText.includes('festival')) {
    suggestedCategory = 'rituals';
  } else if (combinedText.includes('manuscript') || combinedText.includes('sastra') || combinedText.includes('inscription') || combinedText.includes('script')) {
    suggestedCategory = 'script';
  } else if (combinedText.includes('silk') || combinedText.includes('krama') || combinedText.includes('costume') || combinedText.includes('textile') || combinedText.includes('sampot')) {
    suggestedCategory = 'costumes';
  } else if (combinedText.includes('king') || combinedText.includes('queen') || combinedText.includes('jayavarman') || combinedText.includes('figure')) {
    suggestedCategory = 'figures';
  } else if (combinedText.includes('garuda') || combinedText.includes('naga') || combinedText.includes('reamker') || combinedText.includes('myth')) {
    suggestedCategory = 'mythology';
  } else if (combinedText.includes('craft') || combinedText.includes('ceramic') || combinedText.includes('pottery') || combinedText.includes('silverware')) {
    suggestedCategory = 'crafts';
  }

  return {
    score,
    matchedKeywords,
    isAccepted: score >= 20 && matchedKeywords.length > 0,
    suggestedCategory,
  };
}

export interface LicenseGateResult {
  license: string;
  licenseTier: LicenseTier | 'unsupported_quarantine';
  isCommercialAllowed: boolean;
  isPublicDomain: boolean;
  passed: boolean;
  quarantineReason?: string;
}

export function evaluateItemLicense(
  rawLicense: string = '',
  isPublicDomainFlag: boolean = false,
  rightsStatement: string = ''
): LicenseGateResult {
  const normLicense = (rawLicense || '').trim().toLowerCase();
  const normRights = (rightsStatement || '').trim().toLowerCase();

  // Fail closed on missing/empty license
  if (!normLicense && !isPublicDomainFlag && !normRights) {
    return {
      license: 'Unknown',
      licenseTier: 'unsupported_quarantine',
      isCommercialAllowed: false,
      isPublicDomain: false,
      passed: false,
      quarantineReason: 'Missing license and copyright declaration (Fail-Closed Gate)',
    };
  }

  // 1. Explicit CC0 / Public Domain
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
      license: 'CC0-1.0 (Public Domain)',
      licenseTier: 'cc0',
      isCommercialAllowed: true,
      isPublicDomain: true,
      passed: true,
    };
  }

  // 2. Reject Non-Commercial / No-Derivatives restrictions
  if (
    normLicense.includes('nc') ||
    normLicense.includes('non-commercial') ||
    normLicense.includes('noncommercial') ||
    normRights.includes('non-commercial')
  ) {
    return {
      license: rawLicense || 'CC BY-NC',
      licenseTier: 'unsupported_quarantine',
      isCommercialAllowed: false,
      isPublicDomain: false,
      passed: false,
      quarantineReason: 'Non-commercial restriction incompatible with open distribution policy',
    };
  }

  if (
    normLicense.includes('nd') ||
    normLicense.includes('no-derivatives') ||
    normLicense.includes('noderivatives')
  ) {
    return {
      license: rawLicense || 'CC BY-ND',
      licenseTier: 'unsupported_quarantine',
      isCommercialAllowed: false,
      isPublicDomain: false,
      passed: false,
      quarantineReason: 'No-Derivatives restriction prohibits responsive CDN image optimizations',
    };
  }

  if (
    normLicense.includes('all rights reserved') ||
    normLicense.includes('copyright') ||
    normRights.includes('inc_uri') ||
    normRights.includes('in copyright')
  ) {
    return {
      license: 'All Rights Reserved',
      licenseTier: 'unsupported_quarantine',
      isCommercialAllowed: false,
      isPublicDomain: false,
      passed: false,
      quarantineReason: 'All Rights Reserved / In Copyright without explicit open redistribution grant',
    };
  }

  // 3. CC-BY / CC-BY-SA
  if (normLicense.includes('cc by-sa') || normLicense.includes('cc-by-sa')) {
    return {
      license: 'CC-BY-SA',
      licenseTier: 'cc_by_sa',
      isCommercialAllowed: true,
      isPublicDomain: false,
      passed: true,
    };
  }

  if (normLicense.includes('cc by') || normLicense.includes('cc-by')) {
    return {
      license: 'CC-BY',
      licenseTier: 'cc_by',
      isCommercialAllowed: true,
      isPublicDomain: false,
      passed: true,
    };
  }

  // Default fail-closed
  return {
    license: rawLicense || 'Unknown',
    licenseTier: 'unsupported_quarantine',
    isCommercialAllowed: false,
    isPublicDomain: false,
    passed: false,
    quarantineReason: `Unverified licensing declaration '${rawLicense || rightsStatement}'`,
  };
}

export function buildProvenanceAttribution(
  sourceName: string,
  title: string,
  creator?: string,
  date?: string,
  license?: string,
  identifier?: string
): string {
  const parts: string[] = [];
  if (title) parts.push(`"${title}"`);
  if (creator && creator !== 'Unknown' && creator !== 'Anonymous') parts.push(creator);
  if (date) parts.push(date);
  parts.push(sourceName);
  if (identifier) parts.push(`ID: ${identifier}`);
  if (license) parts.push(`(${license})`);
  return parts.join(', ');
}

export async function delay(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export async function fetchWithRetryAndTimeout(
  url: string,
  options: RequestInit = {},
  timeoutMs: number = 8000,
  maxRetries: number = 2
): Promise<Response> {
  let attempt = 0;
  while (attempt <= maxRetries) {
    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), timeoutMs);
    try {
      const res = await fetch(url, {
        ...options,
        signal: controller.signal,
        headers: {
          'User-Agent': 'KhmerHeritagePilotBot/1.0 (https://khmerheritage.org; contact@khmerheritage.org)',
          ...(options.headers || {}),
        },
      });
      clearTimeout(timer);
      if (res.status === 429 || res.status >= 500) {
        attempt++;
        if (attempt <= maxRetries) {
          const backoff = Math.pow(2, attempt) * 500;
          await delay(backoff);
          continue;
        }
      }
      return res;
    } catch (err: any) {
      clearTimeout(timer);
      attempt++;
      if (attempt > maxRetries) throw err;
      const backoff = Math.pow(2, attempt) * 500;
      await delay(backoff);
    }
  }
  throw new Error(`Failed to fetch ${url} after ${maxRetries} retries`);
}
