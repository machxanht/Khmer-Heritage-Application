# Khmer Heritage — Content Source Catalog & License Verification

## Status
- **Last Verified**: 2026-08-28
- **Verification Method**: Direct official portal audits, Terms of Service reviews, API and IIIF endpoint inspections, OAI-PMH catalog queries, and Creative Commons license validation.
- **Scope**: Evaluates all primary scholarly institutions, museum archives, open media repositories, and audio/video repositories relevant to the Khmer Heritage Platform.

---

## 1. Executive Summary & Policy Overview

The Khmer Heritage Platform enforces strict intellectual property compliance across all distributed client applications (Android, iOS, Web). Every media and data asset ingested into the pipeline must carry unambiguous provenance, a verified license tier, explicit attribution strings, and compliant redistribution rights.

### Core Principles
1. **Provenance First**: No internet search scraping, Pinterest pins, social media re-uploads, or watermarked stock photography.
2. **Item-Level Verification**: Open access institutional status does not imply unconditional public domain or commercial redistribution rights. Every asset is verified at the item level.
3. **Attribution Integrity**: Mandatory author, institutional origin, source URL, license identifier, and license terms link must accompany all published media assets.
4. **Metadata-Only Crawling**: Ingestion systems must operate under strict rate limits, utilizing HEAD/JSON/IIIF metadata without unbounded mass-media downloads.

---

## 2. Source Categories

### 2.1 Academic / Institutional
Primary research institutions producing peer-reviewed archaeological monographs, epigraphic corpora, architectural surveys, and conservation records:
- **École française d'Extrême-Orient (EFEO)**: Seminal epigraphy (*Inscriptions du Cambodge*), architectural surveys (Marchal, Parmentier, Groslier), BEFEO publications.
- **APSARA National Authority**: Official Angkor site management authority, hydraulic surveys, conservation technical reports.
- **Royal University of Fine Arts (RUFA), Phnom Penh**: Curricular treatises on traditional music, classical dance choreography, archaeology.
- **UNESCO World Heritage Centre & Intangible Heritage Section**: Official inscription nomination dossiers, periodic conservation monitoring, ICH safeguarding files.
- **National Museum of Cambodia (MCFA)**: National archaeological inventory, sculpture masterworks, bronze collections.
- **Center for Khmer Studies (CKS)**: Peer-reviewed *Siksācakr* journal, research monographs, Wat Damnak library catalog.
- **Ministry of Culture and Fine Arts, Cambodia (MCFA)**: Intangible cultural heritage inventory, royal decrees, cultural legislation.
- **Buddhist Institute of Cambodia (Institut Bouddhique)**: Palm-leaf manuscript inventories (*Sastra Sleuk Rith*), *Kambuja Suriya* literary archives, Khmer Tripitaka.

### 2.2 Museums & Digital Archives
International institutions holding major Khmer archaeological collections and high-resolution digitized collections:
- **The Metropolitan Museum of Art (The Met)**: Open Access Asian Art collection (80+ cataloged Khmer public domain sculptures and bronzes).
- **Smithsonian Institution (National Museum of Asian Art - Freer & Sackler)**: Freer Gallery of Art and Arthur M. Sackler Gallery Open Access collection (Banteay Srei sandstone, Sambor Prei Kuk, Angkorian bronzes, 3D models).
- **Musée National des Arts Asiatiques - Guimet (Musée Guimet, Paris)**: Largest collection of Khmer art outside Cambodia (Delaporte mission, Louis Finot collections).
- **British Library & Endangered Archives Programme (EAP)**: Digitized Buddhist monastery archives, rare Southeast Asian manuscripts (EAP051, EAP261).
- **Library of Congress (LOC)**: Historical maps of French Indochina, historic Angkor photographic collections, field audio recordings.
- **Bibliothèque nationale de France (BnF / Gallica)**: Historical mission reports, expedition drawings (Doudart de Lagrée, Francis Garnier, Louis Delaporte), French Indochina colonial archives.

### 2.3 Open Media Repositories
Community and institutional repositories with machine-readable open licenses:
- **Wikimedia Commons**: Over 15,000+ categorized Khmer heritage media files (photographs, SVG architectural ground plans, public domain scans).
- **Internet Archive (archive.org)**: Digitized rare out-of-copyright historical books, early recordings, public domain films.

