"use client";

import {
  ArrowRight,
  BarChart3,
  Building2,
  CalendarDays,
  Check,
  CheckCircle2,
  Clock3,
  Headphones,
  Hammer,
  HeartPulse,
  MessageSquareText,
  Quote,
  PhoneCall,
  Play,
  RotateCcw,
  Scissors,
  ShieldCheck,
  Sparkles,
  Stethoscope,
  Wrench,
  Zap,
} from "lucide-react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { PhoneDemo } from "@/components/phone-demo";
import { Reveal } from "@/components/reveal";
import type { Locale } from "@/lib/i18n";

const featureRail = [
  [Clock3, "Répond 24h/24", "même en dehors des heures d’ouverture"],
  [CalendarDays, "Prend vos rendez-vous", "et les synchronise avec votre agenda"],
  [MessageSquareText, "Répond aux questions", "fréquentes de vos clients"],
  [BarChart3, "Qualifie et transfère", "les appels importants"],
] as const;

const steps = [
  [PhoneCall, "1. Répond", "VOXO AI décroche vos appels instantanément."],
  [MessageSquareText, "2. Comprend", "Elle comprend la demande de votre client."],
  [CalendarDays, "3. Agit", "Elle réserve le rendez-vous dans votre agenda."],
  [CheckCircle2, "4. Confirme", "Le client reçoit une confirmation par SMS ou e-mail."],
] as const;

const clientTypes = ["GARAGES", "CABINETS", "RÉGIES", "ARTISANS"];

const sectors = [
  {
    icon: Wrench,
    title: "Garages automobiles",
    description: "Prise de rendez-vous, demandes de devis, pannes et urgences.",
    bullets: ["Répond 24h/24", "Planifie les interventions", "Transfère les urgences"],
  },
  {
    icon: Stethoscope,
    title: "Cabinets médicaux",
    description: "Accueil téléphonique, questions fréquentes et prise de rendez-vous.",
    bullets: ["Filtre les demandes", "Confirme les rendez-vous", "Réduit les appels manqués"],
  },
  {
    icon: Building2,
    title: "Régies immobilières",
    description: "Qualification des demandes locataires et transmission au bon service.",
    bullets: ["Trie les urgences", "Crée les demandes", "Informe les locataires"],
  },
  {
    icon: Scissors,
    title: "Salons & instituts",
    description: "Réservations, modifications d’horaires et rappels automatiques.",
    bullets: ["Réserve 24h/24", "Réduit les absences", "Répond aux tarifs"],
  },
  {
    icon: Hammer,
    title: "Artisans",
    description: "Qualification des chantiers, demandes de devis et rappels clients.",
    bullets: ["Collecte les informations", "Priorise les urgences", "Planifie les visites"],
  },
  {
    icon: HeartPulse,
    title: "Dentistes",
    description: "Prise de rendez-vous, urgences dentaires et informations pratiques.",
    bullets: ["Gère les urgences", "Confirme par SMS", "Soulage le secrétariat"],
  },
] as const;

