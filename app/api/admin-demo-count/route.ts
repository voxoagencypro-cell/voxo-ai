import { NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase/admin";
import { createClient } from "@/lib/supabase/server";

export async function GET() {
  try {
    const supabase = await createClient();

    const {
      data: { user },
    } = await supabase.auth.getUser();

    const adminEmail =
      process.env.VOXO_ADMIN_EMAIL
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

    const { count, error } = await supabaseAdmin
      .from("demo_requests")
      .select("*", {
        count: "exact",
        head: true,
      })
      .eq("status", "new");

    if (error) {
      console.error(
        "Erreur récupération compteur démos :",
        error
      );

      return NextResponse.json(
        { error: "Erreur serveur" },
        { status: 500 }
      );
    }

    return NextResponse.json({
      count: count ?? 0,
    });
  } catch (error) {
    console.error(
      "Erreur API admin-demo-count :",
      error
    );

    return NextResponse.json(
      { error: "Erreur serveur" },
      { status: 500 }
    );
  }
}