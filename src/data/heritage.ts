import angkorWat from "../assets/angkor-wat.jpg";
import apsara from "../assets/apsara.jpg";
import bayon from "../assets/bayon.jpg";
import banteaySrei from "../assets/banteay-srei.jpg";
import instrumentsImg from "../assets/instruments.jpg";
import silk from "../assets/silk.jpg";
import type {
  Category,
  EntryDetail,
  EraBand,
  HeritageSite,
  Instrument,
  MediaAsset,
  Trail,
} from "./types.ts";

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
): MediaAsset => ({
  id,
  url,
  thumbnailUrl: url,
  type: "image",
  title: { en, km },
  creator,
  source: "Khmer Heritage Archive",
  sourceUrl: "https://khmerheritage.example/archive",
  license: "cc_by_sa",
  licenseUrl: "https://creativecommons.org/licenses/by-sa/4.0/",
  attribution: `${creator} — Khmer Heritage Archive, CC BY-SA 4.0`,
});

export const categories: Category[] = [
  {
    id: "history",
    slug: "history",
    title: { en: "Khmer History", km: "សម័យកាលប្រវត្តិសាស្ត្រ" },
    blurb: { en: "Funan · Chenla · Angkor · Post-Angkor", km: "ហ្វូណន ចេនឡា អង្គរ" },
    count: 42,
  },
  {
    id: "temples",
    slug: "temples",
    title: { en: "Temples & Architecture", km: "ប្រាសាទ និងស្ថាបត្យកម្ម" },
    blurb: { en: "Angkor Wat · Bayon · Banteay Srei", km: "អង្គរវត្ត បាយ័ន បន្ទាយស្រី" },
    count: 128,
  },
  {
    id: "arts",
    slug: "arts",
    title: { en: "Arts & Sculpture", km: "សិល្បៈ និងចម្លាក់" },
    blurb: { en: "Apsara · Bas-reliefs · Kbach · Bronze", km: "អប្សរា ចម្លាក់ ក្បាច់" },
    count: 87,
  },
  {
    id: "music",
    slug: "music",
    title: { en: "Music & Instruments", km: "តន្ត្រីបុរាណ" },
    blurb: { en: "Pinpeat · Mohori · Chapei · Roneat", km: "ពិណពាទ្យ មហោរី ចាប៉ី" },
    count: 34,
  },
  {
    id: "rituals",
    slug: "rituals",
    title: { en: "Rituals & Festivals", km: "ពិធីបុណ្យ និងទំនៀមទម្លាប់" },
    blurb: { en: "Pchum Ben · Khmer New Year · Bon Om Touk", km: "ភ្ជុំបិណ្ឌ ចូលឆ្នាំ" },
    count: 29,
  },
  {
    id: "script",
    slug: "script",
    title: { en: "Script & Literature", km: "អក្សរសាស្ត្រ" },
    blurb: { en: "Epigraphy · Aksar Mul · Reamker", km: "សិលាចារឹក អក្សរមូល រាមកេរ្តិ៍" },
    count: 45,
  },
  {
    id: "crafts",
    slug: "crafts",
    title: { en: "Crafts & Textiles", km: "សិប្បកម្ម និងសម្លៀកបំពាក់" },
    blurb: { en: "Silk Hol · Krama · Silverware", km: "សូត្រហូល ក្រមា ប្រាក់" },
    count: 51,
  },
  {
    id: "cuisine",
    slug: "cuisine",
    title: { en: "Cuisine & Agriculture", km: "ម្ហូបអាហារ និងកសិកម្ម" },
    blurb: { en: "Tonle Sap heritage · Culinary technique", km: "ទន្លេសាប ម្ហូបបុរាណ" },
    count: 38,
  },
];

