import type { HeritageEntry } from "../../types/schema.ts";
import { createMedia, LOCAL_ASSETS } from "./mediaHelper.ts";

export const scriptEntries: HeritageEntry[] = [
  // STELE OF SDOK KOK THOM (INSCRIPTION K.235)
  {
    id: "e-sdok-kok-thom",
    slug: "sdok-kok-thom",
    category: "script",
    categoryId: "script",
    title: {
      en: "Stele of Sdok Kok Thom (Inscription K.235)",
      km: "សិលាចារឹកស្ដុកកក់ធំ (K.235)",
      vi: "Bia Đá Sdok Kok Thom (Văn Bia K.235)",
      th: "ศิลาจารึกสด๊กก๊อกธม (จารึก K.235)",
    },
    summary: {
      en: "The Rosetta Stone of Angkorian history, inscribed in 1052 CE in Sanskrit and Old Khmer, recording 250 years of royal dynastic succession and the founding of the sacred Devaraja cult.",
      km: "សិលាចារឹកគន្លឹះនៃប្រវត្តិសាស្ត្រអង្គរ ចារក្នុងឆ្នាំ ១០៥២ ជាភាសាសំស្ក្រឹត និងភាសាខ្មែរបុរាណ កត់ត្រារាជពង្សាវតារ ២៥០ ឆ្នាំ និងការបង្កើតលទ្ធិទេវរាជ។",
      vi: "Được mệnh danh là 'Hòn đá Rosetta' của lịch sử Khmer Angkor, khắc năm 1052 CN bằng chữ Phạn và tiếng Khơ-me cổ, ghi lại 250 năm truyền thừa vương triều và sự khai sinh tín ngưỡng Thần Vương.",
      th: "ศิลาจารึกหลักสำคัญที่สุดของประวัติศาสตร์พระนคร จารึกขึ้นในปี ค.ศ. 1052 ด้วยภาษาสันสกฤตและภาษาเขมรโบราณ บันทึกลำดับกษัตริย์ 250 ปีและการสถาปนาลัทธิเทวราชา",
    },
    era: {
      en: "11th Century CE (February 8, 1052 CE)",
      km: "សតវត្សរ៍ទី ១១ នៃ គ.ស. (៨ កុម្ភៈ ឆ្នាំ ១០៥២)",
      vi: "Thế kỷ 11 CN (Khắc ngày 8 tháng 2 năm 1052 CN)",
      th: "ศตวรรษที่ 11 (8 กุมภาพันธ์ ค.ศ. 1052)",
    },
    coverMedia: createMedia(
      "m-skt-cover",
      LOCAL_ASSETS.bayon,
      "The Four-Sided Inscribed Grey Sandstone Stele of Sdok Kok Thom (K.235)",
      "សិលាចារឹកស្ដុកកក់ធំ ៤ ជ្រុង ធ្វើពីថ្មភក់ពណ៌ប្រផេះ",
      "Khmer Heritage Field Mission",
      "Bia đá bốn mặt Sdok Kok Thom bằng sa thạch xám khắc chữ Phạn và Khơ-me cổ",
      "ศิลาจารึก 4 ด้านสด๊กก๊อกธม",
      "Khmer Heritage Field Archive",
      "cc_by_sa",
      "src-khmer-field-mission",
      {
        repository: "National Museum of Bangkok / EFEO Epigraphy Archive",
        accessionNumber: "K.235 / SKT-1052",
        captureDate: "2024-02-25",
        creditLine: "Khmer Heritage Epigraphy Project (2024)",
      }
    ),
    coordinates: {
      latitude: 13.8406,
      longitude: 102.7389,
    },
    location: {
      coordinates: { latitude: 13.8406, longitude: 102.7389 },
      province: { en: "Banteay Meanchey / Sa Kaeo border", km: "បន្ទាយមានជ័យ", vi: "Banteay Meanchey", th: "สระแก้ว" },
      country: "Cambodia",
      siteName: { en: "Prasat Sdok Kok Thom", km: "ប្រាសាទស្ដុកកក់ធំ" },
    },
    keyFacts: {
      era: { en: "Inscribed in 1052 CE under King Udayadityavarman II", km: "ឆ្នាំ ១០៥២ ក្នុងរជ្ជកាលព្រះបាទឧទយាទិត្យវរ្ម័នទី ២" },
      author: { en: "Brahmin High Priest Sadasiva (Jayendrapandita)", km: "ព្រាហ្មណ៍សទាសិវ (ជយេន្ទ្របណ្ឌិត)" },
      ruler: { en: "Chronicles 12 Kings from Jayavarman II to Udayadityavarman II", km: "កត់ត្រាស្តេច ១២ ព្រះអង្គ (៨០២–១០៥២)" },
      religion: { en: "Shaivism & Sacred Royal Devaraja Lineage", km: "ព្រហ្មញ្ញសាសនា (និកាយសិវៈ និងលទ្ធិទេវរាជ)" },
      material: { en: "Fine Grey Sandstone monolith (340 lines of epigraphy)", km: "ថ្មភក់ប្រផេះ កម្ពស់ ១,៥១ ម៉ែត្រ (៣៤០ បន្ទាត់)" },
    },
    content: {
      sections: [
        {
          id: "sec-skt-rosetta",
          heading: {
            en: "The Chronological Backbone of Angkorian Historiography",
            km: "ឆ្អឹងខ្នងកាលប្បវត្តិវិទ្យានៃប្រវត្តិសាស្ត្រចក្រភពអង្គរ",
            vi: "Xương Sống Niên Đại Học Của Toàn Bộ Lịch Sử Angkor",
            th: "แกนหลักทางลำดับเวลาของประวัติศาสตร์จักรวรรดิเขมร",
          },
          body: {
            en: "Inscription K.235 is the single most valuable written historical document of the Khmer civilization. Carved with 340 lines across four facets of a 1.51-meter sandstone monolith, the text comprises 218 Sanskrit stanzas in elegant poetic meters and 122 lines of Old Khmer prose. Erected by the high priest Sadasiva (titled Jayendrapandita), it meticulously chronicles two and a half centuries of royal genealogies, foundation dates, and architectural commissions from the founding king Jayavarman II in 802 CE to Udayadityavarman II in 1052 CE.",
            km: "សិលាចារឹក K.235 ជាឯកសារប្រវត្តិសាស្ត្រដ៏មានតម្លៃបំផុតនៃអរិយធម៌ខ្មែរ។ មាន ៣៤០ បន្ទាត់លើ ៤ ជ្រុងថ្ម (សំស្ក្រឹត ២១៨ កាព្យ និងខ្មែរបុរាណ ១២២ បន្ទាត់) ចារដោយព្រាហ្មណ៍សទាសិវ កត់ត្រាកាលប្បវត្តិស្តេច ១២ ព្រះអង្គពីឆ្នាំ ៨០២ ដល់ ១០៥២។",
            vi: "Văn bia K.235 là văn bản lịch sử có giá trị khoa học tối thượng của nền văn minh Khmer. Gồm 340 dòng chữ khắc trên bốn mặt của khối sa thạch cao 1,51 mét, kết hợp giữa 218 khổ thơ tiếng Phạn tuyệt tác và 122 dòng văn xuôi tiếng Khơ-me cổ. Được khắc bởi đại đạo sĩ Sadasiva, bia đá ghi chép tường tận phả hệ 12 đời hoàng đế, các mốc thời gian xây dựng kinh đô và công trình tôn giáo suốt hai thế kỷ rưỡi từ vua Jayavarman II (802 CN) đến vua Udayadityavarman II (1052 CN).",
            th: "จารึก K.235 เป็นเอกสารประวัติศาสตร์ที่ทรงคุณค่าที่สุดของอารยธรรมเขมร มี 340 บรรทัดบนหิน 4 ด้าน บันทึกพระราชพงศาวดารกษัตริย์ 12 พระองค์ตั้งแต่พระเจ้าชัยวรมันที่ 2 ถึงพระเจ้าอุทัยทิตยวรมันที่ 2 อย่างละเอียดและแม่นยำ",
          },
        },
        {
          id: "sec-skt-devaraja",
          heading: {
            en: "The Epigraphic Record of the 802 CE Devaraja Ritual on Phnom Kulen",
            km: "កំណត់ត្រាសិលាចារឹកអំពីពិធីទេវរាជឆ្នាំ ៨០២ លើភ្នំគូលេន",
            vi: "Ghi Chép Văn Bia Về Đại Lễ Thần Vương Năm 802 CN Tại Phnom Kulen",
            th: "บันทึกจารึกเกี่ยวกับพิธีเทวราชา ค.ศ. 802 บนพนมกุเลน",
          },
          body: {
            en: "Without Inscription K.235, modern historians would know almost nothing about the ritual foundation of Angkor. The inscription explicitly narrates how Jayavarman II arrived from Java, established his capital on Mahendraparvata (Phnom Kulen), and summoned the Brahmin Hiranyadama to perform a sacred Shaivite rite based on four tantric texts (Vinasikha, Nayottara, Sammoha, Sirascheda). This rite established the 'Kamraten Jagat ta Raja' (Lord of the Universe who is King) and ensured that the Khmer kingdom would never again be subject to foreign domination.",
            km: "សិលាចារឹកនេះរៀបរាប់យ៉ាងច្បាស់ពីពិធីដែលព្រះបាទជ័យវរ្ម័នទី ២ បានយាងមកតាំងរាជធានីលើភ្នំគូលេន និងបានអញ្ជើញព្រាហ្មណ៍ហិរណ្យទាមមកប្រារព្ធពិធីទេវរាជ ដើម្បីឲ្យប្រទេសកម្ពុជាមានឯករាជ្យបរិបូណ៌ និងមិនចំណុះឲ្យបរទេសឡើយ។",
            vi: "Nếu không có văn bia K.235, giới sử học đương đại sẽ không thể biết về sự kiện khai sinh Angkor. Văn bia miêu tả rõ nét việc vua Jayavarman II đến đóng đô trên núi Mahendraparvata (Phnom Kulen) và mời cao tăng Hiranyadama cử hành đại lễ Mật tông dựa trên bốn bộ kinh Vệ Đà để thiết lập danh hiệu 'Kamraten Jagat ta Raja' (Thần Vương tối cao), khẳng định quyền tự chủ độc lập muôn đời của xứ sở Kambuja.",
            th: "หากไม่มีจารึกหลักนี้ นักประวัติศาสตร์จะไม่ทราบเรื่องการสถาปนาเมืองพระนคร จารึกเล่าว่าพระเจ้าชัยวรมันที่ 2 ประกอบพิธีเทวราชาบนเขามเหนทรบรรพต เพื่อมิให้แผ่นดินเขมรต้องตกเป็นเมืองขึ้นของดินแดนอื่นอีกต่อไป",
          },
        },
      ],
    },
    gallery: [
      createMedia(
        "m-skt-g1",
        LOCAL_ASSETS.bayon,
        "High-Resolution Squeeze of Sanskrit & Old Khmer Inscription Lines (K.235)",
        "ផ្ទាំងចម្លាក់អក្សរសំស្ក្រឹត និងខ្មែរបុរាណលើសិលាចារឹក K.235",
        "EFEO Epigraphy Archives",
        "Bản dập văn bia chữ Phạn và Khơ-me cổ của Viện Viễn Đông Bác Cổ",
        "ภาพถ่ายสำเนาจารึกอักษรเขมรโบราณ",
        "EFEO Archives",
        "direct_permission",
        "src-efeo-photo-archive"
      ),
    ],
    relatedEntryIds: ["e-phnom-kulen", "e-angkor-wat", "e-bayon", "e-jayavarman-vii"],
    relatedEntries: ["e-phnom-kulen", "e-angkor-wat", "e-bayon", "e-jayavarman-vii"],
    sourceIds: ["src-coedes-dupont-1943", "src-coedes-1937", "src-pou-1992", "src-coedes-1968"],
    citations: [
      {
        id: "c-skt-1",
        title: "Les stèles de Sdok Kok Thom, Phnom Sandak et Prah Vihar",
        author: "George Cœdès & Pierre Dupont",
        year: 1943,
        publisher: "BEFEO Tome 43",
        sourceId: "src-coedes-dupont-1943",
        sourceType: "academic_publication",
        reviewStatus: "verified_peer_reviewed",
      },
      {
        id: "c-skt-2",
        title: "Inscriptions du Cambodge (Vol. I-VIII)",
        author: "George Cœdès",
        year: 1937,
        publisher: "EFEO / E. de Boccard",
        sourceId: "src-coedes-1937",
        sourceType: "academic_publication",
        reviewStatus: "verified_peer_reviewed",
      },
    ],
    reviewStatus: "verified_peer_reviewed",
    scholarlyReviewer: "George Cœdès & EFEO Epigraphy Working Group",
    updatedAt: "2026-08-28T00:00:00.000Z",
  },
];