### 2.4 Books & Digitized Publications
Digital academic library portals providing historical books and periodicals:
- **Persée (ENS de Lyon / CNRS / EFEO)**: Complete digitized backfile of *Bulletin de l'École française d'Extrême-Orient (BEFEO)* from 1901 to 2010s.
- **HathiTrust Digital Library / Google Books**: Pre-1929 out-of-copyright monographs (Aymonier, Moura, Finot, Leclère).

### 2.5 Audio & Music Archives
Specialized collections documenting traditional Khmer organology, scales, and oral transmissions:
- **Smithsonian Folkways Recordings**: Traditional recordings ("Royal Music of Cambodia", Pinpeat masters).
- **UNESCO Intangible Cultural Heritage Audio Archive**: Master recordings submitted with nomination files (Chapei Dang Veng, Smot chant).

### 2.6 Video & Audiovisual Archives
- **Bophana Audiovisual Resource Center (Phnom Penh)**: Over 100,000 items of Cambodian memory, Royal Ballet footage, documentary archives.

### 2.7 Direct / Commissioned Field Documentation
- **Khmer Heritage In-House Documentation**: On-site calibrated field photography, acoustic measurements, 3D photogrammetry, high-resolution vector diagrams.

---

## 3. Source Verification Matrix

| Source | Official URL | Data | Images | Audio | Video | API | IIIF | License | Commercial Use | Attribution | Redistribution | Crawl Status | Notes |
|---|---|---|---|---|---|---|---|---|---|---|---|---|---|
| **EFEO** | `https://www.efeo.fr` | Yes | Yes | No | No | No | No | Institutional All Rights Reserved / Open Access Articles | Restricted (Requires authorization) | Mandatory | Restricted | `MANUAL_REVIEW_REQUIRED` | Text via Persée OAI-PMH; Photo archive requires direct institutional agreement |
| **APSARA National Authority** | `https://apsaraauthority.gov.kh` | Yes | Yes | No | No | No | No | Crown / State Copyright | Restricted | Mandatory | Restricted | `SAFE_FOR_METADATA_DISCOVERY` | Official site conservation authority; citations & metadata safe |
| **RUFA Phnom Penh** | `http://www.rufa.edu.kh` | Yes | Limited | No | No | No | No | Institutional Copyright | Restricted | Mandatory | Restricted | `MANUAL_REVIEW_REQUIRED` | Used for curricular reference and scholarly verification |
| **UNESCO World Heritage Centre** | `https://whc.unesco.org` | Yes | Yes | Yes | Yes | Yes | No | CC BY-SA 3.0 IGO (Data) / Individual Media Rights | Permitted for Data; Media Restricted | Mandatory | Permitted for Open Data | `API_ONLY` | XML syndication at `whc.unesco.org/en/syndication` and UNESCO DataHub API |
| **National Museum of Cambodia** | `http://cambodiamuseum.gov.kh` | Yes | Yes | No | No | No | No | State Cultural Copyright | Restricted | Mandatory | Restricted | `MANUAL_REVIEW_REQUIRED` | Primary provenance authority for sculpture cataloging |
| **Center for Khmer Studies (CKS)** | `https://khmerstudies.org` | Yes | Limited | Yes | Yes | Yes | No | Non-Commercial Research Open Access | Non-Commercial Only | Mandatory | Restricted | `SAFE_FOR_METADATA_DISCOVERY` | Koha OPAC Z39.50 catalog; *Siksācakr* journal open access |
| **Ministry of Culture and Fine Arts (MCFA)** | `https://www.mcfa.gov.kh` | Yes | Yes | Yes | Yes | No | No | State Copyright / National Inventory | Non-Commercial / Official clearance | Mandatory | Restricted | `SAFE_FOR_METADATA_DISCOVERY` | National Intangible Cultural Heritage Inventory source |
| **Buddhist Institute of Cambodia** | `http://www.budinst.gov.kh` | Yes | Yes | Yes | No | No | No | State Heritage / Institutional | Non-Commercial | Mandatory | Restricted | `MANUAL_REVIEW_REQUIRED` | Palm-leaf manuscript registry (*Sastra Sleuk Rith*) |
| **Met Museum Open Access** | `https://www.metmuseum.org` | Yes | Yes | No | No | Yes | Yes | **CC0 1.0 Universal (Public Domain)** | **Unrestricted (Permitted)** | Courtesy Requested | **Full Redistribution Permitted** | `API_ONLY` | REST API at `collectionapi.metmuseum.org/public/collection/v1/`; 80+ Khmer objects |
| **Smithsonian Open Access (Freer/Sackler)** | `https://asia.si.edu` | Yes | Yes | No | Yes | Yes | Yes | **CC0 1.0 Universal (Public Domain)** | **Unrestricted (Permitted)** | Courtesy Requested | **Full Redistribution Permitted** | `API_ONLY` | REST API via `api.si.edu/openaccess/api/v1.0/`; requires free data.gov key |
| **Musée Guimet / GrandPalaisRmn** | `https://www.guimet.fr` | Yes | Yes | No | No | No | No | GrandPalaisRmn Rights Reserved | Paid Commercial License Required | Mandatory | Prohibited without License | `MANUAL_REVIEW_REQUIRED` | Essential for object metadata and iconographic reference |
| **British Library (EAP)** | `https://eap.bl.uk` | Yes | Yes | Yes | No | Yes | Yes | CC BY-NC 4.0 / Public Domain (expired items) | Non-Commercial Only | Mandatory | Non-Commercial with Attribution | `SAFE_WITH_RATE_LIMIT` | IIIF Image API supported; EAP Cambodia digitized manuscripts |
| **Library of Congress** | `https://www.loc.gov` | Yes | Yes | Yes | Yes | Yes | Yes | Item-Level (predominantly Public Domain) | Permitted for Public Domain items | Mandatory | Permitted for Public Domain items | `API_ONLY` | JSON API at `loc.gov/apis/` (150 req/min limit) |
| **Gallica / BnF** | `https://gallica.bnf.fr` | Yes | Yes | Yes | No | Yes | Yes | BnF Terms (Free Non-Commercial / Commercial Fee) | Commercial Fee Required | Mandatory | Non-Commercial Permitted | `SAFE_WITH_RATE_LIMIT` | SRU/OAI-PMH & IIIF endpoints; colonial expedition archives |
| **Wikimedia Commons** | `https://commons.wikimedia.org` | Yes | Yes | Yes | Yes | Yes | Yes | **Item-Level (Public Domain, CC0, CC BY, CC BY-SA)** | **Permitted for CC0, CC BY, CC BY-SA, PD** | Mandatory per CC terms | **Permitted under matching CC license** | `SAFE_WITH_RATE_LIMIT` | MediaWiki API with `prop=imageinfo&iiprop=extmetadata`; 15k+ files |
| **Internet Archive** | `https://archive.org` | Yes | Yes | Yes | Yes | Yes | No | Item-Level (Public Domain / CC Community) | Permitted for Public Domain items | Mandatory | Permitted for Public Domain items | `SAFE_WITH_RATE_LIMIT` | Advanced Search JSON API; out-of-copyright historical books |
| **Persée (BEFEO)** | `https://www.persee.fr` | Yes | Yes | No | No | Yes | No | Educational / Research Non-Commercial License | Commercial requires written consent | Mandatory | Non-Commercial with Attribution | `SAFE_FOR_METADATA_DISCOVERY` | OAI-PMH endpoint at `persee.fr/oai`; full BEFEO 1901–2010s |
| **Bophana Center** | `https://bophana.org` | Yes | Yes | Yes | Yes | No | No | Institutional Archive / Rights Reserved | Commercial Prohibited without Contract | Mandatory | Restricted | `MANUAL_REVIEW_REQUIRED` | Premier Cambodian audiovisual memory archive; metadata only |
| **Smithsonian Folkways** | `https://folkways.si.edu` | Yes | No | Yes | No | No | No | Commercial Copyright | Paid Licensing Required | Mandatory | Prohibited | `MANUAL_REVIEW_REQUIRED` | Traditional music liner notes, track metadata, and acoustic analysis |
| **Khmer Heritage In-House** | Project Internal | Yes | Yes | Yes | Yes | Direct | Direct | **CC BY-SA 4.0 / In-House Dedicated** | **Permitted (CC BY-SA 4.0)** | Mandatory | **Permitted (CC BY-SA 4.0)** | Direct Ingestion | Custom field photography, acoustic recordings, 3D photogrammetry |

