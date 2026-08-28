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
    categories: string;
    search: string;
    gallery: string;
    map: string;
    sound: string;
    saved: string;
    scraper: string;
    learn: string;
    dictionary: string;
    pronunciation: string;
    quiz: string;
    more: string;
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
    viewAllCategories: string;
  };
  categoriesView: {
    eyebrow: string;
    title: string;
    subtitle: string;
    allCategories: string;
    filterByEra: string;
    entriesAvailable: string;
    exploreCategory: string;
    noEntriesInCategory: string;
  };
  galleryView: {
    eyebrow: string;
    title: string;
    subtitle: string;
    allMedia: string;
    filterByCategory: string;
    licensingNote: string;
    viewArticle: string;
    mediaCount: string;
    closeViewer: string;
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
    emptyTitle: string;
    emptyDesc: string;
    exploreArchivePrompt: string;
    savedCount: string;
    clearAll: string;
    remove: string;
  };
  scraper: {
    badge: string;
    title: string;
    desc: string;
    statusReady: string;
    statusCrawling: string;
    statusIngesting: string;
    statusCompleted: string;
    startIngestion: string;
    resetAll: string;
    catalogStatsTitle: string;
    totalArticles: string;
    totalCategories: string;
    verifiedSources: string;
    highResMedia: string;
    sampleSourcesTitle: string;
    activityLogTitle: string;
    logWait: string;
    customIngestTitle: string;
    customIngestDesc: string;
    ingestButton: string;
    inputPlaceholder: string;
  };
}

