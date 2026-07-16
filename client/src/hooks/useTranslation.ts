import { useLanguage } from "@/contexts/LanguageContext";
import { translations } from "@/data/translations";

export function useTranslation() {
  const { lang, isRTL, toggleLang, setLang } = useLanguage();
  // Urdu falls back to Arabic for general translations (Urdu-specific content is in page components)
  const tLang = (lang === "ur" ? "ar" : lang) as "ar" | "en";
  const t = translations[tLang];
  return { t, lang, isRTL, toggleLang, setLang };
}
