import * as React from "react";
import { cn } from "@/lib/utils";

export type InputProps = React.InputHTMLAttributes<HTMLInputElement> & {
  invalid?: boolean;
};

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type = "text", invalid, ...props }, ref) => (
    <input
      type={type}
      ref={ref}
      aria-invalid={invalid || undefined}
      className={cn(
        "voxo-input",
        invalid && "border-red-400/60 focus:border-red-400 focus:ring-red-400/25",
        className,
      )}
      {...props}
    />
  ),
);
Input.displayName = "Input";
