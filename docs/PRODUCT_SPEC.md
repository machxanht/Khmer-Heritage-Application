# Product Specification: Khmer Heritage

## 1. Product Overview
- **Name**: Khmer Heritage
- **Target Audience**: General public, students, cultural enthusiasts, researchers, tourists, and the global Khmer diaspora.
- **Product Type**: Cross-platform cultural encyclopedia and relational discovery platform.

## 2. Platform Requirements
- **Platforms**:
  - Android (APK / Google Play distribution)
  - iOS (App Store distribution)
  - Web (Browser-accessible portal)
- **Shared Content Layer**:
  - Web and Mobile must share the exact same content endpoints and schema contracts.
  - Zero dual-content authoring.

## 3. Core Functional Modules (Future Rollout)
- **Discovery / Home Hub**: Featured cultural themes, era of the day, curated collections.
- **Topic / Entry Reader**:
  - Structured overview, historical context, timeline, geographical location.
  - High-resolution media viewer with attribution metadata.
  - Citations and bibliography.
  - Related topics graph (Bidirectional relations).
- **Search & Filter**:
  - Category filtering (Architecture, Dance, Music, Mythology, Figures, etc.).
  - Chronological timeline navigation.
- **Media Gallery**:
  - Curated images, audio samples of traditional instruments, video demonstrations.
  - Strict compliance with licensing and attribution standards.
- **Bookmarks / Favorites**:
  - Client-side saving of interesting topics for rapid recall.

## 4. Known Constraints
- **Content Accuracy**: Every factual entry must be backed by reputable sources and scholarly citations.
- **Zero Mock / Unverified Media**: No unverified or copyright-violating media files.
- **Low Operating Cost**: No expensive proprietary databases; reliance on static structured JSON + Cloudflare R2 object storage.
- **UI Prototyping**: Lovable is designated to produce the visual prototype before final production implementation by Studio AI.

## 5. Open Decisions
- [TODO / PENDING DECISION] Exact UX navigation model (tab-based vs drawer vs nested master-detail).
- [TODO / PENDING DECISION] Search engine implementation (Client-side FlexSearch/Fuse.js for pre-indexed JSON vs Edge Worker search).
- [TODO / PENDING DECISION] Audio narration / pronunciation support for Khmer terms.
- [TODO / PENDING DECISION] Interactive maps integration for Angkor temples and historical coordinates.
