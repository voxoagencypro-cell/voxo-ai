import { notFound } from "next/navigation";
import {
  buildSectorMetadata,
  SectorLandingPage,
} from "@/components/sector-landing-page";
import { sectorLandings } from "@/lib/sector-landings";
import { isLocale } from "@/lib/i18n";

const config = sectorLandings["ia-salon-coiffure-geneve"];

export const metadata = buildSectorMetadata(config);

export default async function Page({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();

  return <SectorLandingPage locale={locale} config={config} />;
}
