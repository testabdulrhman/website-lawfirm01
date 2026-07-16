import React, { createContext, useContext, useState, useEffect, useCallback } from "react";
import { useLocation } from "wouter";

export type Language = "ar" | "en" | "ur";

interface LanguageContextType {
  lang: Language;
  setLang: (lang: Language) => void;
  toggleLang: () => void;
  isRTL: boolean;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

interface LanguageProviderProps {
  children: React.ReactNode;
}

/**
 * Determines language from URL path:
 * - /en or /en/* → English
 * - /ur or /ur/* → Urdu
 * - Everything else → Arabic
 */
function getLangFromPath(pathname: string): Language {
  if (pathname === "/en" || pathname.startsWith("/en/")) return "en";
  if (pathname === "/ur" || pathname.startsWith("/ur/")) return "ur";
  return "ar";
}

export function LanguageProvider({ children }: LanguageProviderProps) {
  const [location, setLocation] = useLocation();
  const [lang, setLangState] = useState<Language>(() => getLangFromPath(location));

  // Sync lang when route changes
  useEffect(() => {
    const detected = getLangFromPath(location);
    if (detected !== lang) {
      setLangState(detected);
    }
  }, [location]);

  // Update document attributes when lang changes
  useEffect(() => {
    if (typeof document !== 'undefined') {
      document.documentElement.lang = lang;
      document.documentElement.dir = (lang === "ar" || lang === "ur") ? "rtl" : "ltr";
    }
  }, [lang]);

  const setLang = useCallback((newLang: Language) => {
    if (newLang === lang) return;
    // Get the base path (strip current prefix)
    let basePath = location;
    if (basePath.startsWith("/en/")) basePath = basePath.slice(3);
    else if (basePath === "/en") basePath = "/";
    else if (basePath.startsWith("/ur/")) basePath = basePath.slice(3);
    else if (basePath === "/ur") basePath = "/";

    // Build new path with target prefix
    if (newLang === "ar") {
      setLocation(basePath || "/");
    } else {
      const suffix = basePath === "/" ? "" : basePath;
      setLocation(`/${newLang}${suffix}`);
    }
    setLangState(newLang);
  }, [lang, location, setLocation]);

  const toggleLang = useCallback(() => {
    // Cycle: ar → en → ar (toggle between main two)
    setLang(lang === "ar" ? "en" : "ar");
  }, [lang, setLang]);

  const isRTL = lang === "ar" || lang === "ur";

  return (
    <LanguageContext.Provider value={{ lang, setLang, toggleLang, isRTL }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguage must be used within LanguageProvider");
  }
  return context;
}
