import { useState } from "react";
import {
  Landmark,
  History,
  Palette,
  Music4,
  Sparkles,
  BookOpen,
  Shirt,
  Utensils,
  Hammer,
  MapPin,
  Crown,
  Flame,
  Layers,
  ArrowRight,
} from "lucide-react";
import { Badge, EntryCard, Page, SectionHeading } from "./heritage.tsx";
import { categories, eras } from "../data/heritage.ts";
import { useLanguage } from "../context/LanguageContext.tsx";
import { useHeritageData } from "../context/HeritageDataContext.tsx";

const categoryIconMap: Record<string, typeof Landmark> = {
  temples: Landmark,
  history: History,
  arts: Palette,
  music: Music4,
  rituals: Sparkles,
  script: BookOpen,
  costumes: Shirt,
  cuisine: Utensils,
  crafts: Hammer,
  landmarks: MapPin,
  figures: Crown,
  mythology: Flame,
};

export function CategoriesView({
  initialCategory = "all",
  onSelectEntry,
}: {
  initialCategory?: string;
  onSelectEntry: (slug: string) => void;
}) {
  const { locale, tData, tNum, dict } = useLanguage();
  const { entries } = useHeritageData();
  const [selectedCategory, setSelectedCategory] = useState<string>(initialCategory);
  const [selectedEra, setSelectedEra] = useState<string>("all");

  const activeCategoryObj = categories.find((c) => c.id === selectedCategory || c.slug === selectedCategory);

  const filteredEntries = entries.filter((e) => {
    const matchesCat =
      selectedCategory === "all" || e.categoryId === selectedCategory;
    const matchesEra =
      selectedEra === "all" ||
      e.era.en.toLowerCase().includes(selectedEra.toLowerCase()) ||
      (selectedEra === "golden" && (e.era.en.includes("12th") || e.era.km.includes("១២"))) ||
      (selectedEra === "early" && (e.era.en.includes("967") || e.era.en.includes("802") || e.era.km.includes("ដើម"))) ||
      (selectedEra === "post" && (e.era.en.toLowerCase().includes("post") || e.era.km.includes("ក្រោយ")));
    return matchesCat && matchesEra;
  });

  return (
    <Page>
      <SectionHeading
        eyebrow={dict.categoriesView.eyebrow}
        title={dict.categoriesView.title}
      />

      <p className="max-w-3xl text-sm leading-relaxed text-muted-foreground -mt-2 mb-8">
        {dict.categoriesView.subtitle}
      </p>

      {/* 12 Categories Grid Selector */}
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4 mb-10">
        <button
          onClick={() => setSelectedCategory("all")}
          className={`flex items-center gap-3 p-3.5 rounded-xl border transition-all text-left cursor-pointer ${
            selectedCategory === "all"
              ? "bg-primary/15 border-primary text-primary shadow-sm ring-1 ring-primary/40"
              : "bg-secondary/40 border-border/70 text-foreground hover:bg-secondary hover:border-border"
          }`}
        >
          <div
            className={`p-2 rounded-lg ${
              selectedCategory === "all"
                ? "bg-primary text-primary-foreground"
                : "bg-background/80 text-muted-foreground"
            }`}
          >
            <Layers className="size-4 shrink-0" />
          </div>
          <div className="min-w-0">
            <p className="text-xs font-semibold truncate">{dict.categoriesView.allCategories}</p>
            <p className="text-[10px] text-muted-foreground">
              {tNum(entries.length)} {dict.common.entriesCount}
            </p>
          </div>
        </button>

        {categories.map((c) => {
          const Icon = categoryIconMap[c.id] || Landmark;
          const isSelected = selectedCategory === c.id || selectedCategory === c.slug;
          const count = entries.filter((e) => e.categoryId === c.id || e.categoryId === c.slug).length;

          return (
            <button
              key={c.id}
              onClick={() => setSelectedCategory(c.id)}
              className={`flex items-center gap-3 p-3.5 rounded-xl border transition-all text-left cursor-pointer ${
                isSelected
                  ? "bg-primary/15 border-primary text-primary shadow-sm ring-1 ring-primary/40"
                  : "bg-secondary/40 border-border/70 text-foreground hover:bg-secondary hover:border-border"
              }`}
            >
              <div
                className={`p-2 rounded-lg shrink-0 ${
                  isSelected
                    ? "bg-primary text-primary-foreground"
                    : "bg-background/80 text-muted-foreground"
                }`}
              >
                <Icon className="size-4" />
              </div>
              <div className="min-w-0">
                <p className={`text-xs font-medium truncate ${locale === "km" ? "font-khmer" : ""}`}>
                  {tData(c.title)}
                </p>
                <p className="text-[10px] text-muted-foreground">
                  {tNum(count > 0 ? count : c.count || 0)} {dict.common.entriesCount}
                </p>
              </div>
            </button>
          );
        })}
      </div>

      {/* Selected Category Header Banner if single category chosen */}
      {activeCategoryObj && (
        <div className="surface-card p-6 mb-8 border border-primary/20 bg-gradient-to-r from-secondary/50 via-background to-secondary/30">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <span className="inline-flex items-center rounded-full bg-primary/20 text-primary px-2.5 py-0.5 text-[10px] uppercase font-bold tracking-widest">
                {activeCategoryObj.slug}
              </span>
              <h2
                className={`mt-2 text-2xl md:text-3xl font-medium text-foreground ${
                  locale === "km" ? "font-khmer" : "font-display"
                }`}
              >
                {tData(activeCategoryObj.title)}
              </h2>
              {activeCategoryObj.description && (
                <p className="mt-2 text-sm text-muted-foreground max-w-2xl leading-relaxed">
                  {tData(activeCategoryObj.description)}
                </p>
              )}
            </div>

            <div className="flex items-center gap-2">
              <span className="text-xs text-muted-foreground">{dict.categoriesView.filterByEra}:</span>
              <div className="flex flex-wrap gap-1">
                <button
                  onClick={() => setSelectedEra("all")}
                  className={`px-2.5 py-1 text-xs rounded-md transition cursor-pointer ${
                    selectedEra === "all"
                      ? "bg-primary text-primary-foreground font-medium"
                      : "bg-secondary text-muted-foreground hover:text-foreground"
                  }`}
                >
                  {dict.search.allEras}
                </button>
                {eras.map((era) => (
                  <button
                    key={era.id}
                    onClick={() => setSelectedEra(era.id)}
                    className={`px-2.5 py-1 text-xs rounded-md transition cursor-pointer ${
                      selectedEra === era.id
                        ? "bg-primary text-primary-foreground font-medium"
                        : "bg-secondary text-muted-foreground hover:text-foreground"
                    }`}
                  >
                    <span className={locale === "km" ? "font-khmer" : ""}>{tData(era.label)}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Entries List in Category */}
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-base font-medium text-foreground flex items-center gap-2">
          <span>{dict.categoriesView.entriesAvailable}</span>
          <span className="bg-secondary text-primary font-mono text-xs px-2 py-0.5 rounded-full font-bold">
            {tNum(filteredEntries.length)}
          </span>
        </h3>
      </div>

      {filteredEntries.length > 0 ? (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filteredEntries.map((entry) => (
            <EntryCard key={entry.id} entry={entry} onSelect={onSelectEntry} />
          ))}
        </div>
      ) : (
        <div className="surface-card p-12 text-center my-6">
          <p className="text-base font-medium text-foreground">
            {dict.categoriesView.noEntriesInCategory}
          </p>
          <p className="text-xs text-muted-foreground mt-2">
            {dict.search.searchHint}
          </p>
          <button
            onClick={() => {
              setSelectedCategory("all");
              setSelectedEra("all");
            }}
            className="mt-4 inline-flex items-center gap-1.5 rounded-full bg-secondary px-4 py-2 text-xs font-medium text-foreground hover:bg-secondary/80 transition cursor-pointer"
          >
            <span>{dict.common.reset}</span>
            <ArrowRight className="size-3.5" />
          </button>
        </div>
      )}
    </Page>
  );
}
