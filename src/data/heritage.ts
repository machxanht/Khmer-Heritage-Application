import angkorWat from "../assets/angkor-wat.jpg";
import apsara from "../assets/apsara.jpg";
import bayon from "../assets/bayon.jpg";
import banteaySrei from "../assets/banteay-srei.jpg";
import instrumentsImg from "../assets/instruments.jpg";
import silk from "../assets/silk.jpg";
import { sampleEntries, curatedCorpus } from "./sampleEntries.ts";
import type {
  Category,
  EntryDetail,
  EraBand,
  HeritageSite,
  Instrument,
  MediaAsset,
  Trail,
} from "./types.ts";

export { sampleEntries, curatedCorpus };

export const IMAGES = {
  angkorWat,
  apsara,
  bayon,
  banteaySrei,
  instruments: instrumentsImg,
  silk,
};

export const media = (
  id: string,
  url: string,
  en: string,
  km: string,
  creator: string,
  vi?: string,
  th?: string
): MediaAsset => ({
  id,
  url,
  thumbnailUrl: url,
  type: "image",
  title: { en, km, vi: vi || en, th: th || en },
  creator,
  source: "Khmer Heritage Archive / EFEO / UNESCO",
  sourceUrl: "https://whc.unesco.org/en/list/668/",
  license: "cc_by_sa",
  licenseUrl: "https://creativecommons.org/licenses/by-sa/4.0/",
  attribution: `${creator} — Khmer Heritage Archive, CC BY-SA 4.0`,
});

/**
 * 12 Standard Heritage Categories aligned with Master Plan:
 * 1. Đền tháp & Kiến trúc (Temples & Architecture)
 * 2. Lịch sử & Vương triều (History & Dynasties)
 * 3. Nghệ thuật & Điêu khắc (Arts & Sculpture)
 * 4. Nhạc cụ & Âm nhạc (Music & Instruments)
 * 5. Lễ hội & Nghi lễ (Festivals & Rituals)
 * 6. Chữ viết & Ngôn ngữ (Script & Epigraphy)
 * 7. Trang phục & Dệt may (Costumes & Textiles)
 * 8. Ẩm thực (Cuisine & Gastronomy)
 * 9. Nghề thủ công (Crafts & Artisan Traditions)
 * 10. Địa danh (Landmarks & Geography)
 * 11. Nhân vật & Vương quyền (Historical Figures & Kings)
 * 12. Thần thoại & Tín ngưỡng (Mythology & Beliefs)
 */
