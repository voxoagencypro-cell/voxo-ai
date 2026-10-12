"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { Logo } from "@/components/logo";
import { Button } from "@/components/ui/button";
import type { Locale } from "@/lib/i18n";
import { getSafeNextPath } from "@/lib/safe-next-path";
import {
  CHANNEL_LABELS,
  CHANNEL_OPTIONS,
  EMPLOYEE_RANGES,
  PRIORITY_LABELS,
  PRIORITY_OPTIONS,
  type ChannelOption,
  type EmployeeRange,
  type PriorityOption,
  type ProspectIntakePayload,
} from "@/lib/prospect-intake-types";

const TOTAL_STEPS = 5;

const employeeLabels: Record<EmployeeRange, string> = {
  solo: "Indépendant / seul",
  "2-5": "2 à 5",
  "6-10": "6 à 10",
  "11-50": "11 à 50",
  "51-200": "51 à 200",
  "200+": "Plus de 200",
};

type FormState = {
  companyName: string;
  employeeRange: EmployeeRange | "";
  contactName: string;
  email: string;
  phone: string;
  priorities: PriorityOption[];
  channels: ChannelOption[];
  topPriority: PriorityOption | "";
  optionalDetail: string;
  marketingConsent: boolean;
};

const initialState: FormState = {
  companyName: "",
  employeeRange: "",
  contactName: "",
  email: "",
  phone: "",
  priorities: [],
  channels: [],
  topPriority: "",
  optionalDetail: "",
  marketingConsent: false,
};

function FieldError({ message }: { message?: string }) {
  if (!message) return null;
  return (
    <p className="mt-1 text-sm text-red-400" role="alert">
      {message}
    </p>
  );
}

