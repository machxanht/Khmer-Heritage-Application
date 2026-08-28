/**
 * Content Pipeline Normalization Stage
 * Transforms and standardizes raw input data into compliant HeritageEntry objects.
 * Pipeline Step: SOURCE -> NORMALIZE -> VALIDATE
 */

import {
  Citation,
  EntrySection,
  HeritageEntry,
  LocalizedString,
  MediaAsset,
} from '../types/schema.ts';
import { NormalizeOptions } from './types.ts';

/**
 * Normalizes a localized string by trimming and ensuring string properties.
 */
export function normalizeLocalizedString(
  raw: Partial<LocalizedString> | string | undefined,
  fallback = ''
): LocalizedString {
  if (!raw) {
    return { km: fallback, en: fallback };
  }
  if (typeof raw === 'string') {
    const trimmed = raw.trim();
    return { km: trimmed, en: trimmed };
  }
  return {
    km: (raw.km || fallback).trim(),
    en: (raw.en || raw.km || fallback).trim(),
    ...(raw.vi ? { vi: raw.vi.trim() } : {}),
    ...(raw.th ? { th: raw.th.trim() } : {}),
  };
}

/**
 * Normalizes a media asset object.
 */
export function normalizeMediaAsset(raw: Partial<MediaAsset> | undefined, fallbackId = 'media-asset'): MediaAsset {
  if (!raw) {
    return {
      id: fallbackId,
      url: '',
      type: 'image',
      title: { km: 'រូបភាព', en: 'Media Asset' },
      creator: 'Khmer Heritage Archive',
      source: 'Khmer Heritage Field Archive',
      sourceUrl: '',
      license: 'cc_by_sa',
      licenseUrl: 'https://creativecommons.org/licenses/by-sa/4.0/',
      attribution: 'Khmer Heritage Archive, CC BY-SA 4.0',
    };
  }

  return {
    id: (raw.id || fallbackId).trim(),
    url: (raw.url || '').trim(),
    ...(raw.thumbnailUrl ? { thumbnailUrl: raw.thumbnailUrl.trim() } : {}),
    type: raw.type || 'image',
    title: normalizeLocalizedString(raw.title, 'Media Asset'),
    ...(raw.description ? { description: normalizeLocalizedString(raw.description) } : {}),
    creator: (raw.creator || 'Khmer Heritage Archive').trim(),
    source: (raw.source || 'Khmer Heritage Archive').trim(),
    sourceUrl: (raw.sourceUrl || '').trim(),
    license: raw.license || 'cc_by_sa',
    licenseUrl: (raw.licenseUrl || 'https://creativecommons.org/licenses/by-sa/4.0/').trim(),
    attribution: (raw.attribution || `${raw.creator || 'Archive'} — CC BY-SA 4.0`).trim(),
    ...(raw.dimensions ? { dimensions: raw.dimensions } : {}),
  };
}

/**
 * Normalizes an entry section.
 */
export function normalizeSection(raw: Partial<EntrySection>, index: number): EntrySection {
  return {
    id: (raw.id || `sec-${index + 1}`).trim(),
    heading: normalizeLocalizedString(raw.heading, `Section ${index + 1}`),
    body: normalizeLocalizedString(raw.body, ''),
    ...(raw.media ? { media: raw.media.map((m: Partial<MediaAsset>, mIdx: number) => normalizeMediaAsset(m, `sec-${index + 1}-m-${mIdx + 1}`)) } : {}),
    ...(raw.citations ? { citations: raw.citations.map((c: Partial<Citation>, cIdx: number) => normalizeCitation(c, `sec-${index + 1}-c-${cIdx + 1}`)) } : {}),
  };
}

/**
 * Normalizes a citation object.
 */
export function normalizeCitation(raw: Partial<Citation>, fallbackId = 'cit-1'): Citation {
  return {
    id: (raw.id || fallbackId).trim(),
    title: (raw.title || '').trim(),
    author: (raw.author || 'Scholarly Reference').trim(),
    ...(typeof raw.year === 'number' ? { year: raw.year } : {}),
    ...(raw.publisher ? { publisher: raw.publisher.trim() } : {}),
    ...(raw.url ? { url: raw.url.trim() } : {}),
    ...(raw.isbn ? { isbn: raw.isbn.trim() } : {}),
    ...(raw.doi ? { doi: raw.doi.trim() } : {}),
  };
}

/**
 * Normalizes a full Heritage Entry.
 */
export function normalizeHeritageEntry(
  raw: Partial<HeritageEntry>,
  _options: NormalizeOptions = {}
): HeritageEntry {
  const id = (raw.id || '').trim();
  const slug = (raw.slug || (id ? id.replace(/^e-/, '') : '')).trim().toLowerCase();
  const categoryId = (raw.categoryId || raw.category || 'temples').trim().toLowerCase();

  const sections = Array.isArray(raw.content?.sections)
    ? raw.content!.sections.map((s, idx) => normalizeSection(s, idx))
    : [];

  const gallery = Array.isArray(raw.gallery)
    ? raw.gallery.map((g, idx) => normalizeMediaAsset(g, `${id}-g-${idx + 1}`))
    : [];

  const rawRelated = raw.relatedEntryIds || raw.relatedEntries || [];
  const relatedEntryIds = Array.isArray(rawRelated)
    ? Array.from(new Set(rawRelated.map((r) => String(r).trim()).filter(Boolean)))
    : [];

  const rawCitations = raw.citations || raw.bibliography || [];
  const citations = Array.isArray(rawCitations)
    ? rawCitations.map((c, idx) => normalizeCitation(c, `${id}-c-${idx + 1}`))
    : [];

  const normalized: HeritageEntry = {
    id,
    slug,
    category: categoryId,
    categoryId,
    title: normalizeLocalizedString(raw.title, slug),
    summary: normalizeLocalizedString(raw.summary, ''),
    era: normalizeLocalizedString(raw.era, 'Angkorian Era'),
    coverMedia: normalizeMediaAsset(raw.coverMedia, `${id}-cover`),
    content: {
      sections,
    },
    gallery,
    relatedEntryIds,
    relatedEntries: relatedEntryIds,
    citations,
    bibliography: citations,
  };

  // Optional attributes
  if (raw.keyFacts) {
    normalized.keyFacts = raw.keyFacts;
  }
  if (raw.location) {
    normalized.location = raw.location;
  }
  if (raw.coordinates) {
    normalized.coordinates = raw.coordinates;
  }
  if (raw.audioMetadata) {
    normalized.audioMetadata = raw.audioMetadata;
  }
  if (raw.updatedAt) {
    normalized.updatedAt = raw.updatedAt;
  }

  return normalized;
}

/**
 * Normalizes an array of raw heritage entries.
 */
export function normalizeCorpus(
  rawEntries: Partial<HeritageEntry>[],
  options: NormalizeOptions = {}
): HeritageEntry[] {
  return rawEntries.map((e) => normalizeHeritageEntry(e, options));
}
