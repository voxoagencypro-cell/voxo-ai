import type { Metadata } from "next";
import Link from "next/link";

type Props = {
  params: Promise<{ locale: string }>;
};

export const metadata: Metadata = {
  title: "Réceptionniste IA Genève | Standard téléphonique IA | VOXO AI",
  description:
    "Réceptionniste IA à Genève pour entreprises. VOXO AI répond à vos appels 24h/24, renseigne vos clients, prend des rendez-vous et automatise votre accueil téléphonique.",
  keywords: [
    "réceptionniste IA Genève",
    "standard téléphonique IA Genève",
    "assistant téléphonique IA Genève",
    "agent vocal IA Genève",
    "réceptionniste virtuelle Genève",
    "intelligence artificielle Genève",
    "automatisation appels Genève",
    "standard téléphonique automatique Genève",
    "réceptionniste IA Suisse",
    "réceptionniste IA Suisse romande",
  ],
  alternates: {
    canonical: "https://voxo-ai.ch/fr/receptionniste-ia-geneve",
  },
  openGraph: {
    title: "Réceptionniste IA à Genève | VOXO AI",
    description:
      "Automatisez vos appels et rendez-vous avec une réceptionniste IA conçue pour les entreprises de Genève et de Suisse romande.",
    url: "https://voxo-ai.ch/fr/receptionniste-ia-geneve",
    siteName: "VOXO AI",
    locale: "fr_CH",
    type: "website",
  },
};

export default async function ReceptionnisteIAGeneve({ params }: Props) {
  const { locale } = await params;

  const services = [
    "Répondre automatiquement aux appels 24h/24",
    "Informer vos clients sur vos services, prix et horaires",
    "Prendre et gérer des rendez-vous",
    "Répondre en plusieurs langues",
    "Envoyer des confirmations et informations par SMS",
    "Transmettre les demandes importantes à votre équipe",
  ];

  const secteurs = [
    "Restaurants",
    "Instituts de beauté",
    "Salons de coiffure",
    "Garages automobiles",
    "Agences immobilières",
    "Cabinets et entreprises de services",
  ];

  return (
    <main className="min-h-screen bg-[#020817] text-white">
      {/* HERO */}
      <section className="mx-auto max-w-6xl px-6 py-24 md:py-32">
        <p className="mb-6 text-sm font-semibold uppercase tracking-[0.25em] text-blue-400">
          Réceptionniste IA à Genève
        </p>

        <h1 className="max-w-5xl text-4xl font-bold leading-tight md:text-6xl">
          Votre réceptionniste IA à Genève répond pendant que vous travaillez.
        </h1>

        <p className="mt-8 max-w-3xl text-lg leading-8 text-gray-300">
          VOXO AI aide les entreprises genevoises à automatiser leur accueil
          téléphonique. Votre assistant téléphonique IA répond aux appels,
          renseigne vos clients et peut gérer les demandes et rendez-vous,
          même lorsque votre équipe n&apos;est pas disponible.
        </p>

        <div className="mt-10 flex flex-wrap gap-4">
          <Link
            href={`/${locale}/demo`}
            className="inline-flex rounded-full bg-blue-600 px-8 py-4 font-semibold text-white transition hover:bg-blue-500"
          >
            Demander une démo
          </Link>

          <Link
            href={`/${locale}/tarifs`}
            className="inline-flex rounded-full border border-white/20 px-8 py-4 font-semibold text-white transition hover:bg-white/10"
          >
            Voir les tarifs
          </Link>
        </div>
      </section>

      {/* SERVICES */}
      <section className="border-t border-white/10">
        <div className="mx-auto max-w-6xl px-6 py-20">
          <h2 className="max-w-4xl text-3xl font-bold md:text-4xl">
            Un standard téléphonique IA pour les entreprises de Genève
          </h2>

          <p className="mt-6 max-w-3xl text-lg leading-8 text-gray-300">
            Un appel manqué peut représenter un client ou une réservation
            perdue. VOXO AI prend le relais lorsque vous ne pouvez pas répondre
            et permet à vos clients d&apos;obtenir une réponse rapidement.
          </p>

          <div className="mt-12 grid gap-6 md:grid-cols-2">
            {services.map((service) => (
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

      {/* 24/7 */}
      <section className="border-t border-white/10">
        <div className="mx-auto max-w-6xl px-6 py-20">
          <h2 className="max-w-4xl text-3xl font-bold md:text-4xl">
            Une réceptionniste virtuelle disponible 24h/24
          </h2>

          <p className="mt-6 max-w-3xl text-lg leading-8 text-gray-300">
            Vos clients peuvent appeler lorsque vous êtes occupé, en
            rendez-vous ou lorsque votre entreprise est fermée. Votre agent
            vocal IA peut continuer à répondre aux demandes selon les
            informations et consignes définies par votre entreprise.
          </p>

          <p className="mt-5 max-w-3xl text-lg leading-8 text-gray-300">
            L&apos;objectif est simple : réduire les appels manqués, améliorer
            la disponibilité de votre entreprise et permettre à votre équipe
            de se concentrer sur son activité.
          </p>
        </div>
      </section>

      {/* SECTEURS */}
      <section className="border-t border-white/10">
        <div className="mx-auto max-w-6xl px-6 py-20">
          <h2 className="text-3xl font-bold md:text-4xl">
            Pour quelles entreprises à Genève ?
          </h2>

          <p className="mt-6 max-w-3xl text-lg leading-8 text-gray-300">
            VOXO AI peut être adapté aux entreprises qui reçoivent
            régulièrement des appels, des demandes d&apos;informations ou des
            demandes de rendez-vous.
          </p>

          <div className="mt-10 grid gap-4 sm:grid-cols-2 md:grid-cols-3">
            {secteurs.map((secteur) => (
              <div
                key={secteur}
                className="rounded-xl border border-white/10 bg-white/[0.03] p-5"
              >
                <p className="font-medium">{secteur}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SUISSE ROMANDE */}
      <section className="border-t border-white/10">
        <div className="mx-auto max-w-6xl px-6 py-20">
          <h2 className="text-3xl font-bold md:text-4xl">
            VOXO AI à Genève et en Suisse romande
          </h2>

          <p className="mt-6 max-w-3xl text-lg leading-8 text-gray-300">
            VOXO AI accompagne les entreprises de Genève et de Suisse romande
            qui souhaitent automatiser une partie de leur accueil
            téléphonique tout en restant disponibles pour leurs clients.
          </p>

          <p className="mt-5 max-w-3xl text-lg leading-8 text-gray-300">
            La solution peut être configurée selon votre activité, vos
            horaires, vos services et votre organisation afin de créer un
            assistant téléphonique adapté à votre entreprise.
          </p>
        </div>
      </section>

      {/* CTA */}
      <section className="border-t border-white/10">
        <div className="mx-auto max-w-6xl px-6 py-20 text-center">
          <h2 className="text-3xl font-bold md:text-5xl">
            Testez votre réceptionniste IA
          </h2>

          <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-gray-300">
            Découvrez comment VOXO AI peut prendre en charge les appels de
            votre entreprise et améliorer votre disponibilité.
          </p>

          <Link
            href={`/${locale}/demo`}
            className="mt-10 inline-flex rounded-full bg-blue-600 px-8 py-4 font-semibold text-white transition hover:bg-blue-500"
          >
            Demander une démo
          </Link>
        </div>
      </section>
    </main>
  );
}