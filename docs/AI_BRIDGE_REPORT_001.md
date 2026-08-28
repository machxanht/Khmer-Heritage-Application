# AI BRIDGE REPORT 001: REPOSITORY AUDIT & BASELINE VERIFICATION
**Project:** Khmer Heritage (Bách khoa toàn thư kỹ thuật số & Khám phá di sản văn minh Khmer)  
**Task ID:** `KH-TASK-001`  
**Date:** 2026-08-27  
**Branch:** `dev`  
**Baseline Commit:** `e94b3c5`  

---

## 1. Executive Summary & Verification Context
Nhiệm vụ của Task 001 là thực hiện audit toàn diện hiện trạng repository, kiểm tra tính tương thích với định hướng cốt lõi của **Khmer Heritage** (Digital Encyclopedia, Academic Rigor, 8 Pillars, Cultural Resonance, Cloudflare R2 Content Pipeline), xác nhận baseline sạch, và vạch ra lộ trình các task tiếp theo mà không làm xáo trộn kiến trúc.

---

## 2. Git Status & Repository Baseline

- **Branch hiện tại:** `dev` (được bảo vệ, không commit trực tiếp lên `main`)
- **Baseline Commit:** `e94b3c5` (`chore: baseline repository state for TASK 001`)
- **Trạng thái Working Tree:** Clean, không có uncommitted changes hay file rác.

---

## 3. Build & Typecheck Baseline

Đã chạy kiểm tra hệ thống:
1. **Linter & Typechecker:** `tsc --noEmit` (TypeScript 5.8.2 strict mode)
   - **Kết quả:** `0 errors`, `0 warnings`
   - **Thời gian thực thi:** ~1.2s
2. **Production Bundler:** `vite build` (React 19 + Tailwind CSS 4)
   - **Kết quả:** `SUCCESS` (dist bundles generated cleanly: `index.html`, assets, chunks)
   - **Thời gian thực thi:** ~2.1s

---

## 4. Kiểm Tra UI & Các Tuyến Tuyến (Routes) Hiện Tại

| Tuyến / Tab | Hash Route | Trạng thái hiển thị | Chức năng thực tế |
| :--- | :--- | :--- | :--- |
| **Discover** | `#discover` (hoặc `/`) | Hoạt động chính xác | Banner tiêu điểm hàng ngày, 8 Trụ cột di sản với bộ đếm động, Niên biểu 5 thời kỳ lịch sử, 3 Tuyến hành trình tuyển chọn, danh sách mục bách khoa mới nhất. |
| **Entry Dossier** | `#entry/:slug` | Hoạt động chính xác | Xem chi tiết bài viết (Angkor Wat, Bayon, Banteay Srei, Apsara Dance, Khmer Silk, Pinpeat...), hệ thống ảnh/audio, giấy phép bản quyền CC/PD, tọa độ GPS, trích dẫn học thuật, bài viết liên quan. |
| **Map Grid** | `#map` | Hoạt động chính xác | Lưới tọa độ khảo cổ học Campuchia, lọc theo thời kỳ & di tích UNESCO, modal chi tiết tọa độ và chuyển tiếp vào bài viết. |
| **Soundscape** | `#music` / `#sound` | Hoạt động chính xác | Khám phá nhạc cụ cổ truyền (Pinpeat, Mohori, Ayai, Kar), bộ cộng hưởng vi cung (microtonal synthesizer) phát âm sắc mẫu chuẩn xác qua Web Audio API. |
| **Search** | `#search` | Hoạt động chính xác | Tìm kiếm toàn văn theo từ khóa, lọc đồng thời theo 8 Trụ cột và 5 Thời kỳ lịch sử. |
| **Saved / Bookmarks** | `#saved` | Hoạt động chính xác | Lưu trữ bài viết cá nhân trên client (localStorage), cập nhật badge số lượng tức thời trên navigation. |
| **Ingestion Pipeline** | `#scraper` | Đã tách khỏi public nav | Công cụ thu thập nội dung từ Wikipedia/Wikimedia Commons, chuẩn hóa schema và trích xuất JSON cho Cloudflare R2. Được đặt trong footer của sidebar. |

---

## 5. Đối Chiếu Với Master Plan / Kiến Trúc KHMER HERITAGE

Dưới đây là bảng phân loại chi tiết đối chiếu giữa codebase hiện tại và tài liệu thiết kế kiến trúc (`docs/PROJECT_VISION.md`, `docs/PRODUCT_SPEC.md`, `docs/ARCHITECTURE.md`, `docs/CONTENT_SCHEMA.md`, `docs/DATA_ARCHITECTURE.md`, `docs/LICENSING.md`):

