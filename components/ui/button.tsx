import * as React from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";

type Props = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  href?: string;
  variant?: "brand" | "outline" | "ghost" | "gold";
  loading?: boolean;
};

export function Button({
  className,
  variant = "brand",
  href,
  children,
  loading,
  disabled,
  ...props
}: Props) {
  const classes = cn(
    "inline-flex h-11 items-center justify-center gap-2 rounded-full px-6 text-sm font-semibold transition duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-400/70 focus-visible:ring-offset-2 focus-visible:ring-offset-[#02050b] disabled:pointer-events-none disabled:opacity-50 active:scale-[0.98]",
    (variant === "brand" || variant === "gold") &&
      "bg-brand-gradient text-white shadow-[0_12px_38px_rgba(23,104,255,.28)] hover:-translate-y-0.5 hover:brightness-110",
    variant === "outline" &&
      "border border-white/20 bg-white/[0.04] text-white hover:border-white/35 hover:bg-white/[0.08]",
    variant === "ghost" && "text-zinc-300 hover:bg-white/[0.05] hover:text-white",
    className,
  );

  const content = loading ? (
    <>
      <span
        className="h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white"
        aria-hidden
      />
      <span>{children}</span>
    </>
  ) : (
    children
  );

  if (href) {
    return (
      <Link className={classes} href={href} aria-busy={loading}>
        {content}
      </Link>
    );
  }

  return (
    <button
      className={classes}
      disabled={disabled || loading}
      aria-busy={loading}
      {...props}
    >
      {content}
    </button>
  );
}