export const categories: Category[] = [
  {
    id: "temples",
    slug: "temples",
    title: {
      en: "Temples & Architecture",
      km: "ប្រាសាទ និងស្ថាបត្យកម្ម",
      vi: "Đền tháp & Kiến trúc",
      th: "ปราสาทและสถาปัตยกรรม",
    },
    blurb: {
      en: "Angkor Wat · Bayon · Banteay Srei · Temple-mountains",
      km: "អង្គរវត្ត បាយ័ន បន្ទាយស្រី ប្រាសាទភ្នំ",
      vi: "Angkor Wat · Bayon · Banteay Srei · Kiến trúc đền núi",
      th: "นครวัด บายอน บันทายศรี ปราสาททรงภูเขา",
    },
    description: {
      en: "Sacred stone sanctuaries, hydraulic barays, moats, and monumental cosmograms raised across the Angkorian Empire.",
      km: "សំណង់ប្រាសាទថ្មសក្ការៈ បារាយណ៍ទឹក និងគំរូចក្រវាឡវិទ្យាដែលបានស្ថាបនាក្នុងចក្រភពអង្គរ។",
      vi: "Những thánh địa đá linh thiêng, hệ thống hồ baray thủy lợi và mô hình tiểu vũ trụ học của đế chế Angkor.",
      th: "ปราสาทหินศักดิ์สิทธิ์ บาราย และแบบจำลองจักรวาลวิทยาของจักรวรรดิเขมร",
    },
    iconName: "Landmark",
    sortOrder: 1,
    count: 128,
  },
  {
    id: "history",
    slug: "history",
    title: {
      en: "History & Dynasties",
      km: "សម័យកាលប្រវត្តិសាស្ត្រ",
      vi: "Lịch sử & Vương triều",
      th: "ประวัติศาสตร์และราชวงศ์",
    },
    blurb: {
      en: "Funan · Chenla · Angkor Empire · Post-Angkorian",
      km: "ហ្វូណន ចេនឡា ចក្រភពអង្គរ ក្រោយសម័យអង្គរ",
      vi: "Phù Nam · Chân Lạp · Đế chế Angkor · Thời kỳ Hậu Angkor",
      th: "ฟูนัน เจนละ จักรวรรดิเขมร ยุคหลังพระนคร",
    },
    description: {
      en: "Chronological evolution of Khmer civilization from prehistoric bronze culture through the mighty Angkorian hegemony.",
      km: "ការវិវត្តនៃអរិយធម៌ខ្មែរតាមសម័យកាល ចាប់ពីយុគសំរិទ្ធរហូតដល់សម័យមហានគរដ៏រុងរឿង។",
      vi: "Tiến trình phát triển văn minh Khmer từ văn hóa đồng thau sơ sử đến thời kỳ cực thịnh của đế quốc Angkor.",
      th: "วิวัฒนาการทางประวัติศาสตร์ของอารยธรรมเขมรตั้งแต่ยุคก่อนประวัติศาสตร์จนถึงยุคทอง",
    },
    iconName: "History",
    sortOrder: 2,
    count: 42,
  },
  {
    id: "arts",
    slug: "arts",
    title: {
      en: "Arts & Sculpture",
      km: "សិល្បៈ និងចម្លាក់",
      vi: "Nghệ thuật & Điêu khắc",
      th: "ศิลปะและประติมากรรม",
    },
    blurb: {
      en: "Apsara dancers · Bas-reliefs · Kbach ornamentation · Bronzes",
      km: "របាំអប្សរា ចម្លាក់ក្រឡោតទាប ក្បាច់រចនា សំរិទ្ធ",
      vi: "Vũ nữ Apsara · Phù điêu nổi · Hoa văn Kbach · Đúc đồng",
      th: "นางอัปสรา ภาพสลักนูนต่ำ ลวดลายกบัด สำริด",
    },
    description: {
      en: "Iconic stone bas-reliefs, bronze deity castings, and the courtly gestures preserved in Classical Royal Ballet.",
      km: "ចម្លាក់ថ្មក្រឡោតទាប រូបបដិមាសំរិទ្ធ និងកាយវិការនៃរបាំព្រះរាជទ្រព្យបុរាណ។",
      vi: "Các bức phù điêu sa thạch, tượng đồng thần thánh và nghệ thuật múa Cung đình Hoàng gia.",
      th: "ภาพสลักนูนต่ำ ประติมากรรมสำริด และระบำหลวงโบราณ",
    },
    iconName: "Palette",
    sortOrder: 3,
    count: 87,
  },
  {
    id: "music",
    slug: "music",
    title: {
      en: "Music & Instruments",
      km: "តន្ត្រី និងឧបករណ៍បុរាណ",
      vi: "Nhạc cụ & Âm nhạc",
      th: "ดนตรีและเครื่องดนตรี",
    },
    blurb: {
      en: "Pinpeat · Mohori · Chapei Dang Veng · Roneat Ek",
      km: "ពិណពាទ្យ មហោរី ចាប៉ីដងវែង រនាតឯក",
      vi: "Dàn nhạc Pinpeat · Mohori · Đàn Chapei · Roneat Ek",
      th: "วงพิณพาทย์ มโหรี จะเข้จะเปย ระนาดเอก",
    },
    description: {
      en: "Sacred temple orchestras, colotomic gong cycles, oral epic bards, and ancient acoustic resonance systems.",
      km: "វង់តន្ត្រីសក្ការៈបុរាណ ចង្វាក់គងវង់ និងចម្រៀងកំណាព្យចាប៉ីដងវែង។",
      vi: "Dàn nhạc nghi lễ hoàng gia, cấu trúc cồng chiêng chu kỳ, hát kể sử thi và hệ thống âm luật cổ truyền.",
      th: "วงดนตรีหลวงโบราณ พิณพาทย์ มโหรี และการขับลำนำโบราณ",
    },
    iconName: "Music4",
    sortOrder: 4,
    count: 34,
  },
  {
    id: "rituals",
    slug: "rituals",
    title: {
      en: "Festivals & Rituals",
      km: "ពិធីបុណ្យ និងទំនៀមទម្លាប់",
      vi: "Lễ hội & Nghi lễ",
      th: "เทศกาลและพิธีกรรม",
    },
    blurb: {
      en: "Pchum Ben · Khmer New Year · Bon Om Touk · Royal Ploughing",
      km: "ភ្ជុំបិណ្ឌ ចូលឆ្នាំខ្មែរ បុណ្យអុំទូក ច្រត់ព្រះនង្គ័ល",
      vi: "Pchum Ben · Tết Choul Chnam Thmey · Bon Om Touk · Lễ cày Tịch điền",
      th: "แซนโดนตา สงกรานต์ ลอยกระทงเขมร พิธีแรกนาขวัญ",
    },
    description: {
      en: "Sacred seasonal transitions, ancestor commemoration ceremonies, and royal agrarian invocations.",
      km: "ពិធីបុណ្យតាមរដូវកាល ការឧទ្ទិសកុសលដល់បុព្វការីជន និងព្រះរាជពិធីប្រពៃណីជាតិ។",
      vi: "Các nghi lễ chu kỳ nông nghiệp, tưởng niệm tổ tiên linh thiêng và lễ hội cộng đồng truyền thống.",
      th: "ประเพณีตามฤดูกาล การบูชาบรรพบุรุษ และพระราชพิธีโบราណ",
    },
    iconName: "Sparkles",
    sortOrder: 5,
    count: 29,
  },
  {
    id: "script",
    slug: "script",
    title: {
      en: "Script & Language",
      km: "អក្សរសាស្ត្រ និងសិលាចារឹក",
      vi: "Chữ viết & Ngôn ngữ",
      th: "อักษรศาสตร์และจารึก",
    },
    blurb: {
      en: "Ancient epigraphy · Aksar Mul · Palm-leaf manuscripts · Reamker",
      km: "សិលាចារឹកបុរាណ អក្សរមូល សាស្ត្រាស្លឹករឹត រាមកេរ្តិ៍",
      vi: "Bia ký sa thạch · Chữ Aksar Mul · Bản thảo lá buông · Sử thi Reamker",
      th: "จารึกขอมโบราณ อักษรมูล คัมภีร์ใบลาน รามเกียรติ์",
    },
    description: {
      en: "The ancient Brahmi-derived Khmer script, Sanskrit-Khmer bilingual inscriptions, and monastic palm-leaf codices.",
      km: "ប្រព័ន្ធអក្សរខ្មែរបុរាណពីពុម្ពព្រាហ្មី សិលាចារឹកសំស្ក្រឹត-ខ្មែរ និងគម្ពីរស្លឹករឹត។",
      vi: "Hệ thống chữ Khmer nguồn gốc Brahmi, bi ký đá song ngữ Phạn-Khmer và di sản thư tịch lá buông.",
      th: "ระบบอักษรขอมโบราณ จารึกภาษาสันสกฤตและเขมรโบราណ",
    },
    iconName: "BookOpen",
    sortOrder: 6,
    count: 45,
  },
  {
    id: "costumes",
    slug: "costumes",
    title: {
      en: "Costumes & Textiles",
      km: "សម្លៀកបំពាក់ និងគ្រឿងអលង្ការ",
      vi: "Trang phục & Dệt may",
      th: "เครื่องแต่งกายและผ้าทอ",
    },
    blurb: {
      en: "Sampot Hol · Golden silk ikat · Krama · Court regalia",
      km: "សំពត់ហូល សូត្រមាស ក្រមា គ្រឿងរាជកកុធភណ្ឌ",
      vi: "Váy Sampot Hol · Lụa tơ vàng ikat · Khăn rằn Krama · Phục sức cung đình",
      th: "ผ้ามัดหมี่โฮล ผ้าไหมทอง ผ้าขาวม้ากรามา เครื่องราชกกุธภัณฑ์",
    },
    description: {
      en: "Intricate weft-ikat silk weaving, universal krama utilitarian textiles, and ceremonial court attire.",
      km: "សិល្បៈតម្បាញសូត្រហូលចងកៀវ ក្រមាប្រពៃណី និងគ្រឿងសម្លៀកបំពាក់រាជវាំង។",
      vi: "Kỹ thuật dệt ikat nhuộm màu sợi tinh xảo, khăn rằn Krama đa dụng và phục trang hoàng tộc.",
      th: "ผ้าไหมมัดหมี่โบราณ ผ้าขาวม้ากรามา และเครื่องทรงโบราណ",
    },
    iconName: "Shirt",
    sortOrder: 7,
    count: 51,
  },
  {
    id: "cuisine",
    slug: "cuisine",
    title: {
      en: "Cuisine & Gastronomy",
      km: "ម្ហូបអាហារ និងកសិកម្ម",
      vi: "Ẩm thực truyền thống",
      th: "อาหารและภูมิปัญญาครัว",
    },
    blurb: {
      en: "Amok Trey · Prahok fermentation · Kroeung paste · Tonle Sap bounty",
      km: "អាម៉ុកត្រី ប្រហុក គ្រឿងបុក ផលមច្ឆាទន្លេសាប",
      vi: "Amok Trey hấp lá chuối · Mắm Prahok · Gia vị Kroeung · Thủy sản Biển Hồ",
      th: "ห่อหมกปลาอาม็อก ปลาร้าปรอฮก เครื่องแกงเกรือน ผลผลิตโตนเลสาบ",
    },
    description: {
      en: "Millennia-old freshwater fish preservation, aromatic kroeung spice blends, and ancestral foraging wisdom.",
      km: "បច្ចេកទេសកែច្នៃត្រីទឹកសាបរាប់ពាន់ឆ្នាំ គ្រឿងបុកស្លឹកគ្រៃ និងម្ហូបបុរាណ។",
      vi: "Nghệ thuật lên men cá nước ngọt ngàn năm, củ quả thảo mộc Kroeung và văn hóa ẩm thực Biển Hồ.",
      th: "วัฒนธรรมอาหารจากโตนเลสาบ ปลาร้าปรอฮก และเครื่องเทศสมุนไพร",
    },
    iconName: "Utensils",
    sortOrder: 8,
    count: 38,
  },
  {
    id: "crafts",
    slug: "crafts",
    title: {
      en: "Crafts & Artisan Traditions",
      km: "សិប្បកម្ម និងវិចិត្រសិល្បៈ",
      vi: "Nghề thủ công truyền thống",
      th: "หัตถกรรมและภูมิปัญญาช่าง",
    },
    blurb: {
      en: "Stone masonry · Silverware repoussé · Lacquerware · Pottery",
      km: "ចម្លាក់ថ្ម គ្រឿងប្រាក់ទំពក់ ម្រ័ក្សណ៍ ភាជន៍ដីដុត",
      vi: "Chế tác đá sa thạch · Chạm bạc gò nổi · Đồ sơn mài · Gốm cổ",
      th: "งานสลักหิน เครื่องเงินดุนลาย เครื่องเขิน เครื่องปั้นดินเผา",
    },
    description: {
      en: "Master artisan guilds passing down stone chiseling, repoussé silver smithing, and ceramic kilns.",
      km: "ជំនាញជាងស្មិតឆ្លាក់ថ្មភក់ ជាងទងប្រាក់ និងឡដុតភាជន៍បុរាណ។",
      vi: "Những phường thợ thủ công lưu truyền kỹ thuật đục đá, gò bạc và nung gốm truyền thống.",
      th: "ภูมิปัญญาช่างสลักหิน ช่างเงิน และเตาเผาเครื่องเคลือบโบราណ",
    },
    iconName: "Hammer",
    sortOrder: 9,
    count: 48,
  },
  {
    id: "landmarks",
    slug: "landmarks",
    title: {
      en: "Landmarks & Geography",
      km: "ភូមិសាស្ត្រ និងទីតាំងប្រវត្តិសាស្ត្រ",
      vi: "Địa danh & Thánh địa",
      th: "ภูมิศาสตร์และโบราณสถาน",
    },
    blurb: {
      en: "Phnom Kulen · Tonle Sap · Preah Vihear · Sambor Prei Kuk",
      km: "ភ្នំគូលេន ទន្លេសាប ព្រះវិហារ សំបូរព្រៃគុក",
      vi: "Phnom Kulen · Biển Hồ Tonle Sap · Đền Preah Vihear · Sambor Prei Kuk",
      th: "พนมกุเลน โตนเลสาบ ปราสาทพระวิหาร สมโบร์ไพรกุก",
    },
    description: {
      en: "Sacred mountain ranges, freshwater biodiversity ecosystems, and sprawling archeological complexes.",
      km: "ជួរភ្នំសក្ការៈ បឹងទន្លេសាប និងបណ្តាញបុរាណវិទ្យាដ៏ធំធេង។",
      vi: "Các rặng núi thiêng liêng, hệ sinh thái đầm lầy Biển Hồ và các quần thể khảo cổ học rộng lớn.",
      th: "ภูเขาศักดิ์สิทธิ์ ทะเลสาบโตนเลสาบ และแหล่งโบราณคดีสำคัญ",
    },
    iconName: "MapPin",
    sortOrder: 10,
    count: 56,
  },
  {
    id: "figures",
    slug: "figures",
    title: {
      en: "Historical Figures & Kings",
      km: "ឥស្សរជន និងព្រះមហាក្សត្រ",
      vi: "Nhân vật & Vương triều",
      th: "บุคคลสำคัญและพระมหากษัตริย์",
    },
    blurb: {
      en: "Jayavarman VII · Suryavarman II · Queen Indradevi · King Norodom Sihanouk",
      km: "ព្រះបាទជ័យវរ្ម័នទី ៧ សូរ្យវរ្ម័នទី ២ ព្រះនាងឥន្ទ្រទេវី",
      vi: "Jayavarman VII · Suryavarman II · Hoàng hậu Indradevi · Học giả Cœdès",
      th: "พระเจ้าชัยวรมันที่ 7 พระเจ้าสูรยวรมันที่ 2 พระนางอินทรเทวี",
    },
    description: {
      en: "Visionary empire builders, royal philosopher queens, patron scholars, and cultural revivalists.",
      km: "ព្រះមហាក្សត្រកសាងចក្រភព ព្រះអគ្គមហេសីអ្នកប្រាជ្ញ និងអ្នកអភិរក្សវប្បធម៌។",
      vi: "Những vị vua kiến tạo đế chế vĩ đại, các bậc hoàng hậu hiền triết và những nhà bảo tồn di sản.",
      th: "กษัตริย์ผู้สร้างมหาปราสาท ราชินีนักปราชญ์ และผู้พิทักษ์มรดก",
    },
    iconName: "Crown",
    sortOrder: 11,
    count: 32,
  },
  {
    id: "mythology",
    slug: "mythology",
    title: {
      en: "Mythology & Beliefs",
      km: "ទេវកថា និងជំនឿសាសនា",
      vi: "Thần thoại & Tín ngưỡng",
      th: "เทวตำนานและความเชื่อ",
    },
    blurb: {
      en: "Naga & Garuda · Devaraja cult · Churning of Ocean of Milk · Neak Ta",
      km: "នាគ និងគ្រុឌ លទ្ធិទេវរាជ កូរសមុទ្រទឹកដោះ អ្នកតា",
      vi: "Thần Rắn Naga & Chim Thần Garuda · Tín ngưỡng Thần Vương · Thần Neak Ta",
      th: "พญานาคและครุฑ ลัทธิเทวราชา กวนเกษียรสมุทร ผีเนียะตา",
    },
    description: {
      en: "Syncretic fusion of Vedic Hinduism, Mahayana Buddhism, Theravada tradition, and ancestral spirit worship.",
      km: "ការសំយោគរវាងព្រហ្មញ្ញសាសនា ព្រះពុទ្ធសាសនាមហាយាន ថេរវាទ និងជំនឿអ្នកតា។",
      vi: "Sự hòa quyện giữa Ấn Độ giáo, Phật giáo Đại thừa, Phật giáo Nam truyền và tín ngưỡng bản địa Neak Ta.",
      th: "การผสมผสานระหว่างศาสนาฮินดู พุทธมหายาน เถรวาท และความเชื่อดั้งเดิม",
    },
    iconName: "Flame",
    sortOrder: 12,
    count: 64,
  },
];

