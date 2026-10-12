/**
 * Vérifie qu'un POST test est bien stocké dans prospect_intakes.
 * Usage: node scripts/verify-prospect-intake.mjs
 */
import { readFileSync } from "fs";
import { resolve } from "path";
import { createClient } from "@supabase/supabase-js";

const envPath = resolve(".env.local");
const env = readFileSync(envPath, "utf8");
const get = (k) => env.match(new RegExp(`^${k}=(.*)$`, "m"))?.[1]?.trim();

const url = get("NEXT_PUBLIC_SUPABASE_URL");
const key = get("SUPABASE_SECRET_KEY");
const base = process.env.BASE_URL || "http://localhost:3000";

if (!url || !key) {
  console.error("Variables Supabase manquantes dans .env.local");
  process.exit(1);
}

const unique = Date.now();
const payload = {
  locale: "fr",
  companyName: `Verify Co ${unique}`,
  contactName: "Verify Test",
  email: `verify+${unique}@example.com`,
  phone: "+41790000001",
  employeeRange: "solo",
  priorities: ["acquisition", "messages"],
  topPriority: "acquisition",
  channels: ["email"],
  marketingConsent: false,
};

const res = await fetch(`${base}/api/prospect-intake`, {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify(payload),
});

const body = await res.json();
console.log("API status:", res.status);
console.log("storedIn:", body.storedIn ?? "—");
console.log("prospectId:", body.prospectId ?? "—");

if (!res.ok || body.storedIn !== "prospect_intakes") {
  console.error("ÉCHEC: attendu prospect_intakes.");
  process.exit(1);
}

const sb = createClient(url, key);
const { data, error } = await sb
  .from("prospect_intakes")
  .select("prospect_id, email, company_name, primary_goal")
  .eq("prospect_id", body.prospectId)
  .maybeSingle();

if (error || !data) {
  console.error("ÉCHEC lecture Supabase:", error?.message ?? "ligne absente");
  process.exit(1);
}

console.log("OK — prospect_intakes confirmé pour", data.email);
