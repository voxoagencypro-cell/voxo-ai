import { NextResponse } from "next/server";
import {
  recoveryErrorKeyFromAuthError,
  recoveryErrorKeyFromCallbackQuery,
} from "@/lib/auth-login-messages";
import { resolvePublicOriginFromRequest } from "@/lib/auth-redirect-url";
import { createClient } from "@/lib/supabase/server";

function loginRedirect(origin: string, errorKey: string) {
  const params = new URLSearchParams({ error: errorKey });
  return NextResponse.redirect(`${origin}/login?${params.toString()}`);
}

export async function GET(request: Request) {
  const origin = resolvePublicOriginFromRequest(request);
  const url = new URL(request.url);

  const oauthError = url.searchParams.get("error");
  const oauthErrorCode = url.searchParams.get("error_code");

  if (oauthError || oauthErrorCode) {
    const errorKey = recoveryErrorKeyFromCallbackQuery(
      oauthErrorCode,
      oauthError,
    );
    console.error("[auth/callback] OAuth error query:", {
      error: oauthError,
      error_code: oauthErrorCode,
      error_description: url.searchParams.get("error_description"),
    });
    return loginRedirect(origin, errorKey);
  }

  const code = url.searchParams.get("code");

  if (!code) {
    return loginRedirect(origin, "auth_callback_missing_code");
  }

  const supabase = await createClient();
  const { error } = await supabase.auth.exchangeCodeForSession(code);

  if (error) {
    console.error("[auth/callback] exchangeCodeForSession:", {
      name: error.name,
      message: error.message,
      status: error.status,
    });

    return loginRedirect(origin, recoveryErrorKeyFromAuthError(error));
  }

  const type = url.searchParams.get("type");
  if (type === "recovery") {
    return NextResponse.redirect(`${origin}/login?mode=update-password`);
  }

  return NextResponse.redirect(`${origin}/dashboard`);
}
