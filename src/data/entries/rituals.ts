import type { HeritageEntry } from "../../types/schema.ts";
import { createMedia, LOCAL_ASSETS } from "./mediaHelper.ts";

export const ritualsEntries: HeritageEntry[] = [
  // PCHUM BEN ANCESTRAL MERITS FESTIVAL
  {
    id: "e-pchum-ben",
    slug: "pchum-ben",
    category: "rituals",
    categoryId: "rituals",
    title: {
      en: "Pchum Ben (Ancestral Merits Festival & The Bay Ben Rite)",
      km: "ពិធីបុណ្យភ្ជុំបិណ្ឌ និងពិធីបោះបាយបិណ្ឌ",
      vi: "Lễ Hội Pchum Ben (Lễ Vu Lan Khơ-me & Nghi Thức Tung Cơm Bay Ben)",
      th: "เทศกาลสารทเขมร (พจุมเบณฑ์) และพิธีโยนข้าวก้อน",
    },
    summary: {
      en: "The fifteen-day Khmer Buddhist festival of ancestral remembrance in the lunar month of Photrobot, culminating in pre-dawn pagoda circumambulations and the offering of sesame-rice balls to wandering spirits.",
      km: "ពិធីបុណ្យប្រពៃណីព្រះពុទ្ធសាសនាខ្មែររយៈពេល ១៥ ថ្ងៃក្នុងខែភទ្របទ ដើម្បីឧទ្ទិសកុសលដល់បុព្វការីជន និងប្រេតជន តាមរយៈពិធីបោះបាយបិណ្ឌនៅវេលាម៉ោង ៤ ទៀបភ្លឺ។",
      vi: "Đại lễ Phật giáo truyền thống kéo dài 15 ngày trong tháng Bhadrapada âm lịch nhằm tri ân báo hiếu tổ tiên và chuyển phước đức cho các ngạ quỷ lang thang qua nghi thức tung cơm nếp vắt mè (Bay Ben) lúc rạng đông.",
      th: "เทศกาลทางพุทธศาสนาเขมร 15 วันในเดือน 10 เพื่ออุทิศส่วนกุศลให้แก่บรรพบุรุษและดวงวิญญาณเร่ร่อน โดยมีพิธีโยนข้าวก้อนในยามเช้ามืด",
    },
    era: {
      en: "Ancient Khmer Buddhist Tradition (Angkorian Era – Present)",
      km: "ប្រពៃណីពុទ្ធសាសនាបុរាណ ដល់ បច្ចុប្បន្ន",
      vi: "Truyền thống Phật giáo Cổ xưa đến Nay",
      th: "ประเพณีพุทธโบราณ ถึงปัจจุบัน",
    },
    coverMedia: createMedia(
      "m-pb-cover",
      LOCAL_ASSETS.angkorWat,
      "Devotees in Traditional White Silk Attire Carrying Offerings during Pchum Ben",
      "ពុទ្ធបរិស័ទគ្រងសម្លៀកបំពាក់សូត្រសប្រគេនចង្ហាន់បុណ្យភ្ជុំបិណ្ឌ",
      "Khmer Heritage Field Mission",
      "Thiện nam tín nữ trong trang phục áo lụa trắng dâng cơm cúng dường mùa Pchum Ben",
      "พุทธศาสนิกชนแต่งกายชุดขาวนำสำรับภัตตาหารไปทำบุญในเทศกาลพจุมเบณฑ์",
      "Khmer Heritage Field Archive",
      "cc_by_sa",
      "src-khmer-field-mission",
      {
        repository: "Khmer Heritage Ethnographic Archive",
        collection: "Living Buddhist Rituals Survey",
        captureDate: "2024-09-20",
        creditLine: "Khmer Heritage Field Mission (2024)",
      }
    ),
    coordinates: {
      latitude: 11.5564,
      longitude: 104.9282,
    },
    location: {
      coordinates: { latitude: 11.5564, longitude: 104.9282 },
      province: { en: "Nationwide (All Khmer Wats)", km: "ទូទាំងប្រទេសកម្ពុជា", vi: "Toàn quốc", th: "ทั่วประเทศกัมพูชา" },
      country: "Cambodia",
      siteName: { en: "Wat Ounalom & Royal Sanctuary", km: "វត្តឧណ្ណាលោម" },
    },
    keyFacts: {
      era: { en: "Observed annually on 1st–15th waning moon of Photrobot", km: "ខែភទ្របទ (កញ្ញា–តុលា)" },
      religion: { en: "Theravada Buddhism & Indigenous Ancestor Veneration", km: "ព្រះពុទ្ធសាសនាថេរវាទ និងជំនឿដូនតា" },
      tradition: { en: "15 Days of Kan Ben & Final Pchum Ben Day", km: "កាន់បិណ្ឌ ១៤ ថ្ងៃ និងភ្ជុំបិណ្ឌ" },
      material: { en: "Sticky rice, sesame seeds, banana leaves, lotus blossoms, incense", km: "បាយដំណើប ល្ង ស្លឹកចេក ផ្កាឈូក ធូបទៀន" },
    },
    content: {
      sections: [
        {
          id: "sec-pb-bayben",
          heading: {
            en: "The Pre-Dawn Rite of Bos Bay Ben (Tossing Sesame-Rice Balls)",
            km: "ពិធីបោះបាយបិណ្ឌនៅវេលាទៀបភ្លឺ",
            vi: "Nghi Lễ Tung Cơm Bay Ben Trước Bình Minh",
            th: "พิธีโยนข้าวก้อน (บอสบายบิณฑ์) ยามเช้ามืด",
          },
          body: {
            en: "During the 15 days of Kan Ben, devotees rise before daybreak at 4:00 AM and gather at their local pagoda. Holding small portions of cooked sticky rice rolled with toasted black sesame seeds (bay ben), participants walk three times in clockwise circumambulation (pradaksina) around the sacred sima sanctuary. As the monastic sangha chants protective paritta sutras, devotees toss the rice balls onto the temple grounds outside the sanctuary wall, symbolically feeding wandering hungry ghosts (pret) whose karmic burdens prevent them from receiving regular offerings during daylight.",
            km: "ក្នុងអំឡុង ១៥ ថ្ងៃនៃពិធីកាន់បិណ្ឌ ពុទ្ធបរិស័ទក្រោកពីម៉ោង ៤ ទៀបភ្លឺ ដើរប្រទักษិណ ៣ ជុំព្រះវិហារ និងបោះបាយបិណ្ឌលាយល្ងខ្មៅលើដីជុំវិញវត្ត ដើម្បីឧទ្ទិសកុសលដល់ពួកប្រេតដែលស្រេកឃ្លាន។",
            vi: "Suốt 15 ngày lễ Kan Ben, các Phật tử thức dậy từ 4 giờ sáng trước lúc mặt trời mọc tập trung về chùa. Cầm trên tay những vắt cơm nếp dẻo trộn hạt mè đen rang thơm (bay ben), mọi người cùng đi kinh hành ba vòng theo chiều kim đồng hồ quanh chánh điện. Hòa trong tiếng tụng kinh hộ trì của chư Tăng, thiện nam tín nữ tung những vắt cơm ra thảm cỏ quanh khuôn viên chùa để bố thí và xoa dịu nỗi thống khổ cho các ngạ quỷ (linh hồn đói khát) chưa siêu thoát.",
            th: "ในช่วง 15 วันของเทศกาล ผู้คนจะตื่นแต่เช้ามืดเวลาตี 4 มารวมตัวกันที่วัด ถือข้าวก้อนเหนียวคลุกงาดำ (บายบิณฑ์) เดินเวียนประทักษิณรอบพระอุโบสถ 3 รอบ พร้อมทั้งโยนข้าวก้อนลงบนพื้นเพื่อโปรดเปรตและวิญญาณผู้ล่วงลับ",
          },
        },
        {
          id: "sec-pb-merits",
          heading: {
            en: "Seven Generations of Ancestral Merit (Bangsukol Dedicated Transference)",
            km: "ការឧទ្ទិសកុសល ៧ សន្តាន និងពិធីបង្សុកូល",
            vi: "Hồi Hướng Công Đức Bảy Đời Tổ Tiên & Nghi Thức Tụng Kinh Bangsukol",
            th: "การอุทิศส่วนกุศลแก่บรรพบุรุษ 7 ชั่วโคตรและพิธีบังสุกุล",
          },
          body: {
            en: "The theology of Pchum Ben centers on filial piety and the universal transfer of merits (patti-dana). Khmer families prepare elaborate banquets of traditional culinary dishes (amok, num ansom, samlor kako) to offer to the Buddhist monastic sangha. The monks perform the solemn Bangsukol chant over ancestral urns, transferring the merit generated by the living family to relieve the suffering of ancestors across seven ancestral generations.",
            km: "ពិធីបុណ្យភ្ជុំបិណ្ឌផ្តោតលើគុណធម៌កតញ្ញូ។ ក្រុមគ្រួសារខ្មែរធ្វើនំអន្សម និងម្ហូបបុរាណប្រគេនព្រះសង្ឃ។ ព្រះសង្ឃសូត្រធម៌បង្សុកូលឧទ្ទិសបុណ្យកុសលដល់បុព្វការីជន ៧ សន្តាន។",
            vi: "Ý nghĩa cốt lõi của lễ hội Pchum Ben là lòng hiếu kính tổ tiên và giáo lý hồi hướng công đức. Các gia đình chuẩn bị những mâm cỗ truyền thống gồm bánh tét Num Ansom, cá hấp Amok và canh thập cẩm Samlor Kako để cúng dường chư Tăng. Chư Tăng cử hành nghi lễ Bangsukol trang nghiêm trước linh vị tổ tiên, truyền ân phước từ lòng từ tâm của con cháu giúp giải thoát nghiệp báo cho thân bằng quyến thuộc suốt bảy đời.",
            th: "หัวใจของเทศกาลพจุมเบณฑ์คือความกตัญญูกตเวที ครอบครัวจะนำข้าวต้มมัดและอาหารคาวหวานไปถวายภัตตาหารแด่พระสงฆ์ พระสงฆ์จะสวดบังสุกุลอุทิศส่วนกุศลให้แก่บรรพบุรุษ 7 ชั่วรุ่น",
          },
        },
      ],
    },
    gallery: [
      createMedia(
        "m-pb-g1",
        LOCAL_ASSETS.angkorWat,
        "Devotees offering Lotus Blooms and Incense at Pagoda Altar",
        "ការថ្វាយផ្កាឈូក និងធូបទៀនក្នុងព្រះវិហារ",
        "Khmer Heritage Field Mission",
        "Dâng hoa sen và thắp nén tâm hương nơi chánh điện trong mùa Vu Lan Pchum Ben",
        "การถวายดอกบัวและธูปเทียนในพระอุโบสถ",
        "Khmer Heritage Field Archive",
        "cc_by_sa",
        "src-khmer-field-mission"
      ),
    ],
    relatedEntryIds: ["e-amok-trey", "e-silk-hol", "e-chapei-dong-veng", "e-reamker"],
    relatedEntries: ["e-amok-trey", "e-silk-hol", "e-chapei-dong-veng", "e-reamker"],
    sourceIds: ["src-leclere-1916", "src-pou-1992", "src-coedes-1968"],
    citations: [
      {
        id: "c-pb-1",
        title: "Cérémonies des douze mois: Fêtes d'Année Cambodgiennes",
        author: "Adhémard Leclère",
        year: 1916,
        publisher: "Ernest Leroux",
        sourceId: "src-leclere-1916",
        sourceType: "academic_publication",
        reviewStatus: "verified_peer_reviewed",
      },
    ],
    reviewStatus: "verified_peer_reviewed",
    scholarlyReviewer: "Buddhist Institute of Cambodia & National Ethnohistory Committee",
    updatedAt: "2026-08-28T00:00:00.000Z",
  },
];
