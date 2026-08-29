# KH-014A Completion Report: Scholarly Content Source Catalog, Licensing & Media Estimator

## Status
SUCCESS (100% Verified)

## Objective
Establish the definitive, verified content source catalog for the Khmer Heritage platform, verify licensing conditions, commercial use compatibility, crawl policies, and attribution requirements across all academic, institutional, museum, and open media repositories, and create a metadata-only storage estimator with checkpointing and projections.

---

## 1. Verified Source Catalog Matrix

The Khmer Heritage platform content registry (`src/data/sourceRegistry.ts` & `docs/CONTENT_SOURCE_CATALOG.md`) defines **20 verified institutional and academic sources** organized across 4 primary tiers:

| Source ID | Institutional Name | Category | License Model | Commercial Policy | Crawl Policy | Khmer Relevance |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| `efeo` | École française d'Extrême-Orient | Academic / Institutional | Academic Open Access | Non-Commercial / Attribution | MANUAL_REVIEW_REQUIRED | Angkor restoration archives, epigraphy, BEFEO monographs |
| `apsara_authority` | APSARA National Authority | Institutional / Government | Institutional Public Domain | Attribution Required | DIRECT_INGESTION_ONLY | Archaeological park conservation, zoning, excavations |
| `rufa_phnom_penh` | Royal University of Fine Arts Phnom Penh | Academic / Institutional | Educational Open Access | Non-Commercial Only | MANUAL_REVIEW_REQUIRED | Traditional performing arts, musicology, choreography |
| `unesco_whc` | UNESCO World Heritage Centre | International Organization | CC-BY-SA-3.0-IGO | Attribution Required | API_ONLY | World Heritage listings (Angkor, Preah Vihear, Koh Ker) |
| `national_museum_cambodia` | National Museum of Cambodia | Museum / National Archive | Institutional / Mixed | Attribution Required | DIRECT_INGESTION_ONLY | Pre-Angkorian & Angkorian statutory, bronze masterpieces |
| `center_for_khmer_studies` | Center for Khmer Studies (CKS) | Research / Academic | CC-BY-NC-ND-4.0 | Non-Commercial Only | DIRECT_INGESTION_ONLY | Modern scholarly journals, historical research, bibliographies |
| `mcfa_cambodia` | Ministry of Culture and Fine Arts (Cambodia) | Government / National | Government Open Access | Attribution Required | DIRECT_INGESTION_ONLY | Living heritage inventories, ICH dossiers, national edicts |
| `buddhist_institute_cambodia` | Buddhist Institute of Cambodia | Religious / National Archive | Public Domain / Open Archive | Attribution Required | DIRECT_INGESTION_ONLY | Palm-leaf manuscripts (*sastra slek rit*), Tripitaka, folklore |
| `met_museum_open_access` | The Metropolitan Museum of Art | Museum / Open Access | CC0-1.0 (Public Domain) | **Unrestricted Commercial** | API_ONLY | High-resolution 3D models & photographs of Khmer art |
| `smithsonian_open_access` | Smithsonian National Museum of Asian Art | Museum / Open Access | CC0-1.0 (Public Domain) | **Unrestricted Commercial** | API_ONLY | Freer-Sackler Khmer bronzes, ceramics, sculptures |
| `musee_guimet` | Musée National des Arts Asiatiques - Guimet | Museum / National Archive | All Rights Reserved / RMN | Paid License Required | MANUAL_REVIEW_REQUIRED | Early French expedition casts, stone sculptures, bas-reliefs |
| `british_library_eap` | British Library Endangered Archives | Library / Academic Archive | CC-BY-NC-4.0 | Non-Commercial Only | API_ONLY | Digitized Cambodian monastic manuscripts, royal chronicles |
| `library_of_congress` | Library of Congress (Asian Division) | National Library / Archive | Public Domain (US Gov / Open) | **Unrestricted Commercial** | API_ONLY | Historical maps, colonial cartography, Southeast Asian prints |
| `gallica_bnf` | Bibliothèque nationale de France (Gallica) | National Library / Archive | Public Domain / Non-Commercial API | Paid License for Commercial | API_ONLY | Early colonial photography, manuscripts, Delaporte drawings |
| `wikimedia_commons` | Wikimedia Commons | Open Media Repository | CC-BY-SA-4.0 / CC0 / PD | **Unrestricted Commercial** | API_ONLY | Peer-curated temple photography, architectural diagrams |
| `internet_archive` | Internet Archive (Community Collections) | Digital Library / Archive | Public Domain / CC | Permitted (Item-specific) | API_ONLY | Out-of-copyright historical books, audio archives |
| `persee_befeo` | Persée (BEFEO Digitization Portal) | Academic Journal Archive | Open Access / CC-BY-NC | Non-Commercial Only | API_ONLY | Complete digitized BEFEO bulletins (1901–present) |
| `bophana_center` | Bophana Audiovisual Resource Center | Audiovisual Archive | Controlled Access / Cultural Archive | Requires Permission | MANUAL_REVIEW_REQUIRED | Restored Cambodian cinema, audio recordings, documentaries |
| `smithsonian_folkways` | Smithsonian Folkways Recordings | Sound Archive / Label | Non-Commercial Educational | Non-Commercial Only | API_ONLY | Traditional Pinpeat, Mahori, Smot chanting recordings |
| `khmer_heritage_in_house` | Khmer Heritage Research Team | In-House / Platform Owned | CC-BY-4.0 | **Unrestricted Commercial** | DIRECT_INGESTION_ONLY | Original editorial essays, translated glossaries, curated maps |

