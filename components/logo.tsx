"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { VOXO_BRAND } from "@/lib/brand-assets";
import { cn } from "@/lib/utils";

type LogoProps = {
  locale?: string;
  /** En-tête : plus compact sur mobile. Pied de page : même logo, taille légèrement réduite. */
  placement?: "header" | "footer";
  className?: string;
};

/** Proportions PNG inchangées — contrôle via hauteur max + object-contain. */
const PORTAL_IMAGE_CLASS =
  "h-auto w-auto max-w-[min(42vw,168px)] object-contain object-left sm:max-w-[200px] lg:max-w-[220px] h-[28px] sm:h-[32px] lg:h-[36px]";

const HEADER_IMAGE_CLASS =
  "h-auto w-auto max-w-[min(52vw,210px)] object-contain object-left sm:max-w-[250px] lg:max-w-[308px] h-[35px] sm:h-[40px] lg:h-[50px]";

const FOOTER_IMAGE_CLASS =
  "h-auto w-auto max-w-[min(52vw,210px)] object-contain object-left sm:max-w-[250px] lg:max-w-[275px] h-[33px] sm:h-[38px]";

const PORTAL_SIZES =
  "(max-width: 640px) 168px, (max-width: 1024px) 200px, 220px";
const HEADER_SIZES =
  "(max-width: 640px) 210px, (max-width: 1024px) 250px, 308px";
const FOOTER_SIZES =
  "(max-width: 640px) 210px, (max-width: 1024px) 250px, 275px";

export function Logo({
  locale = "fr",
  placement = "header",
  className,
}: LogoProps) {
  const pathname = usePathname();
  const onPortal = Boolean(pathname?.includes("/portail"));
  const asset = VOXO_BRAND.logoFull;

  const imageClass = onPortal
    ? PORTAL_IMAGE_CLASS
    : placement === "footer"
      ? FOOTER_IMAGE_CLASS
      : HEADER_IMAGE_CLASS;

  const sizes = onPortal
    ? PORTAL_SIZES
    : placement === "footer"
      ? FOOTER_SIZES
      : HEADER_SIZES;

  return (
    <Link
      href={`/${locale}`}
      className={cn(
        "group inline-flex shrink-0 items-center focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-400/50 focus-visible:ring-offset-2 focus-visible:ring-offset-[#02050b]",
        className,
      )}
      aria-label="VOXO AI — Accueil"
    >
      <Image
        src={asset.src}
        alt={asset.alt}
        width={asset.width}
        height={asset.height}
        priority={placement === "header" && !onPortal}
        className={imageClass}
        sizes={sizes}
      />
    </Link>
  );
}