export const eras: EraBand[] = [
  {
    id: "pre",
    label: {
      en: "Pre-Angkorian",
      km: "មុនសម័យអង្គរ",
      vi: "Tiền Angkor (Phù Nam & Chân Lạp)",
      th: "ยุคก่อนพระนคร",
    },
    range: {
      en: "1st – 8th c. CE",
      km: "សតវត្សរ៍ទី ១ – ទី ៨ នៃ គ.ស.",
      vi: "Thế kỷ 1 – 8 CN",
      th: "คริสต์ศตวรรษที่ 1 – 8",
    },
    note: {
      en: "Funan and Chenla maritime polities, Sambor Prei Kuk octagonal brick towers and Sanskrit epigraphy.",
      km: "រដ្ឋហ្វូណន និងចេនឡា ប្រាសាទឥដ្ឋសំបូរព្រៃគុក និងសិលាចារឹកសំស្ក្រឹត។",
      vi: "Nhà nước Phù Nam và Chân Lạp, các tháp gạch bát giác Sambor Prei Kuk và bia ký chữ Phạn đầu tiên.",
      th: "อาณาจักรฟูนันและเจนละ ปราสาทอิฐสมโบร์ไพรกุกและจารึกภาษาสันสกฤต",
    },
  },
  {
    id: "early",
    label: {
      en: "Early Angkorian",
      km: "អង្គរដើម",
      vi: "Thời kỳ Angkor Sơ khai",
      th: "ยุคพระนครตอนต้น",
    },
    range: {
      en: "802 – 1000 CE",
      km: "ឆ្នាំ ៨០២ – ១០០០ នៃ គ.ស.",
      vi: "802 – 1000 CN",
      th: "ค.ศ. 802 – 1000",
    },
    note: {
      en: "Jayavarman II founds the Devaraja (God-King) cult on Phnom Kulen; construction of Roluos and Banteay Srei.",
      km: "ព្រះបាទជ័យវរ្ម័នទី ២ បានស្ថាបនាលទ្ធិទេវរាជនៅលើភ្នំគូលេន សំណង់រលួស និងបន្ទាយស្រី។",
      vi: "Vua Jayavarman II lập vương triều và nghi thức Thần Vương trên đỉnh Phnom Kulen; xây dựng Roluos và Banteay Srei.",
      th: "พระเจ้าชัยวรมันที่ 2 สถาปนาลัทธิเทวราชาบนเขาพนมกุเลน ปราสาทกลุ่มโรลูโอสและบันทายศรี",
    },
  },
  {
    id: "golden",
    label: {
      en: "Classical Golden Age",
      km: "យុគមាសបុរាណ",
      vi: "Thời kỳ Hoàng kim Cổ điển",
      th: "ยุคทองแห่งพระนคร",
    },
    range: {
      en: "1000 – 1220 CE",
      km: "ឆ្នាំ ១០០០ – ១២២០ នៃ គ.ស.",
      vi: "1000 – 1220 CN",
      th: "ค.ศ. 1000 – 1220",
    },
    note: {
      en: "Suryavarman II builds Angkor Wat; Jayavarman VII expands Angkor Thom, Bayon face towers, and public hospitals.",
      km: "ព្រះបាទសូរ្យវរ្ម័នទី ២ កសាងអង្គរវត្ត និងព្រះបាទជ័យវរ្ម័នទី ៧ កសាងអង្គរធំ ប្រាសាទបាយ័ន និងមន្ទីរព្យាបាលរោគ។",
      vi: "Suryavarman II kiến tạo Angkor Wat; Jayavarman VII xây dựng Angkor Thom, tháp mặt cười Bayon và hệ thống bệnh viện.",
      th: "พระเจ้าสูรยวรมันที่ 2 สร้างนครวัด พระเจ้าชัยวรมันที่ 7 ขยายนครธม ปราสาทบายอน และอโรคยศาล",
    },
  },
  {
    id: "post",
    label: {
      en: "Post-Angkorian",
      km: "ក្រោយសម័យអង្គរ",
      vi: "Thời kỳ Hậu Angkor",
      th: "ยุคหลังพระนคร",
    },
    range: {
      en: "1431 – 1863 CE",
      km: "ឆ្នាំ ១៤៣១ – ១៨៦៣ នៃ គ.ស.",
      vi: "1431 – 1863 CN",
      th: "ค.ศ. 1431 – 1863",
    },
    note: {
      en: "Capitals move south to Longvek and Oudong; Theravada Buddhism takes root as primary faith and literature flourishes.",
      km: "ការផ្លាស់រាជធានីទៅលង្វែក និងឧដុង្គ ភាពរីកចម្រើននៃព្រះពុទ្ធសាសនាថេរវាទ និងអក្សរសិល្ប៍ខ្មែរ។",
      vi: "Chuyển kinh đô về Longvek và Oudong; Phật giáo Nam tông xác lập vị thế quốc đạo; văn học chữ viết nở rộ.",
      th: "ย้ายราชธานีไปละแวกและอุดงค์ พุทธศาสนาเถรวาทเจริญรุ่งเรือง",
    },
  },
  {
    id: "modern",
    label: {
      en: "Modern Renaissance",
      km: "ការរស់ឡើងវិញសម័យទំនើប",
      vi: "Thời kỳ Phục hưng & Bảo tồn",
      th: "ยุคฟื้นฟูศิลปวิทยาการร่วมสมัย",
    },
    range: {
      en: "1953 – present",
      km: "ឆ្នាំ ១៩៥៣ – បច្ចុប្បន្ន",
      vi: "1953 – nay",
      th: "ค.ศ. 1953 – ปัจจุบัน",
    },
    note: {
      en: "UNESCO World Heritage inscriptions, international archeological restoration campaigns, and intangible cultural heritage revival.",
      km: "ការចុះបញ្ជីបេតិកភណ្ឌពិភពលោក UNESCO ការស្តារឡើងវិញនូវប្រាសាទបុរាណ និងរបាំព្រះរាជទ្រព្យ។",
      vi: "Công nhận Di sản Thế giới UNESCO, các dự án anastylosis phục hồi đền tháp và bảo tồn di sản phi vật thể.",
      th: "การขึ้นทะเบียนมรดกโลกยูเนสโก การบูรณะโบราณสถาน และการฟื้นฟูศิลปวัฒนธรรม",
    },
  },
];

