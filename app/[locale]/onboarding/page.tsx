import { redirect } from "next/navigation";
import { isLocale } from "@/lib/i18n";

/** Formulaire placeholder non relié à l'API — redirige vers la démo. */
export default async function OnboardingPage({
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
