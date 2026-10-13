"use client";

import { useMemo, useState } from "react";
import {
  CalendarClock,
  Facebook,
  Instagram,
  Mail,
  MessageCircle,
  Phone,
  RefreshCw,
  Smartphone,
} from "lucide-react";
import { cn } from "@/lib/utils";

type Channel = "whatsapp" | "instagram" | "facebook" | "email" | "sms" | "call";

type Message = {
  from: "prospect" | "voxo" | "system";
  text: string;
  time: string;
};

type HistoryItem = {
  kind: "message_in" | "call" | "email_out" | "relance";
  label: string;
  when: string;
};

type Scenario = {
  id: string;
  name: string;
  channel: Channel;
  listPreview: string;
  source: string;
  messages: Message[];
  status: string;
  nextAppointment: string;
  nextFollowUp: string;
  history: HistoryItem[];
};

const SCENARIOS: Scenario[] = [
  {
    id: "wa-meta",
    name: "Camille R.",
    channel: "whatsapp",
    listPreview: "Demande après pub Meta",
    source: "Publicité Meta → WhatsApp",
    messages: [
      {
        from: "system",
        text: "Lead entrant — campagne « Offre printemps »",
        time: "09:14",
      },
      {
        from: "prospect",
        text: "Bonjour, j’ai vu votre pub. Vous pouvez me rappeler un devis ?",
        time: "09:15",
      },
      {
        from: "voxo",
        text: "Bonjour Camille, merci pour votre message. Quel est votre besoin principal et votre délai ?",
        time: "09:16",
      },
      {
        from: "prospect",
        text: "Rénovation cuisine, idéalement sous 6 semaines.",
        time: "09:18",
      },
      {
        from: "voxo",
        text: "Parfait — créneau proposé : mar. 14 h 30 (visio ou sur place).",
        time: "09:20",
      },
    ],
    status: "Qualifiée — devis en préparation",
    nextAppointment: "Mar. 14 h 30 — confirmé",
    nextFollowUp: "Relance J+3 si devis sans réponse",
    history: [
      { kind: "message_in", label: "Message WhatsApp reçu", when: "Aujourd’hui 09:15" },
      { kind: "call", label: "Appel de qualification (2 min)", when: "Aujourd’hui 09:22" },
      { kind: "email_out", label: "E-mail récap envoyé", when: "Aujourd’hui 09:25" },
      { kind: "relance", label: "Relance prévue", when: "Ven. 10 h 00" },
    ],
  },
  {
    id: "ig-dm",
    name: "Lucas M.",
    channel: "instagram",
    listPreview: "DM Instagram — question tarifs",
    source: "Instagram — message direct",
    messages: [
      {
        from: "prospect",
        text: "Bonjour, vos forfaits sont sur le site ?",
        time: "11:02",
      },
      {
        from: "voxo",
        text: "Bonjour Lucas, je vous envoie la bonne page et deux questions pour vous orienter.",
        time: "11:04",
      },
      {
        from: "system",
        text: "Statut : à rappeler par e-mail",
        time: "11:06",
      },
    ],
    status: "Contactée — en attente de réponse",
    nextAppointment: "Non planifié",
    nextFollowUp: "Relance e-mail demain 09 h",
    history: [
      { kind: "message_in", label: "DM Instagram reçu", when: "Aujourd’hui 11:02" },
      { kind: "email_out", label: "E-mail avec lien envoyé", when: "Aujourd’hui 11:05" },
      { kind: "relance", label: "Relance prévue", when: "Demain 09 h 00" },
    ],
  },
  {
    id: "fb-msg",
    name: "Équipe Verte",
    channel: "facebook",
    listPreview: "Messenger — demande brochure",
    source: "Facebook / Messenger",
    messages: [
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
      { kind: "message_in", label: "Message Messenger reçu", when: "Aujourd’hui 15:40" },
      { kind: "email_out", label: "Brochure PDF envoyée", when: "Aujourd’hui 15:41" },
      { kind: "relance", label: "Relance prévue", when: "Jeu. 10 h 00" },
    ],
  },
  {
    id: "email-form",
    name: "Nadia K.",
    channel: "email",
    listPreview: "Formulaire landing page",
    source: "E-mail — page acquisition",
    messages: [
      {
        from: "prospect",
        text: "Objet : Demande depuis la campagne Google\n\nBonjour, je souhaite un rappel cette semaine.",
        time: "08:05",
      },
      {
        from: "voxo",
        text: "Bonjour Nadia, merci pour votre demande. Êtes-vous disponible jeudi matin ?",
        time: "08:12",
      },
    ],
    status: "Nouveau lead — priorité moyenne",
    nextAppointment: "Jeu. 09 h 30 — à confirmer",
    nextFollowUp: "Rappel si pas de réponse sous 24 h",
    history: [
      { kind: "message_in", label: "E-mail reçu (formulaire)", when: "Aujourd’hui 08:05" },
      { kind: "email_out", label: "Réponse e-mail envoyée", when: "Aujourd’hui 08:12" },
      { kind: "relance", label: "Relance prévue", when: "Demain 08 h 00" },
    ],
  },
  {
    id: "sms-short",
    name: "Thomas B.",
    channel: "sms",
    listPreview: "SMS — créneau RDV",
    source: "SMS entrant",
    messages: [
      { from: "prospect", text: "OK pour vendredi 16 h.", time: "17:01" },
      { from: "voxo", text: "Parfait Thomas, RDV confirmé — rappel la veille.", time: "17:02" },
      { from: "system", text: "Synchronisation agenda (exemple)", time: "17:02" },
    ],
    status: "RDV confirmé",
    nextAppointment: "Ven. 16 h 00",
    nextFollowUp: "Rappel la veille 18 h",
    history: [
      { kind: "message_in", label: "SMS reçu", when: "Aujourd’hui 17:01" },
      { kind: "relance", label: "Rappel RDV prévu", when: "Jeu. 18 h 00" },
    ],
  },
  {
    id: "call-in",
    name: "Marc D.",
    channel: "call",
    listPreview: "Appel manqué — rappel",
    source: "Téléphone entrant",
    messages: [
      {
        from: "system",
        text: "Appel entrant 09:48 — non décroché",
        time: "09:48",
      },
      {
        from: "voxo",
        text: "SMS de rappel envoyé : « Nous vous rappelons sous 1 h »",
        time: "09:50",
      },
      {
        from: "prospect",
        text: "Rappel reçu — disponible après 14 h.",
        time: "10:05",
      },
    ],
    status: "À rappeler",
    nextAppointment: "Non planifié",
    nextFollowUp: "Appel prévu aujourd’hui 14 h 15",
    history: [
      { kind: "call", label: "Appel manqué enregistré", when: "Aujourd’hui 09:48" },
      { kind: "message_in", label: "SMS reçu (disponibilité)", when: "Aujourd’hui 10:05" },
      { kind: "relance", label: "Rappel téléphonique prévu", when: "Aujourd’hui 14 h 15" },
    ],
  },
];

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
  facebook: { label: "Facebook", Icon: Facebook, accent: "text-blue-400" },
  email: { label: "E-mail", Icon: Mail, accent: "text-brand-300" },
  sms: { label: "SMS", Icon: Smartphone, accent: "text-zinc-300" },
  call: { label: "Appel", Icon: Phone, accent: "text-cyan-300" },
};