export const trails: Trail[] = [
  {
    id: "t1",
    title: {
      en: "The Sacred Mountains of the Gods",
      km: "ភ្នំពិសិដ្ឋនៃទេពនិករ",
      vi: "Thánh địa Đền núi của các Vị Thần",
      th: "ภูเขาศักดิ์สิทธิ์แห่งทวยเทพ",
    },
    stops: 6,
    blurb: {
      en: "Temple-mountains from Phnom Kulen to Bakheng and Angkor Wat.",
      km: "ពីភ្នំគូលេនដល់ភ្នំបាខែង និងអង្គរវត្ត",
      vi: "Hành trình khám phá các ngọn núi thiêng từ Phnom Kulen đến Bakheng và Angkor Wat.",
      th: "จากพนมกุเลนสู่พนมบาแคงและนครวัด",
    },
    coverUrl: angkorWat,
    entrySlugs: ["angkor-wat", "bayon", "phnom-kulen"],
  },
  {
    id: "t2",
    title: {
      en: "Musical Legends of the Khmer Court",
      km: "រឿងព្រេងតន្ត្រីព្រះរាជទ្រព្យ",
      vi: "Âm nhạc & Nhạc cụ Cung đình",
      th: "ตำนานดนตรีหลวงเขมร",
    },
    stops: 4,
    blurb: {
      en: "From the resonant bamboo of Roneat Ek to the sacred Pinpeat.",
      km: "ពីសំនៀងរនាតឯកដល់វង់ភ្លេងពិណពាទ្យសក្ការៈ",
      vi: "Từ thanh âm trầm bổng đàn Roneat Ek đến hòa tấu thiêng liêng Pinpeat.",
      th: "จากระนาดเอกสู่มโหรีและพิณพาทย์",
    },
    coverUrl: instrumentsImg,
    entrySlugs: ["pinpeat", "roneat-ek", "chapei-dong-veng"],
  },
  {
    id: "t3",
    title: {
      en: "Celestial Beauty & Royal Weaves",
      km: "សោភ័ណភាពទេពអប្សរា និងសូត្រមាស",
      vi: "Vẻ đẹp Apsara & Lụa tơ vàng",
      th: "ความงดงามแห่งอัปสราและผ้าไหม",
    },
    stops: 5,
    blurb: {
      en: "Apsara sculptural iconography and the intricate art of Sampot Hol.",
      km: "ក្បាច់ចម្លាក់អប្សរា និងសិល្បៈតម្បាញសំពត់ហូលខ្មែរ",
      vi: "Hình tượng vũ nữ Apsara trên đá và nghệ thuật dệt lụa Sampot Hol.",
      th: "ภาพสลักนางอัปสราและศิลปะการทอผ้าโฮล",
    },
    coverUrl: apsara,
    entrySlugs: ["apsara", "silk-hol", "krama"],
  },
];

