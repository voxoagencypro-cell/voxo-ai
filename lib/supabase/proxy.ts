import { createServerClient } from "@supabase/ssr";
import { NextResponse, type NextRequest } from "next/server";
import { getAdminEmail, normalizeEmail } from "@/lib/dashboard-auth";

const ADMIN_API_PREFIXES = ["/api/admin-demo-count"];
const ADMIN_API_PATHS = new Set(["/api/demo-request-status"]);

function isAdminApiPath(pathname: string): boolean {
  return (
    ADMIN_API_PREFIXES.some((prefix) => pathname.startsWith(prefix)) ||
    ADMIN_API_PATHS.has(pathname)
  );
}

export async function updateSession(request: NextRequest) {
  let response = NextResponse.next({
    request,
  });

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll();
        },

        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value }) => {
            request.cookies.set(name, value);
          });

          response = NextResponse.next({
            request,
          });

          cookiesToSet.forEach(({ name, value, options }) => {
            response.cookies.set(name, value, options);
          });
        },
      },
    },
  );

  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser();

  const isAuthenticated = Boolean(user && !userError);

  const pathname = request.nextUrl.pathname;
  const isDashboardRoute = pathname.startsWith("/dashboard");
  const isAdminDemandesRoute = pathname.startsWith("/dashboard/demandes-demo");
  const isLoginRoute = pathname === "/login";

  if (isAdminApiPath(pathname)) {
    if (!isAuthenticated) {
      return NextResponse.json({ error: "Non authentifié" }, { status: 401 });
    }

    const adminEmail = getAdminEmail();
    const userEmail = normalizeEmail(user?.email);

    if (!adminEmail || userEmail !== adminEmail) {
      return NextResponse.json({ error: "Accès interdit" }, { status: 403 });
    }
  }

  if (isDashboardRoute && !isAuthenticated) {
    const loginUrl = request.nextUrl.clone();
    loginUrl.pathname = "/login";

    return NextResponse.redirect(loginUrl);
  }

  if (isAdminDemandesRoute && isAuthenticated) {
    const adminEmail = getAdminEmail();
    const userEmail = normalizeEmail(user?.email);

    if (!adminEmail || userEmail !== adminEmail) {
      const dashboardUrl = request.nextUrl.clone();
      dashboardUrl.pathname = "/dashboard";
      return NextResponse.redirect(dashboardUrl);
    }
  }

  const isPasswordResetFlow =
    isLoginRoute &&
    request.nextUrl.searchParams.get("mode") === "update-password";

  if (isLoginRoute && isAuthenticated && !isPasswordResetFlow) {
    const dashboardUrl = request.nextUrl.clone();
    dashboardUrl.pathname = "/dashboard";

    return NextResponse.redirect(dashboardUrl);
  }

  return response;
}
