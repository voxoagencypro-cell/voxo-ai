import Link from "next/link";

export function Logo({ locale = "fr" }: { locale?: string }) {
  const bars = [15, 25, 35, 44, 30, 20, 37, 27, 16];
  return (
    <Link href={`/${locale}`} className="group flex items-center gap-3" aria-label="VOXO AI — Accueil">
      <span className="flex h-10 items-center gap-[3px]" aria-hidden="true">
        {bars.map((height, index) => (
          <span key={index} className="w-[3px] rounded-full bg-brand-500 shadow-[0_0_14px_rgba(23,104,255,.55)] transition group-hover:bg-brand-300" style={{ height }} />
        ))}
      </span>
      <span className="text-xl font-extrabold tracking-tight sm:text-2xl">VOXO <span className="text-brand-500">AI</span></span>
    </Link>
  );
}
