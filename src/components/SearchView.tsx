import { useState } from "react";
import { Search, X, BookOpen, Layers } from "lucide-react";
import { EntryCard, Page, SectionHeading } from "./heritage.tsx";
import { categories, eras } from "../data/heritage.ts";
import { useLanguage } from "../context/LanguageContext.tsx";
import { useHeritageData } from "../context/HeritageDataContext.tsx";

export function SearchView({
  initialQuery = "",
  onSelectEntry,
}: {
  initialQuery?: string;
  onSelectEntry: (slug: string) => void;
}) {
  const { locale, tData, tNum, dict } = useLanguage();
  const { entries } = useHeritageData();
  const [query, setQuery] = useState(initialQuery);
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [selectedEra, setSelectedEra] = useState<string>("all");

  const filteredEntries = entries.filter((entry) => {
    const rawQ = query.trim();
    const q = rawQ.toLowerCase();
    const matchesQuery =
      rawQ === "" ||
      entry.title.en.toLowerCase().includes(q) ||
      entry.title.km.includes(rawQ) ||
      (entry.title.vi ? entry.title.vi.toLowerCase().includes(q) : false) ||
      (entry.title.th ? entry.title.th.toLowerCase().includes(q) : false) ||
      entry.summary.en.toLowerCase().includes(q) ||
      entry.summary.km.includes(rawQ) ||
      (entry.summary.vi ? entry.summary.vi.toLowerCase().includes(q) : false) ||
      (entry.summary.th ? entry.summary.th.toLowerCase().includes(q) : false) ||
      entry.content.sections.some(
        (s) =>
          s.heading.en.toLowerCase().includes(q) ||
          s.heading.km.includes(rawQ) ||
          (s.heading.vi ? s.heading.vi.toLowerCase().includes(q) : false) ||
          (s.heading.th ? s.heading.th.toLowerCase().includes(q) : false) ||
          s.body.en.toLowerCase().includes(q) ||
          s.body.km.includes(rawQ) ||
          (s.body.vi ? s.body.vi.toLowerCase().includes(q) : false) ||
          (s.body.th ? s.body.th.toLowerCase().includes(q) : false)
      );

    const matchesCategory =
      selectedCategory === "all" ||
      entry.categoryId === selectedCategory ||
      entry.category === selectedCategory;

    const matchesEra =
      selectedEra === "all" ||
      entry.era.en.toLowerCase().includes(selectedEra.toLowerCase()) ||
      (selectedEra === "pre" && (entry.era.en.toLowerCase().includes("pre") || entry.era.km.includes("មុន"))) ||
      (selectedEra === "early" && (entry.era.en.toLowerCase().includes("early") || entry.era.km.includes("ដើម") || entry.era.en.includes("967"))) ||
      (selectedEra === "golden" && (entry.era.en.toLowerCase().includes("12th") || entry.era.km.includes("១២"))) ||
      (selectedEra === "post" && (entry.era.en.toLowerCase().includes("post") || entry.era.km.includes("ក្រោយ")));

    return matchesQuery && matchesCategory && matchesEra;
  });

  return (
    <Page>
      <SectionHeading
        eyebrow={dict.search.eyebrow}
        title={dict.search.title}
      />

      {/* Search Input Box */}
      <div className="surface-card p-6 mb-8 space-y-4">
        <div className="relative">
          <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 size-5 text-muted-foreground" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={dict.search.placeholder}
            className={`w-full bg-secondary/50 border border-border rounded-xl pl-12 pr-10 py-3.5 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition ${
              locale === "km" ? "font-khmer text-xs" : ""
            }`}
          />
          {query && (
            <button
              onClick={() => setQuery("")}
              className="absolute right-4 top-1/2 transform -translate-y-1/2 text-muted-foreground hover:text-foreground cursor-pointer"
            >
              <X className="size-4" />
            </button>
          )}
        </div>

        {/* Quick Filter Chips */}
        <div className="flex flex-wrap items-center gap-2 pt-2 text-xs">
          <span className="text-muted-foreground flex items-center gap-1 mr-1">
            <Layers className="size-3.5" /> {dict.search.filterPillar}
          </span>
          <button
            onClick={() => setSelectedCategory("all")}
            className={`px-3 py-1.5 rounded-full transition cursor-pointer ${
              selectedCategory === "all"
                ? "bg-primary text-primary-foreground font-medium"
                : "bg-secondary text-muted-foreground hover:text-foreground"
            }`}
          >
            <span className={locale === "km" ? "font-khmer" : ""}>{dict.search.allCategories}</span>
          </button>
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-3 py-1.5 rounded-full transition cursor-pointer ${
                selectedCategory === cat.id
                  ? "bg-primary text-primary-foreground font-medium"
                  : "bg-secondary text-muted-foreground hover:text-foreground"
              }`}
            >
              <span className={locale === "km" ? "font-khmer" : ""}>{tData(cat.title)}</span>
            </button>
          ))}
        </div>

        {/* Era Filters */}
        <div className="flex flex-wrap items-center gap-2 pt-1 text-xs">
          <span className="text-muted-foreground mr-1">{dict.search.filterEra}</span>
          <button
            onClick={() => setSelectedEra("all")}
            className={`px-2.5 py-1 rounded-md transition cursor-pointer ${
              selectedEra === "all"
                ? "bg-secondary text-primary font-medium border border-primary/40"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            <span className={locale === "km" ? "font-khmer" : ""}>{dict.search.allEras}</span>
          </button>
          {eras.map((era) => (
            <button
              key={era.id}
              onClick={() => setSelectedEra(era.id)}
              className={`px-2.5 py-1 rounded-md transition cursor-pointer ${
                selectedEra === era.id
                  ? "bg-secondary text-primary font-medium border border-primary/40"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              <span className={locale === "km" ? "font-khmer" : ""}>{tData(era.label)}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Search Results List */}
      <div>
        <div className="flex items-center justify-between mb-4 text-xs text-muted-foreground">
          <span className={locale === "km" ? "font-khmer" : ""}>
            {tNum(filteredEntries.length)} {dict.search.resultsMatch}
          </span>
          {(query || selectedCategory !== "all" || selectedEra !== "all") && (
            <button
              onClick={() => {
                setQuery("");
                setSelectedCategory("all");
                setSelectedEra("all");
              }}
              className="text-primary hover:underline cursor-pointer"
            >
              <span className={locale === "km" ? "font-khmer" : ""}>{dict.search.resetFilters}</span>
            </button>
          )}
        </div>

        {filteredEntries.length > 0 ? (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {filteredEntries.map((e) => (
              <EntryCard key={e.id} entry={e} onSelect={onSelectEntry} />
            ))}
          </div>
        ) : (
          <div className="surface-card p-12 text-center space-y-4">
            <BookOpen className="size-8 text-muted-foreground mx-auto" />
            <h4 className={`text-lg font-medium text-foreground ${locale === "km" ? "font-khmer" : ""}`}>
              {dict.search.noEntriesFound}
            </h4>
            <p className="text-xs text-muted-foreground max-w-sm mx-auto leading-relaxed">
              {dict.search.searchHint}
            </p>
          </div>
        )}
      </div>
    </Page>
  );
}
