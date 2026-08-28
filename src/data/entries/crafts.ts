import type { HeritageEntry } from "../../types/schema.ts";
import { createMedia, LOCAL_ASSETS } from "./mediaHelper.ts";

export const craftsEntries: HeritageEntry[] = [
  // KRAMA WEAVING & ARTISAN CULTURE (UNESCO ICH 2024)
  {
    id: "e-krama",
    slug: "krama",
    category: "crafts",
    categoryId: "crafts",
    title: {
      en: "Krama Weaving & Artisan Heritage",
      km: "សិល្បៈតម្បាញក្រមាខ្មែរ",
      vi: "Nghệ Thuật Dệt Khăn Rằn Krama Khơ-me",
      th: "ศิลปะการทอผ้าขาวม้าเขมร (กรอมา)",
    },
    summary: {
      en: "The ubiquitous checkered textile symbol of Cambodian identity, handwoven on domestic frame looms and inscribed in 2024 on the UNESCO Representative List of the Intangible Cultural Heritage of Humanity.",
      km: "វាយនភណ្ឌក្រឡាការ៉ូដែលជាអត្តសញ្ញាណជាតិខ្មែរ ត្បាញដោយដៃលើកីតម្បាញឈើ និងចុះបញ្ជីបេតិកភណ្ឌអរូបីនៃមនុស្សជាតិ UNESCO ក្នុងឆ្នាំ ២០២៤។",
      vi: "Chiếc khăn rằn dệt hoa văn ca-rô biểu tượng bất hủ của bản sắc văn hóa Campuchia, dệt thủ công trên khung cửi gỗ gia đình và được UNESCO ghi danh Di sản Văn hóa Phi vật thể của Nhân loại năm 2024.",
      th: "ผ้าทอลายตารางอันเป็นสัญลักษณ์แห่งเอกลักษณ์ของชาวกัมพูชา ทอด้วยกี่กระตุกไม้แบบดั้งเดิม ได้รับการขึ้นทะเบียนเป็นมรดกทางวัฒนธรรมที่จับต้องไม่ได้ของยูเนสโกในปี ค.ศ. 2024",
    },
    era: {
      en: "Angkorian Era (1st Millennium CE) – UNESCO Inscribed 2024",
      km: "សម័យអង្គរ ដល់ បច្ចុប្បន្ន (ចុះបញ្ជី UNESCO ឆ្នាំ ២០២៤)",
      vi: "Thời Angkor đến Nay (Ghi danh UNESCO 2024)",
      th: "ยุคพระนคร ถึงปัจจุบัน (ขึ้นทะเบียนยูเนสโก ค.ศ. 2024)",
    },
    coverMedia: createMedia(
      "m-km-cover",
      LOCAL_ASSETS.silk,
      "Traditional Red and White Cotton Checkered Krama Cloth",
      "ក្រមាខ្មែរក្រឡាការ៉ូពណ៌ក្រហមសប្រពៃណី",
      "Khmer Heritage Field Mission",
      "Chiếc khăn rằn Krama sọc đỏ trắng truyền thống dệt từ sợi bông tự nhiên",
      "ผ้าขาวม้ากรอมาลายตารางสีแดงสลับขาว",
      "Khmer Heritage Field Archive",
      "cc_by_sa",
      "src-khmer-field-mission",
      {
        repository: "UNESCO Phnom Penh Intangible Cultural Heritage Section",
        collection: "National Inventory of Intangible Cultural Heritage",
        captureDate: "2024-03-12",
        creditLine: "Khmer Heritage Field Mission (2024)",
      }
    ),
    coordinates: {
      latitude: 11.5234,
      longitude: 105.0112,
    },
    location: {
      coordinates: { latitude: 11.5234, longitude: 105.0112 },
      province: { en: "Kandal & Banteay Meanchey", km: "ខេត្តកណ្តាល និងបន្ទាយមានជ័យ", vi: "Kandal & Banteay Meanchey", th: "กันดาลและบันทายมีชัย" },
      country: "Cambodia",
      siteName: { en: "Koh Dach (Silk Island) & Phnom Srok", km: "កោះដាច់ និងស្រុកភ្នំស្រុក" },
    },
    keyFacts: {
      era: { en: "Over 1,000 Years (Depicted on 12th-century Angkorian bas-reliefs)", km: "ប្រវត្តិជាង ១០០០ ឆ្នាំ" },
      tradition: { en: "Community Domestic Loom Weaving", km: "សិល្បៈតម្បាញប្រជាប្រិយតាមគេហដ្ឋាន" },
      unescoStatus: { en: "UNESCO Representative List (2024, Ref: 02114)", km: "បេតិកភណ្ឌអរូបីពិភពលោក (២០២៤)" },
      material: { en: "Natural cotton, raw silk, natural & synthetic dyes", km: "កប្បាស សរសៃសូត្រ ល័ក្តពណ៌" },
    },
    content: {
      sections: [
        {
          id: "sec-km-versatility",
          heading: {
            en: "Over 60 Functional Uses & Community Social Transmission",
            km: "មុខងារប្រើប្រាស់ជាង ៦០ យ៉ាង និងការបន្តវេនក្នុងសហគមន៍",
            vi: "Hơn 60 Công Dụng Đa Năng & Sự Trao Truyền Trong Cộng Đồng",
            th: "ประโยชน์ใช้สอยกว่า 60 ประการและการสืบทอดในชุมชน",
          },
          body: {
            en: "The Krama is far more than a scarf; it is the universal multi-tool of Cambodian rural life. Anthropologists have documented over sixty distinct functional and cultural uses: from a protective sun turban, neck scarf, and bath sarong to a baby hammock cradle, grocery sack, martial arts training sash (Bokator belt), and ceremonial gift presented to elders at Khmer New Year. Woven beneath elevated stilt houses by mothers and daughters, the craft fosters matrilineal community solidarity and economic resilience.",
            km: "ក្រមាមានមុខងារប្រើប្រាស់ជាង ៦០ យ៉ាងក្នុងជីវភាពប្រជាជនខ្មែរ៖ ជាកន្សែងរុំក្បាល បាំងថ្ងៃ ងូតទឹក អង្រឹងបំពេកូន កាបូបយួរ ខ្សែក្រវាត់ល្បុក្កតោ និងជាកាដូថ្វាយដូនតាក្នុងពិធីបុណ្យចូលឆ្នាំ។ ការត្បាញក្រមាជួយលើកកម្ពស់សេដ្ឋកិច្ចស្ត្រីនៅជនបទ។",
            vi: "Khăn Krama không đơn thuần là một chiếc khăn quàng mà là vật dụng toàn năng gắn bó máu thịt với đời sống thôn quê Campuchia. Các nhà nhân học đã ghi nhận hơn 60 công dụng độc đáo: từ khăn trùm đầu che nắng, quàng cổ giữ ấm, khăn tắm sarong, võng ru trẻ sơ sinh, túi xách đi chợ, đai thắt trong võ cổ truyền Bokator đến món quà trang trọng dâng biếu cha mẹ trong dịp Tết Chol Chnam Thmay. Nghề dệt khăn dưới bóng nhà sàn được truyền nối từ mẹ sang con gái qua nhiều thế hệ.",
            th: "ผ้ากรอมามีประโยชน์ใช้สอยมากกว่า 60 อย่างในวิถีชีวิตชาวเขมร เช่น เป็นผ้าโพกศีรษะกันแดด ผ้าพันคอ ผ้านุ่งอาบน้ำ เปลไกวเด็ก ถุงย่าม สายคาดเอววิชาโบกะตอร์ และของขวัญแด่ผู้ใหญ่ในวันสงกรานต์ การทอผ้าใต้ถุนบ้านช่วยสร้างความผูกพันและรายได้แก่สตรีในชนบท",
          },
        },
      ],
    },
    gallery: [
      createMedia(
        "m-km-g1",
        LOCAL_ASSETS.silk,
        "Weaver Operating Traditional Shuttle Loom in Koh Dach Island, Mekong River",
        "អ្នកតម្បាញកំពុងត្បាញក្រមាលើកោះដាច់តាមដងទន្លេមេគង្គ",
        "Khmer Heritage Field Mission",
        "Nghệ nhân thoăn thoắt đưa thoi dệt khăn Krama trên cồn Koh Dach ven sông Mê Kông",
        "ช่างทอกำลังพุ่งกระสวยทอผ้ากรอมา",
        "Khmer Heritage Field Archive",
        "cc_by_sa",
        "src-khmer-field-mission"
      ),
    ],
    relatedEntryIds: ["e-silk-hol", "e-amok-trey", "e-pchum-ben"],
    relatedEntries: ["e-silk-hol", "e-amok-trey", "e-pchum-ben"],
    sourceIds: ["src-unesco-krama-2024", "src-green-2003", "src-pou-1992"],
    citations: [
      {
        id: "c-km-1",
        title: "Traditional weaving of Krama in Cambodia (Nomination File No. 02114)",
        author: "UNESCO Intangible Cultural Heritage Committee",
        year: 2024,
        institution: "UNESCO",
        url: "https://ich.unesco.org/en/RL/traditional-weaving-of-krama-in-cambodia-02114",
        sourceId: "src-unesco-krama-2024",
        sourceType: "unesco_institutional",
        reviewStatus: "institutional_certified",
      },
    ],
    reviewStatus: "verified_peer_reviewed",
    scholarlyReviewer: "UNESCO Intangible Cultural Heritage Committee & Ministry of Culture",
    updatedAt: "2026-08-28T00:00:00.000Z",
  },
];
