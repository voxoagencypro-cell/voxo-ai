import type { Metadata } from "next";
import Link from "next/link";

type Props = {
  params: Promise<{ locale: string }>;
};

export const metadata: Metadata = {
  title: "IA pour salon de coiffure à Genève | Réceptionniste IA | VOXO AI",
  description:
    "VOXO AI automatise les appels, rendez-vous et demandes clients des salons de coiffure à Genève grâce à une réceptionniste IA disponible 24h/24.",
  keywords: [
    "IA salon coiffure Genève",
    "réceptionniste IA salon coiffure Genève",
    "assistant téléphonique salon coiffure",
    "prise de rendez-vous automatique coiffure",
    "agent vocal IA coiffeur Genève",
    "standard téléphonique salon coiffure",
    "automatisation salon coiffure Genève",
    "assistant IA coiffeur Genève",
    "réceptionniste virtuelle salon coiffure",
    "IA coiffeur Genève",
  ],
  alternates: {
    canonical: "https://voxo-ai.ch/fr/ia-salon-coiffure-geneve",
  },
  openGraph: {
    title: "IA pour salon de coiffure à Genève | VOXO AI",
    description:
      "Automatisez les appels, rendez-vous et demandes clients de votre salon de coiffure avec VOXO AI.",
    url: "https://voxo-ai.ch/fr/ia-salon-coiffure-geneve",
    siteName: "VOXO AI",
    locale: "fr_CH",
    type: "website",
  },
};

