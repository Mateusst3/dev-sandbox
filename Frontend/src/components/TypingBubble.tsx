import { TypingDots } from "./TypingDots";

export function TypingBubble() {
  return (
    <div className="flex justify-start">
      <div className="flex items-center gap-2 rounded-2xl border border-app-border bg-app-card px-4 py-3 text-sm text-slate-500 shadow-panel dark:border-slate-800 dark:bg-slate-900 dark:text-slate-400">
        <TypingDots />
      </div>
    </div>
  );
}