export const eras: EraBand[] = [
  {
    id: "pre",
    label: { en: "Pre-Angkorian", km: "មុនសម័យអង្គរ" },
    range: { en: "1st – 8th c. CE", km: "សតវត្សរ៍ទី ១ – ទី ៨ នៃ គ.ស." },
    note: { en: "Funan and Chenla polities, Sambor Prei Kuk brick towers.", km: "រដ្ឋហ្វូណន និងចេនឡា ប្រាសាទឥដ្ឋសំបូរព្រៃគុក។" },
  },
  {
    id: "early",
    label: { en: "Early Angkorian", km: "អង្គរដើម" },
    range: { en: "802 – 1000 CE", km: "ឆ្នាំ ៨០២ – ១០០០ នៃ គ.ស." },
    note: { en: "Jayavarman II founds the devaraja cult on Phnom Kulen.", km: "ព្រះបាទជ័យវរ្ម័នទី ២ បានស្ថាបនាលទ្ធិទេវរាជនៅលើភ្នំគូលេន។" },
  },
  {
    id: "golden",
    label: { en: "Classical Golden Age", km: "យុគមាសបុរាណ" },
    range: { en: "1000 – 1220 CE", km: "ឆ្នាំ ១០០០ – ១២២០ នៃ គ.ស." },
    note: { en: "Angkor Wat, Bayon and the empire at its widest reach.", km: "ប្រាសាទអង្គរវត្ត បាយ័ន និងការរីកចម្រើនអតិបរមានៃចក្រភព។" },
  },
  {
    id: "post",
    label: { en: "Post-Angkorian", km: "ក្រោយសម័យអង្គរ" },
    range: { en: "1431 – 1863 CE", km: "ឆ្នាំ ១៤៣១ – ១៨៦៣ នៃ គ.ស." },
    note: { en: "Capitals move to Longvek and Oudong; Theravada ascendancy.", km: "ការផ្លាស់រាជធានីទៅលង្វែក និងឧដុង្គ ភាពរីកចម្រើននៃព្រះពុទ្ធសាសនាថេរវាទ។" },
  },
  {
    id: "modern",
    label: { en: "Modern Renaissance", km: "ការរស់ឡើងវិញសម័យទំនើប" },
    range: { en: "1953 – present", km: "ឆ្នាំ ១៩៥៣ – បច្ចុប្បន្ន" },
    note: { en: "Revival of classical dance, epigraphy and conservation.", km: "ការស្តារឡើងវិញនូវរបាំព្រះរាជទ្រព្យ សិលាចារឹក និងការអភិរក្ស។" },
  },
];

export const trails: Trail[] = [
  {
    id: "t1",
    title: { en: "The Sacred Mountains of the Gods", km: "ភ្នំពិសិដ្ឋនៃទេពនិករ" },
    stops: 6,
    blurb: { en: "Temple-mountains from Phnom Kulen to Phnom Bakheng.", km: "ពីភ្នំគូលេនដល់ភ្នំបាខែង" },
    coverUrl: angkorWat,
  },
  {
    id: "t2",
    title: { en: "Musical Legends of Chapei", km: "រឿងព្រេងចាប៉ីដងវែង" },
    stops: 4,
    blurb: { en: "The oral poets who carried memory through catastrophe.", km: "អ្នកចម្រៀងបុរាណ" },
    coverUrl: instrumentsImg,
  },
  {
    id: "t3",
    title: { en: "Guardians of the Temples", km: "អ្នកយាមប្រាសាទ" },
    stops: 5,
    blurb: { en: "Naga, Garuda, Dvarapala and the lions of the causeway.", km: "នាគ គ្រុឌ ទ្វារបាល" },
    coverUrl: bayon,
  },
];

