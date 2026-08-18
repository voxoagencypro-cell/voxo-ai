import { Logo } from "@/components/logo";
import type { Locale } from "@/lib/i18n";

export function Footer({
  locale,
  d,
}: {
  locale: Locale;
  d: any;
}) {
  return (
    <footer className="border-t border-white/[.08] py-12">
      <div className="mx-auto max-w-7xl px-5 lg:px-8">

        <div className="flex flex-col justify-between gap-10 md:flex-row">
          
          {/* VOXO AI */}
          <div>
            <Logo locale={locale} />

            <p className="mt-4 max-w-sm text-sm leading-6 text-zinc-600">
              {d.text}
            </p>
          </div>

          {/* CONTACT */}
          <div>
            <p className="mb-4 text-sm font-semibold text-white">
              Contact
            </p>

            <div className="flex flex-col gap-3 text-sm text-zinc-500">

              <a
                href="mailto:voxo.agencypro@gmail.com"
                className="transition hover:text-white"
              >
                voxo.agencypro@gmail.com
              </a>

              <a
                href="tel:+41795251381"
                className="transition hover:text-white"
              >
                +41 79 525 13 81
              </a>

            </div>
          </div>

          {/* RÉSEAUX SOCIAUX */}
          <div>
            <p className="mb-4 text-sm font-semibold text-white">
              Réseaux sociaux
            </p>

            <div className="flex flex-col gap-3 text-sm text-zinc-500">

              <a
                href="https://www.instagram.com/voxo_ai/"
                target="_blank"
                rel="noopener noreferrer"
                className="transition hover:text-white"
              >
                Instagram
              </a>

              <a
                href="https://www.linkedin.com/company/14453691"
                target="_blank"
                rel="noopener noreferrer"
                className="transition hover:text-white"
              >
                LinkedIn
              </a>

            </div>
          </div>

        </div>

        {/* BAS DU FOOTER */}
        <div className="mt-10 flex flex-col justify-between gap-5 border-t border-white/[.08] pt-6 text-sm text-zinc-600 md:flex-row">

          <div className="flex flex-wrap gap-6">
            <a
              href={`/${locale}/contact`}
              className="transition hover:text-white"
            >
              {d.legal}
            </a>

            <a
              href={`/${locale}/contact`}
              className="transition hover:text-white"
            >
              {d.privacy}
            </a>
          </div>

          <span>
            © {new Date().getFullYear()} VOXO AI
          </span>

        </div>

      </div>
    </footer>
  );
}