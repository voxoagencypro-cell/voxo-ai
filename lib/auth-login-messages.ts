import type { AuthError } from "@supabase/supabase-js";

/** Messages utilisateur sans exposer de secret ni le mot de passe. */
export function loginErrorMessage(error: AuthError): string {
  const msg = error.message?.toLowerCase() ?? "";

  if (msg.includes("invalid login credentials")) {
    return "E-mail ou mot de passe incorrect.";
  }

  if (msg.includes("email not confirmed")) {
    return "E-mail non confirmé. Consultez votre boîte mail ou utilisez « Mot de passe oublié ».";
  }

  if (msg.includes("too many requests") || error.status === 429) {
    return "Trop de tentatives. Patientez quelques minutes avant de réessayer.";
  }

  return "Connexion impossible pour le moment. Réessayez ou utilisez « Mot de passe oublié ».";
}

/** Journalisation admin (console navigateur) — pas de mot de passe. */
export function logAuthError(context: string, error: AuthError) {
  console.error(`[auth] ${context}`, {
    name: error.name,
    message: error.message,
    status: error.status,
    code: "code" in error ? (error as AuthError & { code?: string }).code : undefined,
  });
}
