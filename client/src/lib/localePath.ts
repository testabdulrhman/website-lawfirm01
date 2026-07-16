import type { Language } from "@/contexts/LanguageContext";

/**
 * Returns the localized path for a given route.
 * - Arabic (default): returns path as-is (e.g., "/about")
 * - English: prepends /en (e.g., "/en/about")
 * - Urdu: prepends /ur (e.g., "/ur/premium-residency")
 */
export function localePath(path: string, lang: Language): string {
  if (lang === "ar") return path;
  const prefix = lang === "en" ? "/en" : "/ur";
  // For root path
  if (path === "/") return prefix;
  // Ensure no double prefix
  if (path.startsWith("/en") || path.startsWith("/ur")) return path;
  return `${prefix}${path}`;
}

/**
 * Strips the /en or /ur prefix from a path to get the base route.
 */
export function stripLangPrefix(path: string): string {
  if (path === "/en" || path === "/ur") return "/";
  if (path.startsWith("/en/")) return path.slice(3);
  if (path.startsWith("/ur/")) return path.slice(3);
  return path;
}