export function ProspectGateForm({ locale }: { locale: Locale }) {
  const searchParams = useSearchParams();
  const nextUrl = searchParams.get("next");
  const formTopRef = useRef<HTMLDivElement>(null);
  const stepTitleRef = useRef<HTMLHeadingElement>(null);

  const [step, setStep] = useState(1);
  const [form, setForm] = useState<FormState>(initialState);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [destination, setDestination] = useState(`/${locale}`);

  useEffect(() => {
    formTopRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    stepTitleRef.current?.focus();
  }, [step]);

  useEffect(() => {
    if (form.priorities.length === 1) {
      setForm((f) => ({
        ...f,
        topPriority: form.priorities[0]!,
      }));
    } else if (
      form.topPriority &&
      !form.priorities.includes(form.topPriority as PriorityOption)
    ) {
      setForm((f) => ({ ...f, topPriority: "" }));
    }
  }, [form.priorities, form.topPriority]);

  function togglePriority(p: PriorityOption) {
    setForm((f) => {
      const has = f.priorities.includes(p);
      const priorities = has
        ? f.priorities.filter((x) => x !== p)
        : [...f.priorities, p];
      return { ...f, priorities };
    });
  }

  function toggleChannel(c: ChannelOption) {
    setForm((f) => {
      if (c === "none_yet") {
        return { ...f, channels: ["none_yet"] };
      }
      const withoutNone = f.channels.filter((x) => x !== "none_yet");
      const has = withoutNone.includes(c);
      const channels = has
        ? withoutNone.filter((x) => x !== c)
        : [...withoutNone, c];
      return { ...f, channels };
    });
  }

  function validateStep(s: number): boolean {
    const nextErrors: Record<string, string> = {};

    if (s === 1) {
      if (!form.companyName.trim()) {
        nextErrors.companyName = "Indiquez le nom de l'entreprise.";
      }
      if (!form.employeeRange) {
        nextErrors.employeeRange = "Choisissez une taille.";
      }
    }

    if (s === 2) {
      if (!form.contactName.trim()) {
        nextErrors.contactName = "Indiquez votre nom.";
      }
      if (!form.email.trim()) {
        nextErrors.email = "Indiquez votre e-mail.";
      } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim())) {
        nextErrors.email = "E-mail invalide.";
      }
      if (!form.phone.trim()) {
        nextErrors.phone = "Indiquez votre téléphone.";
      }
    }

    if (s === 3 && form.priorities.length === 0) {
      nextErrors.priorities = "Choisissez au moins un objectif.";
    }

    if (s === 4 && form.channels.length === 0) {
      nextErrors.channels = "Choisissez au moins une option.";
    }

    if (s === 5) {
      if (form.priorities.length > 1 && !form.topPriority) {
        nextErrors.topPriority = "Choisissez votre priorité principale.";
      }
    }

    setErrors(nextErrors);

    if (Object.keys(nextErrors).length > 0) {
      const firstKey = Object.keys(nextErrors)[0];
      const el = document.getElementById(firstKey);
      el?.focus();
      return false;
    }

    return true;
  }

  function goNext() {
    if (!validateStep(step)) return;
    setErrors({});
    setStep((s) => Math.min(TOTAL_STEPS, s + 1));
  }

  function goBack() {
    setErrors({});
    setStep((s) => Math.max(1, s - 1));
  }

  async function handleSubmit() {
    if (!validateStep(5)) return;

    setSubmitting(true);
    setSubmitError(null);

    const topPriority =
      form.priorities.length === 1
        ? form.priorities[0]!
        : (form.topPriority as PriorityOption);

    const payload: ProspectIntakePayload = {
      locale,
      companyName: form.companyName,
      contactName: form.contactName,
      email: form.email,
      phone: form.phone,
      employeeRange: form.employeeRange as EmployeeRange,
      priorities: form.priorities,
      topPriority,
      channels: form.channels,
      optionalDetail: form.optionalDetail || undefined,
      marketingConsent: form.marketingConsent,
    };

    try {
      const response = await fetch("/api/prospect-intake", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await response.json();

      if (!response.ok) {
        setSubmitError(
          data.error ||
            "Envoi impossible. Vérifiez votre connexion et réessayez.",
        );
        setSubmitting(false);
        return;
      }

      const dest = getSafeNextPath(nextUrl, locale);
      setDestination(dest);
      setSuccess(true);
      setSubmitting(false);
      window.setTimeout(() => {
        window.location.assign(dest);
      }, 2500);
    } catch {
      setSubmitError("Erreur réseau. Réessayez dans un instant.");
      setSubmitting(false);
    }
  }

  function navigateAfterSuccess() {
    window.location.assign(destination);
  }

  const stepTitles = [
    "Votre entreprise",
    "Comment vous contacter ?",
    "Que souhaitez-vous améliorer ?",
    "Où recevez-vous vos demandes ?",
    "Quelle est votre priorité ?",
  ];

  return (
    <main className="hero-noise min-h-screen bg-[#02050b] px-4 py-5 text-[#f7f8fb] sm:py-7">
      <div ref={formTopRef} className="mx-auto max-w-lg">
        <div className="flex justify-center">
          <Logo locale={locale} />
        </div>

        <h1 className="mt-4 text-center text-lg font-semibold tracking-tight sm:text-xl">
          Parlons de votre entreprise
        </h1>
        <p className="mt-1 text-center text-sm text-zinc-500">
          Quelques questions pour comprendre vos besoins.
        </p>

        {!success && (
          <>
            <p className="mt-5 text-center text-xs font-medium text-brand-300">
              Étape {step} sur {TOTAL_STEPS}
            </p>
            <div className="mt-2 h-1 overflow-hidden rounded-full bg-white/10">
              <div
                className="h-full rounded-full bg-brand-500 transition-all duration-300"
                style={{ width: `${(step / TOTAL_STEPS) * 100}%` }}
              />
            </div>
          </>
        )}

        {success ? (
          <div
            className="mt-8 rounded-2xl border border-brand-400/30 bg-brand-500/10 p-6 text-center"
            role="status"
          >
            <p className="text-lg font-semibold">
              Merci ! Votre demande a bien été enregistrée.
            </p>
            <Button
              type="button"
              onClick={navigateAfterSuccess}
              className="mt-6 h-12 w-full"
            >
              Découvrir VOXO AI
            </Button>
          </div>
        ) : (
          <div className="marketing-surface mt-5 p-5 sm:p-6">
            <h2
              ref={stepTitleRef}
              tabIndex={-1}
              className="text-lg font-semibold outline-none"
            >
              {stepTitles[step - 1]}
            </h2>

            {step === 1 && (
              <div className="mt-4 space-y-4">
                <div>
                  <label htmlFor="companyName" className="text-sm text-zinc-300">
                    Nom de l&apos;entreprise
                  </label>
                  <input
                    id="companyName"
                    autoComplete="organization"
                    value={form.companyName}
                    onChange={(e) =>
                      setForm({ ...form, companyName: e.target.value })
                    }
                    className="marketing-input mt-1"
                  />
                  <FieldError message={errors.companyName} />
                </div>
                <fieldset>
                  <legend className="text-sm text-zinc-300">
                    Nombre d&apos;employés
                  </legend>
                  <div className="mt-2 grid grid-cols-2 gap-2">
                    {EMPLOYEE_RANGES.map((range) => (
                      <button
                        key={range}
                        type="button"
                        onClick={() =>
                          setForm({ ...form, employeeRange: range })
                        }
                        className={`marketing-choice ${
                          form.employeeRange === range
                            ? "marketing-choice-selected"
                            : "marketing-choice-default"
                        }`}
                      >
                        {employeeLabels[range]}
                      </button>
                    ))}
                  </div>
                  <FieldError message={errors.employeeRange} />
                </fieldset>
              </div>
            )}

            {step === 2 && (
              <div className="mt-4 space-y-4">
                <div>
                  <label htmlFor="contactName" className="text-sm text-zinc-300">
                    Nom et prénom
                  </label>
                  <input
                    id="contactName"
                    autoComplete="name"
                    value={form.contactName}
                    onChange={(e) =>
                      setForm({ ...form, contactName: e.target.value })
                    }
                    className="marketing-input mt-1"
                  />
                  <FieldError message={errors.contactName} />
                </div>
                <div>
                  <label htmlFor="email" className="text-sm text-zinc-300">
                    E-mail
                  </label>
                  <input
                    id="email"
                    type="email"
                    inputMode="email"
                    autoComplete="email"
                    value={form.email}
                    onChange={(e) =>
                      setForm({ ...form, email: e.target.value })
                    }
                    className="marketing-input mt-1"
                  />
                  <FieldError message={errors.email} />
                </div>
                <div>
                  <label htmlFor="phone" className="text-sm text-zinc-300">
                    Téléphone
                  </label>
                  <input
                    id="phone"
                    type="tel"
                    inputMode="tel"
                    autoComplete="tel"
                    placeholder="+41 79 000 00 00"
                    value={form.phone}
                    onChange={(e) =>
                      setForm({ ...form, phone: e.target.value })
                    }
                    className="marketing-input mt-1"
                  />
                  <FieldError message={errors.phone} />
                </div>
              </div>
            )}

            {step === 3 && (
              <div className="mt-4">
                <div className="grid gap-2">
                  {PRIORITY_OPTIONS.map((p) => (
                    <button
                      key={p}
                      type="button"
                      onClick={() => togglePriority(p)}
                      className={`marketing-choice ${
                        form.priorities.includes(p)
                          ? "marketing-choice-selected"
                          : "marketing-choice-default"
                      }`}
                    >
                      {PRIORITY_LABELS[p]}
                    </button>
                  ))}
                </div>
                <FieldError message={errors.priorities} />
              </div>
            )}

            {step === 4 && (
              <div className="mt-4">
                <div className="grid gap-2 sm:grid-cols-2">
                  {CHANNEL_OPTIONS.map((c) => (
                    <button
                      key={c}
                      type="button"
                      onClick={() => toggleChannel(c)}
                      className={`marketing-choice ${
                        form.channels.includes(c)
                          ? "marketing-choice-selected"
                          : "marketing-choice-default"
                      }`}
                    >
                      {CHANNEL_LABELS[c]}
                    </button>
                  ))}
                </div>
                <FieldError message={errors.channels} />
              </div>
            )}

            {step === 5 && (
              <div className="mt-4 space-y-4">
                {form.priorities.length > 1 ? (
                  <fieldset>
                    <legend className="text-sm text-zinc-300">
                      Votre priorité principale
                    </legend>
                    <div className="mt-2 grid gap-2">
                      {form.priorities.map((p) => (
                        <label
                          key={p}
                          className={`flex cursor-pointer items-center gap-3 rounded-xl border px-3 py-2.5 text-sm ${
                            form.topPriority === p
                              ? "border-brand-400/60 bg-brand-500/15"
                              : "border-white/10 bg-[#0b111d]"
                          }`}
                        >
                          <input
                            type="radio"
                            name="topPriority"
                            id={p === form.priorities[0] ? "topPriority" : undefined}
                            checked={form.topPriority === p}
                            onChange={() =>
                              setForm({ ...form, topPriority: p })
                            }
                            className="text-brand-500"
                          />
                          {PRIORITY_LABELS[p]}
                        </label>
                      ))}
                    </div>
                    <FieldError message={errors.topPriority} />
                  </fieldset>
                ) : (
                  <p className="rounded-xl border border-white/10 bg-[#0b111d] px-3 py-2.5 text-sm text-zinc-200">
                    Priorité :{" "}
                    <strong>{PRIORITY_LABELS[form.priorities[0]!]}</strong>
                  </p>
                )}

                <div>
                  <label
                    htmlFor="optionalDetail"
                    className="text-sm text-zinc-300"
                  >
                    Un détail à ajouter ? (facultatif)
                  </label>
                  <textarea
                    id="optionalDetail"
                    rows={2}
                    value={form.optionalDetail}
                    onChange={(e) =>
                      setForm({ ...form, optionalDetail: e.target.value })
                    }
                    className="marketing-input mt-1"
                  />
                </div>

                <label className="flex items-start gap-2 text-xs text-zinc-400">
                  <input
                    type="checkbox"
                    checked={form.marketingConsent}
                    onChange={(e) =>
                      setForm({
                        ...form,
                        marketingConsent: e.target.checked,
                      })
                    }
                    className="mt-0.5 h-4 w-4 rounded border-white/20 text-brand-500"
                  />
                  <span>
                    J&apos;accepte de recevoir des actualités et offres de VOXO
                    AI. Je peux me désinscrire à tout moment.
                  </span>
                </label>

                <p className="text-xs leading-5 text-zinc-500">
                  Nous utiliserons vos coordonnées pour vous recontacter au sujet
                  de votre demande.{" "}
                  <Link
                    href={`/${locale}/politique-confidentialite`}
                    className="text-brand-300 underline underline-offset-2"
                  >
                    Politique de confidentialité
                  </Link>
                </p>

                {submitError && (
                  <p className="text-sm text-red-400" role="alert">
                    {submitError}
                  </p>
                )}

                <Button
                  type="button"
                  disabled={submitting}
                  onClick={handleSubmit}
                  className="h-12 w-full"
                >
                  {submitting
                    ? "Envoi en cours…"
                    : "Envoyer et découvrir VOXO AI"}
                </Button>
              </div>
            )}

            {step < 5 && (
              <div className="mt-6 flex gap-3">
                {step > 1 ? (
                  <Button
                    type="button"
                    variant="outline"
                    onClick={goBack}
                    className="h-11 flex-1"
                  >
                    Retour
                  </Button>
                ) : (
                  <span className="flex-1" />
                )}
                <Button
                  type="button"
                  onClick={goNext}
                  className="h-11 flex-1"
                >
                  Continuer
                </Button>
              </div>
            )}

            {step === 5 && (
              <div className="mt-4">
                <Button
                  type="button"
                  variant="outline"
                  onClick={goBack}
                  className="h-11 w-full"
                >
                  Retour
                </Button>
              </div>
            )}
          </div>
        )}

        {!success && (
          <p className="mt-4 text-center text-xs text-zinc-500">
            <Link
              href={`/${locale}/mentions-legales`}
              className="underline underline-offset-2 hover:text-zinc-300"
            >
              Mentions légales
            </Link>
          </p>
        )}
      </div>
    </main>
  );
}