export function HomePage({ locale, d }: { locale: Locale; d: any }) {
  return (
    <main className="overflow-hidden bg-[#02050b]">
      <section className="hero-noise relative min-h-[920px] border-b border-white/[.08] pt-[82px]">
        <div className="hero-grid absolute inset-0" />

        <motion.div
          aria-hidden
          animate={{ opacity: [0.22, 0.42, 0.22], scale: [0.96, 1.05, 0.96] }}
          transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
          className="absolute left-[35%] top-14 h-[620px] w-[820px] rounded-full bg-brand-600/[.18] blur-[150px]"
        />

        <motion.div
          aria-hidden
          animate={{ x: [-18, 18, -18], opacity: [0.55, 0.85, 0.55] }}
          transition={{ duration: 11, repeat: Infinity, ease: "easeInOut" }}
          className="voice-wave absolute left-[28%] top-[265px] h-[290px] w-[62%]"
        />

        <div className="relative mx-auto grid max-w-[1480px] gap-10 px-5 pb-8 pt-14 lg:grid-cols-[1.08fr_.72fr_.52fr] lg:items-center lg:px-10 lg:pb-0 lg:pt-14">
          <motion.div
            initial={{ opacity: 0, y: 26 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.75 }}
            className="relative z-10 pb-8 lg:pb-20"
          >
            <div className="inline-flex items-center gap-2 rounded-full border border-white/[.11] bg-white/[.045] px-4 py-2 text-xs font-semibold tracking-wide text-zinc-200 shadow-[0_10px_45px_rgba(0,0,0,.22)] backdrop-blur-xl">
              <span>🇨🇭</span>
              RÉCEPTIONNISTE IA POUR LES ENTREPRISES SUISSES
            </div>

            <h1 className="mt-7 max-w-[780px] text-balance text-5xl font-semibold leading-[.98] tracking-[-.055em] sm:text-7xl lg:text-[76px] xl:text-[86px]">
              Ne manquez plus
              <br />
              jamais{" "}
              <span className="bg-gradient-to-r from-brand-300 via-brand-400 to-blue-600 bg-clip-text text-transparent">
                un appel.
              </span>
            </h1>

            <p className="mt-7 max-w-[680px] text-lg leading-8 text-zinc-300 sm:text-xl">
              VOXO AI répond à vos appels 24h/24, prend vos rendez-vous, répond à vos clients et s’occupe de votre agenda automatiquement.
            </p>

            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              <Button
                href={`/${locale}/demo`}
                className="h-14 px-8 text-base shadow-[0_18px_55px_rgba(24,94,255,.35)] transition hover:-translate-y-0.5 hover:shadow-[0_24px_70px_rgba(24,94,255,.48)]"
              >
                <Play className="mr-2 fill-current" size={17} />
                Lancer la démo instantanément
              </Button>

              <Button
                href="#tarifs"
                variant="outline"
                className="h-14 px-8 text-base backdrop-blur-xl transition hover:-translate-y-0.5"
              >
                Voir les offres
              </Button>
            </div>

            <div className="mt-8 flex flex-wrap gap-x-7 gap-y-4 text-sm text-zinc-300">
              <span className="flex items-center gap-2">
                <Zap size={17} className="text-brand-400" />
                Installation en 2 min
              </span>
              <span className="flex items-center gap-2">
                <ShieldCheck size={17} className="text-brand-400" />
                Aucune carte bancaire
              </span>
              <span className="flex items-center gap-2">
                <RotateCcw size={17} className="text-brand-400" />
                Annulez à tout moment
              </span>
            </div>
          </motion.div>

          <div className="relative z-10 self-end lg:-ml-12">
            <PhoneDemo />
          </div>

          <div className="relative z-10 hidden border-l border-white/[.10] pl-8 lg:block">
            {featureRail.map(([Icon, title, text], index) => (
              <motion.div
                key={title}
                initial={{ opacity: 0, x: 18 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.25 + index * 0.1 }}
                className={`flex gap-5 py-7 ${index > 0 ? "border-t border-white/[.09]" : ""}`}
              >
                <span className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl border border-brand-400/20 bg-brand-500/[.08] text-brand-400 shadow-[0_10px_35px_rgba(18,87,255,.16)]">
                  <Icon size={25} />
                </span>
                <div>
                  <h3 className="font-semibold text-brand-300">{title}</h3>
                  <p className="mt-2 max-w-[190px] text-sm leading-6 text-zinc-300">{text}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        <div className="relative mx-auto max-w-[1480px] px-5 pb-5 lg:px-10">
          <div className="grid items-center gap-6 rounded-[24px] border border-white/[.09] bg-[#07101b]/88 px-7 py-6 shadow-[0_28px_80px_rgba(0,0,0,.35)] backdrop-blur-xl md:grid-cols-[1.2fr_repeat(4,1fr)]">
            <p className="text-sm leading-6 text-zinc-200">
              Conçu pour les entreprises
              <br />
              en Suisse 🇨🇭
            </p>
            {clientTypes.map((name) => (
              <div key={name} className="text-center text-sm font-semibold tracking-[.13em] text-zinc-400">
                {name}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="solution" className="bg-[#f7f9fc] py-24 text-[#09101d]">
        <div className="mx-auto grid max-w-[1480px] gap-10 px-5 lg:grid-cols-[.8fr_1.55fr_.72fr] lg:px-10">
          <Reveal>
            <div>
              <p className="text-xs font-bold tracking-[.12em] text-brand-600">
                COMMENT ÇA MARCHE
              </p>

              <h2 className="mt-4 text-3xl font-semibold tracking-tight sm:text-4xl">
                Une IA entraînée pour représenter votre entreprise
              </h2>

              <p className="mt-5 leading-7 text-slate-600">
                VOXO AI comprend votre activité, vos services et vos
                disponibilités pour offrir à vos clients une expérience
                naturelle et professionnelle.
              </p>

              <a
                href="#secteurs"
                className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-brand-600"
              >
                Découvrir le fonctionnement
                <ArrowRight size={16} />
              </a>
            </div>
          </Reveal>

          <div className="relative grid gap-6 sm:grid-cols-2 xl:grid-cols-4">
            <div className="pointer-events-none absolute left-[8%] right-[8%] top-8 hidden h-px bg-gradient-to-r from-transparent via-brand-300/60 to-transparent xl:block" />

            {steps.map(([Icon, title, stepText]) => (
              <Reveal key={title}>
                <div className="group relative text-center">
                  <div className="mx-auto grid h-16 w-16 place-items-center rounded-2xl border border-brand-200 bg-white text-brand-600 shadow-[0_16px_40px_rgba(37,99,235,.12)] transition duration-300 group-hover:-translate-y-1 group-hover:border-brand-400">
                    <Icon size={27} />
                  </div>

                  <h3 className="mt-5 font-semibold">{title}</h3>

                  <p className="mt-2 text-sm leading-6 text-slate-600">
                    {stepText}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>

          <Reveal>
            <div className="rounded-[28px] border border-white/[.08] bg-[#07101b] p-7 text-white shadow-[0_24px_70px_rgba(0,0,0,.18)]">
              <h3 className="text-center font-semibold">
                Indicateurs de démonstration
              </h3>

              <div className="mt-7 space-y-5">
                <Metric
                  icon={PhoneCall}
                  value="24/7"
                  label="disponibilité téléphonique"
                />
                <Metric
                  icon={CalendarDays}
                  value="Auto"
                  label="prise de rendez-vous"
                />
                <Metric
                  icon={Clock3}
                  value="Temps"
                  label="gagné par votre équipe"
                />
              </div>

              <p className="mt-6 text-center text-[11px] leading-5 text-zinc-500">
                Les résultats réels dépendent du volume d’appels et de la
                configuration choisie.
              </p>
            </div>
          </Reveal>
        </div>

        <div className="mx-auto mt-10 max-w-[1480px] px-5 lg:px-10">
          <div className="grid gap-4 rounded-2xl border border-slate-200 bg-white px-6 py-5 shadow-sm sm:grid-cols-2 lg:grid-cols-4">
            <Trust
              icon={ShieldCheck}
              title="Hébergement en Suisse"
              text="Données sécurisées"
            />
            <Trust
              icon={CheckCircle2}
              title="Conforme nLPD / RGPD"
              text="Protection maximale"
            />
            <Trust
              icon={Headphones}
              title="Support réactif"
              text="Une équipe à votre écoute"
            />
            <Trust
              icon={Sparkles}
              title="Sans engagement"
              text="Une offre flexible"
            />
          </div>
        </div>
      </section>

      <div className="relative h-36 overflow-hidden bg-gradient-to-b from-[#f7f9fc] via-white to-[#02050b]">
        <div className="absolute left-1/2 top-0 h-72 w-72 -translate-x-1/2 rounded-full bg-blue-500/10 blur-3xl" />
        <div className="absolute bottom-0 left-0 h-px w-full bg-gradient-to-r from-transparent via-blue-400/40 to-transparent" />
      </div>

      <section id="secteurs" className="relative py-24">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(30,93,255,.10),transparent_35%)]" />

        <div className="relative mx-auto max-w-7xl px-5 lg:px-8">
          <Heading eyebrow="SECTEURS" title="Une IA adaptée à votre métier" text="VOXO AI s’adapte à vos horaires, vos services et vos règles de fonctionnement." />

          <div className="mt-14 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
            {sectors.map(({ icon: Icon, title, description, bullets }, index) => (
              <Reveal key={title}>
                <div className="group relative h-full overflow-hidden rounded-[30px] border border-white/[.08] bg-white/[.035] p-7 transition duration-300 hover:-translate-y-1.5 hover:border-brand-400/35 hover:bg-brand-500/[.07] hover:shadow-[0_24px_80px_rgba(16,75,255,.16)]">
                  <div className="absolute right-0 top-0 h-36 w-36 rounded-full bg-brand-500/0 blur-3xl transition duration-300 group-hover:bg-brand-500/20" />

                  <div className="relative">
                    <span className="grid h-14 w-14 place-items-center rounded-2xl border border-brand-400/20 bg-brand-500/10 text-brand-400">
                      <Icon size={26} />
                    </span>

                    <h3 className="mt-7 text-2xl font-semibold">{title}</h3>
                    <p className="mt-3 min-h-[72px] text-sm leading-6 text-zinc-400">{description}</p>

                    <ul className="mt-6 space-y-3">
                      {bullets.map((item) => (
                        <li key={item} className="flex items-center gap-3 text-sm text-zinc-300">
                          <CheckCircle2 size={17} className="shrink-0 text-brand-400" />
                          {item}
                        </li>
                      ))}
                    </ul>

                    <a
                      href={`/${locale}/demo`}
                      className="mt-7 inline-flex items-center gap-2 text-sm font-semibold text-brand-400 transition group-hover:gap-3"
                    >
                      Voir la démo
                      <ArrowRight size={16} />
                    </a>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>


      <section className="relative border-y border-white/[.07] bg-white/[.018] py-24">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_10%,rgba(30,93,255,.12),transparent_42%)]" />

        <div className="relative mx-auto max-w-7xl px-5 lg:px-8">
          <Heading
            eyebrow="EXPÉRIENCE CLIENT"
            title="Des appels plus fluides, même quand vous êtes occupé"
            text="Voici des exemples de situations que VOXO AI peut gérer pour votre entreprise."
          />

          <div className="mt-14 grid gap-5 lg:grid-cols-3">
            {[
              {
                sector: "Garage automobile",
                quote:
                  "Je voudrais prendre rendez-vous pour une vidange demain matin.",
                answer:
                  "VOXO AI vérifie les disponibilités, réserve le créneau et envoie la confirmation.",
              },
              {
                sector: "Cabinet médical",
                quote:
                  "Avez-vous une disponibilité cette semaine pour une consultation ?",
                answer:
                  "VOXO AI collecte la demande et propose les créneaux autorisés par le cabinet.",
              },
              {
                sector: "Régie immobilière",
                quote:
                  "J’ai une fuite d’eau dans mon appartement.",
                answer:
                  "VOXO AI identifie l’urgence, collecte l’adresse et transmet au bon service.",
              },
            ].map((item, index) => (
              <Reveal key={item.sector}>
                <div className="group h-full rounded-[30px] border border-white/[.08] bg-[#07101b]/75 p-7 shadow-[0_24px_70px_rgba(0,0,0,.22)] backdrop-blur-xl transition duration-300 hover:-translate-y-1 hover:border-brand-400/30">
                  <span className="grid h-12 w-12 place-items-center rounded-2xl border border-brand-400/20 bg-brand-500/10 text-brand-400">
                    <Quote size={22} />
                  </span>

                  <p className="mt-7 text-lg font-medium leading-8 text-white">
                    « {item.quote} »
                  </p>

                  <div className="mt-6 border-t border-white/[.08] pt-6">
                    <p className="text-xs font-semibold tracking-[.15em] text-brand-400">
                      {item.sector.toUpperCase()}
                    </p>
                    <p className="mt-3 text-sm leading-6 text-zinc-400">
                      {item.answer}
                    </p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <Pricing locale={locale} d={d.pricing} />
      <Faq d={d.faq} />

      <section className="px-5 pb-24 lg:px-8">
        <Reveal>
          <div className="relative mx-auto max-w-7xl overflow-hidden rounded-[38px] border border-brand-400/25 bg-[radial-gradient(circle_at_50%_0%,rgba(23,104,255,.24),transparent_55%),#07101b] px-7 py-16 text-center shadow-glow sm:px-12 sm:py-24">
            <Sparkles className="mx-auto text-brand-400" />
            <h2 className="mx-auto mt-6 max-w-3xl text-balance text-4xl font-semibold tracking-tight sm:text-6xl">
              {d.cta.title}
            </h2>
            <p className="mx-auto mt-5 max-w-2xl text-lg text-zinc-400">{d.cta.text}</p>
            <Button href={`/${locale}/contact`} className="mt-9">
              {d.cta.button}
              <ArrowRight className="ml-2" size={17} />
            </Button>
          </div>
        </Reveal>
      </section>
    </main>
  );
}

function Metric({ icon: Icon, value, label }: { icon: any; value: string; label: string }) {
  return (
    <div className="flex items-center gap-4 border-b border-white/[.08] pb-5 last:border-0 last:pb-0">
      <span className="grid h-10 w-10 place-items-center rounded-full border border-brand-400/35 bg-brand-500/10 text-brand-400">
        <Icon size={19} />
      </span>
      <div>
        <div className="text-2xl font-semibold text-brand-400">{value}</div>
        <p className="text-xs text-zinc-400">{label}</p>
      </div>
    </div>
  );
}

function Trust({ icon: Icon, title, text }: { icon: any; title: string; text: string }) {
  return (
    <div className="flex items-center gap-4">
      <Icon className="shrink-0 text-[#101827]" />
      <div>
        <h3 className="text-sm font-semibold">{title}</h3>
        <p className="mt-1 text-xs text-slate-500">{text}</p>
      </div>
    </div>
  );
}

function Heading({ eyebrow, title, text }: { eyebrow: string; title: string; text?: string }) {
  return (
    <Reveal>
      <p className="text-xs font-semibold tracking-[.22em] text-brand-400">{eyebrow}</p>
      <h2 className="mt-4 max-w-4xl text-balance text-4xl font-semibold tracking-[-.035em] sm:text-6xl">{title}</h2>
      {text && <p className="mt-5 max-w-2xl text-lg leading-8 text-zinc-500">{text}</p>}
    </Reveal>
  );
}

function Pricing({ locale, d }: { locale: Locale; d: any }) {
  return (
    <section id="tarifs" className="relative overflow-hidden border-y border-white/[.07] py-28">
      <div className="pointer-events-none absolute left-1/2 top-0 h-[520px] w-[820px] -translate-x-1/2 rounded-full bg-brand-600/[.10] blur-[150px]" />

      <div className="relative mx-auto max-w-6xl px-5 lg:px-8">
        <div className="text-center">
          <p className="text-xs font-semibold tracking-[.22em] text-brand-400">
            {d.eyebrow}
          </p>
          <h2 className="mx-auto mt-4 max-w-4xl text-balance text-4xl font-semibold tracking-[-.035em] sm:text-6xl">
            {d.title}
          </h2>
          <p className="mx-auto mt-5 max-w-2xl text-lg leading-8 text-zinc-400">
            Choisissez l’offre adaptée à votre volume d’appels et à votre organisation.
          </p>
        </div>

        <div className="mt-16 grid gap-6 lg:grid-cols-2">
          {d.plans.map((p: any, i: number) => (
            <Reveal key={p.name}>
              <div
                className={`relative h-full overflow-hidden rounded-[34px] border p-8 sm:p-10 ${
                  i === 1
                    ? "border-brand-400/45 bg-[radial-gradient(circle_at_50%_0%,rgba(31,103,255,.18),transparent_48%),rgba(19,43,88,.34)] shadow-[0_30px_100px_rgba(24,94,255,.20)]"
                    : "border-white/[.09] bg-white/[.028]"
                }`}
              >
                {i === 1 && (
                  <span className="absolute right-6 top-6 rounded-full bg-brand-gradient px-4 py-1.5 text-xs font-bold text-white shadow-[0_10px_35px_rgba(25,94,255,.35)]">
                    {d.popular}
                  </span>
                )}

                <p className="text-sm font-semibold tracking-[.14em] text-brand-400">
                  {i === 1 ? "POUR LES ÉQUIPES" : "POUR DÉMARRER"}
                </p>

                <h3 className="mt-4 text-3xl font-semibold">{p.name}</h3>
                <p className="mt-3 max-w-md leading-7 text-zinc-400">{p.desc}</p>

                <div className="mt-9 flex items-end gap-2">
                  <span className="text-6xl font-semibold tracking-[-.05em]">
                    {p.price}
                  </span>
                  <span className="pb-2 text-zinc-500">{d.monthly}</span>
                </div>

                <div className="my-9 h-px bg-white/[.08]" />

                <ul className="space-y-4">
                  {p.features.map((f: string) => (
                    <li key={f} className="flex gap-3 text-zinc-300">
                      <span className="mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-full bg-brand-500/15 text-brand-400">
                        <Check size={13} strokeWidth={3} />
                      </span>
                      {f}
                    </li>
                  ))}
                </ul>

                <Button
                  href={`/${locale}/checkout?plan=${p.name.toLowerCase()}`}
                  variant={i === 1 ? "brand" : "outline"}
                  className={`mt-10 h-14 w-full text-base ${
                    i === 1
                      ? "shadow-[0_18px_55px_rgba(24,94,255,.32)]"
                      : ""
                  }`}
                >
                  {d.start}
                  <ArrowRight className="ml-2" size={17} />
                </Button>

                <p className="mt-4 text-center text-xs text-zinc-500">
                  Configuration personnalisée selon votre activité.
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function Faq({ d }: { d: any }) {
  return (
    <section id="faq" className="py-24">
      <div className="mx-auto max-w-4xl px-5 lg:px-8">
        <Heading eyebrow={d.eyebrow} title={d.title} />
        <div className="mt-12 divide-y divide-white/[.08] border-y border-white/[.08]">
          {d.items.map((item: string[]) => (
            <details key={item[0]} className="group py-6">
              <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-lg font-medium">
                {item[0]}
                <span className="text-brand-400 transition group-open:rotate-45">+</span>
              </summary>
              <p className="max-w-2xl pt-4 leading-7 text-zinc-500">{item[1]}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}