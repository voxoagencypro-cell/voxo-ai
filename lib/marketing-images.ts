/** Photos Unsplash (licence Unsplash) — ne pas présenter les personnes comme équipe ou clients VOXO. */

export type PhotoCredit = {
  photographer: string;
  profileUrl: string;
};

export type MarketingPhoto = {
  /** Identifiant Unsplash, ex. photo-1556761175-5973dc0f32e7 */
  id: string;
  /** Largeur native vérifiée (fichier JPEG sans paramètre w=). */
  nativeWidth: number;
  /** Hauteur native vérifiée. */
  nativeHeight: number;
  alt: string;
  credit: PhotoCredit;
};

/** Largeurs servies — jamais au-delà de nativeWidth. */
export const MARKETING_SRC_WIDTHS = [640, 960, 1280, 1600, 1920, 2400] as const;

const MIN_NATIVE_WIDTH = 2400;

function unsplashUrl(id: string, requestedWidth: number, nativeWidth: number) {
  const w = Math.min(Math.max(1, requestedWidth), nativeWidth);
  return `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${w}&q=80`;
}

/** URL principale pour next/image (≤ native, pas de faux 4K via w=3840). */
export function marketingPhotoSrc(
  photo: MarketingPhoto,
  displayWidth = 1920,
) {
  return unsplashUrl(photo.id, displayWidth, photo.nativeWidth);
}

export function marketingPhotoSrcSet(photo: MarketingPhoto) {
  const widths = MARKETING_SRC_WIDTHS.filter((w) => w <= photo.nativeWidth);
  const used = widths.length > 0 ? widths : [photo.nativeWidth];
  return used
    .map((w) => `${unsplashUrl(photo.id, w, photo.nativeWidth)} ${w}w`)
    .join(", ");
}

export const MARKETING_PHOTOS = {
  acquisition: {
    id: "photo-1556761175-5973dc0f32e7",
    nativeWidth: 4767,
    nativeHeight: 2681,
    alt: "Réunion autour d’un ordinateur pour planifier une campagne",
    credit: {
      photographer: "Austin Distel",
      profileUrl: "https://unsplash.com/@austindistel",
    },
  },
  consulting: {
    id: "photo-1600880292089-90a7e086ee0c",
    nativeWidth: 6336,
    nativeHeight: 9504,
    alt: "Échange de conseil entre professionnels",
    credit: {
      photographer: "LinkedIn Sales Navigator",
      profileUrl: "https://unsplash.com/@linkedin",
    },
  },
  agents: {
    id: "photo-1560250097-0b93528c311a",
    nativeWidth: 3149,
    nativeHeight: 4724,
    alt: "Professionnel au téléphone dans un cadre de travail",
    credit: {
      photographer: "LinkedIn Sales Navigator",
      profileUrl: "https://unsplash.com/@linkedin",
    },
  },
  crm: {
    id: "photo-1553877522-43269d4ea984",
    nativeWidth: 5418,
    nativeHeight: 3612,
    alt: "Collaborateurs travaillant ensemble sur un projet",
    credit: {
      photographer: "Campaign Creators",
      profileUrl: "https://unsplash.com/@campaign_creators",
    },
  },
  clientRelation: {
    id: "photo-1521791136064-7986c2920216",
    nativeWidth: 6016,
    nativeHeight: 4016,
    alt: "Poignée de main après un échange professionnel",
    credit: {
      photographer: "rawpixel",
      profileUrl: "https://unsplash.com/@rawpixel",
    },
  },
  workspace: {
    id: "photo-1524758631624-e2822e304c36",
    nativeWidth: 3762,
    nativeHeight: 2508,
    alt: "Espace de travail moderne et lumineux",
    credit: {
      photographer: "Raising Humans",
      profileUrl: "https://unsplash.com/@raising_humans",
    },
  },
} as const satisfies Record<string, MarketingPhoto>;

export const MARKETING_PHOTO_MIN_WIDTH = MIN_NATIVE_WIDTH;
