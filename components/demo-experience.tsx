"use client";

import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import {
  Building2,
  CalendarDays,
  CheckCircle2,
  Clock3,
  Hammer,
  Mic,
  PhoneCall,
  Play,
  ShieldCheck,
  Stethoscope,
  UtensilsCrossed,
  Wrench,
} from "lucide-react";

type DemoExperienceProps = {
  locale: string;
};

const scenarios = [
  {
    id: "garage",
    label: "Garage",
    icon: Wrench,
    company: "Garage Dupont SA",
    caller:
      "Bonjour, je voudrais prendre rendez-vous pour une vidange demain matin.",
    answer:
      "Bien sûr. J’ai une disponibilité demain à 09h30. Souhaitez-vous réserver ce créneau ?",
    result: "Vidange réservée demain à 09h30",
    stat: "Rendez-vous confirmé",
    callerName: "Jean Martin",
    service: "Vidange",
    appointmentDate: "2026-08-02",
    appointmentTime: "09:30",
    status: "confirmed",
  },
  {
    id: "restaurant",
    label: "Restauration",
    icon: UtensilsCrossed,
    company: "Le Bistrot des Halles",
    caller: "Bonjour, j'aimerais réserver une table pour ce soir à 19h30 pour 4 personnes.",
    answer: "Avec plaisir. Je vous réserve une table pour 4 personnes ce soir à 19h30. Puis-je avoir votre nom ?",
    result: "Table réservée pour ce soir à 19h30",
    stat: "Réservation confirmée",
    callerName: "Camille Dubois",
    service: "Réservation de table",
    appointmentDate: "2026-08-03",
    appointmentTime: "19:30",
    status: "confirmed",
  },
  {
    id: "regie",
    label: "Régie",
    icon: Building2,
    company: "Régie du Centre",
    caller: "J’ai une fuite d’eau importante dans mon appartement.",
    answer:
      "Je traite votre demande comme une urgence. Pouvez-vous me confirmer votre adresse ?",
    result: "Urgence transmise au service technique",
    stat: "Urgence priorisée",
    callerName: "Marc Dubois",
    service: "Intervention fuite d’eau",
    appointmentDate: "2026-08-02",
    appointmentTime: "10:30",
    status: "urgent",
  },
  {
    id: "artisan",
    label: "Artisan",
    icon: Hammer,
    company: "Atelier Martin",
    caller: "Pouvez-vous venir établir un devis pour une installation ?",
    answer:
      "Avec plaisir. Je vais recueillir votre adresse et vos disponibilités.",
    result: "Demande de devis enregistrée",
    stat: "Visite planifiée",
    callerName: "Laura Morel",
    service: "Visite pour devis",
    appointmentDate: "2026-08-05",
    appointmentTime: "15:00",
    status: "confirmed",
  },
] as const;

const bars = [34, 58, 76, 44, 82, 61, 91, 49, 73, 56, 68, 39, 79, 52];

