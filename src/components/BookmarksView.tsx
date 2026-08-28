import { Bookmark, Compass } from "lucide-react";
import { EntryCard, Page, SectionHeading } from "./heritage.tsx";
import { useBookmarks } from "../context/BookmarksContext.tsx";
import { useLanguage } from "../context/LanguageContext.tsx";
import { useHeritageData } from "../context/HeritageDataContext.tsx";

export function BookmarksView({
  onSelectEntry,
  onGoToDiscover,
}: {
  onSelectEntry: (slug: string) => void;
  onGoToDiscover: () => void;
}) {
  const { savedSlugs } = useBookmarks();
  const { locale, tNum, dict } = useLanguage();
  const { entries } = useHeritageData();

  const savedEntries = entries.filter((e) => savedSlugs.includes(e.slug));

  return (
    <Page>
      <SectionHeading
        eyebrow={dict.saved.eyebrow}
        title={dict.saved.title}
        action={
          <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
            <Bookmark className="size-4 text-primary fill-primary/30" />
            <span className={locale === "km" ? "font-khmer" : ""}>
              {tNum(savedEntries.length)} {dict.saved.savedCount}
            </span>
          </div>
        }
      />

      {savedEntries.length > 0 ? (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {savedEntries.map((e) => (
            <EntryCard key={e.id} entry={e} onSelect={onSelectEntry} />
          ))}
        </div>
      ) : (
        <div className="surface-card p-12 text-center space-y-4 max-w-md mx-auto mt-8">
          <div className="size-12 rounded-full bg-secondary border border-border grid place-items-center mx-auto text-muted-foreground">
            <Bookmark className="size-6" />
          </div>
          <h3
            className={`text-xl font-medium text-foreground ${
              locale === "km" ? "font-khmer" : "font-display"
            }`}
          >
            {dict.saved.emptyTitle}
          </h3>
          <p className="text-xs text-muted-foreground leading-relaxed">
            {dict.saved.emptyDesc}
          </p>
          <div className="pt-2">
            <button
              onClick={onGoToDiscover}
              className="inline-flex items-center gap-2 rounded-full bg-primary px-5 py-2.5 text-xs font-medium text-primary-foreground hover:opacity-90 transition cursor-pointer"
            >
              <Compass className="size-3.5" />
              <span className={locale === "km" ? "font-khmer" : ""}>{dict.saved.exploreArchivePrompt}</span>
            </button>
          </div>
        </div>
      )}
    </Page>
  );
}
