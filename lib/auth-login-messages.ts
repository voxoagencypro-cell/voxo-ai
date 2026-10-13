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

const RECOVERY_CALLBACK_ERRORS: Record<string, string> = {
  recovery_expired:
    "Ce lien de réinitialisation a expiré. Demandez un nouvel e-mail via « Mot de passe oublié ».",
  recovery_invalid:
    "Ce lien de réinitialisation n'est plus valide. Demandez un nouvel e-mail via « Mot de passe oublié ».",
  auth_callback_missing_code:
    "Lien incomplet. Recommencez depuis « Mot de passe oublié ».",
  auth_callback:
    "Impossible de valider le lien reçu par e-mail. Demandez une nouvelle réinitialisation.",
};

export function recoveryCallbackUserMessage(errorKey: string | null): string | null {
  if (!errorKey?.trim()) {
    return null;
  }
  return (
    RECOVERY_CALLBACK_ERRORS[errorKey] ??
    RECOVERY_CALLBACK_ERRORS.auth_callback
  );
}

/** Mappe les query params Supabase (?error_code=otp_expired, etc.). */
export function recoveryErrorKeyFromCallbackQuery(
  errorCode: string | null,
  error: string | null,
): string {
  const code = (errorCode ?? "").toLowerCase();
  const err = (error ?? "").toLowerCase();

  if (
    code.includes("otp_expired") ||
    code.includes("expired") ||
    err.includes("expired")
  ) {
    return "recovery_expired";
  }

  if (
    code.includes("invalid") ||
    err.includes("access_denied") ||
    code.includes("bad_code")
  ) {
    return "recovery_invalid";
  }

  return "auth_callback";
}

/** Mappe l'échec exchangeCodeForSession côté serveur. */
export function recoveryErrorKeyFromAuthError(error: AuthError): string {
  const msg = error.message?.toLowerCase() ?? "";
  const code =
    "code" in error
      ? String((error as AuthError & { code?: string }).code ?? "").toLowerCase()
      : "";

  if (
    msg.includes("expired") ||
    code.includes("otp_expired") ||
    code.includes("expired")
  ) {
    return "recovery_expired";
  }

  if (msg.includes("invalid") || code.includes("invalid")) {
    return "recovery_invalid";
  }

  return "auth_callback";
}
