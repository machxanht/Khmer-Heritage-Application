# Data Architecture: Khmer Heritage

## 1. Storage Strategy: Cloudflare R2
- Cloudflare R2 serves as the zero-egress-fee object store for all structured content, manifests, and media assets.
- Content is published as static, read-only JSON bundles alongside optimized media files.

## 2. Directory & Bucket Layout (Design Model)
```text
r2-bucket/
├── v1/
│   ├── manifest.json              # Version hash, last updated timestamp, category index
│   ├── categories.json            # Full list of categories and high-level metadata
│   ├── entries/
│   │   ├── index.json             # Lightweight index of all entries (id, title, summary, thumbnail)
│   │   ├── angkor-wat.json        # Full article content & citations
│   │   ├── apsara-dance.json
│   │   └── ...
│   └── media/
│       ├── images/
│       │   ├── full/              # WebP / AVIF high-res imagery
│       │   └── thumbs/            # WebP thumbnails
│       └── audio/                 # OGG / MP3 recordings
```

## 3. Client Consumption Flow
1. **Bootstrap**: Client loads local fallback manifest or fetches `v1/manifest.json`.
2. **Catalog Load**: Client reads `v1/entries/index.json` to populate exploration tabs, search index, and category views.
3. **Detail Load**: When user selects an entry, client fetches `v1/entries/{id}.json` and caches response locally.
4. **Media Resolution**: Media URLs point to CDN-backed endpoints with appropriate cache-control headers (`immutable`, `max-age=31536000` for versioned assets).

## 4. Cost Efficiency & Constraints
- Zero expensive DB compute instances.
- Global CDN caching with zero egress fees from R2.
- High resilience: Mobile and web apps continue functioning seamlessly even during backend maintenance.

## 5. Open Decisions
- [TODO / PENDING DECISION] CDN domain configuration (Custom domain via Cloudflare DNS).
- [TODO / PENDING DECISION] Offline sync protocol for mobile apps (e.g. background download of bundle for full offline reading).
- [TODO / PENDING DECISION] Image optimization pipeline (manual pre-generation vs Cloudflare Image Resizing).
