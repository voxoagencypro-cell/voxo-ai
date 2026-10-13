"use client";

import { FormEvent, useEffect, useMemo, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import {
  logAuthError,
  loginErrorMessage,
  recoveryCallbackUserMessage,
} from "@/lib/auth-login-messages";

type Mode = "login" | "forgot" | "update-password";

export default function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const initialMode = useMemo((): Mode => {
    const mode = searchParams.get("mode");
    if (mode === "update-password") return "update-password";
    if (mode === "forgot") return "forgot";
    return "login";
  }, [searchParams]);

  const [mode, setMode] = useState<Mode>(initialMode);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [infoMessage, setInfoMessage] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const callbackError = recoveryCallbackUserMessage(
      searchParams.get("error"),
    );
    if (callbackError) {
      setErrorMessage(callbackError);
      setMode("login");
    }
  }, [searchParams]);

  async function handleLogin(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    setLoading(true);
    setErrorMessage("");
    setInfoMessage("");

    const supabase = createClient();

    const { error } = await supabase.auth.signInWithPassword({
      email: email.trim(),
      password,
    });

    if (error) {
      logAuthError("signInWithPassword", error);
      setErrorMessage(loginErrorMessage(error));
      setLoading(false);
      return;
    }

    router.push("/dashboard");
    router.refresh();
  }

  async function handleForgotPassword(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    setLoading(true);
    setErrorMessage("");
    setInfoMessage("");

    const response = await fetch("/api/auth/forgot-password", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email: email.trim() }),
    });

    if (!response.ok) {
      setErrorMessage(
        "Impossible d'envoyer l'e-mail de réinitialisation. Vérifiez l'adresse ou réessayez plus tard.",
      );
      setLoading(false);
      return;
    }

    setInfoMessage(
      "Si un compte existe pour cette adresse, un e-mail de réinitialisation vient d'être envoyé. Consultez aussi les spams.",
    );
    setLoading(false);
  }

  async function handleUpdatePassword(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (newPassword.length < 8) {
      setErrorMessage("Le mot de passe doit contenir au moins 8 caractères.");
      return;
    }

    if (newPassword !== confirmPassword) {
      setErrorMessage("Les mots de passe ne correspondent pas.");
      return;
    }

    setLoading(true);
    setErrorMessage("");
    setInfoMessage("");

    const supabase = createClient();
    const { error } = await supabase.auth.updateUser({
      password: newPassword,
    });

    if (error) {
      logAuthError("updateUser password", error);
      setErrorMessage(
        "Impossible de mettre à jour le mot de passe. Recommencez depuis le lien reçu par e-mail.",
      );
      setLoading(false);
      return;
    }

    setInfoMessage("Mot de passe mis à jour. Redirection vers le tableau de bord…");
    router.push("/dashboard");
    router.refresh();
  }

  function switchMode(next: Mode) {
    setMode(next);
    setErrorMessage("");
    setInfoMessage("");
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-[#070B18] px-6 py-12 text-white">
      <div className="w-full max-w-md">
        <div className="mb-8 text-center">
          <h1 className="text-4xl font-bold">VOXO AI</h1>

          <p className="mt-3 text-slate-400">
            {mode === "forgot"
              ? "Réinitialisation du mot de passe administrateur."
              : mode === "update-password"
                ? "Choisissez un nouveau mot de passe."
                : "Connectez-vous à votre espace administrateur."}
          </p>
        </div>

        <section className="rounded-3xl border border-white/10 bg-[#111827] p-8 shadow-2xl">
          {mode === "login" && (
            <form onSubmit={handleLogin} className="space-y-6">
              <EmailField email={email} setEmail={setEmail} />

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
                  className={inputClass}
                />
              </label>

              <Messages error={errorMessage} info={infoMessage} />

              <button type="submit" disabled={loading} className={buttonClass}>
                {loading ? "Connexion..." : "Se connecter"}
              </button>

              <button
                type="button"
                onClick={() => switchMode("forgot")}
                className="w-full text-center text-sm text-blue-400 transition hover:text-blue-300"
              >
                Mot de passe oublié
              </button>
            </form>
          )}

          {mode === "forgot" && (
            <form onSubmit={handleForgotPassword} className="space-y-6">
              <EmailField email={email} setEmail={setEmail} />

              <p className="text-sm leading-6 text-slate-400">
                Nous enverrons un lien sécurisé Supabase à l&apos;adresse
                indiquée. Aucun mot de passe n&apos;est modifié sans ce lien.
              </p>

              <Messages error={errorMessage} info={infoMessage} />

              <button type="submit" disabled={loading} className={buttonClass}>
                {loading ? "Envoi..." : "Envoyer le lien de réinitialisation"}
              </button>

              <button
                type="button"
                onClick={() => switchMode("login")}
                className="w-full text-center text-sm text-slate-400 transition hover:text-slate-200"
              >
                Retour à la connexion
              </button>
            </form>
          )}

          {mode === "update-password" && (
            <form onSubmit={handleUpdatePassword} className="space-y-6">
              <label className="block">
                <span className="text-sm font-medium text-slate-300">
                  Nouveau mot de passe
                </span>
                <input
                  type="password"
                  value={newPassword}
                  onChange={(event) => setNewPassword(event.target.value)}
                  autoComplete="new-password"
                  required
                  minLength={8}
                  className={inputClass}
                />
              </label>

              <label className="block">
                <span className="text-sm font-medium text-slate-300">
                  Confirmer le mot de passe
                </span>
                <input
                  type="password"
                  value={confirmPassword}
                  onChange={(event) => setConfirmPassword(event.target.value)}
                  autoComplete="new-password"
                  required
                  minLength={8}
                  className={inputClass}
                />
              </label>

              <Messages error={errorMessage} info={infoMessage} />

              <button type="submit" disabled={loading} className={buttonClass}>
                {loading ? "Enregistrement..." : "Enregistrer le mot de passe"}
              </button>
            </form>
          )}
        </section>

        <p className="mt-6 text-center text-sm text-slate-600">
          Accès réservé aux administrateurs VOXO AI.
        </p>
      </div>
    </main>
  );
}

function EmailField({
  email,
  setEmail,
}: {
  email: string;
  setEmail: (value: string) => void;
}) {
  return (
    <label className="block">
      <span className="text-sm font-medium text-slate-300">Adresse e-mail</span>
      <input
        type="email"
        value={email}
        onChange={(event) => setEmail(event.target.value)}
        placeholder="voxo.agencypro@gmail.com"
        autoComplete="email"
        required
        className={inputClass}
      />
    </label>
  );
}

function Messages({ error, info }: { error: string; info: string }) {
  return (
    <>
      {error && (
        <div className="rounded-xl border border-red-400/20 bg-red-400/10 px-4 py-3 text-sm text-red-300">
          {error}
        </div>
      )}
      {info && (
        <div className="rounded-xl border border-emerald-400/20 bg-emerald-400/10 px-4 py-3 text-sm text-emerald-200">
          {info}
        </div>
      )}
    </>
  );
}

const inputClass =
  "mt-2 w-full rounded-xl border border-white/10 bg-black/20 px-4 py-3 text-white outline-none transition placeholder:text-slate-600 focus:border-blue-500";

const buttonClass =
  "w-full rounded-xl bg-blue-600 px-5 py-3 font-semibold text-white transition hover:bg-blue-500 disabled:cursor-not-allowed disabled:opacity-60";
