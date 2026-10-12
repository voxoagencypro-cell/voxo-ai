import { locales, type Locale } from "@/lib/i18n";

const LOCALE_PREFIX = new RegExp(`^/(${locales.join("|")})(/|$)`);

/**
 * Autorise uniquement des chemins internes localisés (/fr/..., /de/..., /en/...).
 * Rejette les schémas absolus, //host, et les redirections ouvertes.
 */
export function getSafeNextPath(
  nextUrl: string | null | undefined,
  fallbackLocale: Locale,
): string {
  const fallback = `/${fallbackLocale}`;

  if (!nextUrl || typeof nextUrl !== "string") {
    return fallback;
  }

  const trimmed = nextUrl.trim();
  const pathOnly = trimmed.split("?")[0] ?? trimmed;

  if (!pathOnly.startsWith("/") || pathOnly.startsWith("//")) {
    return fallback;
  }

  if (pathOnly.includes("://") || pathOnly.includes("\\")) {
    return fallback;
  }

  if (!LOCALE_PREFIX.test(pathOnly)) {
    return fallback;
  }

  return trimmed;
}
