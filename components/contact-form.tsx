"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import type { Locale } from "@/lib/i18n";

export type ContactPrefill = {
  name?: string;
  company?: string;
  phone?: string;
  email?: string;
};

export function ContactForm({
  locale,
  prefill,
}: {
  locale: Locale;
  prefill?: ContactPrefill;
}) {
  const [name, setName] = useState(prefill?.name ?? "");
  const [company, setCompany] = useState(prefill?.company ?? "");
  const [phone, setPhone] = useState(prefill?.phone ?? "");
  const [email, setEmail] = useState(prefill?.email ?? "");
  const [sector, setSector] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [sent, setSent] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  if (sent) {
    return (
      <div className="rounded-3xl border border-brand-400/30 bg-brand-500/[.07] p-8">
        <h2 className="text-2xl font-semibold">Demande enregistrée</h2>
        <p className="mt-3 text-zinc-400">
          Nous vous recontacterons prochainement à propos de votre demande.
        </p>
      </div>
    );
  }

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitting(true);
    setError(null);

    try {
      const response = await fetch("/api/demo-request", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          company,
          phone,
          email,
          sector: sector || "Non précisé",
          message,
          locale,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.error || "Envoi impossible.");
        setSubmitting(false);
        return;
      }

      setSent(true);
    } catch {
      setError("Erreur réseau. Réessayez dans un instant.");
      setSubmitting(false);
    }
  }

  return (
    <form
      onSubmit={onSubmit}
      className="grid gap-5 rounded-3xl border border-white/10 bg-white/[.025] p-6 sm:p-9"
    >
      <div className="grid gap-5 sm:grid-cols-2">
        <Field label="Nom" value={name} onChange={setName} required />
        <Field
          label="Entreprise"
          value={company}
          onChange={setCompany}
          required
        />
      </div>
      <div className="grid gap-5 sm:grid-cols-2">
        <Field
          label="Téléphone"
          type="tel"
          value={phone}
          onChange={setPhone}
          required
        />
        <Field
          label="E-mail"
          type="email"
          value={email}
          onChange={setEmail}
          required
        />
      </div>
      <Field
        label="Secteur d'activité"
        value={sector}
        onChange={setSector}
      />
      <label className="grid gap-2 text-sm text-zinc-400">
        Message
        <textarea
          required
          rows={6}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          className="rounded-2xl border border-white/10 bg-black/50 px-4 py-3 text-white outline-none focus:border-brand-400/60"
          placeholder="Décrivez votre besoin ou demandez une démo…"
        />
      </label>

      {error && (
        <p className="text-sm text-red-400" role="alert">
          {error}
        </p>
      )}

      <Button type="submit" disabled={submitting} className="h-12">
        {submitting ? "Envoi…" : "Envoyer ma demande"}
      </Button>
    </form>
  );
}

function Field({
  label,
  type = "text",
  value,
  onChange,
  required,
}: {
  label: string;
  type?: string;
  value: string;
  onChange: (v: string) => void;
  required?: boolean;
}) {
  return (
    <label className="grid gap-2 text-sm text-zinc-400">
      {label}
      <input
        required={required}
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="h-12 rounded-2xl border border-white/10 bg-black/50 px-4 text-white outline-none focus:border-brand-400/60"
      />
    </label>
  );
}