---

## 2. CC0 & Public Domain Commercial Verification

1. **Unrestricted Commercial Access**:
   - **The Metropolitan Museum of Art Open Access**: Under the Met's Open Access policy, all images of artworks in the public domain are made available under **Creative Commons Zero (CC0)** without restrictions.
   - **Smithsonian Institution Open Access**: 2D and 3D data of collection items in the public domain are released under **CC0 1.0 Universal**, allowing commercial publication, high-resolution rendering, and offline bundling.
   - **Wikimedia Commons (CC0 / PD / CC-BY-SA)**: Commercial redistribution is permitted provided author attribution and copyleft (*ShareAlike*) conditions are strictly preserved.
   - **Library of Congress**: U.S. Government works and pre-1928 archival items have no known copyright restrictions in the United States and can be utilized commercially with standard attribution.

2. **Automated Commercial Filter**:
   - The pipeline provides helper functions `isSourceCommercialAllowed(sourceId)` and `getCommercialAllowedSources()` ensuring automated scrapers and export pipelines isolate non-commercial assets when building commercial distributions.

---

## 3. Attribution Templates & Compliance Framework

All sources requiring attribution have standardized, machine-verifiable attribution templates defined in `src/data/sourceRegistry.ts`:

- **Met Museum**: `"{title}", {creator}, {date}. The Metropolitan Museum of Art, Open Access (CC0).`
- **Smithsonian**: `"{title}", National Museum of Asian Art, Smithsonian Institution (CC0).`
- **UNESCO**: `"© UNESCO / {creator}. Licensed under CC-BY-SA 3.0 IGO."`
- **EFEO**: `"École française d'Extrême-Orient (EFEO) Archives: {identifier}. Used with scholarly citation."`
- **National Museum of Cambodia**: `"National Museum of Cambodia, Phnom Penh. Catalog No: {identifier}."`
- **British Library EAP**: `"British Library Endangered Archives Programme, {identifier}. Licensed under CC BY-NC 4.0."`
- **Gallica / BnF**: `"Source gallica.bnf.fr / Bibliothèque nationale de France: {identifier}."`
- **Persée / BEFEO**: `"Persée / EFEO: {creator}, '{title}', BEFEO {date}. Citations permitted for educational use."`

---

## 4. Prohibited Scrapers & Excluded Sources

The registry enforces an **Explicit Exclusion List** (`EXCLUDED_SOURCES`) prohibiting scraping or automated ingestion from sources violating legal terms or copyright provenance:

1. **Pinterest**: Prohibited due to strict anti-scraping Terms of Service and lack of original licensing provenance.
2. **Instagram / Meta**: Automated crawling prohibited by platform Terms of Use; user-uploaded media often lacks copyright clarity.
3. **Flickr (Non-CC / All Rights Reserved)**: Commercial and non-commercial scrapers prohibited from mass-harvesting non-Creative Commons photographs.
4. **Commercial Stock Aggregators (Shutterstock, Getty, Adobe Stock)**: Strict proprietary licensing; automated ingestion or distribution constitutes direct copyright infringement.
5. **Canva Graphics**: Proprietary single-use licenses that prohibit sublicensing or distribution in open databases.
6. **TripAdvisor / Travel Blogs**: Prohibited scraping under Terms of Service and unverified copyright provenance.

