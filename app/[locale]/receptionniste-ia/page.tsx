import type { Metadata } from "next";
import Link from "next/link";

type Props = {
  params: Promise<{ locale: string }>;
};

const content = {
  fr: {
    title: "Réceptionniste IA en Suisse | VOXO AI",
    description:
      "VOXO AI répond à vos appels, traite les demandes de vos clients et automatise vos rendez-vous. Une réceptionniste IA adaptée aux entreprises suisses.",
    badge: "RÉCEPTIONNISTE IA POUR LES ENTREPRISES SUISSES",
    hero: "Vos clients appellent. Vous êtes occupé. VOXO AI prend le relais.",
    intro:
      "Un appel arrive pendant que vous êtes avec un client. Une demande tombe après vos horaires. Votre équipe répond plusieurs fois par jour aux mêmes questions. VOXO AI prend en charge ce qui peut l’être, sans vous obliger à changer votre façon de travailler.",
    button: "Demander une démo",
    problemsTitle: "Le problème n’est pas le téléphone.",
    problemsText:
      "Le problème, ce sont toutes les interruptions, les demandes répétitives et les opportunités perdues lorsqu’aucune personne n’est disponible pour répondre.",
    understandTitle: "Nous commençons par comprendre votre entreprise.",
    understandText:
      "Avant d’automatiser quoi que ce soit, nous cherchons à comprendre votre fonctionnement : vos clients, vos horaires, vos équipes, vos outils et les tâches qui vous font perdre du temps.",
    servicesTitle: "Ce que VOXO AI peut prendre en charge",
    services: [
      "Répondre aux appels lorsque votre équipe est indisponible",
      "Informer sur vos services, horaires, tarifs et disponibilités",
      "Qualifier les demandes avant de les transmettre",
      "Gérer ou préparer les prises de rendez-vous",
      "Envoyer des confirmations et informations par SMS",
      "Traiter les demandes récurrentes de vos clients",
      "Communiquer dans plusieurs langues",
      "Transmettre les demandes importantes à la bonne personne",
    ],
    adaptTitle: "Vous ne vous adaptez pas à l’IA.",
    adaptStrong: "C’est l’IA qui doit s’adapter à votre entreprise.",
    adaptText:
      "Un restaurant ne fonctionne pas comme un institut de beauté. Un garage n’a pas les mêmes besoins qu’une agence immobilière. Nous construisons donc la solution autour de votre activité et de vos outils existants.",
    sectorsTitle: "Une solution pensée selon votre activité",
    sectors: [
      "Restaurants",
      "Instituts & salons",
      "Garages",
      "Immobilier",
      "Hôtellerie",
      "Services & PME",
    ],
    finalTitle: "Parlons de votre entreprise.",
    finalText:
      "Expliquez-nous où vous perdez du temps et comment vos clients vous contactent. Nous vous montrerons ce que VOXO AI peut réellement automatiser.",
  },

  de: {
    title: "KI-Rezeptionist Schweiz | VOXO AI",
    description:
      "VOXO AI beantwortet Anrufe, bearbeitet Kundenanfragen und automatisiert Termine für Schweizer Unternehmen.",
    badge: "KI-REZEPTIONIST FÜR SCHWEIZER UNTERNEHMEN",
    hero: "Ihre Kunden rufen an. Sie sind beschäftigt. VOXO AI übernimmt.",
    intro:
      "Anrufe, wiederkehrende Fragen und Terminwünsche unterbrechen täglich Ihre Arbeit. VOXO AI übernimmt geeignete Aufgaben und passt sich an Ihre bestehenden Abläufe an.",
    button: "Demo anfragen",
    problemsTitle: "Das Problem ist nicht das Telefon.",
    problemsText:
      "Das Problem sind Unterbrechungen, wiederkehrende Aufgaben und verpasste Chancen, wenn niemand antworten kann.",
    understandTitle: "Wir verstehen zuerst Ihr Unternehmen.",
    understandText:
      "Bevor wir automatisieren, analysieren wir Ihre Abläufe, Kunden, Arbeitszeiten, Teams und bestehenden Tools.",
    servicesTitle: "Was VOXO AI übernehmen kann",
    services: [
      "Anrufe beantworten",
      "Informationen zu Leistungen, Preisen und Öffnungszeiten geben",
      "Anfragen qualifizieren",
      "Termine verwalten",
      "SMS-Bestätigungen senden",
      "Wiederkehrende Kundenfragen beantworten",
      "Mehrsprachig kommunizieren",
      "Wichtige Anfragen weiterleiten",
    ],
    adaptTitle: "Sie passen sich nicht an die KI an.",
    adaptStrong: "Die KI muss sich an Ihr Unternehmen anpassen.",
    adaptText:
      "Jede Branche arbeitet anders. Deshalb bauen wir die Lösung rund um Ihre Abläufe und vorhandenen Tools.",
    sectorsTitle: "Eine Lösung für Ihre Branche",
    sectors: [
      "Restaurants",
      "Beauty & Salons",
      "Garagen",
      "Immobilien",
      "Hotels",
      "KMU & Dienstleistungen",
    ],
    finalTitle: "Sprechen wir über Ihr Unternehmen.",
    finalText:
      "Zeigen Sie uns, wo Sie Zeit verlieren. Wir zeigen Ihnen, was VOXO AI sinnvoll automatisieren kann.",
  },

  en: {
    title: "AI Receptionist Switzerland | VOXO AI",
    description:
      "VOXO AI answers calls, handles customer requests and automates appointments for Swiss businesses.",
    badge: "AI RECEPTIONIST FOR SWISS BUSINESSES",
    hero: "Your customers call. You’re busy. VOXO AI takes over.",
    intro:
      "Calls, repetitive questions and appointment requests interrupt your team every day. VOXO AI handles what can be automated while adapting to the way your business already works.",
    button: "Request a demo",
    problemsTitle: "The problem isn’t the phone.",
    problemsText:
      "The problem is the interruptions, repetitive tasks and missed opportunities when nobody is available to answer.",
    understandTitle: "We start by understanding your business.",
    understandText:
      "Before automating anything, we understand your customers, schedules, team, tools and the tasks that consume your time.",
    servicesTitle: "What VOXO AI can handle",
    services: [
      "Answer calls when your team is unavailable",
      "Provide services, opening hours and pricing information",
      "Qualify customer requests",
      "Manage appointments",
      "Send SMS confirmations",
      "Handle recurring customer questions",
      "Communicate in multiple languages",
      "Forward important requests to your team",
    ],
    adaptTitle: "You shouldn’t adapt to AI.",
    adaptStrong: "AI should adapt to your business.",
    adaptText:
      "A restaurant does not operate like a beauty salon, garage or real estate agency. We build the solution around your activity and existing tools.",
    sectorsTitle: "A solution built around your business",
    sectors: [
      "Restaurants",
      "Beauty & salons",
      "Garages",
      "Real estate",
      "Hotels",
      "SMEs & services",
    ],
    finalTitle: "Let’s talk about your business.",
    finalText:
      "Tell us where you lose time and how your customers contact you. We’ll show you what VOXO AI can realistically automate.",
  },
};

