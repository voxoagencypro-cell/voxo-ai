"use client";

import { usePathname } from "next/navigation";
import { Footer } from "@/components/footer";
import { Navbar } from "@/components/navbar";
import type { Locale } from "@/lib/i18n";

const BARE_PATH_SUFFIXES = [
  "/portail",
  "/politique-confidentialite",
  "/mentions-legales",
];

export function LocaleShell({
  locale,
  nav,
  footer,
  children,
}: {
  locale: Locale;
  nav: Record<string, string>;
  footer: Record<string, unknown>;
  children: React.ReactNode;
}) {
  const pathname = usePathname() ?? "";

  const isBare = BARE_PATH_SUFFIXES.some((suffix) =>
    pathname.endsWith(suffix),
  );

  if (isBare) {
    return <>{children}</>;
  }

  return (
    <>
      <Navbar locale={locale} nav={nav} />
      {children}
      <Footer locale={locale} d={footer} />
    </>
  );
}
