import { createContext, useContext, useState, type ReactNode } from "react";
import type { LocalizedString } from "../data/types.ts";
import { translations, type Locale, type TranslationDict } from "../i18n/translations.ts";

interface LanguageContextType {
  locale: Locale;
  setLocale: (locale: Locale) => void;
  toggleLocale: () => void;
  /**
   * Get dictionary translation by dot notation e.g. t("nav.discover") or section/key
   */
  dict: TranslationDict;
  /**
   * Resolve any LocalizedString object { en: string, km: string } to the current active language string
   */
  tData: (localized?: LocalizedString, fallback?: string) => string;
  /**
   * Convert number/digits to Khmer numerals when in km locale, or standard digits when in en
   */
  tNum: (n: number | string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

const LOCALE_STORAGE_KEY = "khmer_heritage_locale";

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem(LOCALE_STORAGE_KEY) as Locale;
      if (saved === "km" || saved === "en") return saved;
    }
    return "en";
  });

  const setLocale = (newLocale: Locale) => {
    setLocaleState(newLocale);
    try {
      localStorage.setItem(LOCALE_STORAGE_KEY, newLocale);
      document.documentElement.lang = newLocale;
    } catch {
      // Ignore storage errors
    }
  };

  const toggleLocale = () => {
    setLocale(locale === "en" ? "km" : "en");
  };

  const dict = translations[locale];

  const tData = (localized?: LocalizedString, fallback: string = ""): string => {
    if (!localized) return fallback;
    if (locale === "km" && localized.km) return localized.km;
    if (localized.en) return localized.en;
    return localized.km || fallback;
  };

  const tNum = (n: number | string): string => {
    const str = String(n);
    if (locale !== "km") return str;
    const khmerDigits = ["០", "១", "២", "៣", "៤", "៥", "៦", "៧", "៨", "៩"];
    return str.replace(/[0-9]/g, (d) => khmerDigits[parseInt(d, 10)]);
  };

  return (
    <LanguageContext.Provider value={{ locale, setLocale, toggleLocale, dict, tData, tNum }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
}
