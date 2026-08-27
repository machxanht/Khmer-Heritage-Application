# KHMER HERITAGE — FOUNDATION AUDIT REPORT
**Document Reference:** `FOUNDATION-001`  
**Date:** August 2026  
**Status:** Completed & Verified  

---

## 1. Executive Summary

This audit report documents the architectural alignment and foundation stabilization of the **Khmer Heritage** digital encyclopedia and cultural discovery platform, conforming to the core vision and specifications outlined in:
- `docs/PROJECT_VISION.md`
- `docs/PRODUCT_SPEC.md`
- `docs/ARCHITECTURE.md`
- `docs/CONTENT_SCHEMA.md`
- `docs/DATA_ARCHITECTURE.md`
- `docs/CONTENT_SOURCES.md`
- `docs/LICENSING.md`
- `docs/AI_BRIDGE.md`
- `docs/AI_BRIDGE_HISTORY.md`

### Core Directives Enforced:
- **No Unsolicited Features:** Maintained the strict scope of the digital encyclopedia and discovery platform.
- **No Database / Authentication / AI Layer:** Zero external database engines, zero login modals, and zero runtime AI dependencies introduced.
- **Preserved Existing Heritage Data:** Retained all 8 verified high-fidelity heritage entries, archaeological coordinate sites, traditional musical instruments, historical eras, and curated discovery trails without data loss.
- **Public Product Decoupling:** Successfully separated the public navigation from the content-ingestion / scraping engine.
- **Data Integrity:** Replaced hardcoded fake entry counts with dynamic counts reflecting the real loaded dataset.
- **Strict TypeScript Typing:** Enabled strict mode in `tsconfig.json` and resolved all type declarations with full compiler validation.

---

## 2. Comprehensive `src/` Codebase Audit

| Path / Module | Purpose | Status / Changes Made |
| :--- | :--- | :--- |
| `src/types/schema.ts` | Canonical schema definitions for multi-platform contracts (Android, iOS, Web) | Standardized: added `LocalizedString` with `km`, `en`, `vi`, `th`, `LicenseTier`, `MediaAsset`, `Citation`, `Category`, `GeoCoordinates`, `EntrySummary`, `EntryDetail`, `Era`, `Trail`, `HeritageSite`, `Instrument`, `DataManifest`. |
| `src/data/types.ts` | Legacy data types file | Refactored: re-exports cleanly from `src/types/schema.ts` to eliminate duplicate interfaces while maintaining full backward compatibility. |
| `src/services/contentService.ts` | Content provider service | Replaced stub implementation with functional query methods (`getManifest`, `getCategories`, `getEntries`, `getEntriesByCategory`, `getEntryDetail`, `getSites`, `getEras`, `getTrails`, `getInstruments`) conforming to the future Cloudflare R2 contract. |
| `src/services/scraperService.ts` | Content ingestion engine querying Wikipedia / Wikimedia Commons open API | Preserved and isolated as internal ingestion tooling for data curation and export. |
| `src/context/HeritageDataContext.tsx` | App state context managing active heritage entries | Retained dual-source persistence (default entries + local ingestion state) with strict typing. |
| `src/context/LanguageContext.tsx` | Multilingual support provider | Active: fully supports Khmer (`km`), English (`en`), Vietnamese (`vi`), and Thai (`th`). |
| `src/context/BookmarksContext.tsx` | Client-side bookmarks persistence | Active: manages saved entries via localStorage. |
| `src/components/AppShell.tsx` | Main application shell and navigation | Decoupled: Scraper removed from main public navigation (now 5 tabs: Discover, Map, Sound, Search, Saved). Added discrete pipeline link in sidebar footer. |
| `src/components/DiscoverView.tsx` | Heritage discovery hub | Adjusted: replaced static fake count numbers with dynamic entry counts per category. |
| `src/components/EntryView.tsx` | Detailed dossier reader | Retained: renders rich bilingual content sections, geo-coordinates, verified citations, and image licensing badges. |
| `src/components/MapView.tsx` | Archaeological coordinate grid | Retained: visual interactive coordinates map with UNESCO monument filters. |
| `src/components/SoundView.tsx` | Traditional musical instruments explorer | Retained: microtonal audio synthesizer recreating pitch scales across Pinpeat, Mohori, Ayai, and Kar ensembles. |
| `src/components/SearchView.tsx` | Search and filtering across categories and eras | Retained: full-text and category/era filtering. |
| `src/components/BookmarksView.tsx` | Saved heritage articles | Retained: saved bookmarks view. |
| `src/components/ScraperView.tsx` | Batch and single-topic scraper UI | Retained: accessible via dedicated admin/pipeline interface without polluting the public user experience. |
| `src/components/heritage.tsx` | Core shared UI building blocks (`SectionHeading`, `Badge`, `LicenseBadge`, `EntryCard`, `Page`) | Validated: strict TypeScript typing and responsive Tailwind layout. |
| `src/i18n/translations.ts` | Translation dictionary | Validated: comprehensive translations across all 4 target languages (`km`, `en`, `vi`, `th`). |

