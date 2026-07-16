import type { Language } from "@/contexts/LanguageContext";

/**
 * Returns the effective key for bilingual content objects (ar/en only).
 * Urdu falls back to Arabic since most page content only has ar/en versions.
 */
export function langKey(lang: Language): "ar" | "en" {
  return lang === "en" ? "en" : "ar";
}
