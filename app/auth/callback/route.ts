import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

export async function GET(request: Request) {
  const url = new URL(request.url);
  const code = url.searchParams.get("code");
  const origin = url.origin;

  if (!code) {
    return NextResponse.redirect(
      `${origin}/login?error=auth_callback_missing_code`,
    );
  }

  const supabase = await createClient();
  const { error } = await supabase.auth.exchangeCodeForSession(code);

  if (error) {
    console.error("[auth/callback] exchangeCodeForSession:", {
      name: error.name,
      message: error.message,
      status: error.status,
    });

    return NextResponse.redirect(`${origin}/login?error=auth_callback`);
  }

  const type = url.searchParams.get("type");
  if (type === "recovery") {
    return NextResponse.redirect(`${origin}/login?mode=update-password`);
  }

  return NextResponse.redirect(`${origin}/dashboard`);
}