---

## 3. Public Product vs. Ingestion Tooling Decoupling

In prior iterations, the `Scraper` tool was displayed as a primary tab alongside public navigation items, confusing the end-user encyclopedia experience with internal data-pipeline operations.

### Remediation:
1. **Public Main Navigation (Desktop & Mobile):**
   - **Discover** (`/` or `#discover`)
   - **Map** (`#map`)
   - **Sound** (`#music`)
   - **Search** (`#search`)
   - **Saved** (`#saved`)
2. **Internal Content Ingestion Tooling:**
   - Isolated from the primary navigation rail.
   - Retained in the codebase for data curation teams via a discrete pipeline link in the desktop sidebar footer (`#scraper`).
   - All batch ingestion, single-topic scraping, license auditing, and Cloudflare R2 export payloads remain intact and functional.

---

## 4. Content Architecture & Schema Standardization

All content types and entities now adhere strictly to `docs/CONTENT_SCHEMA.md` and `docs/DATA_ARCHITECTURE.md`:

```typescript
export type LocaleCode = 'km' | 'en' | 'vi' | 'th';

export type LocalizedString = {
  km: string;
  en: string;
  vi?: string;
  th?: string;
};

export type LicenseTier =
  | 'public_domain'
  | 'cc0'
  | 'cc_by'
  | 'cc_by_sa'
  | 'in_house_original'
  | 'direct_permission';
```

### Key Schema Elements:
- **`MediaAsset`**: Includes `id`, `url`, `thumbnailUrl`, `type`, `title`, `creator`, `source`, `sourceUrl`, `license`, `licenseUrl`, `attribution`, and optional dimensions.
- **`Citation`**: Includes academic bibliography attributes (`title`, `author`, `year`, `publisher`, `url`, `isbn`, `doi`).
- **`Category`**: Consistent slugs, titles, descriptions, and icon mappings.
- **`EntryDetail`**: Structured multi-section body (`id`, `heading`, `body`), coordinate geometry, citations, and relation graph (`relatedEntryIds`).

---

## 5. Elimination of Fake Counters & Data Integrity

- **Previous Defect:** In `DiscoverView.tsx`, category cards rendered static numbers (`42`, `128`, `87`, `34`, etc.) that did not correlate with actual loaded entries.
- **Correction:** Dynamically evaluates `entries.filter(e => e.categoryId === c.id || e.categoryId === c.slug).length` against the active dataset.

---

## 6. Dependency and Package Audit

Audit of `package.json`:
- **Core Dependencies:**
  - `react` / `react-dom` (v19.0.1)
  - `lucide-react` (v0.546.0) — icon system
  - `motion` (v12.23.24) — animations
  - `clsx` & `tailwind-merge` — CSS utility helpers
  - `@tailwindcss/vite` & `tailwindcss` (v4.1.14)
- **Dev Dependencies:**
  - `@types/react` & `@types/react-dom` — installed for strict TypeScript type checking.
  - `typescript` (v5.8.2) — compiler
  - `vite` (v6.2.3) — bundler and development server

---

## 7. Verification Summary

- **TypeScript Typecheck (`npm run lint` / `tsc --noEmit`):** ✅ PASSED (0 errors)
- **Vite Production Build (`npm run build`):** ✅ PASSED (0 errors, dist output verified)
