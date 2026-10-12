import { notFound } from "next/navigation";
import {
  buildSectorMetadata,
  SectorLandingPage,
} from "@/components/sector-landing-page";
import { nationalReceptionistLanding } from "@/lib/sector-landings";
import { isLocale, type Locale } from "@/lib/i18n";

const localeCanonical: Record<Locale, string> = {
  fr: "/fr/receptionniste-ia",
  de: "/de/receptionniste-ia",
  en: "/en/receptionniste-ia",
};

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const config = {
    ...nationalReceptionistLanding,
    canonicalPath: isLocale(locale)
      ? localeCanonical[locale]
      : nationalReceptionistLanding.canonicalPath,
  };
  return buildSectorMetadata(config);
}

export default async function Page({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();

  const config = {
    ...nationalReceptionistLanding,
    canonicalPath: localeCanonical[locale],
  };

  return <SectorLandingPage locale={locale} config={config} />;
}