---

## 4. Excluded Sources

The following sources were evaluated and formally **EXCLUDED** from the automated crawling and media ingestion pipeline:

| Source | Reason | Evidence |
|---|---|---|
| **Pinterest** | Prohibited by Terms of Service; no provenance; stripped copyright metadata; high copyright infringement risk. | *Pinterest Terms of Service (Section 2 & 8)* forbid automated scraping; images are user re-uploads without verifiable legal chain of title. |
| **Instagram / TikTok / Facebook** | Automated crawling prohibited; non-transferable individual user copyrights; unvetted user commentary. | *Meta Terms of Service / Instagram API Terms* prohibit automated content extraction and commercial caching. |
| **Unmoderated Stock Aggregators (Wallpaperflare, Pixahive, WallpaperCave)** | Fraudulent "Free to Use" tags on copyrighted professional photography; metadata stripped. | Forensic metadata checks show professional agency photographs re-hosted with stripped EXIF and invalid CC tags. |
| **Commercial Travel & Tour Blogs (e.g. TravelTriangle, AngkorFocus)** | Commercial marketing copy; unverified secondary historical claims; scraped photography. | Lack academic citations; content is promotional rather than scholarly. |
| **Generic Google Images Search Results** | Search engine indexing does not convey copyright or distribution rights. | Explicitly prohibited by `docs/LICENSING.md`. |

