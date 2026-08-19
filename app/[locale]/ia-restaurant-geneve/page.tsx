import type { Metadata } from "next";
import Link from "next/link";

type Props = {
  params: Promise<{ locale: string }>;
};

export const metadata: Metadata = {
  title: "IA pour restaurant à Genève | Réservations & appels | VOXO AI",
  description:
    "VOXO AI automatise les appels, réservations et demandes clients des restaurants à Genève grâce à une réceptionniste IA disponible 24h/24.",
  keywords: [
    "IA restaurant Genève",
    "réceptionniste IA restaurant Genève",
    "assistant téléphonique restaurant Genève",
    "réservation restaurant IA Genève",
    "agent vocal IA restaurant",
    "standard téléphonique restaurant Genève",
    "automatisation restaurant Genève",
    "prise de réservation automatique restaurant",
    "assistant IA restaurant",
    "réceptionniste virtuelle restaurant Genève",
  ],
  alternates: {
    canonical: "https://voxo-ai.ch/fr/ia-restaurant-geneve",
  },
  openGraph: {
    title: "IA pour restaurant à Genève | VOXO AI",
    description:
      "Automatisez les appels, réservations et demandes clients de votre restaurant avec VOXO AI.",
    url: "https://voxo-ai.ch/fr/ia-restaurant-geneve",
    siteName: "VOXO AI",
    locale: "fr_CH",
    type: "website",
  },
};

