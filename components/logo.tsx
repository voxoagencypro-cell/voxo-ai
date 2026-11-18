import Image from "next/image";
import Link from "next/link";
import { VOXO_BRAND } from "@/lib/brand-assets";
import { cn } from "@/lib/utils";

type LogoProps = {
  locale?: string;
  /** En-tête : plus compact sur mobile. Pied de page : même logo, taille légèrement réduite. */
  placement?: "header" | "footer";
  className?: string;
};

export function Logo({
  locale = "fr",
  placement = "header",
  className,
}: LogoProps) {
  const asset = VOXO_BRAND.logoFull;

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
        priority={placement === "header"}
        className={cn(
          "h-auto w-auto max-w-[min(42vw,168px)] object-contain object-left sm:max-w-[200px] lg:max-w-[220px]",
          placement === "header"
            ? "h-[28px] sm:h-[32px] lg:h-[36px]"
            : "h-[26px] sm:h-[30px]",
        )}
        sizes="(max-width: 640px) 168px, (max-width: 1024px) 200px, 220px"
      />
    </Link>
  );
}