import angkorWat from "../assets/angkor-wat.jpg";
import apsara from "../assets/apsara.jpg";
import bayon from "../assets/bayon.jpg";
import banteaySrei from "../assets/banteay-srei.jpg";
import instrumentsImg from "../assets/instruments.jpg";
import silk from "../assets/silk.jpg";
import { sampleEntries } from "./sampleEntries.ts";
import type {
  Category,
  EntryDetail,
  EraBand,
  HeritageSite,
  Instrument,
  MediaAsset,
  Trail,
} from "./types.ts";

export { sampleEntries };

export const IMAGES = {
  angkorWat,
  apsara,
  bayon,
  banteaySrei,
  instruments: instrumentsImg,
  silk,
};

const media = (
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
      km: "ព្រះមหาก្សត្រកសាងចក្រភព ព្រះអគ្គមហេសីអ្នកប្រាជ្ញ និងអ្នកអភិរក្សវប្បធម៌។",
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
 * High-quality Master Plan Pilot Heritage Entries
 * All backed by EFEO, UNESCO, APSARA Authority, and academic publications.
 */
export const entries: EntryDetail[] = [
  {
    id: "e-angkor-wat",
    slug: "angkor-wat",
    categoryId: "temples",
    title: {
      en: "Angkor Wat",
      km: "ប្រាសាទអង្គរវត្ត",
      vi: "Đền Angkor Wat",
      th: "ปราสาทนครวัด",
    },
    summary: {
      en: "The largest religious monument on earth, raised by Suryavarman II in the early 12th century as a terrestrial model of Mount Meru and the cosmic ocean.",
      km: "សំណង់សាសនាធំបំផុតលើពិភពលោក សាងឡើងដោយព្រះបាទសូរ្យវរ្ម័នទី ២ នៅដើមសតវត្សរ៍ទី ១២ ជាគំរូនៃភ្នំព្រះសុមេរុ និងមហាសមុទ្រចក្រវាឡ។",
      vi: "Di tích tôn giáo lớn nhất thế giới, được vua Suryavarman II xây dựng vào đầu thế kỷ 12 như một mô hình trần thế của núi thiêng Meru và đại dương vũ trụ.",
      th: "ศาสนสถานที่ใหญ่ที่สุดในโลก สร้างขึ้นโดยพระเจ้าสูรยวรมันที่ 2 ในช่วงต้นศตวรรษที่ 12 เพื่อเป็นแบบจำลองของเขาพระสุเมรุ",
    },
    era: {
      en: "12th Century CE · King Suryavarman II",
      km: "សតវត្សរ៍ទី ១២ នៃ គ.ស. · ព្រះបាទសូរ្យវរ្ម័នទី ២",
      vi: "Thế kỷ 12 CN · Thời vua Suryavarman II",
      th: "ศตวรรษที่ 12 · พระเจ้าสูรยวรมันที่ 2",
    },
    coverMedia: media(
      "m-aw",
      angkorWat,
      "Angkor Wat at dawn across the reflecting pool",
      "អង្គរវត្តពេលព្រឹកព្រាងឆ្លុះផ្ទៃទឹក",
      "Khmer Heritage Archive",
      "Toàn cảnh Angkor Wat lúc bình minh bên hồ sen",
      "ทัศนียภาพนครวัดยามเช้าตรู่เหนือน้ำ"
    ),
    coordinates: { latitude: 13.4125, longitude: 103.867 },
    content: {
      sections: [
        {
          id: "s1",
          heading: {
            en: "Architectural Cosmogram & Orientation",
            km: "ប្លង់ស្ថាបត្យកម្ម និងចក្រវាឡវិទ្យា",
            vi: "Bố cục Kiến trúc & Mô hình Vũ trụ học",
            th: "ผังทางสถาปัตยกรรมและจักรวาลวิทยา",
          },
          body: {
            en: "Angkor Wat is a monumental cosmogram rendered in sandstone and laterite. Five quincunx towers represent the sacred peaks of Mount Meru, the concentric galleries correspond to surrounding mountain chains, and the 190-meter-wide moat symbolizes the cosmic ocean. Uniquely among major Angkorian temples, Angkor Wat faces West — the direction of Vishnu and of the setting sun — reflecting its dual nature as a state temple and Suryavarman II's mortuary sanctuary.",
            km: "ប្រាសាទនេះជាគំរូនៃភ្នំព្រះសុមេរុលើផែនដី ធ្វើពីថ្មភក់ និងថ្មបាយក្រៀម មានប្រាង្គកំពូល ៥ និងកសិណទឹកទទឹង ១៩០ ម៉ែត្រព័ទ្ធជុំវិញ តំណាងឲ្យមហាសមុទ្រចក្រវាឡ។ ប្រាសាទបែរមុខទៅទិសខាងលិច ដែលជាទិសនៃព្រះវិស្ណុ។ ផ្លូវដើរប្រវែង ៣៥០ ម៉ែត្របង្កើតជាទស្សនីយភាពដ៏អស្ចារ្យ។",
            vi: "Angkor Wat là một tiểu vũ trụ đồ sộ tạc bằng sa thạch và đá ong. Năm ngọn tháp hình hoa sen tượng trưng cho các đỉnh núi thiêng Meru, các dãy hành lang đồng tâm tượng trưng cho các rặng núi bao quanh, và hào nước rộng 190m tượng trưng cho đại dương vũ trụ. Độc đáo ở chỗ, đền quay mặt về hướng Tây — hướng của thần Vishnu và hướng mặt trời lặn — khẳng định vai trò là ngôi đền lăng mộ của vua Suryavarman II.",
            th: "นครวัดคือแบบจำลองจักรวาลอันยิ่งใหญ่ สร้างด้วยหินทรายและศิลาแลง ยอดปรางค์ 5 ยอดเปรียบเสมือนยอดเขาพระสุเมรุ ระเบียงคดคือทิวเขา และคูน้ำกว้าง 190 เมตรคือมหาสมุทรจักรวาล",
          },
        },
        {
          id: "s2",
          heading: {
            en: "The Bas-Relief Narrative Galleries",
            km: "វិចិត្រសាលចម្លាក់ក្រឡោតទាប",
            vi: "Các Dãy Hành Lang Phù Điêu Sử Thi",
            th: "ภาพสลักนูนต่ำเรื่องราวมหากาพย์",
          },
          body: {
            en: "Nearly 600 continuous meters of narrative bas-reliefs wrap the third enclosure gallery. The southern gallery displays King Suryavarman II presiding over his royal court and military parade. The eastern gallery immortalizes the Churning of the Ocean of Milk (Samudra Manthan), where 88 asuras and 92 devas pull the great serpent Vasuki around Mount Mandara. The western gallery portrays monumental collision scenes from the Mahabharata and Ramayana epics.",
            km: "ចម្លាក់ក្រឡោតទាបប្រវែងជិត ៦០០ ម៉ែត្រព័ន្ធជុំវិញថែវទី ៣ បង្ហាញពីព្រះរាជពិធីរបស់ព្រះបាទសូរ្យវរ្ម័នទី ២ រឿងកូរសមុទ្រទឹកដោះ (យក្ស ៨៨ និងទេវតា ៩២ ទាញនាគវាសុកី) និងសមរភូមិកុរុក្សេត្រក្នុងរឿងមហាភារតៈ។",
            vi: "Gần 600 mét phù điêu chạm khắc liên tục bao bọc tầng hành lang thứ ba. Dãy hành lang phía Nam khắc họa vua Suryavarman II cùng đoàn quân hoàng gia. Hành lang phía Đông ghi dấu trường đoạn huyền thoại Khuấy Biển Sữa (Samudra Manthan) với 88 vị thần Asura và 92 Deva cùng kéo rắn thần Vasuki quanh núi Mandara. Hành lang phía Tây tái hiện các trận chiến bi tráng trong sử thi Mahabharata và Ramayana.",
            th: "ภาพสลักนูนต่ำความยาวเกือบ 600 เมตรรอบระเบียงคดชั้นนอก แสดงภาพพระเจ้าสูรยวรมันที่ 2 เสด็จนำทัพ ภาพการกวนเกษียรสมุทร และฉากสงครามจากมหากาพย์มหาภารตะและรามายณะ",
          },
        },
        {
          id: "s3",
          heading: {
            en: "Conservation & National Identity",
            km: "ការអភិរក្ស និងសារៈសំខាន់ជាតិ",
            vi: "Bảo tồn & Ý nghĩa Biểu tượng Quốc gia",
            th: "การอนุรักษ์และความสำคัญของชาติ",
          },
          body: {
            en: "Angkor Wat was never completely abandoned; Theravada Buddhist monks inhabited and protected the monument continuously through post-Angkorian centuries. Inscribed on the UNESCO World Heritage List in 1992, the complex is maintained under the stewardship of the APSARA National Authority in partnership with international conservation missions (France, Japan, Germany, India, Italy). Angkor Wat has appeared on every Cambodian national flag since 1863.",
            km: "អង្គរវត្តមិនដែលត្រូវបានបោះបង់ចោលឡើយ ដោយព្រះសង្ឃថេរវាទបានបន្តថែរក្សា។ ត្រូវបានចុះបញ្ជីជាបេតិកភណ្ឌពិភពលោក UNESCO ក្នុងឆ្នាំ ១៩៩២ និងគ្រប់គ្រងដោយអាជ្ញាធរជាតិអប្សរា។ រូបប្រាសាទអង្គរវត្តមានវត្តមានលើទង់ជាតិកម្ពុជាតាំងពីឆ្នាំ ១៨៦៣ មក។",
            vi: "Angkor Wat chưa từng bị bỏ hoang hoàn toàn; các nhà sư Phật giáo Nam truyền đã liên tục chăm sóc ngôi đền qua nhiều thế kỷ. Được UNESCO công nhận là Di sản Thế giới vào năm 1992, khu di tích hiện được quản lý bởi Cơ quan Quốc gia APSARA cùng các đoàn chuyên gia phục chế quốc tế. Hình tượng đền Angkor Wat luôn hiện diện trang trọng trên quốc kỳ Campuchia từ năm 1863.",
            th: "นครวัดไม่เคยถูกทิ้งร้างอย่างสมบูรณ์ พระสงฆ์ในพุทธศาสนาเถรวาทได้ดูแลรักษามาตลอด ได้รับการขึ้นทะเบียนเป็นมรดกโลกยูเนสโกในปี 1992 และปรากฏอยู่บนธงชาติกัมพูชาตั้งแต่ปี 1863",
          },
        },
      ],
    },
    gallery: [
      media("g1", angkorWat, "Western causeway entrance", "ស្ពានហាលខាងលិច", "Khmer Heritage Archive", "Cầu đá phía Tây dẫn vào đền chính"),
      media("g2", apsara, "Apsara relief detail on inner sanctum", "ចម្លាក់អប្សរាលម្អិត", "EFEO Archives", "Chi tiết vũ nữ Apsara trên vách đá"),
      media("g3", banteaySrei, "Comparative lintel carving in rose sandstone", "ចម្លាក់ផ្តែរប្រៀបធៀប", "APSARA Authority", "So sánh nghệ thuật chạm khắc hoa văn"),
    ],
    relatedEntryIds: ["e-bayon", "e-angkor-thom", "e-apsara", "e-banteay-srei", "e-pinpeat"],
    citations: [
      { id: "c1", title: "Angkor and the Khmer Civilization", author: "Michael D. Coe", year: 2003, publisher: "Thames & Hudson" },
      { id: "c2", title: "Inscriptions du Cambodge, Vol. I–VIII", author: "George Cœdès", year: 1937, publisher: "EFEO" },
      { id: "c3", title: "Angkor: Hommes et pierres", author: "Bernard-Philippe Groslier", year: 1956, publisher: "Arthaud" },
      { id: "c4", title: "Angkor Site Conservation & Hydrology Reports", author: "APSARA National Authority", year: 2021, publisher: "APSARA" },
    ],
  },
  {
    id: "e-bayon",
    slug: "bayon",
    categoryId: "temples",
    title: {
      en: "The Bayon",
      km: "ប្រាសាទបាយ័ន",
      vi: "Đền Bayon",
      th: "ปราสาทบายอน",
    },
    summary: {
      en: "The mesmerizing state temple of King Jayavarman VII located at the precise center of Angkor Thom, celebrated for its 216 enigmatic smiling face towers.",
      km: "ប្រាសាទរដ្ឋរបស់ព្រះបាទជ័យវរ្ម័នទី ៧ នៅចំកណ្តាលរាជធានីអង្គរធំ មានកំពូលព្រះភ័ក្ត្រញញឹមចំនួន ២១៦ បែរទៅកាន់ទិសទាំង ៤។",
      vi: "Ngôi đền quốc gia kỳ vĩ của vua Jayavarman VII tại trung tâm Angkor Thom, nổi tiếng với 216 gương mặt mỉm cười bí ẩn hướng về bốn phương.",
      th: "ปราสาทประจำรัชกาลของพระเจ้าชัยวรมันที่ 7 ใจกลางนครธม โดดเด่นด้วยยอดปรางค์รูปใบหน้ายิ้ม 216 หน้า",
    },
    era: {
      en: "Late 12th – Early 13th Century CE · King Jayavarman VII",
      km: "ចុងសតវត្សរ៍ទី ១២ – ដើមសតវត្សរ៍ទី ១៣ នៃ គ.ស. · ព្រះបាទជ័យវរ្ម័នទី ៧",
      vi: "Cuối thế kỷ 12 – Đầu thế kỷ 13 CN · Vua Jayavarman VII",
      th: "ปลายศตวรรษที่ 12 ถึงต้นศตวรรษที่ 13 · พระเจ้าชัยวรมันที่ 7",
    },
    coverMedia: media(
      "m-by",
      bayon,
      "The stone face towers of the Bayon temple",
      "កំពូលព្រះភ័ក្ត្របាយ័ន",
      "Khmer Heritage Archive",
      "Các tháp mặt Phật mỉm cười tại đền Bayon",
      "ยอดปรางค์หินรูปใบหน้าแห่งปราสาทบายอน"
    ),
    coordinates: { latitude: 13.4413, longitude: 103.8586 },
    content: {
      sections: [
        {
          id: "s1",
          heading: {
            en: "The Enigmatic Face Towers & Bodhisattva Avalokiteshvara",
            km: "កំពូលព្រះភ័ក្ត្រទាំងបួនទិស",
            vi: "Những Ngọn Tháp Mặt Cười & Bồ Tát Quán Thế Âm",
            th: "ยอดปรางค์รูปใบหน้าและพระโพธิสัตว์อวโลกิเตศวร",
          },
          body: {
            en: "The Bayon presents 54 gothic-style stone towers adorned with 216 colossal faces gazing serenely in the cardinal directions. Academic consensus identifies these faces as Bodhisattva Lokeshvara (Avalokiteshvara), reflecting King Jayavarman VII's devotion to Mahayana Buddhism, subtly infused with royal features to embody compassion, omniscience, and state protection across the realm.",
            km: "អ្នកប្រាជ្ញបុរាណវិទ្យាយល់ថា ព្រះភ័ក្ត្រទាំងនោះតំណាងឲ្យព្រះពោធិសត្វអវលោកិតេស្វរៈ ឬព្រះព្រហ្ម ឬព្រះឆាយាលក្ខណ៍របស់ព្រះបាទជ័យវរ្ម័នទី ៧ ដែលឆ្លុះបញ្ចាំងពីព្រហ្មវិហារធម៌។",
            vi: "Bayon sở hữu 54 ngọn tháp đá với 216 gương mặt khổng lồ hướng về bốn phương với nụ cười bí ẩn. Giới học giả xác định đây là hiện thân của Bồ Tát Quán Thế Âm (Avalokiteshvara/Lokeshvara), thể hiện tâm niệm Đại thừa của vua Jayavarman VII kết hợp uy quyền vương triều che chở muôn dân.",
            th: "ยอดปรางค์ 54 ยอดสลักใบหน้า 216 หน้า สื่อถึงพระโพธิสัตว์อวโลกิเตศวรและความเมตตากรุณาของพระเจ้าชัยวรมันที่ 7",
          },
        },
        {
          id: "s2",
          heading: {
            en: "Chronicles of Everyday Angkorian Life",
            km: "ចម្លាក់ជីវភាពប្រចាំថ្ងៃរបស់ប្រជារាស្ត្រ",
            vi: "Biên Niên Sử Về Đời Sống Dân Gian Angkor",
            th: "บันทึกชีวิตประจำวันของชาวนครธม",
          },
          body: {
            en: "While other Khmer monuments exclusively illustrate sacred religious mythologies, the outer gallery bas-reliefs of the Bayon document vivid daily scenes: bustling open markets, Chinese merchants trading, cockfighting matches, childbirth, fishing on the Tonle Sap lake, family dining, and fierce naval battles against the Cham navy.",
            km: "ខុសពីអង្គរវត្ត ចម្លាក់ថែវខាងក្រៅនៃបាយ័នបង្ហាញពីជីវភាពរស់នៅពិតៗ ដូចជាទិដ្ឋភាពផ្សារ ការជល់មាន់ ការសម្រាលកូន ការនេសាទនៅបឹងទន្លេសាប និងចម្បាំងជើងទឹកជាមួយចាម។",
            vi: "Khác với các đền thờ khác chỉ tạc thần thoại, các bức phù điêu ở hành lang ngoài đền Bayon là kho tư liệu sống động về cuộc sống thường nhật: cảnh chợ búa tấp nập, thương nhân người Hoa buôn bán, chọi gà, sinh nở, đánh bắt cá trên Biển Hồ và trận hải chiến lịch sử với quân Champa.",
            th: "ภาพสลักนูนต่ำที่ระเบียงชั้นนอกบันทึกภาพชีวิตผู้คน ตลาด การค้าขายกับชาวจีน การชนไก่ การทำคลอด และยุทธนาวีบนโตนเลสาบ",
          },
        },
      ],
    },
    gallery: [
      media("g5", bayon, "Serene face tower facing east", "កំពូលព្រះភ័ក្ត្រទិសខាងកើត", "Khmer Heritage Archive", "Góc nhìn cận cảnh gương mặt đá Bayon"),
      media("g6", angkorWat, "Angkor Thom monumental gateway", "ខ្លោងទ្វារអង្គរធំ", "EFEO Archives", "Cổng thành Angkor Thom dẫn vào Bayon"),
    ],
    relatedEntryIds: ["e-angkor-wat", "e-angkor-thom", "e-jayavarman-vii", "e-apsara"],
    citations: [
      { id: "c5", title: "The Bayon: New Perspectives", author: "Joyce Clark (ed.)", year: 2007, publisher: "River Books" },
      { id: "c6", title: "Les monuments du groupe d'Angkor", author: "Maurice Glaize", year: 1944, publisher: "Albert Portail" },
    ],
  },
  {
    id: "e-angkor-thom",
    slug: "angkor-thom",
    categoryId: "temples",
    title: {
      en: "Angkor Thom",
      km: "រាជធានីអង្គរធំ",
      vi: "Kinh đô Angkor Thom",
      th: "นครธม",
    },
    summary: {
      en: "The fortified 9-square-kilometer royal capital founded by Jayavarman VII, enclosed by an 8-meter-high laterite wall and flanked by giant stone naga causeways.",
      km: "រាជធានីបន្ទាយដ៏រឹងមាំទំហំ ៩ គីឡូម៉ែត្រការ៉េ ស្ថាបនាដោយព្រះបាទជ័យវរ្ម័នទី ៧ ព័ទ្ធជុំវិញដោយកំពែងថ្មបាយក្រៀមកម្ពស់ ៨ ម៉ែត្រ និងស្ពានទាញនាគដ៏អស្ចារ្យ។",
      vi: "Kinh đô kiên cố rộng 9 km² do vua Jayavarman VII thành lập, được bao bọc bởi tường đá ong cao 8 mét và các cầu đá kéo Rắn Thần Naga hùng vĩ.",
      th: "ราชธานีอันยิ่งใหญ่ขนาด 9 ตารางกิโลเมตร สร้างขึ้นโดยพระเจ้าชัยวรมันที่ 7 ล้อมรอบด้วยกำแพงศิลาแลงและสะพานกวนเกษียรสมุทร",
    },
    era: {
      en: "Late 12th Century CE · King Jayavarman VII",
      km: "ចុងសតវត្សរ៍ទី ១២ នៃ គ.ស. · ព្រះបាទជ័យវរ្ម័នទី ៧",
      vi: "Cuối thế kỷ 12 CN · Thời vua Jayavarman VII",
      th: "ปลายศตวรรษที่ 12 · พระเจ้าชัยวรมันที่ 7",
    },
    coverMedia: media(
      "m-at",
      bayon,
      "South Gate of Angkor Thom with giant devas and asuras",
      "ខ្លោងទ្វារខាងត្បូងអង្គរធំ",
      "Khmer Heritage Archive",
      "Cổng phía Nam Angkor Thom với hàng tượng Thần và Ác thần kéo Rắn Naga",
      "ประตูทิศใต้นครธมพร้อมแถวเทวดาและยักษ์"
    ),
    coordinates: { latitude: 13.4413, longitude: 103.8586 },
    content: {
      sections: [
        {
          id: "s1",
          heading: {
            en: "The Urban Fortress & Hydraulic Mastery",
            km: "ការរៀបចំរាជធានី និងប្រព័ន្ធធារាសាស្ត្រ",
            vi: "Quy hoạch Đô thị & Thủy công Đỉnh cao",
            th: "ผังเมืองและระบบชลประทานโบราณ",
          },
          body: {
            en: "Angkor Thom ('Great City') was established following the Cham invasion of 1177 as an impregnable walled metropolis. Encircled by an 8-meter laterite wall, a 100-meter-wide moat fed by the Siem Reap River, and five monumental gate towers topped with Avalokiteshvara faces, it accommodated up to 150,000 residents within a sophisticated grid of avenues, reservoirs, and public monuments.",
            km: "អង្គរធំត្រូវបានសាងសង់ឡើងបន្ទាប់ពីការឈ្លានពានរបស់ចាមក្នុងឆ្នាំ ១១៧៧។ មានកំពែងព័ទ្ធជុំវិញ កសិណទឹកធំទូលាយ និងខ្លោងទ្វារកំពូលព្រះភ័ក្ត្រទាំង ៥ ទិស ផ្ទុកប្រជាជនរហូតដល់ជាង ១៥០,០០០ នាក់។",
            vi: "Angkor Thom ('Đại Đô Thành') được xây dựng sau cuộc xâm lăng của quân Champa năm 1177 nhằm tạo ra một pháo đài bất khả xâm phạm. Được bao quanh bởi tường đá ong cao 8 mét, hào nước rộng 100 mét và 5 cổng thành tráng lệ, kinh đô này từng là nơi sinh sống của hơn 150.000 cư dân với mạng lưới đường sá và hồ chứa nước hoàn hảo.",
            th: "นครธมถูกสร้างขึ้นเพื่อเป็นเมืองป้อมปราการหลังสงคราม ล้อมรอบด้วยคูน้ำกว้างและกำแพงสูง มีประตูเมือง 5 ทิศ และเคยมีประชากรอาศัยอยู่กว่า 150,000 คน",
          },
        },
      ],
    },
    gallery: [
      media("g-at1", bayon, "Terrace of the Elephants", "ព្រលានជល់ដំរី", "Khmer Heritage Archive", "Sân khấu voi đá Terrace of the Elephants"),
    ],
    relatedEntryIds: ["e-bayon", "e-angkor-wat", "e-jayavarman-vii"],
    citations: [
      { id: "c-at1", title: "Angkor Thom: The City of Jayavarman VII", author: "Jacques Dumarçay", year: 1998, publisher: "Oxford University Press" },
    ],
  },
  {
    id: "e-banteay-srei",
    slug: "banteay-srei",
    categoryId: "temples",
    title: {
      en: "Banteay Srei",
      km: "ប្រាសាទបន្ទាយស្រី",
      vi: "Đền Banteay Srei",
      th: "ปราสาทบันทายศรี",
    },
    summary: {
      en: "The 'Jewel of Khmer Art', a 10th-century sanctuary sculpted in rose-pink sandstone with exquisite miniature pediments and lintel bas-reliefs.",
      km: "រតនភណ្ឌនៃសិល្បៈខ្មែរ ប្រាសាទតូចច្រឡឹងធ្វើពីថ្មភក់ពណ៌ផ្កាឈូក សាងក្នុងសតវត្សរ៍ទី ១០ ដែលមានចម្លាក់ក្បាច់រស់រវើក និងល្អិតល្អន់ឥតខ្ចោះ។",
      vi: "'Viên ngọc của Nghệ thuật Khmer', ngôi đền thế kỷ 10 tạc từ đá sa thạch hồng với những bức trán cửa và lanh-tô chạm khắc tinh vi bậc nhất.",
      th: "รัตนชาติแห่งศิลปะเขมร ปราสาทหินทรายสีชมพูในศตวรรษที่ 10 โดดเด่นด้วยลวดลายแกะสลักอันวิจิตรงดงาม",
    },
    era: {
      en: "967 CE · Consecrated under Rajendravarman II & Jayavarman V",
      km: "ឆ្នាំ ៩៦៧ នៃ គ.ស. · សម័យព្រះបាទរាជេន្ទ្រវរ្ម័នទី ២ និងជ័យវរ្ម័នទី ៥",
      vi: "Năm 967 CN · Thời vua Rajendravarman II & Jayavarman V",
      th: "ค.ศ. 967 · รัชสมัยพระเจ้าราเชนทรวรมันที่ 2",
    },
    coverMedia: media(
      "m-bs",
      banteaySrei,
      "Intricate rose sandstone sanctuary of Banteay Srei",
      "តួប៉មប្រាសាទបន្ទាយស្រី",
      "APSARA Authority",
      "Toàn cảnh đền đá sa thạch hồng Banteay Srei",
      "ปรางค์ปราสาทหินทรายสีชมพูบันทายศรี"
    ),
    coordinates: { latitude: 13.5987, longitude: 103.9633 },
    content: {
      sections: [
        {
          id: "s1",
          heading: {
            en: "A Masterpiece Built by Brahmin Scholars",
            km: "ប្រាសាទដែលកសាងដោយព្រាហ្មណ៍បុរោហិត",
            vi: "Kiệt Tác Được Sáng Lập Bởi Học Giả Bà La Môn",
            th: "มหาปราสาทที่สร้างโดยพราหมณ์ราชครู",
          },
          body: {
            en: "Unlike royal monuments raised by reigning monarchs, Banteay Srei (originally Tribhuvanamahesvara) was founded by Yajnavaraha, a revered royal preceptor and philanthropist. Constructed on a human, intimate scale with doorways only 1.3 meters high, its hard pink sandstone allowed sculptors to execute deep, three-dimensional filigree carvings that have survived with razor-sharp clarity.",
            km: "ប្រាសាទបន្ទាយស្រីត្រូវបានកសាងឡើងដោយព្រាហ្មណ៍ យជ្ញវរាហៈ ជាព្រះរាជគ្រូ មិនមែនកសាងដោយព្រះមហាក្សត្រឡើយ។ ទ្វារប្រាសាទមានកម្ពស់ត្រឹមតែ ១,៣ ម៉ែត្រប៉ុណ្ណោះ ឆ្លាក់លើថ្មភក់ពណ៌ផ្កាឈូកយ៉ាងរស់រវើក។",
            vi: "Khác với các đền đài hoàng gia do nhà vua lập nên, Banteay Srei (nguyên tên Tribhuvanamahesvara) được sáng lập bởi Yajnavaraha, một vị quốc sư Bà la môn uyên bác. Được xây dựng ở quy mô nhỏ nhắn với khung cửa cao chỉ 1,3 mét, chất đá sa thạch hồng siêu cứng đã cho phép các nghệ nhân chạm lộng những bức hoa văn 3D sắc sảo trường tồn nguyên vẹn qua ngàn năm.",
            th: "บันทายศรีสร้างโดยพราหมณ์ยัชญวราหะ ราชครูผู้ทรงภูมิ มีขนาดกะทัดรัด ประตูสูงเพียง 1.3 เมตร แกะสลักบนหินทรายสีชมพูเนื้อละเอียด",
          },
        },
      ],
    },
    gallery: [
      media("g-bs1", banteaySrei, "Pediment depicting Ravana shaking Mount Kailash", "ចម្លាក់ហោជាងរាពណ៍អង្រួនភ្នំកៃលាស", "APSARA Authority", "Trán cửa tạc cảnh quỷ vương Ravana rung chuyển núi Kailash"),
    ],
    relatedEntryIds: ["e-angkor-wat", "e-bayon", "e-apsara"],
    citations: [
      { id: "c-bs1", title: "Le temple d'Içvarapura (Banteay Srei)", author: "Louis Finot & Henri Parmentier", year: 1926, publisher: "EFEO" },
    ],
  },
  {
    id: "e-apsara",
    slug: "apsara",
    categoryId: "arts",
    title: {
      en: "Apsara Bas-Reliefs & Classical Dance",
      km: "ចម្លាក់អប្សរា និងរបាំព្រះរាជទ្រព្យ",
      vi: "Vũ Nữ Apsara & Điêu Khắc Cung Đình",
      th: "ภาพสลักอัปสราและระบำหลวง",
    },
    summary: {
      en: "Over 1,800 celestial water nymphs carved on Angkor Wat's walls, providing the living grammar and spiritual foundation for Cambodia's UNESCO-inscribed Royal Ballet.",
      km: "នាងអប្សរា និងទេវតាជាង ១,៨០០ រូប ឆ្លាក់នៅលើជញ្ជាំងអង្គរវត្ត ជាឫសគល់នៃក្បាច់របាំព្រះរាជទ្រព្យខ្មែរដែលបានចុះបញ្ជី UNESCO។",
      vi: "Hơn 1.800 nàng tiên nữ Apsara tạc trên vách đá Angkor Wat, tạo nên quy chuẩn tạo hình và cội nguồn của Di sản Múa Cung Đình Hoàng Gia.",
      th: "ภาพสลักนางอัปสรากว่า 1,800 องค์บนผนังนครวัด ซึ่งเป็นรากฐานของระบำอัปสราและระบำหลวงกัมพูชา",
    },
    era: {
      en: "12th Century CE – Present",
      km: "សតវត្សរ៍ទី ១២ – បច្ចុប្បន្ន",
      vi: "Thế kỷ 12 CN – Nay",
      th: "ศตวรรษที่ 12 ถึงปัจจุบัน",
    },
    coverMedia: media(
      "m-ap",
      apsara,
      "Classical Apsara bas-relief on sandstone wall",
      "ចម្លាក់អប្សរាអង្គរ",
      "EFEO Archives",
      "Phù điêu vũ nữ Apsara với nụ cười thanh thoát",
      "ภาพสลักนางอัปสราแห่งนครวัด"
    ),
    content: {
      sections: [
        {
          id: "s1",
          heading: {
            en: "Mythological Origins in the Ocean of Milk",
            km: "កំណើតពីការកូរសមុទ្រទឹកដោះ",
            vi: "Nguồn Gốc Huyền Thoại Từ Biển Sữa",
            th: "กำเนิดจากการกวนเกษียรสมุทร",
          },
          body: {
            en: "According to Vedic and Khmer cosmological lore, the apsaras (water nymphs) were born from the froth of the cosmic ocean during the Churning of the Ocean of Milk. On temple walls, they mediate between the mortal human realm below and the celestial spheres above, embodying divine grace, fertility, and spiritual transcendence.",
            km: "តាមទេវកថា នាងអប្សរាកើតចេញពីពពុះទឹកនៃមហាសមុទ្រទឹកដោះ ជានិមិត្តរូបនៃសោភ័ណភាព និងភាពបរិសុទ្ធនៃពិភពទេវលោក។",
            vi: "Theo thần thoại, các nàng Apsara (tiên nữ sông nước) sinh ra từ bọt biển linh thiêng trong đại lễ Khuấy Biển Sữa. Trên các vách đá đền thờ, Apsara là cầu nối giữa trần gian và thượng giới, hiện thân cho vẻ đẹp thánh thiện, sự sinh sôi và ân sủng thiên đình.",
            th: "ตามตำนาน นางอัปสราถือกำเนิดขึ้นจากฟองคลื่นเมื่อครั้งกวนเกษียรสมุทร เป็นสัญลักษณ์แห่งความงดงามและความอุดมสมบูรณ์",
          },
        },
        {
          id: "s2",
          heading: {
            en: "Living Heritage & Royal Ballet Revival",
            km: "ការស្តារឡើងវិញនូវរបាំព្រះរាជទ្រព្យ",
            vi: "Di Sản Sống & Sự Phục Hưng Múa Cung Đình",
            th: "การฟื้นฟูระบำหลวงมรดกโลก",
          },
          body: {
            en: "In the 1960s, Queen Sisowath Kossamak and Princess Norodom Buppha Devi meticulously codified classical choreography directly from Angkorian wall reliefs. Every hand gesture (kbach) conveys precise meaning — leaf, flower, fruit, transformation — preserving over 4,500 formal movement vocabularies in an unbroken sacred lineage.",
            km: "សម្តេចព្រះមហាក្សត្រិយានី ស៊ីសុវត្ថិ មុនីវង្ស កុសុមៈ នារីរ័ត្ន បានបង្កើត និងស្តារឡើងវិញនូវរបាំអប្សរាក្នុងទសវត្សរ៍ឆ្នាំ ១៩៦០ ដោយផ្អែកលើក្បាច់ចម្លាក់លើថ្មប្រាសាទ។",
            vi: "Vào thập niên 1960, Hoàng thái hậu Sisowath Kossamak và Công chúa Norodom Buppha Devi đã phục dựng vũ điệu cung đình trực tiếp từ các tư thế tạc trên đá. Mỗi cử chỉ bàn tay (kbach) biểu trưng cho lá non, nụ hoa, trái chín và sinh mệnh — bảo tồn hơn 4.500 thế tấn và động tác linh thiêng.",
            th: "สมเด็จพระมหากษัตรียานีสีสุวัตถิ์ กุสุมะ ทรงฟื้นฟูระบำหลวงโดยถอดรหัสท่ารำจากภาพสลักหินนครวัด สื่อความหมายผ่านท่วงท่ามือ (กบัด)",
          },
        },
      ],
    },
    gallery: [
      media("g-ap1", apsara, "Apsara headdress & jewellery typology", "ក្បាច់សក់ និងគ្រឿងអលង្ការអប្សរា", "EFEO Archives", "Họa tiết mũ miện và trang sức Apsara"),
      media("g-ap2", silk, "Royal ballet silk costume", "សម្លៀកបំពាក់របាំព្រះរាជទ្រព្យ", "Khmer Heritage Archive", "Trang phục lụa thêu kim tuyến múa hoàng gia"),
    ],
    relatedEntryIds: ["e-angkor-wat", "e-pinpeat", "e-silk-hol", "e-bayon"],
    citations: [
      { id: "c-ap1", title: "Khmer Costumes and Ornaments after the Devata of Angkor Wat", author: "Sappho Marchal", year: 1927, publisher: "G. Van Oest" },
      { id: "c-ap2", title: "Earth in Flower: The Divine Mystery of the Cambodian Dance Drama", author: "Paul Cravath", year: 2007, publisher: "DatAsia Press" },
    ],
  },
  {
    id: "e-pinpeat",
    slug: "pinpeat",
    categoryId: "music",
    title: {
      en: "Pinpeat Ensemble",
      km: "វង់ភ្លេងពិណពាទ្យ",
      vi: "Dàn Nhạc Lễ Pinpeat",
      th: "วงดนตรีพิณพาทย์",
    },
    summary: {
      en: "The ancient ritual percussion and reed orchestra of the Royal Palace and Theravada pagodas, whose instrumentation has been carved on Angkorian reliefs for over a millennium.",
      km: "វង់តន្ត្រីសក្ការៈបុរាណសម្រាប់ព្រះរាជពិធី និងវត្តអារាម ដែលមានចម្លាក់ឧបករណ៍តាំងពីសម័យអង្គរជាងមួយពាន់ឆ្នាំមុន។",
      vi: "Dàn nhạc gõ và kèn dăm nghi lễ linh thiêng của Hoàng gia và chùa chiền Phật giáo, được khắc họa trên phù điêu Angkor hơn 1.000 năm trước.",
      th: "วงดนตรีศักดิ์สิทธิ์ประจำราชสำนักและวัดวาอาราม มีหลักฐานภาพสลักเครื่องดนตรีตั้งแต่สมัยนครวัด",
    },
    era: {
      en: "Angkorian Period – Present",
      km: "សម័យអង្គរ – បច្ចុប្បន្ន",
      vi: "Thời kỳ Angkor – Nay",
      th: "สมัยพระนครถึงปัจจุบัน",
    },
    coverMedia: media(
      "m-pp",
      instrumentsImg,
      "Traditional Pinpeat instruments: Roneat and Gong Circles",
      "ឧបករណ៍ភ្លេងពិណពាទ្យ",
      "Khmer Heritage Archive",
      "Các nhạc cụ trong dàn nhạc Pinpeat: Roneat và Cồng Vòng",
      "เครื่องดนตรีในวงพิณพาทย์"
    ),
    content: {
      sections: [
        {
          id: "s1",
          heading: {
            en: "Colotomic Structure & Heterophonic Melody",
            km: "ឧបករណ៍តន្ត្រី និងរចនាសម្ព័ន្ធភ្លេង",
            vi: "Cấu Trúc Nhịp Chu Kỳ & Phức Điệu Dân Gian",
            th: "โครงสร้างวงดนตรีและสำเนียงเสียง",
          },
          body: {
            en: "The Pinpeat ensemble comprises the roneat ek (lead xylophone), roneat thung (low xylophone), kong vong toch and kong vong thom (gong circles), sralai (quadruple-reed oboe), sampho (sacred barrel drum), skor thom (large tuned floor drums), and chhing (bronze timekeeper cymbals). Musicians play without chords, continuously paraphrasing an unstated core melody in interlocking melodic layers.",
            km: "ឧបករណ៍រួមមាន រនាតឯក រនាតធុង គងវង់តូច គងវង់ធំ ស្រឡៃ សំភោរ ស្គរធំ និងឈិង។ វង់ភ្លេងនេះបន្លឺសំឡេងតាមទម្រង់បែបប្រពៃណីខ្មែរដ៏ពិរោះរណ្តំ។",
            vi: "Dàn nhạc Pinpeat bao gồm đàn roneat ek (mộc cầm chính), roneat thung (mộc cầm bè trầm), hai giàn cồng vòng kong vong toch và kong vong thom, kèn sralai 4 dăm, trống cái sampho, cặp đại cổ skor thom và thanh la chhing giữ nhịp. Dàn nhạc không dùng hợp âm Tây phương mà chơi theo cấu trúc phức điệu đa tầng trên một giai điệu xương sống.",
            th: "ประกอบด้วยระนาดเอก ระนาดทุ้ม ฆ้องวงเล็ก ฆ้องวงใหญ่ ปี่สไล กลองสัมโพ กลองทัด และฉิ่ง บรรเลงสอดประสานทำนองอย่างวิจิตร",
          },
        },
      ],
    },
    gallery: [
      media("g-pp1", instrumentsImg, "Roneat Ek boat resonator detail", "រនាតឯក", "Khmer Heritage Archive", "Chi tiết đàn Roneat Ek hình thuyền"),
    ],
    relatedEntryIds: ["e-roneat-ek", "e-chapei-dong-veng", "e-apsara", "e-angkor-wat"],
    citations: [
      { id: "c-pp1", title: "Khmer Music in Cambodia and Abroad", author: "Sam-Ang Sam", year: 2008, publisher: "Reyum Publishing" },
      { id: "c-pp2", title: "Traditional Music of Cambodia", author: "Toni Shapiro-Phim", year: 1999, publisher: "Smithsonian Folkways" },
    ],
  },
  {
    id: "e-roneat-ek",
    slug: "roneat-ek",
    categoryId: "music",
    title: {
      en: "Roneat Ek (High Xylophone)",
      km: "រនាតឯក",
      vi: "Đàn Mộc Cầm Roneat Ek",
      th: "ระนาดเอกเขมร",
    },
    summary: {
      en: "The primary melodic xylophone of the Pinpeat and Mohori ensembles, crafted in the graceful curve of a ceremonial river barge with 21 tuned bamboo or rosewood bars.",
      km: "រនាតដឹកនាំក្នុងវង់ភ្លេងពិណពាទ្យ និងមហោរី មានផ្លែ ២១ ស្នូកជារាងទូក បន្លឺជាសំនៀងគូ ៨ យ៉ាងពិរោះ។",
      vi: "Nhạc cụ lĩnh xướng giai điệu trong dàn nhạc Pinpeat và Mohori, chế tác uốn lượn như dáng thuyền rồng với 21 thanh tre hoặc gỗ cẩm lai.",
      th: "เครื่องดนตรีบรรเลงนำในวงพิณพาทย์ มีลูกระนาด 21 ลูก ตัวรางโค้งคล้ายเรือหงส์",
    },
    era: {
      en: "Angkorian – Contemporary",
      km: "សម័យអង្គរ – បច្ចុប្បន្ន",
      vi: "Thời kỳ Angkor – Hiện đại",
      th: "สมัยพระนครถึงปัจจุบัน",
    },
    coverMedia: media(
      "m-re",
      instrumentsImg,
      "Roneat Ek bamboo resonator with carved dragon motifs",
      "រនាតឯកឆ្លាក់ក្បាច់នាគ",
      "Khmer Heritage Archive",
      "Đàn Roneat Ek chạm khắc đầu Rồng",
      "ระนาดเอกสลักลายพญานาค"
    ),
    content: {
      sections: [
        {
          id: "s1",
          heading: {
            en: "Craftsmanship & Acoustic Tuning",
            km: "ការកែច្នៃ និងការរៀបចំសំនៀង",
            vi: "Kỹ Nghệ Chế Tác & Âm Luật Độc Bản",
            th: "การสร้างและการเทียบเสียง",
          },
          body: {
            en: "The 21 soundbars are carved from aged bamboo (bambusa tulda) or dense rosewood, suspended on cord above a boat-shaped soundbox (snuok). Each bar is tuned using a paste of beeswax mixed with lead shavings applied underneath. The virtuoso soloist plays with two padded or hard mallets, delivering rapid cascading ornamentations at thrilling tempos.",
            km: "ផ្លែរនាតទាំង ២១ ធ្វើពីឬស្សីពក ឬឈើក្រញូង ចងព្យួរលើស្នូកជារាងទូក។ ការតម្រូវសំនៀងប្រើជ័រឃ្មុំលាយសំណ។",
            vi: "21 thanh phím được làm từ tre già ngâm lâu năm hoặc gỗ cẩm lai, treo căng trên thân đàn hình thuyền (snuok). Nghệ nhân chỉnh âm bằng cách gắn sáp ong trộn mạt chì dưới bụng phím. Đàn được tấu bằng hai dùi gõ, tạo nên những chuỗi âm hoa mỹ lộng lẫy.",
            th: "ลูกระนาด 21 ลูกทำจากไม้ไผ่หรือไม้พยุง เทียบเสียงด้วยขี้ผึ้งผสมตะกั่ว บรรเลงด้วยไม้ตีสองอันอย่างคล่องแคล่ว",
          },
        },
      ],
    },
    gallery: [
      media("g-re1", instrumentsImg, "Close-up of Roneat bars and beeswax tuning", "ផ្លែរនាត", "Khmer Heritage Archive", "Cận cảnh hàng phím tre và sáp chỉnh âm"),
    ],
    relatedEntryIds: ["e-pinpeat", "e-chapei-dong-veng"],
    citations: [
      { id: "c-re1", title: "The Musical Heritage of Cambodia", author: "Chinary Ung", year: 2012, publisher: "Boston University Press" },
    ],
  },
  {
    id: "e-chapei-dong-veng",
    slug: "chapei-dong-veng",
    categoryId: "music",
    title: {
      en: "Chapei Dang Veng",
      km: "ចាប៉ីដងវែង",
      vi: "Đàn Chapei Dang Veng",
      th: "จะเข้จะเปยดองเวง",
    },
    summary: {
      en: "The iconic long-necked plucked lute of Cambodian oral bards, inscribed on the UNESCO List of Intangible Cultural Heritage in Need of Urgent Safeguarding in 2016.",
      km: "ឧបករណ៍ខ្សែដេញដងវែងបន្ទរចម្រៀងកំណាព្យកាព្យឃ្លោង ចុះបញ្ជីបេតិកភណ្ឌអរូបី UNESCO ឆ្នាំ ២០១៦។",
      vi: "Cây đàn đáy cần dài độc đáo của các nghệ nhân hát kể sử thi, được UNESCO ghi danh vào Danh mục Di sản Phi vật thể Cần bảo vệ Khẩn cấp năm 2016.",
      th: "พิณคอยาวของนักขับลำนำมุขปาฐะ ได้รับการขึ้นทะเบียนเป็นมรดقโลกทางวัฒนธรรมที่จับต้องไม่ได้ของยูเนสโกในปี 2016",
    },
    era: {
      en: "Pre-Angkorian – Contemporary",
      km: "មុនសម័យអង្គរ – បច្ចុប្បន្ន",
      vi: "Tiền Angkor – Hiện đại",
      th: "ยุคก่อนพระนครถึงปัจจุบัน",
    },
    coverMedia: media(
      "m-cp",
      instrumentsImg,
      "Chapei Dang Veng with mother-of-pearl inlay",
      "ចាប៉ីដងវែងគំរូ",
      "Khmer Heritage Archive",
      "Cây đàn Chapei Dang Veng khảm xà cừ",
      "จะเปยดองเวงฝังมุก"
    ),
    content: {
      sections: [
        {
          id: "s1",
          heading: {
            en: "Oral Epic Poetry & Social Commentary",
            km: "កំណាព្យចម្រៀង និងការអប់រំសង្គម",
            vi: "Hát Kể Sử Thi & Nghệ Thuật Ứng Tác Dân Gian",
            th: "มหากาพย์มุขปาฐะและการขับร้อง",
          },
          body: {
            en: "The chapei is a two-stringed long-necked lute with a circular or oval body made of jackfruit wood. Master bards pluck the nylon or silk strings while improvising rhyming verses on Buddhist morality, historical chronicles, folktales, and witty social commentary, keeping historical collective memory alive through generations.",
            km: "ចាប៉ីជាឧបករណ៍ខ្សែដេញធ្វើពីដើមខ្នុរ ដងវែង មានខ្សែពីរ។ ព្រឹទ្ធាចារ្យតន្ត្រីករដេញចាប៉ីបណ្តើរច្រៀងកំណាព្យកាព្យឃ្លោងបណ្តើរ អប់រំអំពីធម៌វិន័យ និងប្រវត្តិសាស្ត្រ។",
            vi: "Chapei là cây đàn cần dài 2 dây với bầu đàn làm từ gỗ mít. Các nghệ nhân lão thành vừa gảy đàn vừa ứng tác thơ ca, hát kể giáo lý Phật giáo, sử thi Jataka, truyện cổ tích và châm biếm thế sự, truyền tải ký ức lịch sử qua nhiều thế hệ.",
            th: "ทำจากไม้ขนุน ลำคอยาว มี 2 สาย นักขับลำนำจะดีดพิณพร้อมขับกลอนสดสั่งสอนธรรมะ เล่านิทานชาดก และสะท้อนสังคม",
          },
        },
      ],
    },
    gallery: [
      media("g-cp1", instrumentsImg, "Chapei player performing in traditional pagoda", "ការប្រគំចាប៉ីដងវែង", "UNESCO Archive", "Nghệ nhân biểu diễn Chapei tại sân chùa"),
    ],
    relatedEntryIds: ["e-pinpeat", "e-reamker", "e-roneat-ek"],
    citations: [
      { id: "c-cp1", title: "Nomination File No. 01165 for Inscription on the Urgent Safeguarding List", author: "UNESCO Intangible Cultural Heritage", year: 2016 },
    ],
  },
  {
    id: "e-silk-hol",
    slug: "silk-hol",
    categoryId: "costumes",
    title: {
      en: "Sampot Hol & Golden Silk",
      km: "សំពត់ហូល និងសូត្រមាសខ្មែរ",
      vi: "Lụa Tơ Vàng & Váy Sampot Hol",
      th: "ผ้ามัดหมี่โฮลและผ้าไหมทอง",
    },
    summary: {
      en: "The pinnacle of Cambodian textile artistry: weft-ikat silk dyed with natural barks and insects, woven into over 200 ancient royal court and sacred motifs.",
      km: "សិល្បៈតម្បាញសូត្រហូលខ្មែរដោយបច្ចេកទេសចងកៀវជ្រលក់ពណ៌ធម្មជាតិ បង្កើតជាក្បាច់រចនាប្រណីតជាង ២០០ ប្រភេទ។",
      vi: "Đỉnh cao nghệ thuật dệt may Campuchia: lụa ikat nhuộm màu vỏ cây và cánh kiến tự nhiên, tạo nên hơn 200 mẫu hoa văn cung đình cổ truyền.",
      th: "สุดยอดศิลปะผ้าทอมัดหมี่เขมร ย้อมด้วยสีธรรมชาติจากเปลือกไม้และครั่ง ทอเป็นลวดลายโบราณกว่า 200 ลาย",
    },
    era: {
      en: "Pre-Angkorian – Present",
      km: "មុនសម័យអង្គរ – បច្ចុប្បន្ន",
      vi: "Tiền Angkor – Nay",
      th: "ยุคก่อนพระนครถึงปัจจุบัน",
    },
    coverMedia: media(
      "m-sh",
      silk,
      "Intricate golden silk ikat weaving pattern",
      "ក្បាច់តម្បាញសូត្រហូល",
      "Khmer Heritage Archive",
      "Mẫu hoa văn dệt ikat lụa vàng truyền thống",
      "ลวดลายผ้าไหมมัดหมี่สีทองโบราณ"
    ),
    content: {
      sections: [
        {
          id: "s1",
          heading: {
            en: "Indigenous Golden Bombyx & Natural Dye Alchemy",
            km: "សូត្រមាស និងថ្នាំជ្រលក់ធម្មជាតិ",
            vi: "Giống Tằm Vàng Bản Địa & Sắc Màu Thiên Nhiên",
            th: "ไหมทองพื้นเมืองและสีย้อมธรรมชาติ",
          },
          body: {
            en: "Cambodian golden silk is spun from indigenous yellow silkworms fed exclusively on fresh local mulberry leaves. The complex tie-and-dye (chong kiet) process uses exclusively organic forest botanicals: prohut bark for warm saffron yellows, lac insect resin for rich crimson reds, indigo for deep blues, and ebony fruit for midnight blacks.",
            km: "សូត្រមាសបានមកពីដង្កូវនាងពូជក្នុងស្រុកស៊ីស្លឹកមន ចំណែកពណ៌ធម្មជាតិបានមកពីសំបកប្រហូត (ពណ៌លឿង) ជ័រល័ខ (ពណ៌ក្រហម) ផ្លែទ្រនឹម (ពណ៌ខ្មៅ)។",
            vi: "Lụa tơ vàng Campuchia được kéo từ giống tằm vàng bản địa nuôi bằng lá dâu tằm tươi. Quy trình nhuộm buộc ikat (chong kiet) sử dụng hoàn toàn sắc tố tự nhiên: vỏ cây prohut cho sắc vàng nghệ, nhựa cánh kiến đỏ cho màu thắm, cây chàm cho sắc xanh chàm và quả mặc nưa cho màu đen tuyền.",
            th: "เส้นไหมสีทองได้จากหนอนไหมพันธุ์พื้นเมือง ย้อมด้วยสีธรรมชาติ เช่น เปลือกมะพูด ครั่ง คราม และผลมะเกลือ",
          },
        },
      ],
    },
    gallery: [
      media("g-sh1", silk, "Traditional loom in Takeo province", "កីតម្បាញបុរាណ", "Khmer Heritage Archive", "Khung cửi dệt lụa truyền thống tại tỉnh Takeo"),
    ],
    relatedEntryIds: ["e-krama", "e-apsara"],
    citations: [
      { id: "c-sh1", title: "Traditional Textiles of Cambodia: Cultural Threads and Material Heritage", author: "Gillian Green", year: 2003, publisher: "River Books" },
    ],
  },
  {
    id: "e-krama",
    slug: "krama",
    categoryId: "costumes",
    title: {
      en: "The Khmer Krama",
      km: "ក្រមាខ្មែរ",
      vi: "Khăn Rằn Krama",
      th: "ผ้าขาวม้ากรามา",
    },
    summary: {
      en: "The ubiquitous checkered cotton or silk scarf of Cambodia, an indispensable cultural emblem with over 60 versatile daily, ritual, and martial uses.",
      km: "ក្រមាការ៉ូប្រពៃណីខ្មែរ ជានិមិត្តរូបនៃអត្តសញ្ញាណជាតិ និងមានគុណប្រយោជន៍ប្រើប្រាស់ជាង ៦០ យ៉ាងក្នុងជីវភាពប្រចាំថ្ងៃ។",
      vi: "Chiếc khăn rằn ca-rô biểu tượng của văn hóa Khmer, vật dụng đa năng với hơn 60 công dụng trong đời sống, nghi lễ và võ thuật Bokator.",
      th: "ผ้าพันคอลายตารางอันเป็นเอกลักษณ์ของชาวกัมพูชา มีประโยชน์ใช้สอยมากกว่า 60 ประการ",
    },
    era: {
      en: "Ancient – Contemporary",
      km: "បុរាណ – បច្ចុប្បន្ន",
      vi: "Cổ đại – Nay",
      th: "โบราณถึงปัจจุบัน",
    },
    coverMedia: media(
      "m-km",
      silk,
      "Handwoven cotton krama scarves with traditional red and blue checks",
      "ក្រមាខ្មែរប្រពៃណី",
      "Khmer Heritage Archive",
      "Khăn rằn Krama dệt thủ công với sọc ca-rô xanh đỏ",
      "ผ้าขาวม้ากรามาทอมือลายดั้งเดิม"
    ),
    content: {
      sections: [
        {
          id: "s1",
          heading: {
            en: "Identity, Utility & Martial Heritage",
            km: "អត្តសញ្ញាណ ការប្រើប្រាស់ និងក្បាច់គុនបុរាណ",
            vi: "Biểu Tượng Bản Sắc, Đa Dụng & Võ Cổ Truyền",
            th: "อัตลักษณ์ ประโยชน์ใช้สอย และศิลปะการต่อสู้",
          },
          body: {
            en: "Woven in distinctive red-and-white or blue-and-white gingham patterns, the krama serves as a headscarf, sunshield, hammock for infants, sarong for bathing, water filter, and carrying bundle. In Yutkhun Khom and Bokator martial arts, masters fold and strike with the krama as a formidable flexible weapon.",
            km: "ក្រមាមានក្រឡាការ៉ូក្រហមស ឬខៀវស ប្រើសម្រាប់រុំក្បាល បាំងថ្ងៃ អង្រឹងកូនក្មេង ងូតទឹក និងជាអាវុធក្នុងក្បាច់គុនល្បុក្កតោ។",
            vi: "Dệt với họa tiết ca-rô đỏ-trắng hoặc xanh-trắng đặc trưng, khăn Krama dùng để quấn đầu, che nắng, làm võng ru em bé, làm xiêm tắm, túi bọc đồ. Trong võ thuật cổ truyền Bokator, khăn Krama còn được gập lại thành một vũ khí linh hoạt và hiểm hóc.",
            th: "ใช้โพกศีรษะ กันแดด ผูกเป็นเปลเด็ก นุ่งอาบน้ำ และยังใช้เป็นอาวุธในศิลปะการต่อสู้โบกบอตอร์",
          },
        },
      ],
    },
    gallery: [
      media("g-km1", silk, "Krama weaving in rural village", "តម្បាញក្រមា", "Khmer Heritage Archive", "Khung dệt khăn Krama tại làng nghề nông thôn"),
    ],
    relatedEntryIds: ["e-silk-hol"],
    citations: [
      { id: "c-km1", title: "Krama: The Scarf of Life", author: "Ministry of Culture and Fine Arts Cambodia", year: 2018 },
    ],
  },
  {
    id: "e-reamker",
    slug: "reamker",
    categoryId: "script",
    title: {
      en: "The Reamker Epic",
      km: "រឿងរាមកេរ្តិ៍ខ្មែរ",
      vi: "Sử Thi Reamker",
      th: "รามเกียรติ์ฉบับเขมร",
    },
    summary: {
      en: "The Cambodian adaptation of the Ramayana epic, deeply imbued with Theravada Buddhist ethics, indigenous folk beliefs, and classical stagecraft.",
      km: "រឿងមหากាព្យរាមកេរ្តិ៍ខ្មែរ ដែលបានបង្កប់នូវទស្សនវិជ្ជាព្រះពុទ្ធសាសនា និងសីលធម៌សង្គមដ៏ជ្រាលជ្រៅ។",
      vi: "Bản sử thi Ramayana chuyển hóa theo văn hóa Khmer, thấm đẫm triết lý Phật giáo Nam tông và nghệ thuật sân khấu cổ điển.",
      th: "มหากาพย์รามเกียรติ์ฉบับกัมพูชา ผสมผสานหลักธรรมทางพุทธศาสนาและวรรณกรรมพื้นบ้าน",
    },
    era: {
      en: "Post-Angkorian – Contemporary",
      km: "ក្រោយសម័យអង្គរ – បច្ចុប្បន្ន",
      vi: "Thời kỳ Hậu Angkor – Nay",
      th: "สมัยหลังพระนครถึงปัจจุบัน",
    },
    coverMedia: media(
      "m-rk",
      apsara,
      "Royal Palace Silver Pagoda mural depicting the Battle of Lanka in the Reamker",
      "គំនូរបុរាណរឿងរាមកេរ្តិ៍នៅវត្តប្រាក់",
      "Khmer Heritage Archive",
      "Bích họa sử thi Reamker tại Chùa Bạc Hoàng Cung",
      "ภาพจิตรกรรมฝาผนังรามเกียรติ์ที่วัดพระแก้วมรกตพนมเปญ"
    ),
    content: {
      sections: [
        {
          id: "s1",
          heading: {
            en: "Buddhist Transformation & Epic Murals",
            km: "ការកែប្រែតាមបែបពុទ្ធសាសនា និងគំនូរបុរាណ",
            vi: "Sự Biến Chuyển Theo Tinh Thần Phật Giáo & Tranh Bích Họa",
            th: "การปรับเปลี่ยนสู่แนวคิดพุทธและจิตรกรรมฝาผนัง",
          },
          body: {
            en: "Unlike the Indian Valmiki Ramayana where Rama is strictly an avatar of Vishnu, in the Khmer Reamker Preah Ream is venerated as a future Bodhisattva. The 642-meter gallery mural surrounding the Silver Pagoda in Phnom Penh, painted in 1903–1904, represents the longest continuous painted narrative of the epic in Southeast Asia.",
            km: "ក្នុងរឿងរាមកេរ្តិ៍ខ្មែរ ព្រះរាមត្រូវបានគោរពជាព្រះពោធិសត្វ។ គំនូរបុរាណប្រវែង ៦៤២ ម៉ែត្រជុំវិញថែវវត្តប្រាក់ ជារតនសម្បត្តិសិល្បៈដ៏ពិសិដ្ឋ។",
            vi: "Khác với nguyên bản Ramayana Ấn Độ, trong Reamker của người Khmer, hoàng tử Preah Ream được tôn xưng như một vị Bồ Tát tương lai. Dãy bích họa dài 642 mét bao quanh Chùa Bạc tại thủ đô Phnom Penh vẽ năm 1903–1904 là một trong những tác phẩm hội họa sử thi dài nhất Đông Nam Á.",
            th: "พระรามในฉบับเขมรได้รับการยกย่องเป็นพระโพธิสัตว์ ภาพจิตรกรรมฝาผนังความยาว 642 เมตรที่วัดเงินในพนมเปญคือมรดกชิ้นเอก",
          },
        },
      ],
    },
    gallery: [
      media("g-rk1", apsara, "Hanuman and Sovann Maccha detail", "ហនុមាន និងសុវណ្ណមច្ឆា", "Khmer Heritage Archive", "Tranh vẽ Tướng khỉ Hanuman và nàng tiên cá Sovann Maccha"),
    ],
    relatedEntryIds: ["e-apsara", "e-angkor-wat", "e-chapei-dong-veng"],
    citations: [
      { id: "c-rk1", title: "Études sur le Ramakerti (XVIe–XVIIe siècles)", author: "Saveros Pou", year: 1977, publisher: "EFEO" },
    ],
  },
  {
    id: "e-jayavarman-vii",
    slug: "jayavarman-vii",
    categoryId: "figures",
    title: {
      en: "King Jayavarman VII",
      km: "ព្រះបាទជ័យវរ្ម័នទី ៧",
      vi: "Đại Đế Jayavarman VII",
      th: "พระเจ้าชัยวรมันที่ 7",
    },
    summary: {
      en: "The greatest builder king of the Khmer Empire (r. 1181–1218 CE), who unified the realm, transformed state religion to Mahayana Buddhism, and constructed Angkor Thom, Bayon, and 102 public hospitals.",
      km: "ព្រះមហាក្សត្រដ៏អស្ចារ្យបំផុតនៃចក្រភពអង្គរ (គ្រងរាជ្យ ១១៨១-១២១៨) ដែលបានបង្រួបបង្រួមជាតិ និងកសាងអង្គរធំ បាយ័ន និងមន្ទីរពេទ្យ ១០២ កន្លែង។",
      vi: "Vị vua kiến thiết vĩ đại nhất của Đế chế Khmer (trị vì 1181–1218 CN), người thống nhất giang sơn, chuyển quốc đạo sang Phật giáo Đại thừa và xây dựng Angkor Thom, Bayon cùng 102 bệnh viện công.",
      th: "มหาราชผู้ยิ่งใหญ่ที่สุดแห่งจักรวรรดิเขมร ผู้สร้างนครธม ปราสาทบายอน และอโรคยศาล 102 แห่งทั่วราชอาณาจักร",
    },
    era: {
      en: "1181 – 1218 CE",
      km: "ឆ្នាំ ១១៨១ – ១២១៨ នៃ គ.ស.",
      vi: "Năm 1181 – 1218 CN",
      th: "ค.ศ. 1181 – 1218",
    },
    coverMedia: media(
      "m-jv",
      bayon,
      "Stone portrait statue of King Jayavarman VII in meditation",
      "រូបសំណាកព្រះបាទជ័យវរ្ម័នទី ៧",
      "National Museum of Cambodia",
      "Tượng đá sa thạch vua Jayavarman VII trong tư thế thiền định",
      "พระรูปสลักหินทรายพระเจ้าชัยวรมันที่ 7 ในท่าสมาธิ"
    ),
    content: {
      sections: [
        {
          id: "s1",
          heading: {
            en: "Compassion as Statecraft & Welfare Network",
            km: "ព្រហ្មវិហារធម៌ និងការកសាងមន្ទីរព្យាបាលរោគ",
            vi: "Đức Trị Từ Bi & Hệ Thống Y Tế Toàn Quốc",
            th: "การปกครองด้วยทศพิธราชธรรมและเครือข่ายอโรคยศาล",
          },
          body: {
            en: "As recorded on the stele of Ta Prohm: 'He suffered more from his subjects' afflictions than from his own; for it is the public grief that makes kings suffer.' Jayavarman VII constructed an empire-wide infrastructure comprising 102 arogyasala (free public hospitals), 121 fire shrines (dharmasala/resthouses) along imperial highways, and major temple-universities including Ta Prohm and Preah Khan.",
            km: "សិលាចារឹកប្រាសាទតាព្រហ្មបានចារថា៖ 'ទុក្ខរបស់ប្រជារាស្ត្រ គឺជាទុក្ខរបស់ព្រះមហាក្សត្រ'។ ព្រះអង្គបានកសាងមន្ទីរពេទ្យ ១០២ កន្លែង និងសាលាសំណាក់ ១២១ កន្លែង។",
            vi: "Như văn bia đền Ta Prohm khắc ghi: 'Nỗi đau của muôn dân khiến nhà vua đau đớn hơn chính nỗi đau của mình'. Jayavarman VII đã thiết lập mạng lưới 102 bệnh xá miễn phí (arogyasala), 121 trạm dừng chân cứu tế (dharmasala) trên các tuyến quan đạo, cùng các đại tu viện học thuật Ta Prohm và Preah Khan.",
            th: "ศิลาจารึกปราสาทตาพรหมระบุว่า ความทุกข์ของราษฎรคือความทุกข์ของพระองค์ พระองค์ทรงสร้างอโรคยศาล 102 แห่งและที่พักคนเดินทาง 121 แห่ง",
          },
        },
      ],
    },
    gallery: [
      media("g-jv1", bayon, "Ta Prohm temple-monastery", "ប្រាសាទតាព្រហ្ម", "Khmer Heritage Archive", "Đền Ta Prohm được xây để phụng dưỡng Hoàng thái hậu"),
    ],
    relatedEntryIds: ["e-bayon", "e-angkor-thom", "e-angkor-wat"],
    citations: [
      { id: "c-jv1", title: "Jayavarman VII: The Great King of Angkor", author: "George Cœdès", year: 1968, publisher: "University of Hawaii Press" },
    ],
  },
  {
    id: "e-amok-trey",
    slug: "amok-trey",
    categoryId: "cuisine",
    title: {
      en: "Amok Trey (Steamed Fish Curry)",
      km: "អាម៉ុកត្រីបុរាណ",
      vi: "Amok Trey (Cá Hấp Lá Chuối)",
      th: "ห่อหมกปลาอาม็อกเขมร",
    },
    summary: {
      en: "The quintessential national dish of Cambodia: fresh Tonle Sap snakehead fish steamed with aromatic kroeung curry paste, coconut cream, and wild slok ngor leaves in a banana leaf basket.",
      km: "ម្ហូបប្រចាំជាតិខ្មែរដ៏ពិសិដ្ឋ ធ្វើពីត្រីរ៉ស់ទន្លេសាប ចំហុយជាមួយគ្រឿងបុក ខ្ទិះដូង និងស្លឹកញ ក្នុងកន្ទោងស្លឹកចេក។",
      vi: "Món ăn quốc hồn quốc túy của Campuchia: cá lóc Biển Hồ hấp cùng gia vị kroeung, nước cốt dừa và lá ngor trong xửng lá chuối xanh.",
      th: "อาหารประจำชาติกัมพูชา เนื้อปลาช่อนโตนเลสาบนึ่งเครื่องแกงเกรือน กะทิ และใบยอในกระทงใบตอง",
    },
    era: {
      en: "Ancient Culinary Heritage",
      km: "បេតិកភណ្ឌម្ហូបបុរាណ",
      vi: "Di sản Ẩm thực Cổ truyền",
      th: "มรดกภูมิปัญญาอาหารโบราณ",
    },
    coverMedia: media(
      "m-at-curry",
      silk,
      "Traditional Amok Trey steamed in banana leaf kra'tong",
      "អាម៉ុកត្រីក្នុងកន្ទោងស្លឹកចេក",
      "Khmer Heritage Archive",
      "Món cá Amok Trey hấp trong chén lá chuối",
      "ห่อหมกปลาอาม็อกในกระทงใบตอง"
    ),
    content: {
      sections: [
        {
          id: "s1",
          heading: {
            en: "The Harmony of Tonle Sap Fish & Kroeung Aromatics",
            km: "គ្រឿងផ្សំ និងសិល្បៈចម្អិន",
            vi: "Sự Hòa Quyện Giữa Cá Biển Hồ & Thảo Mộc Kroeung",
            th: "ส่วนผสมและศิลปะการปรุง",
          },
          body: {
            en: "Amok Trey represents the culinary genius of the Mekong floodplains. Fresh river fish is hand-beaten with freshly pounded kroeung (lemongrass, kaffir lime zest, galangal, turmeric, shallots, garlic), fish sauce, egg, and thick coconut milk to create a velvety custard (mousse), laid atop slightly bitter slok ngor leaves and steamed gently over wood fire.",
            km: "អាម៉ុកត្រីបង្ហាញពីភាពប៉ិនប្រសប់នៃការច្នៃប្រឌិតម្ហូបខ្មែរ ដោយផ្សំត្រីស្រស់ជាមួយគ្រឿងបុកស្លឹកគ្រៃ រមៀត រំដេង ខ្ទិះដូង និងស្លឹកញ។",
            vi: "Amok Trey thể hiện sự tinh túy của văn hóa ẩm thực châu thổ Mekong. Thịt cá sông tươi ngon được quết dẻo cùng gia vị kroeung (sả, vỏ chanh kaffir, riềng, nghệ tươi, hành tỏi), nước mắm, trứng và nước cốt dừa béo ngậy, lót dưới bằng lá ngor có vị đắng nhẹ rồi hấp chín dịu trên xửng tre.",
            th: "การผสมผสานของเนื้อปลาน้ำจืดสดๆ เครื่องแกงสมุนไพร กะทิ และใบยอ นึ่งจนเนื้อเนียนนุ่มหอมละมุน",
          },
        },
      ],
    },
    gallery: [
      media("g-at2", silk, "Pounding fresh yellow kroeung paste in granite mortar", "ការបុកគ្រឿង", "Khmer Heritage Archive", "Cối giã thảo mộc gia vị Kroeung truyền thống"),
    ],
    relatedEntryIds: ["e-silk-hol", "e-pchum-ben"],
    citations: [
      { id: "c-at-curry", title: "The Taste of Angkor: Culinary Heritage of Cambodia", author: "Ministry of Foreign Affairs and International Cooperation", year: 2021 },
    ],
  },
  {
    id: "e-pchum-ben",
    slug: "pchum-ben",
    categoryId: "rituals",
    title: {
      en: "Pchum Ben (Ancestors' Day)",
      km: "ពិធីបុណ្យភ្ជុំបិណ្ឌ",
      vi: "Lễ Hội Báo Hiếu Pchum Ben",
      th: "เทศกาลแซนโดนตา (สารทเขมร)",
    },
    summary: {
      en: "The deeply spiritual 15-day festival of ancestral remembrance in the Khmer calendar, culminating in the pre-dawn ritual of offering rice balls (bay ben) to hungry spirits.",
      km: "ពិធីបុណ្យប្រពៃណីជាតិរយៈពេល ១៥ ថ្ងៃ ដើម្បីឧទ្ទិសកុសលជូនដល់បុព្វការីជន និងញាតិកាលទាំង ៧ សន្តានដែលបានចែកឋាន។",
      vi: "Lễ hội tâm linh kéo dài 15 ngày để tưởng nhớ và tích công đức cho tổ tiên 7 đời, nổi bật với nghi thức tung cơm vắt (bay ben) lúc rạng đông.",
      th: "เทศกาลอุทิศส่วนกุศลแด่บรรพบุรุษ 15 วัน ไฮไลท์คือพิธีโยนก้อนข้าวดวงวิญญาณยามเช้าตรู่",
    },
    era: {
      en: "Ancestral Khmer Tradition",
      km: "ប្រពៃណីដូនតាខ្មែរ",
      vi: "Truyền thống Dân gian Cổ xưa",
      th: "ประเพณีโบราณสืบทอดหลายชั่วอายุคน",
    },
    coverMedia: media(
      "m-pb",
      angkorWat,
      "Monks chanting at dawn during Pchum Ben pagoda ceremonies",
      "ពិធីបោះបាយបិណ្ឌពេលព្រឹកព្រាង",
      "Khmer Heritage Archive",
      "Nghi thức tụng kinh dâng cơm cúng tại chùa trong mùa lễ Pchum Ben",
      "พระสงฆ์สวดเจริญพระพุทธมนต์ในเทศกาลสารทเขมร"
    ),
    content: {
      sections: [
        {
          id: "s1",
          heading: {
            en: "The Pre-Dawn Rite of Bay Ben",
            km: "ពិធីបោះបាយបិណ្ឌ",
            vi: "Nghi Lễ Tung Cơm Bay Ben Lúc Rạng Đông",
            th: "พิธีโยนข้าวก้อนยามเช้าตรู่",
          },
          body: {
            en: "Celebrated during the waning moon of the lunar month of Photrobot (September/October), gates of the underworld are believed to open, allowing hungry wandering ghosts (pret) to receive merits. Before sunrise at 4:00 AM, devotees walk three times around the temple sanctuary, tossing small sesamum-rice balls (bay ben) onto temple grounds while chanting compassionate blessings.",
            km: "ក្នុងអំឡុងខែភទ្របទ ទ្វារនរកត្រូវបើកចំហឲ្យប្រេតមករកអាហារ។ ពុទ្ធបរិស័ទនាំគ្នាដើរប្រទักษិណ ៣ ជុំព្រះវិហារ និងបោះបាយបិណ្ឌនៅវេលាម៉ោង ៤ ភ្លឺ។",
            vi: "Diễn ra vào hạ tuần tháng Bhadrapada âm lịch (tháng 9-10), tương truyền cánh cửa địa ngục mở ra để các linh hồn đói khát (ngạ quỷ - pret) tìm kiếm ân phước. Trước 4 giờ sáng, thiện nam tín nữ đi nhiễu ba vòng quanh chánh điện và tung những vắt cơm nếp trộn mè đen (bay ben) để bố thí trong tiếng kinh kệ từ bi.",
            th: "ในช่วงแรม 1-15 ค่ำ เดือน 10 ประตูนรกเปิดออก ผู้คนจะตื่นแต่เช้ามืดไปเวียนประทักษิณรอบโบสถ์และโยนก้อนข้าวบิณฑ์เพื่อโปรดดวงวิญญาณ",
          },
        },
      ],
    },
    gallery: [
      media("g-pb1", angkorWat, "Devotees in white traditional silk offering food to sangha", "ពុទ្ធបរិស័ទប្រគេនចង្ហាន់", "Khmer Heritage Archive", "Thiện nam tín nữ trong trang phục áo trắng dâng thực phẩm"),
    ],
    relatedEntryIds: ["e-silk-hol", "e-amok-trey"],
    citations: [
      { id: "c-pb1", title: "Cérémonies des douze mois: Fêtes d'Année Cambodgiennes", author: "Adhémard Leclère", year: 1916, publisher: "Ernest Leroux" },
    ],
  },
  {
    id: "e-phnom-kulen",
    slug: "phnom-kulen",
    categoryId: "landmarks",
    title: {
      en: "Phnom Kulen Holy Mountain",
      km: "រមណីយដ្ឋានភ្នំគូលេន",
      vi: "Thánh Địa Núi Thiêng Phnom Kulen",
      th: "ภูเขาศักดิ์สิทธิ์พนมกุเลน",
    },
    summary: {
      en: "The sacred sandstone plateau (ancient Mahendraparvata) where Jayavarman II proclaimed independence in 802 CE, renowned for the River of a Thousand Lingas and majestic waterfall.",
      km: "ខ្ពង់រាបភ្នំថ្មភក់សក្ការៈ (មហេន្ទ្របព៌តបុរាណ) ជាទីតាំងដែលព្រះបាទជ័យវរ្ម័នទី ២ ប្រកាសឯករាជ្យក្នុងឆ្នាំ ៨០២ និងមានស្ទឹងលិង្គ ១០០០។",
      vi: "Cao nguyên sa thạch thiêng liêng (cố đô Mahendraparvata) nơi vua Jayavarman II tuyên bố độc lập năm 802 CN, nổi tiếng với Dòng Sông Ngàn Linga.",
      th: "ที่ราบสูงหินทรายศักดิ์สิทธิ์ (มเหนทรบรรพต) สถานที่สถาปนาจักรวรรดิเขมรในปี ค.ศ. 802 และสายน้ำศิวลึงค์ 1,000 องค์",
    },
    era: {
      en: "802 CE – Present",
      km: "ឆ្នាំ ៨០២ – បច្ចុប្បន្ន",
      vi: "Năm 802 CN – Nay",
      th: "ค.ศ. 802 ถึงปัจจุบัน",
    },
    coverMedia: media(
      "m-pk",
      banteaySrei,
      "The carved River of a Thousand Lingas in Phnom Kulen riverbed",
      "ស្ទឹងលិង្គមួយពាន់ភ្នំគូលេន",
      "Khmer Heritage Archive",
      "Lòng sông chạm khắc ngàn Linga và phù điêu thần Vishnu tại Phnom Kulen",
      "แม่น้ำศิวลึงค์ 1,000 องค์บนเทือกเขาพนมกุเลน"
    ),
    coordinates: { latitude: 13.5786, longitude: 104.1103 },
    content: {
      sections: [
        {
          id: "s1",
          heading: {
            en: "Cradle of Empire & The River of a Thousand Lingas",
            km: "ទីតាំងកំណើតនៃចក្រភពអង្គរ និងស្ទឹងលិង្គមួយពាន់",
            vi: "Cái Nôi Của Đế Chế & Dòng Sông Ngàn Linga",
            th: "จุดกำเนิดจักรวรรดิเขมรและสายน้ำแห่งศิวลึงค์",
          },
          body: {
            en: "In 802 CE, Jayavarman II performed the sacred Devaraja ritual on Phnom Kulen, declaring freedom from Javanese suzerainty. The mountain bed of the Kbal Spean and Siem Reap rivers was carved with over a thousand sacred lingas and reliefs of Vishnu reclining on Ananta, sanctifying the water as it flowed down to irrigate the great paddy fields and barays of Angkor.",
            km: "នៅឆ្នាំ ៨០២ ព្រះបាទជ័យវរ្ម័នទី ២ បានប្រារព្ធពិធីទេវរាជលើភ្នំគូលេន។ ក្រោមបាតស្ទឹងមានឆ្លាក់រូបលិង្គ ១០០០ និងព្រះវិស្ណុផ្ទុំលើនាគអនន្ត ដើម្បីប្រសិទ្ធពរទឹកហូរទៅស្រោចស្រពវាលស្រែអង្គរ។",
            vi: "Năm 802 CN, vua Jayavarman II cử hành đại lễ Thần Vương trên đỉnh Phnom Kulen, tuyên bố giải phóng quốc gia khỏi ách chư hầu Java. Dưới lòng suối đá, các nghệ nhân đã chạm khắc hơn 1.000 biểu tượng Linga và phù điêu thần Vishnu an tọa trên Rắn thần Ananta, biến dòng nước nguồn thành dòng thánh thủy tưới mát các cánh đồng và hồ chứa Angkor.",
            th: "ในปี ค.ศ. 802 มีพิธีสถาปนาลัทธิเทวราชา ใต้ท้องน้ำสลักศิวลึงค์นับพันองค์เพื่อให้น้ำไหลผ่านเสมือนน้ำศักดิ์สิทธิ์หล่อเลี้ยงเมืองพระนคร",
          },
        },
      ],
    },
    gallery: [
      media("g-pk1", banteaySrei, "Phnom Kulen waterfall", "ទឹកធ្លាក់ភ្នំគូលេន", "Khmer Heritage Archive", "Thác nước hùng vĩ trên núi Phnom Kulen"),
    ],
    relatedEntryIds: ["e-angkor-wat", "e-bayon", "e-jayavarman-vii"],
    citations: [
      { id: "c-pk1", title: "Mahendraparvata: Discovery of an Early Angkorian Capital", author: "Jean-Baptiste Chevance et al.", year: 2019, publisher: "Antiquity Journal" },
    ],
  },
];

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