export default async function IARestaurantGeneve({ params }: Props) {
  const { locale } = await params;

  const services = [
    {
      title: "Répondre aux appels",
      description:
        "Votre réceptionniste IA répond lorsque votre équipe est en plein service ou indisponible.",
    },
    {
      title: "Prendre des réservations",
      description:
        "L'IA peut traiter les demandes de réservation selon vos horaires et votre organisation.",
    },
    {
      title: "Informer sur le restaurant",
      description:
        "Elle peut répondre aux questions sur les horaires, l'adresse, la carte, les menus et les informations pratiques.",
    },
    {
      title: "Gérer les demandes spécifiques",
      description:
        "Les allergies, demandes particulières ou informations importantes peuvent être enregistrées et transmises.",
    },
    {
      title: "Envoyer des SMS",
      description:
        "Envoyez automatiquement une confirmation avec l'adresse, l'heure ou les informations utiles.",
    },
    {
      title: "Répondre en plusieurs langues",
      description:
        "VOXO AI peut accueillir une clientèle locale et internationale selon vos besoins.",
    },
  ];

  const situations = [
    "Le téléphone sonne pendant le coup de feu",
    "Votre équipe est déjà occupée avec les clients présents",
    "Un client souhaite réserver pour un autre jour",
    "Une personne demande les horaires de la cuisine",
    "Un client souhaite connaître les plats ou signaler une allergie",
    "Une demande particulière doit être transmise à votre équipe",
  ];

  return (
    <main className="min-h-screen bg-[#020817] text-white">
      {/* HERO */}
      <section className="mx-auto max-w-6xl px-6 py-24 md:py-32">
        <p className="mb-6 text-sm font-semibold uppercase tracking-[0.25em] text-blue-400">
          IA pour restaurant à Genève
        </p>

        <h1 className="max-w-5xl text-4xl font-bold leading-tight md:text-6xl">
          Votre équipe s&apos;occupe de la salle.
          <br />
          VOXO AI s&apos;occupe des appels.
        </h1>

        <p className="mt-8 max-w-3xl text-lg leading-8 text-gray-300">
          VOXO AI aide les restaurants de Genève à automatiser leur accueil
          téléphonique. Votre réceptionniste IA peut répondre aux appels,
          traiter les demandes de réservation, renseigner les clients et
          transmettre les informations importantes à votre équipe.
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
            Pendant le service, répondre au téléphone n&apos;est pas toujours possible
          </h2>

          <p className="mt-6 max-w-3xl text-lg leading-8 text-gray-300">
            Quand la salle est pleine, votre priorité reste les clients
            présents. Pourtant, les appels continuent : réservations, horaires,
            menu, adresse, allergies ou demandes particulières.
          </p>

          <p className="mt-5 max-w-3xl text-lg leading-8 text-gray-300">
            VOXO AI prend le relais lorsque votre équipe ne peut pas décrocher,
            afin de limiter les appels manqués et les réservations perdues.
          </p>
        </div>
      </section>

      {/* SERVICES */}
      <section className="border-t border-white/10">
        <div className="mx-auto max-w-6xl px-6 py-20">
          <h2 className="max-w-4xl text-3xl font-bold md:text-4xl">
            Une réceptionniste IA adaptée aux restaurants
          </h2>

          <p className="mt-6 max-w-3xl text-lg leading-8 text-gray-300">
            Votre agent IA est configuré selon vos horaires, vos réservations,
            vos informations pratiques et les demandes les plus fréquentes de
            votre clientèle.
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
            VOXO AI peut prendre le relais pendant le service
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

      {/* RESERVATIONS */}
      <section className="border-t border-white/10">
        <div className="mx-auto max-w-6xl px-6 py-20">
          <h2 className="max-w-4xl text-3xl font-bold md:text-4xl">
            Automatisez une partie de vos réservations
          </h2>

          <p className="mt-6 max-w-3xl text-lg leading-8 text-gray-300">
            Un client peut appeler pour réserver une table à l&apos;avance,
            préciser le nombre de personnes, le jour souhaité ou l&apos;heure.
            VOXO AI peut accompagner cette demande selon votre système de
            réservation et votre organisation.
          </p>

          <p className="mt-5 max-w-3xl text-lg leading-8 text-gray-300">
            Votre équipe reste concentrée sur le service pendant que les
            demandes téléphoniques continuent d&apos;être prises en charge.
          </p>
        </div>
      </section>

      {/* MENU */}
      <section className="border-t border-white/10">
        <div className="mx-auto max-w-6xl px-6 py-20">
          <h2 className="max-w-4xl text-3xl font-bold md:text-4xl">
            Horaires, carte, adresse et allergies
          </h2>

          <p className="mt-6 max-w-3xl text-lg leading-8 text-gray-300">
            Votre réceptionniste IA peut répondre aux questions courantes :
            horaires d&apos;ouverture, horaires de la cuisine, adresse,
            informations sur la carte ou certaines demandes concernant les
            allergies.
          </p>

          <p className="mt-5 max-w-3xl text-lg leading-8 text-gray-300">
            Pour les demandes qui nécessitent une confirmation humaine,
            l&apos;information peut être transmise à l&apos;équipe concernée.
          </p>
        </div>
      </section>

      {/* SMS */}
      <section className="border-t border-white/10">
        <div className="mx-auto max-w-6xl px-6 py-20">
          <h2 className="max-w-4xl text-3xl font-bold md:text-4xl">
            Confirmez les informations par SMS
          </h2>

          <p className="mt-6 max-w-3xl text-lg leading-8 text-gray-300">
            Après une réservation ou une demande, VOXO AI peut envoyer un SMS
            de confirmation avec les informations utiles comme l&apos;adresse,
            l&apos;heure ou les détails convenus avec le client.
          </p>
        </div>
      </section>

      {/* MULTILINGUE */}
      <section className="border-t border-white/10">
        <div className="mx-auto max-w-6xl px-6 py-20">
          <h2 className="max-w-4xl text-3xl font-bold md:text-4xl">
            Un accueil multilingue pour les restaurants genevois
          </h2>

          <p className="mt-6 max-w-3xl text-lg leading-8 text-gray-300">
            Genève accueille une clientèle internationale. Votre agent vocal
            IA peut être configuré pour répondre dans plusieurs langues.
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
            Une solution adaptée aux professionnels de la restauration
          </h2>

          <div className="mt-10 grid gap-4 sm:grid-cols-2 md:grid-cols-3">
            {[
              "Restaurants",
              "Brasseries",
              "Pizzerias",
              "Restaurants gastronomiques",
              "Restaurants d'hôtel",
              "Établissements indépendants",
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
            Une solution IA pour les restaurants à Genève
          </h2>

          <p className="mt-6 max-w-3xl text-lg leading-8 text-gray-300">
            VOXO AI aide les établissements genevois à rester joignables même
            lorsque toute l&apos;équipe est mobilisée par le service.
          </p>

          <p className="mt-5 max-w-3xl text-lg leading-8 text-gray-300">
            La solution est adaptée à votre établissement, vos horaires, votre
            organisation et les demandes récurrentes de vos clients.
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
            Découvrez votre réceptionniste IA pour restaurant
          </h2>

          <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-gray-300">
            Découvrez comment VOXO AI peut prendre en charge vos appels et vos
            demandes de réservation pendant que votre équipe s&apos;occupe de
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