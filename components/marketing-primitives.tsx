import { cn } from "@/lib/utils";

export function MarketingEyebrow({ children }: { children: React.ReactNode }) {
  return (
    <p className="text-xs font-semibold tracking-[.22em] text-brand-300">
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
        "text-balance text-3xl font-semibold leading-[1.12] tracking-[-.03em] sm:text-4xl lg:text-[2.65rem]",
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
        "text-2xl font-semibold tracking-[-.02em] text-white sm:text-3xl",
        className,
      )}
    >
      {children}
    </h2>
  );
}

export function MarketingLead({ children }: { children: React.ReactNode }) {
  return (
    <p className="mt-4 max-w-xl text-base leading-7 text-zinc-400 sm:text-lg sm:leading-8">
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
  const base =
    "rounded-2xl border border-white/10 bg-white/[.03] transition duration-200 hover:border-brand-400/35 hover:bg-brand-500/[.05]";
  if (Tag === "a" && href) {
    return (
      <a href={href} className={cn(base, "block p-5 sm:p-6", className)}>
        {children}
      </a>
    );
  }
  return <div className={cn(base, "p-5 sm:p-6", className)}>{children}</div>;
}

export function MarketingSection({
  children,
  className,
  muted = false,
}: {
  children: React.ReactNode;
  className?: string;
  muted?: boolean;
}) {
  return (
    <section
      className={cn(
        "border-b border-white/[.08] py-14 sm:py-16 lg:py-20",
        muted && "bg-white/[.02]",
        className,
      )}
    >
      <div className="mx-auto max-w-6xl px-5 lg:px-8">{children}</div>
    </section>
  );
}
