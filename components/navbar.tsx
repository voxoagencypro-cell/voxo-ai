"use client";

import { useEffect, useState } from "react";
import { Globe2, Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Logo } from "@/components/logo";
import type { Locale } from "@/lib/i18n";

export function Navbar({ locale, nav }: { locale: Locale; nav: Record<string, string> }) {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 18);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const links = [
    [nav.solution, "#solution"],
    [nav.sectors, "#secteurs"],
    [nav.demo, `/${locale}/demo`],
    [nav.pricing, "#tarifs"],
    [nav.faq, "#faq"],
  ];

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        scrolled
          ? "border-b border-white/10 bg-[#02050b]/75 shadow-[0_16px_60px_rgba(0,0,0,.38)] backdrop-blur-2xl"
          : "border-b border-white/[.06] bg-[#02050b]/45 backdrop-blur-xl"
      }`}
    >
      <div className="mx-auto flex h-[82px] max-w-[1500px] items-center justify-between px-5 sm:px-8 lg:px-12">
        <div className="group relative inline-flex items-center">
          <span className="absolute -inset-5 rounded-full bg-brand-500/0 blur-2xl transition duration-300 group-hover:bg-brand-500/20" />
          <span className="relative">
            <Logo locale={locale} />
          </span>
        </div>

        <nav className="hidden items-center gap-9 lg:flex" aria-label="Navigation principale">
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

        <div className="hidden items-center gap-4 lg:flex">
          <div className="flex items-center gap-2 text-sm text-zinc-300">
            <Globe2 size={17} />
            <span>{locale.toUpperCase()}</span>
          </div>

          <Button
            href={`/${locale}/demo`}
            className="h-12 px-7 shadow-[0_16px_45px_rgba(24,94,255,.30)] transition hover:-translate-y-0.5 hover:shadow-[0_22px_60px_rgba(24,94,255,.45)]"
          >
            {nav.demo}
          </Button>
        </div>

        <button
          type="button"
          onClick={() => setOpen((value) => !value)}
          aria-label={open ? "Fermer le menu" : "Ouvrir le menu"}
          aria-expanded={open}
          className="grid h-11 w-11 place-items-center rounded-full border border-white/10 bg-white/[.04] text-white transition hover:border-brand-400/35 hover:bg-brand-500/10 lg:hidden"
        >
          {open ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      <div
        className={`overflow-hidden border-t border-white/10 bg-[#02050b]/95 backdrop-blur-2xl transition-all duration-300 lg:hidden ${
          open ? "max-h-[440px] opacity-100" : "max-h-0 opacity-0"
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
              <span className="text-brand-400">→</span>
            </a>
          ))}

          <div className="flex items-center justify-between px-4 py-3 text-sm text-zinc-400">
            <span className="flex items-center gap-2">
              <Globe2 size={17} />
              Langue
            </span>
            <span>{locale.toUpperCase()}</span>
          </div>

          <Button href={`/${locale}/demo`} className="mt-3 h-12 w-full">
            {nav.demo}
          </Button>
        </div>
      </div>
    </header>
  );
}