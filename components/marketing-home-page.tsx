"use client";

import {
  ArrowRight,
  Megaphone,
  MessageSquare,
  PhoneCall,
  CalendarCheck,
  Users,
  Workflow,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Reveal } from "@/components/reveal";
import {
  MarketingCard,
  MarketingEyebrow,
  MarketingH1,
  MarketingH2,
  MarketingLead,
  MarketingSection,
} from "@/components/marketing-primitives";
import { PhotoWithCredit } from "@/components/photo-with-credit";
import { JourneyStrip, WorkflowMockup } from "@/components/workflow-mockup";
import { MARKETING_PHOTOS } from "@/lib/marketing-images";
import type { Locale } from "@/lib/i18n";

const pains = [
  {
    title: "Pas assez de clients",
    text: "Campagnes et pages alignées pour générer des demandes exploitables.",
    href: "acquisition-publicite",
    icon: Megaphone,
    highlight: true,
  },
  {
    title: "Messages et réponses tardives",
    text: "Agents sur WhatsApp, Instagram, Messenger, SMS et e-mail.",
    href: "agents-ia",
    icon: MessageSquare,
  },
  {
    title: "Appels manqués",
    text: "Accueil vocal, qualification et orientation vers un humain si besoin.",
    href: "agents-ia",
    icon: PhoneCall,
  },
  {
    title: "Rendez-vous difficiles à organiser",
    text: "Prise de rendez-vous et rappels selon votre configuration.",
    href: "agents-ia#rendez-vous",
    icon: CalendarCheck,
  },
  {
    title: "Prospects ou devis oubliés",
    text: "CRM, statuts et relances pour ne rien laisser passer.",
    href: "crm-automatisation",
    icon: Users,
  },
  {
    title: "Trop de tâches répétitives",
    text: "Automatisations et consulting IA pour prioriser les bons leviers.",
    href: "consulting-ia",
    icon: Workflow,
  },
];

const accompaniment = [
  "Comprendre votre activité et vos difficultés.",
  "Concevoir le système adapté.",
  "Connecter vos outils et mettre en place les automatisations.",
  "Tester, accompagner et améliorer.",
];

