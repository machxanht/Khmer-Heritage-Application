import { useState } from "react";
import { ArrowRight, Grid } from "lucide-react";
import { Badge, EntryCard, Page, SectionHeading } from "./heritage.tsx";
import { categories, eras, trails } from "../data/heritage.ts";
import { useLanguage } from "../context/LanguageContext.tsx";
import { useHeritageData } from "../context/HeritageDataContext.tsx";

export function DiscoverView({
  onSelectEntry,
  onSelectCategory,
  onViewAllCategories,
}: {
  onSelectEntry: (slug: string) => void;
  onSelectCategory: (categoryId: string) => void;
  onViewAllCategories: () => void;
}) {
  const { locale, tData, tNum, dict } = useLanguage();
  const { entries } = useHeritageData();
  const featured = entries[0];
  const [activeEra, setActiveEra] = useState("golden");
  const era = eras.find((e) => e.id === activeEra) || eras[0];

  return (
    <div>
      {/* Featured Masterpiece Hero Section */}
      <section className="relative">
        <div className="relative h-[62vh] min-h-[440px] w-full overflow-hidden">
          <img
            src={featured.coverMedia.url}
            alt={tData(featured.coverMedia.title)}
            width={1600}
            height={1008}
            className="size-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/70 to-background/20" />
          
          <div className="absolute inset-x-0 bottom-0">
            <div className="mx-auto w-full max-w-6xl px-5 pb-8 md:px-8 md:pb-12">
              <div className="flex flex-wrap items-center gap-2">
                <Badge>{dict.home.featuredToday}</Badge>
                <Badge tone="stone">{tData(featured.era)}</Badge>
              </div>
              
              <h1
                className={`mt-4 max-w-2xl text-4xl leading-[1.1] md:text-6xl font-medium text-foreground ${
                  locale === "km" ? "font-khmer leading-tight" : "font-display"
                }`}
              >
                {tData(featured.title)}
              </h1>
              
              <p className="mt-4 max-w-xl text-sm leading-relaxed text-muted-foreground">
                {tData(featured.summary)}
              </p>

              <button
                onClick={() => onSelectEntry(featured.slug)}
                className="mt-6 inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-medium text-primary-foreground transition hover:opacity-90 cursor-pointer shadow-lg shadow-primary/20"
              >
                <span className={locale === "km" ? "font-khmer" : ""}>{dict.home.exploreJourney}</span>
                <ArrowRight className="size-4" />
              </button>
            </div>
          </div>
        </div>
      </section>

      <Page>
        {/* 12 Heritage Pillars Grid */}
        <div className="flex items-end justify-between mb-5">
          <div>
            <p className="text-eyebrow">{dict.home.pillarsEyebrow}</p>
            <h2
              className={`mt-1.5 text-2xl md:text-3xl font-medium text-foreground ${
                locale === "km" ? "font-khmer leading-snug" : "font-display"
              }`}
            >
              {dict.home.pillarsTitle}
            </h2>
          </div>
          <button
            onClick={onViewAllCategories}
            className="hidden sm:inline-flex items-center gap-1.5 text-xs text-primary font-medium hover:underline cursor-pointer"
          >
            <Grid className="size-3.5" />
            <span>{dict.home.viewAllCategories}</span>
            <ArrowRight className="size-3" />
          </button>
        </div>

        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
          {categories.map((c) => {
            const count = entries.filter((e) => e.categoryId === c.id || e.categoryId === c.slug).length;
            return (
              <button
                key={c.id}
                onClick={() => onSelectCategory(c.id)}
                className="kbach-frame group flex flex-col justify-between gap-4 p-4 text-left transition-colors hover:bg-secondary/50 cursor-pointer"
              >
                <div>
                  <h3
                    className={`text-base leading-snug text-foreground font-medium ${
                      locale === "km" ? "font-khmer" : ""
                    }`}
                  >
                    {tData(c.title)}
                  </h3>
                  <p className="text-[11px] text-muted-foreground mt-1 line-clamp-1">
                    {tData(c.blurb)}
                  </p>
                </div>
                <div>
                  <div className="gold-rule mb-2" />
                  <p className="text-[11px] text-muted-foreground">
                    {tNum(count > 0 ? count : c.count || 0)} {dict.home.entries}
                  </p>
                </div>
              </button>
            );
          })}
        </div>

        {/* Chronology / Era Ribbon */}
        <div className="mt-14">
          <SectionHeading
            eyebrow={dict.home.chronologyEyebrow}
            title={dict.home.chronologyTitle}
          />
          <div className="scroll-rail -mx-5 flex gap-2 overflow-x-auto px-5 md:mx-0 md:px-0 pb-1">
            {eras.map((e) => (
              <button
                key={e.id}
                onClick={() => setActiveEra(e.id)}
                className={`shrink-0 rounded-full border px-4 py-2 text-xs transition-colors cursor-pointer ${
                  e.id === activeEra
                    ? "border-primary bg-primary/15 text-primary font-medium shadow-xs"
                    : "border-border text-muted-foreground hover:text-foreground"
                }`}
              >
                <span className={locale === "km" ? "font-khmer" : ""}>{tData(e.label)}</span>
              </button>
            ))}
          </div>
          <div className="surface-card mt-4 p-6">
            <p className={`text-eyebrow ${locale === "km" ? "font-khmer" : ""}`}>{tData(era.range)}</p>
            <h3
              className={`mt-2 text-2xl font-medium text-foreground ${
                locale === "km" ? "font-khmer" : "font-display"
              }`}
            >
              {tData(era.label)}
            </h3>
            <div className="gold-rule my-4" />
            <p className="text-sm leading-relaxed text-muted-foreground">{tData(era.note)}</p>
          </div>
        </div>

        {/* Exploration Trails */}
        <div className="mt-14">
          <SectionHeading
            eyebrow={dict.home.trailsEyebrow}
            title={dict.home.trailsTitle}
          />
          <div className="grid gap-4 md:grid-cols-3">
            {trails.map((tr) => (
              <div
                key={tr.id}
                className="surface-card group relative overflow-hidden text-left"
              >
                <div className="relative aspect-16/10 overflow-hidden">
                  <img
                    src={tr.coverUrl}
                    alt={tData(tr.title)}
                    className="size-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/40 to-transparent" />
                  <div className="absolute bottom-3 left-3 right-3">
                    <span className="text-[10px] uppercase tracking-widest text-primary font-semibold">
                      {tNum(tr.stops)} {dict.home.stops}
                    </span>
                    <h3
                      className={`mt-1 text-lg font-medium text-foreground ${
                        locale === "km" ? "font-khmer" : "font-display"
                      }`}
                    >
                      {tData(tr.title)}
                    </h3>
                  </div>
                </div>
                <div className="p-4">
                  <p className="text-xs text-muted-foreground line-clamp-2">{tData(tr.blurb)}</p>
                  {tr.entrySlugs && tr.entrySlugs.length > 0 && (
                    <div className="mt-4 flex flex-wrap gap-2">
                      {tr.entrySlugs.map((slug) => {
                        const matched = entries.find((e) => e.slug === slug);
                        if (!matched) return null;
                        return (
                          <button
                            key={slug}
                            onClick={() => onSelectEntry(slug)}
                            className="rounded-full bg-secondary/80 hover:bg-primary/20 hover:text-primary px-2.5 py-1 text-[11px] font-medium transition cursor-pointer border border-border/60"
                          >
                            {tData(matched.title)}
                          </button>
                        );
                      })}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Catalogued Entries Gallery */}
        <div className="mt-14">
          <SectionHeading
            eyebrow={dict.home.archiveEyebrow}
            title={dict.home.archiveTitle}
          />
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {entries.slice(0, 6).map((entry) => (
              <EntryCard key={entry.id} entry={entry} onSelect={onSelectEntry} />
            ))}
          </div>
        </div>
      </Page>
    </div>
  );
}
