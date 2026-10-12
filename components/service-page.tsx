import { Button } from "@/components/ui/button";
import { InnerPage } from "@/components/inner-page";
import { PhotoWithCredit } from "@/components/photo-with-credit";
import type { MarketingPhoto } from "@/lib/marketing-images";

export type ServiceSection = {
  title: string;
  difficulty: string;
  solution: string;
  benefit: string;
};

export function ServicePage({
  locale,
  eyebrow,
  title,
  intro,
  sections,
  photo,
}: {
  locale: string;
  eyebrow: string;
  title: string;
  intro: string;
  sections: ServiceSection[];
  photo: MarketingPhoto;
}) {
  return (
    <InnerPage locale={locale} eyebrow={eyebrow} title={title} text={intro}>
      <PhotoWithCredit
        photo={photo}
        hero
        className="mb-10 sm:mb-12"
        aspect="aspect-[21/9] sm:aspect-[2.4/1]"
      />

      <div className="space-y-6">
        {sections.map((section) => (
          <article
            key={section.title}
            className="marketing-card rounded-2xl border border-white/10 bg-white/[.03] p-5 sm:p-7"
          >
            <h2 className="text-lg font-semibold text-white sm:text-xl">
              {section.title}
            </h2>
            <dl className="mt-4 space-y-4 text-sm leading-6">
              <div>
                <dt className="text-xs font-semibold uppercase tracking-wide text-zinc-500">
                  Difficulté
                </dt>
                <dd className="mt-1 text-zinc-300">{section.difficulty}</dd>
              </div>
              <div>
                <dt className="text-xs font-semibold uppercase tracking-wide text-brand-300">
                  Solution VOXO AI
                </dt>
                <dd className="mt-1 text-zinc-300">{section.solution}</dd>
              </div>
              <div>
                <dt className="text-xs font-semibold uppercase tracking-wide text-zinc-500">
                  Intérêt pour votre entreprise
                </dt>
                <dd className="mt-1 text-zinc-400">{section.benefit}</dd>
              </div>
            </dl>
          </article>
        ))}
      </div>

      <div className="mt-10 flex flex-wrap gap-3 sm:mt-12">
        <Button href={`/${locale}/demo`} className="h-11 px-7 sm:h-12 sm:px-8">
          Réserver une démo gratuite
        </Button>
        <Button
          href={`/${locale}/contact`}
          variant="outline"
          className="h-11 px-7 sm:h-12 sm:px-8"
        >
          Contact
        </Button>
      </div>
    </InnerPage>
  );
}
