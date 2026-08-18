import { NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase/admin";

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const {
      name,
      company,
      phone,
      email,
      sector,
      message,
      locale,
    } = body;

    if (!name || !company || !phone || !email || !sector) {
      return NextResponse.json(
        { error: "Champs obligatoires manquants." },
        { status: 400 }
      );
    }

    const { error } = await supabaseAdmin
      .from("demo_requests")
      .insert([
        {
          name,
          company,
          phone,
          email,
          sector,
          message: message || null,
          locale: locale || "fr",
          status: "new",
        },
      ]);

    if (error) {
      console.error("Erreur Supabase :", error);

      return NextResponse.json(
        { error: "Erreur lors de l'enregistrement." },
        { status: 500 }
      );
    }

    return NextResponse.json(
      { success: true },
      { status: 200 }
    );
  } catch (error) {
    console.error("Erreur API demo-request :", error);

    return NextResponse.json(
      { error: "Erreur serveur." },
      { status: 500 }
    );
  }
}