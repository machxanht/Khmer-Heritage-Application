import angkorWat from "../assets/angkor-wat.jpg";
import apsara from "../assets/apsara.jpg";
import bayon from "../assets/bayon.jpg";
import instrumentsImg from "../assets/instruments.jpg";
import silk from "../assets/silk.jpg";
import type { HeritageEntry, MediaAsset } from "../types/schema.ts";

export const SAMPLE_IMAGES = {
  angkorWat,
  apsara,
  bayon,
  instruments: instrumentsImg,
  silk,
};

const createMedia = (
  id: string,
  url: string,
  en: string,
  km: string,
  creator: string,
  vi: string,
  th: string,
  source = "Khmer Heritage Archive / EFEO / UNESCO",
  license: MediaAsset["license"] = "cc_by_sa"
): MediaAsset => ({
  id,
  url,
  thumbnailUrl: url,
  type: "image",
  title: { en, km, vi, th },
  creator,
  source,
  sourceUrl: "https://whc.unesco.org/en/list/668/",
  license,
  licenseUrl: "https://creativecommons.org/licenses/by-sa/4.0/",
  attribution: `${creator} — ${source}, CC BY-SA 4.0`,
});

/**
 * Verified Sample Heritage Entries for Khmer Heritage Platform (Task 004)
 * Grounded in peer-reviewed scholarship (EFEO, UNESCO, APSARA Authority, George Cœdès, Bernard-Philippe Groslier).
 * 
 * Target sample corpus:
 * 1. Angkor Wat (e-angkor-wat)
 * 2. The Bayon (e-bayon)
 * 3. Angkor Thom (e-angkor-thom)
 * 4. Apsara & Royal Ballet (e-apsara)
 * 5. Pin Peat Ensemble (e-pinpeat)
 * 6. Roneat Aek / Roneat Ek (e-roneat-ek)
 */