function Disclaimer({ className }: { className?: string }) {
  return (
    <p
      className={cn(
        "text-[11px] font-medium uppercase tracking-wide text-zinc-500 sm:text-xs",
        className,
      )}
    >
      Exemple de fonctionnement — données fictives
    </p>
  );
}

function ChannelBadge({ channel }: { channel: Channel }) {
  const { label, Icon, accent } = CHANNEL_META[channel];
  return (
    <span className="inline-flex items-center gap-1.5 text-sm text-zinc-300">
      <Icon className={cn("h-4 w-4 shrink-0", accent)} aria-hidden />
      {label}
    </span>
  );
}

function HistoryIcon({ kind }: { kind: HistoryItem["kind"] }) {
  if (kind === "call") return <Phone className="h-4 w-4 text-cyan-300" aria-hidden />;
  if (kind === "email_out") return <Mail className="h-4 w-4 text-brand-300" aria-hidden />;
  if (kind === "relance") return <RefreshCw className="h-4 w-4 text-violet-300" aria-hidden />;
  return <MessageCircle className="h-4 w-4 text-emerald-400" aria-hidden />;
}

export function VoxoCrmDemo({
  variant = "page",
}: {
  /** page = hero service ; home = accueil ; section = bloc intermédiaire */
  variant?: "page" | "home" | "section";
}) {
  const [activeId, setActiveId] = useState(SCENARIOS[0]!.id);
  const active = useMemo(
    () => SCENARIOS.find((s) => s.id === activeId) ?? SCENARIOS[0]!,
    [activeId],
  );

  const shell = cn(
    "voxo-card overflow-hidden border-white/[0.09] bg-[#070c14]",
    variant === "page" && "w-full",
    variant === "home" && "w-full",
  );

  return (
    <div className={shell} aria-label="Exemple d’interface CRM — illustration">
      <div className="border-b border-white/[0.08] bg-[#0a1019] px-4 py-3 sm:px-5">
        <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <Disclaimer />
            <h3 className="mt-1 text-base font-semibold text-white sm:text-lg">
              VOXO — Suivi clients
            </h3>
          </div>
          <p className="text-sm text-zinc-400">{active.source}</p>
        </div>
      </div>

      {/* Mobile + tablette : canaux / prospects */}
      <div className="border-b border-white/[0.08] p-3 lg:hidden">
        <p className="mb-2 text-sm font-medium text-zinc-300">Prospects</p>
        <div className="flex gap-2 overflow-x-auto pb-1">
          {SCENARIOS.map((s) => (
            <button
              key={s.id}
              type="button"
              onClick={() => setActiveId(s.id)}
              className={cn(
                "voxo-choice min-w-[9.5rem] shrink-0 px-3 py-2.5 text-left",
                activeId === s.id ? "voxo-choice-selected" : "voxo-choice-default",
              )}
            >
              <span className="block text-sm font-medium text-white">{s.name}</span>
              <span className="mt-1 block text-xs text-zinc-400">{CHANNEL_META[s.channel].label}</span>
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
        {/* Liste desktop */}
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
                  <div className="flex items-start justify-between gap-2">
                    <span className="text-sm font-medium text-white">{s.name}</span>
                    <ChannelBadge channel={s.channel} />
                  </div>
                  <p className="mt-1 text-sm text-zinc-500">{s.listPreview}</p>
                </button>
              </li>
            ))}
          </ul>
        </aside>

        {/* Conversation */}
        <section
          className={cn(
            "border-white/[0.08] p-4 sm:p-5",
            variant === "home" || variant === "section"
              ? "border-b"
              : "lg:col-span-5 lg:border-r",
          )}
        >
          <div className="mb-4 flex flex-wrap items-center justify-between gap-2">
            <div>
              <p className="text-sm font-semibold text-white">{active.name}</p>
              <ChannelBadge channel={active.channel} />
            </div>
            <span className="rounded-lg border border-white/10 bg-white/[0.03] px-2.5 py-1 text-xs text-zinc-400">
              Illustration locale — aucun envoi réel
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

        {/* Fiche + historique */}
        <aside
          className={cn(
            "space-y-4 p-4 sm:p-5",
            variant === "home" || variant === "section" ? "" : "lg:col-span-4",
          )}
        >
          <div className="rounded-xl border border-white/[0.08] bg-white/[0.02] p-4">
            <p className="text-sm font-semibold text-white">Fiche contact</p>
            <dl className="mt-3 space-y-3 text-sm">
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
                <li key={`${active.id}-${item.label}`} className="flex gap-3 text-sm">
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

      {variant === "home" && (
        <p className="border-t border-white/[0.08] px-4 py-3 text-sm text-zinc-500">
          Parcours exemple : publicité → WhatsApp → qualification → rendez-vous → CRM → relance.
        </p>
      )}
    </div>
  );
}
