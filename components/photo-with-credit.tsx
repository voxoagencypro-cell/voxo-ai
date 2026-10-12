import Image from "next/image";
import type { MarketingPhoto } from "@/lib/marketing-images";

export function PhotoWithCredit({
  photo,
  priority = false,
  className = "",
  aspect = "aspect-[16/10]",
}: {
  photo: MarketingPhoto;
  priority?: boolean;
  className?: string;
  aspect?: string;
}) {
  return (
    <figure className={className}>
      <div
        className={`relative overflow-hidden rounded-2xl border border-white/10 ${aspect}`}
      >
        <Image
          src={photo.src}
          alt={photo.alt}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 640px"
          loading={priority ? undefined : "lazy"}
          priority={priority}
        />
      </div>
      <figcaption className="mt-2 text-[11px] leading-4 text-zinc-500">
        Photo{" "}
        <a
          href={photo.credit.profileUrl}
          className="text-zinc-400 underline-offset-2 hover:text-brand-300 hover:underline"
          target="_blank"
          rel="noopener noreferrer"
        >
          {photo.credit.photographer}
        </a>{" "}
        /{" "}
        <a
          href="https://unsplash.com/license"
          className="text-zinc-400 underline-offset-2 hover:text-brand-300 hover:underline"
          target="_blank"
          rel="noopener noreferrer"
        >
          Unsplash
        </a>
      </figcaption>
    </figure>
  );
}
