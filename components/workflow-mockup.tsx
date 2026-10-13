import type { ReactNode } from "react";
import { ArrowRight, CalendarCheck, MessageCircle, UserPlus } from "lucide-react";

/** Interfaces fictives — illustration du parcours, pas un résultat client réel. */
export function WorkflowMockup({ compact = false }: { compact?: boolean }) {
  return (
    <div
      className={`voxo-card relative overflow-hidden shadow-[var(--voxo-shadow-soft)] ${compact ? "p-3" : "p-4 sm:p-5"}`}
      aria-label="Exemple de fonctionnement — interfaces fictives"
    >
      <p className="mb-3 text-[10px] font-medium uppercase tracking-[.14em] text-zinc-500 sm:text-[11px]">
        Exemple de fonctionnement — données fictives
      </p>

      <div
        className={`grid gap-2.5 ${compact ? "grid-cols-1" : "grid-cols-1 sm:grid-cols-2"}`}
      >
        <MockCard
          icon={<UserPlus size={14} className="text-emerald-400" />}
          label="Nouveau prospect"
          title="Demande — site web"
          meta="Il y a 2 min · Campagne Meta"
          accent="border-emerald-500/25 bg-emerald-500/[.06]"
        />
        <MockCard
          icon={<MessageCircle size={14} className="text-brand-300" />}
          label="Conversation"
          title="Bonjour, je souhaite un devis…"
          meta="WhatsApp · Qualification en cours"
          accent="border-brand-400/25 bg-brand-500/[.06]"
          bubble="Réponse envoyée · Besoin noté"
        />
        <MockCard
          icon={<CalendarCheck size={14} className="text-cyan-300" />}
          label="Rendez-vous"
          title="Mar. 14 h 30 — Confirmé"
          meta="Agenda connecté · Rappel programmé"
          accent="border-cyan-400/20 bg-cyan-500/[.05]"
        />
        <MockCard
          icon={<ArrowRight size={14} className="text-violet-300" />}
          label="Suivi CRM"
          title="Relance J+3 — devis en attente"
          meta="Statut : À relancer · Responsable : équipe"
          accent="border-violet-400/20 bg-violet-500/[.05]"
        />
      </div>

      <div className="mt-3 hidden items-center justify-between gap-2 rounded-xl border border-white/[.06] bg-white/[.02] px-3 py-2 text-[10px] text-zinc-500 sm:flex sm:text-[11px]">
        <span>Publicité</span>
        <ArrowRight size={12} className="shrink-0 text-zinc-600" />
        <span>Réponse</span>
        <ArrowRight size={12} className="shrink-0 text-zinc-600" />
        <span>Qualification</span>
        <ArrowRight size={12} className="shrink-0 text-zinc-600" />
        <span>RDV</span>
        <ArrowRight size={12} className="shrink-0 text-zinc-600" />
        <span>CRM</span>
      </div>
    </div>
  );
}

function MockCard({
  icon,
  label,
  title,
  meta,
  accent,
  bubble,
}: {
  icon: ReactNode;
  label: string;
  title: string;
  meta: string;
  accent: string;
  bubble?: string;
}) {
  return (
    <div className={`rounded-xl border px-3 py-2.5 ${accent}`}>
      <div className="flex items-center gap-1.5 text-[10px] font-semibold uppercase tracking-wide text-zinc-400">
        {icon}
        {label}
      </div>
      <p className="mt-1.5 text-sm font-medium leading-snug text-zinc-100">
        {title}
      </p>
      {bubble && (
        <p className="mt-1.5 inline-block rounded-lg bg-[#02050b]/60 px-2 py-1 text-[11px] text-zinc-300">
          {bubble}
        </p>
      )}
      <p className="mt-1.5 text-[11px] text-zinc-500">{meta}</p>
    </div>
  );
}

/** Bandeau horizontal du parcours (accueil). */
export function JourneyStrip() {
  const steps = [
    "Acquisition",
    "Demande",
    "Réponse",
    "Qualification",
    "Rendez-vous",
    "CRM",
  ];

  return (
    <ol className="flex flex-col gap-2 sm:flex-row sm:flex-wrap sm:items-center">
      {steps.map((step, index) => (
        <li key={step} className="flex items-center gap-2 text-sm">
          <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-brand-500/15 text-xs font-bold text-brand-200">
            {index + 1}
          </span>
          <span className="text-zinc-200">{step}</span>
          {index < steps.length - 1 && (
            <ArrowRight
              className="hidden shrink-0 text-zinc-600 sm:mx-0.5 sm:block"
              size={14}
              aria-hidden
            />
          )}
        </li>
      ))}
    </ol>
  );
}
