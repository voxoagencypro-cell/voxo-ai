import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { LocaleShell } from "@/components/locale-shell";
import { getDictionary, isLocale } from "@/lib/i18n";

export function generateStaticParams() {
  return [{ locale: "fr" }, { locale: "de" }, { locale: "en" }];
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;

  if (!isLocale(locale)) {
    return {};
  }

  const canonical = `https://www.voxo-ai.ch/${locale}`;

  return {
    alternates: {
      canonical,
      languages: {
        fr: "https://www.voxo-ai.ch/fr",
        de: "https://www.voxo-ai.ch/de",
        en: "https://www.voxo-ai.ch/en",
        "x-default": "https://www.voxo-ai.ch/fr",
      },
    },
  };
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  if (!isLocale(locale)) {
    notFound();
  }

  const d = getDictionary(locale);

  return (
    <LocaleShell locale={locale} nav={d.nav} footer={d.footer}>
      {children}
    </LocaleShell>
  );
}