/**
 * Content Provider Interface
 * Decouples data retrieval from the underlying storage mechanism (Static Bundle, Cloudflare R2, CMS, or SQLite).
 */

import {
  Category,
  DataManifest,
  EntryDetail,
  EntrySummary,
  Era,
  HeritageSite,
  Instrument,
  Trail,
} from '../../types/schema.ts';

export interface IContentProvider {
  /**
   * Provider identifier (e.g. 'static-bundled', 'cloudflare-r2', 'headless-cms')
   */
  readonly providerId: string;

  /**
   * Fetches metadata manifest containing dataset version and statistics.
   */
  getManifest(): Promise<DataManifest>;

  /**
   * Fetches the 12 canonical heritage categories.
   */
  getCategories(): Promise<Category[]>;

  /**
   * Fetches all published heritage entry details.
   */
  getEntries(): Promise<EntryDetail[]>;

  /**
   * Fetches lightweight entry summaries (discovery / catalog index).
   */
  getEntrySummaries?(): Promise<EntrySummary[]>;

  /**
   * Fetches entry summaries filtered by category identifier.
   */
  getEntriesByCategory(categoryId: string): Promise<EntrySummary[]>;

  /**
   * Fetches a specific entry detail by ID or URL-safe slug.
   */
  getEntryDetail(slugOrId: string): Promise<EntryDetail | null>;

  /**
   * Fetches archeological GIS site pins for mapping.
   */
  getSites(): Promise<HeritageSite[]>;

  /**
   * Fetches chronological era timeline nodes.
   */
  getEras(): Promise<Era[]>;

  /**
   * Fetches curated exploration trails.
   */
  getTrails(): Promise<Trail[]>;

  /**
   * Fetches organology soundboard instrument profiles.
   */
  getInstruments(): Promise<Instrument[]>;
}
