import { useState, useMemo } from "react";
import { X, ExternalLink, Image as ImageIcon, Layers } from "lucide-react";
import { LicenseBadge, Page, SectionHeading } from "./heritage.tsx";
import { LICENSE_LABEL, type MediaAsset, type EntryDetail } from "../data/types.ts";
import { categories } from "../data/heritage.ts";
import { useLanguage } from "../context/LanguageContext.tsx";
import { useHeritageData } from "../context/HeritageDataContext.tsx";

interface EnrichedMediaAsset extends MediaAsset {
  parentEntrySlug: string;
  parentEntryTitle: { km: string; en: string; vi?: string; th?: string };
  categoryId: string;
}

export function GalleryView({
  onSelectEntry,
}: {
  onSelectEntry: (slug: string) => void;
}) {
  const { locale, tData, tNum, dict } = useLanguage();
  const { entries } = useHeritageData();
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [activeAsset, setActiveAsset] = useState<EnrichedMediaAsset | null>(null);

  // Extract and enrich all media assets from all entries
  const allMediaAssets = useMemo(() => {
    const list: EnrichedMediaAsset[] = [];
    const seenUrls = new Set<string>();

    entries.forEach((entry: EntryDetail) => {
      // Cover media
      if (entry.coverMedia && !seenUrls.has(entry.coverMedia.url)) {
        seenUrls.add(entry.coverMedia.url);
        list.push({
          ...entry.coverMedia,
          parentEntrySlug: entry.slug,
          parentEntryTitle: entry.title,
          categoryId: entry.categoryId,
        });
      }

      // Gallery media
      entry.gallery?.forEach((item) => {
        if (!seenUrls.has(item.url)) {
          seenUrls.add(item.url);
          list.push({
            ...item,
            parentEntrySlug: entry.slug,
            parentEntryTitle: entry.title,
            categoryId: entry.categoryId,
          });
        }
      });
    });

    return list;
  }, [entries]);

  const filteredAssets = allMediaAssets.filter((asset) => {
    if (selectedCategory === "all") return true;
    return asset.categoryId === selectedCategory;
  });

  return (
    <Page>
      <SectionHeading
        eyebrow={dict.galleryView.eyebrow}
        title={dict.galleryView.title}
      />

      <p className="max-w-3xl text-sm leading-relaxed text-muted-foreground -mt-2 mb-8">
        {dict.galleryView.subtitle}
      </p>

      {/* Category Filter Chips */}
      <div className="surface-card p-4 mb-8">
        <div className="flex flex-wrap items-center gap-2 text-xs">
          <span className="text-muted-foreground flex items-center gap-1 mr-1">
            <Layers className="size-3.5" /> {dict.galleryView.filterByCategory}:
          </span>
          <button
            onClick={() => setSelectedCategory("all")}
            className={`px-3 py-1.5 rounded-full transition cursor-pointer ${
              selectedCategory === "all"
                ? "bg-primary text-primary-foreground font-medium"
                : "bg-secondary text-muted-foreground hover:text-foreground"
            }`}
          >
            {dict.galleryView.allMedia} ({tNum(allMediaAssets.length)})
          </button>
          {categories.map((cat) => {
            const count = allMediaAssets.filter((a) => a.categoryId === cat.id).length;
            if (count === 0) return null;
            return (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-3 py-1.5 rounded-full transition cursor-pointer ${
                  selectedCategory === cat.id
                    ? "bg-primary text-primary-foreground font-medium"
                    : "bg-secondary text-muted-foreground hover:text-foreground"
                }`}
              >
                <span className={locale === "km" ? "font-khmer" : ""}>
                  {tData(cat.title)} ({tNum(count)})
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Media Count Indicator */}
      <div className="flex items-center justify-between mb-4 text-xs text-muted-foreground">
        <span>
          {tNum(filteredAssets.length)} {dict.galleryView.mediaCount}
        </span>
        <span className="italic">{dict.galleryView.licensingNote}</span>
      </div>

      {/* Gallery Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredAssets.map((asset) => (
          <div
            key={asset.id}
            className="surface-card group relative overflow-hidden flex flex-col justify-between cursor-pointer text-left transition-transform duration-300 hover:-translate-y-1"
            onClick={() => setActiveAsset(asset)}
          >
            <div className="relative aspect-4/3 overflow-hidden bg-secondary/30">
              <img
                src={asset.url}
                alt={tData(asset.title)}
                loading="lazy"
                className="size-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute top-2 right-2">
                <LicenseBadge asset={asset} />
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-transparent to-transparent opacity-80 group-hover:opacity-95 transition-opacity" />
            </div>

            <div className="p-4 flex flex-col justify-between flex-1">
              <div>
                <p className="text-[10px] uppercase font-bold tracking-widest text-primary/80">
                  {asset.creator || "Khmer Heritage Archive"}
                </p>
                <h4
                  className={`mt-1 text-sm font-medium text-foreground leading-snug line-clamp-1 ${
                    locale === "km" ? "font-khmer" : ""
                  }`}
                >
                  {tData(asset.title)}
                </h4>
              </div>

              <div className="mt-4 pt-3 border-t border-border/50 flex items-center justify-between text-xs">
                <span className="text-muted-foreground truncate max-w-[170px]">
                  {tData(asset.parentEntryTitle)}
                </span>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onSelectEntry(asset.parentEntrySlug);
                  }}
                  className="inline-flex items-center gap-1 text-primary hover:underline font-medium cursor-pointer"
                >
                  <span>{dict.galleryView.viewArticle}</span>
                  <ExternalLink className="size-3" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Lightbox Modal */}
      {activeAsset && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-background/95 p-4 md:p-8 backdrop-blur"
          onClick={() => setActiveAsset(null)}
        >
          <div
            className="surface-card max-w-4xl w-full p-6 border border-primary/20 overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between pb-3 border-b border-border/70">
              <div className="flex items-center gap-2">
                <ImageIcon className="size-4 text-primary" />
                <h3
                  className={`text-base font-semibold text-foreground ${
                    locale === "km" ? "font-khmer" : ""
                  }`}
                >
                  {tData(activeAsset.title)}
                </h3>
              </div>
              <button
                onClick={() => setActiveAsset(null)}
                aria-label={dict.galleryView.closeViewer}
                className="p-1.5 rounded-full hover:bg-secondary text-muted-foreground hover:text-foreground transition cursor-pointer"
              >
                <X className="size-4" />
              </button>
            </div>

            <div className="my-4 max-h-[60vh] flex items-center justify-center overflow-hidden rounded-lg bg-black/40">
              <img
                src={activeAsset.url}
                alt={tData(activeAsset.title)}
                className="max-h-[58vh] w-auto max-w-full object-contain rounded"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2 text-xs">
              <div className="space-y-1.5 text-muted-foreground">
                <p>
                  <strong className="text-foreground">Creator:</strong> {activeAsset.creator}
                </p>
                <p>
                  <strong className="text-foreground">Source:</strong> {activeAsset.source}
                </p>
                <p>
                  <strong className="text-foreground">License:</strong> {LICENSE_LABEL[activeAsset.license]}
                </p>
              </div>

              <div className="flex flex-col sm:items-end justify-between gap-3">
                <div className="text-left sm:text-right">
                  <span className="text-muted-foreground block">Catalogued in Dossier:</span>
                  <span className="font-semibold text-foreground">
                    {tData(activeAsset.parentEntryTitle)}
                  </span>
                </div>
                <button
                  onClick={() => {
                    const slug = activeAsset.parentEntrySlug;
                    setActiveAsset(null);
                    onSelectEntry(slug);
                  }}
                  className="inline-flex items-center gap-2 rounded-full bg-primary px-5 py-2 text-xs font-semibold text-primary-foreground hover:opacity-90 transition cursor-pointer shadow-md"
                >
                  <span>{dict.galleryView.viewArticle}</span>
                  <ExternalLink className="size-3.5" />
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </Page>
  );
}