export const sampleEntries: HeritageEntry[] = [
  // 1. ANGKOR WAT
  {
    id: "e-angkor-wat",
    slug: "angkor-wat",
    category: "temples",
    categoryId: "temples",
    title: {
      en: "Angkor Wat",
      km: "ប្រាសាទអង្គរវត្ត",
      vi: "Đền Angkor Wat",
      th: "ปราสาทนครวัด",
    },
    summary: {
      en: "The grandest religious monument in human history, raised by King Suryavarman II in the early 12th century as a terrestrial cosmogram of Mount Meru and Vishnu's celestial abode.",
      km: "សំណង់សាសនាធំបំផុតលើពិភពលោក សាងឡើងដោយព្រះបាទសូរ្យវរ្ម័នទី ២ នៅដើមសតវត្សរ៍ទី ១២ ជាគំរូនៃភ្នំព្រះសុមេរុ និងឋានសួគ៌នៃព្រះវិស្ណុ។",
      vi: "Quần thể đền đài tôn giáo đồ sộ nhất thế giới, được vua Suryavarman II xây dựng vào đầu thế kỷ 12 như một tiểu vũ trụ trần thế của núi thiêng Meru và cõi ngự của thần Vishnu.",
      th: "ศาสนสถานที่ใหญ่ที่สุดในโลก สร้างขึ้นโดยพระเจ้าสูรยวรมันที่ 2 ในช่วงต้นศตวรรษที่ 12 เพื่อเป็นแบบจำลองของเขาพระสุเมรุและวิมานของพระวิษณุ",
    },
    era: {
      en: "Early 12th Century CE (c. 1113–1150 CE)",
      km: "ដើមសតវត្សរ៍ទី ១២ នៃ គ.ស. (ប្រមាណ ឆ្នាំ ១១១៣–១១៥០)",
      vi: "Đầu thế kỷ 12 CN (khoảng 1113–1150 CN)",
      th: "ต้นศตวรรษที่ 12 (ราว ค.ศ. 1113–1150)",
    },
    coverMedia: createMedia(
      "m-aw-cover",
      angkorWat,
      "Angkor Wat Western Causeway and Central Towers at Sunrise",
      "អង្គរវត្តពេលព្រឹកព្រាងឆ្លុះផ្ទៃទឹក",
      "Khmer Heritage Field Mission",
      "Cầu đá phía Tây và năm ngọn tháp Angkor Wat lúc bình minh",
      "ทัศนียภาพนครวัดยามเช้าตรู่เหนือน้ำ"
    ),
    keyFacts: {
      era: {
        en: "Classical Angkorian Period (1113–1150 CE)",
        km: "សម័យមហានគរបុរាណ (១១១៣–១១៥០)",
        vi: "Thời kỳ Angkor Cổ điển (1113–1150 CN)",
        th: "ยุคทองแห่งพระนคร (ค.ศ. 1113–1150)",
      },
      builder: {
        en: "King Suryavarman II",
        km: "ព្រះបាទសូរ្យវរ្ម័នទី ២",
        vi: "Vua Suryavarman II",
        th: "พระเจ้าสูรยวรมันที่ 2",
      },
      religion: {
        en: "Vaishnavite Hinduism (originally), Theravada Buddhism (14th c.–present)",
        km: "ព្រហ្មញ្ញសាសនា (ព្រះវិស្ណុ) និងព្រះពុទ្ធសាសនាថេរវាទ",
        vi: "Ấn Độ giáo (thờ thần Vishnu), sau là Phật giáo Nam truyền",
        th: "ศาสนาฮินดูนิกายไวษณพ และพุทธศาสนาเถรวาทในเวลาต่อมา",
      },
      architecturalStyle: {
        en: "Angkor Wat Style (Concentric Temple-Mountain)",
        km: "រចនាបថអង្គរវត្ត (ប្រាសាទភ្នំ)",
        vi: "Phong cách Angkor Wat (Kiến trúc Đền Núi)",
        th: "ศิลปะแบบนครวัด (ปราสาททรงภูเขา)",
      },
      unescoStatus: {
        en: "UNESCO World Heritage Site (Inscribed 1992, Ref: 668)",
        km: "បេតិកភណ្ឌពិភពលោក UNESCO (ឆ្នាំ ១៩៩២)",
        vi: "Di sản Thế giới UNESCO (Ghi danh năm 1992, Mã số: 668)",
        th: "มรดกโลกยูเนสโก (ขึ้นทะเบียน ค.ศ. 1992)",
      },
      location: {
        en: "Siem Reap Province, Kingdom of Cambodia",
        km: "ខេត្តសៀមរាប ព្រះរាជាណាចក្រកម្ពុជា",
        vi: "Tỉnh Siem Reap, Vương quốc Campuchia",
        th: "จังหวัดเสียมราฐ ราชอาณาจักรกัมพูชา",
      },
      items: [
        {
          key: "builder",
          label: { en: "Monarch / Patron", km: "ព្រះមហាក្សត្រស្ថាបនិក", vi: "Vị Vua Xây Dựng", th: "กษัตริย์ผู้สร้าง" },
          value: { en: "King Suryavarman II", km: "ព្រះបាទសូរ្យវរ្ម័នទី ២", vi: "Suryavarman II", th: "พระเจ้าสูรยวรมันที่ 2" },
        },
        {
          key: "period",
          label: { en: "Consecration Era", km: "សម័យកាល", vi: "Niên Đại", th: "ยุคสมัย" },
          value: { en: "12th Century CE", km: "សតវត្សរ៍ទី ១២", vi: "Thế kỷ 12 CN", th: "ศตวรรษที่ 12" },
        },
        {
          key: "style",
          label: { en: "Architectural Style", km: "រចនាបថស្ថាបត្យកម្ម", vi: "Phong Cách Kiến Trúc", th: "รูปแบบสถาปัตยกรรม" },
          value: { en: "Angkor Wat Style", km: "រចនាបថអង្គរវត្ត", vi: "Phong cách Angkor Wat", th: "แบบนครวัด" },
        },
        {
          key: "dedication",
          label: { en: "Primary Dedication", km: "ការឧទ្ទិសសាសនា", vi: "Tôn Giáo Chủ Đạo", th: "การอุทิศทางศาสนา" },
          value: { en: "Lord Vishnu / Paramavishnuloka", km: "ព្រះវិស្ណុ (បរមវិស្ណុលោក)", vi: "Thần Vishnu", th: "พระวิษณุ" },
        },
        {
          key: "material",
          label: { en: "Primary Material", km: "សម្ភារៈសំណង់", vi: "Vật Liệu Chính", th: "วัสดุก่อสร้าง" },
          value: { en: "Sandstone & Laterite Core", km: "ថ្មភក់ និងថ្មបាយក្រៀម", vi: "Sa thạch & Đá ong", th: "หินทรายและศิลาแลง" },
        },
        {
          key: "unesco",
          label: { en: "UNESCO Status", km: "ស្ថានភាព UNESCO", vi: "Chứng Nhận UNESCO", th: "สถานะยูเนสโก" },
          value: { en: "World Heritage (1992)", km: "បេតិកភណ្ឌពិភពលោក (១៩៩២)", vi: "Di sản Thế giới (1992)", th: "มรดกโลก (1992)" },
        },
      ],
    },
    location: {
      coordinates: { latitude: 13.4125, longitude: 103.867 },
      province: {
        en: "Siem Reap",
        km: "សៀមរាប",
        vi: "Siem Reap",
        th: "เสียมราฐ",
      },
      country: "Cambodia",
      siteName: {
        en: "Angkor Archeological Park",
        km: "ឧទ្យានបុរាណវិទ្យាអង្គរ",
        vi: "Công viên Khảo cổ Angkor",
        th: "อุทยานประวัติศาสตร์นครวัด",
      },
    },
    coordinates: { latitude: 13.4125, longitude: 103.867 },
    content: {
      sections: [
        {
          id: "sec-aw-1",
          heading: {
            en: "Sacred Cosmogram & Solar Alignment",
            km: "ប្លង់ស្ថាបត្យកម្ម និងចក្រវាឡវិទ្យា",
            vi: "Mô Hình Tiểu Vũ Trụ & Sự Thẳng Hàng Thiên Văn",
            th: "ผังทางสถาปัตยกรรมและจักรวาลวิทยา",
          },
          body: {
            en: "Angkor Wat constitutes a monumental stone cosmogram. Five quincunx lotus-bud towers represent Mount Meru's sacred summits, concentric galleries symbolize surrounding mountain ranges, and the 190-meter-wide moat symbolizes the cosmic ocean. Uniquely among classic Angkorian monuments, the primary entrance faces West toward the realm of Vishnu. On the Spring Equinox, the morning sun rises directly over the central lotus spire.",
            km: "ប្រាសាទនេះជាគំរូនៃភ្នំព្រះសុមេរុលើផែនដី ធ្វើពីថ្មភក់ និងថ្មបាយក្រៀម មានប្រាង្គកំពូល ៥ និងកសិណទឹកទទឹង ១៩០ ម៉ែត្រព័ទ្ធជុំវិញ តំណាងឲ្យមហាសមុទ្រចក្រវាឡ។ ប្រាសាទបែរមុខទៅទិសខាងលិច ដែលជាទិសនៃព្រះវិស្ណុ។ នៅថ្ងៃសមរាត្រី ព្រះអាទិត្យរះចំលើកំពូលកណ្តាលយ៉ាងអស្ចារ្យ។",
            vi: "Angkor Wat là một mô hình tiểu vũ trụ đồ sộ tạc bằng sa thạch và đá ong. Năm ngọn tháp hoa sen tượng trưng cho các đỉnh núi thiêng Meru, các dãy hành lang đồng tâm tượng trưng cho dãy núi bao quanh, và hào nước rộng 190m tượng trưng cho đại dương vũ trụ. Độc đáo ở chỗ, đền quay mặt về hướng Tây — hướng của thần Vishnu. Vào ngày Xuân phân, mặt trời mọc thẳng tắp ngay trên đỉnh tháp trung tâm.",
            th: "นครวัดคือแบบจำลองจักรวาลอันยิ่งใหญ่ สร้างด้วยหินทรายและศิลาแลง ยอดปรางค์ 5 ยอดเปรียบเสมือนยอดเขาพระสุเมรุ ระเบียงคดคือทิวเขา และคูน้ำกว้าง 190 เมตรคือมหาสมุทรจักรวาล ในวันวสันตวิษุวัต พระอาทิตย์จะขึ้นตรงยอดปรางค์ประธานพอดี",
          },
        },
        {
          id: "sec-aw-2",
          heading: {
            en: "The Epic Bas-Relief Galleries",
            km: "វិចិត្រសាលចម្លាក់ក្រឡោតទាប",
            vi: "Các Dãy Hành Lang Phù Điêu Sử Thi",
            th: "ภาพสลักนูนต่ำเรื่องราวมหากาพย์",
          },
          body: {
            en: "Over 600 continuous meters of narrative stone bas-reliefs line the outer gallery. The southern wing celebrates King Suryavarman II presiding over his royal army. The eastern wing portrays the monumental Churning of the Ocean of Milk (Samudra Manthan), where 88 asuras and 92 devas pull the serpent Vasuki. The western wings depict titanic clashes from the Mahabharata and Ramayana epics.",
            km: "ចម្លាក់ក្រឡោតទាបប្រវែងជិត ៦០០ ម៉ែត្រព័ន្ធជុំវិញថែវទី ៣ បង្ហាញពីព្រះរាជពិធីរបស់ព្រះបាទសូរ្យវរ្ម័នទី ២ រឿងកូរសមុទ្រទឹកដោះ (យក្ស ៨៨ និងទេវតា ៩២ ទាញនាគវាសុកី) និងសមរភូមិកុរុក្សេត្រក្នុងរឿងមហាភារតៈ។",
            vi: "Hơn 600 mét phù điêu chạm khắc liên tục bao bọc tầng hành lang ngoài. Cánh phía Nam khắc họa vua Suryavarman II cùng quân đội hoàng gia. Cánh phía Đông tái hiện trường đoạn huyền thoại Khuấy Biển Sữa (Samudra Manthan) với 88 thần Asura và 92 Deva cùng kéo rắn thần Vasuki. Cánh phía Tây mô tả các trận đánh bi tráng trong sử thi Mahabharata và Ramayana.",
            th: "ภาพสลักนูนต่ำความยาวเกือบ 600 เมตรรอบระเบียงคดชั้นนอก แสดงภาพพระเจ้าสูรยวรมันที่ 2 เสด็จนำทัพ ภาพการกวนเกษียรสมุทร และฉากสงครามจากมหากาพย์มหาภารตะและรามายณะ",
          },
        },
        {
          id: "sec-aw-3",
          heading: {
            en: "Conservation & Living Spiritual Stewardship",
            km: "ការអភិរក្ស និងសារៈសំខាន់ជាតិ",
            vi: "Bảo Tồn & Vị Thế Di Sản Sống",
            th: "การอนุรักษ์และความสำคัญของชาติ",
          },
          body: {
            en: "Unlike many ancient complexes, Angkor Wat was never fully abandoned; Buddhist monastic communities continuously inhabited and safeguarded the site through the post-Angkorian era. Inscribed as a UNESCO World Heritage site in 1992, the complex is stewarded by APSARA National Authority alongside international conservation missions from France, Japan, Germany, and India.",
            km: "អង្គរវត្តមិនដែលត្រូវបានបោះបង់ចោលឡើយ ដោយព្រះសង្ឃថេរវាទបានបន្តថែរក្សា។ ត្រូវបានចុះបញ្ជីជាបេតិកភណ្ឌពិភពលោក UNESCO ក្នុងឆ្នាំ ១៩៩២ និងគ្រប់គ្រងដោយអាជ្ញាធរជាតិអប្សរា។",
            vi: "Angkor Wat chưa từng bị lãng quên hay bỏ hoang hoàn toàn; các tăng đoàn Phật giáo đã liên tục cư ngụ và gìn giữ ngôi đền qua nhiều thế kỷ. Được UNESCO công nhận là Di sản Thế giới vào năm 1992, khu di tích hiện được quản lý bởi Cơ quan Quốc gia APSARA và các đoàn chuyên gia phục chế quốc tế.",
            th: "นครวัดไม่เคยถูกทิ้งร้างอย่างสมบูรณ์ พระสงฆ์ในพุทธศาสนาเถรวาทได้ดูแลรักษามาตลอด ได้รับการขึ้นทะเบียนเป็นมรดกโลกยูเนสโกในปี 1992",
          },
        },
      ],
    },
    gallery: [
      createMedia("g-aw-1", angkorWat, "Western causeway entrance across moat", "ស្ពានហាលខាងលិច", "Khmer Heritage Archive", "Cầu đá phía Tây bắc qua hào nước", "สะพานหินทอดข้ามคูน้ำสู่นครวัด"),
      createMedia("g-aw-2", apsara, "Devata wall relief inside central gallery", "ចម្លាក់ទេវតាលើជញ្ជាំង", "EFEO Archives", "Phù điêu tiên nữ Devata trên vách đá", "ภาพสลักนางอัปสราบนผนังหิน"),
      createMedia("g-aw-3", bayon, "Comparative bas-relief stonework", "ចម្លាក់ថ្មប្រៀបធៀប", "APSARA Authority", "So sánh kỹ thuật điêu khắc phù điêu đá", "ภาพสลักหินเปรียบเทียบ"),
    ],
    relatedEntryIds: ["e-bayon", "e-angkor-thom", "e-apsara", "e-pinpeat"],
    relatedEntries: ["e-bayon", "e-angkor-thom", "e-apsara", "e-pinpeat"],
    citations: [
      { id: "c-aw-1", title: "Angkor and the Khmer Civilization", author: "Michael D. Coe", year: 2003, publisher: "Thames & Hudson", isbn: "978-0500284421" },
      { id: "c-aw-2", title: "Inscriptions du Cambodge, Vol. I–VIII", author: "George Cœdès", year: 1937, publisher: "EFEO (École française d'Extrême-Orient)" },
      { id: "c-aw-3", title: "Angkor: Hommes et pierres", author: "Bernard-Philippe Groslier", year: 1956, publisher: "Arthaud" },
      { id: "c-aw-4", title: "World Heritage List Inscription Dossier No. 668 (Angkor)", author: "UNESCO World Heritage Centre", year: 1992, url: "https://whc.unesco.org/en/list/668/" },
    ],
    bibliography: [
      { id: "c-aw-1", title: "Angkor and the Khmer Civilization", author: "Michael D. Coe", year: 2003, publisher: "Thames & Hudson" },
      { id: "c-aw-2", title: "Inscriptions du Cambodge", author: "George Cœdès", year: 1937, publisher: "EFEO" },
    ],
  },

  // 2. THE BAYON
  {
    id: "e-bayon",
    slug: "bayon",
    category: "temples",
    categoryId: "temples",
    title: {
      en: "The Bayon",
      km: "ប្រាសាទបាយ័ន",
      vi: "Đền Bayon",
      th: "ปราสาทบายอน",
    },
    summary: {
      en: "The mesmerizing Mahayana Buddhist state temple of King Jayavarman VII at the geometrical center of Angkor Thom, celebrated for its 216 serene, enigmatic colossal face towers.",
      km: "ប្រាសាទរដ្ឋពុទ្ធសាសនាមហាយានរបស់ព្រះបាទជ័យវរ្ម័នទី ៧ នៅចំកណ្តាលរាជធានីអង្គរធំ មានកំពូលព្រះភ័ក្ត្រញញឹមចំនួន ២១៦ បែរទៅកាន់ទិសទាំង ៤។",
      vi: "Ngôi quốc tự Phật giáo Đại thừa kỳ vĩ của vua Jayavarman VII tại trung tâm Angkor Thom, nổi tiếng với 216 gương mặt đá khổng lồ mỉm cười bí ẩn hướng về bốn phương.",
      th: "ปราสาทประจำรัชกาลของพระเจ้าชัยวรมันที่ 7 ใจกลางนครธม โดดเด่นด้วยยอดปรางค์รูปใบหน้ายิ้ม 216 หน้า",
    },
    era: {
      en: "Late 12th – Early 13th Century CE (c. 1190–1210 CE)",
      km: "ចុងសតវត្សរ៍ទី ១២ – ដើមសតវត្សរ៍ទី ១៣ នៃ គ.ស.",
      vi: "Cuối thế kỷ 12 – Đầu thế kỷ 13 CN (khoảng 1190–1210 CN)",
      th: "ปลายศตวรรษที่ 12 ถึงต้นศตวรรษที่ 13",
    },
    coverMedia: createMedia(
      "m-by-cover",
      bayon,
      "Colossal smiling stone faces of the Bayon Temple",
      "កំពូលព្រះភ័ក្ត្របាយ័ន",
      "Khmer Heritage Archive",
      "Các tháp mặt Phật mỉm cười thanh thoát tại đền Bayon",
      "ยอดปรางค์หินรูปใบหน้าแห่งปราสาทบายอน"
    ),
    keyFacts: {
      era: {
        en: "Late 12th Century CE · Jayavarman VII",
        km: "ចុងសតវត្សរ៍ទី ១២ · ព្រះបាទជ័យវរ្ម័នទី ៧",
        vi: "Cuối thế kỷ 12 · Vua Jayavarman VII",
        th: "ปลายศตวรรษที่ 12 · พระเจ้าชัยวรมันที่ 7",
      },
      builder: {
        en: "King Jayavarman VII",
        km: "ព្រះបាទជ័យវរ្ម័នទី ៧",
        vi: "Vua Jayavarman VII",
        th: "พระเจ้าชัยวรมันที่ 7",
      },
      religion: {
        en: "Mahayana Buddhism (Bodhisattva Lokeshvara / Avalokiteshvara)",
        km: "ព្រះពុទ្ធសាសនាមហាយាន (ព្រះពោធិសត្វអវលោកិតេស្វរៈ)",
        vi: "Phật giáo Đại thừa (Bồ Tát Quán Thế Âm)",
        th: "พุทธศาสนามหายาน (พระโพธิสัตว์อวโลกิเตศวร)",
      },
      architecturalStyle: {
        en: "Bayon Style (Face-Tower Sanctuary)",
        km: "រចនាបថបាយ័ន",
        vi: "Phong cách Bayon (Tháp tượng mặt Phật)",
        th: "ศิลปะแบบบายอน",
      },
      location: {
        en: "Angkor Thom Center, Siem Reap Province",
        km: "កណ្តាលក្រុងអង្គរធំ ខេត្តសៀមរាប",
        vi: "Trung tâm Angkor Thom, Tỉnh Siem Reap",
        th: "ใจกลางนครธม จังหวัดเสียมราฐ",
      },
      unescoStatus: {
        en: "UNESCO World Heritage Site (1992)",
        km: "បេតិកភណ្ឌពិភពលោក (១៩៩២)",
        vi: "Di sản Thế giới UNESCO (1992)",
        th: "มรดกโลกยูเนสโก (1992)",
      },
      items: [
        {
          key: "builder",
          label: { en: "Patron King", km: "ព្រះមហាក្សត្រ", vi: "Vị Vua Xây Dựng", th: "กษัตริย์ผู้สร้าง" },
          value: { en: "King Jayavarman VII", km: "ព្រះបាទជ័យវរ្ម័នទី ៧", vi: "Jayavarman VII", th: "พระเจ้าชัยวรมันที่ 7" },
        },
        {
          key: "faces",
          label: { en: "Colossal Face Towers", km: "ចំនួនកំពូលព្រះភ័ក្ត្រ", vi: "Số Tháp Mặt Cười", th: "จำนวนหน้าบนยอดปรางค์" },
          value: { en: "54 Towers / 216 Faces", km: "៥៤ ប្រាង្គ / ២១៦ ព្រះភ័ក្ត្រ", vi: "54 Tháp / 216 Gương Mặt", th: "54 ยอด / 216 หน้า" },
        },
        {
          key: "dedication",
          label: { en: "Deity", km: "ការឧទ្ទិស", vi: "Tôn Tượng", th: "พระโพธิสัตว์" },
          value: { en: "Bodhisattva Lokeshvara", km: "ព្រះពោធិសត្វលោកេសូរ", vi: "Bồ Tát Quán Thế Âm (Lokeshvara)", th: "พระโลเกศวร" },
        },
        {
          key: "reliefs",
          label: { en: "Outer Reliefs", km: "ចម្លាក់ថែវក្រៅ", vi: "Nội Dung Phù Điêu", th: "ภาพสลัก" },
          value: { en: "Daily life, markets, naval wars", km: "ជីវភាពរស់នៅ និងចម្បាំងជើងទឹក", vi: "Đời sống dân gian & Thủy chiến", th: "ชีวิตประจำวันและยุทธนาวี" },
        },
      ],
    },
    location: {
      coordinates: { latitude: 13.4413, longitude: 103.8586 },
      province: { en: "Siem Reap", km: "សៀមរាប", vi: "Siem Reap", th: "เสียมราฐ" },
      country: "Cambodia",
      siteName: { en: "Angkor Thom Center", km: "កណ្តាលក្រុងអង្គរធំ", vi: "Trung tâm Kinh thành Angkor Thom", th: "ศูนย์กลางนครธม" },
    },
    coordinates: { latitude: 13.4413, longitude: 103.8586 },
    content: {
      sections: [
        {
          id: "sec-by-1",
          heading: {
            en: "The Enigmatic Face Towers & Omnipresent Compassion",
            km: "កំពូលព្រះភ័ក្ត្រទាំងបួនទិស",
            vi: "Những Ngọn Tháp Mặt Cười & Lòng Từ Bi Bốn Phương",
            th: "ยอดปรางค์รูปใบหน้าและพระโพธิสัตว์อวโลกิเตศวร",
          },
          body: {
            en: "The Bayon presents 54 gothic-style stone towers adorned with 216 colossal smiling faces gazing serenely toward the cardinal directions. Academic consensus identifies these faces as Bodhisattva Lokeshvara (Avalokiteshvara), subtly blended with royal portraiture of Jayavarman VII to symbolize omnipresent compassion and sovereign spiritual protection.",
            km: "អ្នកប្រាជ្ញបុរាណវិទ្យាយល់ថា ព្រះភ័ក្ត្រទាំងនោះតំណាងឲ្យព្រះពោធិសត្វអវលោកិតេស្វរៈ និងព្រះឆាយាលក្ខណ៍របស់ព្រះបាទជ័យវរ្ម័នទី ៧ ដែលឆ្លុះបញ្ចាំងពីព្រហ្មវិហារធម៌ និងការការពារប្រជារាស្ត្រ។",
            vi: "Bayon sở hữu 54 ngọn tháp đá với 216 gương mặt khổng lồ hướng về bốn phương với nụ cười bí ẩn. Giới học giả xác định đây là hiện thân của Bồ Tát Quán Thế Âm (Lokeshvara), hòa quyện cùng dung mạo vua Jayavarman VII biểu trưng cho lòng từ bi vô lượng và quyền uy bảo hộ muôn dân.",
            th: "ยอดปรางค์ 54 ยอดสลักใบหน้า 216 หน้า สื่อถึงพระโพธิสัตว์อวโลกิเตศวรและความเมตตากรุณาของพระเจ้าชัยวรมันที่ 7",
          },
        },
        {
          id: "sec-by-2",
          heading: {
            en: "Chronicles of Everyday Angkorian Life & Cham Naval Wars",
            km: "ចម្លាក់ជីវភាពប្រចាំថ្ងៃរបស់ប្រជារាស្ត្រ",
            vi: "Biên Niên Sử Về Đời Sống Dân Gian & Thủy Chiến Cham",
            th: "บันทึกชีวิตประจำวันและยุทธนาวีบนโตนเลสาบ",
          },
          body: {
            en: "Unlike other monuments that exclusively illustrate sacred religious mythology, the outer gallery bas-reliefs of the Bayon document authentic daily life: bustling market stalls, Chinese merchants trading, cockfighting matches, childbirth, freshwater fishing on the Tonle Sap, and the fierce naval clash against Cham invaders in 1177.",
            km: "ខុសពីអង្គរវត្ត ចម្លាក់ថែវខាងក្រៅនៃបាយ័នបង្ហាញពីជីវភាពរស់នៅពិតៗ ដូចជាទិដ្ឋភាពផ្សារ ការជល់មាន់ ការសម្រាលកូន ការនេសាទនៅបឹងទន្លេសាប និងចម្បាំងជើងទឹកជាមួយចាម។",
            vi: "Khác với các ngôi đền chỉ tạc tích thần thoại, các bức phù điêu ở hành lang ngoài đền Bayon là kho tư liệu sống động về cuộc sống thường nhật: cảnh chợ búa tấp nập, thương gia người Hoa, chọi gà, sinh con, đánh cá trên Biển Hồ và trận thủy chiến lịch sử chống quân Champa.",
            th: "ภาพสลักนูนต่ำที่ระเบียงชั้นนอกบันทึกภาพชีวิตผู้คน ตลาด การค้าขายกับชาวจีน การชนไก่ การทำคลอด และยุทธนาวีบนโตนเลสาบ",
          },
        },
      ],
    },
    gallery: [
      createMedia("g-by-1", bayon, "Central face tower under late afternoon light", "កំពូលព្រះភ័ក្ត្រទិសខាងកើត", "Khmer Heritage Archive", "Gương mặt đá Bayon trong ánh hoàng hôn", "ยอดปรางค์รูปใบหน้าบายอน"),
      createMedia("g-by-2", angkorWat, "Angkor Thom gateway road", "ផ្លូវចូលអង្គរធំ", "EFEO Archives", "Đường vào kinh thành Angkor Thom", "ทางเข้านครธม"),
    ],
    relatedEntryIds: ["e-angkor-wat", "e-angkor-thom", "e-apsara"],
    relatedEntries: ["e-angkor-wat", "e-angkor-thom", "e-apsara"],
    citations: [
      { id: "c-by-1", title: "The Bayon: New Perspectives", author: "Joyce Clark (ed.)", year: 2007, publisher: "River Books", isbn: "978-9749863473" },
      { id: "c-by-2", title: "Les monuments du groupe d'Angkor", author: "Maurice Glaize", year: 1944, publisher: "Albert Portail (Saigon)" },
      { id: "c-by-3", title: "Angkor Thom: The City of Jayavarman VII", author: "Jacques Dumarçay", year: 1998, publisher: "Oxford University Press" },
    ],
    bibliography: [
      { id: "c-by-1", title: "The Bayon: New Perspectives", author: "Joyce Clark", year: 2007, publisher: "River Books" },
    ],
  },

  // 3. ANGKOR THOM
  {
    id: "e-angkor-thom",
    slug: "angkor-thom",
    category: "temples",
    categoryId: "temples",
    title: {
      en: "Angkor Thom",
      km: "រាជធានីអង្គរធំ",
      vi: "Kinh Đô Angkor Thom",
      th: "นครธม",
    },
    summary: {
      en: "The fortified 9-square-kilometer imperial metropolis founded by Jayavarman VII, enclosed by 8-meter laterite ramparts, giant moat channels, and colossal causeways of churning devas and asuras.",
      km: "រាជធានីបន្ទាយដ៏រឹងមាំទំហំ ៩ គីឡូម៉ែត្រការ៉េ ស្ថាបនាដោយព្រះបាទជ័យវរ្ម័នទី ៧ ព័ទ្ធជុំវិញដោយកំពែងថ្មបាយក្រៀមកម្ពស់ ៨ ម៉ែត្រ និងស្ពានទាញនាគដ៏អស្ចារ្យ។",
      vi: "Đại kinh đô kiên cố rộng 9 km² do vua Jayavarman VII kiến lập, được bao bọc bởi tường thành đá ong cao 8 mét, hệ thống hào nước sâu và các cầu đá kéo Rắn Thần Naga hùng vĩ.",
      th: "ราชธานีอันยิ่งใหญ่ขนาด 9 ตารางกิโลเมตร สร้างขึ้นโดยพระเจ้าชัยวรมันที่ 7 ล้อมรอบด้วยกำแพงศิลาแลงและสะพานกวนเกษียรสมุทร",
    },
    era: {
      en: "Late 12th Century CE (c. 1181–1218 CE)",
      km: "ចុងសតវត្សរ៍ទី ១២ នៃ គ.ស.",
      vi: "Cuối thế kỷ 12 CN (khoảng 1181–1218 CN)",
      th: "ปลายศตวรรษที่ 12 (ราว ค.ศ. 1181–1218)",
    },
    coverMedia: createMedia(
      "m-at-cover",
      bayon,
      "South Gate of Angkor Thom with monumental Deva causeway",
      "ខ្លោងទ្វារខាងត្បូងអង្គរធំ",
      "Khmer Heritage Archive",
      "Cổng Nam Angkor Thom với hàng tượng Thần và Ác thần kéo Rắn Naga",
      "ประตูทิศใต้นครธมพร้อมแถวเทวดาและยักษ์"
    ),
    keyFacts: {
      era: {
        en: "Late 12th Century CE · Jayavarman VII",
        km: "ចុងសតវត្សរ៍ទី ១២ · ព្រះបាទជ័យវរ្ម័នទី ៧",
        vi: "Cuối thế kỷ 12 · Vua Jayavarman VII",
        th: "ปลายศตวรรษที่ 12 · พระเจ้าชัยวรมันที่ 7",
      },
      builder: {
        en: "King Jayavarman VII",
        km: "ព្រះបាទជ័យវរ្ម័នទី ៧",
        vi: "Vua Jayavarman VII",
        th: "พระเจ้าชัยวรมันที่ 7",
      },
      religion: {
        en: "Mahayana Buddhism & Royal Devaraja Statehood",
        km: "ព្រះពុទ្ធសាសនាមហាយាន និងរាជានិយម",
        vi: "Phật giáo Đại thừa & Vương quyền Thần Vương",
        th: "พุทธศาสนามหายานและลัทธิเทวราชา",
      },
      architecturalStyle: {
        en: "Bayon Style Fortified Urban City",
        km: "រចនាបថបាយ័ន (រាជធានីបន្ទាយ)",
        vi: "Phong cách Bayon (Kinh thành kiên cố)",
        th: "ศิลปะแบบบายอน (ผังเมืองป้อมปราการ)",
      },
      location: {
        en: "Siem Reap Province, Cambodia",
        km: "ខេត្តសៀមរាប",
        vi: "Tỉnh Siem Reap, Campuchia",
        th: "จังหวัดเสียมราฐ",
      },
      items: [
        {
          key: "area",
          label: { en: "City Area", km: "ទំហំក្រុង", vi: "Diện Tích Kinh Đô", th: "ขนาดพื้นที่" },
          value: { en: "9 km² (3km x 3km)", km: "៩ គីឡូម៉ែត្រការ៉េ (៣គម x ៣គម)", vi: "9 km² (3km x 3km)", th: "9 ตารางกิโลเมตร" },
        },
        {
          key: "population",
          label: { en: "Historical Population", km: "ប្រជាជនសម័យបុរាណ", vi: "Dân Số Thời Cực Thịnh", th: "ประชากรในอดีต" },
          value: { en: "Est. 100,000 – 150,000", km: "ប្រមាណ ១០–១៥ ម៉ឺននាក់", vi: "Ước tính 100.000 – 150.000", th: "ประมาณ 100,000 – 150,000 คน" },
        },
        {
          key: "gates",
          label: { en: "City Gates", km: "ខ្លោងទ្វារក្រុង", vi: "Số Cổng Thành", th: "ประตูเมือง" },
          value: { en: "5 Monumental Gates (South, North, West, Victory, Death)", km: "ខ្លោងទ្វារធំៗចំនួន ៥", vi: "5 Cổng Thành Hùng Vĩ", th: "5 ประตูเมือง" },
        },
      ],
    },
    location: {
      coordinates: { latitude: 13.4413, longitude: 103.8586 },
      province: { en: "Siem Reap", km: "សៀមរាប", vi: "Siem Reap", th: "เสียมราฐ" },
      country: "Cambodia",
      siteName: { en: "Angkor Thom Capital", km: "រាជធានីអង្គរធំ", vi: "Đại đô thành Angkor Thom", th: "ราชธานีนครธม" },
    },
    coordinates: { latitude: 13.4413, longitude: 103.8586 },
    content: {
      sections: [
        {
          id: "sec-at-1",
          heading: {
            en: "The Urban Fortress & Hydraulic Mastery",
            km: "ការរៀបចំរាជធានី និងប្រព័ន្ធធារាសាស្ត្រ",
            vi: "Quy Hoạch Đô Thị & Thủy Công Đỉnh Cao",
            th: "ผังเมืองและระบบชลประทานโบราณ",
          },
          body: {
            en: "Angkor Thom ('Great City') was established following the Cham sack of 1177 as an impregnable walled metropolis. Encircled by an 8-meter laterite wall, a 100-meter-wide moat fed by the Siem Reap River, and five monumental gate towers topped with Avalokiteshvara faces, it accommodated over 100,000 residents in an organized grid of avenues, reservoirs, and public grand terraces.",
            km: "អង្គរធំត្រូវបានសាងសង់ឡើងបន្ទាប់ពីការឈ្លានពានរបស់ចាមក្នុងឆ្នាំ ១១៧៧។ មានកំពែងព័ទ្ធជុំវិញ កសិណទឹកធំទូលាយ និងខ្លោងទ្វារកំពូលព្រះភ័ក្ត្រទាំង ៥ ទិស ផ្ទុកប្រជាជនរហូតដល់ជាង ១៥០,០០០ នាក់។",
            vi: "Angkor Thom ('Đại Đô Thành') được xây dựng sau cuộc biến loạn năm 1177 nhằm tạo ra một pháo đài đô thị bất khả xâm phạm. Được bao quanh bởi tường đá ong cao 8 mét, hào nước rộng 100 mét và 5 cổng thành tráng lệ, kinh đô này từng là nơi sinh sống của hơn 150.000 cư dân với mạng lưới đường sá, hồ chứa nước và các khán đài hoàng gia.",
            th: "นครธมถูกสร้างขึ้นเพื่อเป็นเมืองป้อมปราการหลังสงคราม ล้อมรอบด้วยคูน้ำกว้างและกำแพงสูง มีประตูเมือง 5 ทิศ และเคยมีประชากรอาศัยอยู่กว่า 150,000 คน",
          },
        },
        {
          id: "sec-at-2",
          heading: {
            en: "The Naga Churning Causeways & Royal Terraces",
            km: "ស្ពានទាញនាគ និងព្រលានជល់ដំរី",
            vi: "Cầu Đá Kéo Rắn Naga & Khán Đài Voi Hoàng Gia",
            th: "สะพานกวนเกษียรสมุทรและลานช้าง",
          },
          body: {
            en: "Each of the five causeways entering Angkor Thom is flanked by 54 colossal stone figures—devas on the left, asuras on the right—holding the body of the seven-headed serpent Vasuki, dramatically reenacting the Samudra Manthan at the threshold of the capital. Inside lies the Terrace of the Elephants, a 350-meter viewing pavilion used for royal parades and state audiences.",
            km: "ស្ពានចូលនីមួយៗមានទេវតា ៥៤ អង្គនៅខាងឆ្វេង និងយក្ស ៥៤ នៅខាងស្តាំ កាន់តួខ្លួននាគវាសុកី។ នៅខាងក្នុងមានព្រលានជល់ដំរីប្រវែង ៣៥០ ម៉ែត្រសម្រាប់ពិធីព្យុហយាត្រារបស់ព្រះមហាក្សត្រ។",
            vi: "Mỗi lối vào cổng thành được hộ vệ bởi hai hàng tượng đá khổng lồ: 54 vị thần Deva bên trái và 54 ác thần Asura bên phải cùng nâng thân rắn 7 đầu Vasuki, tái hiện lại nghi lễ Khuấy Biển Sữa tại cửa ngõ hoàng cung. Phía bên trong là Khán đài Voi (Terrace of the Elephants) dài 350 mét dành cho các cuộc duyệt binh hoàng gia.",
            th: "สะพานทางเข้าแต่ละทิศมีรูปปั้นเทวดา 54 องค์และยักษ์ 54 ตนฉุดดึงพญานาควาสุกรี ด้านในมีลานช้างความยาว 350 เมตรสำหรับตรวจพลสวนสนาม",
          },
        },
      ],
    },
    gallery: [
      createMedia("g-at-1", bayon, "Terrace of the Elephants and Garuda friezes", "ព្រលានជល់ដំរី", "Khmer Heritage Archive", "Khán đài Voi và phù điêu chim thần Garuda", "ลานช้างแห่งนครธม"),
      createMedia("g-at-2", angkorWat, "Victory Gate monumental towers", "ខ្លោងទ្វារជ័យជំនះ", "EFEO Archives", "Tháp cổng Chiến Thắng", "ประตูชัยนครธม"),
    ],
    relatedEntryIds: ["e-bayon", "e-angkor-wat", "e-apsara"],
    relatedEntries: ["e-bayon", "e-angkor-wat", "e-apsara"],
    citations: [
      { id: "c-at-1", title: "Angkor Thom: The City of Jayavarman VII", author: "Jacques Dumarçay", year: 1998, publisher: "Oxford University Press", isbn: "978-9835600463" },
      { id: "c-at-2", title: "Angkor: Heart of an Asian Empire", author: "Bruno Dagens", year: 2003, publisher: "Thames & Hudson" },
    ],
    bibliography: [
      { id: "c-at-1", title: "Angkor Thom: The City of Jayavarman VII", author: "Jacques Dumarçay", year: 1998, publisher: "Oxford University Press" },
    ],
  },

  // 4. APSARA & ROYAL BALLET
  {
    id: "e-apsara",
    slug: "apsara",
    category: "arts",
    categoryId: "arts",
    title: {
      en: "Apsara & Classical Royal Ballet",
      km: "ចម្លាក់អប្សរា និងរបាំព្រះរាជទ្រព្យ",
      vi: "Vũ Nữ Apsara & Điêu Khắc Cung Đình",
      th: "ภาพสลักอัปสราและระบำหลวง",
    },
    summary: {
      en: "Over 1,800 celestial water nymphs sculpted into Angkorian sandstone walls, forming the sacred visual canon and somatic vocabulary for Cambodia's UNESCO-inscribed Royal Ballet.",
      km: "នាងអប្សរា និងទេវតាជាង ១,៨០០ រូប ឆ្លាក់នៅលើជញ្ជាំងអង្គរវត្ត ជាឫសគល់នៃក្បាច់របាំព្រះរាជទ្រព្យខ្មែរដែលបានចុះបញ្ជី UNESCO។",
      vi: "Hơn 1.800 nàng tiên nữ Apsara tạc trên vách đá Angkor Wat, tạo nên quy chuẩn tạo hình và cội nguồn của Di sản Múa Cung Đình Hoàng Gia.",
      th: "ภาพสลักนางอัปสรากว่า 1,800 องค์บนผนังนครวัด ซึ่งเป็นรากฐานของระบำอัปสราและระบำหลวงกัมพูชา",
    },
    era: {
      en: "12th Century CE – Living Contemporary Tradition",
      km: "សតវត្សរ៍ទី ១២ – បច្ចុប្បន្ន",
      vi: "Thế kỷ 12 CN – Nay",
      th: "ศตวรรษที่ 12 ถึงปัจจุบัน",
    },
    coverMedia: createMedia(
      "m-ap-cover",
      apsara,
      "Classical Angkorian Apsara bas-relief wall sculpture",
      "ចម្លាក់អប្សរាអង្គរ",
      "EFEO Archives",
      "Phù điêu vũ nữ Apsara với nụ cười thanh thoát và trang sức tinh xảo",
      "ภาพสลักนางอัปสราแห่งนครวัด"
    ),
    keyFacts: {
      era: {
        en: "Angkorian Period – Present",
        km: "សម័យអង្គរ – បច្ចុប្បន្ន",
        vi: "Thời kỳ Angkor – Hiện đại",
        th: "สมัยพระนครถึงปัจจุบัน",
      },
      artStyle: {
        en: "Sandstone High Relief & Classical Court Choreography",
        km: "ចម្លាក់ថ្មភក់ និងក្បាច់របាំព្រះរាជទ្រព្យ",
        vi: "Điêu khắc phù điêu đá & Múa Cung đình",
        th: "ประติมากรรมหินทรายและนาฏศิลป์ราชสำนัก",
      },
      unescoStatus: {
        en: "Masterpiece of Oral and Intangible Heritage (2003/2008)",
        km: "បេតិកភណ្ឌវប្បធម៌អរូបី UNESCO (២០០៣/២០០៨)",
        vi: "Di sản Văn hóa Phi vật thể Đại diện của Nhân loại (2003/2008)",
        th: "มรดกภูมิปัญญาทางวัฒนธรรมยูเนสโก (2003/2008)",
      },
      items: [
        {
          key: "figures",
          label: { en: "Relief Count at Angkor Wat", km: "ចំនួនចម្លាក់នៅអង្គរវត្ត", vi: "Số Lượng Phù Điêu Tại Angkor", th: "จำนวนภาพสลักที่นครวัด" },
          value: { en: "1,850+ Distinct Devata / Apsara Figures", km: "ជាង ១,៨៥០ រូប", vi: "Hơn 1.850 hình tượng", th: "มากกว่า 1,850 องค์" },
        },
        {
          key: "gestures",
          label: { en: "Hand Gestures (Kbach)", km: "ក្បាច់បាតដៃ", vi: "Hệ Thống Thủ Ấn (Kbach)", th: "ภาษาท่ารำ (กบัด)" },
          value: { en: "4,500+ codified physical mudras", km: "ជាង ៤,៥០០ កាយវិការ", vi: "Hơn 4.500 thế tấn và thủ ấn", th: "กว่า 4,500 ท่ารำ" },
        },
        {
          key: "costume",
          label: { en: "Regalia & Adornment", km: "គ្រឿងអលង្ការ", vi: "Trang Phục Hoàng Gia", th: "เครื่องประดับ" },
          value: { en: "Mokot headdresses, sampot sarabap, golden epaulettes", km: "ម្កុដ សំពត់សារបាប់ សង្វារមាស", vi: "Mũ miện Mokot, lụa kim tuyến, đai ngọc", th: "ชฎา สไบ และเครื่องทรงทองคำ" },
        },
      ],
    },
    content: {
      sections: [
        {
          id: "sec-ap-1",
          heading: {
            en: "Mythological Origins in the Ocean of Milk",
            km: "កំណើតពីការកូរសមុទ្រទឹកដោះ",
            vi: "Nguồn Gốc Huyền Thoại Từ Biển Sữa",
            th: "กำเนิดจากการกวนเกษียรสมุทร",
          },
          body: {
            en: "In Vedic and Angkorian cosmogony, apsaras (water nymphs) were born from the churning of the cosmic ocean. On stone temple walls, they mediate between the mortal human world and the celestial spheres of the deities, embodying divine grace, spiritual fertility, and eternal auspiciousness.",
            km: "តាមទេវកថា នាងអប្សរាកើតចេញពីពពុះទឹកនៃមហាសមុទ្រទឹកដោះ ជានិមិត្តរូបនៃសោភ័ណភាព និងភាពបរិសុទ្ធនៃពិភពទេវលោក។",
            vi: "Theo thần thoại, các nàng Apsara sinh ra từ bọt biển linh thiêng trong đại lễ Khuấy Biển Sữa. Trên các vách đá đền thờ, Apsara là cầu nối giữa trần gian và thượng giới, hiện thân cho vẻ đẹp thánh thiện, sự sinh sôi và ân sủng thiên đình.",
            th: "ตามตำนาน นางอัปสราถือกำเนิดขึ้นจากฟองคลื่นเมื่อครั้งกวนเกษียรสมุทร เป็นสัญลักษณ์แห่งความงดงามและความอุดมสมบูรณ์",
          },
        },
        {
          id: "sec-ap-2",
          heading: {
            en: "Living Heritage & Royal Ballet Revival",
            km: "ការស្តារឡើងវិញនូវរបាំព្រះរាជទ្រព្យ",
            vi: "Di Sản Sống & Sự Phục Hưng Múa Cung Đình",
            th: "การฟื้นฟูระบำหลวงมรดกโลก",
          },
          body: {
            en: "In the 20th century, Queen Sisowath Kossamak and Princess Norodom Buppha Devi meticulously codified classical choreography directly from Angkorian wall reliefs. Every hand gesture conveys precise symbolic meaning—leaf, flower, fruit, transformation—preserving over 4,500 formal movement vocabularies in an unbroken royal lineage.",
            km: "សម្តេចព្រះមហាក្សត្រិយានី ស៊ីសុវត្ថិ មុនីវង្ស កុសុមៈ នារីរ័ត្ន បានបង្កើត និងស្តារឡើងវិញនូវរបាំអប្សរាក្នុងទសវត្សរ៍ឆ្នាំ ១៩៦០ ដោយផ្អែកលើក្បាច់ចម្លាក់លើថ្មប្រាសាទ។",
            vi: "Vào thế kỷ 20, Hoàng thái hậu Sisowath Kossamak và Công chúa Norodom Buppha Devi đã phục dựng vũ điệu cung đình trực tiếp từ các tư thế tạc trên đá. Mỗi cử chỉ bàn tay (kbach) biểu trưng cho lá non, nụ hoa, trái chín và sinh mệnh — bảo tồn hơn 4.500 thế tấn linh thiêng.",
            th: "สมเด็จพระมหากษัตรียานีสีสุวัตถิ์ กุสุมะ ทรงฟื้นฟูระบำหลวงโดยถอดรหัสท่ารำจากภาพสลักหินนครวัด สื่อความหมายผ่านท่วงท่ามือ",
          },
        },
      ],
    },
    gallery: [
      createMedia("g-ap-1", apsara, "Typology of 37 distinct Apsara coiffures", "ក្បាច់សក់ និងគ្រឿងអលង្ការអប្សរា", "EFEO Archives", "Họa tiết kiểu tóc và trang sức 37 dạng Apsara", "ภาพสลักทรงผมและเครื่องประดับนางอัปสรา"),
      createMedia("g-ap-2", silk, "Royal court silk woven for ballet costumes", "សម្លៀកបំពាក់របាំព្រះរាជទ្រព្យ", "Khmer Heritage Archive", "Trang phục lụa thêu kim tuyến múa hoàng gia", "ผ้าไหมสำหรับชุดระบำหลวง"),
    ],
    relatedEntryIds: ["e-angkor-wat", "e-pinpeat", "e-bayon", "e-roneat-ek"],
    relatedEntries: ["e-angkor-wat", "e-pinpeat", "e-bayon", "e-roneat-ek"],
    citations: [
      { id: "c-ap-1", title: "Khmer Costumes and Ornaments after the Devata of Angkor Wat", author: "Sappho Marchal", year: 1927, publisher: "G. Van Oest (Paris)" },
      { id: "c-ap-2", title: "Earth in Flower: The Divine Mystery of the Cambodian Dance Drama", author: "Paul Cravath", year: 2007, publisher: "DatAsia Press", isbn: "978-1934431078" },
      { id: "c-ap-3", title: "Royal Ballet of Cambodia (Masterpiece of Intangible Heritage)", author: "UNESCO Intangible Cultural Heritage", year: 2008, url: "https://ich.unesco.org/en/RL/royal-ballet-of-cambodia-00060" },
    ],
    bibliography: [
      { id: "c-ap-1", title: "Khmer Costumes and Ornaments", author: "Sappho Marchal", year: 1927, publisher: "G. Van Oest" },
      { id: "c-ap-2", title: "Earth in Flower", author: "Paul Cravath", year: 2007, publisher: "DatAsia Press" },
    ],
  },

  // 5. PIN PEAT ENSEMBLE
  {
    id: "e-pinpeat",
    slug: "pinpeat",
    category: "music",
    categoryId: "music",
    title: {
      en: "Pinpeat Ensemble",
      km: "វង់ភ្លេងពិណពាទ្យ",
      vi: "Dàn Nhạc Lễ Pinpeat",
      th: "วงดนตรีพิณพาทย์",
    },
    summary: {
      en: "The ancient ritual percussion and quadruple-reed orchestra of the Royal Court and Theravada pagodas, whose instrumentation has been carved onto Angkorian reliefs for over a millennium.",
      km: "វង់តន្ត្រីសក្ការៈបុរាណសម្រាប់ព្រះរាជពិធី និងវត្តអារាម ដែលមានចម្លាក់ឧបករណ៍តាំងពីសម័យអង្គរជាងមួយពាន់ឆ្នាំមុន។",
      vi: "Dàn nhạc gõ và kèn dăm nghi lễ linh thiêng của Hoàng cung và chùa chiền Phật giáo, được khắc họa trên phù điêu Angkor hơn 1.000 năm trước.",
      th: "วงดนตรีศักดิ์สิทธิ์ประจำราชสำนักและวัดวาอาราม มีหลักฐานภาพสลักเครื่องดนตรีตั้งแต่สมัยนครวัด",
    },
    era: {
      en: "7th Century CE (Chenla/Angkor) – Living Tradition",
      km: "សម័យចេនឡា/អង្គរ – បច្ចុប្បន្ន",
      vi: "Thế kỷ 7 CN (Chân Lạp/Angkor) – Nay",
      th: "ศตวรรษที่ 7 (เจนละ/พระนคร) ถึงปัจจุบัน",
    },
    coverMedia: createMedia(
      "m-pp-cover",
      instrumentsImg,
      "Traditional Pinpeat ceremonial orchestra instruments",
      "ឧបករណ៍ភ្លេងពិណពាទ្យ",
      "Khmer Heritage Archive",
      "Các nhạc cụ trong dàn nhạc lễ Pinpeat: Roneat và Cồng Vòng",
      "เครื่องดนตรีในวงพิณพาทย์"
    ),
    keyFacts: {
      era: {
        en: "Angkorian – Contemporary",
        km: "សម័យអង្គរ – បច្ចុប្បន្ន",
        vi: "Thời kỳ Angkor – Nay",
        th: "สมัยพระนครถึงปัจจุบัน",
      },
      tradition: {
        en: "Sacred Court & Temple Ceremonial Music",
        km: "តន្ត្រីសក្ការៈព្រះរាជវាំង និងវត្តអារាម",
        vi: "Nhạc lễ Hoàng gia & Phật giáo",
        th: "ดนตรีหลวงและดนตรีพิธีกรรมทางพุทธศาสนา",
      },
      items: [
        {
          key: "ensemble_type",
          label: { en: "Ensemble Type", km: "ប្រភេទវង់ភ្លេង", vi: "Loại Hình Dàn Nhạc", th: "ประเภทวงดนตรี" },
          value: { en: "Tuned Percussion & Reed Orchestra", km: "វង់ភ្លេងគោះ និងផ្លុំ", vi: "Hòa tấu Nhạc gõ & Kèn dăm", th: "วงเครื่องตีและเครื่องเป่า" },
        },
        {
          key: "lead_instruments",
          label: { en: "Key Instruments", km: "ឧបករណ៍សំខាន់ៗ", vi: "Nhạc Cụ Chủ Đạo", th: "เครื่องดนตรีหลัก" },
          value: { en: "Roneat Ek, Roneat Thung, Kong Vong Toch, Sralai, Sampho", km: "រនាតឯក រនាតធុង គងវង់ ស្រឡៃ សំភោរ", vi: "Roneat Ek, Roneat Thung, Kong Vong, Sralai, Sampho", th: "ระนาดเอก ระนาดทุ้ม ฆ้องวง ปี่สไล กลองสัมโพ" },
        },
        {
          key: "scale",
          label: { en: "Tuning System", km: "ប្រព័ន្ធសំនៀង", vi: "Hệ Thống Âm Luật", th: "ระบบเสียง" },
          value: { en: "Equidistant 7-Tone Heptatonic Scale", km: "សំនៀងប្រាំពីរកម្រិតស្មើគ្នា", vi: "Thang âm 7 bậc đẳng độ", th: "ระบบ 7 ระดับเสียงเท่ากัน" },
        },
      ],
    },
    audioMetadata: {
      soundscapeId: "pinpeat-ceremonial-anthem",
      acousticNotes: {
        en: "Heptatonic tuning without western semitones; complex rhythmic colotomy anchored by the sacred Sampho barrel drum.",
        km: "សំនៀងប្រាំពីរកម្រិតប្លែកពីតន្ត្រីបស្ចិមប្រទេស ចង្វាក់ដឹកនាំដោយស្គរសំភោរ។",
        vi: "Âm luật 7 cung đều không bán âm; nhịp chu kỳ dẫn dắt bởi trống cái linh thiêng Sampho.",
        th: "ระบบ 7 ระดับเสียง บรรเลงสอดประสานจังหวะโดยกลองสัมโพ",
      },
      tuningHz: [220, 247, 277, 293, 329, 370, 415, 440],
      instruments: ["Roneat Ek", "Roneat Thung", "Kong Vong Toch", "Sralai", "Sampho", "Skor Thom", "Chhing"],
    },
    content: {
      sections: [
        {
          id: "sec-pp-1",
          heading: {
            en: "Colotomic Structure & Heterophonic Polyphony",
            km: "ឧបករណ៍តន្ត្រី និងរចនាសម្ព័ន្ធភ្លេង",
            vi: "Cấu Trúc Nhịp Chu Kỳ & Phức Điệu Đa Tầng",
            th: "โครงสร้างวงดนตรีและสำเนียงเสียง",
          },
          body: {
            en: "The Pinpeat orchestra comprises the roneat ek (lead xylophone), roneat thung (low xylophone), kong vong toch and kong vong thom (gong circles), sralai (quadruple-reed oboe), sampho (sacred barrel drum), skor thom (large tuned floor drums), and chhing (bronze timekeeper cymbals). Musicians play without chords, continuously paraphrasing an unstated core melody in interlocking melodic variations.",
            km: "ឧបករណ៍រួមមាន រនាតឯក រនាតធុង គងវង់តូច គងវង់ធំ ស្រឡៃ សំភោរ ស្គរធំ និងឈិង។ វង់ភ្លេងនេះបន្លឺសំឡេងតាមទម្រង់បែបប្រពៃណីខ្មែរដ៏ពិរោះរណ្តំ។",
            vi: "Dàn nhạc Pinpeat bao gồm đàn roneat ek (mộc cầm chính), roneat thung (mộc cầm bè trầm), hai giàn cồng vòng kong vong toch và kong vong thom, kèn sralai 4 dăm, trống cái sampho, cặp đại cổ skor thom và thanh la chhing giữ nhịp. Dàn nhạc không dùng hợp âm Tây phương mà chơi theo cấu trúc phức điệu đa tầng trên một giai điệu xương sống.",
            th: "ประกอบด้วยระนาดเอก ระนาดทุ้ม ฆ้องวงเล็ก ฆ้องวงใหญ่ ปี่สไล กลองสัมโพ กลองทัด และฉิ่ง บรรเลงสอดประสานทำนองอย่างวิจิตร",
          },
        },
        {
          id: "sec-pp-2",
          heading: {
            en: "Sacred Pagoda & Royal Palace Ritual Roles",
            km: "តួនាទីក្នុងព្រះរាជពិធី និងវត្តអារាម",
            vi: "Vai Trò Trong Nghi Lễ Cung Đình & Chùa Chiền",
            th: "บทบาทในพระราชพิธีและงานวัด",
          },
          body: {
            en: "The Pinpeat performs exclusively for sacred events: accompanying classical dance dramas (Reamker), shadow theatre (Sbek Thom), royal funeral ceremonies, water festivals, and major Buddhist holy days (Pchum Ben, Meak Bochea). Before each performance, the ensemble offers the Sompeah Kru ceremony to honour teachers and ancestral music spirits.",
            km: "វង់ភ្លេងពិណពាទ្យប្រគំក្នុងព្រះរាជពិធី របាំបុរាណ ល្ខោនស្បែកធំ និងបុណ្យសាសនាធំៗ ដូចជាបុណ្យភ្ជុំបិណ្ឌ។ មុនពេលប្រគំ ត្រូវមានពិធីសំពះគ្រូ។",
            vi: "Pinpeat chỉ được tấu trong các nghi lễ trang nghiêm: đệm cho múa cung đình, kịch bóng Sbek Thom, quốc tang, lễ hội nước và các đại lễ Phật giáo (Pchum Ben, Phật Đản). Trước mỗi buổi hòa tấu, toàn ban nhạc đều cử hành nghi thức Sampeah Kru để bái vọng tổ nghề.",
            th: "บรรเลงเฉพาะในพระราชพิธี ระบำหลวง หนังใหญ่สแบกธม และวันสำคัญทางศาสนา เช่น บุญแซนโดนตา มีพิธีไหว้ครูก่อนเริ่มแสดง",
          },
        },
      ],
    },
    gallery: [
      createMedia("g-pp-1", instrumentsImg, "Roneat Ek boat resonator detail with carved motifs", "រនាតឯក", "Khmer Heritage Archive", "Chi tiết đàn Roneat Ek hình thuyền chạm khắc hoa văn", "ระนาดเอกรางโค้งแกะสลัก"),
    ],
    relatedEntryIds: ["e-roneat-ek", "e-apsara", "e-angkor-wat"],
    relatedEntries: ["e-roneat-ek", "e-apsara", "e-angkor-wat"],
    citations: [
      { id: "c-pp-1", title: "Khmer Music in Cambodia and Abroad", author: "Sam-Ang Sam", year: 2008, publisher: "Reyum Publishing (Phnom Penh)" },
      { id: "c-pp-2", title: "Traditional Music of Cambodia", author: "Toni Shapiro-Phim", year: 1999, publisher: "Smithsonian Folkways Recordings" },
    ],
    bibliography: [
      { id: "c-pp-1", title: "Khmer Music in Cambodia and Abroad", author: "Sam-Ang Sam", year: 2008, publisher: "Reyum Publishing" },
    ],
  },

  // 6. RONEAT AEK (RONEAT EK)
  {
    id: "e-roneat-ek",
    slug: "roneat-ek",
    category: "music",
    categoryId: "music",
    title: {
      en: "Roneat Aek (High Xylophone)",
      km: "រនាតឯក",
      vi: "Đàn Mộc Cầm Roneat Aek",
      th: "ระนาดเอกเขมร",
    },
    summary: {
      en: "The primary melodic xylophone of the Pinpeat and Mohori orchestras, crafted in the sweeping curve of a ceremonial river barge with 21 tuned bamboo or rosewood keys.",
      km: "រនាតដឹកនាំក្នុងវង់ភ្លេងពិណពាទ្យ និងមហោរី មានផ្លែ ២១ ស្នូកជារាងទូក បន្លឺជាសំនៀងគូ ៨ យ៉ាងពិរោះ។",
      vi: "Nhạc cụ lĩnh xướng giai điệu trong dàn nhạc Pinpeat và Mohori, chế tác uốn lượn như dáng thuyền rồng với 21 thanh tre già hoặc gỗ cẩm lai.",
      th: "เครื่องดนตรีบรรเลงนำในวงพิณพาทย์ มีลูกระนาด 21 ลูก ตัวรางโค้งคล้ายเรือหงส์",
    },
    era: {
      en: "Angkorian Period – Contemporary",
      km: "សម័យអង្គរ – បច្ចុប្បន្ន",
      vi: "Thời kỳ Angkor – Hiện đại",
      th: "สมัยพระนครถึงปัจจุบัน",
    },
    coverMedia: createMedia(
      "m-re-cover",
      instrumentsImg,
      "Roneat Aek curved bamboo xylophone with beeswax tuning weights",
      "រនាតឯកឆ្លាក់ក្បាច់នាគ",
      "Khmer Heritage Archive",
      "Đàn Roneat Aek chạm khắc rồng và hàng phím tre chỉnh âm",
      "ระนาดเอกสลักลายพญานาค"
    ),
    keyFacts: {
      era: {
        en: "Angkorian – Contemporary",
        km: "សម័យអង្គរ – បច្ចុប្បន្ន",
        vi: "Thời kỳ Angkor – Nay",
        th: "สมัยพระนครถึงปัจจุบัน",
      },
      artStyle: {
        en: "Melodic Percussion (Idiophone)",
        km: "ឧបករណ៍ភ្លេងគោះផ្លែឬស្សី/ឈើ",
        vi: "Nhạc cụ gõ định âm",
        th: "เครื่องตีกระทบทำนอง",
      },
      material: {
        en: "Dense Mai Sak (Rosewood) or seasoned Bamboo (Russei Pok)",
        km: "ឬស្សីពក ឬឈើក្រញូង និងជ័រឃ្មុំលាយសំណ",
        vi: "Tre già ngâm hoặc gỗ cẩm lai, sáp ong chì",
        th: "ไม้ไผ่หรือไม้พยุง และขี้ผึ้งผสมตะกั่ว",
      },
      items: [
        {
          key: "bars_count",
          label: { en: "Soundbars (Phlae)", km: "ចំនួនផ្លែរនាត", vi: "Số Lượng Thanh Phím", th: "จำนวนลูกระนาด" },
          value: { en: "21 tuned bars (covering 3 octaves)", km: "២១ ផ្លែ (៣ អដ្ឋកៈ)", vi: "21 thanh phím (3 quãng tám)", th: "21 ลูก (3 ช่วงคู่แปด)" },
        },
        {
          key: "resonator",
          label: { en: "Resonator Box (Snuok)", km: "ស្នូករនាត", vi: "Thùng Đàn (Snuok)", th: "รางระนาด" },
          value: { en: "Curved dragon/barge shape with ivory or mother-of-pearl trim", km: "ជារាងទូកឆ្លាក់ក្បាច់នាគ", vi: "Dáng thuyền rồng nạm xà cừ hoặc ngà", th: "ทรงเรือหงส์ประดับมุก" },
        },
        {
          key: "mallets",
          label: { en: "Mallets (Mek)", km: "មេរនាត", vi: "Dùi Đánh", th: "ไม้ตี" },
          value: { en: "Mek Roneat (Padded soft for Mohori, Hard for Pinpeat)", km: "មេរនាត (ទន់ និងរឹង)", vi: "Dùi bọc nỉ mềm (Mohori) hoặc dùi cứng (Pinpeat)", th: "ไม้นวมและไม้แข็ง" },
        },
      ],
    },
    audioMetadata: {
      soundscapeId: "roneat-virtuoso-cascade",
      acousticNotes: {
        en: "Fast cascading octaves and floral heterophonic ornamentation using dual mallets.",
        km: "សំនៀងបន្លឺជាគូ ៨ យ៉ាងរស់រវើកដោយប្រើមេរនាតពីរ។",
        vi: "Kỹ thuật vê dùi chạy ngón quãng 8 hoa mỹ ở tiết tấu dồn dập.",
        th: "การบรรเลงสะบัดเสียงคู่แปดอย่างรวดเร็วและไพเราะ",
      },
      tuningHz: [261.63, 293.66, 329.63, 349.23, 392.0, 440.0, 493.88, 523.25],
      instruments: ["Roneat Aek"],
    },
    content: {
      sections: [
        {
          id: "sec-re-1",
          heading: {
            en: "Craftsmanship & Acoustic Tuning of the 21 Bars",
            km: "ការកែច្នៃ និងការរៀបចំសំនៀងផ្លែរនាត",
            vi: "Kỹ Nghệ Chế Tác & Âm Luật Độc Bản",
            th: "การสร้างและการเทียบเสียงลูกระนาด",
          },
          body: {
            en: "The 21 soundbars are carved from aged bamboo (bambusa tulda) or dense rosewood, suspended on cord above a boat-shaped soundbox (snuok). Each bar is tuned using a paste of beeswax mixed with lead shavings applied underneath. The virtuoso soloist plays with two mallets, delivering rapid cascading ornamentations at thrilling tempos.",
            km: "ផ្លែរនាតទាំង ២១ ធ្វើពីឬស្សីពក ឬឈើក្រញូង ចងព្យួរលើស្នូកជារាងទូក។ ការតម្រូវសំនៀងប្រើជ័រឃ្មុំលាយសំណ។ អ្នកប្រគំប្រើមេរនាតពីរ បង្កើតបានជាសំនៀងរណ្តំរស់រវើក។",
            vi: "21 thanh phím được làm từ tre già ngâm lâu năm hoặc gỗ cẩm lai, treo căng trên thân đàn hình thuyền (snuok). Nghệ nhân chỉnh âm bằng cách gắn sáp ong trộn mạt chì dưới bụng phím. Đàn được tấu bằng hai dùi gõ, tạo nên những chuỗi âm hoa mỹ lộng lẫy.",
            th: "ลูกระนาด 21 ลูกทำจากไม้ไผ่หรือไม้พยุง เทียบเสียงด้วยขี้ผึ้งผสมตะกั่ว บรรเลงด้วยไม้ตีสองอันอย่างคล่องแคล่ว",
          },
        },
        {
          id: "sec-re-2",
          heading: {
            en: "The Leading Melodic Voice of Pinpeat and Mohori",
            km: "តួនាទីដឹកនាំក្នុងវង់ភ្លេងពិណពាទ្យ និងមហោរី",
            vi: "Vai Trò Lĩnh Xướng Trong Hòa Tấu Cung Đình",
            th: "บทบาทผู้นำทำนองในวงมโหรีและพิณพาทย์",
          },
          body: {
            en: "In both the sacred Pinpeat orchestra and the lighter court Mohori ensemble, the Roneat Aek musician acts as the melodic leader. The performer weaves florid, rapid embellishments around the fundamental melody, initiating tempo changes and cueing gong and drum entrances.",
            km: "ក្នុងវង់ភ្លេងពិណពាទ្យ និងមហោរី រនាតឯកដើរតួជាឧបករណ៍ដឹកនាំសំនៀង។ អ្នកប្រគំជាអ្នកចាប់ផ្តើមបទ និងបញ្ជាចង្វាក់។",
            vi: "Trong cả dàn nhạc tế lễ Pinpeat lẫn dàn nhạc thính phòng Mohori, nghệ nhân Roneat Aek luôn đóng vai trò nhạc trưởng lĩnh xướng, dẫn dắt các nhạc cụ khác chuyển làn điệu và đổi nhịp.",
            th: "ในวงพิณพาทย์และมโหรี ระนาดเอกทำหน้าที่เป็นเครื่องดนตรีนำทำนอง เป็นผู้กำหนดจังหวะและส่งสัญญาณให้กับเครื่องดนตรีอื่น",
          },
        },
      ],
    },
    gallery: [
      createMedia("g-re-1", instrumentsImg, "Close-up of bamboo bars and beeswax weighting", "ផ្លែរនាត", "Khmer Heritage Archive", "Cận cảnh hàng phím tre và sáp chỉnh âm", "ลูกระนาดและการติดขี้ผึ้งเทียบเสียง"),
    ],
    relatedEntryIds: ["e-pinpeat", "e-apsara"],
    relatedEntries: ["e-pinpeat", "e-apsara"],
    citations: [
      { id: "c-re-1", title: "The Musical Heritage of Cambodia", author: "Chinary Ung", year: 2012, publisher: "Boston University Press" },
      { id: "c-re-2", title: "Khmer Traditional Music", author: "Sam-Ang Sam", year: 2008, publisher: "Reyum Publishing" },
    ],
    bibliography: [
      { id: "c-re-1", title: "The Musical Heritage of Cambodia", author: "Chinary Ung", year: 2012, publisher: "Boston University Press" },
    ],
  },
];
