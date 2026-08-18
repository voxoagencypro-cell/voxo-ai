"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";

export default function LoginPage() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleLogin(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    setLoading(true);
    setErrorMessage("");

    const supabase = createClient();

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      setErrorMessage("E-mail ou mot de passe incorrect.");
      setLoading(false);
      return;
    }

    router.push("/dashboard");
    router.refresh();
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-[#070B18] px-6 py-12 text-white">
      <div className="w-full max-w-md">
        <div className="mb-8 text-center">
          <h1 className="text-4xl font-bold">
            VOXO AI
          </h1>

          <p className="mt-3 text-slate-400">
            Connectez-vous à votre espace administrateur.
          </p>
        </div>

        <section className="rounded-3xl border border-white/10 bg-[#111827] p-8 shadow-2xl">
          <form
            onSubmit={handleLogin}
            className="space-y-6"
          >
            <label className="block">
              <span className="text-sm font-medium text-slate-300">
                Adresse e-mail
              </span>

              <input
                type="email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                placeholder="admin@voxo-ai.ch"
                autoComplete="email"
                required
                className="mt-2 w-full rounded-xl border border-white/10 bg-black/20 px-4 py-3 text-white outline-none transition placeholder:text-slate-600 focus:border-blue-500"
              />
            </label>

            <label className="block">
              <span className="text-sm font-medium text-slate-300">
                Mot de passe
              </span>

              <input
                type="password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                placeholder="Votre mot de passe"
                autoComplete="current-password"
                required
                className="mt-2 w-full rounded-xl border border-white/10 bg-black/20 px-4 py-3 text-white outline-none transition placeholder:text-slate-600 focus:border-blue-500"
              />
            </label>

            {errorMessage && (
              <div className="rounded-xl border border-red-400/20 bg-red-400/10 px-4 py-3 text-sm text-red-300">
                {errorMessage}
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full rounded-xl bg-blue-600 px-5 py-3 font-semibold text-white transition hover:bg-blue-500 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {loading ? "Connexion..." : "Se connecter"}
            </button>
          </form>
        </section>

        <p className="mt-6 text-center text-sm text-slate-600">
          Accès réservé aux administrateurs VOXO AI.
        </p>
      </div>
    </main>
  );
}