export const translations: Record<Locale, TranslationDict> = {
  km: {
    common: {
      appName: "បណ្ណសារបេតិកភណ្ឌខ្មែរ",
      tagline: "បណ្ណសារឌីជីថលនៃអរិយធម៌ខ្មែរ",
      archiveNote: "បណ្ណសារផ្លូវការនៃការស្រាវជ្រាវ និងការអភិរក្សវប្បធម៌",
      language: "ភាសា",
      saved: "បានរក្សាទុក",
      search: "ស្វែងរក",
      back: "ត្រឡប់ក្រោយ",
      reset: "កំណត់ឡើងវិញ",
      verified: "បានផ្ទៀងផ្ទាត់",
      sources: "ប្រភព",
      loading: "កំពុងដំណើរការ...",
      noResults: "រកមិនឃើញលទ្ធផល",
      entriesCount: "អត្ថបទ",
    },
    nav: {
      discover: "ទំព័រដើម",
      categories: "១២ ប្រភេទបេតិកភណ្ឌ",
      search: "ស្វែងរកឯកសារ",
      gallery: "វិចិត្រសាលរូបភាព",
      map: "ផែនទីបុរាណវិទ្យា",
      sound: "តន្ត្រី និងឧបករណ៍",
      saved: "ឯកសារបានរក្សាទុក",
      scraper: "បំពង់បញ្ចូលទិន្នន័យ",
      learn: "រៀនអក្សរខ្មែរ",
      dictionary: "វចនានុក្រម",
      pronunciation: "ការបញ្ចេញសំឡេង",
      quiz: "កម្រងសំណួរ",
      more: "បន្ថែម",
    },
    home: {
      featuredToday: "ស្នាដៃឯកលេចធ្លោប្រចាំថ្ងៃ",
      exploreJourney: "ស្វែងយល់អត្ថបទលម្អិត",
      pillarsEyebrow: "សសរស្តម្ភទាំង ១២ នៃអរិយធម៌",
      pillarsTitle: "ប្រភេទបេតិកភណ្ឌខ្មែរ",
      chronologyEyebrow: "កាលប្បវត្តិប្រវត្តិសាស្ត្រ",
      chronologyTitle: "សម័យកាលនៃអរិយធម៌",
      trailsEyebrow: "ផ្លូវទស្សនាស្រាវជ្រាវ",
      trailsTitle: "ដំណើររុករកបេតិកភណ្ឌ",
      stops: "ទីតាំង",
      archiveEyebrow: "បណ្ណសារស្រាវជ្រាវ",
      archiveTitle: "អត្ថបទបេតិកភណ្ឌគំរូ",
      entries: "អត្ថបទ",
      viewAllCategories: "មើលប្រភេទទាំងអស់",
    },
    categoriesView: {
      eyebrow: "បែងចែកតាមប្រភេទ",
      title: "១២ សសរស្តម្ភនៃបេតិកភណ្ឌខ្មែរ",
      subtitle: "ស្វែងយល់ពីប្រាសាទបុរាណ សិល្បៈ ស្ថាបត្យកម្ម តន្ត្រី ទំនៀមទម្លាប់ និងអក្សរសាស្ត្រតាមប្រព័ន្ធបែងចែកស្តង់ដារ។",
      allCategories: "ប្រភេទទាំងអស់",
      filterByEra: "ចម្រាញ់តាមសម័យកាល",
      entriesAvailable: "អត្ថបទក្នុងបញ្ជី",
      exploreCategory: "ចូលមើលប្រភេទនេះ",
      noEntriesInCategory: "មិនទាន់មានអត្ថបទក្នុងប្រភេទនេះនៅឡើយ",
    },
    galleryView: {
      eyebrow: "វិចិត្រសាលរូបភាព",
      title: "បណ្ណសាររូបភាព និងវត្ថុបុរាណ",
      subtitle: "រូបថតគុណភាពខ្ពស់ ផ្ទាំងចម្លាក់ថ្មភក់ ឧបករណ៍តន្ត្រី និងសិល្បៈតម្បាញ ក្រោមអាជ្ញាប័ណ្ណស្រាវជ្រាវបើកទូលាយ (CC / EFEO / UNESCO)។",
      allMedia: "រូបភាពទាំងអស់",
      filterByCategory: "ចម្រាញ់តាមប្រភេទ",
      licensingNote: "ឯកសារទាំងអស់ភ្ជាប់មកជាមួយប្រភព និងអាជ្ញាប័ណ្ណស្រាវជ្រាវច្បាស់លាស់",
      viewArticle: "អានអត្ថបទពេញលេញ",
      mediaCount: "រូបភាព",
      closeViewer: "បិទផ្ទាំងទស្សនា",
    },
    entry: {
      backToArchive: "ត្រឡប់ទៅបណ្ណសារ",
      saveEntry: "រក្សាទុកអត្ថបទ",
      savedInBookmarks: "បានរក្សាទុក",
      era: "សម័យកាល",
      category: "ប្រភេទ",
      mediaAssets: "ឯកសាររូបភាព",
      sources: "ប្រភពស្រាវជ្រាវ",
      verifiedSources: "ប្រភពបានផ្ទៀងផ្ទាត់",
      mediaEyebrow: "វិចិត្រសាលរូបភាព",
      mediaTitle: "រូបភាព និងបណ្ណសារសំឡេង",
      playSoundscape: "ស្តាប់សំនៀងបុរាណ",
      soundscapeTitle: "សំនៀងឧបករណ៍ប្រពៃណី",
      soundscapeSubtitle: "សំនៀងគង និងរនាត",
      citationsTitle: "គន្ថនិទ្ទេស និងប្រភពស្រាវជ្រាវបែបវិទ្យាសាស្ត្រ",
      hideCitations: "លាក់ប្រភព",
      relatedEyebrow: "បេតិកភណ្ឌពាក់ព័ន្ធ",
      relatedTitle: "ស្វែងយល់បន្ថែមពីប្រធានបទនេះ",
    },
    map: {
      eyebrow: "ផែនទីបុរាណវិទ្យា",
      title: "ទីតាំងប្រាសាទ និងរមណីយដ្ឋាន",
      mappedCount: "ទីតាំងត្រូវបានកត់ត្រា",
      filterEra: "សម័យកាល:",
      allEras: "គ្រប់សម័យកាល",
      unescoOnly: "បេតិកភណ្ឌពិភពលោក UNESCO",
      coordinatesGrid: "កូអរដោនេភូមិសាស្ត្រ",
      unescoMonument: "បេតិកភណ្ឌពិភពលោក",
      clickPinHint: "ចុចលើចំណុចសម្គាល់ដើម្បីមើលព័ត៌មានលម្អិត",
      province: "ខេត្ត",
      style: "រចនាប័ទ្ម",
      status: "ស្ថានភាព",
      latitude: "រយៈទទឹង",
      longitude: "រយៈបណ្តោយ",
      readDossier: "អានឯកសារពិស្តារ",
    },
    sound: {
      eyebrow: "បណ្ណសារសំនៀងបុរាណ",
      title: "ឧបករណ៍តន្ត្រី និងវង់ភ្លេងប្រពៃណី",
      subtitle: "ស្តាប់ និងស្វែងយល់ពីប្រព័ន្ធសំនៀងនៃវង់ភ្លេងពិណពាទ្យ មហោរី និងចាប៉ីដងវែង។",
      ensemble: "វង់ភ្លេង:",
      allEnsembles: "គ្រប់វង់ភ្លេង",
      microtonalNote: "បច្ចេកវិទ្យាសំយោគសំនៀង Web Audio",
      family: "ប្រភេទឧបករណ៍",
      playTuning: "សាកល្បងសំនៀង",
      resonating: "កំពុងបន្លឺសំនៀង...",
      orchestraTitle: "រចនាសម្ព័ន្ធវង់ភ្លេងពិណពាទ្យ",
      orchestraDesc: "វង់ភ្លេងពិណពាទ្យមានវត្តមានតាំងពីសម័យអង្គរ ប្រើប្រាស់ក្នុងព្រះរាជពិធី និងពិធីបុណ្យសាសនា។",
      openArticle: "អានឯកសារលម្អិត",
    },
    search: {
      eyebrow: "ស្វែងរកឯកសារ",
      title: "រុករកក្នុងបណ្ណសារបេតិកភណ្ឌ",
      placeholder: "ស្វែងរកតាមឈ្មោះប្រាសាទ សម័យកាល ឬពាក្យគន្លឹះ...",
      filterPillar: "ប្រភេទ:",
      filterEra: "សម័យកាល:",
      allCategories: "គ្រប់ប្រភេទ",
      allEras: "គ្រប់សម័យកាល",
      resultsMatch: "លទ្ធផលត្រូវគ្នានឹងការស្វែងរក",
      resetFilters: "កំណត់ការស្វែងរកឡើងវិញ",
      noEntriesFound: "មិនមានឯកសារណាត្រូវនឹងពាក្យស្វែងរករបស់អ្នកឡើយ",
      searchHint: "សូមព្យាយាមស្វែងរកពាក្យដូចជា៖ អង្គរវត្ត, បាយ័ន, ពិណពាទ្យ, ឬសំពត់ហូល...",
    },
    saved: {
      eyebrow: "ឯកសារផ្ទាល់ខ្លួន",
      title: "ឯកសារស្រាវជ្រាវដែលបានរក្សាទុក",
      emptyTitle: "មិនទាន់មានឯកសារត្រូវបានរក្សាទុកនៅឡើយទេ",
      emptyDesc: "អ្នកអាចចុចប៊ូតុង 'រក្សាទុក' នៅលើអត្ថបទណាមួយ ដើម្បីងាយស្រួលបើកមើលឡើងវិញនៅពេលក្រោយ។",
      exploreArchivePrompt: "រុករកបណ្ណសារឥឡូវនេះ",
      savedCount: "ឯកសារបានរក្សាទុក",
      clearAll: "លុបទាំងអស់",
      remove: "ដកចេញ",
    },
    scraper: {
      badge: "ឧបករណ៍បញ្ចូលទិន្នន័យ",
      title: "ប្រព័ន្ធស្រូបទិន្នន័យបេតិកភណ្ឌ",
      desc: "បំពង់បញ្ចូលឯកសារឌីជីថលពីប្រភពស្រាវជ្រាវ EFEO, UNESCO និងអាជ្ញាធរជាតិអប្សរា។",
      statusReady: "ប្រព័ន្ធត្រៀមរួចរាល់",
      statusCrawling: "កំពុងស្រង់ទិន្នន័យពីប្រភព...",
      statusIngesting: "កំពុងរៀបចំទម្រង់តាម Schema...",
      statusCompleted: "ការបញ្ចូលទិន្នន័យបានជោគជ័យ!",
      startIngestion: "ចាប់ផ្តើមស្រូបទិន្នន័យគំរូ",
      resetAll: "កំណត់ទិន្នន័យដើមឡើងវិញ",
      catalogStatsTitle: "ស្ថិតិនៃបណ្ណសារបច្ចុប្បន្ន",
      totalArticles: "អត្ថបទសរុប",
      totalCategories: "ប្រភេទសរុប",
      verifiedSources: "ប្រភពស្រាវជ្រាវ",
      highResMedia: "រូបភាពគុណភាពខ្ពស់",
      sampleSourcesTitle: "ប្រភពស្រាវជ្រាវគំរូដែលបានភ្ជាប់",
      activityLogTitle: "កំណត់ហេតុដំណើរការ",
      logWait: "ចុចប៊ូតុងខាងលើដើម្បីដំណើរការ...",
      customIngestTitle: "បញ្ចូលឯកសារតាម JSON Schema",
      customIngestDesc: "អ្នកអាចបិទភ្ជាប់កូដ JSON ដែលមានទម្រង់ត្រឹមត្រូវតាម EntryDetail Schema ដើម្បីបញ្ចូលភ្លាមៗ។",
      ingestButton: "បញ្ចូលឯកសារនេះ",
      inputPlaceholder: "បិទភ្ជាប់ JSON EntryDetail នៅទីនេះ...",
    },
  },
  en: {
    common: {
      appName: "Khmer Heritage Encyclopedia",
      tagline: "The Digital Encyclopedia of Khmer Civilization",
      archiveNote: "Official Academic Heritage & Conservation Archive",
      language: "Language",
      saved: "Saved",
      search: "Search",
      back: "Back",
      reset: "Reset",
      verified: "Verified",
      sources: "Sources",
      loading: "Loading...",
      noResults: "No results found",
      entriesCount: "Entries",
    },
    nav: {
      discover: "Home",
      categories: "12 Categories",
      search: "Search Archive",
      gallery: "Media Gallery",
      map: "Archeological Map",
      sound: "Music & Acoustic",
      saved: "Saved Archives",
      scraper: "Ingestion Pipeline",
      learn: "Learn Khmer",
      dictionary: "Dictionary",
      pronunciation: "Pronunciation",
      quiz: "Heritage Quiz",
      more: "More",
    },
    home: {
      featuredToday: "Featured Masterpiece",
      exploreJourney: "Explore Dossier",
      pillarsEyebrow: "The 12 Pillars of Civilization",
      pillarsTitle: "Heritage Categories",
      chronologyEyebrow: "Historical Chronology",
      chronologyTitle: "Civilization Eras",
      trailsEyebrow: "Curated Thematic Trails",
      trailsTitle: "Exploration Journeys",
      stops: "stops",
      archiveEyebrow: "Encyclopedia Catalog",
      archiveTitle: "Catalogued Pilot Entries",
      entries: "entries",
      viewAllCategories: "View All 12 Categories",
    },
    categoriesView: {
      eyebrow: "Category Catalog",
      title: "12 Pillars of Khmer Heritage",
      subtitle: "Explore ancient sanctuaries, epigraphy, court arts, traditional instruments, culinary traditions, and living folklore.",
      allCategories: "All Categories",
      filterByEra: "Filter by Era",
      entriesAvailable: "Entries Catalogued",
      exploreCategory: "Explore Category",
      noEntriesInCategory: "No entries currently catalogued in this category.",
    },
    galleryView: {
      eyebrow: "Visual Archive",
      title: "Museum & Archival Media Gallery",
      subtitle: "High-resolution architectural photography, bas-relief scans, traditional instruments, and textile ikat details under open cultural licenses (CC / EFEO / UNESCO).",
      allMedia: "All Media Assets",
      filterByCategory: "Filter by Category",
      licensingNote: "All media assets include scholarly attribution, license provenance, and parent article links.",
      viewArticle: "Read Full Article",
      mediaCount: "assets",
      closeViewer: "Close Viewer",
    },
    entry: {
      backToArchive: "Back to Archive",
      saveEntry: "Save Dossier",
      savedInBookmarks: "Saved in Bookmarks",
      era: "Era",
      category: "Category",
      mediaAssets: "Media Assets",
      sources: "Sources",
      verifiedSources: "academic citations",
      mediaEyebrow: "Visual Archive",
      mediaTitle: "Gallery & Acoustic Assets",
      playSoundscape: "Play Soundscape",
      soundscapeTitle: "Sacred Acoustic Resonance",
      soundscapeSubtitle: "Synthesized traditional Khmer tuning",
      citationsTitle: "Scholarly Bibliography & Citations",
      hideCitations: "Hide citations",
      relatedEyebrow: "Related Heritage",
      relatedTitle: "Connected Articles & Sites",
    },
    map: {
      eyebrow: "Cartographic Archive",
      title: "Archeological Coordinates Map",
      mappedCount: "Monuments Mapped",
      filterEra: "Era:",
      allEras: "All Eras",
      unescoOnly: "UNESCO World Heritage Sites",
      coordinatesGrid: "Coordinates Grid",
      unescoMonument: "UNESCO Monument",
      clickPinHint: "Click any marker to inspect site metadata",
      province: "Province",
      style: "Style",
      status: "Condition",
      latitude: "Latitude",
      longitude: "Longitude",
      readDossier: "Read Full Dossier",
    },
    sound: {
      eyebrow: "Acoustic Archive",
      title: "Traditional Music & Instruments",
      subtitle: "Explore the microtonal tunings, organology, and polyphonic textures of ancient Khmer court orchestras.",
      ensemble: "Ensemble:",
      allEnsembles: "All Ensembles",
      microtonalNote: "Acoustic Web Audio Synthesizer",
      family: "Organology Family",
      playTuning: "Play Tuning",
      resonating: "Resonating...",
      orchestraTitle: "The Sacred Pinpeat Ensemble",
      orchestraDesc: "Recorded on Angkorian bas-reliefs for over a millennium, the Pinpeat orchestra accompanies royal court dances, shadow theater, and monastic ceremonies.",
      openArticle: "Read Dossier",
    },
    search: {
      eyebrow: "Archive Query",
      title: "Search the Heritage Catalog",
      placeholder: "Search by temple name, ruler, era, or keyword...",
      filterPillar: "Category:",
      filterEra: "Era:",
      allCategories: "All Categories",
      allEras: "All Eras",
      resultsMatch: "records match query",
      resetFilters: "Reset Filters",
      noEntriesFound: "No heritage records match your criteria",
      searchHint: "Try searching for Angkor Wat, Bayon, Pinpeat, Jayavarman VII, or Sampot Hol...",
    },
    saved: {
      eyebrow: "Personal Reading List",
      title: "Saved Research Dossiers",
      emptyTitle: "No saved articles yet",
      emptyDesc: "Click the bookmark icon on any encyclopedia article to build your personal offline reading list.",
      exploreArchivePrompt: "Explore the Archive",
      savedCount: "saved dossiers",
      clearAll: "Clear All",
      remove: "Remove",
    },
    scraper: {
      badge: "Ingestion Pipeline",
      title: "Content Ingestion Pipeline",
      desc: "Scholarly crawler pipeline syncing structured heritage dossiers from EFEO, UNESCO, and APSARA Authority data sources.",
      statusReady: "Pipeline Ready",
      statusCrawling: "Crawling academic data sources...",
      statusIngesting: "Validating against EntryDetail schema...",
      statusCompleted: "Ingestion Complete!",
      startIngestion: "Run Ingestion Pipeline",
      resetAll: "Reset to Default Seed Data",
      catalogStatsTitle: "Current Archive Metrics",
      totalArticles: "Total Articles",
      totalCategories: "Pillars Covered",
      verifiedSources: "Academic Citations",
      highResMedia: "Archival Media Assets",
      sampleSourcesTitle: "Configured Scholarly Endpoints",
      activityLogTitle: "Pipeline Activity Stream",
      logWait: "Click 'Run Ingestion Pipeline' above to start...",
      customIngestTitle: "Direct JSON Schema Ingestion",
      customIngestDesc: "Paste a compliant EntryDetail JSON payload to insert custom academic dossiers immediately.",
      ingestButton: "Ingest Entry",
      inputPlaceholder: "Paste valid EntryDetail JSON object here...",
    },
  },
  vi: {
    common: {
      appName: "Bách Khoa Di Sản Khmer",
      tagline: "Bách khoa toàn thư số về Văn minh Khmer",
      archiveNote: "Kho tư liệu nghiên cứu & bảo tồn văn hóa chính thức",
      language: "Ngôn ngữ",
      saved: "Đã lưu",
      search: "Tìm kiếm",
      back: "Quay lại",
      reset: "Đặt lại",
      verified: "Đã xác thực",
      sources: "Nguồn",
      loading: "Đang tải...",
      noResults: "Không tìm thấy kết quả",
      entriesCount: "Mục",
    },
    nav: {
      discover: "Trang chủ",
      categories: "12 Danh mục Di sản",
      search: "Tra cứu tư liệu",
      gallery: "Kho tư liệu hình ảnh",
      map: "Bản đồ Khảo cổ",
      sound: "Âm nhạc & Nhạc cụ",
      saved: "Tư liệu đã lưu",
      scraper: "Đường ống Dữ liệu",
      learn: "Học chữ Khmer",
      dictionary: "Từ điển",
      pronunciation: "Phát âm",
      quiz: "Đố vui Di sản",
      more: "Thêm",
    },
    home: {
      featuredToday: "Kiệt tác Di sản Nổi bật",
      exploreJourney: "Khám phá chuyên khảo",
      pillarsEyebrow: "12 Trụ cột Văn minh",
      pillarsTitle: "Danh mục Di sản Khmer",
      chronologyEyebrow: "Tiến trình Lịch sử",
      chronologyTitle: "Các Thời kỳ Văn minh",
      trailsEyebrow: "Hành trình Khảo cứu",
      trailsTitle: "Tuyến đường Khám phá Di sản",
      stops: "điểm dừng",
      archiveEyebrow: "Mục lục Bách khoa",
      archiveTitle: "Các bài viết chuyên khảo",
      entries: "bài viết",
      viewAllCategories: "Xem tất cả 12 danh mục",
    },
    categoriesView: {
      eyebrow: "Hệ thống Danh mục",
      title: "12 Trụ cột Di sản Văn hóa Khmer",
      subtitle: "Khám phá đền tháp, bi ký cổ, nghệ thuật điêu khắc, âm nhạc cung đình, trang phục lụa và tín ngưỡng dân gian.",
      allCategories: "Tất cả danh mục",
      filterByEra: "Lọc theo thời kỳ",
      entriesAvailable: "Bài viết đã lưu trữ",
      exploreCategory: "Khám phá danh mục",
      noEntriesInCategory: "Chưa có bài viết trong danh mục này.",
    },
    galleryView: {
      eyebrow: "Kho Lưu trữ Hình ảnh",
      title: "Bộ sưu tập Hình ảnh & Hiện vật Di sản",
      subtitle: "Hình ảnh độ phân giải cao về kiến trúc đền tháp, phù điêu sa thạch, nhạc cụ và nghề dệt lụa theo giấy phép mở (CC / EFEO / UNESCO).",
      allMedia: "Tất cả tư liệu",
      filterByCategory: "Lọc theo danh mục",
      licensingNote: "Mọi tư liệu đều có thông tin tác giả, nguồn gốc và liên kết đến bài viết bách khoa tương ứng.",
      viewArticle: "Đọc bài viết chi tiết",
      mediaCount: "tư liệu",
      closeViewer: "Đóng cửa sổ",
    },
    entry: {
      backToArchive: "Quay lại Bách khoa",
      saveEntry: "Lưu bài viết",
      savedInBookmarks: "Đã lưu vào danh mục",
      era: "Thời kỳ",
      category: "Danh mục",
      mediaAssets: "Tư liệu ảnh & âm thanh",
      sources: "Nguồn tài liệu",
      verifiedSources: "trích dẫn học thuật",
      mediaEyebrow: "Kho Tư liệu Hình ảnh",
      mediaTitle: "Hình ảnh & Âm thanh Di sản",
      playSoundscape: "Nghe âm luật cổ",
      soundscapeTitle: "Âm vang Nhạc cụ Truyền thống",
      soundscapeSubtitle: "Mô phỏng âm sắc thang âm cổ Khmer",
      citationsTitle: "Thư mục Tài liệu Tham khảo Học thuật",
      hideCitations: "Ẩn danh mục trích dẫn",
      relatedEyebrow: "Di sản Liên quan",
      relatedTitle: "Các Bài viết & Địa danh Tương quan",
    },
    map: {
      eyebrow: "Bản đồ Khảo cổ",
      title: "Bản đồ Tọa độ Di tích & Đền tháp",
      mappedCount: "Di tích đã được định vị",
      filterEra: "Thời kỳ:",
      allEras: "Tất cả thời kỳ",
      unescoOnly: "Di sản Thế giới UNESCO",
      coordinatesGrid: "Lưới Tọa độ",
      unescoMonument: "Di sản UNESCO",
      clickPinHint: "Nhấn vào biểu tượng ghim để xem thông tin di tích",
      province: "Tỉnh thành",
      style: "Phong cách",
      status: "Tình trạng",
      latitude: "Vĩ độ",
      longitude: "Kinh độ",
      readDossier: "Xem hồ sơ chi tiết",
    },
    sound: {
      eyebrow: "Kho Lưu trữ Âm thanh",
      title: "Nhạc cụ & Âm nhạc Cổ truyền",
      subtitle: "Khám phá cấu trúc phức điệu, thang âm vi âm và nhạc cụ trong các dàn nhạc cung đình Khmer.",
      ensemble: "Dàn nhạc:",
      allEnsembles: "Tất cả dàn nhạc",
      microtonalNote: "Bộ tổng hợp âm thanh Web Audio",
      family: "Phân loại nhạc khí",
      playTuning: "Thử âm luật",
      resonating: "Đang vang âm...",
      orchestraTitle: "Dàn nhạc Nghi lễ Pinpeat",
      orchestraDesc: "Được khắc trên phù điêu Angkor hơn 1.000 năm qua, dàn nhạc Pinpeat luôn tấu lên trong các đại lễ cung đình và nghi thức Phật giáo.",
      openArticle: "Xem bài nghiên cứu",
    },
    search: {
      eyebrow: "Tra cứu Tài liệu",
      title: "Tìm kiếm trong Kho Bách khoa Di sản",
      placeholder: "Tìm kiếm theo tên đền tháp, triều vua, thời kỳ...",
      filterPillar: "Danh mục:",
      filterEra: "Thời kỳ:",
      allCategories: "Tất cả danh mục",
      allEras: "Tất cả thời kỳ",
      resultsMatch: "kết quả phù hợp",
      resetFilters: "Đặt lại bộ lọc",
      noEntriesFound: "Không tìm thấy tài liệu phù hợp với từ khóa",
      searchHint: "Thử tìm kiếm: Angkor Wat, Bayon, Pinpeat, Jayavarman VII, hoặc Sampot Hol...",
    },
    saved: {
      eyebrow: "Tủ sách Nghiên cứu",
      title: "Tài liệu Di sản Đã Lưu",
      emptyTitle: "Chưa có tài liệu nào được lưu",
      emptyDesc: "Nhấn vào biểu tượng dấu trang trên bất kỳ bài viết bách khoa nào để lưu lại danh mục đọc cá nhân.",
      exploreArchivePrompt: "Khám phá Bách khoa",
      savedCount: "bài viết đã lưu",
      clearAll: "Xóa tất cả",
      remove: "Xóa",
    },
    scraper: {
      badge: "Đường ống Dữ liệu",
      title: "Hệ thống Thu thập Dữ liệu Di sản",
      desc: "Hạ tầng đồng bộ tài liệu số chuẩn học thuật từ EFEO, UNESCO và Cơ quan Quốc gia APSARA.",
      statusReady: "Hệ thống sẵn sàng",
      statusCrawling: "Đang quét dữ liệu từ các viện nghiên cứu...",
      statusIngesting: "Đang xác thực cấu trúc EntryDetail schema...",
      statusCompleted: "Nhập dữ liệu thành công!",
      startIngestion: "Chạy đường ống mẫu",
      resetAll: "Khôi phục dữ liệu gốc",
      catalogStatsTitle: "Chỉ số Kho Tư liệu Hiện tại",
      totalArticles: "Tổng số bài viết",
      totalCategories: "Trụ cột bao phủ",
      verifiedSources: "Trích dẫn học thuật",
      highResMedia: "Tư liệu đa phương tiện",
      sampleSourcesTitle: "Các nguồn học thuật đã kết nối",
      activityLogTitle: "Nhật ký tiến trình",
      logWait: "Nhấn nút 'Chạy đường ống mẫu' phía trên để bắt đầu...",
      customIngestTitle: "Nhập trực tiếp qua JSON Schema",
      customIngestDesc: "Dán cấu trúc JSON hợp lệ theo EntryDetail Schema để nhập bài viết mới vào kho lưu trữ ngay lập tức.",
      ingestButton: "Nhập tư liệu",
      inputPlaceholder: "Dán mã JSON EntryDetail tại đây...",
    },
  },
  th: {
    common: {
      appName: "สารานุกรมมรดกเขมร",
      tagline: "สารานุกรมดิจิทัลแห่งอารยธรรมเขมร",
      archiveNote: "หอจดหมายเหตุวิชาการและการอนุรักษ์มรดกวัฒนธรรม",
      language: "ภาษา",
      saved: "บันทึกแล้ว",
      search: "ค้นหา",
      back: "ย้อนกลับ",
      reset: "รีเซ็ต",
      verified: "ตรวจสอบแล้ว",
      sources: "แหล่งอ้างอิง",
      loading: "กำลังโหลด...",
      noResults: "ไม่พบผลลัพธ์",
      entriesCount: "รายการ",
    },
    nav: {
      discover: "หน้าหลัก",
      categories: "12 หมวดหมู่มรดก",
      search: "ค้นหาเอกสาร",
      gallery: "หอศิลป์และภาพถ่าย",
      map: "แผนที่โบราณคดี",
      sound: "ดนตรีและเครื่องดนตรี",
      saved: "รายการที่บันทึก",
      scraper: "ระบบนำเข้าข้อมูล",
      learn: "เรียนภาษาเขมร",
      dictionary: "พจนานุกรม",
      pronunciation: "การออกเสียง",
      quiz: "แบบทดสอบ",
      more: "เพิ่มเติม",
    },
    home: {
      featuredToday: "ผลงานชิ้นเอกประจำวัน",
      exploreJourney: "สำรวจบทความฉบับเต็ม",
      pillarsEyebrow: "12 เสาหลักแห่งอารยธรรม",
      pillarsTitle: "หมวดหมู่มรดกเขมร",
      chronologyEyebrow: "ลำดับเหตุการณ์ทางประวัติศาสตร์",
      chronologyTitle: "ยุคสมัยแห่งอารยธรรม",
      trailsEyebrow: "เส้นทางสำรวจเชิงลึก",
      trailsTitle: "การเดินทางสำรวจมรดก",
      stops: "จุดแวะ",
      archiveEyebrow: "สารบัญสารานุกรม",
      archiveTitle: "บทความมรดกนำร่อง",
      entries: "บทความ",
      viewAllCategories: "ดูครบทั้ง 12 หมวดหมู่",
    },
    categoriesView: {
      eyebrow: "หมวดหมู่มรดก",
      title: "12 เสาหลักแห่งมรดกวัฒนธรรมเขมร",
      subtitle: "สำรวจปราสาทหิน ศิลาจารึก ศิลปกรรม ดนตรีหลวง ภูมิปัญญาผ้าไหม และความเชื่อโบราณตามหมวดหมู่มาตรฐาน",
      allCategories: "ทุกหมวดหมู่",
      filterByEra: "กรองตามยุคสมัย",
      entriesAvailable: "บทความในหมวด",
      exploreCategory: "เข้าชมหมวดหมู่นี้",
      noEntriesInCategory: "ยังไม่มีบทความในหมวดหมู่นี้",
    },
    galleryView: {
      eyebrow: "หอภาพโบราณ",
      title: "คลังภาพถ่ายและโบราณวัตถุ",
      subtitle: "ภาพถ่ายสถาปัตยกรรม ภาพสลักหินทราย เครื่องดนตรี และผ้าไหมมัดหมี่ ภายใต้สัญญาอนุญาตแบบเปิด (CC / EFEO / UNESCO)",
      allMedia: "สื่อทั้งหมด",
      filterByCategory: "กรองตามหมวดหมู่",
      licensingNote: "ข้อมูลสื่อทุกรายการระบุแหล่งที่มา สัญญาอนุญาต และลิงก์ไปยังบทความสารานุกรม",
      viewArticle: "อ่านบทความฉบับเต็ม",
      mediaCount: "ภาพ",
      closeViewer: "ปิดหน้าต่าง",
    },
    entry: {
      backToArchive: "กลับสู่สารานุกรม",
      saveEntry: "บันทึกบทความ",
      savedInBookmarks: "บันทึกในรายการโปรดแล้ว",
      era: "ยุคสมัย",
      category: "หมวดหมู่",
      mediaAssets: "สื่อและภาพประกอบ",
      sources: "เอกสารอ้างอิง",
      verifiedSources: "การอ้างอิงทางวิชาการ",
      mediaEyebrow: "คลังภาพและสื่อ",
      mediaTitle: "ภาพถ่ายและเสียงโบราณ",
      playSoundscape: "ฟังเสียงดนตรีโบราณ",
      soundscapeTitle: "สำเนียงเสียงศักดิ์สิทธิ์",
      soundscapeSubtitle: "จำลองระบบเสียงดนตรีเขมรโบราณ",
      citationsTitle: "บรรณานุกรมและเอกสารอ้างอิงทางวิชาการ",
      hideCitations: "ซ่อนการอ้างอิง",
      relatedEyebrow: "มรดกที่เกี่ยวข้อง",
      relatedTitle: "บทความและสถานที่เชื่อมโยง",
    },
    map: {
      eyebrow: "แผนที่โบราณคดี",
      title: "แผนที่พิกัดโบราณสถานและปราสาท",
      mappedCount: "โบราณสถานที่บันทึกพิกัด",
      filterEra: "ยุคสมัย:",
      allEras: "ทุกยุคสมัย",
      unescoOnly: "มรดกโลกยูเนสโก",
      coordinatesGrid: "พิกัดภูมิศาสตร์",
      unescoMonument: "มรดกโลก",
      clickPinHint: "คลิกที่หมุดเพื่อดูข้อมูลโบราณสถาน",
      province: "จังหวัด",
      style: "รูปแบบศิลปะ",
      status: "สภาพโบราณสถาน",
      latitude: "ละติจูด",
      longitude: "ลองจิจูด",
      readDossier: "อ่านเอกสารฉบับเต็ม",
    },
    sound: {
      eyebrow: "คลังเสียงดนตรีโบราณ",
      title: "ดนตรีและเครื่องดนตรีโบราณ",
      subtitle: "สำรวจระบบเสียงและโครงสร้างวงดนตรีพิณพาทย์ มโหรี และจะเปยดองเวง",
      ensemble: "วงดนตรี:",
      allEnsembles: "ทุกวงดนตรี",
      microtonalNote: "ระบบสังเคราะห์เสียง Web Audio",
      family: "ประเภทเครื่องดนตรี",
      playTuning: "เทียบเสียงดนตรี",
      resonating: "กำลังบรรเลง...",
      orchestraTitle: "วงดนตรีพิณพาทย์ศักดิ์สิทธิ์",
      orchestraDesc: "มีหลักฐานภาพสลักที่นครวัดมากว่า 1,000 ปี บรรเลงในพระราชพิธีหลวงและพิธีกรรมทางศาสนา",
      openArticle: "อ่านบทความวิชาการ",
    },
    search: {
      eyebrow: "ค้นหาข้อมูล",
      title: "ค้นหาในสารานุกรมมรดกเขมร",
      placeholder: "ค้นหาตามชื่อปราสาท กษัตริย์ ยุคสมัย หรือคำสำคัญ...",
      filterPillar: "หมวดหมู่:",
      filterEra: "ยุคสมัย:",
      allCategories: "ทุกหมวดหมู่",
      allEras: "ทุกยุคสมัย",
      resultsMatch: "รายการที่ตรงกับการค้นหา",
      resetFilters: "รีเซ็ตตัวกรอง",
      noEntriesFound: "ไม่พบข้อมูลที่ตรงกับคำค้นหา",
      searchHint: "ลองค้นหา: นครวัด, บายอน, พิณพาทย์, พระเจ้าชัยวรมันที่ 7...",
    },
    saved: {
      eyebrow: "รายการอ่านส่วนตัว",
      title: "บทความวิจัยที่บันทึกไว้",
      emptyTitle: "ยังไม่มีบทความที่บันทึกไว้",
      emptyDesc: "คลิกไอคอนบุ๊กมาร์กบนบทความเพื่อบันทึกไว้อ่านในภายหลัง",
      exploreArchivePrompt: "สำรวจสารานุกรม",
      savedCount: "บทความที่บันทึก",
      clearAll: "ล้างทั้งหมด",
      remove: "ลบ",
    },
    scraper: {
      badge: "ระบบนำเข้าข้อมูล",
      title: "ระบบนำเข้าข้อมูลมรดกวัฒนธรรม",
      desc: "ระบบเชื่อมต่อและจัดเก็บข้อมูลวิชาการจาก EFEO, UNESCO และองค์การอัปสรา",
      statusReady: "ระบบพร้อมทำงาน",
      statusCrawling: "กำลังรวบรวมข้อมูลจากแหล่งอ้างอิง...",
      statusIngesting: "กำลังตรวจสอบความถูกต้องตาม EntryDetail Schema...",
      statusCompleted: "นำเข้าข้อมูลสำเร็จ!",
      startIngestion: "เริ่มการนำเข้าข้อมูลตัวอย่าง",
      resetAll: "รีเซ็ตเป็นข้อมูลเริ่มต้น",
      catalogStatsTitle: "สถิติคลังข้อมูลปัจจุบัน",
      totalArticles: "บทความทั้งหมด",
      totalCategories: "หมวดหมู่หลัก",
      verifiedSources: "การอ้างอิงทางวิชาการ",
      highResMedia: "สื่อภาพความละเอียดสูง",
      sampleSourcesTitle: "แหล่งข้อมูลวิชาการที่เชื่อมต่อ",
      activityLogTitle: "บันทึกการทำงาน",
      logWait: "คลิกปุ่ม 'เริ่มการนำเข้าข้อมูลตัวอย่าง' เพื่อเริ่มต้น...",
      customIngestTitle: "นำเข้าข้อมูลผ่าน JSON Schema",
      customIngestDesc: "วางโค้ด JSON ที่ถูกต้องตาม EntryDetail Schema เพื่อนำเข้าบทความทันที",
      ingestButton: "นำเข้าบทความ",
      inputPlaceholder: "วางโค้ด JSON EntryDetail ที่นี่...",
    },
  },
};