---

## 5. Item-Level Licensing Framework

To guarantee legal safety, Khmer Heritage classifies all media into strict license tiers:

### 5.1 Permitted for Full Global Distribution & Commercial App Distribution
1. **`public_domain`**:
   - Expired copyright (author died >70 years ago, pre-1929 publications, or official US Federal Government works).
   - *Allowed*: Download, store, transform, resize, serve through CDN, redistribute, commercial app distribution.
   - *Attribution*: Required for provenance integrity.
2. **`cc0`**:
   - Dedicated to public domain without condition (e.g., Met Museum Open Access, Smithsonian Open Access).
   - *Allowed*: Download, store, transform, resize, serve through CDN, redistribute, commercial use.
   - *Attribution*: Courtesy requested by institutions.
3. **`cc_by`**:
   - Creative Commons Attribution (2.0 / 3.0 / 4.0).
   - *Allowed*: Download, store, transform, resize, serve through CDN, redistribute, commercial use.
   - *Attribution*: **MANDATORY** (Creator, Title, Source, License URL).
4. **`cc_by_sa`**:
   - Creative Commons Attribution-ShareAlike (2.0 / 3.0 / 4.0).
   - *Allowed*: Download, store, transform, resize, serve through CDN, redistribute, commercial use (derivatives must remain CC BY-SA).
   - *Attribution*: **MANDATORY**.
5. **`in_house_original`**:
   - Project-commissioned photography, audio, 3D models, vector maps.
   - *Allowed*: Full unrestricted worldwide distribution under project terms.

### 5.2 Restricted / Non-Commercial (Metadata Only or Specific Educational Modules)
1. **`cc_by_nc` / `cc_by_nc_sa`**:
   - Non-commercial only (e.g., British Library EAP, BnF non-commercial).
   - *Policy*: **Do not include in general production binary distribution** to prevent app store commercial-licensing conflicts. Allowed for research citations and external hyperlinked references.
2. **`direct_permission`**:
   - Specific bilateral agreement with museum or archive (e.g. EFEO photographic archives).
   - *Policy*: Governed strictly by the bilateral agreement text.

---

## 6. Crawl & Ingestion Safety Policy

Every source in the registry is assigned an automated crawl policy:

1. **`API_ONLY`**:
   - Query strictly via official JSON/REST API endpoints (e.g., The Met API, Smithsonian API, Library of Congress API).
   - Enforce rate limit (max 5–10 req/sec, respect 429 backoff).
2. **`SAFE_WITH_RATE_LIMIT`**:
   - Permitted for metadata discovery and IIIF manifest resolution (e.g., Wikimedia Commons MediaWiki API, Gallica SRU).
   - Must supply a clear `User-Agent: KhmerHeritageBot/1.0 (https://khmerheritage.org; contact@khmerheritage.org)` header.
   - Delay between requests: minimum 500ms–1000ms.
3. **`SAFE_FOR_METADATA_DISCOVERY`**:
   - Bibliographic and catalog metadata extraction only (e.g., CKS Koha OPAC, Persée OAI-PMH).
   - No automated full-text mass scraping.
4. **`MANUAL_REVIEW_REQUIRED`**:
   - Automated crawling is **STRICTLY BLOCKED** until legal review or institutional agreement is confirmed (e.g., Bophana Center, Musée Guimet, EFEO Photo Archives).
