import type { Metadata } from "next";
import Link from "next/link";
import type { SectorLandingConfig } from "@/lib/sector-landings";

const pillars = [
  {
    title: "Acquisition & publicité",
    text: "Campagnes et pages orientées résultats, reliées à la qualification.",
    href: "acquisition-publicite",
  },
  {
    title: "Messagerie",
    text: "Réponses rapides sur vos canaux (WhatsApp, Instagram, e-mail, SMS).",
    href: "agents-ia",
  },
  {
    title: "Appels",
    text: "Agents vocaux pour accueillir, informer et structurer la demande.",
    href: "agents-ia",
  },
  {
    title: "Rendez-vous",
    text: "Prise de RDV et rappels selon les agendas connectés.",
    href: "agents-ia#rendez-vous",
  },
  {
    title: "CRM & relances",
    text: "Suivi prospects, devis et historique — sans laisser tomber une opportunité.",
    href: "crm-automatisation",
  },
];

export function buildSectorMetadata(
  config: SectorLandingConfig,
  siteBase = "https://www.voxo-ai.ch",
): Metadata {
  return {
    title: config.metaTitle,
    description: config.metaDescription,
    alternates: { canonical: `${siteBase}${config.canonicalPath}` },
    openGraph: {
      title: config.metaTitle,
      description: config.metaDescription,
      url: `${siteBase}${config.canonicalPath}`,
      siteName: "VOXO AI",
      locale: config.openGraphLocale ?? "fr_CH",
      type: "website",
    },
  };
}

export function SectorLandingPage({
  locale,
  config,
}: {
  locale: string;
  config: SectorLandingConfig;
}) {
  return (
    <main className="min-h-screen bg-[#02050b] text-[#f7f8fb]">
      <section className="mx-auto max-w-6xl px-6 py-24 md:py-32">
        <p className="mb-6 text-sm font-semibold uppercase tracking-[0.25em] text-brand-400">
          {config.badge}
        </p>
        <h1 className="max-w-4xl text-4xl font-bold leading-tight md:text-5xl lg:text-6xl">
          {config.heroTitle}
        </h1>
        <p className="mt-4 text-xl text-brand-200">{config.heroSubtitle}</p>
        <p className="mt-8 max-w-3xl text-lg leading-8 text-zinc-300">
          {config.intro}
        </p>
        <div className="mt-10 flex flex-wrap gap-4">
          <Link
            href={`/${locale}/demo`}
            className="inline-flex rounded-full bg-brand-600 px-8 py-4 font-semibold text-white transition hover:bg-brand-500"
          >
            Réserver une démo gratuite
          </Link>
          <Link
            href={`/${locale}/consulting-ia`}
            className="inline-flex rounded-full border border-white/20 px-8 py-4 font-semibold transition hover:bg-white/10"
          >
            Consulting IA
          </Link>
        </div>
      </section>

      <section className="border-t border-white/10">
        <div className="mx-auto max-w-6xl px-6 py-20">
          <h2 className="text-3xl font-bold md:text-4xl">{config.painTitle}</h2>
          <p className="mt-6 max-w-3xl text-lg leading-8 text-zinc-300">
            {config.painText}
          </p>
        </div>
      </section>

      <section className="border-t border-white/10 bg-white/[.02]">
        <div className="mx-auto max-w-6xl px-6 py-20">
          <h2 className="text-3xl font-bold md:text-4xl">
            Ce que nous mettons en place pour votre activité
          </h2>
          <ul className="mt-10 space-y-4">
            {config.sectorSpecifics.map((item) => (
              <li
                key={item}
                className="flex gap-4 rounded-xl border border-white/10 bg-white/[.03] p-5"
              >
                <span className="text-brand-400">✓</span>
                <span className="text-zinc-200">{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="border-t border-white/10">
        <div className="mx-auto max-w-6xl px-6 py-20">
          <h2 className="text-3xl font-bold md:text-4xl">
            Les piliers du système VOXO AI
          </h2>
          <div className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {pillars.map((p) => (
              <Link
                key={p.title}
                href={`/${locale}/${p.href}`}
                className="rounded-2xl border border-white/10 bg-white/[.03] p-6 transition hover:border-brand-400/40"
              >
                <h3 className="text-lg font-semibold text-white">{p.title}</h3>
                <p className="mt-2 text-sm leading-6 text-zinc-400">{p.text}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="border-t border-white/10">
        <div className="mx-auto max-w-6xl px-6 py-20">
          <h2 className="text-3xl font-bold md:text-4xl">Exemples concrets</h2>
          <div className="mt-8 grid gap-4 md:grid-cols-3">
            {config.examples.map((ex) => (
              <div
                key={ex}
                className="rounded-xl border border-white/10 bg-white/[.03] p-5 text-zinc-200"
              >
                {ex}
              </div>
            ))}
          </div>
          <p className="mt-8 text-sm text-zinc-500">
            Les intégrations (Meta, Google, WhatsApp, agendas, CRM) dépendent de
            votre configuration — nous ne présentons pas une brique comme active
            si elle ne l&apos;est pas pour votre compte.
          </p>
        </div>
      </section>

      <section className="border-t border-white/10">
        <div className="mx-auto max-w-6xl px-6 py-20 text-center">
          <h2 className="text-3xl font-bold md:text-4xl">
            Parlons de votre système sur mesure
          </h2>
          <Link
            href={`/${locale}/demo`}
            className="mt-10 inline-flex rounded-full bg-brand-600 px-8 py-4 font-semibold text-white transition hover:bg-brand-500"
          >
            Réserver une démo gratuite
          </Link>
        </div>
      </section>
    </main>
  );
}
