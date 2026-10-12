import { notFound } from "next/navigation";
import { MarketingHomePage } from "@/components/marketing-home-page";
import { isLocale } from "@/lib/i18n";

export default async function Page({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  if (!isLocale(locale)) {
    notFound();
  }

  return <MarketingHomePage locale={locale} />;
}
