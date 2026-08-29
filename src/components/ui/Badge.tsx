import { cn } from "@/lib/utils";

export function Badge({ children, className }: { children: React.ReactNode; className?: string }) {
  return <span className={cn("inline-flex items-center rounded-full bg-terracotta px-2 py-0.5 text-xs font-semibold text-white", className)}>{children}</span>;
}