export function DemoExperience({ locale }: DemoExperienceProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [isSaved, setIsSaved] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const active = scenarios[activeIndex];

  const metrics = useMemo(
    () => [
      {
        label: "Temps de réponse",
        value: "0,8 s",
        icon: Clock3,
      },
      {
        label: "Disponibilité",
        value: "24h/24",
        icon: ShieldCheck,
      },
      {
        label: "Rendez-vous",
        value: "Automatique",
        icon: CalendarDays,
      },
    ],
    [],
  );

  async function runDemo() {
    if (isSaving) {
      return;
    }

    if (isRunning) {
      setIsRunning(false);
      return;
    }

    setIsRunning(true);
    setIsSaving(true);
    setIsSaved(false);
    setErrorMessage("");

    try {
      await new Promise((resolve) => {
        window.setTimeout(resolve, 3000);
      });

      const response = await fetch("/api/appointments", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          company: active.company,
          caller_name: active.callerName,
          phone: "+41 79 123 45 67",
          email: "demo@voxo-ai.ch",
          service: active.service,
          message: active.caller,
          appointment_date: active.appointmentDate,
          appointment_time: active.appointmentTime,
          status: active.status,
          source: "simulation",
        }),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(
          result.error || "Impossible d’enregistrer le rendez-vous.",
        );
      }

      setIsSaved(true);
    } catch (error) {
      console.error("Erreur pendant la simulation :", error);

      setErrorMessage(
        error instanceof Error
          ? error.message
          : "Une erreur est survenue pendant la simulation.",
      );

      setIsRunning(false);
    } finally {
      setIsSaving(false);
    }
  }

  return (
    <main className="relative overflow-hidden bg-[#030812] text-white">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_8%,rgba(34,92,255,.18),transparent_38%)]" />

      <div className="pointer-events-none absolute left-1/2 top-24 h-[540px] w-[900px] -translate-x-1/2 rounded-full bg-blue-600/[.08] blur-[150px]" />

      <section className="relative mx-auto max-w-7xl px-5 pb-28 pt-28 lg:px-8">
        <div className="mx-auto max-w-4xl text-center">
          <p className="text-xs font-semibold tracking-[.24em] text-blue-400">
            DÉMO INTERACTIVE
          </p>

          <h1 className="mt-5 text-balance text-5xl font-semibold tracking-[-.045em] sm:text-7xl">
            Voyez VOXO AI gérer un appel.
          </h1>

          <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-zinc-400">
            Choisissez un métier et suivez la conversation, de la demande du
            client jusqu’à l’action réalisée automatiquement.
          </p>
        </div>

        <div className="mx-auto mt-12 flex w-fit flex-wrap justify-center gap-2 rounded-2xl border border-white/[.08] bg-white/[.035] p-2 backdrop-blur-xl">
          {scenarios.map((scenario, index) => {
            const Icon = scenario.icon;

            return (
              <button
                key={scenario.id}
                type="button"
                onClick={() => {
                  setActiveIndex(index);
                  setIsRunning(false);
                  setIsSaving(false);
                  setIsSaved(false);
                  setErrorMessage("");
                }}
                className={`inline-flex items-center gap-2 rounded-xl px-5 py-3 text-sm font-semibold transition ${
                  activeIndex === index
                    ? "bg-gradient-to-r from-blue-600 to-blue-400 text-white shadow-[0_14px_38px_rgba(30,101,255,.30)]"
                    : "text-zinc-400 hover:bg-white/[.05] hover:text-white"
                }`}
              >
                <Icon size={17} />
                {scenario.label}
              </button>
            );
          })}
        </div>

        <div className="mt-10 grid gap-6 lg:grid-cols-[1.08fr_.92fr]">
          <motion.section
            key={active.id}
            initial={{ opacity: 0, x: -18 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4 }}
            className="relative overflow-hidden rounded-[34px] border border-white/[.09] bg-[#07101b]/90 p-6 shadow-[0_35px_120px_rgba(0,0,0,.42)] backdrop-blur-xl sm:p-8"
          >
            <div className="pointer-events-none absolute -right-16 -top-16 h-64 w-64 rounded-full bg-blue-500/15 blur-3xl" />

            <div className="relative flex items-center justify-between gap-4 border-b border-white/[.08] pb-6">
              <div className="flex items-center gap-4">
                <span className="grid h-12 w-12 place-items-center rounded-2xl border border-blue-400/20 bg-blue-500/10 text-blue-400">
                  <PhoneCall size={23} />
                </span>

                <div>
                  <p className="text-xs font-semibold tracking-[.16em] text-blue-400">
                    APPEL EN DIRECT
                  </p>

                  <h2 className="mt-1 font-semibold text-white">
                    {active.company}
                  </h2>
                </div>
              </div>

              <span className="inline-flex items-center gap-2 rounded-full border border-emerald-400/15 bg-emerald-400/[.08] px-3 py-2 text-xs font-medium text-emerald-300">
                <span className="relative flex h-2.5 w-2.5">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-300 opacity-60" />

                  <span className="relative h-2.5 w-2.5 rounded-full bg-emerald-300" />
                </span>

                {isRunning ? "En conversation" : "Prêt"}
              </span>
            </div>

            <div className="relative mt-7 rounded-[30px] border border-white/10 bg-gradient-to-b from-[#101827] to-[#0b1220] p-6 sm:p-7 shadow-[0_25px_80px_rgba(37,99,235,0.15)]">
              <div className="flex items-center justify-between text-xs text-zinc-500">
                <span>Emma IA</span>
                <span>{isRunning ? "00:24" : "00:00"}</span>
              </div>

              <div className="mt-8 flex h-32 items-end justify-center gap-2">
                              {bars.map((height, index) => (
                  <motion.span
                    key={index}
                    animate={
                      isRunning
                        ? {
                            height: [
                              `${height * 0.45}%`,
                              `${height}%`,
                              `${height * 0.58}%`,
                            ],
                          }
                        : {
                            height: "18%",
                          }
                    }
                    transition={{
                      duration: 1 + index * 0.035,
                      repeat: isRunning ? Infinity : 0,
                      ease: "easeInOut",
                    }}
                   className="w-2 rounded-full bg-gradient-to-t from-sky-400 via-blue-500 to-cyan-200 shadow-[0_0_12px_rgba(59,130,246,0.8)]"
                  />
                ))}
              </div>


                   <div className="mt-7 space-y-4">
  <motion.div
    initial={{ opacity: 0, x: -15 }}
    animate={{
      opacity: isRunning ? 1 : 0.42,
      x: 0,
    }}
    transition={{
      duration: 0.45,
      delay: isRunning ? 0.4 : 0,
    }}
    className="max-w-[88%] rounded-2xl rounded-tl-md bg-white/[0.06] px-4 py-3 text-sm leading-6 text-zinc-200"
  >
    « {active.caller} »
  </motion.div>

  <motion.div
    initial={{ opacity: 0, x: 15 }}
    animate={{
      opacity: isRunning ? 1 : 0.28,
      x: 0,
      y: isRunning ? 0 : 8,
    }}
    transition={{
      duration: 0.45,
      delay: isRunning ? 2.1 : 0,
    }}
    className="ml-auto max-w-[88%] rounded-2xl rounded-tr-md border border-blue-400/20 bg-blue-500/15 px-4 py-3 text-sm leading-6 text-blue-100"
  >
    « {active.answer} »
  </motion.div>
