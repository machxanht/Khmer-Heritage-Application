import type { ReactNode } from "react";
import { Bookmark, Compass, Database, Globe, Landmark, Map, Music4, Search } from "lucide-react";
import { useLanguage } from "../context/LanguageContext.tsx";
import { useBookmarks } from "../context/BookmarksContext.tsx";

export type NavTab = "discover" | "map" | "music" | "search" | "saved" | "scraper";

export function AppShell({
  children,
  currentTab,
  onTabChange,
}: {
  children: ReactNode;
  currentTab: NavTab;
  onTabChange: (tab: NavTab) => void;
}) {
  const { locale, setLocale, toggleLocale, tNum, dict } = useLanguage();
  const { savedSlugs } = useBookmarks();

  // Public main navigation items (Scraper separated into pipeline/admin tool)
  const publicNavItems = [
    { id: "discover" as NavTab, label: dict.nav.discover, icon: Compass },
    { id: "map" as NavTab, label: dict.nav.map, icon: Map },
    { id: "music" as NavTab, label: dict.nav.sound, icon: Music4 },
    { id: "search" as NavTab, label: dict.nav.search, icon: Search },
    { id: "saved" as NavTab, label: dict.nav.saved, icon: Bookmark },
  ];

  return (
    <div className="min-h-screen lg:flex bg-background text-foreground">
      {/* Desktop Sidebar */}
      <aside className="hidden lg:flex w-64 shrink-0 flex-col gap-6 border-r border-border/70 px-6 py-8 sticky top-0 h-screen">
        <Brand appName={dict.common.appName} onClick={() => onTabChange("discover")} />

        {/* Language Switcher Bar on Sidebar */}
        <div className="flex flex-col gap-2 bg-secondary/70 border border-border/80 rounded-xl p-2.5">
          <div className="flex items-center justify-between">
            <span className="text-[11px] text-muted-foreground flex items-center gap-1.5 pl-1">
              <Globe className="size-3.5 text-primary" />
              <span className="font-medium text-foreground">{dict.common.language}</span>
            </span>
          </div>
          <div className="grid grid-cols-4 gap-1 bg-background/80 border border-border rounded-lg p-0.5">
            <button
              onClick={() => setLocale("km")}
              title="Khmer"
              className={`px-1.5 py-1 text-[11px] font-semibold rounded text-center transition cursor-pointer ${
                locale === "km"
                  ? "bg-primary text-primary-foreground shadow-sm font-khmer"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              ខ្មែរ
            </button>
            <button
              onClick={() => setLocale("en")}
              title="English"
              className={`px-1.5 py-1 text-[11px] font-semibold rounded text-center transition cursor-pointer ${
                locale === "en"
                  ? "bg-primary text-primary-foreground shadow-sm"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              EN
            </button>
            <button
              onClick={() => setLocale("vi")}
              title="Tiếng Việt"
              className={`px-1.5 py-1 text-[11px] font-semibold rounded text-center transition cursor-pointer ${
                locale === "vi"
                  ? "bg-primary text-primary-foreground shadow-sm"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              VI
            </button>
            <button
              onClick={() => setLocale("th")}
              title="ภาษาไทย"
              className={`px-1.5 py-1 text-[11px] font-semibold rounded text-center transition cursor-pointer ${
                locale === "th"
                  ? "bg-primary text-primary-foreground shadow-sm"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              TH
            </button>
          </div>
        </div>

        {/* Public Navigation items */}
        <nav className="flex flex-col gap-1.5">
          {publicNavItems.map((item) => {
            const isActive = currentTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => onTabChange(item.id)}
                className={`group flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm transition-colors text-left cursor-pointer ${
                  isActive
                    ? "bg-secondary text-primary font-medium shadow-sm border border-primary/20"
                    : "text-muted-foreground hover:bg-secondary/60 hover:text-foreground"
                }`}
              >
                <item.icon className="size-4 shrink-0" strokeWidth={1.5} />
                <span className={locale === "km" ? "font-khmer" : ""}>{item.label}</span>
                {item.id === "saved" && savedSlugs.length > 0 && (
                  <span className="ml-auto bg-primary text-primary-foreground text-[10px] px-2 py-0.5 rounded-full font-mono font-bold">
                    {tNum(savedSlugs.length)}
                  </span>
                )}
              </button>
            );
          })}
        </nav>

        {/* Sidebar Footer with Archive Note and Ingestion Pipeline Utility Link */}
        <div className="mt-auto flex flex-col gap-3 border-t border-border/40 pt-4">
          <button
            onClick={() => onTabChange("scraper")}
            className={`flex items-center gap-2 rounded-lg px-2.5 py-1.5 text-[11px] font-medium transition cursor-pointer ${
              currentTab === "scraper"
                ? "bg-primary/15 text-primary border border-primary/30"
                : "text-muted-foreground/70 hover:text-foreground hover:bg-secondary/40"
            }`}
          >
            <Database className="size-3.5 shrink-0" />
            <span className="truncate">Content Ingestion Pipeline</span>
          </button>

          <div className="text-[11px] leading-relaxed text-muted-foreground">
            {dict.common.archiveNote}
          </div>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 min-w-0 flex flex-col">
        {/* Top Header on BOTH Mobile and Desktop */}
        <header className="sticky top-0 z-40 border-b border-border/70 bg-background/90 backdrop-blur-xl px-5 py-3 flex items-center justify-between">
          <div className="lg:hidden">
            <Brand appName={dict.common.appName} compact onClick={() => onTabChange("discover")} />
          </div>

          <div className="hidden lg:flex items-center gap-3 text-xs text-muted-foreground">
            <span className="w-2 h-2 rounded-full bg-emerald-500 inline-block animate-pulse" />
            <span className={locale === "km" ? "font-khmer" : ""}>{dict.common.tagline}</span>
          </div>

          {/* Quick Actions Header Toolbar (Language, Saved Counter, Search) */}
          <div className="flex items-center gap-2">
            {/* Quick Language Toggle Button */}
            <button
              onClick={toggleLocale}
              title={dict.common.language}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold border border-primary/40 rounded-full bg-primary/10 text-primary hover:bg-primary/20 transition cursor-pointer shadow-sm"
            >
              <Globe className="size-3.5" />
              <span>
                {locale === "km" ? "ខ្មែរ" : locale === "vi" ? "VI (Tiếng Việt)" : locale === "th" ? "TH (ไทย)" : "EN"}
              </span>
            </button>

            {/* Saved Shortcut */}
            <button
              onClick={() => onTabChange("saved")}
              title={dict.common.saved}
              className={`relative rounded-full border px-3 py-1.5 text-xs flex items-center gap-1.5 transition cursor-pointer ${
                currentTab === "saved"
                  ? "border-primary bg-primary text-primary-foreground font-medium"
                  : "border-border bg-secondary/60 text-muted-foreground hover:text-foreground hover:border-primary/40"
              }`}
            >
              <Bookmark className={`size-3.5 ${savedSlugs.length > 0 ? "fill-current" : ""}`} />
              <span className={`hidden sm:inline ${locale === "km" ? "font-khmer" : ""}`}>{dict.common.saved}</span>
              {savedSlugs.length > 0 && (
                <span className="ml-1 bg-amber-400 text-stone-900 font-mono text-[10px] font-bold px-1.5 py-0.2 rounded-full">
                  {tNum(savedSlugs.length)}
                </span>
              )}
            </button>

            {/* Quick Search */}
            <button
              onClick={() => onTabChange("search")}
              aria-label={dict.common.search}
              className={`rounded-full border p-2 transition-colors cursor-pointer ${
                currentTab === "search"
                  ? "border-primary bg-primary text-primary-foreground"
                  : "border-border bg-secondary/60 text-muted-foreground hover:text-foreground hover:border-primary/40"
              }`}
            >
              <Search className="size-3.5" strokeWidth={2} />
            </button>
          </div>
        </header>

        {/* Dynamic Route/View Body */}
        <main className="flex-1 pb-28 lg:pb-16">{children}</main>

        {/* Mobile Bottom Navigation: Clean 5-tab public grid */}
        <nav className="fixed bottom-0 inset-x-0 z-40 border-t border-border/70 bg-background/95 backdrop-blur-xl lg:hidden">
          <div className="grid grid-cols-5">
            {publicNavItems.map((item) => {
              const isActive = currentTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => onTabChange(item.id)}
                  className={`flex flex-col items-center gap-1 py-3 text-[10px] tracking-wide transition-colors cursor-pointer relative ${
                    isActive ? "text-primary font-medium" : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  <item.icon className="size-4.5" strokeWidth={1.5} />
                  <span className={locale === "km" ? "font-khmer" : ""}>{item.label}</span>
                  {item.id === "saved" && savedSlugs.length > 0 && (
                    <span className="absolute top-2 right-3 w-2 h-2 rounded-full bg-primary" />
                  )}
                </button>
              );
            })}
          </div>
        </nav>
      </div>
    </div>
  );
}

function Brand({ appName, compact = false, onClick }: { appName: string; compact?: boolean; onClick?: () => void }) {
  return (
    <button onClick={onClick} className="flex items-center gap-3 text-left focus:outline-none group cursor-pointer">
      <span className="grid size-9 place-items-center rounded-md border border-primary/40 text-primary group-hover:border-primary/80 transition-colors">
        <Landmark className="size-4" strokeWidth={1.4} />
      </span>
      <span className="leading-tight">
        <span className="block font-title text-[13px] tracking-[0.2em] text-foreground font-semibold">
          {appName}
        </span>
        {!compact && (
          <span className="block text-[11px] text-muted-foreground">Digital Archive</span>
        )}
      </span>
    </button>
  );
}