export async function generateMetadata({
  params,
}: Props): Promise<Metadata> {
  const { locale } = await params;
  const lang = locale === "de" ? "de" : locale === "en" ? "en" : "fr";
  const d = content[lang];

  return {
    title: d.title,
    description: d.description,
    alternates: {
      canonical: `https://www.voxo-ai.ch/${lang}/receptionniste-ia`,
      languages: {
        fr: "https://www.voxo-ai.ch/fr/receptionniste-ia",
        de: "https://www.voxo-ai.ch/de/receptionniste-ia",
        en: "https://www.voxo-ai.ch/en/receptionniste-ia",
        "x-default": "https://www.voxo-ai.ch/fr/receptionniste-ia",
      },
    },
  };
}

export default async function ReceptionnisteIA({ params }: Props) {
  const { locale } = await params;
  const lang = locale === "de" ? "de" : locale === "en" ? "en" : "fr";
  const d = content[lang];

  return (
    <main className="bg-[#050914] text-white">
      <section className="mx-auto max-w-7xl px-6 py-24">
        <div className="max-w-4xl">
          <p className="mb-6 text-sm font-bold tracking-[0.2em] text-blue-400">
            {d.badge}
          </p>

          <h1 className="text-4xl font-bold leading-tight md:text-6xl">
            {d.hero}
          </h1>

          <p className="mt-8 max-w-3xl text-lg leading-8 text-zinc-300">
            {d.intro}
          </p>

          <Link
            href={`/${lang}/demo`}
            className="mt-10 inline-block rounded-full bg-blue-600 px-8 py-4 font-bold hover:bg-blue-500"
          >
            {d.button}
          </Link>
        </div>
      </section>

      <section className="border-y border-white/10 bg-white/[0.02]">
        <div className="mx-auto max-w-7xl px-6 py-20">
          <h2 className="text-3xl font-bold md:text-4xl">
            {d.problemsTitle}
          </h2>

          <p className="mt-6 max-w-3xl text-lg leading-8 text-zinc-400">
            {d.problemsText}
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-20">
        <h2 className="text-3xl font-bold md:text-4xl">
          {d.understandTitle}
        </h2>

        <p className="mt-6 max-w-3xl text-lg leading-8 text-zinc-400">
          {d.understandText}
        </p>
      </section>

      <section className="mx-auto max-w-7xl px-6 pb-20">
        <h2 className="text-3xl font-bold md:text-4xl">
          {d.servicesTitle}
        </h2>

        <div className="mt-10 grid gap-4 md:grid-cols-2">
          {d.services.map((service) => (
            <div
              key={service}
              className="rounded-2xl border border-white/10 bg-white/[0.03] p-6 text-zinc-300"
            >
              <span className="mr-3 font-bold text-blue-400">✓</span>
              {service}
            </div>
          ))}
        </div>
      </section>

      <section className="border-y border-blue-500/20 bg-blue-500/[0.05]">
        <div className="mx-auto max-w-5xl px-6 py-20 text-center">
          <h2 className="text-3xl font-bold md:text-5xl">
            {d.adaptTitle}
          </h2>

          <p className="mt-4 text-2xl font-bold text-blue-400">
            {d.adaptStrong}
          </p>

          <p className="mx-auto mt-7 max-w-3xl text-lg leading-8 text-zinc-300">
            {d.adaptText}
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-20">
        <h2 className="text-3xl font-bold md:text-4xl">
          {d.sectorsTitle}
        </h2>

        <div className="mt-10 grid gap-4 sm:grid-cols-2 md:grid-cols-3">
          {d.sectors.map((sector) => (
            <div
              key={sector}
              className="rounded-2xl border border-white/10 p-6 text-center font-semibold"
            >
              {sector}
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-5xl px-6 pb-28 pt-10 text-center">
        <div className="rounded-3xl border border-blue-500/20 bg-blue-500/[0.06] p-10 md:p-14">
          <h2 className="text-3xl font-bold md:text-5xl">
            {d.finalTitle}
          </h2>

          <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-zinc-300">
            {d.finalText}
          </p>

          <Link
            href={`/${lang}/demo`}
            className="mt-9 inline-block rounded-full bg-blue-600 px-8 py-4 font-bold hover:bg-blue-500"
          >
            {d.button}
          </Link>
        </div>
      </section>
    </main>
  );
}