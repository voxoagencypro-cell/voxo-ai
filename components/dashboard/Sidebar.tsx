"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";

const menuItems = [
  { label: "Dashboard", href: "/dashboard" },
  { label: "Appels", href: "/dashboard/appels" },
  { label: "Rendez-vous", href: "/dashboard/rendez-vous" },
  { label: "Calendrier", href: "/dashboard/calendrier" },
  { label: "Clients", href: "/dashboard/clients" },
  { label: "Agents IA", href: "/dashboard/agents" },
  { label: "Statistiques", href: "/dashboard/statistiques" },
  { label: "Notifications", href: "/dashboard/notifications" },
  { label: "Paramètres", href: "/dashboard/parametres" },
];

export default function Sidebar() {
  const pathname = usePathname();
  const router = useRouter();

  const [loggingOut, setLoggingOut] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [demoCount, setDemoCount] = useState(0);

  useEffect(() => {
    let interval: ReturnType<typeof setInterval> | null = null;

    async function loadDemoCount() {
      try {
        const response = await fetch(
          `/api/admin-demo-count?t=${Date.now()}`,
          {
            cache: "no-store",
          }
        );

        if (!response.ok) {
          return;
        }

        const data = await response.json();

        setDemoCount(data.count ?? 0);
      } catch (error) {
        console.error(
          "Erreur récupération compteur demandes de démo :",
          error
        );
      }
    }

    async function checkAdmin() {
      const supabase = createClient();

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

      const admin = Boolean(
        adminEmail &&
          userEmail &&
          adminEmail === userEmail
      );

      setIsAdmin(admin);

      if (admin) {
        await loadDemoCount();

        interval = setInterval(() => {
          loadDemoCount();
        }, 2000);
      } else {
        setDemoCount(0);
      }
    }

    checkAdmin();

    function handleFocus() {
      loadDemoCount();
    }

    window.addEventListener("focus", handleFocus);

    return () => {
      window.removeEventListener("focus", handleFocus);

      if (interval) {
        clearInterval(interval);
      }
    };
  }, [pathname]);

  function isActive(href: string) {
    if (href === "/dashboard") {
      return pathname === "/dashboard";
    }

    return (
      pathname === href ||
      pathname.startsWith(`${href}/`)
    );
  }

  async function handleLogout() {
    setLoggingOut(true);

    const supabase = createClient();

    const { error } =
      await supabase.auth.signOut();

    if (error) {
      console.error(
        "Erreur de déconnexion :",
        error
      );

      setLoggingOut(false);
      return;
    }

    router.replace("/login");
    router.refresh();
  }

  return (
    <aside className="flex min-h-screen w-72 shrink-0 flex-col border-r border-white/10 bg-[#050914] p-6 text-white">
      <div className="mb-8">
        <Link href="/dashboard">
          <h1 className="text-3xl font-bold">
            VOXO AI
          </h1>

          <p className="mt-1 text-sm text-slate-500">
            Dashboard
          </p>
        </Link>
      </div>

      <nav className="space-y-2">
        {menuItems.map((item) => {
          const active = isActive(item.href);

          return (
            <Link
              key={item.href}
              href={item.href}
              className={`block rounded-xl px-4 py-3 text-sm font-medium transition ${
                active
                  ? "bg-blue-600 text-white shadow-[0_12px_30px_rgba(37,99,235,.25)]"
                  : "text-slate-400 hover:bg-white/5 hover:text-white"
              }`}
            >
              {item.label}
            </Link>
          );
        })}

        {isAdmin && (
          <>
            <div className="my-4 border-t border-white/10" />

            <p className="px-4 pb-1 text-xs font-semibold uppercase tracking-[.16em] text-blue-400">
              Admin VOXO
            </p>

            <Link
              href="/dashboard/demandes-demo"
              className={`block rounded-xl px-4 py-3 text-sm font-medium transition ${
                isActive("/dashboard/demandes-demo")
                  ? "bg-blue-600 text-white shadow-[0_12px_30px_rgba(37,99,235,.25)]"
                  : "text-slate-400 hover:bg-white/5 hover:text-white"
              }`}
            >
              <div className="flex items-center justify-between gap-3">
                <span>Demandes de démo</span>

                {demoCount > 0 && (
                  <span className="inline-flex min-w-6 items-center justify-center rounded-full bg-red-500 px-2 py-0.5 text-xs font-bold text-white">
                    {demoCount}
                  </span>
                )}
              </div>
            </Link>
          </>
        )}
      </nav>

      <div className="mt-auto pt-10">
        <div className="rounded-xl border border-white/10 bg-white/[.03] p-4">
          <p className="text-xs font-semibold uppercase tracking-[.16em] text-blue-400">
            Agent IA
          </p>

          <div className="mt-3 flex items-center gap-3">
            <span className="relative flex h-3 w-3">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-60" />
              <span className="relative h-3 w-3 rounded-full bg-emerald-400" />
            </span>

            <div>
              <p className="text-sm font-semibold text-white">
                Emma
              </p>

              <p className="text-xs text-slate-500">
                En ligne
              </p>
            </div>
          </div>
        </div>

        <button
          type="button"
          onClick={handleLogout}
          disabled={loggingOut}
          className="mt-4 w-full rounded-xl border border-red-400/15 bg-red-400/[.06] px-4 py-3 text-sm font-semibold text-red-300 transition hover:bg-red-400/10 disabled:cursor-not-allowed disabled:opacity-50"
        >
          {loggingOut
            ? "Déconnexion..."
            : "Se déconnecter"}
        </button>
      </div>
    </aside>
  );
}