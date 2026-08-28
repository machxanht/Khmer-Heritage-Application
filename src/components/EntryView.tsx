import { useState } from "react";
import { ArrowLeft, Bookmark, BookMarked, MapPin, X } from "lucide-react";
import { Badge, EntryCard, LicenseBadge, Page, SectionHeading } from "./heritage.tsx";
import { LICENSE_LABEL, type MediaAsset } from "../data/types.ts";
import { useBookmarks } from "../context/BookmarksContext.tsx";
import { useLanguage } from "../context/LanguageContext.tsx";
import { useHeritageData } from "../context/HeritageDataContext.tsx";

export function EntryView({
  slug,
  onBack,
  onSelectEntry,
  onGoToSound,
}: {
  slug: string;
  onBack: () => void;
  onSelectEntry: (slug: string) => void;
  onGoToSound: () => void;
}) {
  const { entries, getEntryBySlug, getEntryById } = useHeritageData();
  const entry = getEntryBySlug(slug) || entries[0];
  const [zoom, setZoom] = useState<MediaAsset | null>(null);
  const [showSources, setShowSources] = useState(false);
  const related = entry.relatedEntryIds.map(getEntryById).filter(Boolean);
  const { isBookmarked, toggleBookmark } = useBookmarks();
  const { locale, tData, tNum, dict } = useLanguage();

  const saved = isBookmarked(entry.slug);
  const title = tData(entry.title);
  const summary = tData(entry.summary);
  const era = tData(entry.era);

  return (
    <div>
      {/* Cover Image Banner */}
      <div className="relative h-[46vh] min-h-[320px] overflow-hidden">
        <img
          src={entry.coverMedia.url}
          alt={tData(entry.coverMedia.title)}
          className="size-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-transparent" />
        
        <div className="absolute top-6 left-6 right-6 z-10 flex items-center justify-between">
          <button
            onClick={onBack}
            className="inline-flex items-center gap-2 rounded-full bg-background/85 backdrop-blur border border-border px-4 py-2 text-xs font-medium text-foreground hover:bg-secondary transition-colors cursor-pointer shadow-md"
          >
            <ArrowLeft className="size-3.5" />
            <span className={locale === "km" ? "font-khmer" : ""}>{dict.entry.backToArchive}</span>
          </button>

          <button
            onClick={() => toggleBookmark(entry.slug)}
            className={`inline-flex items-center gap-1.5 rounded-full px-4 py-2 text-xs font-medium backdrop-blur transition-all cursor-pointer shadow-md ${
              saved
                ? "bg-primary text-primary-foreground border border-primary font-bold shadow-primary/30"
                : "bg-background/85 border border-border text-foreground hover:border-primary/50"
            }`}
          >
            <Bookmark className={`size-3.5 ${saved ? "fill-current" : ""}`} />
            <span className={locale === "km" ? "font-khmer" : ""}>
              {saved ? dict.entry.savedInBookmarks : dict.entry.saveEntry}
            </span>
          </button>
        </div>
      </div>

      <Page>
        <div className="-mt-24 relative">
          <div className="flex flex-wrap gap-2">
            <Badge>{era}</Badge>
            {entry.coordinates && (
              <Badge tone="stone">
                <MapPin className="mr-1 size-3 inline" /> {tNum(entry.coordinates.latitude.toFixed(3))}°N{" "}
                {tNum(entry.coordinates.longitude.toFixed(3))}°E
              </Badge>
            )}
          </div>
          
          <h1
            className={`mt-4 text-4xl md:text-5xl font-medium text-foreground ${
              locale === "km" ? "font-khmer leading-tight" : "font-display"
            }`}
          >
            {title}
          </h1>
          <p className="mt-4 max-w-2xl text-[15px] leading-relaxed text-muted-foreground">
            {summary}
          </p>
        </div>

        {/* Fact Matrix */}
        <div className="surface-card mt-8 grid grid-cols-2 gap-px overflow-hidden bg-border/40 md:grid-cols-4">
          {[
            [dict.entry.era, era.split("·")[0].trim()],
            [dict.entry.category, entry.categoryId],
            [dict.entry.mediaAssets, `${tNum(entry.gallery.length + 1)}`],
            [dict.entry.sources, `${tNum(entry.citations.length)} ${dict.entry.verifiedSources}`],
          ].map(([k, v]) => (
            <div key={k} className="bg-card p-4">
              <p className="text-[10px] uppercase tracking-[0.18em] text-primary/80">{k}</p>
              <p className={`mt-1.5 text-sm capitalize text-foreground font-medium ${locale === "km" ? "font-khmer" : ""}`}>{v}</p>
            </div>
          ))}
        </div>

        {/* Structured Key Facts Matrix */}
        {entry.keyFacts?.items && entry.keyFacts.items.length > 0 && (
          <div className="surface-card mt-4 p-5">
            <h3 className="text-[11px] uppercase tracking-[0.18em] text-primary font-semibold mb-3">
              {locale === "km" ? "ទិន្នន័យសំខាន់ៗនៃបេតិកភណ្ឌ" : locale === "vi" ? "Hồ Sơ Dữ Liệu Cốt Lõi Di Sản" : locale === "th" ? "ข้อมูลสำคัญทางประวัติศาสตร์" : "Core Heritage Key Facts"}
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {entry.keyFacts.items.map((fact) => (
                <div key={fact.key} className="rounded-md bg-secondary/40 border border-border/50 p-3">
                  <p className="text-[10px] uppercase tracking-wider text-muted-foreground font-medium">
                    {tData(fact.label)}
                  </p>
                  <p className={`mt-1 text-sm font-medium text-foreground ${locale === "km" ? "font-khmer" : ""}`}>
                    {tData(fact.value)}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Article Body Sections */}
        <article className="mt-12 max-w-3xl">
          {entry.content.sections.map((s) => {
            const headingText = tData(s.heading);
            const bodyText = tData(s.body);

            return (
              <section key={s.id} className="mb-10">
                <h2
                  className={`text-2xl font-medium text-foreground ${
                    locale === "km" ? "font-khmer" : "font-display"
                  }`}
                >
                  {headingText}
                </h2>
                <div className="gold-rule my-4" />
                <p
                  className={`text-[15px] leading-[1.85] text-foreground/90 ${
                    locale === "km" ? "font-khmer leading-loose" : ""
                  }`}
                >
                  {bodyText}
                </p>
              </section>
            );
          })}
        </article>

        {/* Gallery & Sound */}
        <div className="mt-6">
          <SectionHeading
            eyebrow={dict.entry.mediaEyebrow}
            title={dict.entry.mediaTitle}
          />
          <div className="grid gap-3 sm:grid-cols-3">
            {entry.gallery.map((g) => (
              <button
                key={g.id}
                onClick={() => setZoom(g)}
                className="surface-card group relative overflow-hidden text-left cursor-pointer"
              >
                <div className="aspect-4/3 overflow-hidden">
                  <img
                    src={g.url}
                    alt={tData(g.title)}
                    loading="lazy"
                    className="size-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                </div>
                <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-background to-transparent p-3">
                  <p className={`text-xs text-foreground font-medium ${locale === "km" ? "font-khmer" : ""}`}>{tData(g.title)}</p>
                  <div className="mt-1">
                    <LicenseBadge asset={g} />
                  </div>
                </div>
              </button>
            ))}
          </div>

          <div className="surface-card mt-4 flex items-center gap-4 p-4">
            <button
              onClick={onGoToSound}
              className="rounded-full bg-primary px-4 py-2 text-xs font-medium text-primary-foreground hover:opacity-90 transition cursor-pointer shrink-0 shadow-sm"
            >
              <span className={locale === "km" ? "font-khmer" : ""}>{dict.entry.playSoundscape}</span>
            </button>
            <div className="min-w-0">
              <p className="text-sm font-medium text-foreground">
                {dict.entry.soundscapeTitle}
              </p>
              <p className="text-[11px] text-muted-foreground">
                {dict.entry.soundscapeSubtitle}
              </p>
            </div>
          </div>
        </div>

        {/* Academic Citations & Bibliography */}
        <div className="mt-12">
          <button
            onClick={() => setShowSources((v) => !v)}
            className="flex w-full items-center gap-3 rounded-lg border border-border px-4 py-3 text-left text-sm hover:bg-secondary/50 transition-colors cursor-pointer"
          >
            <BookMarked className="size-4 text-primary" strokeWidth={1.5} />
            <span className="font-medium text-foreground">
              {dict.entry.citationsTitle}
            </span>
            <span className={`ml-auto text-xs text-muted-foreground ${locale === "km" ? "font-khmer" : ""}`}>
              {showSources ? dict.entry.hideCitations : `${tNum(entry.citations.length)} ${dict.common.sources}`}
            </span>
          </button>
          
          {showSources && (
            <ul className="surface-card mt-3 divide-y divide-border/60">
              {entry.citations.map((c) => (
                <li key={c.id} className="p-4">
                  <p className="text-sm text-foreground font-medium">{c.title}</p>
                  <p className="mt-1 text-xs text-muted-foreground">
                    {c.author}
                    {c.year ? ` · ${tNum(c.year)}` : ""}
                    {c.publisher ? ` · ${c.publisher}` : ""}
                  </p>
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Related Heritage */}
        <div className="mt-14">
          <SectionHeading
            eyebrow={dict.entry.relatedEyebrow}
            title={dict.entry.relatedTitle}
          />
          <div className="scroll-rail -mx-5 flex gap-4 overflow-x-auto px-5 pb-2 md:mx-0 md:px-0">
            {related.map((r) => (
              <EntryCard key={r!.id} entry={r!} wide onSelect={onSelectEntry} />
            ))}
          </div>
        </div>
      </Page>

      {/* Lightbox Zoom Modal */}
      {zoom && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-background/95 p-5 backdrop-blur"
          onClick={() => setZoom(null)}
        >
          <div className="max-w-3xl w-full" onClick={(e) => e.stopPropagation()}>
            <img src={zoom.url} alt={tData(zoom.title)} className="max-h-[70vh] w-full rounded-lg object-contain mx-auto" />
            <div className="mt-4 flex items-start justify-between gap-4">
              <div>
                <p className="text-sm font-medium text-foreground">{tData(zoom.title)}</p>
                <p className="mt-2 text-[11px] text-muted-foreground">
                  {zoom.creator} · {zoom.source} · {LICENSE_LABEL[zoom.license]}
                </p>
              </div>
              <button
                onClick={() => setZoom(null)}
                aria-label="Close viewer"
                className="rounded-full border border-border p-2 hover:bg-secondary transition-colors cursor-pointer text-muted-foreground hover:text-foreground"
              >
                <X className="size-4" />
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
