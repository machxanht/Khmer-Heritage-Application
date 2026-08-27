import React, { createContext, useContext, useState } from "react";
import { EntryDetail } from "../data/types.ts";
import { entries as defaultEntries } from "../data/heritage.ts";

interface HeritageDataContextType {
  entries: EntryDetail[];
  ingestEntry: (newEntry: EntryDetail) => void;
  ingestMultipleEntries: (newEntries: EntryDetail[]) => void;
  getEntryBySlug: (slug: string) => EntryDetail | undefined;
  getEntryById: (id: string) => EntryDetail | undefined;
  totalEntriesCount: number;
  resetToDefault: () => void;
}

const HeritageDataContext = createContext<HeritageDataContextType | undefined>(undefined);

const STORAGE_KEY = "khmer_heritage_scraped_entries_v1";

export function HeritageDataProvider({ children }: { children: React.ReactNode }) {
  const [entries, setEntries] = useState<EntryDetail[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        // Combine default entries with saved scraped entries, ensuring no duplicates by slug
        const customEntries = parsed.filter(
          (p: EntryDetail) => !defaultEntries.some((d) => d.slug === p.slug)
        );
        return [...defaultEntries, ...customEntries];
      }
    } catch (e) {
      console.warn("Failed to load scraped entries from localStorage:", e);
    }
    return defaultEntries;
  });

  const ingestEntry = (newEntry: EntryDetail) => {
    setEntries((prev) => {
      const existingIndex = prev.findIndex((e) => e.slug === newEntry.slug);
      let updated: EntryDetail[];
      if (existingIndex >= 0) {
        updated = [...prev];
        updated[existingIndex] = newEntry;
      } else {
        updated = [newEntry, ...prev];
      }

      try {
        const customToSave = updated.filter(
          (item) => !defaultEntries.some((d) => d.slug === item.slug && d.id === item.id)
        );
        localStorage.setItem(STORAGE_KEY, JSON.stringify(customToSave));
      } catch (err) {
        console.warn("Failed to persist scraped entries:", err);
      }

      return updated;
    });
  };

  const ingestMultipleEntries = (newEntries: EntryDetail[]) => {
    setEntries((prev) => {
      let updated = [...prev];
      newEntries.forEach((item) => {
        const idx = updated.findIndex((e) => e.slug === item.slug);
        if (idx >= 0) {
          updated[idx] = item;
        } else {
          updated = [item, ...updated];
        }
      });

      try {
        const customToSave = updated.filter(
          (item) => !defaultEntries.some((d) => d.slug === item.slug && d.id === item.id)
        );
        localStorage.setItem(STORAGE_KEY, JSON.stringify(customToSave));
      } catch (err) {
        console.warn("Failed to persist batch scraped entries:", err);
      }

      return updated;
    });
  };

  const resetToDefault = () => {
    localStorage.removeItem(STORAGE_KEY);
    setEntries(defaultEntries);
  };

  const getEntryBySlug = (slug: string) => {
    return entries.find((e) => e.slug === slug);
  };

  const getEntryById = (id: string) => {
    return entries.find((e) => e.id === id);
  };

  return (
    <HeritageDataContext.Provider
      value={{
        entries,
        ingestEntry,
        ingestMultipleEntries,
        getEntryBySlug,
        getEntryById,
        totalEntriesCount: entries.length,
        resetToDefault,
      }}
    >
      {children}
    </HeritageDataContext.Provider>
  );
}

export function useHeritageData() {
  const context = useContext(HeritageDataContext);
  if (!context) {
    throw new Error("useHeritageData must be used within a HeritageDataProvider");
  }
  return context;
}