</div>
                
              
</div>
            <motion.div
              initial={false}
              animate={{
                opacity: isRunning ? 1 : 0.34,
                y: isRunning ? 0 : 8,
              }}
              className="relative mt-5 rounded-2xl border border-emerald-400/15 bg-emerald-400/[.07] p-4"
            >
              <div className="flex items-start gap-3">
                <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-emerald-400/10 text-emerald-300">
                  <CheckCircle2 size={19} />
                </span>

                <div>
                  <p className="text-sm font-semibold text-emerald-200">
                    {active.stat}
                  </p>

                  <p className="mt-1 text-sm leading-6 text-zinc-400">
                    {active.result}
                  </p>
                </div>
              </div>
            </motion.div>
          </motion.section>

          <section className="rounded-[34px] border border-white/[.09] bg-white/[.03] p-6 backdrop-blur-xl sm:p-8">
            <p className="text-xs font-semibold tracking-[.18em] text-blue-400">
              SIMULATION
            </p>

            <h2 className="mt-4 text-3xl font-semibold tracking-[-.025em]">
              Testez le scénario {active.label.toLowerCase()}
            </h2>

            <p className="mt-4 text-sm leading-7 text-zinc-400">
              Lancez la simulation pour visualiser la réponse de l’IA et
              enregistrer automatiquement le rendez-vous dans Supabase.
            </p>

            <button
              type="button"
              onClick={runDemo}
              disabled={isSaving}
              className="mt-7 inline-flex h-14 w-full items-center justify-center rounded-2xl bg-gradient-to-r from-blue-600 to-blue-400 px-6 text-base font-semibold text-white shadow-[0_20px_58px_rgba(27,102,255,.32)] transition hover:-translate-y-0.5 hover:shadow-[0_25px_70px_rgba(27,102,255,.44)] disabled:cursor-not-allowed disabled:opacity-60"
            >
              {isSaving ? (
                <>
                  <Mic className="mr-2 animate-pulse" size={19} />
                  Enregistrement...
                </>
              ) : isRunning ? (
                <>
                  <Mic className="mr-2" size={19} />
                  Arrêter la simulation
                </>
              ) : (
                <>
                  <Play className="mr-2 fill-current" size={18} />
                  Lancer la simulation
                </>
              )}
            </button>

            {isSaved && (
              <div className="mt-4 rounded-2xl border border-emerald-400/20 bg-emerald-400/[.08] p-4 text-sm text-emerald-200">
                Rendez-vous enregistré dans Supabase. Recharge le dashboard pour
                le voir apparaître.
              </div>
            )}

            {errorMessage && (
              <div className="mt-4 rounded-2xl border border-red-400/20 bg-red-400/[.08] p-4 text-sm text-red-200">
                {errorMessage}
              </div>
            )}

