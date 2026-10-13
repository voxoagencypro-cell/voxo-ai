import { NextResponse } from "next/server";
import { isNewLead, normalizeStatus } from "@/lib/admin-inbound-leads";
import { supabaseAdmin } from "@/lib/supabase/admin";
import { createClient } from "@/lib/supabase/server";

const nonTestFilter = "is_test.is.null,is_test.eq.false";

async function countNewInTable(table: "demo_requests" | "prospect_intakes") {
  const { data, error } = await supabaseAdmin
    .from(table)
    .select("status, is_test")
    .or(nonTestFilter);

  if (error) {
    return { error } as const;
  }

  const count = (data ?? []).filter((row) =>
    isNewLead(normalizeStatus(row.status as string | null)),
  ).length;

  return { count } as const;
}

export async function GET() {
  try {
    const supabase = await createClient();

    const {
      data: { user },
    } = await supabase.auth.getUser();

    const adminEmail = process.env.VOXO_ADMIN_EMAIL?.trim().toLowerCase();

    const userEmail = user?.email?.trim().toLowerCase();

    if (!userEmail || !adminEmail || userEmail !== adminEmail) {
      return NextResponse.json({ error: "Accès interdit" }, { status: 403 });
    }

    const [demoResult, intakeResult] = await Promise.all([
      countNewInTable("demo_requests"),
      countNewInTable("prospect_intakes"),
    ]);

    if ("error" in demoResult && demoResult.error) {
      console.error("Erreur compteur demo_requests :", demoResult.error);
      return NextResponse.json({ error: "Erreur serveur" }, { status: 500 });
    }

    if ("error" in intakeResult && intakeResult.error) {
      console.error("Erreur compteur prospect_intakes :", intakeResult.error);
      return NextResponse.json({ error: "Erreur serveur" }, { status: 500 });
    }

    return NextResponse.json({
      count: (demoResult.count ?? 0) + (intakeResult.count ?? 0),
    });
  } catch (error) {
    console.error("Erreur API admin-demo-count :", error);

    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 });
  }
}
