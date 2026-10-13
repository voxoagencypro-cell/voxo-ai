"use client";

import { usePathname } from "next/navigation";
import { Footer } from "@/components/footer";
import { Navbar } from "@/components/navbar";
import { AmbientBackground } from "@/components/voxo/ambient-background";
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
      <AmbientBackground />
      <Navbar locale={locale} nav={nav} />
      <div className="relative">{children}</div>
      <Footer locale={locale} d={footer} />
    </>
  );
}
