/** Illustrations marketing VOXO (fichiers locaux — pas des photos stock). */

export type VoxoIllustrationAsset = {
  src: string;
  width: number;
  height: number;
  alt: string;
  caption: string;
};

export const VOXO_ILLUSTRATIONS = {
  crmAcquisition: {
    src: "/images/marketing/voxo-crm-acquisition.png",
    width: 1942,
    height: 809,
    alt: "Schéma VOXO : publicité, CRM et suivi des prospects",
    caption:
      "Illustration VOXO AI — exemple de fonctionnement, données fictives",
  },
  acquisitionGoogleMeta: {
    src: "/images/marketing/voxo-acquisition-google-meta.png",
    width: 1942,
    height: 809,
    alt: "Ordinateur présentant des exemples de publicités Google Ads et Meta Ads pour VOXO AI.",
    caption: "Illustration — exemples de campagnes Google Ads et Meta Ads.",
  },
  agentsN8n: {
    src: "/images/marketing/voxo-agents-n8n.png",
    width: 1942,
    height: 809,
    alt: "Workflow illustratif n8n reliant messages et appels à un agent IA, au CRM, aux rendez-vous, aux relances et à un conseiller humain.",
    caption: "Illustration — exemple de workflow n8n.",
  },
} as const satisfies Record<string, VoxoIllustrationAsset>;

export type VoxoIllustrationKey = keyof typeof VOXO_ILLUSTRATIONS;
