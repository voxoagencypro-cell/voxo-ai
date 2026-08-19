"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { Globe2, Menu, X, LogIn } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Logo } from "@/components/logo";
import type { Locale } from "@/lib/i18n";

const locales: Locale[] = ["fr", "en", "de"];

const loginLabels: Record<Locale, string> = {
  fr: "Connexion",
  en: "Login",
  de: "Anmelden",
};

const languageLabels: Record<Locale, string> = {
  fr: "Langue",
  en: "Language",
  de: "Sprache",
};

export function Navbar({
  locale,
  nav,
}: {
  locale: Locale;
  nav: Record<string, string>;
}) {
  const pathname = usePathname();

  const [open, setOpen] = useState(false);
  const [languageOpen, setLanguageOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 18);
    };

    onScroll();

    window.addEventListener("scroll", onScroll, {
      passive: true,
    });

    return () => {
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  const links = [
    [nav.solution, `/${locale}#solution`],
    [nav.sectors, `/${locale}#secteurs`],
    [nav.demo, `/${locale}/demo`],
    [nav.pricing, `/${locale}#tarifs`],
    [nav.faq, `/${locale}#faq`],
  ];

  function getLanguageHref(nextLocale: Locale) {
    if (!pathname) {
      return `/${nextLocale}`;
    }

    const hasLocale = /^\/(fr|en|de)(\/|$)/.test(pathname);

    if (hasLocale) {
      return pathname.replace(
        /^\/(fr|en|de)(?=\/|$)/,
        `/${nextLocale}`,
      );
    }

    return `/${nextLocale}`;
  }

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        scrolled
          ? "border-b border-white/10 bg-[#02050b]/75 shadow-[0_16px_60px_rgba(0,0,0,.38)] backdrop-blur-2xl"
          : "border-b border-white/[.06] bg-[#02050b]/45 backdrop-blur-xl"
      }`}
    >
      <div className="mx-auto flex h-[82px] max-w-[1500px] items-center justify-between px-5 sm:px-8 lg:px-12">
        {/* LOGO */}
        <div className="group relative inline-flex items-center">
          <span className="absolute -inset-5 rounded-full bg-brand-500/0 blur-2xl transition duration-300 group-hover:bg-brand-500/20" />

          <span className="relative">
            <Logo locale={locale} />
          </span>
        </div>

        {/* NAVIGATION DESKTOP */}
        <nav
          className="hidden items-center gap-8 lg:flex"
          aria-label="Navigation principale"
        >
          {links.map(([label, href]) => (
            <a
              key={href}
              href={href}
              className="group relative text-sm font-medium text-zinc-300 transition hover:text-white"
            >
              {label}

              <span className="absolute -bottom-2 left-0 h-px w-0 bg-gradient-to-r from-brand-400 to-cyan-300 transition-all duration-300 group-hover:w-full" />
            </a>
          ))}
        </nav>

        {/* ACTIONS DESKTOP */}
        <div className="hidden items-center gap-3 lg:flex">
          {/* LANGUES */}
          <div className="relative">
            <button
              type="button"
              onClick={() =>
                setLanguageOpen((value) => !value)
              }
              className="flex h-11 items-center gap-2 rounded-xl border border-white/10 bg-white/[.03] px-4 text-sm font-medium text-zinc-300 transition hover:border-white/20 hover:bg-white/[.06] hover:text-white"
            >
              <Globe2 size={17} />

              <span>{locale.toUpperCase()}</span>

              <span className="text-xs text-zinc-500">
                ▾
              </span>
            </button>

            {languageOpen && (
              <div className="absolute right-0 top-[52px] min-w-[130px] overflow-hidden rounded-xl border border-white/10 bg-[#080d18] p-1.5 shadow-2xl">
                {locales.map((item) => (
                  <a
                    key={item}
                    href={getLanguageHref(item)}
                    onClick={() =>
                      setLanguageOpen(false)
                    }
                    className={`flex items-center justify-between rounded-lg px-3 py-2.5 text-sm transition ${
                      item === locale
                        ? "bg-brand-500/15 text-brand-300"
                        : "text-zinc-300 hover:bg-white/[.06] hover:text-white"
                    }`}
                  >
                    <span>
                      {item === "fr" && "Français"}
                      {item === "en" && "English"}
                      {item === "de" && "Deutsch"}
                    </span>

                    <span className="text-xs font-semibold">
                      {item.toUpperCase()}
                    </span>
                  </a>
                ))}
              </div>
            )}
          </div>

          {/* CONNEXION */}
          <a
            href="/login"
            className="flex h-11 items-center gap-2 rounded-xl border border-white/10 px-4 text-sm font-medium text-zinc-300 transition hover:border-brand-400/40 hover:bg-brand-500/10 hover:text-white"
          >
            <LogIn size={17} />
            {loginLabels[locale]}
          </a>

          {/* DEMO */}
          <Button
            href={`/${locale}/demo`}
            className="h-12 px-7 shadow-[0_16px_45px_rgba(24,94,255,.30)] transition hover:-translate-y-0.5 hover:shadow-[0_22px_60px_rgba(24,94,255,.45)]"
          >
            {nav.demo}
          </Button>
        </div>

        {/* MENU MOBILE */}
        <button
          type="button"
          onClick={() => setOpen((value) => !value)}
          aria-label={
            open ? "Fermer le menu" : "Ouvrir le menu"
          }
          aria-expanded={open}
          className="grid h-11 w-11 place-items-center rounded-full border border-white/10 bg-white/[.04] text-white transition hover:border-brand-400/35 hover:bg-brand-500/10 lg:hidden"
        >
          {open ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {/* MENU MOBILE OUVERT */}
      <div
        className={`overflow-hidden border-t border-white/10 bg-[#02050b]/95 backdrop-blur-2xl transition-all duration-300 lg:hidden ${
          open
            ? "max-h-[700px] opacity-100"
            : "max-h-0 opacity-0"
        }`}
      >
        <div className="space-y-2 px-5 py-5">
          {links.map(([label, href]) => (
            <a
              key={href}
              href={href}
              onClick={() => setOpen(false)}
              className="flex items-center justify-between rounded-2xl border border-transparent px-4 py-3.5 text-sm font-medium text-zinc-200 transition hover:border-white/10 hover:bg-white/[.04] hover:text-white"
            >
              {label}

              <span className="text-brand-400">
                →
              </span>
            </a>
          ))}

          {/* LANGUES MOBILE */}
          <div className="mt-3 rounded-2xl border border-white/10 bg-white/[.025] p-3">
            <div className="mb-3 flex items-center gap-2 px-1 text-sm text-zinc-400">
              <Globe2 size={17} />

              {languageLabels[locale]}
            </div>

            <div className="grid grid-cols-3 gap-2">
              {locales.map((item) => (
                <a
                  key={item}
                  href={getLanguageHref(item)}
                  className={`rounded-xl px-3 py-2.5 text-center text-sm font-semibold transition ${
                    item === locale
                      ? "bg-brand-500 text-white"
                      : "bg-white/[.04] text-zinc-300 hover:bg-white/[.08]"
                  }`}
                >
                  {item.toUpperCase()}
                </a>
              ))}
            </div>
          </div>

          {/* CONNEXION MOBILE */}
          <a
            href="/login"
            onClick={() => setOpen(false)}
            className="mt-3 flex h-12 items-center justify-center gap-2 rounded-xl border border-white/10 bg-white/[.04] text-sm font-semibold text-white transition hover:bg-white/[.08]"
          >
            <LogIn size={18} />

            {loginLabels[locale]}
          </a>

          {/* DEMO MOBILE */}
          <Button
            href={`/${locale}/demo`}
            className="mt-2 h-12 w-full"
          >
            {nav.demo}
          </Button>
        </div>
      </div>
    </header>
  );
}