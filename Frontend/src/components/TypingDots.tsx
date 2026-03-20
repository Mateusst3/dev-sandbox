export function TypingDots() {
  return (
    <div className="flex items-center gap-1 text-slate-400">
      <span className="h-1.5 w-1.5 animate-typing-bounce rounded-full bg-current" />
      <span className="h-1.5 w-1.5 animate-typing-bounce rounded-full bg-current animation-delay-100" />
      <span className="h-1.5 w-1.5 animate-typing-bounce rounded-full bg-current animation-delay-200" />
    </div>
  );
}
