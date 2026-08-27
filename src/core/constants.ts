/**
 * Khmer Heritage Project Constants & Categories Definition
 */

import { Category } from '../types/schema.ts';

export const PROJECT_INFO = {
  name: 'Khmer Heritage',
  tagline: 'Digital Encyclopedia & Cultural Discovery Platform',
  version: '0.1.0-foundation',
  task: 'KH-001',
  storageStrategy: 'Cloudflare R2 (Target)',
  platforms: ['Android', 'iOS', 'Web'],
} as const;

export const FOUNDATION_CATEGORIES: Category[] = [
  {
    id: 'history',
    slug: 'history',
    title: { km: 'ប្រវត្តិសាស្ត្រខ្មែរ', en: 'Khmer History' },
    description: {
      km: 'ព្រឹត្តិការណ៍ប្រវត្តិសាស្ត្រ សម័យកាលនគរភ្នំ ចេនឡា និងអង្គរ',
      en: 'Historical eras, Funan, Chenla, and the Angkor Empire',
    },
    iconName: 'Landmark',
    sortOrder: 1,
  },
  {
    id: 'architecture',
    slug: 'temples-architecture',
    title: { km: 'ប្រាសាទ និងស្ថាបត្យកម្ម', en: 'Temples & Architecture' },
    description: {
      km: 'ប្រាសាទបុរាណ សំណង់បេតិកភណ្ឌ និងរចនាបថស្ថាបត្យកម្ម',
      en: 'Ancient temples, Angkor heritage monuments, and architectural styles',
    },
    iconName: 'Building2',
    sortOrder: 2,
  },
  {
    id: 'arts',
    slug: 'arts-sculpture',
    title: { km: 'សិល្បៈ និងចម្លាក់', en: 'Arts & Sculpture' },
    description: {
      km: 'ចម្លាក់ថ្ម សិល្បៈអប្សរា ក្បាច់ខ្មែរ និងគំនូរបុរាណ',
      en: 'Stone sculptures, Apsara motifs, Kbach carvings, and murals',
    },
    iconName: 'Palette',
    sortOrder: 3,
  },
  {
    id: 'music',
    slug: 'traditional-music',
    title: { km: 'តន្ត្រីបុរាណ និងឧបករណ៍', en: 'Traditional Music & Instruments' },
    description: {
      km: 'វង់ភ្លេងពិណពាទ្យ មហោរី ចាប៉ីដងវែង និងឧបករណ៍តន្ត្រីខ្មែរ',
      en: 'Pinpeat, Mohori ensembles, Chapei Dong Veng, and traditional instruments',
    },
    iconName: 'Music',
    sortOrder: 4,
  },
  {
    id: 'traditions',
    slug: 'festivals-rituals',
    title: { km: 'ពិធីបុណ្យ និងទំនៀមទម្លាប់', en: 'Festivals & Rituals' },
    description: {
      km: 'ពិធីបុណ្យភ្ជុំបិណ្ឌ ចូលឆ្នាំប្រពៃណី និងពិធីបុណ្យអុំទូក',
      en: 'Pchum Ben, Khmer New Year, Water Festival, and ancestral rites',
    },
    iconName: 'Sparkles',
    sortOrder: 5,
  },
  {
    id: 'language',
    slug: 'script-literature',
    title: { km: 'អក្សរសាស្ត្រ និងសិលាចារឹក', en: 'Script & Literature' },
    description: {
      km: 'អក្សរខ្មែរ សិលាចារឹកបុរាណ និងរឿងរាមកេរ្តិ៍',
      en: 'Khmer script, epigraphy, stone inscriptions, and the Reamker epic',
    },
    iconName: 'BookOpen',
    sortOrder: 6,
  },
];