export const entries: EntryDetail[] = [
  {
    id: "e-angkor-wat",
    slug: "angkor-wat",
    categoryId: "temples",
    title: { en: "Angkor Wat", km: "ប្រាសាទអង្គរវត្ត" },
    summary: {
      en: "The largest religious monument on earth, raised by Suryavarman II as a terrestrial model of Mount Meru and the funerary temple of a god-king.",
      km: "សំណង់សាសនាធំបំផុតលើពិភពលោក សាងឡើងដោយព្រះបាទសូរ្យវរ្ម័នទី ២ ជាគំរូនៃភ្នំព្រះសុមេរុ។",
    },
    era: {
      en: "12th Century CE · King Suryavarman II",
      km: "សតវត្សរ៍ទី ១២ នៃ គ.ស. · ព្រះបាទសូរ្យវរ្ម័នទី ២",
    },
    coverMedia: media("m-aw", angkorWat, "Angkor Wat at dawn", "អង្គរវត្តពេលព្រឹកព្រាង", "Khmer Heritage Archive"),
    coordinates: { latitude: 13.4125, longitude: 103.867 },
    content: {
      sections: [
        {
          id: "s1",
          heading: { en: "Architectural Layout & Cosmology", km: "ប្លង់ស្ថាបត្យកម្ម និងចក្រវាឡវិទ្យា" },
          body: {
            en: "The temple is a cosmogram in sandstone. Five quincunx towers stand for the peaks of Mount Meru, the enclosing galleries for the mountain ranges at the edge of the world, and the 190-metre moat for the cosmic ocean. Unusually, the complex opens to the west — the direction of Vishnu and of death — supporting the reading of Angkor Wat as Suryavarman II's mortuary temple. The processional causeway compresses distance so that the towers appear to rise as the pilgrim advances, an optical liturgy rehearsed over some 350 metres.",
            km: "ប្រាសាទនេះជាគំរូនៃភ្នំព្រះសុមេរុលើផែនដី ធ្វើពីថ្មភក់ មានប្រាង្គកំពូល ៥ និងកសិណទឹកទទឹង ១៩០ ម៉ែត្រព័ទ្ធជុំវិញ តំណាងឲ្យមហាសមុទ្រចក្រវាឡ។ ប្រាសាទបែរមុខទៅទិសខាងលិច ដែលជាទិសនៃព្រះវិស្ណុ។ ផ្លូវដើរប្រវែង ៣៥០ ម៉ែត្របង្កើតជាទស្សនីយភាពដ៏អស្ចារ្យ។",
          },
        },
        {
          id: "s2",
          heading: { en: "The Bas-Relief Galleries", km: "វិចិត្រសាលចម្លាក់ក្រឡោតទាប" },
          body: {
            en: "Nearly 600 metres of continuous narrative relief wrap the third enclosure. The southern gallery shows Suryavarman II holding court, the only near-contemporary portrait of the founder. The eastern gallery carries the Churning of the Ocean of Milk: 88 asuras and 92 devas hauling the naga Vasuki around Mount Mandara for a thousand years to win amrita, while apsaras spin into being from the froth. The western gallery renders the Battle of Kurukshetra from the Mahabharata in colliding registers of chariots and infantry.",
            km: "ចម្លាក់ក្រឡោតទាបប្រវែងជិត ៦០០ ម៉ែត្រព័ន្ធជុំវិញថែវទី ៣ បង្ហាញពីព្រះរាជពិធីរបស់ព្រះបាទសូរ្យវរ្ម័នទី ២ រឿងកូរសមុទ្រទឹកដោះ (យក្ស ៨៨ និងទេវតា ៩២ ទាញនាគវាសុកី) និងសមរភូមិកុរុក្សេត្រក្នុងរឿងមហាភារតៈ។",
          },
        },
        {
          id: "s3",
          heading: { en: "Preservation & Significance", km: "ការអភិរក្ស និងសារៈសំខាន់ជាតិ" },
          body: {
            en: "Angkor Wat was never abandoned: Theravada monks maintained it continuously after the Angkorian court moved south. Inscribed by UNESCO in 1992 and removed from the List of World Heritage in Danger in 2004, the site is now managed by the APSARA National Authority with anastylosis programmes on the western causeway and micro-drainage work against monsoon undercutting. The silhouette has appeared on every Cambodian flag since 1863 — the only building on any national flag in the world.",
            km: "អង្គរវត្តមិនដែលត្រូវបានបោះបង់ចោលឡើយ ដោយព្រះសង្ឃថេរវាទបានបន្តថែរក្សា។ ត្រូវបានចុះបញ្ជីជាបេតិកភណ្ឌពិភពលោក UNESCO ក្នុងឆ្នាំ ១៩៩២ និងគ្រប់គ្រងដោយអាជ្ញាធរជាតិអប្សរា។ រូបប្រាសាទអង្គរវត្តមានវត្តមានលើទង់ជាតិកម្ពុជាតាំងពីឆ្នាំ ១៨៦៣ មក។",
          },
        },
      ],
    },
    gallery: [
      media("g1", angkorWat, "Western causeway", "ស្ពានហាលខាងលិច", "Khmer Heritage Archive"),
      media("g2", apsara, "Apsara relief detail", "ចម្លាក់អប្សរាលម្អិត", "EFEO Archives"),
      media("g3", banteaySrei, "Comparative lintel carving", "ចម្លាក់ផ្តែរប្រៀបធៀប", "APSARA Authority"),
    ],
    relatedEntryIds: ["e-apsara", "e-bayon", "e-pinpeat", "e-banteay-srei"],
    citations: [
      { id: "c1", title: "Angkor and the Khmer Civilization", author: "Michael D. Coe", year: 2003, publisher: "Thames & Hudson" },
      { id: "c2", title: "Inscriptions du Cambodge, Vol. I–VIII", author: "George Cœdès", year: 1937, publisher: "EFEO" },
      { id: "c3", title: "Angkor Site Conservation Reports", author: "APSARA National Authority", year: 2019 },
    ],
  },
  {
    id: "e-apsara",
    slug: "apsara",
    categoryId: "arts",
    title: { en: "Apsara Bas-Reliefs", km: "ចម្លាក់អប្សរា និងទេវតា" },
    summary: {
      en: "More than 1,800 celestial dancers carved into Angkor Wat alone, each with distinct coiffure, jewellery and gesture — a sculptural census of Angkorian courtly style.",
      km: "នាងអប្សរា និងទេវតាជាង ១,៨០០ រូប ឆ្លាក់នៅលើជញ្ជាំងអង្គរវត្ត ដែលនីមួយៗមានក្បាច់សក់ គ្រឿងអលង្ការ និងកាយវិការខុសៗគ្នាយ៉ាងវិចិត្រ។",
    },
    era: {
      en: "10th – 13th Century CE",
      km: "សតវត្សរ៍ទី ១០ – ទី ១៣ នៃ គ.ស.",
    },
    coverMedia: media("m-ap", apsara, "Apsara relief", "ចម្លាក់អប្សរាអង្គរ", "EFEO Archives"),
    content: {
      sections: [
        {
          id: "s1",
          heading: { en: "Born from the Ocean of Milk", km: "កំណើតពីការកូរសមុទ្រទឹកដោះ" },
          body: {
            en: "In the churning myth the apsaras rise from the agitated sea as the embodiment of grace itself. On temple walls they occupy the liminal zone between the terrestrial narrative registers and the divine towers above, functioning as a threshold population.",
            km: "តាមទេវកថា នាងអប្សរាកើតចេញពីពពុះទឹកនៃមហាសមុទ្រទឹកដោះ ជានិមិត្តរូបនៃសោភ័ណភាព និងភាពបរិសុទ្ធនៃពិភពទេវលោក។",
          },
        },
        {
          id: "s2",
          heading: { en: "Gesture and Revival", km: "កាយវិការ និងការស្តាររបាំបុរាណ" },
          body: {
            en: "Queen Sisowath Kossamak reconstructed the Royal Ballet's Apsara dance in the 1960s directly from these reliefs, reading hand positions (kbach) off sandstone. The 4,500 hand-and-body positions of classical Khmer dance remain anchored to this stone corpus.",
            km: "សម្តេចព្រះមហាក្សត្រិយានី ស៊ីសុវត្ថិ មុនីវង្ស កុសុមៈ នារីរ័ត្ន បានបង្កើត និងស្តារឡើងវិញនូវរបាំអប្សរាក្នុងទសវត្សរ៍ឆ្នាំ ១៩៦០ ដោយផ្អែកលើក្បាច់ចម្លាក់ទាំង ៤,៥០០ លើថ្មប្រាសាទ។",
          },
        },
      ],
    },
    gallery: [media("g4", apsara, "Coiffure typology", "ក្បាច់សក់អប្សរា", "EFEO Archives")],
    relatedEntryIds: ["e-angkor-wat", "e-pinpeat", "e-silk-hol"],
    citations: [
      { id: "c4", title: "Khmer Costumes and Ornaments after the Devata of Angkor Wat", author: "Sappho Marchal", year: 1927 },
    ],
  },
  {
    id: "e-bayon",
    slug: "bayon",
    categoryId: "temples",
    title: { en: "The Bayon", km: "ប្រាសាទបាយ័ន" },
    summary: {
      en: "Jayavarman VII's state temple at the exact centre of Angkor Thom, crowned by 216 serene faces gazing along the cardinal directions.",
      km: "ប្រាសាទរដ្ឋរបស់ព្រះបាទជ័យវរ្ម័នទី ៧ នៅចំកណ្តាលរាជធានីអង្គរធំ មានកំពូលព្រះភ័ក្ត្រញញឹមចំនួន ២១៦ បែរទៅកាន់ទិសទាំង ៤។",
    },
    era: {
      en: "Late 12th – Early 13th Century CE",
      km: "ចុងសតវត្សរ៍ទី ១២ – ដើមសតវត្សរ៍ទី ១៣ នៃ គ.ស.",
    },
    coverMedia: media("m-by", bayon, "Face towers of the Bayon", "កំពូលព្រះភ័ក្ត្របាយ័ន", "Khmer Heritage Archive"),
    coordinates: { latitude: 13.4413, longitude: 103.8586 },
    content: {
      sections: [
        {
          id: "s1",
          heading: { en: "The Face Towers", km: "កំពូលព្រះភ័ក្ត្រទាំងបួនទិស" },
          body: {
            en: "Scholars remain divided on whether the faces depict Avalokiteshvara, Brahma, or an idealised Jayavarman VII. The likeliest reading is deliberate ambiguity: a Mahayana Buddhist sovereign presenting compassion and kingship as one continuous surface.",
            km: "អ្នកប្រាជ្ញបុរាណវិទ្យាយល់ថា ព្រះភ័ក្ត្រទាំងនោះតំណាងឲ្យព្រះពោធិសត្វអវលោកិតេស្វរៈ ឬព្រះព្រហ្ម ឬព្រះឆាយាលក្ខណ៍របស់ព្រះបាទជ័យវរ្ម័នទី ៧ ដែលឆ្លុះបញ្ចាំងពីព្រហ្មវិហារធម៌។",
          },
        },
        {
          id: "s2",
          heading: { en: "Reliefs of Everyday Life", km: "ចម្លាក់ជីវភាពប្រចាំថ្ងៃរបស់ប្រជារាស្ត្រ" },
          body: {
            en: "Unlike Angkor Wat's mythic programme, the Bayon's outer gallery documents markets, cockfights, childbirth, fishing on the Tonle Sap and the naval battle against the Cham — the richest visual record of Angkorian daily life that survives.",
            km: "ខុសពីអង្គរវត្ត ចម្លាក់ថែវខាងក្រៅនៃបាយ័នបង្ហាញពីជីវភាពរស់នៅពិតៗ ដូចជាទិដ្ឋភាពផ្សារ ការជល់មាន់ ការសម្រាលកូន ការនេសាទនៅបឹងទន្លេសាប និងចម្បាំងជើងទឹកជាមួយចាម។",
          },
        },
      ],
    },
    gallery: [media("g5", bayon, "South-east face tower", "កំពូលព្រះភ័ក្ត្រទិសអាគ្នេយ៍", "Khmer Heritage Archive")],
    relatedEntryIds: ["e-angkor-wat", "e-apsara"],
    citations: [{ id: "c5", title: "The Bayon: New Perspectives", author: "Joyce Clark (ed.)", year: 2007, publisher: "River Books" }],
  },
  {
    id: "e-banteay-srei",
    slug: "banteay-srei",
    categoryId: "temples",
    title: { en: "Banteay Srei", km: "ប្រាសាទបន្ទាយស្រី" },
    summary: {
      en: "A miniature 10th-century sanctuary of rose sandstone, carved with a density and crispness unmatched anywhere in Khmer art.",
      km: "ប្រាសាទតូចច្រឡឹងធ្វើពីថ្មភក់ពណ៌ផ្កាឈូក សាងក្នុងសតវត្សរ៍ទី ១០ ដែលមានចម្លាក់ក្បាច់រស់រវើក និងល្អិតល្អន់ឥតខ្ចោះ។",
    },
    era: {
      en: "967 CE · Consecrated under Rajendravarman II",
      km: "ឆ្នាំ ៩៦៧ នៃ គ.ស. · សម័យព្រះបាទរាជេន្ទ្រវរ្ម័នទី ២",
    },
    coverMedia: media("m-bs", banteaySrei, "Banteay Srei sanctuary", "តួប៉មប្រាសាទបន្ទាយស្រី", "APSARA Authority"),
    coordinates: { latitude: 13.5987, longitude: 103.9633 },
    content: {
      sections: [
        {
          id: "s1",
          heading: { en: "A Temple Not Built by a King", km: "ប្រាសាទដែលកសាងដោយព្រាហ្មណ៍បុរោហិត" },
          body: {
            en: "Banteay Srei was founded by Yajnavaraha, a brahmin counsellor and royal tutor. Its scale is domestic — doorways barely 1.3 metres high — yet the carving quality suggests specialist ateliers working with quartz-hard sandstone and metal tools.",
            km: "ប្រាសាទបន្ទាយស្រីត្រូវបានកសាងឡើងដោយព្រាហ្មណ៍ យជ្ញវរាហៈ ជាព្រះរាជគ្រូ មិនមែនកសាងដោយព្រះមហាក្សត្រឡើយ។ ទ្វារប្រាសាទមានកម្ពស់ត្រឹមតែ ១,៣ ម៉ែត្រប៉ុណ្ណោះ។",
          },
        },
      ],
    },
    gallery: [media("g6", banteaySrei, "Pediment carving", "ចម្លាក់ហោជាងបន្ទាយស្រី", "APSARA Authority")],
    relatedEntryIds: ["e-angkor-wat", "e-bayon"],
    citations: [{ id: "c6", title: "Le temple d'Içvarapura", author: "Louis Finot & Henri Parmentier", year: 1926, publisher: "EFEO" }],
  },
  {
    id: "e-pinpeat",
    slug: "pinpeat",
    categoryId: "music",
    title: { en: "Pinpeat Ensemble", km: "វង់ភ្លេងពិណពាទ្យ" },
    summary: {
      en: "The ceremonial orchestra of the royal court and the pagoda, whose instrument line-up is legible on Angkorian reliefs a thousand years old.",
      km: "វង់តន្ត្រីសក្ការៈបុរាណសម្រាប់ព្រះរាជពិធី និងវត្តអារាម ដែលមានចម្លាក់ឧបករណ៍តាំងពីសម័យអង្គរជាងមួយពាន់ឆ្នាំមុន។",
    },
    era: {
      en: "Angkorian Period – Present",
      km: "សម័យអង្គរ – បច្ចុប្បន្ន",
    },
    coverMedia: media("m-pp", instrumentsImg, "Pinpeat instruments", "ឧបករណ៍ភ្លេងពិណពាទ្យ", "Khmer Heritage Archive"),
    content: {
      sections: [
        {
          id: "s1",
          heading: { en: "Instrumentation", km: "ឧបករណ៍តន្ត្រីក្នុងវង់" },
          body: {
            en: "Roneat ek and roneat thung (xylophones), kong vong toch and thom (gong circles), sralai (quadruple-reed oboe), sampho and skor thom (drums), and chhing (finger cymbals) which hold the colotomic cycle. Nothing in the ensemble plays a chord; each line paraphrases a single skeletal melody at its own density — a heterophony rather than harmony.",
            km: "ឧបករណ៍រួមមាន រនាតឯក រនាតធុង គងវង់តូច គងវង់ធំ ស្រឡៃ សំភោរ ស្គរធំ និងឈិង។ វង់ភ្លេងនេះបន្លឺសំឡេងតាមទម្រង់បែបប្រពៃណីខ្មែរដ៏ពិរោះរណ្តំ។",
          },
        },
        {
          id: "s2",
          heading: { en: "Survival & Preservation", km: "ការរស់រាន និងការបន្តវេន" },
          body: {
            en: "An estimated 80–90% of Cambodia's professional musicians died between 1975 and 1979. The Pinpeat repertoire survives because a handful of masters reconstructed it from memory in the 1980s, teaching orally in refugee camps and reopened conservatories.",
            km: "សិល្បករតន្ត្រីករជាង ៨០-៩០% បានបាត់បង់ជីវិតក្នុងរបបខ្មែរក្រហម ប៉ុន្តែគ្រូព្រឹទ្ធាចារ្យដែលនៅរស់រានបានខិតខំចងក្រង និងបង្រៀនបន្តពីការចងចាំឡើងវិញ។",
          },
        },
      ],
    },
    gallery: [media("g7", instrumentsImg, "Chapei and roneat", "ចាប៉ី និងរនាត", "Khmer Heritage Archive")],
    relatedEntryIds: ["e-angkor-wat", "e-apsara"],
    citations: [{ id: "c7", title: "Khmer Music in Cambodia and Abroad", author: "Sam-Ang Sam", year: 2008 }],
  },
  {
    id: "e-silk-hol",
    slug: "silk-hol",
    categoryId: "crafts",
    title: { en: "Sampot Hol Silk", km: "សំពត់ហូលខ្មែរ" },
    summary: {
      en: "Cambodian weft ikat, in which the thread is dyed before weaving so the pattern emerges only as the cloth is made.",
      km: "សិល្បៈតម្បាញសូត្រហូលខ្មែរដោយបច្ចេកទេសចងកៀវជ្រលក់ពណ៌សរសៃអំបោះមុនពេលត្បាញ បង្កើតជាក្បាច់រចនាដ៏ប្រណីត។",
    },
    era: {
      en: "Pre-Angkorian – Present",
      km: "មុនសម័យអង្គរ – បច្ចុប្បន្ន",
    },
    coverMedia: media("m-sh", silk, "Golden silk weave", "សូត្រមាសខ្មែរ", "Khmer Heritage Archive"),
    content: {
      sections: [
        {
          id: "s1",
          heading: { en: "Golden Silk and Natural Dye", km: "សូត្រមាស និងថ្នាំជ្រលក់ធម្មជាតិ" },
          body: {
            en: "Cambodian golden silk comes from the indigenous Bombyx mori strain fed on local mulberry, giving a warm yellow filament. Dyes come from prohut bark (yellow), lac insect (red), indigo, and ebony fruit (black), often layered across five or more tie-and-dye passes.",
            km: "សូត្រមាសបានមកពីដង្កូវនាងពូជក្នុងស្រុកស៊ីស្លឹកមន ចំណែកពណ៌ធម្មជាតិបានមកពីសំបកប្រហូត (ពណ៌លឿង) ជ័រល័ខ (ពណ៌ក្រហម) ផ្លែទ្រនឹម (ពណ៌ខ្មៅ)។",
          },
        },
      ],
    },
    gallery: [media("g8", silk, "Hol weave detail", "ក្បាច់តម្បាញហូលលម្អិត", "Khmer Heritage Archive")],
    relatedEntryIds: ["e-apsara", "e-pinpeat"],
    citations: [{ id: "c8", title: "Textiles of Cambodia", author: "Gillian Green", year: 2003 }],
  },
];

