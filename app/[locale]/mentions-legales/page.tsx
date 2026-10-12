import { notFound } from "next/navigation";
import { InnerPage } from "@/components/inner-page";
import { isLocale } from "@/lib/i18n";

export default async function MentionsLegalesPage({
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
      eyebrow="LÉGAL"
      title="Mentions légales"
      text="Informations légales relatives au site voxo-ai.ch."
    >
      <div className="space-y-6 text-zinc-400">
        <p>
          <strong className="text-white">Éditeur :</strong> VOXO AI — site
          voxo-ai.ch
        </p>
        <p>
          <strong className="text-white">Contact :</strong>{" "}
          <a
            href="mailto:voxo.agencypro@gmail.com"
            className="text-brand-300"
          >
            voxo.agencypro@gmail.com
          </a>{" "}
          · +41 79 525 13 81
        </p>
        <p>
          Le site présente les services de consulting et systèmes IA proposés
          par VOXO AI. Les contenus illustratifs (interfaces, schémas) sont des
          exemples et ne constituent pas un engagement contractuel sur une
          intégration spécifique non déployée pour votre compte.
        </p>
      </div>
    </InnerPage>
  );
}
