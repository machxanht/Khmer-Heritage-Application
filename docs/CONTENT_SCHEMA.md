# Content Schema: Khmer Heritage

## 1. Schema Objectives
- Define strict, unambiguous TypeScript schemas for encyclopedia entries, categories, media assets, citations, and relational links.
- Guarantee that Android, iOS, and Web clients parse identical structured data.

## 2. Core Entities

### 2.1 Category
- Unique identifier (e.g., `history`, `temples`, `arts`, `music`, `rituals`, `cuisine`).
- Display names in Khmer (`km`) and English (`en`).
- Icon identifier, description, and sort order.

### 2.2 Entry (Encyclopedia Article)
- `id`: Unique slug (e.g., `angkor-wat`, `apsara-dance`, `chapei-dong-veng`).
- `title`: Localized titles (`km`, `en`).
- `categoryId`: References category.
- `summary`: Short lead paragraph.
- `content`: Structured body sections (markdown or structured block array).
- `era`: Historical period (e.g., `Angkorian (802–1431 CE)`).
- `coordinates`: Optional geo-coordinates (latitude, longitude) for physical heritage sites.
- `coverMedia`: Primary image/media object.
- `gallery`: Array of related media objects.
- `relatedEntryIds`: Array of slug strings linking to other entries.
- `citations`: Array of citation objects.
- `createdAt` / `updatedAt`: ISO-8601 timestamps.
- `version`: Integer schema version.

### 2.3 Media Asset
- `id`: Unique asset ID.
- `url`: Public R2 CDN URL.
- `thumbnailUrl`: Optimized smaller preview image URL.
- `type`: `image` | `audio` | `video` | `model3d`.
- `title`: Short caption / title.
- `description`: Detailed description.
- `source`: Origin organization, archive, or photographer.
- `sourceUrl`: Direct link to original repository.
- `creator`: Author/Artist/Photographer name.
- `license`: Strict license type identifier (see `docs/LICENSING.md`).
- `licenseUrl`: Official URL describing the license terms.
- `attribution`: Mandatory formatted attribution string.
- `dimensions`: Width and height for layout preservation.

### 2.4 Citation & Source
- `id`: Unique citation ID.
- `title`: Book, article, or publication title.
- `author`: Author or academic body.
- `year`: Publication year.
- `publisher`: Institutional publisher (e.g., EFEO, UNESCO, APSARA National Authority).
- `url`: Online digital library reference (if available).
- `isbn` / `doi`: Identifier string if applicable.

## 3. Open Decisions
- [TODO / PENDING DECISION] Multilingual format (Nested object per entry vs separate JSON file per locale).
- [TODO / PENDING DECISION] Markdown vs Rich Block (JSON-AST) for long-form article bodies.
- [TODO / PENDING DECISION] Content revision hashing / checksums for incremental mobile sync.
