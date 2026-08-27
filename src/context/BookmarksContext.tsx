import { createContext, useContext, useState, type ReactNode } from "react";

interface BookmarksContextType {
  savedSlugs: string[];
  isBookmarked: (slug: string) => boolean;
  toggleBookmark: (slug: string) => void;
}

const BookmarksContext = createContext<BookmarksContextType | undefined>(undefined);

const BOOKMARKS_STORAGE_KEY = "khmer_heritage_saved_entries";

export function BookmarksProvider({ children }: { children: ReactNode }) {
  const [savedSlugs, setSavedSlugs] = useState<string[]>(() => {
    if (typeof window !== "undefined") {
      try {
        const saved = localStorage.getItem(BOOKMARKS_STORAGE_KEY);
        if (saved) return JSON.parse(saved);
      } catch {
        return [];
      }
    }
    return [];
  });

  const toggleBookmark = (slug: string) => {
    setSavedSlugs((prev) => {
      const next = prev.includes(slug)
        ? prev.filter((s) => s !== slug)
        : [...prev, slug];
      try {
        localStorage.setItem(BOOKMARKS_STORAGE_KEY, JSON.stringify(next));
      } catch {
        // Ignore storage errors
      }
      return next;
    });
  };

  const isBookmarked = (slug: string) => savedSlugs.includes(slug);

  return (
    <BookmarksContext.Provider value={{ savedSlugs, isBookmarked, toggleBookmark }}>
      {children}
    </BookmarksContext.Provider>
  );
}

export function useBookmarks() {
  const context = useContext(BookmarksContext);
  if (!context) {
    throw new Error("useBookmarks must be used within a BookmarksProvider");
  }
  return context;
}
