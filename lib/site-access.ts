export const SITE_ACCESS_COOKIE = "voxo_site_access";
export const PROSPECT_PROFILE_COOKIE = "voxo_prospect_profile";

const DEFAULT_MAX_AGE_SECONDS = 60 * 60 * 24 * 180; // 180 days

function getSecret(): string | null {
  return process.env.SITE_ACCESS_SECRET?.trim() || null;
}

function toBase64Url(bytes: ArrayBuffer | Uint8Array): string {
  const buffer =
    bytes instanceof Uint8Array ? bytes : new Uint8Array(bytes);
  let binary = "";

  for (let i = 0; i < buffer.length; i++) {
    binary += String.fromCharCode(buffer[i]!);
  }

  return btoa(binary)
    .replace(/\+/g, "-")
    .replace(/\//g, "_")
    .replace(/=+$/, "");
}

function fromBase64Url(value: string): string {
  const padded =
    value.replace(/-/g, "+").replace(/_/g, "/") +
    "=".repeat((4 - (value.length % 4)) % 4);

  return atob(padded);
}

async function signPayload(payload: string, secret: string): Promise<string> {
  const key = await crypto.subtle.importKey(
    "raw",
    new TextEncoder().encode(secret),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign"],
  );

  const signature = await crypto.subtle.sign(
    "HMAC",
    key,
    new TextEncoder().encode(payload),
  );

  return toBase64Url(signature);
}

function timingSafeEqualString(a: string, b: string): boolean {
  if (a.length !== b.length) {
    return false;
  }

  let result = 0;

  for (let i = 0; i < a.length; i++) {
    result |= a.charCodeAt(i) ^ b.charCodeAt(i)!;
  }

  return result === 0;
}

export type SiteAccessToken = {
  prospectId: string;
  exp: number;
};

export async function createSiteAccessToken(
  prospectId: string,
): Promise<string | null> {
  const secret = getSecret();

  if (!secret) {
    return null;
  }

  const exp = Math.floor(Date.now() / 1000) + DEFAULT_MAX_AGE_SECONDS;
  const payload = toBase64Url(
    new TextEncoder().encode(
      JSON.stringify({ prospectId, exp } satisfies SiteAccessToken),
    ),
  );

  const signature = await signPayload(payload, secret);

  return `${payload}.${signature}`;
}

export async function verifySiteAccessToken(
  token: string | undefined,
): Promise<SiteAccessToken | null> {
  if (!token) {
    return null;
  }

  const secret = getSecret();

  if (!secret) {
    return null;
  }

  const [payload, signature] = token.split(".");

  if (!payload || !signature) {
    return null;
  }

  const expected = await signPayload(payload, secret);

  if (!timingSafeEqualString(signature, expected)) {
    return null;
  }

  try {
    const parsed = JSON.parse(fromBase64Url(payload)) as SiteAccessToken;

    if (!parsed.prospectId || typeof parsed.exp !== "number") {
      return null;
    }

    if (parsed.exp < Math.floor(Date.now() / 1000)) {
      return null;
    }

    return parsed;
  } catch {
    return null;
  }
}

export type ProspectProfileCookie = {
  company: string;
  contactName: string;
  email: string;
  phone: string;
};

export async function createProspectProfileCookie(
  profile: ProspectProfileCookie,
): Promise<string | null> {
  const secret = getSecret();

  if (!secret) {
    return null;
  }

  const payload = toBase64Url(
    new TextEncoder().encode(JSON.stringify(profile)),
  );
  const signature = await signPayload(payload, secret);

  return `${payload}.${signature}`;
}

export async function verifyProspectProfileCookie(
  token: string | undefined,
): Promise<ProspectProfileCookie | null> {
  if (!token) {
    return null;
  }

  const secret = getSecret();

  if (!secret) {
    return null;
  }

  const [payload, signature] = token.split(".");

  if (!payload || !signature) {
    return null;
  }

  const expected = await signPayload(payload, secret);

  if (!timingSafeEqualString(signature, expected)) {
    return null;
  }

  try {
    return JSON.parse(fromBase64Url(payload)) as ProspectProfileCookie;
  } catch {
    return null;
  }
}

export function isPublicWithoutGate(pathname: string): boolean {
  const localeMatch = pathname.match(/^\/(fr|de|en)(\/|$)/);

  if (!localeMatch) {
    return false;
  }

  const rest = pathname.slice(localeMatch[0].length - 1) || "/";

  const publicPaths = [
    "/portail",
    "/politique-confidentialite",
    "/mentions-legales",
  ];

  return publicPaths.some(
    (p) => rest === p || rest.startsWith(`${p}/`),
  );
}

export function hasSiteAccessConfigured(): boolean {
  return Boolean(getSecret());
}
