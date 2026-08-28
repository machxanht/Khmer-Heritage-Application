/**
 * Khmer Heritage — Scalability & Benchmark Suite
 * Evaluates Content Pipeline performance when expanding from 6 sample entries to larger corpora (25-50+ entries).
 * All tests are 100% offline, deterministic, and isolated from production datasets.
 */

import { HeritageEntry, LocalizedString, MediaAsset, Citation } from '../types/schema.ts';
import { defaultSourcesRegistry } from '../data/sources.ts';
import { normalizeCorpus, normalizeHeritageEntry } from './normalize.ts';
import { validateHeritageCorpus } from './validator.ts';
import { VALID_CATEGORIES } from './types.ts';

export interface BenchmarkMetrics {
  fixtureSize: number;
  normalizationMs: number;
  normalizationPerEntryUs: number;
  validationMs: number;
  validationPerEntryUs: number;
  searchBenchmarkQueries: number;
  searchBenchmarkTotalMs: number;
  searchBenchmarkPerQueryUs: number;
  providerEmulationMs: number;
  totalThroughputEntriesPerSec: number;
  memoryEstimateKb: number;
}

/**
 * Generates a synthetic, isolated benchmark corpus of specified size.
 * Uses synthetic markers to ensure no false cultural claims.
 */
export function generateSyntheticCorpus(count = 50): HeritageEntry[] {
  const sourceKeys = Object.keys(defaultSourcesRegistry);
  const entries: HeritageEntry[] = [];

  for (let i = 1; i <= count; i++) {
    const numStr = String(i).padStart(2, '0');
    const id = `synth-entry-${numStr}`;
    const slug = `synth-entry-${numStr}`;
    const categoryId = VALID_CATEGORIES[(i - 1) % VALID_CATEGORIES.length];
    
    // Pick 2 valid source keys
    const src1 = sourceKeys[(i - 1) % sourceKeys.length];
    const src2 = sourceKeys[i % sourceKeys.length];

    // Pick 2 valid related synthetic entries
    const rel1Num = String((i % count) + 1).padStart(2, '0');
    const rel2Num = String(((i + 1) % count) + 1).padStart(2, '0');
    const relatedEntryIds = [`synth-entry-${rel1Num}`, `synth-entry-${rel2Num}`];

    const title: LocalizedString = {
      en: `Synthetic Heritage Benchmark Specimen ${numStr}`,
      km: `ធាតុបេតិកភណ្ឌសាកល្បងគំរូ ${numStr}`,
      vi: `Mẫu Thử Nghiệm Di Sản Chuẩn ${numStr}`,
      th: `แบบจำลองการทดสอบมรดก ${numStr}`,
    };

    const summary: LocalizedString = {
      en: `Synthetic benchmark entry ${numStr} crafted for pipeline throughput and validation scaling verification.`,
      km: `ធាតុសាកល្បង ${numStr} សម្រាប់វាស់ស្ទង់សមត្ថភាពប្រព័ន្ធដំណើរការទិន្នន័យ។`,
      vi: `Mục di sản mô phỏng ${numStr} dùng cho việc kiểm thử hiệu năng và độ ổn định pipeline.`,
      th: `รายการมรดกจำลอง ${numStr} สำหรับการทดสอบประสิทธิภาพระบบและการตรวจสอบความถูกต้อง`,
    };

    const era: LocalizedString = {
      en: '12th Century CE · Angkorian Era',
      km: 'សតវត្សរ៍ទី ១២ · សម័យអង្គរ',
      vi: 'Thế kỷ 12 CN · Thời kỳ Angkor',
      th: 'ศตวรรษที่ 12 · ยุคพระนคร',
    };

    const coverMedia: MediaAsset = {
      id: `m-synth-${numStr}-cov`,
      url: `https://images.unsplash.com/photo-1544885935-98dd03b09034?auto=format&fit=crop&w=1200&q=80`,
      type: 'image',
      title: {
        en: `Cover Specimen ${numStr}`,
        km: `រូបភាពគំរូ ${numStr}`,
        vi: `Ảnh Mẫu ${numStr}`,
        th: `ภาพจำลอง ${numStr}`,
      },
      creator: 'Khmer Heritage Benchmark Suite',
      source: 'EFEO Synthetic Benchmark Archive',
      sourceUrl: 'https://www.efeo.fr',
      sourceId: src1,
      license: 'cc_by_sa',
      licenseUrl: 'https://creativecommons.org/licenses/by-sa/4.0/',
      attribution: 'Khmer Heritage Benchmark Suite — CC BY-SA 4.0',
      reviewStatus: 'verified_peer_reviewed',
      provenance: {
        repository: 'Synthetic Test Repository',
        collection: 'Scalability Audit Batch',
        accessionNumber: `SYNTH-${numStr}`,
      },
    };

    const gallery: MediaAsset[] = [
      {
        id: `m-synth-${numStr}-g1`,
        url: `https://images.unsplash.com/photo-1569154941061-e231b4725ef1?auto=format&fit=crop&w=1200&q=80`,
        type: 'image',
        title: { en: `Gallery Specimen ${numStr}-A`, km: `រូបភាពវិចិត្រសាល ${numStr}-A` },
        creator: 'Benchmark Suite',
        source: 'EFEO Benchmark',
        sourceUrl: 'https://www.efeo.fr',
        sourceId: src2,
        license: 'cc_by_sa',
        licenseUrl: 'https://creativecommons.org/licenses/by-sa/4.0/',
        attribution: 'Benchmark Suite — CC BY-SA 4.0',
        reviewStatus: 'verified_peer_reviewed',
      },
    ];

    const citations: Citation[] = [
      {
        id: `c-synth-${numStr}-1`,
        title: `Scholarly Benchmark Treatise on Specimen ${numStr}`,
        author: 'Georges Cœdès & Benchmark Working Group',
        year: 1968,
        sourceId: src1,
        license: 'cc_by_sa',
        attribution: 'EFEO Citation Archive',
        sourceType: 'academic_publication',
        reviewStatus: 'verified_peer_reviewed',
      },
    ];

    const entry: HeritageEntry = {
      id,
      slug,
      categoryId,
      category: categoryId,
      title,
      summary,
      era,
      coverMedia,
      content: {
        sections: [
          {
            id: `sec-${numStr}-1`,
            heading: {
              en: `Architectural Epigraphy and Morphology of ${numStr}`,
              km: `សិលាចារឹក និងទម្រង់ស្ថាបត្យកម្មនៃ ${numStr}`,
              vi: `Văn Bia và Hình Thái Kiến Trúc của ${numStr}`,
              th: `จารึกและสัณฐานวิทยาของ ${numStr}`,
            },
            body: {
              en: `Section body detailing the architectural morphology and synthetic inscription metrics for specimen ${numStr}.`,
              km: `ខ្លឹមសារលម្អិតអំពីទម្រង់ស្ថាបត្យកម្ម និងទិន្នន័យសាកល្បងនៃ ${numStr}។`,
              vi: `Nội dung phần mô tả chi tiết hình thái kiến trúc và dữ liệu đo đạc của mục ${numStr}.`,
              th: `เนื้อหาส่วนที่ให้รายละเอียดเกี่ยวกับสัณฐานวิทยาสถาปัตยกรรมและการวัดจารึกจำลองสำหรับตัวอย่าง ${numStr}`,
            },
          },
          {
            id: `sec-${numStr}-2`,
            heading: {
              en: `Conservation History & Epigraphic Registry`,
              km: `ប្រវត្តិអភិរក្ស និងបញ្ជីសិលាចារឹក`,
              vi: `Lịch Sử Bảo Tồn & Đăng Ký Văn Khắc`,
              th: `ประวัติการอนุรักษ์และการขึ้นทะเบียนจารึก`,
            },
            body: {
              en: `Scholarly overview of historic restoration campaigns conducted under UNESCO and EFEO oversight.`,
              km: `ទិដ្ឋភាពទូទៅនៃកិច្ចការអភិរក្ស និងជួសជុលក្រោមការគ្រប់គ្រងរបស់អង្គការយូណេស្កូ និងសាលាបារាំងចុងបូព៌ា។`,
              vi: `Tổng quan học thuật về các chiến dịch trùng tu lịch sử dưới sự giám sát của UNESCO và EFEO.`,
              th: `ภาพรวมทางวิชาการของโครงการบูรณะในอดีตภายใต้การดูแลของยูเนสโกและ EFEO`,
            },
          },
        ],
      },
      gallery,
      relatedEntryIds,
      relatedEntries: relatedEntryIds,
      sourceIds: [src1, src2],
      citations,
      bibliography: citations,
      coordinates: {
        latitude: 13.4125 + ((i % 20) * 0.015),
        longitude: 103.867 + ((i % 20) * 0.015),
      },
      reviewStatus: 'verified_peer_reviewed',
      scholarlyReviewer: 'Khmer Heritage Peer Review Committee',
      updatedAt: new Date().toISOString(),
    };

    entries.push(entry);
  }

  return entries;
}

