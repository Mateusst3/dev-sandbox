import { cn } from "../lib/utils";

export function LandingReveal({
  delay = 0,
  className,
  children,
}: {
  delay?: 0 | 100 | 200 | 300;
  className?: string;
  children: React.ReactNode;
}) {
  const delayClass =
    delay === 100
      ? "animation-delay-100"
      : delay === 200
      ? "animation-delay-200"
      : delay === 300
      ? "animation-delay-300"
      : "";

  return (
    <div className={cn("animate-landing-rise", delayClass, className)}>
      {children}
    </div>
  );
}