export const entryBySlug = (slug: string) => entries.find((e) => e.slug === slug);
export const entryById = (id: string) => entries.find((e) => e.id === id);

export const instruments: Instrument[] = [
  {
    id: "i1",
    name: { en: "Chapei Dong Veng", km: "ចាប៉ីដងវែង" },
    ensemble: "Ayai",
    family: { en: "Long-necked lute", km: "ឧបករណ៍ខ្សែដេញដងវែង" },
    origin: {
      en: "A two-string fretted lute accompanying improvised sung poetry; inscribed on UNESCO Urgent Safeguarding List, 2016.",
      km: "ឧបករណ៍ខ្សែដេញបន្ទរចម្រៀងកំណាព្យកាព្យឃ្លោង ចុះបញ្ជីបេតិកភណ្ឌអរូបី UNESCO ឆ្នាំ ២០១៦។",
    },
    toneHz: [146.83, 196, 220, 293.66],
  },
  {
    id: "i2",
    name: { en: "Roneat Ek", km: "រនាតឯក" },
    ensemble: "Pinpeat",
    family: { en: "Bamboo xylophone", km: "ឧបករណ៍ផ្លុំ/វាយធ្វើពីឬស្សី/ឈើ" },
    origin: {
      en: "Leading xylophone of the Pinpeat ensemble with 21 bamboo or hardwood bars in a boat-shaped resonator, played in rapid octaves.",
      km: "រនាតដឹកនាំក្នុងវង់ភ្លេងពិណពាទ្យ មានផ្លែ ២១ ស្នូកជារាងទូក បន្លឺជាសំនៀងគូ ៨ យ៉ាងពិរោះ។",
    },
    toneHz: [523.25, 587.33, 659.25, 783.99],
  },
  {
    id: "i3",
    name: { en: "Tro Ou", km: "ទ្រអ៊ូ" },
    ensemble: "Mohori",
    family: { en: "Bowed spike fiddle", km: "ឧបករណ៍ខ្សែទ្រសំនៀងធំ" },
    origin: {
      en: "Coconut-shell fiddle covered with snakeskin face, the warm alto voice of the Mohori ensemble.",
      km: "ទ្រធ្វើពីត្រឡោកដូងស្រោបស្បែកពស់ មានសំនៀងក្រាស់ធ្ងន់ក្នុងវង់ភ្លេងមហោរី។",
    },
    toneHz: [196, 261.63, 293.66],
  },
  {
    id: "i4",
    name: { en: "Sampho", km: "សំភោរ" },
    ensemble: "Pinpeat",
    family: { en: "Barrel drum", km: "ឧបករណ៍ស្គរស្បែកពីរមុខ" },
    origin: {
      en: "Two-headed barrel drum that leads the ensemble and signals rhythm changes; treated with deep ritual respect.",
      km: "ស្គរពីរមុខដែលដឹកនាំចង្វាក់ភ្លេងក្នុងវង់ពិណពាទ្យ និងត្រូវគោរពជាវត្ថុសក្ការៈនៃគ្រូតន្ត្រី។",
    },
    toneHz: [98, 130.81],
  },
  {
    id: "i5",
    name: { en: "Khloy", km: "ខ្លុយ" },
    ensemble: "Mohori",
    family: { en: "Bamboo duct flute", km: "ឧបករណ៍ផ្លុំធ្វើពីឬស្សី" },
    origin: {
      en: "Six-hole vertical bamboo flute with a delicate membrane giving its signature airy Khmer sound.",
      km: "ឧបករណ៍ផ្លុំធ្វើពីឬស្សីមានរន្ធ ៦ ផ្តល់នូវសំនៀងស្រទន់លន្លង់លន្លោច។",
    },
    toneHz: [440, 493.88, 587.33, 659.25],
  },
  {
    id: "i6",
    name: { en: "Kong Vong Toch", km: "គងវង់តូច" },
    ensemble: "Pinpeat",
    family: { en: "Circular gong chime", km: "ឧបករណ៍គងរង្វង់" },
    origin: {
      en: "Sixteen tuned bronze gongs arranged in a rattan circular frame; the musician sits in the center.",
      km: "គងលង្ហិន ១៦ ដុំ តម្រៀបជារង្វង់ផ្តៅ អ្នកលេងអង្គុយចំកណ្តាលរង្វង់។",
    },
    toneHz: [329.63, 392, 440, 523.25],
  },
];

