"use client";

import { useMemo, useState } from "react";
import {
  ArrowRight,
  CalendarClock,
  Facebook,
  Instagram,
  Mail,
  Megaphone,
  MessageCircle,
  Phone,
  RefreshCw,
  Smartphone,
  UserPlus,
} from "lucide-react";
import { cn } from "@/lib/utils";

type AdPlatform = "meta_ads" | "google_ads";
type Channel = "whatsapp" | "instagram" | "facebook" | "email" | "sms" | "call";

type Message = {
  from: "prospect" | "voxo" | "system";
  text: string;
  time: string;
};

type HistoryItem = {
  kind:
    | "ad_lead"
    | "message_in"
    | "call"
    | "email_out"
    | "qualification"
    | "appointment"
    | "relance";
  label: string;
  when: string;
};

type Scenario = {
  id: string;
  name: string;
  adPlatform: AdPlatform;
  /** Nom de campagne fictif — pas de statistiques performance. */
  campaignName: string;
  channel: Channel;
  listPreview: string;
  messages: Message[];
  status: string;
  nextAppointment: string;
  nextFollowUp: string;
  history: HistoryItem[];
};

const SCENARIOS: Scenario[] = [
  {
    id: "meta-wa",
    name: "Camille R.",
    adPlatform: "meta_ads",
    campaignName: "Offre printemps (exemple)",
    channel: "whatsapp",
    listPreview: "Lead Meta → WhatsApp",
    messages: [
      {
        from: "system",
        text: "Nouveau prospect — source Meta Ads · campagne fictive « Offre printemps »",
        time: "09:14",
      },
      {
        from: "prospect",
        text: "Bonjour, j’ai cliqué sur votre pub. Pouvez-vous me faire un devis ?",
        time: "09:15",
      },
      {
        from: "voxo",
        text: "Bonjour Camille, merci pour votre message. Quel est votre besoin et votre délai ?",
        time: "09:16",
      },
      {
        from: "prospect",
        text: "Rénovation cuisine, idéalement sous 6 semaines.",
        time: "09:18",
      },
      {
        from: "system",
        text: "Qualification enregistrée dans le CRM (exemple)",
        time: "09:19",
      },
      {
        from: "voxo",
        text: "Créneau proposé : mar. 14 h 30 — visio ou sur place.",
        time: "09:20",
      },
    ],
    status: "Qualifiée — devis en préparation",
    nextAppointment: "Mar. 14 h 30 — confirmé",
    nextFollowUp: "Relance J+3 si devis sans réponse",
    history: [
      {
        kind: "ad_lead",
        label: "Prospect créé — source Meta Ads",
        when: "Aujourd’hui 09:14 · campagne fictive",
      },
      { kind: "message_in", label: "Message WhatsApp reçu", when: "Aujourd’hui 09:15" },
      { kind: "qualification", label: "Qualification (besoin + délai)", when: "Aujourd’hui 09:19" },
      { kind: "appointment", label: "Rendez-vous proposé", when: "Aujourd’hui 09:20" },
      { kind: "call", label: "Appel de suivi (2 min, exemple)", when: "Aujourd’hui 09:22" },
      { kind: "relance", label: "Relance CRM prévue", when: "Ven. 10 h 00" },
    ],
  },
  {
    id: "meta-ig",
    name: "Lucas M.",
    adPlatform: "meta_ads",
    campaignName: "Notoriété locale (exemple)",
    channel: "instagram",
    listPreview: "Lead Meta → Instagram",
    messages: [
      {
        from: "system",
        text: "Nouveau prospect — Meta Ads → premier contact via Instagram",
        time: "11:00",
      },
      {
        from: "prospect",
        text: "Bonjour, votre pub Instagram m’a interpellé. Vous faites des devis sur place ?",
        time: "11:02",
      },
      {
        from: "voxo",
        text: "Bonjour Lucas, oui — deux questions rapides pour vous orienter.",
        time: "11:04",
      },
    ],
    status: "Contactée — en attente de réponse",
    nextAppointment: "Non planifié",
    nextFollowUp: "Relance e-mail demain 09 h",
    history: [
      {
        kind: "ad_lead",
        label: "Prospect créé — source Meta Ads",
        when: "Aujourd’hui 11:00 · campagne fictive",
      },
      { kind: "message_in", label: "DM Instagram reçu", when: "Aujourd’hui 11:02" },
      { kind: "email_out", label: "E-mail de suivi envoyé", when: "Aujourd’hui 11:05" },
      { kind: "relance", label: "Relance prévue", when: "Demain 09 h 00" },
    ],
  },
  {
    id: "meta-messenger",
    name: "Équipe Verte",
    adPlatform: "meta_ads",
    campaignName: "Génération de leads (exemple)",
    channel: "facebook",
    listPreview: "Lead Meta → Messenger",
    messages: [
      {
        from: "system",
        text: "Lead formulaire Meta — conversation reprise sur Messenger",
        time: "15:38",
      },
      {
        from: "prospect",
        text: "Pouvez-vous nous envoyer une brochure PDF ?",
        time: "15:40",
      },
      {
        from: "voxo",
        text: "Bien sûr — brochure envoyée. Souhaitez-vous un créneau pour en discuter ?",
        time: "15:42",
      },
    ],
    status: "Brochure envoyée",
    nextAppointment: "À proposer",
    nextFollowUp: "Relance J+2",
    history: [
      {
        kind: "ad_lead",
        label: "Prospect créé — source Meta Ads",
        when: "Aujourd’hui 15:38 · campagne fictive",
      },
      { kind: "message_in", label: "Message Messenger reçu", when: "Aujourd’hui 15:40" },
      { kind: "email_out", label: "Brochure PDF envoyée", when: "Aujourd’hui 15:41" },
      { kind: "relance", label: "Relance prévue", when: "Jeu. 10 h 00" },
    ],
  },
  {
    id: "google-email",
    name: "Nadia K.",
    adPlatform: "google_ads",
    campaignName: "Search — services locaux (exemple)",
    channel: "email",
    listPreview: "Lead Google → e-mail",
    messages: [
      {
        from: "system",
        text: "Nouveau prospect — source Google Ads · landing page",
        time: "08:04",
      },
      {
        from: "prospect",
        text: "Objet : Demande depuis Google\n\nBonjour, je souhaite un rappel cette semaine.",
        time: "08:05",
      },
      {
        from: "voxo",
        text: "Bonjour Nadia, merci pour votre demande. Êtes-vous disponible jeudi matin ?",
        time: "08:12",
      },
      {
        from: "system",
        text: "Qualification : rappel demandé sous 48 h (exemple)",
        time: "08:13",
      },
    ],
    status: "Nouveau lead — priorité moyenne",
    nextAppointment: "Jeu. 09 h 30 — à confirmer",
    nextFollowUp: "Rappel si pas de réponse sous 24 h",
    history: [
      {
        kind: "ad_lead",
        label: "Prospect créé — source Google Ads",
        when: "Aujourd’hui 08:04 · campagne fictive",
      },
      { kind: "message_in", label: "E-mail reçu (formulaire)", when: "Aujourd’hui 08:05" },
      { kind: "qualification", label: "Qualification enregistrée", when: "Aujourd’hui 08:13" },
      { kind: "email_out", label: "Réponse e-mail envoyée", when: "Aujourd’hui 08:12" },
      { kind: "relance", label: "Relance prévue", when: "Demain 08 h 00" },
    ],
  },
  {
    id: "google-sms",
    name: "Thomas B.",
    adPlatform: "google_ads",
    campaignName: "Performance Max (exemple)",
    channel: "sms",
    listPreview: "Lead Google → SMS",
    messages: [
      {
        from: "system",
        text: "Prospect Google Ads — rappel RDV par SMS",
        time: "16:58",
      },
      { from: "voxo", text: "Bonjour Thomas, créneau vendredi 16 h vous convient ?", time: "16:59" },
      { from: "prospect", text: "OK pour vendredi 16 h.", time: "17:01" },
      { from: "voxo", text: "Parfait — RDV confirmé, rappel la veille (exemple).", time: "17:02" },
    ],
    status: "RDV confirmé",
    nextAppointment: "Ven. 16 h 00",
    nextFollowUp: "Rappel la veille 18 h",
    history: [
      {
        kind: "ad_lead",
        label: "Prospect créé — source Google Ads",
        when: "Aujourd’hui 16:58 · campagne fictive",
      },
      { kind: "message_in", label: "SMS reçu", when: "Aujourd’hui 17:01" },
      { kind: "appointment", label: "Rendez-vous confirmé", when: "Aujourd’hui 17:02" },
      { kind: "relance", label: "Rappel RDV prévu", when: "Jeu. 18 h 00" },
    ],
  },
  {
    id: "google-call",
    name: "Marc D.",
    adPlatform: "google_ads",
    campaignName: "Appels — extension (exemple)",
    channel: "call",
    listPreview: "Lead Google → téléphone",
    messages: [
      {
        from: "system",
        text: "Clic sur annonce Google — appel entrant enregistré",
        time: "09:47",
      },
      {
        from: "system",
        text: "Appel 09:48 — non décroché · fiche CRM créée",
        time: "09:48",
      },
      {
        from: "voxo",
        text: "SMS de rappel envoyé (exemple) : « Nous vous rappelons sous 1 h »",
        time: "09:50",
      },
      {
        from: "prospect",
        text: "Disponible après 14 h.",
        time: "10:05",
      },
    ],
    status: "À rappeler",
    nextAppointment: "Non planifié",
    nextFollowUp: "Appel prévu aujourd’hui 14 h 15",
    history: [
      {
        kind: "ad_lead",
        label: "Prospect créé — source Google Ads",
        when: "Aujourd’hui 09:47 · campagne fictive",
      },
      { kind: "call", label: "Appel manqué enregistré", when: "Aujourd’hui 09:48" },
      { kind: "message_in", label: "SMS reçu (disponibilité)", when: "Aujourd’hui 10:05" },
      { kind: "qualification", label: "Qualification partielle", when: "Aujourd’hui 10:06" },
      { kind: "relance", label: "Rappel téléphonique prévu", when: "Aujourd’hui 14 h 15" },
    ],
  },
];

