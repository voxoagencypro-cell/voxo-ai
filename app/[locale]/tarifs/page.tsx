import { Check } from "lucide-react";
import { notFound } from "next/navigation";
import { InnerPage } from "@/components/inner-page";
import { Button } from "@/components/ui/button";
import { isLocale } from "@/lib/i18n";

const pillars = [
  {
    title: "Consulting & cadrage",
    items: [
      "Analyse de vos canaux et de vos processus",
      "Priorisation des leviers (acquisition, agents, CRM)",
      "Feuille de route par phases, sans engagement sur des prix fixes",
    ],
  },
  {
    title: "Mise en place du système",
    items: [
      "Configuration des agents messagerie et vocaux",
      "Connexion agendas, publicité et CRM selon votre stack",
      "Tests, formation et ajustements",
    ],
  },
  {
    title: "Accompagnement continu",
    items: [
      "Optimisation des campagnes et des parcours",
      "Évolution des automatisations et relances",
      "Support et revues régulières",
    ],
  },
];

export default async function TarifsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();

  return (
    <InnerPage
      locale={locale}
      eyebrow="ACCOMPAGNEMENT"
      title="Un devis adapté à votre système IA"
      text="Chaque entreprise combine des briques différentes (publicité, messagerie, appels, agendas, CRM). Nous établissons une proposition sur mesure après avoir compris votre contexte — sans grille tarifaire affichée ni prix inventés."
    >
      <div className="rounded-2xl border border-brand-400/25 bg-brand-500/5 p-6 text-sm leading-7 text-zinc-300">
        Les montants dépendent du périmètre (nombre de canaux, volume de
        demandes, intégrations, accompagnement). Aucun paiement en ligne n&apos;est
        requis à ce stade : la prochaine étape est un échange ou une démo
        gratuite.
      </div>

      <div className="mt-12 grid gap-6 lg:grid-cols-3">
        {pillars.map((block) => (
          <article
            key={block.title}
            className="rounded-2xl border border-white/10 bg-white/[.03] p-6"
          >
            <h2 className="text-xl font-semibold text-white">{block.title}</h2>
            <ul className="mt-4 space-y-3">
              {block.items.map((item) => (
                <li key={item} className="flex gap-3 text-sm text-zinc-400">
                  <Check className="shrink-0 text-brand-400" size={18} />
                  {item}
                </li>
              ))}
            </ul>
          </article>
        ))}
      </div>

      <div className="mt-12 flex flex-wrap gap-4">
        <Button href={`/${locale}/demo`} className="h-12 px-8">
          Réserver une démo gratuite
        </Button>
        <Button href={`/${locale}/contact`} variant="outline" className="h-12 px-8">
          Demander un devis
        </Button>
      </div>
    </InnerPage>
  );
}
