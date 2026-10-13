import { Logo } from "@/components/logo";
import { VoxoContainer } from "@/components/voxo/container";
import type { Locale } from "@/lib/i18n";

export function Footer({
  locale,
  d,
}: {
  locale: Locale;
  d: { text: string; legal: string; privacy: string } | Record<string, unknown>;
}) {
  const copy = d as { text: string; legal: string; privacy: string };
  return (
    <footer className="border-t border-white/[0.07] bg-[#02050b]/80 py-14 backdrop-blur-sm">
      <VoxoContainer size="wide">
        <div className="grid gap-10 md:grid-cols-[1.4fr_1fr_1fr]">
          <div>
            <Logo locale={locale} />
            <p className="mt-4 max-w-sm text-sm leading-7 text-zinc-500">
              {copy.text}
            </p>
          </div>

          <div>
            <p className="text-xs font-semibold uppercase tracking-wide text-zinc-400">
              Contact
            </p>
            <div className="mt-4 flex flex-col gap-2.5 text-sm text-zinc-500">
              <a
                href="mailto:voxo.agencypro@gmail.com"
                className="transition hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-400/50"
              >
                voxo.agencypro@gmail.com
              </a>
              <a
                href="tel:+41795251381"
                className="transition hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-400/50"
              >
                +41 79 525 13 81
              </a>
            </div>
          </div>

          <div>
            <p className="text-xs font-semibold uppercase tracking-wide text-zinc-400">
              Réseaux
            </p>
            <div className="mt-4 flex flex-col gap-2.5 text-sm text-zinc-500">
              <a
                href="https://www.instagram.com/voxo_ai/"
                target="_blank"
                rel="noopener noreferrer"
                className="transition hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-400/50"
              >
                Instagram
              </a>
              <a
                href="https://www.linkedin.com/company/voxo-ai/"
                target="_blank"
                rel="noopener noreferrer"
                className="transition hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-400/50"
              >
                LinkedIn
              </a>
            </div>
          </div>
        </div>

        <div className="mt-12 flex flex-col justify-between gap-4 border-t border-white/[0.07] pt-6 text-sm text-zinc-600 sm:flex-row sm:items-center">
          <div className="flex flex-wrap gap-5">
            <a
              href={`/${locale}/mentions-legales`}
              className="hover:text-zinc-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-400/50"
            >
              {copy.legal}
            </a>
            <a
              href={`/${locale}/politique-confidentialite`}
              className="hover:text-zinc-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-400/50"
            >
              {copy.privacy}
            </a>
          </div>
          <span>© {new Date().getFullYear()} VOXO AI</span>
        </div>
      </VoxoContainer>
    </footer>
  );
}