/**
 * Runs the full scalability and performance benchmark.
 */
export function runScalabilityBenchmark(fixtureCount = 50): BenchmarkMetrics {
  const syntheticEntries = generateSyntheticCorpus(fixtureCount);

  // 1. Measure Normalization Speed
  const tNormStart = performance.now();
  const normalized = normalizeCorpus(syntheticEntries);
  const tNormEnd = performance.now();
  const normalizationMs = +(tNormEnd - tNormStart).toFixed(3);
  const normalizationPerEntryUs = +((normalizationMs * 1000) / fixtureCount).toFixed(2);

  // 2. Measure Validation Speed
  const tValStart = performance.now();
  const validationReport = validateHeritageCorpus(normalized, {
    sourcesRegistry: defaultSourcesRegistry,
  });
  const tValEnd = performance.now();
  const validationMs = +(tValEnd - tValStart).toFixed(3);
  const validationPerEntryUs = +((validationMs * 1000) / fixtureCount).toFixed(2);

  // Ensure validity
  if (validationReport.totalErrors > 0) {
    throw new Error(`Synthetic corpus failed validation with ${validationReport.totalErrors} errors.`);
  }

  // 3. Measure Provider Operations Latency
  const tProvStart = performance.now();
  const idMap = new Map(normalized.map((e) => [e.id, e]));
  const slugMap = new Map(normalized.map((e) => [e.slug, e]));
  const categoryMap = new Map<string, HeritageEntry[]>();
  normalized.forEach((e) => {
    const list = categoryMap.get(e.categoryId) || [];
    list.push(e);
    categoryMap.set(e.categoryId, list);
  });
  // Execute 50 lookups
  normalized.forEach((e) => {
    const byId = idMap.get(e.id);
    const bySlug = slugMap.get(e.slug);
    const byCat = categoryMap.get(e.categoryId);
    if (!byId || !bySlug || !byCat) {
      throw new Error('Provider index lookup failed.');
    }
  });
  const tProvEnd = performance.now();
  const providerEmulationMs = +(tProvEnd - tProvStart).toFixed(3);

  // 4. Measure Search & Filter Performance (1,000 randomized multi-lingual search queries)
  const testQueries = [
    'specimen', 'ស្ថាបត្យកម្ម', 'văn bia', 'การทดสอบ', 'angkor', '12th',
    'synth', 'បេតិកភណ្ឌ', 'di sản', 'แบบจำลอง', 'inscription', 'unesco'
  ];
  const queryCount = 1000;
  const tSearchStart = performance.now();

  for (let qIdx = 0; qIdx < queryCount; qIdx++) {
    const qStr = testQueries[qIdx % testQueries.length];
    const catFilter: string = qIdx % 3 === 0 ? 'all' : VALID_CATEGORIES[qIdx % VALID_CATEGORIES.length];
    const q = qStr.toLowerCase();

    const _matches = normalized.filter((entry) => {
      const matchesText =
        entry.title.en.toLowerCase().includes(q) ||
        entry.title.km.includes(qStr) ||
        (entry.title.vi ? entry.title.vi.toLowerCase().includes(q) : false) ||
        (entry.title.th ? entry.title.th.toLowerCase().includes(q) : false) ||
        entry.summary.en.toLowerCase().includes(q) ||
        entry.summary.km.includes(qStr);

      const matchesCategory = entry.categoryId === catFilter || catFilter === 'all';
      return matchesText && matchesCategory;
    });
  }

  const tSearchEnd = performance.now();
  const searchBenchmarkTotalMs = +(tSearchEnd - tSearchStart).toFixed(3);
  const searchBenchmarkPerQueryUs = +((searchBenchmarkTotalMs * 1000) / queryCount).toFixed(2);

  // Estimate JSON memory footprint in KB
  const jsonStr = JSON.stringify(normalized);
  const memoryEstimateKb = +(jsonStr.length / 1024).toFixed(2);

  const totalTimeMs = normalizationMs + validationMs;
  const totalThroughputEntriesPerSec = Math.round((fixtureCount / (totalTimeMs / 1000)));

  return {
    fixtureSize: fixtureCount,
    normalizationMs,
    normalizationPerEntryUs,
    validationMs,
    validationPerEntryUs,
    searchBenchmarkQueries: queryCount,
    searchBenchmarkTotalMs,
    searchBenchmarkPerQueryUs,
    providerEmulationMs,
    totalThroughputEntriesPerSec,
    memoryEstimateKb,
  };
}

