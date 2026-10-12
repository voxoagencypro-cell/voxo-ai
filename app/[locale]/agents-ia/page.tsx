import { notFound } from "next/navigation";
import { ServicePage } from "@/components/service-page";
import { isLocale } from "@/lib/i18n";
import { MARKETING_PHOTOS } from "@/lib/marketing-images";

export default async function AgentsIAPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();

  return (
    <>
      <ServicePage
        locale={locale}
        eyebrow="AGENTS IA"
        title="Messagerie, appels et rendez-vous"
        intro="Des agents IA pour répondre aux demandes fréquentes, qualifier et transférer à un humain lorsque c'est nécessaire."
        photo={MARKETING_PHOTOS.agents}
        sections={[
          {
            title: "Messagerie",
            difficulty:
              "Messages WhatsApp, Instagram ou e-mail sans réponse rapide — clients qui passent ailleurs.",
            solution:
              "Agents sur les canaux que nous configurons pour votre compte, avec réponses aux questions récurrentes et collecte d'informations.",
            benefit:
              "Délais de réponse réduits et demandes structurées pour votre équipe.",
          },
          {
            title: "Appels",
            difficulty:
              "Appels manqués ou file d'attente saturée, sans trace exploitable pour le commercial.",
            solution:
              "Agents vocaux (dont Retell lorsque votre compte est configuré) pour accueillir, qualifier et orienter.",
            benefit:
              "Les appels non décrochés deviennent des demandes suivies plutôt que des opportunités perdues.",
          },
          {
            title: "Rendez-vous & agendas",
            difficulty:
              "Allers-retours pour fixer un créneau, ou rendez-vous oubliés faute de rappel.",
            solution:
              "Prise de rendez-vous et synchronisation Google Calendar lorsque l'intégration est activée pour votre projet.",
            benefit:
              "Agenda plus fiable — les fonctionnalités exactes dépendent de la stack validée avec vous, sans promesse non déployée.",
          },
        ]}
      />
      <div id="rendez-vous" className="sr-only" aria-hidden />
    </>
  );
}
