import type { Metadata } from "next";
import Link from "next/link";

type Props = {
  params: Promise<{ locale: string }>;
};

export const metadata: Metadata = {
  title: "IA pour institut de beauté à Genève | Réceptionniste IA | VOXO AI",
  description:
    "VOXO AI automatise les appels, rendez-vous et demandes clients des instituts de beauté à Genève grâce à une réceptionniste IA disponible 24h/24.",
  keywords: [
    "IA institut de beauté Genève",
    "réceptionniste IA institut beauté Genève",
    "assistant téléphonique institut Genève",
    "prise de rendez-vous automatique institut beauté",
    "agent vocal IA institut beauté",
    "standard téléphonique institut beauté",
    "automatisation institut de beauté Genève",
    "assistant IA salon beauté Genève",
    "réceptionniste virtuelle institut Genève",
    "IA esthétique Genève",
  ],
  alternates: {
    canonical: "https://voxo-ai.ch/fr/ia-institut-beaute-geneve",
  },
  openGraph: {
    title: "IA pour institut de beauté à Genève | VOXO AI",
    description:
      "Automatisez les appels, rendez-vous et demandes clients de votre institut de beauté avec VOXO AI.",
    url: "https://voxo-ai.ch/fr/ia-institut-beaute-geneve",
    siteName: "VOXO AI",
    locale: "fr_CH",
    type: "website",
  },
};

