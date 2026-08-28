import type { HeritageEntry } from "../../types/schema.ts";
import { templeEntries } from "./temples.ts";
import { historyEntries } from "./history.ts";
import { artsEntries } from "./arts.ts";
import { musicEntries } from "./music.ts";
import { ritualsEntries } from "./rituals.ts";
import { scriptEntries } from "./script.ts";
import { costumesEntries } from "./costumes.ts";
import { cuisineEntries } from "./cuisine.ts";
import { craftsEntries } from "./crafts.ts";
import { landmarksEntries } from "./landmarks.ts";
import { figuresEntries } from "./figures.ts";
import { mythologyEntries } from "./mythology.ts";

export {
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

/**
 * Curated First Master Corpus of the Khmer Heritage Knowledge Graph
 * 16 Deeply Verified Entries spanning all 12 Canonical Cultural Pillars.
 */
export const curatedCorpus: HeritageEntry[] = [
  ...templeEntries,
  ...historyEntries,
  ...artsEntries,
  ...musicEntries,
  ...ritualsEntries,
  ...scriptEntries,
  ...costumesEntries,
  ...cuisineEntries,
  ...craftsEntries,
  ...landmarksEntries,
  ...figuresEntries,
  ...mythologyEntries,
];

export const sampleEntries: HeritageEntry[] = curatedCorpus;
