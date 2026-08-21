import type { Language } from "@/contexts/LanguageContext";

/**
 * Returns the localized path for a given route.
 * - Arabic (default): returns path as-is (e.g., "/about")
 * - English: prepends /en (e.g., "/en/about")
 * - Urdu: prepends /ur (e.g., "/ur/premium-residency")
 */
export function localePath(path: string, lang: Language): string {
  if (lang === "ar") return path;

  // Ensure no double prefix
  if (path.startsWith("/en") || path.startsWith("/ur")) return path;

  if (lang === "ur") {
    // Urdu currently has two complete, indexable experiences only. Linking the
    // remaining navigation to Arabic prevents hundreds of internal 404s.
    const urduRoutes = ["/premium-residency", "/bankruptcy/creditor"];
    return urduRoutes.includes(path) ? `/ur${path}` : path;
  }

  // These pages do not yet have distinct English content. Keep their links on
  // the complete Arabic versions instead of generating thin/duplicate pages.
  const arabicOnlyExactRoutes = new Set([
    "/careers",
    "/cases-guide",
    "/legal-dictionary",
    // The booking flow is currently Arabic-only. Keeping English CTAs on the
    // complete Arabic route is preferable to generating /en/appointments,
    // which is not prerendered and therefore returns a real 404 on Netlify.
    "/appointments",
    "/appointments/success",
    // Monthly bankruptcy reports are currently published in Arabic only.
    // Keep translated navigation on the real Arabic archive instead of
    // producing the non-existent /en/bankruptcy/reports route.
    "/bankruptcy/reports",
  ]);
  const isArabicOnlyDetail =
    path.startsWith("/blog/") ||
    path.startsWith("/bankruptcy/reports/");

  if (arabicOnlyExactRoutes.has(path) || isArabicOnlyDetail) return path;

  return path === "/" ? "/en" : `/en${path}`;
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
