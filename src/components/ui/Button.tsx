import { cn } from "@/lib/utils";
import { ButtonHTMLAttributes, forwardRef } from "react";

type Variant = "primary" | "secondary" | "ghost" | "outline";
type Size = "sm" | "md" | "lg";

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
  size?: Size;
}

const base = "inline-flex items-center justify-center font-medium tracking-wide transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ocean focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none rounded-full";

const variants: Record<Variant, string> = {
  primary: "bg-ocean text-white hover:bg-[#0f2e2c] shadow-sm hover:shadow-md active:scale-[0.98]",
  secondary: "bg-terracotta text-white hover:bg-terracotta-dark shadow-sm hover:shadow-md active:scale-[0.98]",
  ghost: "bg-transparent text-charcoal hover:bg-sand-100",
  outline: "border border-driftwood bg-transparent text-charcoal hover:bg-sand-50 hover:border-ocean",
};

const sizes: Record<Size, string> = {
  sm: "h-9 px-4 text-sm",
  md: "h-11 px-6 text-sm",
  lg: "h-12 px-8 text-base",
};

export const Button = forwardRef<HTMLButtonElement, Props>(({ variant = "primary", size = "md", className, ...props }, ref) => {
  return <button ref={ref} className={cn(base, variants[variant], sizes[size], className)} {...props} />;
});
Button.displayName = "Button";