const AD_PLATFORM_META: Record<
  AdPlatform,
  { label: string; className: string }
> = {
  meta_ads: {
    label: "Meta Ads",
    className: "border-blue-400/35 bg-blue-500/10 text-blue-100",
  },
  google_ads: {
    label: "Google Ads",
    className: "border-amber-400/30 bg-amber-500/10 text-amber-100",
  },
};

const CHANNEL_META: Record<
  Channel,
  { label: string; Icon: typeof MessageCircle; accent: string }
> = {
  whatsapp: {
    label: "WhatsApp",
    Icon: MessageCircle,
    accent: "text-emerald-400",
  },
  instagram: { label: "Instagram", Icon: Instagram, accent: "text-pink-400" },
  facebook: { label: "Messenger", Icon: Facebook, accent: "text-blue-400" },
  email: { label: "E-mail", Icon: Mail, accent: "text-brand-300" },
  sms: { label: "SMS", Icon: Smartphone, accent: "text-zinc-300" },
  call: { label: "Téléphone", Icon: Phone, accent: "text-cyan-300" },
};

const FLOW_STEPS = [
  "Meta Ads / Google Ads",
  "Nouveau prospect",
  "Message ou appel",
  "Qualification",
  "Rendez-vous",
  "CRM",
  "Relance",
] as const;