export function MarketingHomePage({ locale }: { locale: Locale }) {
  const demoHref = `/${locale}/demo`;

  return (
    <main className="overflow-hidden bg-[#02050b]">
      <section className="hero-noise relative min-h-0 border-b border-white/[.08] pt-[72px] sm:pt-[82px]">
        <div className="hero-grid absolute inset-0 opacity-80" />
        <div className="relative mx-auto grid max-w-[1480px] gap-8 px-5 py-10 sm:gap-10 sm:py-14 lg:grid-cols-2 lg:items-center lg:gap-12 lg:px-10 lg:py-16">
          <Reveal>
            <MarketingEyebrow>CONSULTING & SYSTÈMES IA</MarketingEyebrow>
            <p className="mt-3 inline-flex items-center gap-2 rounded-full border border-brand-400/30 bg-brand-500/10 px-3 py-1 text-xs font-medium text-brand-200">
              <Megaphone size={14} aria-hidden />
              Acquisition de clients en priorité
            </p>
            <MarketingH1 className="mt-4">
              Attirez plus de clients. Répondez plus vite. Simplifiez votre
              organisation.
            </MarketingH1>
            <MarketingLead>
              VOXO AI relie publicité, messages, appels, rendez-vous et suivi
              client dans un même système — pensé pour votre métier.
            </MarketingLead>
            <div className="mt-7 flex flex-wrap gap-3">
              <Button
                href={demoHref}
                className="h-12 px-7 text-sm shadow-[0_16px_48px_rgba(24,94,255,.32)] sm:px-8"
              >
                Réserver une démo gratuite
              </Button>
              <Button
                href={`/${locale}/acquisition-publicite`}
                variant="outline"
                className="h-12 px-7 sm:px-8"
              >
                Acquisition & publicité
              </Button>
            </div>
          </Reveal>

          <Reveal>
            <WorkflowMockup />
          </Reveal>
        </div>
      </section>

      <MarketingSection>
        <MarketingH2>Vos difficultés, nos leviers</MarketingH2>
        <p className="mt-3 max-w-2xl text-sm leading-6 text-zinc-400 sm:text-base">
          Chaque bloc correspond à une page service : difficulté, solution et
          intérêt concret pour votre entreprise.
        </p>
        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3 lg:gap-5">
          {pains.map(({ title, text, href, icon: Icon, highlight }) => (
            <MarketingCard
              key={title}
              as="a"
              href={`/${locale}/${href}`}
              className={`group ${highlight ? "ring-1 ring-brand-400/25" : ""}`}
            >
              <Icon
                className={highlight ? "text-brand-300" : "text-brand-400"}
                size={20}
                aria-hidden
              />
              <h3 className="mt-3 text-base font-semibold text-white sm:text-lg">
                {title}
              </h3>
              <p className="mt-2 text-sm leading-6 text-zinc-400">{text}</p>
              <span className="mt-3 inline-flex items-center gap-1 text-sm font-medium text-brand-300">
                En savoir plus
                <ArrowRight
                  size={15}
                  className="transition group-hover:translate-x-0.5"
                  aria-hidden
                />
              </span>
            </MarketingCard>
          ))}
        </div>
      </MarketingSection>

      <MarketingSection muted>
        <MarketingH2>
          Du premier contact au suivi client, sans silos
        </MarketingH2>
        <p className="mt-3 max-w-3xl text-sm leading-7 text-zinc-400 sm:text-base">
          Acquisition, réponses, qualification, rendez-vous et CRM se suivent
          dans le même parcours — avec reprise humaine lorsque la décision le
          demande.
        </p>
        <div className="mt-8">
          <JourneyStrip />
        </div>
        <p className="mt-6 max-w-3xl rounded-xl border border-white/10 bg-[#0b111d]/80 p-4 text-sm leading-7 text-zinc-300 sm:p-5">
          Lorsqu&apos;une demande nécessite une décision humaine, elle est
          transmise à la bonne personne avec le contexte utile (historique,
          canal, qualification, prochaines actions).
        </p>
        <div className="mt-8 grid gap-6 lg:grid-cols-2 lg:items-start">
          <WorkflowMockup compact />
          <PhotoWithCredit
            photo={MARKETING_PHOTOS.clientRelation}
            aspect="aspect-[4/3]"
          />
        </div>
      </MarketingSection>

      <MarketingSection>
        <MarketingH2>Notre accompagnement</MarketingH2>
        <ol className="mt-8 space-y-3">
          {accompaniment.map((item, i) => (
            <li
              key={item}
              className="flex gap-4 rounded-xl border border-white/10 bg-white/[.03] p-4 sm:p-5"
            >
              <span className="text-xl font-semibold tabular-nums text-brand-400">
                {i + 1}
              </span>
              <p className="text-sm leading-6 text-zinc-200 sm:text-base">
                {item}
              </p>
            </li>
          ))}
        </ol>
        <div className="mt-8 flex flex-wrap gap-3">
          <Button href={demoHref} className="h-11 px-7 sm:h-12 sm:px-8">
            Réserver une démo gratuite
          </Button>
          <Button
            href={`/${locale}/consulting-ia`}
            variant="outline"
            className="h-11 px-7 sm:h-12 sm:px-8"
          >
            Consulting IA
          </Button>
        </div>
      </MarketingSection>

      <MarketingSection className="border-b-0">
        <div className="grid gap-8 lg:grid-cols-2 lg:items-center lg:gap-10">
          <PhotoWithCredit
            photo={MARKETING_PHOTOS.workspace}
            aspect="aspect-[4/3]"
          />
          <div>
            <MarketingH2 className="text-2xl sm:text-3xl">
              Un système, plusieurs canaux
            </MarketingH2>
            <p className="mt-4 text-sm leading-7 text-zinc-400 sm:text-base">
              Agents de messagerie et vocaux, publicité, agendas et CRM : nous
              assemblons les briques adaptées à votre métier, sans promesse
              d&apos;intégration non configurée.
            </p>
            <Button
              href={`/${locale}/contact`}
              variant="outline"
              className="mt-6 h-11 w-fit px-7 sm:h-12 sm:px-8"
            >
              Nous contacter
            </Button>
          </div>
        </div>
      </MarketingSection>
    </main>
  );
}
