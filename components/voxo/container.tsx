import { cn } from "@/lib/utils";

export function VoxoContainer({
  className,
  size = "default",
  ...props
}: React.HTMLAttributes<HTMLDivElement> & {
  size?: "default" | "wide" | "narrow";
}) {
  return (
    <div
      className={cn(
        "mx-auto w-full px-4 sm:px-6 lg:px-8",
        size === "default" && "max-w-6xl",
        size === "wide" && "max-w-[1480px]",
        size === "narrow" && "max-w-lg",
        className,
      )}
      {...props}
    />
  );
}
