const DEFAULT_SITE_URL = "https://www.voxo-ai.ch";

/** URL publique canonique (production). */
export function getSiteUrl(): string {
  const fromEnv = process.env.NEXT_PUBLIC_SITE_URL?.trim().replace(/\/$/, "");
  return fromEnv || DEFAULT_SITE_URL;
}

/**
 * Origine utilisée pour redirectTo / callbacks Auth.
 * — www.voxo-ai.ch → Site URL canonique
 * — *.vercel.app (Preview) → URL de déploiement courante
 * — local → Site URL si définie, sinon origine de la requête (dev)
 */
export function resolveAuthCallbackOrigin(options: {
  requestOrigin?: string;
  windowOrigin?: string;
}): string {
  const siteUrl = getSiteUrl();
  const deploymentUrl = process.env.NEXT_PUBLIC_DEPLOYMENT_URL?.trim().replace(
    /\/$/,
    "",
  );

  const origin = options.windowOrigin ?? options.requestOrigin ?? siteUrl;
  let hostname: string;
  try {
    hostname = new URL(origin).hostname;
  } catch {
    return siteUrl;
  }

  if (hostname === "www.voxo-ai.ch" || hostname === "voxo-ai.ch") {
    return siteUrl;
  }

  if (hostname.endsWith(".vercel.app")) {
    return deploymentUrl || origin;
  }

  if (hostname === "localhost" || hostname === "127.0.0.1") {
    return siteUrl;
  }

  return origin;
}

export function buildPasswordRecoveryRedirectTo(origin: string): string {
  const base = origin.replace(/\/$/, "");
  return `${base}/auth/callback?type=recovery`;
}

/** Évite de renvoyer l'utilisateur vers localhost depuis le serveur. */
export function resolvePublicOriginFromRequest(request: Request): string {
  const incoming = new URL(request.url);
  return resolveAuthCallbackOrigin({ requestOrigin: incoming.origin });
}
