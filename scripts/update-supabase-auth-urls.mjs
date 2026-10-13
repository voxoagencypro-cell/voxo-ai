/**
 * Met à jour Site URL et Redirect URLs du projet Supabase (Management API).
 * Nécessite SUPABASE_ACCESS_TOKEN (compte supabase.com → Access Tokens).
 *
 * Usage:
 *   SUPABASE_ACCESS_TOKEN=... node scripts/update-supabase-auth-urls.mjs
 */
const PROJECT_REF = "gpdpfmqakszcucpshkrz";
const SITE_URL = "https://www.voxo-ai.ch";
const REDIRECT_URLS = [
  `${SITE_URL}/auth/callback`,
  `${SITE_URL}/**`,
];

const token = process.env.SUPABASE_ACCESS_TOKEN?.trim();
if (!token) {
  console.error(
    "SUPABASE_ACCESS_TOKEN manquant. Créez un token sur supabase.com/dashboard/account/tokens puis relancez.",
  );
  process.exit(1);
}

const res = await fetch(
  `https://api.supabase.com/v1/projects/${PROJECT_REF}/config/auth`,
  {
    method: "PATCH",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      site_url: SITE_URL,
      uri_allow_list: REDIRECT_URLS.join(","),
    }),
  },
);

const text = await res.text();
if (!res.ok) {
  console.error("Échec mise à jour Auth config:", res.status, text.slice(0, 200));
  process.exit(1);
}

console.log("OK — Site URL:", SITE_URL);
console.log("OK — Redirect URLs:", REDIRECT_URLS.join(", "));
