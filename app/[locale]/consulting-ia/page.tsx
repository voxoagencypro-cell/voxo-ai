import { notFound } from "next/navigation";
import { ServicePage } from "@/components/service-page";
import { isLocale } from "@/lib/i18n";
import { MARKETING_PHOTOS } from "@/lib/marketing-images";

export default async function ConsultingIAPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();

  return (
    <ServicePage
      locale={locale}
      eyebrow="CONSULTING IA"
      title="Comprendre votre métier avant la technologie"
      intro="Nous analysons comment vous attirez, traitez et suivez les demandes, puis proposons un plan concret — pas une liste d'outils."
      photo={MARKETING_PHOTOS.consulting}
      sections={[
        {
          title: "Analyse des besoins",
          difficulty:
            "Plusieurs canaux (pub, messages, appels) sans vision claire des goulots : délais, rendez-vous manqués, devis en attente.",
          solution:
            "Entretiens et cartographie de votre parcours actuel, avec priorités liées à l'acquisition et au suivi client.",
          benefit:
            "Décisions basées sur vos contraintes réelles, pas sur une mode technologique.",
        },
        {
          title: "Cartographie des tâches",
          difficulty:
            "L'équipe passe trop de temps sur des réponses répétitives ou des relances manuelles.",
          solution:
            "Identification des tâches automatisables et des moments où un humain doit reprendre la main.",
          benefit:
            "Effort concentré sur les actions à fort impact commercial.",
        },
        {
          title: "Plan d'action",
          difficulty:
            "Difficile de savoir par où commencer entre acquisition, agents IA, agendas et CRM.",
          solution:
            "Roadmap par phases, testable et réversible : acquisition, agents, agendas, CRM et automatisations.",
          benefit:
            "Avancement maîtrisé, avec des jalons que vous pouvez valider à chaque étape.",
        },
      ]}
    />
  );
}
