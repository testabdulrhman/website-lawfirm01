import type { Language } from "@/contexts/LanguageContext";

/**
 * Returns the localized path for a given route.
 * - Arabic (default): returns path as-is (e.g., "/about")
 * - English: prepends /en (e.g., "/en/about")
 */
export function localePath(path: string, lang: Language): string {
  if (lang === "ar") return path;
  // For root path
  if (path === "/") return "/en";
  // Ensure no double /en prefix
  if (path.startsWith("/en")) return path;
  return `/en${path}`;
}

/**
 * Strips the /en prefix from a path to get the base route.
 */
export function stripLangPrefix(path: string): string {
  if (path === "/en") return "/";
  if (path.startsWith("/en/")) return path.slice(3);
  return path;
}
