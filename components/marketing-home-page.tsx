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
import { Badge } from "@/components/ui/badge";
import { Reveal } from "@/components/reveal";
import {
  MarketingCard,
  MarketingEyebrow,
  MarketingH1,
  MarketingLead,
  MarketingSection,
  SectionIntro,
} from "@/components/marketing-primitives";
import { PhotoWithCredit } from "@/components/photo-with-credit";
import { VoxoIllustration } from "@/components/voxo-illustration";
import { VOXO_ILLUSTRATIONS } from "@/lib/voxo-marketing-assets";
import { JourneyStrip, WorkflowMockup } from "@/components/workflow-mockup";
import { VoxoContainer } from "@/components/voxo/container";
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

const steps = [
  "Comprendre votre activité et vos difficultés.",
  "Concevoir le système adapté.",
  "Connecter vos outils et automatiser.",
  "Tester, accompagner et améliorer.",
];

export function MarketingHomePage({ locale }: { locale: Locale }) {
  const demoHref = `/${locale}/demo`;

  return (
    <main className="relative overflow-hidden">
      <section className="hero-noise relative border-b border-white/[0.07] pt-[72px] sm:pt-[78px]">
        <div className="hero-grid absolute inset-0 opacity-90" />
        <VoxoContainer
          size="wide"
          className="relative grid gap-10 py-12 sm:py-16 lg:grid-cols-[1.05fr_0.95fr] lg:items-center lg:gap-14 lg:py-20"
        >
          <Reveal>
            <MarketingEyebrow>Consulting & systèmes IA</MarketingEyebrow>
            <Badge className="mt-4">
              <Megaphone size={14} aria-hidden />
              Acquisition de clients en priorité
            </Badge>
            <MarketingH1 className="mt-5">
              Attirez plus de clients. Répondez plus vite. Simplifiez votre
              organisation.
            </MarketingH1>
            <MarketingLead>
              VOXO AI relie publicité, messages, appels, rendez-vous et suivi
              client dans un même système — pensé pour votre métier.
            </MarketingLead>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
              <Button href={demoHref} className="h-12 px-8">
                Réserver une démo gratuite
              </Button>
              <Button
                href={`/${locale}/acquisition-publicite`}
                variant="outline"
                className="h-12 px-8"
              >
                Acquisition & publicité
              </Button>
            </div>
          </Reveal>

          <Reveal>
            <WorkflowMockup />
          </Reveal>
        </VoxoContainer>
      </section>

      <MarketingSection>
        <SectionIntro
          title="Vos difficultés, nos leviers"
          description="Chaque carte mène à une page service : difficulté concrète, solution VOXO et intérêt pour votre entreprise."
        />
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 lg:gap-5">
          {pains.map(({ title, text, href, icon: Icon, highlight }) => (
            <MarketingCard
              key={title}
              as="a"
              href={`/${locale}/${href}`}
              className={cnHighlight(highlight)}
            >
              <span
                className={`inline-flex h-10 w-10 items-center justify-center rounded-xl border ${
                  highlight
                    ? "border-brand-400/30 bg-brand-500/15 text-brand-200"
                    : "border-white/10 bg-white/[0.04] text-brand-400"
                }`}
              >
                <Icon size={18} aria-hidden />
              </span>
              <h3 className="mt-4 text-base font-semibold text-white sm:text-[17px]">
                {title}
              </h3>
              <p className="mt-2 text-sm leading-6 text-zinc-400">{text}</p>
              <span className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-brand-300">
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
        <SectionIntro
          title="Du premier contact au suivi client, sans silos"
          description="Acquisition, réponses, qualification, rendez-vous et CRM dans un seul parcours — avec reprise humaine quand la décision l'exige."
        />
        <JourneyStrip />
        <div className="mt-10 space-y-6">
          <VoxoIllustration
            asset={VOXO_ILLUSTRATIONS.acquisitionQualificationSuivi}
          />
          <p className="max-w-3xl text-sm leading-7 text-zinc-400 sm:text-base">
            Lorsqu&apos;une décision humaine est nécessaire, la demande est
            transmise avec le contexte utile — sans présenter cette illustration
            comme une intégration déjà active chez vous.
          </p>
        </div>
      </MarketingSection>

      <MarketingSection>
        <div className="grid gap-10 lg:grid-cols-2 lg:items-center lg:gap-14">
          <div>
            <SectionIntro
              title="Notre accompagnement"
              description="Quatre étapes claires, sans jargon — de l'analyse à l'amélioration continue."
            />
            <ol className="space-y-3">
              {steps.map((item, i) => (
                <li
                  key={item}
                  className="flex gap-4 rounded-xl border border-white/[0.08] bg-white/[0.025] p-4 sm:p-5"
                >
                  <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-brand-500/15 text-sm font-semibold tabular-nums text-brand-200">
                    {i + 1}
                  </span>
                  <p className="text-sm leading-6 text-zinc-200 sm:text-[15px]">
                    {item}
                  </p>
                </li>
              ))}
            </ol>
            <div className="mt-8 flex flex-wrap gap-3">
              <Button href={demoHref} className="h-11 px-7">
                Réserver une démo gratuite
              </Button>
              <Button
                href={`/${locale}/consulting-ia`}
                variant="outline"
                className="h-11 px-7"
              >
                Consulting IA
              </Button>
            </div>
          </div>
          <PhotoWithCredit
            photo={MARKETING_PHOTOS.workspace}
            aspect="aspect-[4/3]"
          />
        </div>
      </MarketingSection>

      <MarketingSection className="border-b-0 pb-24" muted>
        <VoxoContainer className="voxo-card flex flex-col items-start gap-6 p-8 sm:flex-row sm:items-center sm:justify-between sm:p-10">
          <div className="max-w-xl">
            <h2 className="text-xl font-semibold tracking-tight text-white sm:text-2xl">
              Un système, plusieurs canaux
            </h2>
            <p className="mt-2 text-sm leading-7 text-zinc-400 sm:text-base">
              Messagerie, voix, publicité, agendas et CRM : nous assemblons les
              briques adaptées à votre métier, sans promesse d&apos;intégration
              non configurée.
            </p>
          </div>
          <Button
            href={`/${locale}/contact`}
            variant="outline"
            className="h-11 shrink-0 px-8"
          >
            Nous contacter
          </Button>
        </VoxoContainer>
      </MarketingSection>
    </main>
  );
}

function cnHighlight(highlight?: boolean) {
  return highlight ? "ring-1 ring-brand-400/20" : undefined;
}
