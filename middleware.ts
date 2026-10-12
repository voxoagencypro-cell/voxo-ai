import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { updateSession } from "@/lib/supabase/proxy";
import { isLocale } from "@/lib/i18n";
import { getSafeNextPath } from "@/lib/safe-next-path";
import {
  isPublicWithoutGate,
  SITE_ACCESS_COOKIE,
  verifySiteAccessToken,
} from "@/lib/site-access";

const LOCALE_PATTERN = /^\/(fr|de|en)(\/.*)?$/;

function shouldEnforceSiteGate(pathname: string): boolean {
  if (!LOCALE_PATTERN.test(pathname)) {
    return false;
  }

  if (isPublicWithoutGate(pathname)) {
    return false;
  }

  return true;
}

export async function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;

  const sessionResponse = await updateSession(request);

  if (
    pathname.startsWith("/dashboard") ||
    pathname === "/login" ||
    pathname.startsWith("/api/")
  ) {
    return sessionResponse;
  }

  if (!shouldEnforceSiteGate(pathname)) {
    return sessionResponse;
  }

  const token = request.cookies.get(SITE_ACCESS_COOKIE)?.value;
  const access = await verifySiteAccessToken(token);

  if (access) {
    return sessionResponse;
  }

  const localeMatch = pathname.match(/^\/(fr|de|en)/);
  const locale = localeMatch?.[1] ?? "fr";

  const portailUrl = request.nextUrl.clone();
  portailUrl.pathname = `/${locale}/portail`;

  const localeForNext = isLocale(locale) ? locale : "fr";
  const nextPath = getSafeNextPath(
    `${pathname}${request.nextUrl.search}`,
    localeForNext,
  );
  portailUrl.searchParams.set("next", nextPath);

  const redirectResponse = NextResponse.redirect(portailUrl);

  sessionResponse.cookies.getAll().forEach((cookie) => {
    redirectResponse.cookies.set(cookie);
  });

  return redirectResponse;
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
};
