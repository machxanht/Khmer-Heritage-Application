export type Locale = "en" | "km" | "vi" | "th";

export interface TranslationDict {
  common: {
    appName: string;
    tagline: string;
    archiveNote: string;
    language: string;
    saved: string;
    search: string;
    back: string;
    reset: string;
    verified: string;
    sources: string;
    loading: string;
    noResults: string;
    entriesCount: string;
  };
  nav: {
    discover: string;
    map: string;
    sound: string;
    search: string;
    saved: string;
    scraper: string;
  };
  home: {
    featuredToday: string;
    exploreJourney: string;
    pillarsEyebrow: string;
    pillarsTitle: string;
    chronologyEyebrow: string;
    chronologyTitle: string;
    trailsEyebrow: string;
    trailsTitle: string;
    stops: string;
    archiveEyebrow: string;
    archiveTitle: string;
    entries: string;
  };
  entry: {
    backToArchive: string;
    saveEntry: string;
    savedInBookmarks: string;
    era: string;
    category: string;
    mediaAssets: string;
    sources: string;
    verifiedSources: string;
    mediaEyebrow: string;
    mediaTitle: string;
    playSoundscape: string;
    soundscapeTitle: string;
    soundscapeSubtitle: string;
    citationsTitle: string;
    hideCitations: string;
    relatedEyebrow: string;
    relatedTitle: string;
  };
  map: {
    eyebrow: string;
    title: string;
    mappedCount: string;
    filterEra: string;
    allEras: string;
    unescoOnly: string;
    coordinatesGrid: string;
    unescoMonument: string;
    clickPinHint: string;
    province: string;
    style: string;
    status: string;
    latitude: string;
    longitude: string;
    readDossier: string;
  };
  sound: {
    eyebrow: string;
    title: string;
    subtitle: string;
    ensemble: string;
    allEnsembles: string;
    microtonalNote: string;
    family: string;
    playTuning: string;
    resonating: string;
    orchestraTitle: string;
    orchestraDesc: string;
    openArticle: string;
  };
  search: {
    eyebrow: string;
    title: string;
    placeholder: string;
    filterPillar: string;
    filterEra: string;
    allCategories: string;
    allEras: string;
    resultsMatch: string;
    resetFilters: string;
    noEntriesFound: string;
    searchHint: string;
  };
  saved: {
    eyebrow: string;
    title: string;
    countSuffix: string;
    emptyTitle: string;
    emptyDesc: string;
    startExploring: string;
  };
  eras: {
    pre: string;
    early: string;
    golden: string;
    post: string;
    modern: string;
  };
  condition: {
    excellent: string;
    stable: string;
    at_risk: string;
  };
}

