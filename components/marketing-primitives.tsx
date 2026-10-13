import { cn } from "@/lib/utils";
import { VoxoContainer } from "@/components/voxo/container";

export function MarketingEyebrow({ children }: { children: React.ReactNode }) {
  return (
    <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-brand-300 sm:text-xs">
      {children}
    </p>
  );
}

export function MarketingH1({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <h1
      className={cn(
        "text-balance text-[1.75rem] font-semibold leading-[1.14] tracking-[-0.03em] sm:text-4xl lg:text-[2.75rem] lg:leading-[1.1]",
        className,
      )}
    >
      {children}
    </h1>
  );
}

export function MarketingH2({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <h2
      className={cn(
        "max-w-2xl text-balance text-xl font-semibold tracking-[-0.02em] text-white sm:text-2xl lg:text-3xl",
        className,
      )}
    >
      {children}
    </h2>
  );
}

export function MarketingLead({ children }: { children: React.ReactNode }) {
  return (
    <p className="mt-4 max-w-xl text-[15px] leading-7 text-zinc-400 sm:text-base sm:leading-8 lg:text-lg">
      {children}
    </p>
  );
}

export function MarketingCard({
  children,
  className,
  as: Tag = "div",
  href,
}: {
  children: React.ReactNode;
  className?: string;
  as?: "div" | "a";
  href?: string;
}) {
  if (Tag === "a" && href) {
    return (
      <a
        href={href}
        className={cn("group voxo-card-interactive block p-5 sm:p-6", className)}
      >
        {children}
      </a>
    );
  }
  return <div className={cn("voxo-card p-5 sm:p-6", className)}>{children}</div>;
}

export function MarketingSection({
  children,
  className,
  muted = false,
  wide = false,
}: {
  children: React.ReactNode;
  className?: string;
  muted?: boolean;
  wide?: boolean;
}) {
  return (
    <section
      className={cn(
        "border-b border-white/[0.07] py-16 sm:py-20 lg:py-24",
        muted && "bg-white/[0.015]",
        className,
      )}
    >
      <VoxoContainer size={wide ? "wide" : "default"}>{children}</VoxoContainer>
    </section>
  );
}

export function SectionIntro({
  title,
  description,
}: {
  title: React.ReactNode;
  description?: React.ReactNode;
}) {
  return (
    <header className="mb-10 max-w-2xl sm:mb-12">
      {typeof title === "string" ? <MarketingH2>{title}</MarketingH2> : title}
      {description && (
        <p className="mt-3 text-sm leading-7 text-zinc-400 sm:text-base">
          {description}
        </p>
      )}
    </header>
  );
}
