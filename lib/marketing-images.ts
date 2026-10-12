/** Photos Unsplash (licence Unsplash) — ne pas présenter les personnes comme équipe ou clients VOXO. */

export type PhotoCredit = {
  photographer: string;
  profileUrl: string;
};

export type MarketingPhoto = {
  src: string;
  alt: string;
  credit: PhotoCredit;
};

function unsplash(photoId: string, width = 1200) {
  return `https://images.unsplash.com/${photoId}?auto=format&fit=crop&w=${width}&q=75`;
}

export const MARKETING_PHOTOS = {
  acquisition: {
    src: unsplash("photo-1556761175-5973dc0f32e7"),
    alt: "Réunion autour d’un ordinateur pour planifier une campagne",
    credit: {
      photographer: "Austin Distel",
      profileUrl: "https://unsplash.com/@austindistel",
    },
  },
  consulting: {
    src: unsplash("photo-1600880292089-90a7e086ee0c"),
    alt: "Échange de conseil entre professionnels",
    credit: {
      photographer: "LinkedIn Sales Navigator",
      profileUrl: "https://unsplash.com/@linkedin",
    },
  },
  agents: {
    src: unsplash("photo-1423666639041-f5600c06776f"),
    alt: "Personne au téléphone dans un environnement de travail",
    credit: {
      photographer: "Pavan Trikutam",
      profileUrl: "https://unsplash.com/@ptrikutam",
    },
  },
  crm: {
    src: unsplash("photo-1553877522-43269d4ea984"),
    alt: "Collaborateurs travaillant ensemble sur un projet",
    credit: {
      photographer: "Campaign Creators",
      profileUrl: "https://unsplash.com/@campaign_creators",
    },
  },
  clientRelation: {
    src: unsplash("photo-1521791136064-7986c2920216"),
    alt: "Poignée de main après un échange professionnel",
    credit: {
      photographer: "rawpixel",
      profileUrl: "https://unsplash.com/@rawpixel",
    },
  },
  workspace: {
    src: unsplash("photo-1497366811353-6870744d04b2"),
    alt: "Espace de travail moderne sans personnes identifiables",
    credit: {
      photographer: "Luca Bravo",
      profileUrl: "https://unsplash.com/@lucabravo",
    },
  },
} as const satisfies Record<string, MarketingPhoto>;
