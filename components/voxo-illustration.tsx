import Image from "next/image";
import { cn } from "@/lib/utils";
import type { VoxoIllustrationAsset } from "@/lib/voxo-marketing-assets";

export function VoxoIllustration({
  asset,
  className,
  priority = false,
  hero = false,
}: {
  asset: VoxoIllustrationAsset;
  className?: string;
  priority?: boolean;
  hero?: boolean;
}) {
  return (
    <figure className={className}>
      <div
        className={cn(
          "overflow-hidden rounded-2xl border border-white/10 bg-[#070c14]",
          hero && "w-full",
        )}
      >
        <Image
          src={asset.src}
          alt={asset.alt}
          width={asset.width}
          height={asset.height}
          className="h-auto w-full"
          sizes={
            hero
              ? "(max-width: 768px) 100vw, (max-width: 1200px) 90vw, 1024px"
              : "(max-width: 768px) 100vw, 50vw"
          }
          quality={90}
          priority={priority}
          loading={priority ? undefined : "lazy"}
        />
      </div>
      <figcaption className="mt-2 text-[11px] leading-4 text-zinc-500 sm:text-xs">
        {asset.caption}
      </figcaption>
    </figure>
  );
}
