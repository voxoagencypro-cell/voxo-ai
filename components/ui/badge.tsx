import { cn } from "@/lib/utils";

export function Badge({
  className,
  variant = "brand",
  ...props
}: React.HTMLAttributes<HTMLSpanElement> & {
  variant?: "brand" | "neutral";
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-2 rounded-full border px-3 py-1 text-xs font-medium",
        variant === "brand" &&
          "border-brand-400/35 bg-brand-500/10 text-brand-100",
        variant === "neutral" &&
          "border-white/10 bg-white/[.04] text-zinc-300",
        className,
      )}
      {...props}
    />
  );
}