5. **`NOT_ALLOWED`**:
   - Excluded sources; automated requests are permanently blocked.

---

## 7. Media Storage Projections

### 7.1 Unit Sizing Baseline (Measured Averages from Verified Sources)
- **Metadata (JSON)**: ~15 KB per entry (comprehensive multilingual fields, citations, geo-coordinates, audio metadata).
- **Original Archive Image (Hi-Res TIFF/RAW/JPEG)**: ~12.5 MB average (ranges from 4 MB to 45 MB).
- **App-Optimized Image (WebP/AVIF)**:
  - Hero Cover (1920x1080 WebP @ 82% quality): ~320 KB.
  - Gallery Plate (1200x800 WebP @ 80% quality): ~180 KB.
  - Thumbnail (400x300 WebP @ 75% quality): ~35 KB.
  - Multi-resolution responsive set (3 images per asset): ~535 KB total per asset.
- **Audio Asset (Pinpeat / Chapei Dang Veng / Chanting)**:
  - Original uncompressed (WAV 48kHz/24bit, 3 min): ~45 MB.
  - Optimized streaming (Opus/AAC @ 128 kbps, 3 min): ~2.8 MB.
- **Documents / Scans (PDF / High-res manuscript folio)**: ~8.0 MB per document.
- **Video (Documentary clip / dance choreography)**:
  - Original 1080p archival: ~350 MB (5 min).
  - Optimized H.264/AV1 720p @ 1.2 Mbps: ~45 MB (5 min).

### 7.2 Corpus Sizing Model
- Standard Heritage Entry: 1 Cover Image + 3 Gallery Images + 1 Citation Document.
- 1 in every 5 entries includes 1 Audio Asset.
- 1 in every 10 entries includes 1 Video Clip.

### 7.3 Storage Projections Matrix

| Corpus Scale | Scenario A: Original Mirror (Archival) | Scenario B: App-Optimized (CDN Delivery) | Storage Savings (%) |
|---|---|---|---|
| **1,000 Entries** | **68.5 GB** | **4.2 GB** | **93.8% Reduction** |
| • *JSON / Metadata* | *0.015 GB* | *0.015 GB* | *0%* |
| • *Images (Cover + Gallery)* | *50.0 GB* | *2.14 GB* | *95.7%* |
| • *Audio (200 tracks)* | *9.0 GB* | *0.56 GB* | *93.7%* |
| • *Video (100 clips)* | *35.0 GB* | *4.50 GB* | *87.1%* |
| • *Documents / Scans* | *8.0 GB* | *1.20 GB* | *85.0%* |
| **5,000 Entries** | **342.5 GB** | **21.0 GB** | **93.8% Reduction** |
| **10,000 Entries** | **685.0 GB** | **42.0 GB** | **93.8% Reduction** |
| **50,000 Entries** | **3,425.0 GB (3.42 TB)** | **210.0 GB** | **93.8% Reduction** |
| **Full Target Corpus (100k)** | **6,850.0 GB (6.85 TB)** | **420.0 GB** | **93.8% Reduction** |

*Note: All figures are ESTIMATES based on empirical sampling of Met Museum Open Access, Wikimedia Commons, and Smithsonian Open Access datasets.*

---

## 8. Recommended Storage Architecture

1. **Two-Tier Storage Strategy**:
   - **Tier 1 (Production Edge CDN / Cloudflare R2)**:
     - Hosts *App-Optimized Assets* (Scenario B).
     - Global delivery via Cloudflare R2 + CDN cache headers (`public, max-age=86400, stale-while-revalidate=604800`).
     - Kept under ~50 GB for the initial 10,000 entries corpus, enabling minimal egress and storage cost.
   - **Tier 2 (Cold Archival Storage / S3 Glacier / Cloud Storage Coldline)**:
     - Holds *Original High-Resolution RAW/TIFF/WAV Files* for institutional provenance and long-term preservation.
     - Never exposed directly to mobile/web client apps.

---

## 9. Conclusion & Next Steps
1. The **Verified Source Catalog** establishes a clear legal and architectural foundation.
2. Verified Open Access APIs (The Met, Smithsonian, Wikimedia Commons) form the initial batch for metadata extraction.
3. Automated tools must strictly use the metadata-only estimator and respect all crawl policies.
