import type { HeritageEntry } from "../../types/schema.ts";
import { createMedia, LOCAL_ASSETS } from "./mediaHelper.ts";

export const landmarksEntries: HeritageEntry[] = [
  // ANGKOR THOM ROYAL CITY & MONUMENTAL GATES
  {
    id: "e-angkor-thom",
    slug: "angkor-thom",
    category: "landmarks",
    categoryId: "landmarks",
    title: {
      en: "Angkor Thom (The Great Royal City)",
      km: "មហានគរ (ក្រុងអង្គរធំ)",
      vi: "Đại Kinh Thành Angkor Thom",
      th: "นครธม (มหาพระนคร)",
    },
    summary: {
      en: "The fortified 9-square-kilometer imperial capital founded by King Jayavarman VII in the late 12th century, accessed across giant causeways depicting the Churning of the Ocean of Milk.",
      km: "រាជធានីបន្ទាយដ៏ធំសម្បើមទំហំ ៩ គីឡូម៉ែត្រការ៉េ ស្ថាបនាដោយព្រះបាទជ័យវរ្ម័នទី ៧ នៅចុងសតវត្សរ៍ទី ១២ ដែលមានស្ពានយក្សនិងទេវតាទាញព្រះភុជង្គនាគឆ្លងកសិណទឹក។",
      vi: "Kinh đô kiên cố rộng 9 km² do vua Jayavarman VII xây dựng vào cuối thế kỷ 12, dẫn lối bằng các cây cầu đá khổng lồ tạc cảnh các vị thần Deva và Dạ xoa kéo rắn thần Naga.",
      th: "เมืองหลวงรูปสี่เหลี่ยมจัตุรัสขนาด 9 ตารางกิโลเมตร สร้างโดยพระเจ้าชัยวรมันที่ 7 ในปลายศตวรรษที่ 12 มีสะพานหินสลักเทวดาและอสูรกวนเกษียรสมุทรข้ามคูเมือง",
    },
    era: {
      en: "Late 12th Century CE (c. 1181–1218 CE)",
      km: "ចុងសតវត្សរ៍ទី ១២ នៃ គ.ស.",
      vi: "Cuối thế kỷ 12 CN (khoảng 1181–1218 CN)",
      th: "ปลายศตวรรษที่ 12",
    },
    coverMedia: createMedia(
      "m-at-city-cover",
      LOCAL_ASSETS.bayon,
      "Angkor Thom South Gate Tower and Bridge of Gods and Demons",
      "ខ្លោងទ្វារខាងត្បូងក្រុងអង្គរធំ និងស្ពានទេវតាយក្សទាញនាគ",
      "Khmer Heritage Field Mission",
      "Cổng Nam Angkor Thom với tháp bốn mặt và hàng tượng Thần - Quỷ kéo rắn thần Naga",
      "ซุ้มประตูด้านทิศใต้ของนครธมและสะพานเทวดาอสูรฉุดพญานาค",
      "Khmer Heritage Field Archive",
      "cc_by_sa",
      "src-khmer-field-mission",
      {
        repository: "Khmer Heritage Urban Survey Repository",
        collection: "Angkor Thom Defensive Perimeter Documentation",
        captureDate: "2024-02-20",
        creditLine: "Khmer Heritage Field Mission (2024)",
      }
    ),
    coordinates: {
      latitude: 13.4413,
      longitude: 103.8586,
    },
    location: {
      coordinates: { latitude: 13.4413, longitude: 103.8586 },
      province: { en: "Siem Reap", km: "សៀមរាប", vi: "Siem Reap", th: "เสียมราฐ" },
      country: "Cambodia",
      siteName: { en: "Angkor Archaeological Park", km: "រមណីយដ្ឋានអង្គរ" },
    },
    keyFacts: {
      era: { en: "c. 1181–1218 CE", km: "គ.ស. ១១៨១–១២១៨" },
      builder: { en: "King Jayavarman VII", km: "ព្រះបាទជ័យវរ្ម័នទី ៧", vi: "Vua Jayavarman VII", th: "พระเจ้าชัยวรมันที่ 7" },
      religion: { en: "Mahayana Buddhism & Royal Imperial Cult", km: "ពុទ្ធសាសនាមហាយាន" },
      architecturalStyle: { en: "Bayon Style Monumentalism", km: "រចនាប័ទ្មបាយ័ន" },
      material: { en: "Laterite Ramparts (8m high) & Sandstone Gateways", km: "កំផែងថ្មបាយក្រៀម កម្ពស់ ៨ ម៉ែត្រ និងខ្លោងទ្វារថ្មភក់" },
    },
    content: {
      sections: [
        {
          id: "sec-at-gates",
          heading: {
            en: "The Five Monumental Gates & The Causeway of Gods and Asuras",
            km: "ខ្លោងទ្វារយក្សទាំង ៥ និងស្ពានទេវតាអសុរាទាញនាគ",
            vi: "Năm Cổng Thành Đồ Sộ & Cây Cầu Của Thần Linh Và Quỷ Dạ Xoa",
            th: "ซุ้มประตูเมืองทั้ง 5 และสะพานเทวดาอสูรกวนเกษียรสมุทร",
          },
          body: {
            en: "Enclosed by an 8-meter-high laterite wall stretching 3 kilometers on each side and protected by a 100-meter-wide moat, Angkor Thom is accessed through five monumental gates (South, North, West, Victory, and Dead Gates). Each gate is crowned with four monumental colossal faces of Lokeshvara towering 23 meters into the sky. Crossing each moat are grand stone causeways lined on the left by 54 serene Devas (gods) and on the right by 54 fierce Asuras (demons), clasping the body of the giant multiple-headed serpent Vasuki in an architectural staging of the Churning of the Ocean of Milk protecting the capital against spiritual and military adversity.",
            km: "ព័ទ្ធជុំវិញដោយកំផែងថ្មបាយក្រៀមកម្ពស់ ៨ ម៉ែត្រ និងកសិណទឹកទទឹង ១០០ ម៉ែត្រ ក្រុងអង្គរធំមានខ្លោងទ្វារ ៥។ នៅសងខាងផ្លូវឆ្លងកាត់កសិណទឹកមានទេវតា ៥៤ អង្គ និងយក្ស ៥៤ ឈរទាញនាគរាជ ធ្វើឲ្យរាជធានីទាំងមូលក្លាយជាគំរូនៃមហាសមុទ្រចក្រវាឡ។",
            vi: "Được bao bọc bởi tường đá ong cao 8m dài 3km mỗi cạnh và che chắn bởi hào nước rộng 100m, Angkor Thom mở lối qua 5 cổng thành tráng lệ (Nam, Bắc, Tây, Chiến Thắng và Cổng Tử). Mỗi cổng thành cao 23m được ngự trị bởi bốn gương mặt Bồ Tát mỉm cười thanh tịnh. Dọc hai bên cầu đá bắc qua hào nước là hàng tượng 54 vị thần Deva hiền hòa bên trái và 54 ác thần Dạ xoa bên phải cùng ôm thân Rắn thần Vasuki bảy đầu, biến toàn bộ kinh đô thành biểu tượng vững chãi tái hiện huyền thoại Khuấy Biển Sữa.",
            th: "นครธมมีกำแพงศิลาแลงสูง 8 เมตร ล้อมรอบด้วยคูน้ำกว้าง 100 เมตร มีซุ้มประตู 5 แห่ง แต่ละแห่งมียอดปรางค์ 4 หน้าสูง 23 เมตร บนสะพานข้ามคูเมืองมีรูปสลักเทวดา 54 องค์และอสูร 54 องค์ฉุดพญานาค เปรียบเสมือนการจำลองฉากกวนเกษียรสมุทรเพื่อปกป้องพระนคร",
          },
        },
      ],
    },
    gallery: [
      createMedia(
        "m-at-city-g1",
        LOCAL_ASSETS.bayon,
        "Row of Fierce Asura Stone Guardians Holding the Great Serpent on South Gate Causeway",
        "ជួរចម្លាក់យក្សអសុរាទាញនាគនៅខ្លោងទ្វារខាងត្បូង",
        "Khmer Heritage Field Mission",
        "Hàng tượng Dạ xoa ôm thân Rắn thần Vasuki tại cầu Cổng Nam Angkor Thom",
        "แถวรูปสลักอสูรฉุดพญานาคบนสะพานประตูทิศใต้",
        "Khmer Heritage Field Archive",
        "cc_by_sa",
        "src-khmer-field-mission"
      ),
    ],
    relatedEntryIds: ["e-bayon", "e-angkor-wat", "e-jayavarman-vii"],
    relatedEntries: ["e-bayon", "e-angkor-wat", "e-jayavarman-vii"],
    sourceIds: ["src-coe-2003", "src-groslier-1956", "src-unesco-668", "src-dagens-1995"],
    citations: [
      {
        id: "c-atc-1",
        title: "Angkor and the Khmer Civilization",
        author: "Michael D. Coe",
        year: 2003,
        publisher: "Thames & Hudson",
        sourceId: "src-coe-2003",
        sourceType: "academic_publication",
        reviewStatus: "verified_peer_reviewed",
      },
    ],
    reviewStatus: "verified_peer_reviewed",
    scholarlyReviewer: "APSARA National Authority & EFEO Research Directorate",
    updatedAt: "2026-08-28T00:00:00.000Z",
  },
];
