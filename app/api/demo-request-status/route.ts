import { NextResponse } from "next/server";
import { getVerifiedUser, isAdminUser } from "@/lib/dashboard-auth";
import { supabaseAdmin } from "@/lib/supabase/admin";

const allowedStatuses = [
  "new",
  "contacted",
  "scheduled",
  "converted",
  "closed",
];

const allowedSources = ["demo_request", "prospect_intake"] as const;

export async function POST(request: Request) {
  try {
    const user = await getVerifiedUser();

    if (!user) {
      return NextResponse.json({ error: "Non authentifié" }, { status: 401 });
    }

    if (!isAdminUser(user)) {
      return NextResponse.json({ error: "Accès interdit" }, { status: 403 });
    }

    const body = await request.json();
    const { id, status, source } = body;

    if (
      !id ||
      !allowedStatuses.includes(status) ||
      !allowedSources.includes(source)
    ) {
      return NextResponse.json({ error: "Données invalides" }, { status: 400 });
    }

    const table =
      source === "prospect_intake" ? "prospect_intakes" : "demo_requests";

    const { error } = await supabaseAdmin
      .from(table)
      .update({ status })
      .eq("id", id);

    if (error) {
      console.error("Erreur mise à jour statut :", table, error);

      return NextResponse.json({ error: "Erreur serveur" }, { status: 500 });
    }

    return NextResponse.json({
      success: true,
    });
  } catch (error) {
    console.error("Erreur API demo-request-status :", error);

    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 });
  }
}