/**
 * Curated First Master Corpus of the Khmer Heritage Knowledge Graph
 * All 16 entries backed by EFEO, UNESCO, APSARA Authority, and peer-reviewed academic publications.
 */
export const entries: EntryDetail[] = sampleEntries as unknown as EntryDetail[];

export const entryBySlug = (slug: string) => entries.find((e) => e.slug === slug);
export const entryById = (id: string) => entries.find((e) => e.id === id);

export const instruments: Instrument[] = [
  {
    id: "i1",
    name: { en: "Chapei Dang Veng", km: "ចាប៉ីដងវែង", vi: "Đàn Chapei Dang Veng", th: "จะเปยดองเวง" },
    ensemble: "Ayai",
    family: { en: "Long-necked lute", km: "ឧបករណ៍ខ្សែដេញដងវែង", vi: "Đàn dây gảy cần dài", th: "พิณคอยาว" },
    origin: {
      en: "A two-string fretted lute accompanying improvised sung poetry; inscribed on UNESCO Urgent Safeguarding List, 2016.",
      km: "ឧបករណ៍ខ្សែដេញបន្ទរចម្រៀងកំណាព្យកាព្យឃ្លោង ចុះបញ្ជីបេតិកភណ្ឌអរូបី UNESCO ឆ្នាំ ២០១៦។",
      vi: "Đàn 2 dây cần dài đệm cho thơ ca ứng tác; ghi danh Di sản Phi vật thể Cần bảo vệ Khẩn cấp UNESCO 2016.",
      th: "พิณคอยาวบรรเลงขับลำนำมุขปาฐะ ขึ้นทะเบียนมรดกโลกยูเนสโกปี 2016",
    },
    toneHz: [146.83, 196, 220, 293.66],
  },
  {
    id: "i2",
    name: { en: "Roneat Ek", km: "រនាតឯក", vi: "Đàn Roneat Ek", th: "ระนาดเอกเขมร" },
    ensemble: "Pinpeat",
    family: { en: "Bamboo xylophone", km: "ឧបករណ៍ផ្លែឈើ/ឬស្សី", vi: "Mộc cầm 21 phím", th: "ระนาดเอก" },
    origin: {
      en: "Leading xylophone of the Pinpeat ensemble with 21 bamboo or hardwood bars in a boat-shaped resonator, played in rapid octaves.",
      km: "រនាតដឹកនាំក្នុងវង់ភ្លេងពិណពាទ្យ មានផ្លែ ២១ ស្នូកជារាងទូក បន្លឺជាសំនៀងគូ ៨ យ៉ាងពិរោះ។",
      vi: "Đàn mộc cầm lĩnh xướng dàn Pinpeat với 21 thanh phím gắn trên thùng đàn hình thuyền.",
      th: "ระนาดเอกบรรเลงนำในวงพิณพาทย์ มี 21 ลูกบนรางรูปเรือ",
    },
    toneHz: [523.25, 587.33, 659.25, 783.99],
  },
  {
    id: "i3",
    name: { en: "Tro Ou", km: "ទ្រអ៊ូ", vi: "Đàn Nhị Trầm Tro Ou", th: "ซออู้เขมร" },
    ensemble: "Mohori",
    family: { en: "Bowed spike fiddle", km: "ឧបករណ៍ខ្សែទ្រសំនៀងធំ", vi: "Đàn nhị vỏ dừa", th: "ซออู้" },
    origin: {
      en: "Coconut-shell fiddle covered with snakeskin face, the warm alto voice of the Mohori ensemble.",
      km: "ទ្រធ្វើពីត្រឡោកដូងស្រោបស្បែកពស់ មានសំនៀងក្រាស់ធ្ងន់ក្នុងវង់ភ្លេងមហោរី។",
      vi: "Đàn nhị bầu gáo dừa bọc da trăn, giọng trung trầm ấm áp của dàn nhạc Mohori.",
      th: "ซอสองสายกะโหลกทำด้วยกะลามะพร้าว ให้เสียงทุ้มนุ่มนวล",
    },
    toneHz: [196, 261.63, 293.66],
  },
  {
    id: "i4",
    name: { en: "Sampho", km: "សំភោរ", vi: "Trống Thần Sampho", th: "กลองสัมโพ" },
    ensemble: "Pinpeat",
    family: { en: "Barrel drum", km: "ឧបករណ៍ស្គរស្បែកពីរមុខ", vi: "Trống hai mặt nghi lễ", th: "กลองสองหน้า" },
    origin: {
      en: "Two-headed barrel drum that leads the ensemble and signals rhythm changes; treated with deep ritual respect.",
      km: "ស្គរពីរមុខដែលដឹកនាំចង្វាក់ភ្លេងក្នុងវង់ពិណពាទ្យ និងត្រូវគោរពជាវត្ថុសក្ការៈនៃគ្រូតន្ត្រី។",
      vi: "Trống hai mặt lĩnh nhịp dàn Pinpeat, được phụng thờ như hiện thân của thần linh âm nhạc.",
      th: "กลองสองหน้าผู้นำจังหวะในวงพิณพาทย์ ได้รับการเคารพบูชาอย่างสูง",
    },
    toneHz: [98, 130.81],
  },
  {
    id: "i5",
    name: { en: "Khloy", km: "ខ្លុយ", vi: "Sáo Trúc Khloy", th: "ขลุ่ยเขมร" },
    ensemble: "Mohori",
    family: { en: "Bamboo duct flute", km: "ឧបករណ៍ផ្លុំធ្វើពីឬស្សី", vi: "Sáo dọc 6 lỗ", th: "ขลุ่ยไม้ไผ่" },
    origin: {
      en: "Six-hole vertical bamboo flute with a delicate membrane giving its signature airy Khmer sound.",
      km: "ឧបករណ៍ផ្លុំធ្វើពីឬស្សីមានរន្ធ ៦ ផ្តល់នូវសំនៀងស្រទន់លន្លង់លន្លោច។",
      vi: "Sáo dọc làm bằng trúc có 6 lỗ bấm, tạo ra thanh âm réo rắt trong trẻo mang đậm chất tâm tình Khmer.",
      th: "ขลุ่ยไม้ไผ่ 6 รู ให้เสียงหวานไพเราะ",
    },
    toneHz: [440, 493.88, 587.33, 659.25],
  },
  {
    id: "i6",
    name: { en: "Kong Vong Toch", km: "គងវង់តូច", vi: "Giàn Cồng Vòng Nhỏ", th: "ฆ้องวงเล็ก" },
    ensemble: "Pinpeat",
    family: { en: "Circular gong chime", km: "ឧបករណ៍គងរង្វង់", vi: "Giàn cồng đồng tròn", th: "ฆ้องวง" },
    origin: {
      en: "Sixteen tuned bronze gongs arranged in a rattan circular frame; the musician sits in the center.",
      km: "គងលង្ហិន ១៦ ដុំ តម្រៀបជារង្វង់ផ្តៅ អ្នកលេងអង្គុយចំកណ្តាលរង្វង់។",
      vi: "16 chiếc cồng đồng định âm đặt trên khung tròn bằng mây; nghệ nhân ngồi ở trung tâm để gõ.",
      th: "ฆ้องสัมฤทธิ์ 16 ลูกจัดวางในโครงหวายวงกลม",
    },
    toneHz: [329.63, 392, 440, 523.25],
  },
];