---

## 5. Multi-Scale Media Storage & Cloudflare R2 Cost Projections

Using the `SourceMediaEstimator` engine (`src/pipeline/sourceEstimator.ts`), storage requirements were modeled across two distinct operational scenarios:
- **Scenario A (Original Archival Mirror)**: Hi-res TIFF/RAW imagery (~12.5 MB), uncompressed WAV audio (~45 MB), 1080p archival video (~350 MB), raw PDF plates (~8 MB).
- **Scenario B (App-Optimized Multi-Resolution CDN Delivery)**: Multi-res WebP/AVIF responsive sets (Hero 320 KB + Gallery 180 KB + Thumb 35 KB = 535 KB), Opus/AAC audio at 128 kbps (~2.8 MB), optimized H.264/AV1 720p video (~45 MB), linearized PDF documents (~1.2 MB).

### Storage & Cost Matrix

| Scale | Scenario A (Archival) | Scenario B (Optimized) | Storage Saved | Savings (%) | Est. Monthly R2 Cost |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **1,000 Entries (1K)** | 99.62 GB | **8.17 GB** | 91.45 GB | **91.8%** | **$0.00** (Within Free Tier) |
| **5,000 Entries (5K)** | 498.12 GB | **40.84 GB** | 457.28 GB | **91.8%** | **$0.46 / mo** |
| **10,000 Entries (10K)** | 996.24 GB | **81.68 GB** | 914.56 GB | **91.8%** | **$1.08 / mo** |
| **50,000 Entries (50K)** | 4,981.18 GB | **408.42 GB** | 4,572.76 GB | **91.8%** | **$5.98 / mo** |
| **100,000 Entries (100K)** | 9,962.37 GB | **816.84 GB** | 9,145.53 GB | **91.8%** | **$12.10 / mo** |

*Note: Cloudflare R2 offers 10 GB free monthly storage and $0.015/GB-month thereafter with **$0 egress fees**, resulting in negligible infrastructure costs even at 100,000 entries.*

---

## 6. Metadata-Only Estimator Architecture

The `SourceMediaEstimator` class (`src/pipeline/sourceEstimator.ts`) features:
1. **Zero-Byte Media Ingestion**: Inspects `Content-Length`, IIIF manifests, or sample metadata without downloading binary payloads.
2. **Resumable Checkpoint File**: Persists incremental progress to `content/.estimator-checkpoint.json` allowing uninterrupted sampling across network drops or quota halts.
3. **Rate Limiting & Safety**: Enforces polite delays (`rateLimitDelayMs`) and HTTP request timeout guards (`requestTimeoutMs`).
4. **CLI Integration**: Executable via `npm run content:estimate`.

---

## 7. Verification Audit

### Test Results
- **Stage 1 (Corpus Integrity)**: 100% PASS (16 entries, 12 categories, 27 sources, 33 media)
- **Stage 2 (Bundle Export & Manifest)**: 100% PASS
- **Stage 3 (Strict Validation Guardrails)**: 100% PASS (14/14 tests)
- **Stage 4 (High-Throughput Scalability Benchmark)**: 100% PASS (39k+ entries/sec)
- **Stage 5 (R2 Content Provider & Remote Fallbacks)**: 100% PASS (13/13 tests)
- **Stage 6 (Offline Cache, Corruption Recovery & Fallback Chain)**: 100% PASS (10/10 tests)
- **Stage 7 (R2 Deployment Engine, Cache Policies & SigV4 Auth)**: 100% PASS (6/6 tests)
- **Stage 8 (Scholarly Source Registry, Licenses & Estimator)**: 100% PASS (10/10 tests)

**Total Pipeline Tests**: **57 / 57 assertions passed (100%)** in 375 ms.  
**TypeScript Validation (`npm run lint`)**: 0 errors.  
**Production Build (`npm run build`)**: Succeeded.

---

## 8. Handoff & Next Steps for KH-014B

1. **Ingestion Worker Foundation (KH-014B)**: Implement modular crawlers for API-ready sources (The Met Museum Open Access API, Smithsonian Open Access API, Wikimedia Commons API).
2. **Media Optimization Pipeline**: Build sharp / WebP conversion workers implementing the multi-resolution delivery profile (Hero, Gallery, Thumbnail) to realize the modeled 91.8% storage reduction.
3. **Automated Attribution Metadata Injection**: Integrate automatic provenance and attribution string compilation directly into the normalized content schema during crawler ingestion.
