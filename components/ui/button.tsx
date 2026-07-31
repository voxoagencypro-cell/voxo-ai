import * as React from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";

type Props = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  href?: string;
  variant?: "brand" | "outline" | "ghost" | "gold";
};

export function Button({ className, variant = "brand", href, children, ...props }: Props) {
  const classes = cn(
    "inline-flex h-12 items-center justify-center rounded-full px-6 text-sm font-semibold transition duration-300 focus:outline-none focus:ring-2 focus:ring-brand-400/70 disabled:opacity-50",
    (variant === "brand" || variant === "gold") && "bg-brand-gradient text-white shadow-[0_12px_38px_rgba(23,104,255,.32)] hover:-translate-y-0.5 hover:brightness-110",
    variant === "outline" && "border border-white/25 bg-white/[.035] text-white hover:border-white/45 hover:bg-white/[.08]",
    variant === "ghost" && "text-zinc-300 hover:text-white",
    className
  );
  if (href) return <Link className={classes} href={href}>{children}</Link>;
  return <button className={classes} {...props}>{children}</button>;
}
