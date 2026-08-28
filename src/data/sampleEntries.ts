/**
 * Curated First Master Corpus of the Khmer Heritage Knowledge Graph
 * Grounded in peer-reviewed scholarship (EFEO, UNESCO, APSARA Authority, George Cœdès, Saveros Pou, etc.)
 * Fully integrated with Central Source & Licensing Registry (src/data/sources.ts).
 */

import {
  curatedCorpus,
  sampleEntries,
  templeEntries,
  historyEntries,
  artsEntries,
  musicEntries,
  ritualsEntries,
  scriptEntries,
  costumesEntries,
  cuisineEntries,
  craftsEntries,
  landmarksEntries,
  figuresEntries,
  mythologyEntries,
} from "./entries/index.ts";
import { LOCAL_ASSETS } from "./entries/mediaHelper.ts";

export const SAMPLE_IMAGES = LOCAL_ASSETS;

export {
  curatedCorpus,
  sampleEntries,
  templeEntries,
  historyEntries,
  artsEntries,
  musicEntries,
  ritualsEntries,
  scriptEntries,
  costumesEntries,
  cuisineEntries,
  craftsEntries,
  landmarksEntries,
  figuresEntries,
  mythologyEntries,
};
