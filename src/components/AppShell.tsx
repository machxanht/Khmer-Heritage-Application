import type { ReactNode } from "react";
import {
  Bookmark,
  Compass,
  Database,
  Globe,
  Grid,
  Image as ImageIcon,
  Map,
  Music4,
  Search,
} from "lucide-react";
import { useLanguage } from "../context/LanguageContext.tsx";
import { useBookmarks } from "../context/BookmarksContext.tsx";

export type NavTab =
  | "discover"
  | "categories"
  | "search"
  | "gallery"
  | "map"
  | "music"
  | "saved"
  | "scraper";

export function AppShell({
  children,
  currentTab,
  onTabChange,
}: {
  children: ReactNode;
  currentTab: NavTab;
  onTabChange: (tab: NavTab) => void;
}) {
  const { locale, setLocale, tNum, dict } = useLanguage();
  const { savedSlugs } = useBookmarks();

  // Primary Encyclopedia Navigation Tabs
  const publicNavItems = [
    { id: "discover" as NavTab, label: dict.nav.discover, icon: Compass },
    { id: "categories" as NavTab, label: dict.nav.categories, icon: Grid },
    { id: "search" as NavTab, label: dict.nav.search, icon: Search },
    { id: "gallery" as NavTab, label: dict.nav.gallery, icon: ImageIcon },
    { id: "map" as NavTab, label: dict.nav.map, icon: Map },
    { id: "music" as NavTab, label: dict.nav.sound, icon: Music4 },
    { id: "saved" as NavTab, label: dict.nav.saved, icon: Bookmark },
  ];

  return (
    <div className="min-h-screen lg:flex bg-background text-foreground">
      {/* Desktop Sidebar */}
      <aside className="hidden lg:flex w-64 shrink-0 flex-col gap-6 border-r border-border/70 px-6 py-8 sticky top-0 h-screen overflow-y-auto">
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

        {/* Sidebar Footer with Ingestion Pipeline Utility Link */}
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
            <span className="truncate">{dict.nav.scraper}</span>
          </button>

          <p className="text-[10px] text-muted-foreground/80 leading-relaxed">
            {dict.common.archiveNote}
          </p>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex flex-1 flex-col pb-20 lg:pb-0 min-w-0">
        {/* Mobile Top Header */}
        <header className="flex lg:hidden items-center justify-between border-b border-border px-4 py-3 bg-background/95 backdrop-blur sticky top-0 z-30">
          <Brand appName={dict.common.appName} onClick={() => onTabChange("discover")} compact />
          
          <div className="flex items-center gap-2">
            {/* Mobile Language Switcher Mini */}
            <div className="flex bg-secondary rounded-lg p-0.5 border border-border">
              {(["km", "en", "vi", "th"] as const).map((l) => (
                <button
                  key={l}
                  onClick={() => setLocale(l)}
                  className={`px-1.5 py-0.5 text-[10px] font-bold rounded transition cursor-pointer ${
                    locale === l
                      ? "bg-primary text-primary-foreground shadow-xs"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  {l.toUpperCase()}
                </button>
              ))}
            </div>

            <button
              onClick={() => onTabChange("saved")}
              className="relative p-2 rounded-lg hover:bg-secondary transition text-muted-foreground hover:text-foreground"
              aria-label="Bookmarks"
            >
              <Bookmark className="size-4" />
              {savedSlugs.length > 0 && (
                <span className="absolute top-1 right-1 size-2 bg-primary rounded-full ring-2 ring-background" />
              )}
            </button>
          </div>
        </header>

        <main className="flex-1">{children}</main>
      </div>

      {/* Mobile Bottom Navigation Bar */}
      <nav className="fixed inset-x-0 bottom-0 z-40 flex lg:hidden items-center justify-around border-t border-border bg-background/95 py-2 px-1 backdrop-blur shadow-lg">
        {publicNavItems.slice(0, 5).map((item) => {
          const isActive = currentTab === item.id;
          return (
            <button
              key={item.id}
              onClick={() => onTabChange(item.id)}
              className={`flex flex-col items-center gap-1 px-2 py-1 text-[10px] transition cursor-pointer ${
                isActive ? "text-primary font-bold" : "text-muted-foreground hover:text-foreground"
              }`}
            >
              <item.icon className="size-4" strokeWidth={isActive ? 2.2 : 1.5} />
              <span className={`truncate max-w-[60px] ${locale === "km" ? "font-khmer" : ""}`}>
                {item.label}
              </span>
            </button>
          );
        })}
      </nav>
    </div>
  );
}

function Brand({
  appName,
  onClick,
  compact = false,
}: {
  appName: string;
  onClick: () => void;
  compact?: boolean;
}) {
  const { locale } = useLanguage();

  return (
    <button
      onClick={onClick}
      className="flex items-center gap-3 text-left transition-opacity hover:opacity-90 cursor-pointer"
    >
      <div className="flex size-9 shrink-0 items-center justify-center rounded-lg border border-primary/40 bg-primary/10 text-primary shadow-xs">
        <span className="font-display text-base font-bold">ក</span>
      </div>
      <div>
        <p className="text-[10px] uppercase tracking-[0.2em] text-primary font-bold">Khmer Heritage</p>
        <p
          className={`font-semibold text-foreground ${compact ? "text-sm" : "text-base"} ${
            locale === "km" ? "font-khmer leading-snug" : "font-display"
          }`}
        >
          {appName}
        </p>
      </div>
    </button>
  );
}
