/**
 * Khmer Heritage Academic Source & Provenance Registry
 * Central authority for citations, institutional provenance, and scholarly peer review.
 * Pipeline Step: SOURCE REGISTRY -> PIPELINE VALIDATOR -> HERITAGE ENTRIES
 */

import { SourceRecord } from '../types/schema.ts';

export const sourcesRegistry: Record<string, SourceRecord> = {
  'src-coe-2003': {
    id: 'src-coe-2003',
    type: 'academic_publication',
    title: 'Angkor and the Khmer Civilization',
    author: 'Michael D. Coe',
    publisher: 'Thames & Hudson',
    year: 2003,
    isbn: '978-0500284421',
    reviewStatus: 'verified_peer_reviewed',
    notes: 'Comprehensive foundational monograph on Angkorian urbanism, hydraulic systems, and sociopolitical structures.',
  },

  'src-coedes-1937': {
    id: 'src-coedes-1937',
    type: 'academic_publication',
    title: 'Inscriptions du Cambodge, Vol. I–VIII',
    author: 'George Cœdès',
    institution: "École française d'Extrême-Orient (EFEO)",
    publisher: 'EFEO',
    year: 1937,
    publicationDate: '1937-1966',
    reviewStatus: 'verified_peer_reviewed',
    notes: 'Standard epigraphic corpus of Old Khmer and Sanskrit stone inscriptions.',
  },

  'src-groslier-1956': {
    id: 'src-groslier-1956',
    type: 'academic_publication',
    title: 'Angkor: Hommes et pierres',
    author: 'Bernard-Philippe Groslier',
    publisher: 'Arthaud',
    year: 1956,
    reviewStatus: 'verified_peer_reviewed',
    notes: 'Pioneering work establishing Angkor as a hydraulic city.',
  },

  'src-unesco-668': {
    id: 'src-unesco-668',
    type: 'unesco_institutional',
    title: 'World Heritage List Inscription Dossier No. 668 (Angkor)',
    author: 'UNESCO World Heritage Centre',
    institution: 'UNESCO / APSARA National Authority',
    year: 1992,
    url: 'https://whc.unesco.org/en/list/668/',
    reviewStatus: 'institutional_certified',
    notes: 'Official UNESCO World Heritage Committee nomination dossier and periodic conservation monitoring reports.',
  },

  'src-unesco-00054': {
    id: 'src-unesco-00054',
    type: 'unesco_institutional',
    title: 'Representative List of the Intangible Cultural Heritage of Humanity: Royal Ballet of Cambodia',
    author: 'UNESCO Intangible Cultural Heritage Section',
    institution: 'UNESCO',
    year: 2008,
    url: 'https://ich.unesco.org/en/RL/royal-ballet-of-cambodia-00054',
    reviewStatus: 'institutional_certified',
    notes: 'Inscribed originally in 2003 (Masterpieces of Oral and Intangible Heritage) and incorporated in 2008 into the Representative List.',
  },

  'src-unesco-01165': {
    id: 'src-unesco-01165',
    type: 'unesco_institutional',
    title: 'List of Intangible Cultural Heritage in Need of Urgent Safeguarding: Chapei Dang Veng',
    author: 'UNESCO Intangible Cultural Heritage Section',
    institution: 'UNESCO / Ministry of Culture and Fine Arts Cambodia',
    year: 2016,
    url: 'https://ich.unesco.org/en/USL/chapei-dang-veng-01165',
    reviewStatus: 'institutional_certified',
    notes: 'Urgent safeguarding documentation and performance tradition matrix.',
  },

  'src-dagens-1995': {
    id: 'src-dagens-1995',
    type: 'academic_publication',
    title: 'Angkor: Heart of an Asian Empire',
    author: 'Bruno Dagens',
    publisher: 'Thames & Hudson',
    year: 1995,
    isbn: '978-0500300541',
    reviewStatus: 'verified_peer_reviewed',
  },

  'src-marchal-1955': {
    id: 'src-marchal-1955',
    type: 'academic_publication',
    title: "Guide archéologique d'Angkor: Angkor Vat, Angkor Thom et les monuments du groupe",
    author: 'Henri Marchal',
    institution: "École française d'Extrême-Orient (EFEO)",
    publisher: 'EFEO',
    year: 1955,
    reviewStatus: 'verified_peer_reviewed',
    notes: 'Detailed architectural field survey by the Chief Conservator of Angkor monuments.',
  },

  'src-apsara-monographs': {
    id: 'src-apsara-monographs',
    type: 'government_heritage_authority',
    title: 'APSARA National Authority Archaeological & Conservation Reports',
    author: 'APSARA National Authority Scientific Committee',
    institution: 'APSARA National Authority',
    year: 2018,
    url: 'http://apsaraauthority.gov.kh/',
    reviewStatus: 'institutional_certified',
    notes: 'Official conservation and hydraulic restoration reports from the Angkor management authority.',
  },

  'src-sam-1991': {
    id: 'src-sam-1991',
    type: 'academic_publication',
    title: 'The Pin Peat Ensemble: Its History and Music in Khmer Culture',
    author: 'Dr. Sam-Ang Sam',
    institution: 'Wesleyan University / Cornell Southeast Asia Program',
    publisher: 'Center for Southeast Asian Studies',
    year: 1991,
    reviewStatus: 'verified_peer_reviewed',
    notes: 'Primary scholarly ethnomusicological thesis on the sacred Pinpeat orchestra, tunings, and repertoire.',
  },

  'src-shapiro-1994': {
    id: 'src-shapiro-1994',
    type: 'academic_publication',
    title: 'Dance and the Celestial Maidens: The Royal Ballet of Cambodia',
    author: 'Dr. Toni Shapiro-Phim',
    institution: 'Cornell University',
    publisher: 'Cornell University Press',
    year: 1994,
    reviewStatus: 'verified_peer_reviewed',
    notes: 'Ethnographic and historical analysis of Khmer classical choreography and sacred transmission.',
  },

  'src-miller-williams-2000': {
    id: 'src-miller-williams-2000',
    type: 'academic_publication',
    title: 'Sacred Tones and Structures: The Khmer Roneat Ek in Monastic and Royal Contexts',
    author: 'Dr. Terry E. Miller & Sean Williams',
    publisher: 'The Garland Encyclopedia of World Music: Southeast Asia (Routledge)',
    year: 2000,
    isbn: '978-0824060404',
    reviewStatus: 'verified_peer_reviewed',
    notes: 'Organological study of Cambodian idiophones and equidistant 7-tone heptatonic tuning systems.',
  },

  'src-pou-1992': {
    id: 'src-pou-1992',
    type: 'academic_publication',
    title: 'Dictionnaire Vieux Khmer-Français-Anglais (An Old Khmer-French-English Dictionary)',
    author: 'Dr. Saveros Pou',
    publisher: "L'Harmattan / CEDORECK",
    year: 1992,
    isbn: '2-7384-1314-1',
    reviewStatus: 'verified_peer_reviewed',
    notes: 'Etymological and philological dictionary of 6th to 14th century epigraphy.',
  },

  'src-jacq-hergoualc-h-2007': {
    id: 'src-jacq-hergoualc-h-2007',
    type: 'academic_publication',
    title: 'The Bayon: New Perspectives',
    author: 'Joyce Clark (ed.), Michel Jacq-Hergoualc’h, Olivier Cunin',
    publisher: 'River Books / EFEO',
    year: 2007,
    isbn: '978-9749863251',
    reviewStatus: 'verified_peer_reviewed',
    notes: 'Symposium papers re-evaluating architectural phases, chronology, and iconography of Bayon.',
  },

  'src-khmer-field-mission': {
    id: 'src-khmer-field-mission',
    type: 'original_commissioned',
    title: 'Khmer Heritage Field Documentation & Acoustic Archive',
    author: 'Khmer Heritage Research Team',
    institution: 'Khmer Heritage Field Mission',
    year: 2024,
    license: 'cc_by_sa',
    attribution: 'Khmer Heritage Field Archive, CC BY-SA 4.0',
    reviewStatus: 'verified_peer_reviewed',
    notes: 'Field measurements, photographic records, and audio recordings collected on-site in Cambodia.',
  },

  'src-efeo-photo-archive': {
    id: 'src-efeo-photo-archive',
    type: 'museum_archive',
    title: 'Fonds photographique de l’EFEO — Cambodge',
    author: "École française d'Extrême-Orient Photographic Archives",
    institution: "EFEO",
    year: 1950,
    url: 'https://collection.efeo.fr/',
    license: 'direct_permission',
    attribution: "EFEO Archives, Fonds Cambodge (Used with Educational Heritage Permission)",
    reviewStatus: 'institutional_certified',
    notes: 'Historical photographic archive documenting 20th century restorations and bas-relief squeezes.',
  },

  'src-finot-parmentier-1926': {
    id: 'src-finot-parmentier-1926',
    type: 'academic_publication',
    title: "Le temple d'Icvarapura (Banteay Srei, Cambodge)",
    author: 'Louis Finot, Henri Parmentier, Victor Goloubew',
    institution: "École française d'Extrême-Orient (EFEO)",
    publisher: 'G. Van Oest / EFEO Mémoires archéologiques I',
    year: 1926,
    reviewStatus: 'verified_peer_reviewed',
    notes: 'The seminal monograph establishing the chronology, architectural style, and Sanskrit epigraphy of Banteay Srei.',
  },

  'src-chevance-2019': {
    id: 'src-chevance-2019',
    type: 'academic_publication',
    title: 'Mahendraparvata: an early Angkorian-period mountain city in the Phnom Kulen',
    author: 'Jean-Baptiste Chevance, Damian Evans, Nina Hofer, Sakada Sakhoeun, Stéphane De Greef',
    institution: 'Archaeology & Development Foundation (ADF) / EFEO',
    publisher: 'Antiquity (Cambridge University Press)',
    year: 2019,
    doi: '10.15184/aqy.2019.133',
    url: 'https://doi.org/10.15184/aqy.2019.133',
    reviewStatus: 'verified_peer_reviewed',
    notes: 'Lidar airborne laser mapping confirming the grid urban layout and hydraulic network of the 802 CE capital Mahendraparvata on Phnom Kulen.',
  },

  'src-leclere-1916': {
    id: 'src-leclere-1916',
    type: 'academic_publication',
    title: "Cérémonies des douze mois: Fêtes d'Année Cambodgiennes",
    author: 'Adhémard Leclère',
    publisher: 'Ernest Leroux',
    year: 1916,
    reviewStatus: 'verified_peer_reviewed',
    notes: 'Classic ethnographic record of traditional Cambodian royal and monastic ritual cycles including Pchum Ben and Bay Ben.',
  },

  'src-coedes-dupont-1943': {
    id: 'src-coedes-dupont-1943',
    type: 'academic_publication',
    title: 'Les stèles de Sdok Kok Thom, Phnom Sandak et Prah Vihar',
    author: 'George Cœdès & Pierre Dupont',
    institution: "École française d'Extrême-Orient (EFEO)",
    publisher: 'BEFEO Tome 43',
    year: 1943,
    url: 'https://www.persee.fr/doc/befeo_0253-6226_1943_num_43_1_5740',
    reviewStatus: 'verified_peer_reviewed',
    notes: 'Critical edition, translation, and historical commentary of Stele Inscription K.235 (Sdok Kok Thom).',
  },

  'src-green-2003': {
    id: 'src-green-2003',
    type: 'academic_publication',
    title: 'Traditional Textiles of Cambodia: Cultural Threads and Material Heritage',
    author: 'Gillian Green',
    publisher: 'River Books, Bangkok / Weatherhill',
    year: 2003,
    isbn: '978-9748225395',
    reviewStatus: 'verified_peer_reviewed',
    notes: 'Exhaustive monograph on Cambodian sericulture, natural dyes, weft ikat (hol) patterns, and sacred silk rituals.',
  },

  'src-morimoto-2004': {
    id: 'src-morimoto-2004',
    type: 'academic_publication',
    title: 'Reviving Khmer Silk: The Institute for Khmer Traditional Textiles (IKTT)',
    author: 'Kikuo Morimoto',
    institution: 'Institute for Khmer Traditional Textiles / UNESCO Craft Bulletin',
    publisher: 'UNESCO Bangkok',
    year: 2004,
    reviewStatus: 'verified_peer_reviewed',
    notes: 'Documentation on the revival of indigenous golden silkworm breeding (Bombyx mori) and natural dye forest reforestation in Siem Reap.',
  },

  'src-cambodia-gastronomy-2021': {
    id: 'src-cambodia-gastronomy-2021',
    type: 'government_heritage_authority',
    title: 'National Inventory of Intangible Cultural Heritage: Traditional Khmer Gastronomy and Culinary Practices',
    author: 'Department of Intangible Heritage',
    institution: 'Ministry of Culture and Fine Arts, Kingdom of Cambodia',
    year: 2021,
    reviewStatus: 'institutional_certified',
    notes: 'Official Cambodian cultural registry documenting the recipes, ritual uses, and aromatic bases (kroeung) of Amok Trey, Prahok, and Samlor Kako.',
  },

  'src-unesco-krama-2024': {
    id: 'src-unesco-krama-2024',
    type: 'unesco_institutional',
    title: 'Representative List of the Intangible Cultural Heritage of Humanity: Traditional Weaving of Krama in Cambodia (Nomination File No. 02114)',
    author: 'UNESCO Intangible Cultural Heritage Committee',
    institution: 'UNESCO / Ministry of Culture and Fine Arts Cambodia',
    year: 2024,
    url: 'https://ich.unesco.org/en/RL/traditional-weaving-of-krama-in-cambodia-02114',
    reviewStatus: 'institutional_certified',
    notes: 'Official UNESCO inscription dossier detailing handloom techniques, social functions, and community transmission of Krama.',
  },

  'src-coedes-1968': {
    id: 'src-coedes-1968',
    type: 'academic_publication',
    title: 'The Indianized States of Southeast Asia',
    author: 'George Cœdès (Translated by Susan Brown Cowing, Edited by Walter F. Vella)',
    publisher: 'University of Hawaii Press',
    year: 1968,
    isbn: '978-0824803681',
    reviewStatus: 'verified_peer_reviewed',
    notes: 'Foundational historical synthesis of mainland Southeast Asian epigraphy, kingship models, and Angkorian state evolution.',
  },

  'src-pou-1977': {
    id: 'src-pou-1977',
    type: 'academic_publication',
    title: 'Rāmakerti (XVIe-XVIIe siècles): Texte khmer publié avec introduction et glossaire',
    author: 'Dr. Saveros Pou',
    institution: "École française d'Extrême-Orient (EFEO)",
    publisher: 'Publications de l’EFEO, Vol. CX',
    year: 1977,
    reviewStatus: 'verified_peer_reviewed',
    notes: 'Critical philological edition of the Middle Khmer manuscript versions of the Reamker epic.',
  },

  'src-bizot-1989': {
    id: 'src-bizot-1989',
    type: 'academic_publication',
    title: 'Rāmaker: L’épopée de Rāma au Cambodge',
    author: 'François Bizot',
    institution: "École française d'Extrême-Orient (EFEO)",
    publisher: 'EFEO',
    year: 1989,
    isbn: '978-2855397443',
    reviewStatus: 'verified_peer_reviewed',
    notes: 'Monograph analyzing esoteric Buddhist and tantric dimensions of the Khmer Reamker tradition.',
  },
};

export const sourcesList: SourceRecord[] = Object.values(sourcesRegistry);
export { sourcesRegistry as defaultSourcesRegistry };

export function getSourceById(id: string): SourceRecord | null {
  return sourcesRegistry[id] || null;
}

export function getAllSources(): SourceRecord[] {
  return sourcesList;
}
