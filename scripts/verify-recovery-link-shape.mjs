/**
 * Vérifie la forme du lien recovery (hôte + chemin), sans afficher le code ni le secret.
 * Usage: node scripts/verify-recovery-link-shape.mjs user@example.com
 */
import { readFileSync } from "fs";
import { createClient } from "@supabase/supabase-js";

const email = process.argv[2];
if (!email) {
  console.error("Usage: node scripts/verify-recovery-link-shape.mjs email@domaine");
  process.exit(1);
}

const env = Object.fromEntries(
  readFileSync(".env.local", "utf8")
    .split("\n")
    .filter((l) => l && !l.startsWith("#"))
    .map((l) => {
      const i = l.indexOf("=");
      return [l.slice(0, i), l.slice(i + 1)];
    }),
);

const redirectTo = "https://www.voxo-ai.ch/auth/callback?type=recovery";
const admin = createClient(
  env.NEXT_PUBLIC_SUPABASE_URL,
  env.SUPABASE_SECRET_KEY,
  { auth: { autoRefreshToken: false, persistSession: false } },
);

const { data, error } = await admin.auth.admin.generateLink({
  type: "recovery",
  email: email.trim(),
  options: { redirectTo },
});

if (error) {
  console.error("generateLink failed:", error.message);
  process.exit(1);
}

const link = data.properties?.action_link ?? data.action_link;
if (!link) {
  console.error("Pas de action_link dans la réponse.");
  process.exit(1);
}

const parsed = new URL(link);
const redirectParam =
  parsed.searchParams.get("redirect_to") ??
  parsed.searchParams.get("redirect_to_url");

let finalTarget = redirectTo;
if (redirectParam) {
  try {
    finalTarget = decodeURIComponent(redirectParam);
  } catch {
    finalTarget = redirectParam;
  }
}

const target = new URL(finalTarget);
console.log("redirect_to_host:", target.host);
console.log("redirect_to_path:", target.pathname + target.search.split("code=")[0]);
console.log("is_localhost:", target.hostname === "localhost");

if (target.hostname === "localhost") {
  console.error(
    "ÉCHEC: redirect_to pointe encore vers localhost — corrigez Site URL / Redirect URLs dans Supabase (dashboard ou update-supabase-auth-urls.mjs).",
  );
  process.exit(1);
}

if (target.host !== "www.voxo-ai.ch") {
  console.error("ÉCHEC: redirect_to n'utilise pas www.voxo-ai.ch.");
  process.exit(1);
}

if (!target.pathname.includes("/auth/callback")) {
  console.error("ÉCHEC: redirect_to ne cible pas /auth/callback.");
  process.exit(1);
}

console.log("OK — forme du lien recovery compatible production.");
