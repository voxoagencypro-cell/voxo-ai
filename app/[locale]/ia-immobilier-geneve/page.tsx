import type { Metadata } from "next";
import Link from "next/link";

type Props = {
  params: Promise<{ locale: string }>;
};

export const metadata: Metadata = {
  title: "IA pour immobilier à Genève | Réceptionniste IA | VOXO AI",
  description:
    "VOXO AI automatise les appels, demandes de biens et rendez-vous des agences immobilières à Genève grâce à une réceptionniste IA disponible 24h/24.",
  keywords: [
    "IA immobilier Genève",
    "réceptionniste IA immobilier Genève",
    "assistant téléphonique agence immobilière Genève",
    "agent vocal IA immobilier",
    "standard téléphonique immobilier Genève",
    "automatisation agence immobilière Genève",
    "assistant IA immobilier",
    "réceptionniste virtuelle immobilier Genève",
    "qualification prospects immobilier Genève",
    "prise rendez-vous immobilier IA",
  ],
  alternates: {
    canonical: "https://voxo-ai.ch/fr/ia-immobilier-geneve",
  },
  openGraph: {
    title: "IA pour immobilier à Genève | VOXO AI",
    description:
      "Automatisez les appels, demandes de biens, qualification des prospects et rendez-vous avec VOXO AI.",
    url: "https://voxo-ai.ch/fr/ia-immobilier-geneve",
    siteName: "VOXO AI",
    locale: "fr_CH",
    type: "website",
  },
};