<div className="mt-8 grid grid-cols-2 gap-5">
  <div className="rounded-3xl border border-white/10 bg-gradient-to-br from-white/10 via-white/5 to-transparent p-6 shadow-xl transition-all duration-300 hover:-translate-y-1 hover:shadow-blue-500/20">
    <p className="text-3xl font-bold text-white">0,8 s</p>
    <p className="mt-1 text-sm text-zinc-400">Temps de réponse</p>
  </div>

  <div className="rounded-3xl border border-emerald-500/20 bg-gradient-to-br from-emerald-500/15 via-emerald-500/5 to-transparent p-6 shadow-xl transition-all duration-300 hover:-translate-y-1 hover:shadow-emerald-500/20">
    <p className="text-3xl font-bold text-emerald-400">24/7</p>
    <p className="mt-1 text-sm text-zinc-400">Disponibilité</p>
  </div>

  <div className="rounded-3xl border border-brand-500/20 bg-gradient-to-br from-brand-500/15 via-brand-500/5 to-transparent p-6 shadow-xl transition-all duration-300 hover:-translate-y-1 hover:shadow-brand-500/20">
    <p className="text-3xl font-bold text-brand-400">98%</p>
    <p className="mt-1 text-sm text-zinc-400">Compréhension IA</p>
  </div>

  <div className="rounded-3xl border border-violet-500/20 bg-gradient-to-br from-violet-500/15 via-violet-500/5 to-transparent p-6 shadow-xl transition-all duration-300 hover:-translate-y-1 hover:shadow-violet-500/20">
    <p className="text-3xl font-bold text-violet-300">SMS</p>
    <p className="mt-1 text-sm text-zinc-400">
      Confirmation automatique
    </p>
  </div>
</div>

            <div className="mt-7 rounded-2xl border border-white/[.07] bg-black/15 p-5">
              <p className="text-sm font-semibold text-white">
                Connexion vocale Retell
              </p>

              <p className="mt-2 text-sm leading-6 text-zinc-500">
                Le design est prêt. La conversation vocale réelle pourra être
                activée dès que le compte Retell disposera d’un moyen de
                paiement valide.
              </p>
            </div>

            <a
              href={`/${locale}#tarifs`}
              className="mt-6 inline-flex w-full items-center justify-center text-sm font-semibold text-blue-400 hover:text-blue-300"
            >
              Découvrir les offres
            </a>
          </section>
        </div>
      </section>
    </main>
  );
}