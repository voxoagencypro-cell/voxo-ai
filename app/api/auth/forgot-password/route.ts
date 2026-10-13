import { NextResponse } from "next/server";
import { getPasswordRecoveryRedirectTo } from "@/lib/auth-redirect-url";
import { createClient } from "@supabase/supabase-js";

function isValidEmail(value: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as { email?: string };
    const email = body.email?.trim().toLowerCase();

    if (!email || !isValidEmail(email)) {
      return NextResponse.json(
        { error: "Adresse e-mail invalide." },
        { status: 400 },
      );
    }

    const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const key = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY;

    if (!url || !key) {
      return NextResponse.json(
        { error: "Configuration Auth indisponible." },
        { status: 503 },
      );
    }

    const redirectTo = getPasswordRecoveryRedirectTo();

    const supabase = createClient(url, key);
    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo,
    });

    if (error) {
      console.error("[auth/forgot-password] resetPasswordForEmail:", {
        name: error.name,
        message: error.message,
        status: error.status,
        redirectHost: new URL(redirectTo).host,
      });

      return NextResponse.json(
        {
          error:
            "Impossible d'envoyer l'e-mail de réinitialisation pour le moment.",
        },
        { status: 502 },
      );
    }

    return NextResponse.json({
      success: true,
      redirectHost: new URL(redirectTo).host,
    });
  } catch (error) {
    console.error("[auth/forgot-password] unexpected:", error);
    return NextResponse.json({ error: "Erreur serveur." }, { status: 500 });
  }
}