export default async function IAInstitutBeauteGeneve({ params }: Props) {
  const { locale } = await params;

  const services = [
    {
      title: "Répondre aux appels",
      description:
        "Votre réceptionniste IA répond aux clients lorsque vous êtes en soin, occupé ou indisponible.",
    },
    {
      title: "Informer sur les prestations",
      description:
        "L'IA peut renseigner vos clients sur les soins, prix, durées, horaires et informations importantes.",
    },
    {
      title: "Gérer les rendez-vous",
      description:
        "Votre assistant peut accompagner les clients dans leur demande de rendez-vous selon votre organisation.",
    },
    {
      title: "Envoyer des SMS",
      description:
        "Envoyez automatiquement des confirmations, informations ou rappels par SMS.",
    },
    {
      title: "Répondre en plusieurs langues",
      description:
        "VOXO AI peut prendre en charge des clients francophones et internationaux selon vos besoins.",
    },
    {
      title: "Transmettre les demandes particulières",
      description:
        "Les demandes qui nécessitent votre attention peuvent être enregistrées puis transmises à votre équipe.",
    },
  ];

  const situations = [
    "Vous êtes avec une cliente et ne pouvez pas décrocher",
    "Plusieurs appels arrivent en même temps",
    "Une cliente souhaite connaître le prix d'une prestation",
    "Une personne souhaite prendre ou modifier un rendez-vous",
    "Un client appelle en dehors des horaires d'ouverture",
    "Une demande particulière doit être transmise à votre équipe",
  ];

  return (
    <main className="min-h-screen bg-[#020817] text-white">
      {/* HERO */}
      <section className="mx-auto max-w-6xl px-6 py-24 md:py-32">
        <p className="mb-6 text-sm font-semibold uppercase tracking-[0.25em] text-blue-400">
          IA pour institut de beauté à Genève
        </p>

        <h1 className="max-w-5xl text-4xl font-bold leading-tight md:text-6xl">
          Votre institut prend soin de ses clientes.
          <br />
          VOXO AI prend soin de vos appels.
        </h1>

        <p className="mt-8 max-w-3xl text-lg leading-8 text-gray-300">
          VOXO AI aide les instituts de beauté, centres esthétiques et salons
          de Genève à automatiser leur accueil téléphonique. Votre
          réceptionniste IA peut répondre aux appels, renseigner les clients,
          traiter les demandes de rendez-vous et transmettre les informations
          importantes à votre équipe.
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
            Pendant un soin, vous ne pouvez pas toujours répondre au téléphone
          </h2>

          <p className="mt-6 max-w-3xl text-lg leading-8 text-gray-300">
            Dans un institut de beauté, l&apos;équipe doit rester concentrée
            sur les clientes présentes. Pourtant, les appels continuent :
            demandes de prix, horaires, prestations, rendez-vous ou
            informations spécifiques.
          </p>

          <p className="mt-5 max-w-3xl text-lg leading-8 text-gray-300">
            Chaque appel manqué peut représenter une nouvelle cliente, une
            réservation ou une demande importante. VOXO AI permet de prendre
            le relais lorsque vous ne pouvez pas décrocher.
          </p>
        </div>
      </section>

      {/* SERVICES */}
      <section className="border-t border-white/10">
        <div className="mx-auto max-w-6xl px-6 py-20">
          <h2 className="max-w-4xl text-3xl font-bold md:text-4xl">
            Une réceptionniste IA pensée pour les instituts de beauté
          </h2>

          <p className="mt-6 max-w-3xl text-lg leading-8 text-gray-300">
            Votre agent IA est configuré selon votre activité, vos prestations,
            vos horaires et votre manière de travailler.
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
            VOXO AI peut prendre le relais dans les situations du quotidien
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
            Automatisez une partie de la prise de rendez-vous
          </h2>

          <p className="mt-6 max-w-3xl text-lg leading-8 text-gray-300">
            Une cliente peut appeler pour demander une disponibilité, préciser
            la prestation souhaitée ou connaître les horaires disponibles.
            VOXO AI peut accompagner cette demande selon le fonctionnement de
            votre institut et les outils que vous utilisez déjà.
          </p>

          <p className="mt-5 max-w-3xl text-lg leading-8 text-gray-300">
            L&apos;objectif n&apos;est pas de bouleverser votre organisation,
            mais d&apos;ajouter une couche d&apos;automatisation autour de vos
            outils existants.
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
            Après un échange téléphonique, VOXO AI peut déclencher des actions
            automatiques selon votre configuration : confirmation par SMS,
            transmission d&apos;une demande ou enregistrement des informations
            nécessaires pour votre équipe.
          </p>

          <p className="mt-5 max-w-3xl text-lg leading-8 text-gray-300">
            Vous gagnez du temps tout en conservant une expérience client
            fluide et professionnelle.
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
            Genève accueille une clientèle internationale. Votre agent vocal
            IA peut être configuré pour répondre dans plusieurs langues afin
            de faciliter les échanges avec vos clients.
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

      {/* TYPES D'ENTREPRISES */}
      <section className="border-t border-white/10">
        <div className="mx-auto max-w-6xl px-6 py-20">
          <h2 className="text-3xl font-bold md:text-4xl">
            Une solution adaptée aux professionnels de la beauté
          </h2>

          <p className="mt-6 max-w-3xl text-lg leading-8 text-gray-300">
            VOXO AI peut être configuré pour différents métiers de la beauté
            et du bien-être à Genève.
          </p>

          <div className="mt-10 grid gap-4 sm:grid-cols-2 md:grid-cols-3">
            {[
              "Instituts de beauté",
              "Centres esthétiques",
              "Salons de coiffure",
              "Barbershops",
              "Centres de massage",
              "Professionnels du bien-être",
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
            Une solution IA pour les instituts de beauté à Genève
          </h2>

          <p className="mt-6 max-w-3xl text-lg leading-8 text-gray-300">
            VOXO AI accompagne les entreprises genevoises qui souhaitent
            améliorer leur disponibilité téléphonique sans demander à leur
            équipe d&apos;interrompre constamment leur travail.
          </p>

          <p className="mt-5 max-w-3xl text-lg leading-8 text-gray-300">
            La solution est personnalisée selon vos prestations, votre
            organisation, vos horaires et les demandes les plus fréquentes de
            votre clientèle.
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
            Découvrez votre réceptionniste IA pour institut de beauté
          </h2>

          <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-gray-300">
            Nous adaptons la démonstration aux besoins réels de votre
            établissement afin que vous puissiez voir comment VOXO AI
            fonctionnerait dans votre activité.
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