import angkorWat from "../../assets/angkor-wat.jpg";
import apsara from "../../assets/apsara.jpg";
import bayon from "../../assets/bayon.jpg";
import banteaySrei from "../../assets/banteay-srei.jpg";
import instrumentsImg from "../../assets/instruments.jpg";
import silk from "../../assets/silk.jpg";
import type { MediaAsset, MediaProvenance } from "../../types/schema.ts";

export const LOCAL_ASSETS = {
  angkorWat,
  apsara,
  bayon,
  banteaySrei,
  instruments: instrumentsImg,
  silk,
};

export const createMedia = (
  id: string,
  url: string,
  en: string,
  km: string,
  creator: string,
  vi?: string,
  th?: string,
  source = "Khmer Heritage Archive / EFEO / UNESCO",
  license: MediaAsset["license"] = "cc_by_sa",
  sourceId?: string,
  provenance?: MediaProvenance
): MediaAsset => ({
  id,
  url,
  thumbnailUrl: url,
  type: "image",
  title: { en, km, vi: vi || en, th: th || en },
  creator,
  source,
  sourceUrl: "https://whc.unesco.org/en/list/668/",
  license,
  licenseUrl: license === 'direct_permission' 
    ? "https://collection.efeo.fr/" 
    : "https://creativecommons.org/licenses/by-sa/4.0/",
  attribution: `${creator} — ${source}, CC BY-SA 4.0`,
  ...(sourceId ? { sourceId } : {}),
  ...(provenance ? { provenance } : {}),
  reviewStatus: 'verified_peer_reviewed',
});
