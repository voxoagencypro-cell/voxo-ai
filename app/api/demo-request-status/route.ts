import { NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase/admin";
import { createClient } from "@/lib/supabase/server";

const allowedStatuses = [
  "new",
  "contacted",
  "scheduled",
  "converted",
  "closed",
];

export async function POST(request: Request) {
  try {
    const supabase = await createClient();

    const {
      data: { user },
    } = await supabase.auth.getUser();

    const adminEmail =
      process.env.NEXT_PUBLIC_VOXO_ADMIN_EMAIL
        ?.trim()
        .toLowerCase();

    const userEmail =
      user?.email
        ?.trim()
        .toLowerCase();

    if (
      !userEmail ||
      !adminEmail ||
      userEmail !== adminEmail
    ) {
      return NextResponse.json(
        { error: "Accès interdit" },
        { status: 403 }
      );
    }

    const body = await request.json();
    const { id, status } = body;

    if (
      !id ||
      !allowedStatuses.includes(status)
    ) {
      return NextResponse.json(
        { error: "Données invalides" },
        { status: 400 }
      );
    }

    const { error } = await supabaseAdmin
      .from("demo_requests")
      .update({ status })
      .eq("id", id);

    if (error) {
      console.error(
        "Erreur mise à jour statut démo :",
        error
      );

      return NextResponse.json(
        { error: "Erreur serveur" },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
    });
  } catch (error) {
    console.error(
      "Erreur API demo-request-status :",
      error
    );

    return NextResponse.json(
      { error: "Erreur serveur" },
      { status: 500 }
    );
  }
}