### 5.1. Đã có và đúng (Accurate & Preserved)
- **Tập dữ liệu chuẩn mực:** 8 hồ sơ di sản chất lượng cao được biên soạn song ngữ Khmer/English (Angkor Wat, Bayon, Banteay Srei, Preah Vihear, Apsara Dance, Khmer Silk Weaving, Pinpeat Orchestra, Khmer Silverware) kèm đầy đủ metadata bản quyền và nguồn học thuật.
- **Hệ thống phân loại (8 Pillars & 5 Eras):** Đầy đủ 8 trụ cột (Architecture, Visual Arts, Performing Arts, Literature, Beliefs, Daily Life, Craftsmanship, History) và 5 thời kỳ niên biểu.
- **Microtonal Sound Synthesizer:** Sử dụng Web Audio API để mô phỏng chính xác hệ thang âm ngũ cung/vi cung truyền thống Khmer cho dàn nhạc Pinpeat mà không cần file audio nặng.
- **Đa ngôn ngữ (i18n):** Hệ thống dịch thuật hoàn chỉnh 4 ngôn ngữ (Khmer `km`, English `en`, Tiếng Việt `vi`, Thái `th`).
- **Tách biệt Ingestion Tooling:** Loại bỏ Scraper khỏi thanh điều hướng chính của người dùng công cộng, chuyển thành công cụ pipeline nội bộ.
- **Dynamic Counters:** Số lượng bài viết trên các danh mục phản ánh chính xác dữ liệu thực tế đang tải, không dùng số liệu giả lập.

### 5.2. Đã có nhưng sai ý tưởng / Cần hoàn thiện ở các phase sau
- **Content Storage Layer:** Hiện tại các bài viết đang được nạp tĩnh từ `src/data/heritage.ts`. Cần triển khai đọc bất đồng bộ từ các file JSON tĩnh chuẩn hóa (mô phỏng đúng cấu trúc thư mục Cloudflare R2 bucket: `/v1/manifest.json`, `/v1/categories.json`, `/v1/entries/:slug.json`).
- **Geo Map Provider:** MapView hiện tại đang sử dụng SVG coordinate grid tự vẽ mô phỏng vị trí địa lý. Trong tương lai khi kết nối Google Maps Platform API / Leaflet, cần giữ nguyên fallback mượt mà cho môi trường offline/static.

### 5.3. Còn thiếu (Missing for Future Milestones)
- **Cấu trúc JSON tĩnh độc lập:** Cần xuất toàn bộ dữ liệu ra thư mục `public/content/v1/` để `contentService.ts` có thể `fetch()` trực tiếp dạng static assets trước khi đẩy lên Cloudflare R2.
- **Bộ lọc nâng cao trong Search:** Tìm kiếm theo tác giả trích dẫn học thuật, tình trạng bảo tồn di tích.
- **Export Data / Offline PWA:** Khả năng tải gói dữ liệu tĩnh để đọc offline khi thăm quan đền đài tại Campuchia.

### 5.4. Không cần thiết / Có thể bỏ / Đã dọn dẹp
- **Đã loại bỏ:** Các badge đếm số lượng hardcoded không có thật trên category cards.
- **Đã loại bỏ:** Nút Scraper trên bottom navigation mobile và main sidebar navigation.
- **Không đưa vào:** Các tính năng thừa ngoài phạm vi bách khoa (như AI chatbot tạo sinh, hệ thống đăng nhập/auth người dùng, database SQL/NoSQL phức tạp, trò chơi/quiz giải trí).

---

## 6. Tổng Hợp Files Đã Kiểm Tra & Thay Đổi

- `src/types/schema.ts`: Chuẩn hóa toàn bộ types (LocalizedString hỗ trợ 4 thứ tiếng, MediaAsset, Citation, LicenseTier, EntryDetail, DataManifest).
- `src/data/types.ts`: Re-export an toàn từ `src/types/schema.ts`.
- `src/services/contentService.ts`: Triển khai đầy đủ interface `IContentService` với các phương thức async chuẩn bị cho R2.
- `src/components/AppShell.tsx`: Chuẩn hóa 5 tab public navigation và language switcher 4 ngôn ngữ.
- `src/components/DiscoverView.tsx`: Bộ đếm bài viết động theo dữ liệu thực.
- `src/i18n/translations.ts`: Hoàn thiện từ điển ngôn ngữ.
- `tsconfig.json`: Kích hoạt `strict: true`.

---

## 7. Đề Xuất Cho Task Tiếp Theo (Task 002)

1. **Task 002 - Content Static JSON Modularization:**
   - Tạo bộ file JSON độc lập trong `public/data/v1/` tuân thủ 100% `docs/CONTENT_SCHEMA.md` (`manifest.json`, `categories.json`, `eras.json`, `sites.json`, `instruments.json`, `entries/*.json`).
   - Cập nhật `contentService.ts` để đọc trực tiếp từ static JSON endpoints, giúp ứng dụng sẵn sàng triển khai lên Cloudflare Pages & R2 mà không phải thay đổi bất kỳ dòng code UI nào.
2. **Task 003 - Performance & Media Optimization:**
   - Tối ưu hóa kích thước asset ảnh và thumbnail cache.
   - Thêm progressive image loading và fallback mượt mà cho mạng yếu.
