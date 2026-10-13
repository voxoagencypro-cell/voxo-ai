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
  acquisitionQualificationSuivi: {
    src: "/images/marketing/voxo-acquisition-qualification-suivi.png",
    width: 1942,
    height: 809,
    alt: "Schéma VOXO : acquisition, qualification, rendez-vous et suivi client",
    caption:
      "Illustration VOXO AI — exemple de fonctionnement, données fictives",
  },
  agentsMessagerieAppelsRdv: {
    src: "/images/marketing/voxo-agents-messagerie-appels-rdv.png",
    width: 1942,
    height: 809,
    alt: "Schéma VOXO : messagerie, appels, rendez-vous et transfert vers un conseiller",
    caption:
      "Illustration VOXO AI — exemple de fonctionnement, données fictives",
  },
} as const satisfies Record<string, VoxoIllustrationAsset>;

export type VoxoIllustrationKey = keyof typeof VOXO_ILLUSTRATIONS;
