import React, { createContext, useContext, useState, useEffect, useCallback } from "react";
import { useLocation } from "wouter";

export type Language = "ar" | "en";

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
 * - Everything else → Arabic
 */
function getLangFromPath(pathname: string): Language {
  return pathname === "/en" || pathname.startsWith("/en/") ? "en" : "ar";
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
      document.documentElement.dir = lang === "ar" ? "rtl" : "ltr";
    }
  }, [lang]);

  const setLang = useCallback((newLang: Language) => {
    if (newLang === lang) return;
    // Navigate to the equivalent route in the other language
    const currentPath = location;
    if (newLang === "en") {
      // Switch from Arabic to English: prepend /en
      const arPath = currentPath === "/" ? "" : currentPath;
      setLocation(`/en${arPath}`);
    } else {
      // Switch from English to Arabic: remove /en prefix
      const enPath = currentPath.replace(/^\/en/, "") || "/";
      setLocation(enPath);
    }
    setLangState(newLang);
  }, [lang, setLocation]);

  const toggleLang = useCallback(() => {
    setLang(lang === "ar" ? "en" : "ar");
  }, [lang, setLang]);

  const isRTL = lang === "ar";

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