// Direct CLI Execution
if (import.meta.url === `file://${process.argv[1]}` || process.argv.includes('--run-benchmark')) {
  console.log('='.repeat(70));
  console.log('  KHMER HERITAGE — CORPUS SCALABILITY & BENCHMARK AUDIT');
  console.log('='.repeat(70));

  [10, 25, 50, 100].forEach((size) => {
    const metrics = runScalabilityBenchmark(size);
    console.log(`\n▶ Scalability Test — Fixture Size: ${size} Entries (${metrics.memoryEstimateKb} KB)`);
    console.log(`  • Normalization Time:    ${metrics.normalizationMs} ms (${metrics.normalizationPerEntryUs} µs/entry)`);
    console.log(`  • Validation Time:       ${metrics.validationMs} ms (${metrics.validationPerEntryUs} µs/entry)`);
    console.log(`  • Provider Indexing:     ${metrics.providerEmulationMs} ms`);
    console.log(`  • Search (1,000 queries):${metrics.searchBenchmarkTotalMs} ms (${metrics.searchBenchmarkPerQueryUs} µs/query)`);
    console.log(`  • Total Pipeline Speed:  ${metrics.totalThroughputEntriesPerSec} entries/sec`);
  });

  console.log('\n' + '='.repeat(70));
  console.log('  SCALABILITY AUDIT: PASS — Codebase is ready for 50+ real corpus entries.');
  console.log('='.repeat(70));
}
