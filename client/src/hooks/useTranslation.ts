import { useLanguage } from "@/contexts/LanguageContext";
import { translations } from "@/data/translations";

export function useTranslation() {
  const { lang, isRTL, toggleLang, setLang } = useLanguage();
  const t = translations[lang];
  return { t, lang, isRTL, toggleLang, setLang };
}
