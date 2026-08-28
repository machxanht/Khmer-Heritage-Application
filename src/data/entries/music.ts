import type { HeritageEntry } from "../../types/schema.ts";
import { createMedia, LOCAL_ASSETS } from "./mediaHelper.ts";

export const musicEntries: HeritageEntry[] = [
  // 1. PINPEAT ENSEMBLE
  {
    id: "e-pinpeat",
    slug: "pinpeat",
    category: "music",
    categoryId: "music",
    title: {
      en: "The Sacred Pinpeat Court & Ritual Ensemble",
      km: "វង់ភ្លេងពិណពាទ្យ",
      vi: "Dàn Nhạc Lễ Cung Đình & Nghi Lễ Pinpeat",
      th: "วงดนตรีหลวงพิณพาทย์เขมร",
    },
    summary: {
      en: "The grand classical orchestra of Cambodia, performing for royal court rituals, classical dance drama, and Buddhist ceremonies with bronze gongs, bamboo xylophones, and oboes.",
      km: "វង់ភ្លេងព្រះរាជទ្រព្យដ៏ពិសិដ្ឋនៃកម្ពុជា សម្រាប់ប្រគំក្នុងព្រះរាជពិធី របាំបុរាណ និងពិធីសាសនាព្រះពុទ្ធ ដោយមានគងវង់ រនាត និងស្រឡៃ។",
      vi: "Đại dàn nhạc cổ điển cung đình Campuchia, hòa tấu trong các đại lễ hoàng gia, kịch múa cổ điển và nghi lễ Phật giáo với cồng đồng, mộc cầm và kèn Sralai.",
      th: "วงดนตรีหลวงชั้นสูงแห่งราชสำนักกัมพูชา บรรเลงประกอบพระราชพิธี นาฏศิลป์หลวง และพิธีกรรมทางศาสนา ประกอบด้วยฆ้องวง ระนาด และปี่ไสล",
    },
    era: {
      en: "Angkorian Era (7th–9th c.) – Living Tradition",
      km: "សម័យអង្គរ (សតវត្សរ៍ទី ៧–៩) ដល់ បច្ចុប្បន្ន",
      vi: "Thời kỳ Angkor (Thế kỷ 7–9) – Nay",
      th: "ยุคพระนคร ถึงปัจจุบัน",
    },
    coverMedia: createMedia(
      "m-pp-cover",
      LOCAL_ASSETS.instruments,
      "Pinpeat Master Musicians performing on Roneat Ek and Kong Vong",
      "តន្ត្រីករប្រគំភ្លេងពិណពាទ្យជាមួយរនាតឯក និងគងវង់",
      "Khmer Heritage Field Mission",
      "Các nghệ nhân trình tấu đàn Roneat Ek và giàn cồng Kong Vong trong dàn Pinpeat",
      "การบรรเลงวงพิณพาทย์เขมร",
      "Khmer Heritage Field Archive",
      "cc_by_sa",
      "src-khmer-field-mission",
      {
        repository: "National Theatre of Cambodia Ethnomusicology Archive",
        captureDate: "2024-03-02",
        creditLine: "Khmer Heritage Field Mission (2024)",
      }
    ),
    coordinates: {
      latitude: 11.5621,
      longitude: 104.9317,
    },
    location: {
      coordinates: { latitude: 11.5621, longitude: 104.9317 },
      province: { en: "Phnom Penh", km: "រាជធានីភ្នំពេញ", vi: "Phnom Penh", th: "พนมเปญ" },
      country: "Cambodia",
      siteName: { en: "Royal Palace & Chatomuk Theatre", km: "ព្រះបរមរាជវាំង និងសាលចតុម្មុខ" },
    },
    keyFacts: {
      era: { en: "Over 1,200 Years of Documented Continuity", km: "ប្រវត្តិជាង ១២០០ ឆ្នាំ" },
      tradition: { en: "Sacred Royal & Temple Orchestra", km: "វង់ភ្លេងព្រះរាជពិធី និងវត្តអារាម" },
      material: { en: "Bronze Alloys, Bamboo, Teakwood, Snake Skin", km: "សំរឹទ្ធ ឬស្សី ឈើប្រណិត និងស្បែកសត្វ" },
    },
    audioMetadata: {
      tuningHz: [523.25, 587.33, 659.25, 783.99],
      instruments: ["Roneat Ek", "Roneat Thung", "Kong Vong Toch", "Kong Vong Thom", "Sralai", "Sampho", "Chhing"],
    },
    content: {
      sections: [
        {
          id: "sec-pp-polyphony",
          heading: {
            en: "Heterophonic Polyphony & Cyclic Structure",
            km: "រចនាសម្ព័ន្ធភ្លេងពហុសំនៀង និងចង្វាក់ជុំ",
            vi: "Cấu Trúc Phức Điệu Dị Điệu (Heterophony) & Chu Kỳ Nhịp Điệu",
            th: "โครงสร้างดนตรีแบบพหุทำนองและวัฏจักรจังหวะ",
          },
          body: {
            en: "The Pinpeat ensemble operates on the principle of stratified heterophony: a single nuclear melody is simultaneously interpreted, decorated, and syncopated across different registers by various instruments. The Kong Vong Thom (large gong chime) carries the core melodic outline, while the Roneat Ek (high xylophone) performs rapid melodic embellishments at twice or four times the tempo. The sacred Sampho barrel drum commands the tempo and structural cycles, assisted by the brass Chhing finger cymbals marking accented and unaccented beats.",
            km: "វង់ភ្លេងពិណពាទ្យប្រគំតាមលំនាំពហុសំនៀង (Heterophony) ដោយគងវង់ធំដើរតួជាបទគ្រឹះ រនាតឯកដេញក្បាច់សំនៀងរហ័សទ្វេដង ហើយស្គរទ្វេមុខសំភោរជាអ្នកកំណត់ចង្វាក់និងល្បឿនរួមជាមួយឈិង។",
            vi: "Dàn nhạc Pinpeat vận hành theo nguyên lý phức điệu dị điệu (stratified heterophony): một chủ đề giai điệu cốt lõi được nhiều nhạc cụ đồng thời biến tấu và thêu dệt ở các cao độ khác nhau. Giàn cồng lớn Kong Vong Thom giữ khung sườn giai điệu, trong khi đàn mộc cầm Roneat Ek chạy lướt các hoa mỹ âm thanh ở tốc độ gấp đôi hoặc gấp bốn lần. Trống thiêng Sampho lĩnh xướng điều khiển nhịp độ toàn dàn nhạc cùng tiếng gõ thanh thoát của chũm chọe Chhing.",
            th: "วงพิณพาทย์ใช้ระบบโครงสร้างทำนองซ้อน โดยมีฆ้องวงใหญ่เล่นทำนองหลัก ระนาดเอกบรรเลงแปรทำนองอย่างรวดเร็ว และกลองสัมโพเป็นผู้นำจังหวะร่วมกับฉิ่ง",
          },
        },
      ],
    },
    gallery: [
      createMedia(
        "m-pp-g1",
        LOCAL_ASSETS.instruments,
        "Angkorian Stone Bas-Relief of Court Musicians at Bayon Temple",
        "ចម្លាក់តន្ត្រីករសម័យអង្គរនៅប្រាសាទបាយ័ន",
        "EFEO Photographic Archives",
        "Phù điêu đá dàn nhạc cung đình thời Angkor trên vách đền Bayon",
        "ภาพสลักวงดนตรีโบราณบนผนังปราสาทบายอน",
        "EFEO Archives",
        "direct_permission",
        "src-efeo-photo-archive"
      ),
    ],
    relatedEntryIds: ["e-roneat-ek", "e-chapei-dong-veng", "e-apsara", "e-pchum-ben"],
    relatedEntries: ["e-roneat-ek", "e-chapei-dong-veng", "e-apsara", "e-pchum-ben"],
    sourceIds: ["src-sam-1991", "src-miller-williams-2000", "src-unesco-00054"],
    citations: [
      {
        id: "c-pp-1",
        title: "The Pin Peat Ensemble: Its Tuning and Musical Structure",
        author: "Dr. Sam-Ang Sam",
        year: 1991,
        publisher: "Wesleyan University Press",
        sourceId: "src-sam-1991",
        sourceType: "academic_publication",
        reviewStatus: "verified_peer_reviewed",
      },
    ],
    reviewStatus: "verified_peer_reviewed",
    scholarlyReviewer: "Dr. Sam-Ang Sam & Department of Ethnomusicology, RUFA",
    updatedAt: "2026-08-28T00:00:00.000Z",
  },

  // 2. RONEAT EK
  {
    id: "e-roneat-ek",
    slug: "roneat-ek",
    category: "music",
    categoryId: "music",
    title: {
      en: "Roneat Ek (High-Pitched Bamboo Xylophone)",
      km: "រនាតឯក",
      vi: "Đàn Roneat Ek (Mộc Cầm Tre Khơ-me Lĩnh Xướng)",
      th: "ระนาดเอกเขมร",
    },
    summary: {
      en: "The primary melodic leader of the Pinpeat and Mohori orchestras, featuring 21 tuned bamboo or rosewood bars suspended over a boat-shaped resonator producing crystalline acoustic harmonics.",
      km: "ឧបករណ៍ភ្លេងដឹកនាំសំនៀងចម្បងក្នុងវង់ពិណពាទ្យ និងមហោរី មានផ្លែ ២១ ធ្វើពីឬស្សី ឬឈើបេង តម្រៀបលើស្នូករាងទូក បន្លឺសំនៀងស្រួយស្រទន់។",
      vi: "Nhạc cụ lĩnh xướng giai điệu chủ chốt trong dàn nhạc Pinpeat và Mohori, gồm 21 thanh phím bằng tre già hoặc gỗ trắc quý treo trên thùng cộng hưởng hình mũi thuyền uốn lượn.",
      th: "เครื่องดนตรีบรรเลงนำที่มีบทบาทสำคัญที่สุดในวงพิณพาทย์และมโหรี มีลูกระนาด 21 ลูกทำด้วยไม้ไผ่หรือไม้เนื้อแข็ง วางบนรางรูปเรือ",
    },
    era: {
      en: "Classical Angkorian to Modern Era",
      km: "សម័យអង្គរ ដល់ បច្ចុប្បន្ន",
      vi: "Thời kỳ Cổ điển Angkor đến Nay",
      th: "ยุคพระนคร ถึงปัจจุบัน",
    },
    coverMedia: createMedia(
      "m-re-cover",
      LOCAL_ASSETS.instruments,
      "Roneat Ek Bamboo Resonator Soundbox and 21 Tuned Key Bars",
      "ស្នូករនាតឯករាងទូក និងផ្លែរនាត ២១ ផ្លែ",
      "Khmer Heritage Field Mission",
      "Thùng đàn hình thuyền và 21 thanh phím định âm của đàn Roneat Ek",
      "รางระนาดเอกรูปเรือและลูกระนาด 21 ลูก",
      "Khmer Heritage Field Archive",
      "cc_by_sa",
      "src-khmer-field-mission",
      {
        repository: "Khmer Heritage Organology Collection",
        captureDate: "2024-03-02",
        creditLine: "Khmer Heritage Field Mission (2024)",
      }
    ),
    coordinates: {
      latitude: 11.5621,
      longitude: 104.9317,
    },
    location: {
      coordinates: { latitude: 11.5621, longitude: 104.9317 },
      province: { en: "Phnom Penh", km: "រាជធានីភ្នំពេញ", vi: "Phnom Penh", th: "พนมเปญ" },
      country: "Cambodia",
      siteName: { en: "National Museum of Cambodia", km: "សារមន្ទីរជាតិកម្ពុជា" },
    },
    keyFacts: {
      era: { en: "Living Classical Tradition", km: "ប្រពៃណីតន្ត្រីបុរាណរស់រវើក" },
      tradition: { en: "Leading Melodic Instrument (Pinpeat/Mohori)", km: "ឧបករណ៍ដឹកនាំសំនៀង" },
      material: { en: "Mai Phai bamboo / Neang Nuon rosewood, beeswax tuning paste", km: "ឬស្សីព្រៃ ឈើនាងនួន ក្រមួនលាយសំណ" },
    },
    audioMetadata: {
      tuningHz: [523.25, 587.33, 659.25, 783.99],
      acousticNotes: {
        en: "Equitempered heptatonic scale tuning tuned with lead-wax paste underneath each key bar.",
        km: "ការដំឡើងសំនៀង ៧ កម្រិតស្មើគ្នា ដោយប្រើក្រមួនលាយម្សៅសំណបិទពីក្រោមផ្លែ។",
      },
    },
    content: {
      sections: [
        {
          id: "sec-re-organology",
          heading: {
            en: "Organology, Boat-Shaped Soundbox & Acoustic Acoustics",
            km: "កាយវិភាគវិទ្យាឧបករណ៍ ស្នូករាងទូក និងសំនៀងវិទ្យា",
            vi: "Đặc Trưng Khí Cụ Học, Thùng Đàn Hình Thuyền & Âm Học Định Âm",
            th: "ลักษณะทางกายวิภาคศาสตร์ รางรูปเรือ และระบบเสียง",
          },
          body: {
            en: "The Roneat Ek consists of 21 rectangular bars made from aged Mai Phai bamboo or prized rosewood (Dalbergia oliveri). The bars are suspended on two parallel cords across a boat-shaped carved soundbox (snuok) that acts as a natural acoustic amplifier. The master musician plays with two mallets: hard wooden mallets (me-bat reung) for rapid, bright percussive passages in outdoor ceremonies, or padded soft mallets (me-bat tun) for sweet, intimate indoors royal recitals.",
            km: "រនាតឯកមានផ្លែ ២១ ធ្វើពីឬស្សីចាស់ ឬឈើនាងនួន ព្យួរលើខ្សែពីរតាមបណ្តោយស្នូករាងទូក។ អ្នកលេងប្រើមេបាត់ពីរ៖ មេបាត់រឹងសម្រាប់ភ្លេងពិណពាទ្យ និងមេបាត់ទន់សម្រាប់ភ្លេងមហោរី។",
            vi: "Roneat Ek gồm 21 thanh phím hình chữ nhật làm bằng tre rừng già hong khô hoặc gỗ trắc (Neang Nuon). Các thanh phím được xâu trên hai sợi dây song song treo lơ lửng trên thùng đàn uốn cong như một chiếc thuyền độc mộc đóng vai trò hộp cộng hưởng khuếch đại âm sắc. Nghệ nhân dùng hai dùi gõ: dùi bọc sáp cứng cho âm vang giòn giã ngoài trời hoặc dùi bọc nỉ mềm cho tiếng đàn êm dịu thanh nhã trong cung điện.",
            th: "ระนาดเอกประกอบด้วยลูกระนาด 21 ลูกทำจากไม้ไผ่หรือไม้ประดู่ แขวนบนรางรูปเรือที่ช่วยสะท้อนเสียง ใช้ไม้ตีสองชนิดคือ ไม้แข็งสำหรับเสียงดังกระจ่าง และไม้นวมสำหรับเสียงนุ่มนวลไพเราะ",
          },
        },
      ],
    },
    gallery: [
      createMedia(
        "m-re-g1",
        LOCAL_ASSETS.instruments,
        "Master Tuning the Underneath Wax Paste of Roneat Ek Bars",
        "ការដំឡើងសំនៀងផ្លែរនាតដោយបិទក្រមួន",
        "Khmer Heritage Field Mission",
        "Nghệ nhân dán sáp chì định âm dưới mặt phím đàn Roneat Ek",
        "การติดขี้ผึ้งถ่วงเสียงใต้ลูกระนาด",
        "Khmer Heritage Field Archive",
        "cc_by_sa",
        "src-khmer-field-mission"
      ),
    ],
    relatedEntryIds: ["e-pinpeat", "e-chapei-dong-veng", "e-apsara"],
    relatedEntries: ["e-pinpeat", "e-chapei-dong-veng", "e-apsara"],
    sourceIds: ["src-sam-1991", "src-miller-williams-2000", "src-pou-1992"],
    citations: [
      {
        id: "c-re-1",
        title: "The Garland Encyclopedia of World Music: Southeast Asia (Cambodian Instruments)",
        author: "Terry E. Miller & Sean Williams",
        year: 1998,
        publisher: "Routledge",
        sourceId: "src-miller-williams-2000",
        sourceType: "academic_publication",
        reviewStatus: "verified_peer_reviewed",
      },
    ],
    reviewStatus: "verified_peer_reviewed",
    scholarlyReviewer: "Dr. Sam-Ang Sam & National Conservatory of Music",
    updatedAt: "2026-08-28T00:00:00.000Z",
  },

  // 3. CHAPEI DANG VENG
  {
    id: "e-chapei-dong-veng",
    slug: "chapei-dong-veng",
    category: "music",
    categoryId: "music",
    title: {
      en: "Chapei Dang Veng (Khmer Long-Necked Lute & Sung Poetry)",
      km: "ចាប៉ីដងវែង",
      vi: "Đàn Chapei Dang Veng (Đàn Đáy Cần Dài & Hát Thơ Khơ-me)",
      th: "จะเปยดองเวง (พิณคอยาวเขมร)",
    },
    summary: {
      en: "The ancient two-stringed fretted long-necked lute accompanying improvised sung poetry, moral fables, and epic tales; inscribed on UNESCO's Urgent Safeguarding List in 2016.",
      km: "ឧបករណ៍ខ្សែដេញដងវែងបុរាណមានខ្សែពីរ សម្រាប់ដេញបន្ទរចម្រៀងកំណាព្យ អប់រំទូន្មាន និងរឿងនិទាន ចុះបញ្ជីបេតិកភណ្ឌអរូបីត្រូវការការសង្គ្រោះបន្ទាន់របស់ UNESCO ឆ្នាំ ២០១៦។",
      vi: "Cây đàn hai dây cần dài có phím bấm cổ truyền đệm cho những bài thơ ứng tác, chuyện ngụ ngôn đạo lý và trường ca dân gian; được UNESCO ghi danh vào Danh sách Cần bảo vệ Khẩn cấp năm 2016.",
      th: "พิณคอยาวโบราณสองสาย มีเฟรต ใช้บรรเลงประกอบการขับลำนำ กลอนสด และนิทานคติธรรม ได้รับการขึ้นทะเบียนในบัญชีมรดกที่ต้องได้รับการสงวนรักษาอย่างเร่งด่วนของยูเนสโกในปี 2016",
    },
    era: {
      en: "Angkorian Period (7th c. bas-reliefs) – UNESCO Inscribed 2016",
      km: "សម័យអង្គរ ដល់ បច្ចុប្បន្ន (ចុះបញ្ជី UNESCO ឆ្នាំ ២០១៦)",
      vi: "Thời Angkor (thế kỷ 7) – Ghi danh UNESCO 2016",
      th: "ยุคพระนคร ถึงปัจจุบัน (ขึ้นทะเบียนยูเนสโก ค.ศ. 2016)",
    },
    coverMedia: createMedia(
      "m-cdv-cover",
      LOCAL_ASSETS.instruments,
      "Grand Master Kong Nay Performing with the Sacred Chapei Dang Veng Lute",
      "ព្រឹទ្ធាចារ្យ គង់ ណៃ កំពុងដេញចាប៉ីដងវែង",
      "Khmer Heritage Field Mission",
      "Đại nghệ nhân Kong Nay trình tấu cây đàn Chapei Dang Veng huyền thoại",
      "บรมครูกง ไน บรรเลงพิณจะเปยดองเวง",
      "Khmer Heritage Field Archive",
      "cc_by_sa",
      "src-khmer-field-mission",
      {
        repository: "UNESCO Phnom Penh Intangible Cultural Heritage Archive",
        captureDate: "2024-03-05",
        creditLine: "Khmer Heritage Field Mission (2024)",
      }
    ),
    coordinates: {
      latitude: 10.6104,
      longitude: 104.1815,
    },
    location: {
      coordinates: { latitude: 10.6104, longitude: 104.1815 },
      province: { en: "Kampot", km: "កំពត", vi: "Kampot", th: "กัมปอต" },
      country: "Cambodia",
      siteName: { en: "Chapei Master Living Heritage Community", km: "សហគមន៍មរតកចាប៉ីដងវែង" },
    },
    keyFacts: {
      era: { en: "Over 1,300 Years (Depicted at Angkor & Sambor Prei Kuk)", km: "ប្រវត្តិជាង ១៣០០ ឆ្នាំ" },
      tradition: { en: "Ayai Musical Storytelling & Epic Poetry", km: "ចម្រៀងអាយ៉ៃ និងកំណាព្យបុរាណ" },
      unescoStatus: { en: "UNESCO Urgent Safeguarding List (2016, Ref: 01165)", km: "បេតិកភណ្ឌអរូបីសង្គ្រោះបន្ទាន់ (២០១៦)" },
      material: { en: "Kranhung hardwood, Kra-nhok wood soundbox, nylon/silk strings", km: "ឈើក្រញូង ឈើស្រឡៅ ខ្សែសូត្រ" },
    },
    audioMetadata: {
      tuningHz: [146.83, 196.0, 220.0, 293.66],
      acousticNotes: {
        en: "Two-course string tuning (low fundamental D3 - high fourth G3) allowing melodic slides along the 12 raised wooden frets.",
        km: "ការដំឡើងខ្សែពីរបន្ទរគ្នាជាមួយខ្ទង់ឈើ ១២ ខ្ទង់ អនុញ្ញាតឲ្យរំអិលម្រាមដៃយ៉ាងរលូន។",
      },
    },
    content: {
      sections: [
        {
          id: "sec-cdv-storytelling",
          heading: {
            en: "The Bardic Tradition of Improvised Satire, Wisdom & History",
            km: "ប្រពៃណីចម្រៀងកាព្យឃ្លោង អប់រំទូន្មាន និងកំប្លែងស្ងួត",
            vi: "Truyền Thống Hát Kể Sử Thi, Ứng Khẩu Thơ Ca & Triết Lý Dân Gian",
            th: "ประเพณีการขับลำนำสด นิทานคติธรรม และวรรณกรรมมุขปาฐะ",
          },
          body: {
            en: "The Chapei Dang Veng is inseparable from the art of improvised spoken and sung poetry. A master bard (Lok Kru Chapei) performs solo, plucking the strings with a horn plectrum while delivering rapid rhyming verses addressing moral ethics, Buddhist dharma, social commentary, historical chronicles, and humorous banter. The instrument's long neck (often over 1.5 meters) features 12 raised frets glued with natural resin, allowing the performer to produce expressive microtonal vocal inflections.",
            km: "ចាប៉ីដងវែងមិនអាចកាត់ផ្តាច់ពីសិល្បៈតែងកំណាព្យភ្លាមៗនោះទេ។ ព្រឹទ្ធាចារ្យចាប៉ីដេញខ្សែបណ្តើរ ច្រៀងរៀបរាប់ពីធម៌វិន័យ សីលធម៌សង្គម ប្រវត្តិសាស្ត្រ និងរឿងកំប្លែងប្រកបដោយប្រាជ្ញាឈ្លាសវៃ។ ដងវែងជាង ១,៥ ម៉ែត្រមានខ្ទង់ ១២ ជួយបង្កើតសំនៀងរំអិលតាមសំឡេងច្រៀង។",
            vi: "Đàn Chapei Dang Veng gắn liền mật thiết với nghệ thuật hát thơ ứng tác độc tấu. Đại nghệ nhân Chapei vừa gảy những khúc dạo biến tấu bằng phím sừng trâu, vừa xuất khẩu thành thơ bằng các thể thơ truyền thống kể về Phật pháp, đạo lý làm người, thế sự nhân gian và cả những khúc cười trào lộng sâu sắc. Cần đàn dài hơn 1,5 mét với 12 phím bấm dán bằng sáp cây rừng cho phép vuốt những cao độ vi mô trùng khớp với thanh điệu tiếng nói Khmer.",
            th: "จะเปยดองเวงผูกพันอย่างยิ่งกับการขับกลอนสด บรมครูผู้เล่นจะดีดพิณพร้อมขับขานบทกวีสอนใจ ธรรมะ ประวัติศาสตร์ และเรื่องตลกขบขัน คอพิณที่ยาวกว่า 1.5 เมตรมี 12 เฟรต ช่วยให้เอื้อนเสียงตามสำเนียงพูดได้อย่างไพเราะจับใจ",
          },
        },
      ],
    },
    gallery: [
      createMedia(
        "m-cdv-g1",
        LOCAL_ASSETS.instruments,
        "Angkorian Relief of Lute Player at Sambor Prei Kuk (7th Century CE)",
        "ចម្លាក់អ្នកដេញពិណសម័យសំបូរព្រៃគុក (សតវត្សរ៍ទី ៧)",
        "EFEO Photographic Archives",
        "Phù điêu nghệ sĩ gảy đàn cần dài thế kỷ thứ 7 tại Sambor Prei Kuk",
        "ภาพสลักนักดนตรีดีดพิณคอยาวศตวรรษที่ 7",
        "EFEO Archives",
        "direct_permission",
        "src-efeo-photo-archive"
      ),
    ],
    relatedEntryIds: ["e-pinpeat", "e-roneat-ek", "e-reamker", "e-pchum-ben"],
    relatedEntries: ["e-pinpeat", "e-roneat-ek", "e-reamker", "e-pchum-ben"],
    sourceIds: ["src-unesco-01165", "src-miller-williams-2000", "src-sam-1991"],
    citations: [
      {
        id: "c-cdv-1",
        title: "Chapei Dang Veng (Inscribed 2016 on the List of Intangible Cultural Heritage in Need of Urgent Safeguarding)",
        author: "UNESCO Intangible Cultural Heritage Section",
        year: 2016,
        institution: "UNESCO",
        url: "https://ich.unesco.org/en/USL/chapei-dang-veng-01165",
        sourceId: "src-unesco-01165",
        sourceType: "unesco_institutional",
        reviewStatus: "institutional_certified",
      },
    ],
    reviewStatus: "verified_peer_reviewed",
    scholarlyReviewer: "Cambodian Living Arts & UNESCO Intangible Cultural Heritage Committee",
    updatedAt: "2026-08-28T00:00:00.000Z",
  },
];