function Disclaimer({ className }: { className?: string }) {
  return (
    <p
      className={cn(
        "text-[11px] font-medium uppercase tracking-wide text-zinc-500 sm:text-xs",
        className,
      )}
    >
      Exemple de fonctionnement — données fictives · connexions réelles selon
      votre configuration
    </p>
  );
}

function AdPlatformBadge({ platform }: { platform: AdPlatform }) {
  const meta = AD_PLATFORM_META[platform];
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1 rounded-md border px-2 py-0.5 text-xs font-medium",
        meta.className,
      )}
    >
      <Megaphone className="h-3.5 w-3.5 opacity-80" aria-hidden />
      {meta.label}
    </span>
  );
}

function ChannelBadge({ channel }: { channel: Channel }) {
  const { label, Icon, accent } = CHANNEL_META[channel];
  return (
    <span className="inline-flex items-center gap-1.5 rounded-md border border-white/10 bg-white/[0.03] px-2 py-0.5 text-xs font-medium text-zinc-200">
      <Icon className={cn("h-3.5 w-3.5 shrink-0", accent)} aria-hidden />
      Canal : {label}
    </span>
  );
}

function SystemFlowStrip() {
  return (
    <div
      className="overflow-x-auto border-b border-white/[0.08] bg-[#060a12] px-3 py-3 sm:px-5"
      aria-label="Parcours système — illustration"
    >
      <ol className="flex min-w-max items-center gap-1.5 text-xs text-zinc-400 sm:gap-2 sm:text-sm">
        {FLOW_STEPS.map((step, index) => (
          <li key={step} className="flex items-center gap-1.5 sm:gap-2">
            <span className="whitespace-nowrap text-zinc-300">{step}</span>
            {index < FLOW_STEPS.length - 1 && (
              <ArrowRight className="h-3.5 w-3.5 shrink-0 text-zinc-600" aria-hidden />
            )}
          </li>
        ))}
      </ol>
    </div>
  );
}

