import type { Metadata } from "next";
import Link from "next/link";

type Props = {
  params: Promise<{ locale: string }>;
};

export const metadata: Metadata = {
  title: "IA pour garage automobile à Genève | VOXO AI",
  description:
    "VOXO AI automatise les appels et demandes clients des garages automobiles à Genève avec une réceptionniste IA disponible 24h/24.",
  keywords: [
    "IA garage Genève",
    "IA garage automobile Genève",
    "réceptionniste IA garage Genève",
    "assistant téléphonique garage Genève",
    "standard téléphonique garage automobile",
    "agent vocal IA garage",
    "automatisation garage Genève",
    "prise rendez-vous garage IA",
    "assistant IA automobile Genève",
  ],
  alternates: {
    canonical: "https://voxo-ai.ch/fr/ia-garage-automobile-geneve",
  },
  openGraph: {
    title: "IA pour garage automobile à Genève | VOXO AI",
    description:
      "Automatisez les appels et demandes clients de votre garage avec VOXO AI.",
    url: "https://voxo-ai.ch/fr/ia-garage-automobile-geneve",
    siteName: "VOXO AI",
    locale: "fr_CH",
    type: "website",
  },
};

export default async function IAGarageAutomobileGeneve({ params }: Props) {
  const { locale } = await params;

  const services = [
    {
      title: "Répondre aux appels",
      description:
        "VOXO AI prend le relais lorsque votre équipe est occupée avec un véhicule, un client ou une intervention.",
    },
    {
      title: "Identifier la demande",
      description:
        "Entretien, réparation, pneus, diagnostic ou autre demande : l'IA recueille les informations utiles avant transmission.",
    },
    {
      title: "Prendre des rendez-vous",
      description:
        "Votre réceptionniste IA peut accompagner les demandes de rendez-vous selon les disponibilités et l'organisation de votre garage.",
    },
    {
      title: "Recueillir les informations du véhicule",
      description:
        "L'IA peut demander la marque, le modèle, le motif de l'appel et les informations nécessaires à votre équipe.",
    },
    {
      title: "Transmettre les demandes spécifiques",
      description:
        "Lorsqu'une intervention nécessite l'avis d'un mécanicien ou d'un responsable, la demande peut être transmise au bon interlocuteur.",
    },
    {
      title: "Accueil multilingue",
      description:
        "VOXO AI peut accueillir vos clients dans plusieurs langues selon les besoins de votre garage.",
    },
  ];

  return (
    <main className="min-h-screen bg-[#020817] text-white">
      <section className="mx-auto max-w-6xl px-6 py-24 md:py-32">
        <p className="mb-6 text-sm font-semibold uppercase tracking-[0.25em] text-blue-400">
          IA pour garage automobile à Genève
        </p>

        <h1 className="max-w-5xl text-4xl font-bold leading-tight md:text-6xl">
          Vous vous occupez des véhicules.
          <br />
          VOXO AI s&apos;occupe de vos appels.
        </h1>

        <p className="mt-8 max-w-3xl text-lg leading-8 text-gray-300">
          VOXO AI aide les garages automobiles à Genève à automatiser une
          partie de leur accueil téléphonique. Votre réceptionniste IA peut
          répondre aux appels, identifier les besoins des clients, recueillir
          les informations importantes et transmettre les demandes à votre
          équipe.
        </p>

        <div className="mt-10 flex flex-wrap gap-4">
          <Link
            href={`/${locale}/demo`}
            className="inline-flex rounded-full bg-blue-600 px-8 py-4 font-semibold text-white transition hover:bg-blue-500"
          >
            Demander une démo
          </Link>

          <Link
            href={`/${locale}#tarifs`}
            className="inline-flex rounded-full border border-white/20 px-8 py-4 font-semibold transition hover:bg-white/10"
          >
            Voir les tarifs
          </Link>
        </div>
      </section>

      <section className="border-t border-white/10">
        <div className="mx-auto max-w-6xl px-6 py-20">
          <h2 className="max-w-4xl text-3xl font-bold md:text-4xl">
            Difficile de répondre au téléphone quand vous êtes dans l&apos;atelier
          </h2>

          <p className="mt-6 max-w-3xl text-lg leading-8 text-gray-300">
            Dans un garage, les mécaniciens et responsables sont souvent
            occupés avec les véhicules ou les clients présents sur place.
            Pourtant, les appels continuent d&apos;arriver.
          </p>

          <p className="mt-5 max-w-3xl text-lg leading-8 text-gray-300">
            VOXO AI peut prendre le relais afin que vos clients puissent
            expliquer leur demande même lorsque votre équipe ne peut pas
            décrocher immédiatement.
          </p>
        </div>
      </section>

      <section className="border-t border-white/10">
        <div className="mx-auto max-w-6xl px-6 py-20">
          <h2 className="text-3xl font-bold md:text-4xl">
            Une réceptionniste IA adaptée à votre garage
          </h2>

          <div className="mt-12 grid gap-6 md:grid-cols-2">
            {services.map((service) => (
              <div
                key={service.title}
                className="rounded-2xl border border-white/10 bg-white/[0.03] p-7"
              >
                <h3 className="text-xl font-semibold">{service.title}</h3>

                <p className="mt-3 leading-7 text-gray-300">
                  {service.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="border-t border-white/10">
        <div className="mx-auto max-w-6xl px-6 py-20">
          <h2 className="max-w-4xl text-3xl font-bold md:text-4xl">
            L&apos;IA recueille les informations avant de vous transmettre la demande
          </h2>

          <p className="mt-6 max-w-3xl text-lg leading-8 text-gray-300">
            Votre assistant peut demander le nom du client, son numéro de
            téléphone, la marque et le modèle du véhicule ainsi que la raison
            de son appel.
          </p>

          <p className="mt-5 max-w-3xl text-lg leading-8 text-gray-300">
            Votre équipe récupère ainsi une demande structurée au lieu d&apos;un
            simple appel manqué.
          </p>
        </div>
      </section>

      <section className="border-t border-white/10">
        <div className="mx-auto max-w-6xl px-6 py-20">
          <h2 className="text-3xl font-bold md:text-4xl">
            De nombreuses demandes peuvent être prises en charge
          </h2>

          <div className="mt-10 grid gap-4 md:grid-cols-2">
            {[
              "Demande d'entretien ou de service",
              "Changement de pneus",
              "Demande de diagnostic",
              "Problème mécanique",
              "Demande de rendez-vous",
              "Question sur les horaires",
              "Adresse et accès au garage",
              "Demande de rappel",
              "Informations concernant un véhicule",
              "Transmission d'une demande spécifique",
            ].map((item) => (
              <div
                key={item}
                className="flex gap-4 rounded-xl border border-white/10 bg-white/[0.03] p-5"
              >
                <span className="text-blue-400">✓</span>
                <p className="text-gray-200">{item}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="border-t border-white/10">
        <div className="mx-auto max-w-6xl px-6 py-20">
          <h2 className="max-w-4xl text-3xl font-bold md:text-4xl">
            Vos demandes clients restent organisées
          </h2>

          <p className="mt-6 max-w-3xl text-lg leading-8 text-gray-300">
            VOXO AI peut aider votre garage à centraliser les informations
            importantes reçues par téléphone et à transmettre les demandes au
            service ou au collaborateur concerné.
          </p>
        </div>
      </section>

      <section className="border-t border-white/10">
        <div className="mx-auto max-w-6xl px-6 py-20">
          <h2 className="max-w-4xl text-3xl font-bold md:text-4xl">
            Un accueil multilingue pour vos clients
          </h2>

          <p className="mt-6 max-w-3xl text-lg leading-8 text-gray-300">
            Votre réceptionniste IA peut être configurée pour accueillir une
            clientèle internationale et répondre dans plusieurs langues.
          </p>

          <div className="mt-8 flex flex-wrap gap-3">
            {["Français", "Anglais", "Espagnol", "Italien", "Allemand"].map(
              (langue) => (
                <span
                  key={langue}
                  className="rounded-full border border-white/10 bg-white/[0.03] px-5 py-2.5 text-sm"
                >
                  {langue}
                </span>
              )
            )}
          </div>
        </div>
      </section>

      <section className="border-t border-white/10">
        <div className="mx-auto max-w-6xl px-6 py-20">
          <h2 className="text-3xl font-bold md:text-4xl">
            Pour les professionnels automobiles à Genève
          </h2>

          <div className="mt-10 grid gap-4 sm:grid-cols-2 md:grid-cols-3">
            {[
              "Garages automobiles",
              "Ateliers mécaniques",
              "Carrosseries",
              "Centres automobiles",
              "Spécialistes pneumatiques",
              "Professionnels de l'automobile",
            ].map((secteur) => (
              <div
                key={secteur}
                className="rounded-xl border border-white/10 bg-white/[0.03] p-5"
              >
                {secteur}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="border-t border-white/10">
        <div className="mx-auto max-w-6xl px-6 py-20 text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-blue-400">
            VOXO AI
          </p>

          <h2 className="mx-auto mt-5 max-w-4xl text-3xl font-bold md:text-5xl">
            Découvrez votre réceptionniste IA pour garage automobile
          </h2>

          <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-gray-300">
            Découvrez comment VOXO AI peut prendre en charge une partie de vos
            appels pendant que votre équipe reste concentrée sur l&apos;atelier et
            vos clients.
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