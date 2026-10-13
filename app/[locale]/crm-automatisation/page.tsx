import { notFound } from "next/navigation";
import { ServicePage } from "@/components/service-page";
import { VoxoCrmDemo } from "@/components/voxo-crm-demo";
import { isLocale } from "@/lib/i18n";

export default async function CrmPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();

  return (
    <ServicePage
      locale={locale}
      eyebrow="CRM & AUTOMATISATION"
      title="Centraliser pour ne rien laisser passer"
      intro="Fiches clients, demandes, échanges, appels et relances — selon les outils que nous connectons à votre système VOXO AI."
      heroVisual={<VoxoCrmDemo variant="page" />}
      sections={[
        {
          title: "Vue client unifiée",
          difficulty:
            "L'historique est éclaté entre messagerie, appels et tableurs — personne n'a la vue complète.",
          solution:
            "Centralisation dans le CRM ou le tableau de bord VOXO AI lorsque vos canaux l'alimentent.",
          benefit:
            "Chaque reprise humaine s'appuie sur le même contexte (conversations, statuts, rendez-vous).",
        },
        {
          title: "Relances et tâches",
          difficulty:
            "Devis en attente ou prospects froids faute de relance systématique.",
          solution:
            "Automatisations pour rappeler, confirmer un rendez-vous ou escalader vers un humain avec le détail du dossier.",
          benefit:
            "Moins d'oublis et un suivi régulier sans multiplier les outils manuels.",
        },
        {
          title: "Intégrations",
          difficulty:
            "Votre CRM actuel n'est pas connecté aux nouveaux canaux ou agents IA.",
          solution:
            "Connexion à votre CRM, à Supabase / dashboard VOXO AI ou webhooks (n8n) lorsque l'URL est configurée dans votre environnement.",
          benefit:
            "Un flux de données cohérent — nous n'affichons pas une intégration comme active si elle ne l'est pas chez vous.",
        },
      ]}
    />
  );
}
