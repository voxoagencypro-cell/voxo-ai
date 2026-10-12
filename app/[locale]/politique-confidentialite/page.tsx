import { notFound } from "next/navigation";
import { InnerPage } from "@/components/inner-page";
import { isLocale } from "@/lib/i18n";

export default async function PolitiqueConfidentialitePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  if (!isLocale(locale)) {
    notFound();
  }

  return (
    <InnerPage
      locale={locale}
      compactTop
      eyebrow="CONFIDENTIALITÉ"
      title="Politique de confidentialité"
      text="Comment VOXO AI traite les données collectées via le site voxo-ai.ch."
    >
      <div className="prose prose-invert max-w-none space-y-6 text-zinc-400">
        <p>
          VOXO AI (voxo-ai.ch) traite les données que vous transmettez via le
          formulaire d&apos;accès, les demandes de contact et de démonstration
          afin de comprendre votre besoin et de vous recontacter.
        </p>
        <p>
          Les données peuvent inclure : identité de contact, coordonnées
          professionnelles, informations sur votre entreprise, priorités
          métier et réponses aux questions du questionnaire.
        </p>
        <p>
          Base légale : intérêt légitime et, le cas échéant, votre consentement
          pour les communications marketing (case facultative, non cochée par
          défaut).
        </p>
        <p>
          Hébergement et outils : les données sont stockées via Supabase et les
          services configurés pour VOXO AI (CRM, automatisations, webhooks).
          Contact :{" "}
          <a
            href="mailto:voxo.agencypro@gmail.com"
            className="text-brand-300 hover:text-white"
          >
            voxo.agencypro@gmail.com
          </a>
          .
        </p>
        <p>
          Vous pouvez demander l&apos;accès, la rectification ou la suppression
          de vos données en nous écrivant à la même adresse.
        </p>
      </div>
    </InnerPage>
  );
}