function HistoryIcon({ kind }: { kind: HistoryItem["kind"] }) {
  if (kind === "ad_lead") {
    return <UserPlus className="h-4 w-4 text-brand-300" aria-hidden />;
  }
  if (kind === "call") return <Phone className="h-4 w-4 text-cyan-300" aria-hidden />;
  if (kind === "email_out") return <Mail className="h-4 w-4 text-brand-300" aria-hidden />;
  if (kind === "relance") return <RefreshCw className="h-4 w-4 text-violet-300" aria-hidden />;
  if (kind === "appointment") {
    return <CalendarClock className="h-4 w-4 text-cyan-300" aria-hidden />;
  }
  if (kind === "qualification") {
    return <Megaphone className="h-4 w-4 text-amber-200/90" aria-hidden />;
  }
  return <MessageCircle className="h-4 w-4 text-emerald-400" aria-hidden />;
}

export function VoxoCrmDemo({
  variant = "page",
}: {
  variant?: "page" | "home" | "section";
}) {
  const [activeId, setActiveId] = useState(SCENARIOS[0]!.id);
  const active = useMemo(
    () => SCENARIOS.find((s) => s.id === activeId) ?? SCENARIOS[0]!,
    [activeId],
  );

  const shell = cn(
    "voxo-card overflow-hidden border-white/[0.09] bg-[#070c14]",
    "w-full",
  );

  return (
    <div className={shell} aria-label="Exemple d’interface CRM — illustration">
      <div className="border-b border-white/[0.08] bg-[#0a1019] px-4 py-3 sm:px-5">
        <Disclaimer />
        <h3 className="mt-1 text-base font-semibold text-white sm:text-lg">
          VOXO — Suivi clients
        </h3>
        <p className="mt-1 max-w-2xl text-sm text-zinc-400">
          Relie la publicité (Meta Ads, Google Ads) au traitement des demandes et
          au suivi commercial — maquette, sans performance publicitaire réelle.
        </p>
      </div>

      <SystemFlowStrip />

      <div className="border-b border-white/[0.08] p-3 lg:hidden">
        <p className="mb-2 text-sm font-medium text-zinc-300">Prospects</p>
        <div className="flex gap-2 overflow-x-auto pb-1">
          {SCENARIOS.map((s) => (
            <button
              key={s.id}
              type="button"
              onClick={() => setActiveId(s.id)}
              className={cn(
                "voxo-choice min-w-[10.5rem] shrink-0 px-3 py-2.5 text-left",
                activeId === s.id ? "voxo-choice-selected" : "voxo-choice-default",
              )}
            >
              <span className="block text-sm font-medium text-white">{s.name}</span>
              <span className="mt-1 flex flex-wrap gap-1">
                <AdPlatformBadge platform={s.adPlatform} />
              </span>
              <span className="mt-1 block text-xs text-zinc-500">
                {CHANNEL_META[s.channel].label}
              </span>
            </button>
          ))}
        </div>
      </div>

      <div
        className={cn(
          "grid gap-0",
          variant === "home" || variant === "section"
            ? "lg:grid-cols-1"
            : "lg:grid-cols-12 lg:min-h-[420px]",
        )}
      >
        <aside
          className={cn(
            "hidden border-white/[0.08] lg:block lg:col-span-3 lg:border-r",
            (variant === "home" || variant === "section") && "lg:hidden",
          )}
        >
          <p className="border-b border-white/[0.08] px-4 py-3 text-sm font-medium text-zinc-300">
            Prospects
          </p>
          <ul className="divide-y divide-white/[0.06]">
            {SCENARIOS.map((s) => (
              <li key={s.id}>
                <button
                  type="button"
                  onClick={() => setActiveId(s.id)}
                  className={cn(
                    "w-full px-4 py-3 text-left transition hover:bg-white/[0.03] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-brand-400/50",
                    activeId === s.id && "bg-brand-500/10",
                  )}
                >
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="text-sm font-medium text-white">{s.name}</span>
                    <AdPlatformBadge platform={s.adPlatform} />
                  </div>
                  <p className="mt-1.5 text-xs text-zinc-500">
                    {CHANNEL_META[s.channel].label} · {s.listPreview}
                  </p>
                </button>
              </li>
            ))}
          </ul>
        </aside>

        <section
          className={cn(
            "border-white/[0.08] p-4 sm:p-5",
            variant === "home" || variant === "section"
              ? "border-b"
              : "lg:col-span-5 lg:border-r",
          )}
        >
          <div className="mb-4 flex flex-col gap-2 sm:flex-row sm:flex-wrap sm:items-start sm:justify-between">
            <div className="space-y-2">
              <p className="text-sm font-semibold text-white">{active.name}</p>
              <div className="flex flex-wrap gap-2">
                <AdPlatformBadge platform={active.adPlatform} />
                <ChannelBadge channel={active.channel} />
              </div>
              <p className="text-sm text-zinc-500">
                Campagne (exemple) : {active.campaignName}
              </p>
            </div>
            <span className="rounded-lg border border-white/10 bg-white/[0.03] px-2.5 py-1 text-xs text-zinc-400">
              Illustration — aucun envoi réel
            </span>
          </div>
          <div
            className="space-y-3 rounded-xl border border-white/[0.08] bg-[#050910] p-3 sm:min-h-[220px] sm:p-4"
            role="log"
            aria-live="polite"
            aria-relevant="text"
          >
            {active.messages.map((msg, i) => (
              <div
                key={`${active.id}-${i}`}
                className={cn(
                  "max-w-[95%] rounded-xl px-3 py-2.5 text-sm leading-6",
                  msg.from === "prospect" &&
                    "mr-auto border border-white/10 bg-white/[0.05] text-zinc-100",
                  msg.from === "voxo" &&
                    "ml-auto border border-brand-400/25 bg-brand-500/15 text-white",
                  msg.from === "system" &&
                    "mx-auto w-full border border-dashed border-zinc-600/40 bg-transparent text-center text-xs text-zinc-500",
                )}
              >
                <p className="whitespace-pre-wrap">{msg.text}</p>
                <time className="mt-1 block text-xs text-zinc-500">{msg.time}</time>
              </div>
            ))}
          </div>
        </section>

        <aside
          className={cn(
            "space-y-4 p-4 sm:p-5",
            variant === "home" || variant === "section" ? "" : "lg:col-span-4",
          )}
        >
          <div className="rounded-xl border border-white/[0.08] bg-white/[0.02] p-4">
            <p className="text-sm font-semibold text-white">Fiche prospect</p>
            <dl className="mt-3 space-y-3 text-sm">
              <div>
                <dt className="text-zinc-500">Source d&apos;acquisition</dt>
                <dd className="mt-1">
                  <AdPlatformBadge platform={active.adPlatform} />
                </dd>
                <dd className="mt-1 text-zinc-400">{active.campaignName}</dd>
              </div>
              <div>
                <dt className="text-zinc-500">Canal de conversation</dt>
                <dd className="mt-1">
                  <ChannelBadge channel={active.channel} />
                </dd>
              </div>
              <div>
                <dt className="text-zinc-500">Statut</dt>
                <dd className="mt-0.5 font-medium text-zinc-200">{active.status}</dd>
              </div>
              <div className="flex gap-2">
                <CalendarClock className="mt-0.5 h-4 w-4 shrink-0 text-brand-300" aria-hidden />
                <div>
                  <dt className="text-zinc-500">Prochain rendez-vous</dt>
                  <dd className="mt-0.5 text-zinc-200">{active.nextAppointment}</dd>
                </div>
              </div>
              <div className="flex gap-2">
                <RefreshCw className="mt-0.5 h-4 w-4 shrink-0 text-violet-300" aria-hidden />
                <div>
                  <dt className="text-zinc-500">Prochaine relance</dt>
                  <dd className="mt-0.5 text-zinc-200">{active.nextFollowUp}</dd>
                </div>
              </div>
            </dl>
          </div>

          <div className="rounded-xl border border-white/[0.08] bg-white/[0.02] p-4">
            <p className="text-sm font-semibold text-white">Historique</p>
            <ul className="mt-3 space-y-3">
              {active.history.map((item) => (
                <li key={`${active.id}-${item.label}-${item.when}`} className="flex gap-3 text-sm">
                  <HistoryIcon kind={item.kind} />
                  <div>
                    <p className="text-zinc-200">{item.label}</p>
                    <p className="text-zinc-500">{item.when}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </aside>
      </div>

      {(variant === "home" || variant === "section") && (
        <p className="border-t border-white/[0.08] px-4 py-3 text-sm text-zinc-500">
          Meta Ads / Google Ads → prospect → message ou appel → qualification →
          rendez-vous → CRM → relance.
        </p>
      )}
    </div>
  );
}
