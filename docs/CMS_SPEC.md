# CMS Specification: Khmer Heritage (Foundation Outline)

## 1. CMS Purpose & Scope
- Provide a dedicated, secure authoring and curation environment to manage categories, encyclopedia articles, media files, attributions, and citations.
- Generate and publish validated JSON datasets and media bundles to Cloudflare R2 storage.

## 2. Operating Principles
- **No Direct DB Coupling**: The CMS outputs pure static JSON files complying with `docs/CONTENT_SCHEMA.md`.
- **Validation Before Publish**: Schema validation (e.g. required attribution fields, valid license URLs, verified citation references) must pass before publishing to the CDN.
- **Preview Capability**: Authoring environment must allow previewing articles before pushing to production manifest.

## 3. Known Constraints
- CMS will NOT be implemented in this foundation task (`KH-001`).
- The CMS implementation will be scheduled in a subsequent dedicated phase.

## 4. Open Decisions
- [TODO / PENDING DECISION] CMS Architecture: Static Git-based CMS (e.g., Decap CMS / TinaCMS / custom Markdown editor) vs Lightweight web portal with Cloudflare Workers / R2 API.
- [TODO / PENDING DECISION] Authentication and role-based access for editors and researchers.
- [TODO / PENDING DECISION] Content versioning and rollback mechanism.
