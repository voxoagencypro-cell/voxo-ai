import type { Metadata } from "next";
import Link from "next/link";

type Props = {
  params: Promise<{ locale: string }>;
};

export const metadata: Metadata = {
  title: "Réceptionniste IA Genève | Standard téléphonique IA | VOXO AI",
  description:
    "Réceptionniste IA à Genève pour entreprises. VOXO AI répond à vos appels 24h/24, renseigne vos clients, prend des rendez-vous et automatise votre accueil téléphonique.",
  alternates: {
    canonical: "https://voxo-ai.ch/fr/receptionniste-ia-geneve",
  },
  openGraph: {
    title: "Réceptionniste IA à Genève | VOXO AI",
    description:
      "Automatisez vos appels et rendez-vous avec une réceptionniste IA conçue pour les entreprises à Genève et en Suisse romande.",
    url: "https://voxo-ai.ch/fr/receptionniste-ia-geneve",
    siteName: "VOXO AI",
    locale: "fr_CH",
    type: "website",
  },
};

export default async function ReceptionnisteIAGeneve({ params }: Props) {
  const { locale } = await params;

  return (
    <main className="min-h-screen bg-[#020817] text-white">
      <section className="mx-auto max-w-6xl px-6 py-24 md:py-32">
        <p className="mb-6 text-sm font-semibold uppercase tracking-[0.25em] text-blue-400">
          Réceptionniste IA à Genève
        </p>

        <h1 className="max-w-5xl text-4xl font-bold leading-tight md:text-6xl">
          Votre réceptionniste IA à Genève répond pendant que vous travaillez.
        </h1>

        <p className="mt-8 max-w-3xl text-lg leading-8 text-gray-300">
          VOXO AI aide les entreprises genevoises à gérer leurs appels,
          demandes clients et rendez-vous. Votre assistant téléphonique IA
          peut répondre 24h/24, même lorsque votre équipe est occupée ou que
          votre entreprise est fermée.
        </p>

        <div className="mt-10">
          <Link
            href={`/${locale}/demo`}
            className="inline-flex rounded-full bg-blue-600 px-8 py-4 font-semibold text-white transition hover:bg-blue-500"
          >
            Demander une démo
          </Link>
        </div>
      </section>

      <section className="border-t border-white/10">
        <div className="mx-auto max-w-6xl px-6 py-20">
          <h2 className="text-3xl font-bold md:text-4xl">
            Une réception téléphonique IA pour les entreprises de Genève
          </h2>

          <p className="mt-6 max-w-3xl text-lg leading-8 text-gray-300">
            Restaurants, instituts de beauté, garages, agences immobilières,
            cabinets et autres entreprises peuvent utiliser VOXO AI pour
            réduire les appels manqués et améliorer leur disponibilité.
          </p>

          <div className="mt-12 grid gap-6 md:grid-cols-2">
            {[
              "Répondre automatiquement aux appels",
              "Informer les clients sur vos services et horaires",
              "Prendre et gérer des rendez-vous",
              "Répondre en plusieurs langues",
              "Envoyer des confirmations et informations",
              "Transmettre les demandes importantes à votre équipe",
            ].map((service) => (
              <div
                key={service}
                className="rounded-2xl border border-white/10 bg-white/[0.03] p-6"
              >
                <p className="font-medium">{service}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="border-t border-white/10">
        <div className="mx-auto max-w-6xl px-6 py-20">
          <h2 className="text-3xl font-bold">
            VOXO AI à Genève et en Suisse romande
          </h2>

          <p className="mt-6 max-w-3xl text-lg leading-8 text-gray-300">
            Notre solution s&apos;adresse aux entreprises de Genève et de Suisse
            romande qui souhaitent automatiser une partie de leur accueil
            téléphonique tout en restant disponibles pour leurs clients.
          </p>

          <Link
            href={`/${locale}/demo`}
            className="mt-10 inline-flex rounded-full bg-blue-600 px-8 py-4 font-semibold transition hover:bg-blue-500"
          >
            Tester VOXO AI
          </Link>
        </div>
      </section>
    </main>
  );
}

