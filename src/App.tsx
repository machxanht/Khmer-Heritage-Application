import { useState, useEffect } from "react";
import { AppShell, type NavTab } from "./components/AppShell.tsx";
import { DiscoverView } from "./components/DiscoverView.tsx";
import { CategoriesView } from "./components/CategoriesView.tsx";
import { GalleryView } from "./components/GalleryView.tsx";
import { EntryView } from "./components/EntryView.tsx";
import { MapView } from "./components/MapView.tsx";
import { SoundView } from "./components/SoundView.tsx";
import { SearchView } from "./components/SearchView.tsx";
import { BookmarksView } from "./components/BookmarksView.tsx";
import { ScraperView } from "./components/ScraperView.tsx";
import { LanguageProvider } from "./context/LanguageContext.tsx";
import { BookmarksProvider } from "./context/BookmarksContext.tsx";
import { HeritageDataProvider, useHeritageData } from "./context/HeritageDataContext.tsx";

function AppContent() {
  const [currentTab, setCurrentTab] = useState<NavTab>("discover");
  const [selectedSlug, setSelectedSlug] = useState<string | null>(null);
  const [selectedCategoryFilter, setSelectedCategoryFilter] = useState<string>("all");
  const [searchInitialQuery, setSearchInitialQuery] = useState<string>("");
  const { ingestEntry } = useHeritageData();

  // Handle URL hash / state transitions
  useEffect(() => {
    const handleHash = () => {
      const hash = window.location.hash.replace("#", "");
      if (hash.startsWith("entry/")) {
        const slug = hash.replace("entry/", "");
        setSelectedSlug(slug);
      } else if (hash.startsWith("category/")) {
        const cat = hash.replace("category/", "");
        setSelectedCategoryFilter(cat);
        setCurrentTab("categories");
        setSelectedSlug(null);
      } else if (hash === "categories") {
        setCurrentTab("categories");
        setSelectedSlug(null);
      } else if (hash === "gallery") {
        setCurrentTab("gallery");
        setSelectedSlug(null);
      } else if (hash === "map") {
        setCurrentTab("map");
        setSelectedSlug(null);
      } else if (hash === "music" || hash === "sound") {
        setCurrentTab("music");
        setSelectedSlug(null);
      } else if (hash.startsWith("search")) {
        setCurrentTab("search");
        setSelectedSlug(null);
      } else if (hash === "saved" || hash === "bookmarks") {
        setCurrentTab("saved");
        setSelectedSlug(null);
      } else if (hash === "scraper") {
        setCurrentTab("scraper");
        setSelectedSlug(null);
      } else {
        setCurrentTab("discover");
        setSelectedSlug(null);
      }
    };

    handleHash();
    window.addEventListener("hashchange", handleHash);
    return () => window.removeEventListener("hashchange", handleHash);
  }, []);

  const handleTabChange = (tab: NavTab) => {
    setCurrentTab(tab);
    setSelectedSlug(null);
    window.location.hash = tab === "discover" ? "" : tab;
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleSelectEntry = (slug: string) => {
    setSelectedSlug(slug);
    window.location.hash = `entry/${slug}`;
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleSelectCategoryFromHome = (categoryId: string) => {
    setSelectedCategoryFilter(categoryId);
    setCurrentTab("categories");
    setSelectedSlug(null);
    window.location.hash = `category/${categoryId}`;
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleBackToArchive = () => {
    setSelectedSlug(null);
    window.location.hash = currentTab === "discover" ? "" : currentTab;
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <AppShell currentTab={currentTab} onTabChange={handleTabChange}>
      {selectedSlug ? (
        <EntryView
          slug={selectedSlug}
          onBack={handleBackToArchive}
          onSelectEntry={handleSelectEntry}
          onGoToSound={() => handleTabChange("music")}
        />
      ) : currentTab === "discover" ? (
        <DiscoverView
          onSelectEntry={handleSelectEntry}
          onSelectCategory={handleSelectCategoryFromHome}
          onViewAllCategories={() => handleTabChange("categories")}
        />
      ) : currentTab === "categories" ? (
        <CategoriesView
          initialCategory={selectedCategoryFilter}
          onSelectEntry={handleSelectEntry}
        />
      ) : currentTab === "gallery" ? (
        <GalleryView onSelectEntry={handleSelectEntry} />
      ) : currentTab === "map" ? (
        <MapView onSelectEntry={handleSelectEntry} />
      ) : currentTab === "music" ? (
        <SoundView onSelectEntry={handleSelectEntry} />
      ) : currentTab === "saved" ? (
        <BookmarksView
          onSelectEntry={handleSelectEntry}
          onGoToDiscover={() => handleTabChange("discover")}
        />
      ) : currentTab === "scraper" ? (
        <ScraperView
          onIngestEntry={(entry) => {
            ingestEntry(entry);
          }}
          onViewEntry={handleSelectEntry}
        />
      ) : (
        <SearchView
          initialQuery={searchInitialQuery}
          onSelectEntry={handleSelectEntry}
        />
      )}
    </AppShell>
  );
}

export default function App() {
  return (
    <LanguageProvider>
      <HeritageDataProvider>
        <BookmarksProvider>
          <AppContent />
        </BookmarksProvider>
      </HeritageDataProvider>
    </LanguageProvider>
  );
}
