import { redirect } from "next/navigation";
import { isLocale } from "@/lib/i18n";

/** Tunnel legacy (Stripe non actif) — redirige vers la démo sans casser les signets. */
export default async function CheckoutPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!isLocale(locale)) {
    redirect("/fr/demo");
  }

  redirect(`/${locale}/demo`);
}
