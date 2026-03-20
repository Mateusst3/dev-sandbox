export function TypingBubble() {
  return (
    <div className="flex justify-start">
      <div className="flex items-center gap-1 rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-500 shadow-sm">
        <span className="typing-dot" />
        <span className="typing-dot typing-dot--delay" />
        <span className="typing-dot typing-dot--delay-2" />
      </div>
    </div>
  );
}