export default async function IASalonCoiffureGeneve({ params }: Props) {
  const { locale } = await params;

  const services = [
    {
      title: "Répondre aux appels",
      description:
        "Votre réceptionniste IA répond lorsque vous êtes avec un client, occupé ou indisponible.",
    },
    {
      title: "Informer sur les prestations",
      description:
        "L'IA peut renseigner vos clients sur les coupes, colorations, soins, prix, durées et horaires.",
    },
    {
      title: "Gérer les demandes de rendez-vous",
      description:
        "Votre assistant peut accompagner les clients dans leur demande de réservation selon votre organisation.",
    },
    {
      title: "Envoyer des SMS",
      description:
        "Envoyez automatiquement des confirmations, informations ou rappels par SMS.",
    },
    {
      title: "Répondre en plusieurs langues",
      description:
        "VOXO AI peut prendre en charge une clientèle locale et internationale selon vos besoins.",
    },
    {
      title: "Transmettre les demandes importantes",
      description:
        "Les demandes spécifiques peuvent être enregistrées puis transmises à votre équipe.",
    },
  ];

  const situations = [
    "Vous êtes en pleine coupe et ne pouvez pas décrocher",
    "Plusieurs clients appellent au même moment",
    "Un client souhaite connaître le prix d'une coloration",
    "Une personne souhaite prendre ou déplacer un rendez-vous",
    "Un client appelle en dehors des horaires d'ouverture",
    "Une demande particulière doit être transmise au salon",
  ];

  return (
    <main className="min-h-screen bg-[#020817] text-white">
      {/* HERO */}
      <section className="mx-auto max-w-6xl px-6 py-24 md:py-32">
        <p className="mb-6 text-sm font-semibold uppercase tracking-[0.25em] text-blue-400">
          IA pour salon de coiffure à Genève
        </p>

        <h1 className="max-w-5xl text-4xl font-bold leading-tight md:text-6xl">
          Vous vous occupez de vos clients.
          <br />
          VOXO AI s&apos;occupe de vos appels.
        </h1>

        <p className="mt-8 max-w-3xl text-lg leading-8 text-gray-300">
          VOXO AI aide les salons de coiffure, barbershops et professionnels
          de la coiffure à Genève à automatiser leur accueil téléphonique.
          Votre réceptionniste IA peut répondre aux appels, renseigner les
          clients, traiter les demandes de rendez-vous et transmettre les
          informations importantes à votre équipe.
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
            className="inline-flex rounded-full border border-white/20 px-8 py-4 font-semibold text-white transition hover:bg-white/10"
          >
            Voir les tarifs
          </Link>
        </div>
      </section>

      {/* PROBLÈME */}
      <section className="border-t border-white/10">
        <div className="mx-auto max-w-6xl px-6 py-20">
          <h2 className="max-w-4xl text-3xl font-bold md:text-4xl">
            Un salon occupé ne peut pas toujours répondre au téléphone
          </h2>

          <p className="mt-6 max-w-3xl text-lg leading-8 text-gray-300">
            Lorsque vous êtes en coupe, en coloration ou avec un client, il est
            difficile d&apos;interrompre votre travail pour décrocher. Pourtant,
            les appels continuent : tarifs, disponibilités, rendez-vous,
            horaires ou demandes particulières.
          </p>

          <p className="mt-5 max-w-3xl text-lg leading-8 text-gray-300">
            VOXO AI prend le relais quand vous ne pouvez pas répondre et permet
            à vos clients d&apos;obtenir rapidement les informations dont ils ont
            besoin.
          </p>
        </div>
      </section>

      {/* SERVICES */}
      <section className="border-t border-white/10">
        <div className="mx-auto max-w-6xl px-6 py-20">
          <h2 className="max-w-4xl text-3xl font-bold md:text-4xl">
            Une réceptionniste IA adaptée aux salons de coiffure
          </h2>

          <p className="mt-6 max-w-3xl text-lg leading-8 text-gray-300">
            Votre agent IA est configuré selon vos prestations, vos horaires,
            vos prix et votre manière de travailler.
          </p>

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

      {/* EXEMPLES */}
      <section className="border-t border-white/10">
        <div className="mx-auto max-w-6xl px-6 py-20">
          <h2 className="max-w-4xl text-3xl font-bold md:text-4xl">
            VOXO AI peut prendre le relais pendant votre journée
          </h2>

          <div className="mt-10 grid gap-4 md:grid-cols-2">
            {situations.map((situation) => (
              <div
                key={situation}
                className="flex items-start gap-4 rounded-xl border border-white/10 bg-white/[0.03] p-5"
              >
                <span className="mt-1 text-blue-400">✓</span>
                <p className="text-gray-200">{situation}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* RENDEZ-VOUS */}
      <section className="border-t border-white/10">
        <div className="mx-auto max-w-6xl px-6 py-20">
          <h2 className="max-w-4xl text-3xl font-bold md:text-4xl">
            Facilitez la prise de rendez-vous
          </h2>

          <p className="mt-6 max-w-3xl text-lg leading-8 text-gray-300">
            Vos clients peuvent appeler pour demander une disponibilité,
            préciser la prestation souhaitée ou connaître les créneaux
            possibles. VOXO AI peut accompagner cette demande selon le
            fonctionnement de votre salon.
          </p>

          <p className="mt-5 max-w-3xl text-lg leading-8 text-gray-300">
            La solution s&apos;adapte à vos outils existants afin de vous faire
            gagner du temps sans bouleverser votre organisation.
          </p>
        </div>
      </section>

      {/* SMS */}
      <section className="border-t border-white/10">
        <div className="mx-auto max-w-6xl px-6 py-20">
          <h2 className="max-w-4xl text-3xl font-bold md:text-4xl">
            Appels, SMS et suivi client dans une même solution
          </h2>

          <p className="mt-6 max-w-3xl text-lg leading-8 text-gray-300">
            Après un appel, VOXO AI peut déclencher des actions automatiques :
            confirmation par SMS, transmission d&apos;une demande ou
            enregistrement des informations nécessaires pour votre équipe.
          </p>
        </div>
      </section>

      {/* MULTILINGUE */}
      <section className="border-t border-white/10">
        <div className="mx-auto max-w-6xl px-6 py-20">
          <h2 className="max-w-4xl text-3xl font-bold md:text-4xl">
            Un accueil multilingue pour votre clientèle à Genève
          </h2>

          <p className="mt-6 max-w-3xl text-lg leading-8 text-gray-300">
            Votre agent vocal IA peut être configuré pour répondre dans
            plusieurs langues afin de faciliter les échanges avec une
            clientèle locale et internationale.
          </p>

          <div className="mt-8 flex flex-wrap gap-3">
            {["Français", "Anglais", "Espagnol", "Italien", "Allemand"].map(
              (langue) => (
                <span
                  key={langue}
                  className="rounded-full border border-white/10 bg-white/[0.03] px-5 py-2.5 text-sm text-gray-200"
                >
                  {langue}
                </span>
              ),
            )}
          </div>
        </div>
      </section>

      {/* TYPES */}
      <section className="border-t border-white/10">
        <div className="mx-auto max-w-6xl px-6 py-20">
          <h2 className="text-3xl font-bold md:text-4xl">
            Une solution adaptée aux professionnels de la coiffure
          </h2>

          <div className="mt-10 grid gap-4 sm:grid-cols-2 md:grid-cols-3">
            {[
              "Salons de coiffure",
              "Barbershops",
              "Coiffeurs indépendants",
              "Salons premium",
              "Coloristes",
              "Professionnels capillaires",
            ].map((secteur) => (
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

      {/* GENÈVE */}
      <section className="border-t border-white/10">
        <div className="mx-auto max-w-6xl px-6 py-20">
          <h2 className="max-w-4xl text-3xl font-bold md:text-4xl">
            Une solution IA pour les salons de coiffure à Genève
          </h2>

          <p className="mt-6 max-w-3xl text-lg leading-8 text-gray-300">
            VOXO AI aide les salons genevois à rester joignables même lorsque
            toute l&apos;équipe est occupée avec des clients.
          </p>

          <p className="mt-5 max-w-3xl text-lg leading-8 text-gray-300">
            La solution est personnalisée selon vos prestations, vos horaires
            et les demandes les plus fréquentes de votre clientèle.
          </p>
        </div>
      </section>

      {/* CTA */}
      <section className="border-t border-white/10">
        <div className="mx-auto max-w-6xl px-6 py-20 text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-blue-400">
            VOXO AI
          </p>

          <h2 className="mx-auto mt-5 max-w-4xl text-3xl font-bold md:text-5xl">
            Découvrez votre réceptionniste IA pour salon de coiffure
          </h2>

          <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-gray-300">
            Découvrez comment VOXO AI peut gérer une partie de vos appels et
            vous permettre de rester concentré sur vos clients.
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