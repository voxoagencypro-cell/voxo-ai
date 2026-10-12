/**
 * Applique la migration prospect_intakes si SUPABASE_DB_URL ou DATABASE_URL est défini.
 * Sinon, affiche les étapes manuelles (SQL Editor).
 *
 * Usage:
 *   SUPABASE_DB_URL="postgresql://..." node scripts/apply-prospect-intakes.mjs
 */
import { readFileSync } from "fs";
import { resolve, dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const migrationPath = resolve(
  __dirname,
  "../supabase/migrations/20260312_prospect_intakes.sql",
);

const dbUrl = process.env.SUPABASE_DB_URL || process.env.DATABASE_URL;

if (!dbUrl) {
  console.log(`
Migration non appliquée automatiquement (SUPABASE_DB_URL / DATABASE_URL absent).

Étapes Supabase Dashboard :
1. Ouvrir https://supabase.com/dashboard → votre projet VOXO AI
2. SQL Editor → New query
3. Coller le fichier :
   supabase/migrations/20260312_prospect_intakes.sql
4. Run (CREATE IF NOT EXISTS — sans suppression de données)
5. Vérifier : Table Editor → public.prospect_intakes

Variables requises côté app (déjà utilisées par l'API) :
- NEXT_PUBLIC_SUPABASE_URL
- SUPABASE_SECRET_KEY (service_role — insert via API)
`);
  process.exit(0);
}

const sql = readFileSync(migrationPath, "utf8");

try {
  const pg = await import("pg");
  const client = new pg.default.Client({ connectionString: dbUrl });
  await client.connect();
  await client.query(sql);
  await client.end();
  console.log("Migration prospect_intakes appliquée avec succès.");
} catch (error) {
  console.error(
    "Échec migration. Utilisez le SQL Editor Supabase (voir instructions ci-dessus).",
  );
  console.error(error.message);
  process.exit(1);
}
