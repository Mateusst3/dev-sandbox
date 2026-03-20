import { cn } from "../lib/utils";

type SurfaceProps = {
  variant?: "default" | "muted";
  className?: string;
  children: React.ReactNode;
};

export function Surface({ variant = "default", className, children }: SurfaceProps) {
  return (
    <div
      className={cn(
        "rounded-xl border border-app-border",
        variant === "muted"
          ? "bg-white/70 dark:border-slate-800 dark:bg-slate-900/70"
          : "bg-app-card text-app-ink shadow-panel dark:border-slate-800 dark:bg-slate-900 dark:text-slate-100",
        className
      )}
    >
      {children}
    </div>
  );
}