export const translations: Record<Locale, TranslationDict> = {
  en: {
    common: {
      appName: "KHMER HERITAGE",
      tagline: "Digital Encyclopedia of Khmer Civilisation",
      archiveNote: "A curated, source-cited archive of Khmer civilisation. Media licensed CC BY-SA 4.0 unless noted.",
      language: "Language",
      saved: "Saved",
      search: "Search",
      back: "Back",
      reset: "Reset",
      verified: "verified",
      sources: "sources",
      loading: "Loading...",
      noResults: "No results found",
      entriesCount: "entries",
    },
    nav: {
      discover: "Discover",
      map: "Map",
      sound: "Sound",
      search: "Search",
      saved: "Saved",
      scraper: "Data Scraper",
    },
    home: {
      featuredToday: "Featured Today",
      exploreJourney: "Explore Journey",
      pillarsEyebrow: "Eight Pillars",
      pillarsTitle: "Pillars of Heritage",
      chronologyEyebrow: "Chronology",
      chronologyTitle: "The Era Ribbon",
      trailsEyebrow: "Curated",
      trailsTitle: "Exploration Trails",
      stops: "stops",
      archiveEyebrow: "Archive",
      archiveTitle: "Recently Catalogued",
      entries: "entries",
    },
    entry: {
      backToArchive: "Back to Archive",
      saveEntry: "Save Entry",
      savedInBookmarks: "Saved in Bookmarks",
      era: "Era",
      category: "Category",
      mediaAssets: "Media assets",
      sources: "Sources",
      verifiedSources: "verified sources",
      mediaEyebrow: "Media",
      mediaTitle: "Gallery & Sound",
      playSoundscape: "Play soundscape",
      soundscapeTitle: "Ambient temple soundscape · Pinpeat ensemble",
      soundscapeSubtitle: "Synthesised tones · In-house Original",
      citationsTitle: "Academic citations & bibliography",
      hideCitations: "Hide",
      relatedEyebrow: "Relational Web",
      relatedTitle: "Explore Related Heritage",
    },
    map: {
      eyebrow: "Cartography",
      title: "Heritage Sites & Temples",
      mappedCount: "coordinates mapped",
      filterEra: "Filter Era:",
      allEras: "All Eras",
      unescoOnly: "UNESCO World Heritage Only",
      coordinatesGrid: "Cambodian Archaeological Coordinates Grid",
      unescoMonument: "UNESCO Designated Monument",
      clickPinHint: "Click any coordinate pin to view site dossier",
      province: "Province",
      style: "Architectural Style",
      status: "Conservation Status",
      latitude: "GPS Latitude",
      longitude: "GPS Longitude",
      readDossier: "Read Full Encyclopedia Dossier",
    },
    sound: {
      eyebrow: "Acoustic Archive",
      title: "Traditional Music & Soundscapes",
      subtitle: "Interactive Synthesised Resonators",
      ensemble: "Ensemble:",
      allEnsembles: "All Ensembles",
      microtonalNote: "Synthesised from traditional microtonal tunings",
      family: "Family:",
      playTuning: "Play Tuning",
      resonating: "Resonating...",
      orchestraTitle: "Pinpeat Orchestra Full Repertoire",
      orchestraDesc: "Read historical documentation on court music preservation, sacred shadow theater (Sbek Thom), and royal ceremonies.",
      openArticle: "Open Pinpeat Article",
    },
    search: {
      eyebrow: "Archive Catalog",
      title: "Search the Heritage Archive",
      placeholder: "Search temples, sculpture, dance, music, historical kings, or scriptures...",
      filterPillar: "Pillar:",
      filterEra: "Era:",
      allCategories: "All Categories",
      allEras: "All Eras",
      resultsMatch: "catalogued entries match your search",
      resetFilters: "Reset filters",
      noEntriesFound: "No entries found",
      searchHint: "Try searching with keywords like Angkor, Apsara, Silk, Temple, or select All Categories.",
    },
    saved: {
      eyebrow: "Saved Archive",
      title: "Your Saved Heritage Entries",
      countSuffix: "entries bookmarked",
      emptyTitle: "No saved entries yet",
      emptyDesc: "When exploring temples, art, sculpture, or traditional music, click the bookmark icon to save entries for quick reference.",
      startExploring: "Start Exploring Archive",
    },
    eras: {
      pre: "Pre-Angkorian",
      early: "Early Angkorian",
      golden: "Classical Golden",
      post: "Post-Angkorian",
      modern: "Modern Renaissance",
    },
    condition: {
      excellent: "Excellent",
      stable: "Stable",
      at_risk: "At Risk",
    },
  },
  km: {
    common: {
      appName: "បេតិកភណ្ឌខ្មែរ",
      tagline: "បណ្ណសារឌីជីថលនៃអារ្យធម៌ខ្មែរ",
      archiveNote: "បណ្ណសារបេតិកភណ្ឌខ្មែរដែលផ្ទៀងផ្ទាត់ប្រភពត្រឹមត្រូវ។ ឯកសារប្រើប្រាស់ក្រោមអាជ្ញាប័ណ្ណ CC BY-SA 4.0។",
      language: "ភាសា",
      saved: "រក្សាទុក",
      search: "ស្វែងរក",
      back: "ត្រឡប់ក្រោយ",
      reset: "កំណត់ឡើងវិញ",
      verified: "ផ្ទៀងផ្ទាត់រួច",
      sources: "ប្រភព",
      loading: "កំពុងផ្ទុក...",
      noResults: "រកមិនឃើញលទ្ធផលទេ",
      entriesCount: "អត្ថបទ",
    },
    nav: {
      discover: "រុករក",
      map: "ផែនទី",
      sound: "សំឡេង",
      search: "ស្វែងរក",
      saved: "រក្សាទុក",
      scraper: "ប្រមូលទិន្នន័យ",
    },
    home: {
      featuredToday: "អត្ថបទពិសេសថ្ងៃនេះ",
      exploreJourney: "ចាប់ផ្តើមរុករក",
      pillarsEyebrow: "សសរស្តម្ភទាំង ៨",
      pillarsTitle: "សសរស្តម្ភនៃបេតិកភណ្ឌ",
      chronologyEyebrow: "កាលប្បវត្តិ",
      chronologyTitle: "ខ្សែសម័យកាល",
      trailsEyebrow: "ការណែនាំ",
      trailsTitle: "ដំណើររុករក",
      stops: "ទីតាំង",
      archiveEyebrow: "បណ្ណសារ",
      archiveTitle: "ចំណារថ្មីៗ",
      entries: "អត្ថបទ",
    },
    entry: {
      backToArchive: "ត្រឡប់ទៅបណ្ណសារ",
      saveEntry: "រក្សាទុកអត្ថបទ",
      savedInBookmarks: "បានរក្សាទុកក្នុងចំណាំ",
      era: "សម័យកាល",
      category: "ប្រភេទ",
      mediaAssets: "ឯកសារមេឌា",
      sources: "ប្រភពឯកសារ",
      verifiedSources: "ប្រភពផ្ទៀងផ្ទាត់រួច",
      mediaEyebrow: "មេឌា",
      mediaTitle: "វិចិត្រសាល និងសំឡេង",
      playSoundscape: "ចាក់សំឡេង",
      soundscapeTitle: "សំឡេងបរិយាកាសប្រាសាទបុរាណ · វង់ភ្លេងពិណពាទ្យ",
      soundscapeSubtitle: "សំឡេងបង្កើតតាមបែបបទប្រពៃណីខ្មែរ",
      citationsTitle: "ឯកសារយោង និងគន្ថនិទ្ទេស",
      hideCitations: "លាក់",
      relatedEyebrow: "ទំនាក់ទំនង",
      relatedTitle: "បេតិកភណ្ឌពាក់ព័ន្ធ",
    },
    map: {
      eyebrow: "ផែនទីវិទ្យា",
      title: "ផែនទីបេតិកភណ្ឌ និងប្រាសាទ",
      mappedCount: "ទីតាំងនៅលើផែនទី",
      filterEra: "សម័យកាល:",
      allEras: "គ្រប់សម័យកាល",
      unescoOnly: "បេតិកភណ្ឌពិភពលោក UNESCO",
      coordinatesGrid: "បណ្តាញកូអរដោនេបុរាណវិទ្យាកម្ពុជា",
      unescoMonument: "បេតិកភណ្ឌចុះបញ្ជី UNESCO",
      clickPinHint: "ចុចលើចំណុចដើម្បីមើលព័ត៌មានលម្អិតនៃទីតាំង",
      province: "ខេត្ត",
      style: "រចនាប័ទ្មស្ថាបត្យកម្ម",
      status: "ស្ថានភាពអភិរក្ស",
      latitude: "កូអរដោនេរយៈទទឹង",
      longitude: "កូអរដោនេរយៈបណ្តោយ",
      readDossier: "អានឯកសារពិស្តារ",
    },
    sound: {
      eyebrow: "បណ្ណសារសំឡេង",
      title: "តន្ត្រីបុរាណ និងឧបករណ៍",
      subtitle: "ឧបករណ៍បន្លឺសំឡេងអន្តរកម្ម",
      ensemble: "វង់ភ្លេង:",
      allEnsembles: "គ្រប់វង់ភ្លេង",
      microtonalNote: "បន្លឺតាមកម្រិតសំឡេងប្រពៃណីខ្មែរ",
      family: "ប្រភេទឧបករណ៍:",
      playTuning: "ស្តាប់សំឡេង",
      resonating: "កំពុងបន្លឺ...",
      orchestraTitle: "បណ្ណសារពិស្តារអំពីវង់ភ្លេងពិណពាទ្យ",
      orchestraDesc: "អានឯកសារប្រវត្តិសាស្ត្រស្តីពីការអភិរក្សតន្ត្រីព្រះរាជទ្រព្យ ល្ខោនស្បែកធំ និងពិធីបុណ្យប្រពៃណី។",
      openArticle: "អានអត្ថបទពិណពាទ្យ",
    },
    search: {
      eyebrow: "កាតាឡុកបណ្ណសារ",
      title: "ស្វែងរកក្នុងបណ្ណសារ",
      placeholder: "ស្វែងរកប្រាសាទ ចម្លាក់ របាំ តន្ត្រី ស្តេចប្រវត្តិសាស្ត្រ ឬក្បួនតម្រា...",
      filterPillar: "សសរស្តម្ភ:",
      filterEra: "សម័យកាល:",
      allCategories: "គ្រប់ប្រភេទ",
      allEras: "គ្រប់សម័យកាល",
      resultsMatch: "អត្ថបទត្រូវគ្នានឹងការស្វែងរក",
      resetFilters: "កំណត់ឡើងវិញ",
      noEntriesFound: "រកមិនឃើញអត្ថបទទេ",
      searchHint: "សូមសាកល្បងស្វែងរកដោយពាក្យគន្លឹះដូចជា «អង្គរ» «អប្សរា» «សូត្រ» «ប្រាសាទ» ឬជ្រើសរើសគ្រប់ប្រភេទ។",
    },
    saved: {
      eyebrow: "បណ្ណសាររក្សាទុក",
      title: "អត្ថបទបេតិកភណ្ឌដែលបានរក្សាទុក",
      countSuffix: "អត្ថបទដែលបានរក្សាទុក",
      emptyTitle: "មិនទាន់មានអត្ថបទដែលបានរក្សាទុក",
      emptyDesc: "ពេលអ្នកអានអត្ថបទប្រាសាទ សិល្បៈ ឬតន្ត្រីបុរាណ សូមចុចរូបសញ្ញាចំណាំដើម្បីរក្សាទុកសម្រាប់អានពេលក្រោយ។",
      startExploring: "ចាប់ផ្តើមរុករកបណ្ណសារ",
    },
    eras: {
      pre: "មុនសម័យអង្គរ",
      early: "អង្គរដើម",
      golden: "យុគមាស",
      post: "ក្រោយអង្គរ",
      modern: "ការរស់ឡើងវិញសម័យទំនើប",
    },
    condition: {
      excellent: "ល្អឥតខ្ចោះ",
      stable: "មានស្ថិរភាព",
      at_risk: "ប្រឈមហានិភ័យ",
    },
  },
  vi: {
    common: {
      appName: "DI SẢN KHMER",
      tagline: "Bách khoa toàn thư kỹ thuật số về nền văn minh Khmer",
      archiveNote: "Lưu trữ chọn lọc, có trích dẫn nguồn học thuật về nền văn minh Khmer. Bản quyền CC BY-SA 4.0 trừ khi có ghi chú khác.",
      language: "Ngôn ngữ",
      saved: "Đã lưu",
      search: "Tìm kiếm",
      back: "Quay lại",
      reset: "Đặt lại",
      verified: "đã xác thực",
      sources: "nguồn",
      loading: "Đang tải...",
      noResults: "Không tìm thấy kết quả",
      entriesCount: "mục",
    },
    nav: {
      discover: "Khám phá",
      map: "Bản đồ",
      sound: "Âm thanh",
      search: "Tìm kiếm",
      saved: "Đã lưu",
      scraper: "Thu thập dữ liệu",
    },
    home: {
      featuredToday: "Nổi bật hôm nay",
      exploreJourney: "Bắt đầu hành trình",
      pillarsEyebrow: "Tám trụ cột",
      pillarsTitle: "Các trụ cột di sản",
      chronologyEyebrow: "Niên biểu",
      chronologyTitle: "Dòng thời gian các thời kỳ",
      trailsEyebrow: "Được tuyển chọn",
      trailsTitle: "Hành trình khám phá",
      stops: "điểm dừng",
      archiveEyebrow: "Lưu trữ",
      archiveTitle: "Mục vừa lập danh mục",
      entries: "mục",
    },
    entry: {
      backToArchive: "Quay lại kho lưu trữ",
      saveEntry: "Lưu mục",
      savedInBookmarks: "Đã lưu trong dấu trang",
      era: "Thời kỳ",
      category: "Thể loại",
      mediaAssets: "Tư liệu truyền thông",
      sources: "Nguồn tham khảo",
      verifiedSources: "nguồn đã xác thực",
      mediaEyebrow: "Tư liệu",
      mediaTitle: "Thư viện ảnh & Âm thanh",
      playSoundscape: "Phát âm thanh",
      soundscapeTitle: "Không gian âm thanh đền đài cổ · Dàn nhạc Pinpeat",
      soundscapeSubtitle: "Âm thanh phục dựng nguyên bản",
      citationsTitle: "Trích dẫn học thuật & Thư mục tham khảo",
      hideCitations: "Ẩn",
      relatedEyebrow: "Mạng lưới liên kết",
      relatedTitle: "Khám phá di sản liên quan",
    },
    map: {
      eyebrow: "Bản đồ học",
      title: "Di tích & Đền đài Khmer",
      mappedCount: "tọa độ trên bản đồ",
      filterEra: "Lọc theo thời kỳ:",
      allEras: "Tất cả thời kỳ",
      unescoOnly: "Chỉ Di sản Thế giới UNESCO",
      coordinatesGrid: "Lưới tọa độ khảo cổ học Campuchia",
      unescoMonument: "Di tích được UNESCO công nhận",
      clickPinHint: "Nhấn vào ghim tọa độ để xem hồ sơ chi tiết",
      province: "Tỉnh",
      style: "Phong cách kiến trúc",
      status: "Tình trạng bảo tồn",
      latitude: "Vĩ độ GPS",
      longitude: "Kinh độ GPS",
      readDossier: "Đọc hồ sơ chi tiết bách khoa",
    },
    sound: {
      eyebrow: "Kho lưu trữ âm thanh",
      title: "Âm nhạc truyền thống & Không gian âm thanh",
      subtitle: "Bộ cộng hưởng âm thanh tương tác",
      ensemble: "Dàn nhạc:",
      allEnsembles: "Tất cả dàn nhạc",
      microtonalNote: "Tổng hợp từ thang âm vi cung truyền thống Khmer",
      family: "Họ nhạc cụ:",
      playTuning: "Nghe âm mẫu",
      resonating: "Đang vang vọng...",
      orchestraTitle: "Toàn cảnh dàn nhạc cung đình Pinpeat",
      orchestraDesc: "Đọc tài liệu lịch sử về bảo tồn âm nhạc cung đình, kịch bóng thiêng Sbek Thom và các nghi lễ hoàng gia.",
      openArticle: "Mở bài viết về Pinpeat",
    },
    search: {
      eyebrow: "Danh mục lưu trữ",
      title: "Tìm kiếm kho lưu trữ di sản",
      placeholder: "Tìm đền đài, điêu khắc, vũ đạo, âm nhạc, các vị vua lịch sử...",
      filterPillar: "Trụ cột:",
      filterEra: "Thời kỳ:",
      allCategories: "Tất cả danh mục",
      allEras: "Tất cả thời kỳ",
      resultsMatch: "kết quả khớp với tìm kiếm của bạn",
      resetFilters: "Đặt lại bộ lọc",
      noEntriesFound: "Không tìm thấy mục nào",
      searchHint: "Thử tìm kiếm với các từ khóa như Angkor, Apsara, Lụa, Đền đài, hoặc chọn Tất cả danh mục.",
    },
    saved: {
      eyebrow: "Lưu trữ cá nhân",
      title: "Các mục di sản đã lưu",
      countSuffix: "mục đã đánh dấu",
      emptyTitle: "Chưa có mục nào được lưu",
      emptyDesc: "Khi khám phá đền đài, nghệ thuật, điêu khắc hoặc âm nhạc truyền thống, bấm vào biểu tượng dấu trang để lưu lại xem sau.",
      startExploring: "Bắt đầu khám phá",
    },
    eras: {
      pre: "Tiền Angkor",
      early: "Angkor sơ kỳ",
      golden: "Hoàng kim cổ điển",
      post: "Hậu Angkor",
      modern: "Phục hưng hiện đại",
    },
    condition: {
      excellent: "Xuất sắc",
      stable: "Ổn định",
      at_risk: "Có nguy cơ",
    },
  },
  th: {
    common: {
      appName: "มรดกเขมร",
      tagline: "สารานุกรมดิจิทัลอารยธรรมเขมร",
      archiveNote: "คลังข้อมูลอ้างอิงทางวิชาการเกี่ยวกับอารยธรรมเขมร เนื้อหาสื่อสัญญาอนุญาต CC BY-SA 4.0 เว้นแต่จะระบุเป็นอย่างอื่น",
      language: "ภาษา",
      saved: "บันทึกแล้ว",
      search: "ค้นหา",
      back: "ย้อนกลับ",
      reset: "รีเซ็ต",
      verified: "ยืนยันแล้ว",
      sources: "แหล่งข้อมูล",
      loading: "กำลังโหลด...",
      noResults: "ไม่พบผลลัพธ์",
      entriesCount: "รายการ",
    },
    nav: {
      discover: "ค้นพบ",
      map: "แผนที่",
      sound: "เสียงดนตรี",
      search: "ค้นหา",
      saved: "บันทึกแล้ว",
      scraper: "ดึงข้อมูล",
    },
    home: {
      featuredToday: "ไฮไลท์ประจำวัน",
      exploreJourney: "เริ่มต้นสำรวจ",
      pillarsEyebrow: "เสาหลักทั้งแปด",
      pillarsTitle: "เสาหลักแห่งมรดก",
      chronologyEyebrow: "ลำดับเหตุการณ์",
      chronologyTitle: "เส้นเวลาแห่งยุคสมัย",
      trailsEyebrow: "คัดสรรพิเศษ",
      trailsTitle: "เส้นทางสำรวจ",
      stops: "จุดแวะ",
      archiveEyebrow: "คลังสารสนเทศ",
      archiveTitle: "รายการที่เพิ่งขึ้นทะเบียน",
      entries: "รายการ",
    },
    entry: {
      backToArchive: "กลับสู่คลังข้อมูล",
      saveEntry: "บันทึกรายการ",
      savedInBookmarks: "บันทึกในบุ๊กมาร์กแล้ว",
      era: "ยุคสมัย",
      category: "หมวดหมู่",
      mediaAssets: "สื่อและเอกสาร",
      sources: "แหล่งอ้างอิง",
      verifiedSources: "แหล่งข้อมูลที่ผ่านการตรวจสอบ",
      mediaEyebrow: "สื่อมีเดีย",
      mediaTitle: "แกลเลอรีภาพและเสียง",
      playSoundscape: "เล่นเสียงบรรยากาศ",
      soundscapeTitle: "เสียงบรรยากาศปราสาทโบราณ · วงปี่พาทย์พิณพาทย์",
      soundscapeSubtitle: "เสียงสังเคราะห์ต้นฉบับโบราณ",
      citationsTitle: "การอ้างอิงทางวิชาการและบรรณานุกรม",
      hideCitations: "ซ่อน",
      relatedEyebrow: "ความเชื่อมโยง",
      relatedTitle: "สำรวจมรดกที่เกี่ยวข้อง",
    },
    map: {
      eyebrow: "แผนที่ภูมิศาสตร์",
      title: "โบราณสถานและปราสาทขอม",
      mappedCount: "พิกัดบนแผนที่",
      filterEra: "กรองตามยุคสมัย:",
      allEras: "ทุกยุคสมัย",
      unescoOnly: "เฉพาะมรดกโลก UNESCO",
      coordinatesGrid: "ตารางพิกัดทางโบราณคดีกัมพูชา",
      unescoMonument: "โบราณสถานขึ้นทะเบียน UNESCO",
      clickPinHint: "คลิกหมุดพิกัดเพื่อดูรายงานข้อมูลทางโบราณคดี",
      province: "จังหวัด",
      style: "รูปแบบสถาปัตยกรรม",
      status: "สถานะการอนุรักษ์",
      latitude: "ละติจูด GPS",
      longitude: "ลองจิจูด GPS",
      readDossier: "อ่านเอกสารวิชาการฉบับเต็ม",
    },
    sound: {
      eyebrow: "คลังเสียงดนตรี",
      title: "ดนตรีโบราณและท่วงทำนอง",
      subtitle: "แบบจำลองเสียงเครื่องดนตรีโบราณเชิงโต้ตอบ",
      ensemble: "วงดนตรี:",
      allEnsembles: "ทุกวงดนตรี",
      microtonalNote: "สังเคราะห์จากระบบบันไดเสียงโบราณแบบเขมร",
      family: "ตระกูลเครื่องดนตรี:",
      playTuning: "ทดลองฟังเสียง",
      resonating: "กำลังกังวาน...",
      orchestraTitle: "คลังความรู้วงมโหรีและพิณพาทย์",
      orchestraDesc: "อ่านบันทึกประวัติศาสตร์เกี่ยวกับการอนุรักษ์ดนตรีราชสำนัก ละครหนังใหญ่สเบกธม และพิธีกรรมศักดิ์สิทธิ์",
      openArticle: "เปิดบทความพิณพาทย์",
    },
    search: {
      eyebrow: "สืบค้นสารสนเทศ",
      title: "ค้นหาคลังข้อมูลมรดก",
      placeholder: "ค้นหาปราสาท, ประติมากรรม, นาฏศิลป์, ดนตรี, กษัตริย์ในประวัติศาสตร์...",
      filterPillar: "เสาหลัก:",
      filterEra: "ยุคสมัย:",
      allCategories: "ทุกหมวดหมู่",
      allEras: "ทุกยุคสมัย",
      resultsMatch: "รายการที่ตรงกับการค้นหา",
      resetFilters: "ล้างตัวกรอง",
      noEntriesFound: "ไม่พบข้อมูล",
      searchHint: "ลองค้นหาด้วยคำสำคัญ เช่น นครวัด, อัปสรา, ผ้าไหม, ปราสาท หรือเลือกทุกหมวดหมู่",
    },
    saved: {
      eyebrow: "รายการที่บันทึก",
      title: "มรดกที่คุณบันทึกไว้",
      countSuffix: "รายการที่คั่นไว้",
      emptyTitle: "ยังไม่มีรายการที่บันทึก",
      emptyDesc: "เมื่อคุณสำรวจปราสาท ศิลปะ ประติมากรรม หรือดนตรีโบราณ ให้คลิกไอคอนบุ๊กมาร์กเพื่อบันทึกไว้อ่านภายหลัง",
      startExploring: "เริ่มต้นสำรวจคลังข้อมูล",
    },
    eras: {
      pre: "ก่อนสมัยพระนคร",
      early: "พระนครตอนต้น",
      golden: "ยุคทองพระนคร",
      post: "หลังสมัยพระนคร",
      modern: "ยุคฟื้นฟูสมัยใหม่",
    },
    condition: {
      excellent: "สมบูรณ์ดีเยี่ยม",
      stable: "มั่นคง",
      at_risk: "มีความเสี่ยง",
    },
  },
};
