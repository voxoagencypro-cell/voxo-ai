import type { Metadata } from "next";
import { Suspense } from "react";
import { notFound } from "next/navigation";
import { ProspectGateForm } from "@/components/prospect-gate-form";
import { isLocale } from "@/lib/i18n";

export const metadata: Metadata = {
  title: "Parlons de votre entreprise",
};

export default async function PortailPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  if (!isLocale(locale)) {
    notFound();
  }

  return (
    <Suspense
      fallback={
        <main className="grid min-h-screen place-items-center bg-[#02050b] text-zinc-400">
          Chargement…
        </main>
      }
    >
      <ProspectGateForm locale={locale} />
    </Suspense>
  );
}