export default async function IAImmobilierGeneve({ params }: Props) {
  const { locale } = await params;

  const services = [
    {
      title: "Répondre aux appels",
      description:
        "Votre réceptionniste IA répond aux prospects et clients lorsque vos collaborateurs sont en visite, en rendez-vous ou indisponibles.",
    },
    {
      title: "Qualifier les prospects",
      description:
        "L'IA peut recueillir le type de bien recherché, la localisation, le budget et les critères importants avant transmission à votre équipe.",
    },
    {
      title: "Informer sur les biens",
      description:
        "Votre assistant peut répondre aux questions courantes sur un bien, une annonce, une localisation ou une procédure.",
    },
    {
      title: "Organiser les rendez-vous",
      description:
        "VOXO AI peut accompagner les demandes de visite, rappel ou rendez-vous selon votre organisation.",
    },
    {
      title: "Transmettre les demandes",
      description:
        "Les demandes qualifiées peuvent être envoyées au courtier, à l'agence ou au collaborateur concerné.",
    },
    {
      title: "Répondre en plusieurs langues",
      description:
        "VOXO AI peut prendre en charge une clientèle locale et internationale selon vos besoins.",
    },
  ];

  const situations = [
    "Un prospect appelle pendant que vous êtes en visite",
    "Plusieurs demandes arrivent en même temps",
    "Une personne souhaite des informations sur une annonce",
    "Un acquéreur souhaite organiser une visite",
    "Un propriétaire souhaite être rappelé pour une estimation",
    "Une demande doit être transmise au bon courtier",
  ];

  return (
    <main className="min-h-screen bg-[#020817] text-white">
      {/* HERO */}
      <section className="mx-auto max-w-6xl px-6 py-24 md:py-32">
        <p className="mb-6 text-sm font-semibold uppercase tracking-[0.25em] text-blue-400">
          IA pour immobilier à Genève
        </p>

        <h1 className="max-w-5xl text-4xl font-bold leading-tight md:text-6xl">
          Vos courtiers sont sur le terrain.
          <br />
          VOXO AI reste disponible pour vos prospects.
        </h1>

        <p className="mt-8 max-w-3xl text-lg leading-8 text-gray-300">
          VOXO AI aide les agences immobilières, courtiers et régies à Genève à
          automatiser une partie de leur accueil téléphonique. Votre
          réceptionniste IA peut répondre aux appels, qualifier les demandes,
          recueillir les critères des prospects et transmettre les
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

      {/* PROBLEME */}
      <section className="border-t border-white/10">
        <div className="mx-auto max-w-6xl px-6 py-20">
          <h2 className="max-w-4xl text-3xl font-bold md:text-4xl">
            Un appel immobilier peut être un nouveau mandat ou un nouvel acheteur
          </h2>

          <p className="mt-6 max-w-3xl text-lg leading-8 text-gray-300">
            Dans l&apos;immobilier, les collaborateurs sont souvent en visite,
            en rendez-vous, sur le terrain ou déjà au téléphone. Les prospects,
            eux, souhaitent obtenir une réponse rapidement.
          </p>

          <p className="mt-5 max-w-3xl text-lg leading-8 text-gray-300">
            VOXO AI peut prendre le relais pour recueillir la demande et éviter
            qu&apos;un prospect qualifié ne parte vers une autre agence faute
            de réponse.
          </p>
        </div>
      </section>

      {/* SERVICES */}
      <section className="border-t border-white/10">
        <div className="mx-auto max-w-6xl px-6 py-20">
          <h2 className="max-w-4xl text-3xl font-bold md:text-4xl">
            Une réceptionniste IA adaptée aux professionnels de l&apos;immobilier
          </h2>

          <p className="mt-6 max-w-3xl text-lg leading-8 text-gray-300">
            Votre agent IA est configuré selon votre activité, vos procédures,
            vos biens et votre organisation commerciale.
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

      {/* SITUATIONS */}
      <section className="border-t border-white/10">
        <div className="mx-auto max-w-6xl px-6 py-20">
          <h2 className="max-w-4xl text-3xl font-bold md:text-4xl">
            VOXO AI peut qualifier les demandes avant de vous les transmettre
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

      {/* QUALIFICATION */}
      <section className="border-t border-white/10">
        <div className="mx-auto max-w-6xl px-6 py-20">
          <h2 className="max-w-4xl text-3xl font-bold md:text-4xl">
            Qualifiez vos prospects dès le premier appel
          </h2>

          <p className="mt-6 max-w-3xl text-lg leading-8 text-gray-300">
            Pour une recherche immobilière, VOXO AI peut recueillir les
            informations essentielles : appartement ou maison, achat ou
            location, secteur recherché, nombre de pièces, budget et autres
            critères importants.
          </p>

          <p className="mt-5 max-w-3xl text-lg leading-8 text-gray-300">
            Votre courtier reçoit ainsi une demande structurée et peut
            concentrer son temps sur les prospects réellement pertinents.
          </p>
        </div>
      </section>

      {/* VISITES */}
      <section className="border-t border-white/10">
        <div className="mx-auto max-w-6xl px-6 py-20">
          <h2 className="max-w-4xl text-3xl font-bold md:text-4xl">
            Demandes de visites, estimations et rappels
          </h2>

          <p className="mt-6 max-w-3xl text-lg leading-8 text-gray-300">
            Un prospect peut souhaiter visiter un bien, un propriétaire peut
            demander une estimation ou un client peut simplement vouloir être
            rappelé. VOXO AI peut recueillir ces demandes et les transmettre
            au collaborateur concerné.
          </p>
        </div>
      </section>

      {/* DISPONIBILITE */}
      <section className="border-t border-white/10">
        <div className="mx-auto max-w-6xl px-6 py-20">
          <h2 className="max-w-4xl text-3xl font-bold md:text-4xl">
            Restez joignable même lorsque votre équipe est sur le terrain
          </h2>

          <p className="mt-6 max-w-3xl text-lg leading-8 text-gray-300">
            Votre standard ne doit pas dépendre uniquement de la disponibilité
            immédiate d&apos;un collaborateur. VOXO AI peut assurer une première
            prise en charge et permettre à votre équipe de revenir vers le
            prospect avec les bonnes informations.
          </p>
        </div>
      </section>

      {/* MULTILINGUE */}
      <section className="border-t border-white/10">
        <div className="mx-auto max-w-6xl px-6 py-20">
          <h2 className="max-w-4xl text-3xl font-bold md:text-4xl">
            Un accueil multilingue pour le marché immobilier genevois
          </h2>

          <p className="mt-6 max-w-3xl text-lg leading-8 text-gray-300">
            Le marché immobilier genevois accueille une clientèle
            internationale. Votre agent vocal IA peut être configuré pour
            prendre en charge plusieurs langues.
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
            Une solution adaptée aux professionnels de l&apos;immobilier
          </h2>

          <div className="mt-10 grid gap-4 sm:grid-cols-2 md:grid-cols-3">
            {[
              "Agences immobilières",
              "Courtiers indépendants",
              "Régies immobilières",
              "Agences de location",
              "Immobilier haut de gamme",
              "Gestionnaires immobiliers",
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

      {/* GENEVE */}
      <section className="border-t border-white/10">
        <div className="mx-auto max-w-6xl px-6 py-20">
          <h2 className="max-w-4xl text-3xl font-bold md:text-4xl">
            Une solution IA pour l&apos;immobilier à Genève
          </h2>

          <p className="mt-6 max-w-3xl text-lg leading-8 text-gray-300">
            VOXO AI accompagne les professionnels genevois qui souhaitent
            améliorer leur disponibilité et structurer la prise en charge des
            appels entrants.
          </p>

          <p className="mt-5 max-w-3xl text-lg leading-8 text-gray-300">
            La solution peut être personnalisée selon votre activité, vos
            équipes, vos procédures et les informations que vous souhaitez
            recueillir auprès de vos prospects.
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
            Découvrez votre réceptionniste IA pour l&apos;immobilier
          </h2>

          <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-gray-300">
            Découvrez comment VOXO AI peut répondre à vos prospects, qualifier
            leurs demandes et transmettre les bonnes informations à votre
            équipe.
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