export const sites: HeritageSite[] = [
  {
    id: "s1",
    entrySlug: "angkor-wat",
    name: { en: "Angkor Wat", km: "ប្រាសាទអង្គរវត្ត" },
    province: { en: "Siem Reap", km: "សៀមរាប" },
    era: "golden",
    style: { en: "Angkor Wat Style", km: "រចនាប័ទ្មអង្គរវត្ត" },
    condition: "excellent",
    unesco: true,
    coordinates: { latitude: 13.4125, longitude: 103.867 },
  },
  {
    id: "s2",
    entrySlug: "bayon",
    name: { en: "The Bayon", km: "ប្រាសាទបាយ័ន" },
    province: { en: "Siem Reap", km: "សៀមរាប" },
    era: "golden",
    style: { en: "Bayon Style", km: "រចនាប័ទ្មបាយ័ន" },
    condition: "stable",
    unesco: true,
    coordinates: { latitude: 13.4413, longitude: 103.8586 },
  },
  {
    id: "s3",
    entrySlug: "banteay-srei",
    name: { en: "Banteay Srei", km: "ប្រាសាទបន្ទាយស្រី" },
    province: { en: "Siem Reap", km: "សៀមរាប" },
    era: "early",
    style: { en: "Banteay Srei Style", km: "រចនាប័ទ្មបន្ទាយស្រី" },
    condition: "excellent",
    unesco: true,
    coordinates: { latitude: 13.5987, longitude: 103.9633 },
  },
  {
    id: "s4",
    entrySlug: "angkor-wat",
    name: { en: "Phnom Kulen", km: "រមណីយដ្ឋានភ្នំគូលេន" },
    province: { en: "Siem Reap", km: "សៀមរាប" },
    era: "early",
    style: { en: "Kulen Style", km: "រចនាប័ទ្មគូលេន" },
    condition: "at_risk",
    unesco: false,
    coordinates: { latitude: 13.5786, longitude: 104.1103 },
  },
  {
    id: "s5",
    entrySlug: "banteay-srei",
    name: { en: "Preah Vihear Temple", km: "ប្រាសាទព្រះវិហារ" },
    province: { en: "Preah Vihear", km: "ព្រះវិហារ" },
    era: "golden",
    style: { en: "Khleang / Baphuon", km: "រចនាប័ទ្មឃ្លាំង និងបាភួន" },
    condition: "stable",
    unesco: true,
    coordinates: { latitude: 14.3907, longitude: 104.6809 },
  },
  {
    id: "s6",
    entrySlug: "bayon",
    name: { en: "Sambor Prei Kuk", km: "ប្រាសាទសំបូរព្រៃគុក" },
    province: { en: "Kampong Thom", km: "កំពង់ធំ" },
    era: "pre",
    style: { en: "Sambor Prei Kuk Style", km: "រចនាប័ទ្មសំបូរព្រៃគុក" },
    condition: "at_risk",
    unesco: true,
    coordinates: { latitude: 12.8716, longitude: 105.0407 },
  },
  {
    id: "s7",
    entrySlug: "silk-hol",
    name: { en: "Banteay Chhmar", km: "ប្រាសាទបន្ទាយឆ្មារ" },
    province: { en: "Banteay Meanchey", km: "បន្ទាយមានជ័យ" },
    era: "golden",
    style: { en: "Bayon Style", km: "រចនាប័ទ្មបាយ័ន" },
    condition: "at_risk",
    unesco: false,
    coordinates: { latitude: 14.0742, longitude: 103.0932 },
  },
  {
    id: "s8",
    entrySlug: "pinpeat",
    name: { en: "Royal Palace", km: "ព្រះបរមរាជវាំង" },
    province: { en: "Phnom Penh", km: "ភ្នំពេញ" },
    era: "post",
    style: { en: "Traditional Khmer Palace", km: "ស្ថាបត្យកម្មព្រះបរមរាជវាំងបុរាណ" },
    condition: "excellent",
    unesco: false,
    coordinates: { latitude: 11.5637, longitude: 104.9315 },
  },
  {
    id: "s9",
    entrySlug: "silk-hol",
    name: { en: "Phnom Sampov", km: "រមណីយដ្ឋានភ្នំសំពៅ" },
    province: { en: "Battambang", km: "បាត់ដំបង" },
    era: "post",
    style: { en: "Post-Angkorian Heritage", km: "បេតិកភណ្ឌសម័យក្រោយអង្គរ" },
    condition: "stable",
    unesco: false,
    coordinates: { latitude: 13.0203, longitude: 103.0928 },
  },
];
