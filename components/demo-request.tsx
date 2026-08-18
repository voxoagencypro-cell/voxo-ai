"use client";

import { FormEvent, useState } from "react";

type DemoRequestProps = {
  locale: string;
};

export function DemoRequest({ locale }: DemoRequestProps) {
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    setLoading(true);
    setError("");

    const form = event.currentTarget;
    const formData = new FormData(form);

    const data = {
      name: formData.get("name"),
      company: formData.get("company"),
      phone: formData.get("phone"),
      email: formData.get("email"),
      sector: formData.get("sector"),
      message: formData.get("message"),
      locale,
    };

    try {
      const response = await fetch("/api/demo-request", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error("Erreur lors de l'envoi");
      }

      setSent(true);
      form.reset();
    } catch (err) {
      console.error(err);

      setError(
        "Impossible d'envoyer votre demande. Veuillez réessayer dans quelques instants."
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="min-h-screen bg-[#02050b] px-5 pb-20 pt-32 text-white">
      <div className="mx-auto max-w-6xl">
        <div className="grid gap-12 lg:grid-cols-2 lg:items-start">
          {/* Partie gauche */}
          <div className="pt-8">
            <div className="mb-5 inline-flex rounded-full border border-blue-500/30 bg-blue-500/10 px-4 py-2 text-sm font-semibold text-blue-400">
              DÉMONSTRATION EN DIRECT
            </div>

            <h1 className="max-w-xl text-4xl font-bold leading-tight sm:text-5xl lg:text-6xl">
              Découvrez VOXO AI
              <span className="block text-blue-500">
                en conditions réelles.
              </span>
            </h1>

            <p className="mt-6 max-w-xl text-lg leading-8 text-gray-400">
              Expliquez-nous votre activité et vos besoins. Notre équipe vous
              présentera VOXO AI lors d&apos;une démonstration personnalisée en
              direct.
            </p>

            <div className="mt-10 space-y-5">
              <Feature
                number="01"
                title="Une démo adaptée à votre entreprise"
                text="Nous préparons un scénario correspondant à votre activité."
              />

              <Feature
                number="02"
                title="Découvrez l'IA en direct"
                text="Testez les appels, les réponses et les automatisations avec notre équipe."
              />

              <Feature
                number="03"
                title="Sans engagement"
                text="La démonstration est gratuite et vous permet de voir concrètement ce que VOXO AI peut automatiser."
              />
            </div>
          </div>

          {/* Formulaire */}
          <div className="rounded-3xl border border-white/10 bg-white/[0.04] p-6 shadow-2xl sm:p-8">
            {!sent ? (
              <>
                <div className="mb-8">
                  <p className="text-sm font-semibold uppercase tracking-[0.2em] text-blue-400">
                    VOXO AI
                  </p>

                  <h2 className="mt-3 text-3xl font-bold">
                    Demander ma démo
                  </h2>

                  <p className="mt-3 text-gray-400">
                    Remplissez le formulaire. Notre équipe vous contactera pour
                    organiser votre démonstration en direct.
                  </p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="grid gap-5 sm:grid-cols-2">
                    <Field
                      label="Nom et prénom"
                      name="name"
                      placeholder="Jean Dupont"
                    />

                    <Field
                      label="Entreprise"
                      name="company"
                      placeholder="Garage Dupont SA"
                    />
                  </div>

                  <div className="grid gap-5 sm:grid-cols-2">
                    <Field
                      label="Téléphone"
                      name="phone"
                      type="tel"
                      placeholder="+41 79 000 00 00"
                    />

                    <Field
                      label="E-mail"
                      name="email"
                      type="email"
                      placeholder="contact@entreprise.ch"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="sector"
                      className="mb-2 block text-sm font-medium text-gray-300"
                    >
                      Secteur d&apos;activité
                    </label>

                    <select
                      id="sector"
                      name="sector"
                      required
                      defaultValue=""
                      className="w-full rounded-xl border border-white/10 bg-[#0b111d] px-4 py-3.5 text-white outline-none transition focus:border-blue-500"
                    >
                      <option value="" disabled>
                        Sélectionnez votre secteur
                      </option>

                      <option value="Restaurant">
                        Restaurant
                      </option>

                      <option value="Garage / Automobile">
                        Garage / Automobile
                      </option>

                      <option value="Institut de beauté / Coiffure">
                        Institut de beauté / Coiffure
                      </option>

                      <option value="Immobilier">
                        Immobilier
                      </option>

                      <option value="Hôtel">
                        Hôtel
                      </option>

                      <option value="Artisan / Service">
                        Artisan / Service
                      </option>

                      <option value="Autre">
                        Autre
                      </option>
                    </select>
                  </div>

                  <div>
                    <label
                      htmlFor="message"
                      className="mb-2 block text-sm font-medium text-gray-300"
                    >
                      Que souhaitez-vous automatiser ?
                    </label>

                    <textarea
                      id="message"
                      name="message"
                      rows={5}
                      placeholder="Ex : répondre aux appels, prendre des rendez-vous, répondre aux questions des clients..."
                      className="w-full resize-none rounded-xl border border-white/10 bg-[#0b111d] px-4 py-3.5 text-white outline-none transition placeholder:text-gray-600 focus:border-blue-500"
                    />
                  </div>

                  {error && (
                    <div className="rounded-xl border border-red-500/20 bg-red-500/10 px-4 py-3 text-sm text-red-400">
                      {error}
                    </div>
                  )}

                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full rounded-xl bg-gradient-to-r from-blue-600 to-blue-400 px-6 py-4 text-base font-bold text-white transition hover:scale-[1.01] hover:shadow-[0_0_40px_rgba(59,130,246,0.25)] disabled:cursor-not-allowed disabled:opacity-60"
                  >
                    {loading
                      ? "Envoi en cours..."
                      : "Demander ma démo en direct"}
                  </button>

                  <p className="text-center text-xs text-gray-500">
                    Démonstration gratuite • Sans engagement
                  </p>
                </form>
              </>
            ) : (
              <div className="flex min-h-[520px] flex-col items-center justify-center text-center">
                <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-emerald-500/10 text-3xl text-emerald-400">
                  ✓
                </div>

                <h2 className="text-3xl font-bold">
                  Demande reçue !
                </h2>

                <p className="mt-4 max-w-md text-lg leading-8 text-gray-400">
                  Merci. Votre demande a bien été enregistrée. L&apos;équipe
                  VOXO AI vous contactera pour organiser votre démonstration
                  personnalisée en direct.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}

function Field({
  label,
  name,
  placeholder,
  type = "text",
}: {
  label: string;
  name: string;
  placeholder: string;
  type?: string;
}) {
  return (
    <div>
      <label
        htmlFor={name}
        className="mb-2 block text-sm font-medium text-gray-300"
      >
        {label}
      </label>

      <input
        id={name}
        name={name}
        type={type}
        required
        placeholder={placeholder}
        className="w-full rounded-xl border border-white/10 bg-[#0b111d] px-4 py-3.5 text-white outline-none transition placeholder:text-gray-600 focus:border-blue-500"
      />
    </div>
  );
}

function Feature({
  number,
  title,
  text,
}: {
  number: string;
  title: string;
  text: string;
}) {
  return (
    <div className="flex gap-4">
      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-blue-500/20 bg-blue-500/10 text-sm font-bold text-blue-400">
        {number}
      </div>

      <div>
        <h3 className="font-semibold text-white">
          {title}
        </h3>

        <p className="mt-1 leading-6 text-gray-500">
          {text}
        </p>
      </div>
    </div>
  );
}