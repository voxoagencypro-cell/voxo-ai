import { notFound } from "next/navigation";
import { ServicePage } from "@/components/service-page";
import { isLocale } from "@/lib/i18n";

export default async function AcquisitionPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();

  return (
    <ServicePage
      locale={locale}
      eyebrow="ACQUISITION & PUBLICITÉ"
      title="De la campagne au client suivi"
      intro="L'acquisition est au cœur de notre approche : campagnes, pages de conversion, qualification des demandes et suivi CRM."
      illustration="crmAcquisition"
      sections={[
        {
          title: "Campagnes orientées demandes",
          difficulty:
            "Vous investissez en publicité mais recevez peu de contacts qualifiés, ou du trafic difficile à exploiter.",
          solution:
            "Meta Ads, Google Ads et pages de destination adaptées à votre offre, connectées à vos formulaires et canaux de réponse.",
          benefit:
            "Des demandes mieux ciblées pour votre équipe ou vos agents IA, avec le contexte dès l'entrée.",
        },
        {
          title: "Qualification dès l'entrée",
          difficulty:
            "Les leads arrivent sans informations utiles : besoin flou, pas de rappel, perte de temps à trier.",
          solution:
            "Messagerie, appels et formulaires structurés pour collecter besoin, urgence et coordonnées — alimentation du CRM.",
          benefit:
            "Moins de va-et-vient, priorités claires et relances basées sur des données réelles.",
        },
        {
          title: "Suivi commercial",
          difficulty:
            "Les prospects issus de la pub ne sont pas relancés ou disparaissent entre plusieurs outils.",
          solution:
            "Statuts, historique et relances dans le CRM ou le tableau de bord connecté à vos campagnes.",
          benefit:
            "Continuité entre la dépense publicitaire et le suivi commercial, sans trou dans le parcours.",
        },
      ]}
    />
  );
}