export const sites: HeritageSite[] = [
  {
    id: "s1",
    entrySlug: "angkor-wat",
    name: { en: "Angkor Wat", km: "ប្រាសាទអង្គរវត្ត", vi: "Đền Angkor Wat", th: "ปราสาทนครวัด" },
    province: { en: "Siem Reap", km: "សៀមរាប", vi: "Siem Reap", th: "เสียมราฐ" },
    era: "golden",
    style: { en: "Angkor Wat Style", km: "រចនាប័ទ្មអង្គរវត្ត", vi: "Phong cách Angkor Wat", th: "ศิลปะแบบนครวัด" },
    condition: "excellent",
    unesco: true,
    coordinates: { latitude: 13.4125, longitude: 103.867 },
  },
  {
    id: "s2",
    entrySlug: "bayon",
    name: { en: "The Bayon", km: "ប្រាសាទបាយ័ន", vi: "Đền Bayon", th: "ปราสาทบายอน" },
    province: { en: "Siem Reap", km: "សៀមរាប", vi: "Siem Reap", th: "เสียมราฐ" },
    era: "golden",
    style: { en: "Bayon Style", km: "រចនាប័ទ្មបាយ័ន", vi: "Phong cách Bayon", th: "ศิลปะแบบบายอน" },
    condition: "stable",
    unesco: true,
    coordinates: { latitude: 13.4413, longitude: 103.8586 },
  },
  {
    id: "s3",
    entrySlug: "banteay-srei",
    name: { en: "Banteay Srei", km: "ប្រាសាទបន្ទាយស្រី", vi: "Đền Banteay Srei", th: "ปราสาทบันทายศรี" },
    province: { en: "Siem Reap", km: "សៀមរាប", vi: "Siem Reap", th: "เสียมราฐ" },
    era: "early",
    style: { en: "Banteay Srei Style", km: "រចនាប័ទ្មបន្ទាយស្រី", vi: "Phong cách Banteay Srei", th: "ศิลปะแบบบันทายศรี" },
    condition: "excellent",
    unesco: true,
    coordinates: { latitude: 13.5987, longitude: 103.9633 },
  },
  {
    id: "s4",
    entrySlug: "phnom-kulen",
    name: { en: "Phnom Kulen", km: "រមណីយដ្ឋានភ្នំគូលេន", vi: "Thánh địa Núi Phnom Kulen", th: "พนมกุเลน" },
    province: { en: "Siem Reap", km: "សៀមរាប", vi: "Siem Reap", th: "เสียมราฐ" },
    era: "early",
    style: { en: "Kulen Style", km: "រចនាប័ទ្មគូលេន", vi: "Phong cách Núi Kulen", th: "ศิลปะแบบกุเลน" },
    condition: "at_risk",
    unesco: false,
    coordinates: { latitude: 13.5786, longitude: 104.1103 },
  },
  {
    id: "s5",
    entrySlug: "banteay-srei",
    name: { en: "Preah Vihear Temple", km: "ប្រាសាទព្រះវិហារ", vi: "Đền Preah Vihear", th: "ปราสาทพระวิหาร" },
    province: { en: "Preah Vihear", km: "ព្រះវិហារ", vi: "Preah Vihear", th: "พระวิหาร" },
    era: "golden",
    style: { en: "Khleang / Baphuon", km: "រចនាប័ទ្មឃ្លាំង និងបាភួន", vi: "Phong cách Khleang / Baphuon", th: "ศิลปะแบบคลังและบาปวน" },
    condition: "stable",
    unesco: true,
    coordinates: { latitude: 14.3907, longitude: 104.6809 },
  },
  {
    id: "s6",
    entrySlug: "bayon",
    name: { en: "Sambor Prei Kuk", km: "ប្រាសាទសំបូរព្រៃគុក", vi: "Quần thể Sambor Prei Kuk", th: "สมโบร์ไพรกุก" },
    province: { en: "Kampong Thom", km: "កំពង់ធំ", vi: "Kampong Thom", th: "กำปงธม" },
    era: "pre",
    style: { en: "Sambor Prei Kuk Style", km: "រចនាប័ទ្មសំបូរព្រៃគុក", vi: "Phong cách Sambor Prei Kuk", th: "ศิลปะแบบสมโบร์ไพรกุก" },
    condition: "at_risk",
    unesco: true,
    coordinates: { latitude: 12.8716, longitude: 105.0407 },
  },
];
