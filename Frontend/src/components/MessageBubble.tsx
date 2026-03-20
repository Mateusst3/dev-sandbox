import { useEffect, useRef, useState } from "react";
import type { Message } from "../types";
import { cn } from "../lib/utils";

export function MessageBubble({ message }: { message: Message }) {
  const isUser = message.role === "USER";
  const contentRef = useRef<HTMLParagraphElement | null>(null);
  const [expanded, setExpanded] = useState(false);
  const [overflowing, setOverflowing] = useState(false);

  useEffect(() => {
    const el = contentRef.current;
    if (!el) return;
    setOverflowing(el.scrollHeight > el.clientHeight);
  }, [message.content, expanded]);

  return (
    <div className={cn("flex", isUser ? "justify-end" : "justify-start")}>
      <div
        className={cn(
          "relative w-full max-w-[520px] rounded-2xl px-4 py-3 text-sm leading-relaxed shadow-sm",
          isUser
            ? "bg-slate-900 text-white dark:bg-slate-100 dark:text-slate-900"
            : "border border-app-border bg-app-card text-slate-800 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-100"
        )}
      >
        <p
          ref={contentRef}
          className={cn(
            "whitespace-pre-wrap break-words",
            expanded ? "" : "line-clamp-8"
          )}
        >
          {message.content}
        </p>
        {overflowing ? (
          <button
            type="button"
            onClick={() => setExpanded((value) => !value)}
            className={cn(
              "mt-2 text-xs font-medium",
              isUser
                ? "text-white/80 hover:text-white"
                : "text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-200"
            )}
          >
            {expanded ? "Ver menos" : "Ver mais"}
          </button>
        ) : null}
        <span
          className={cn(
            "mt-2 block text-xs",
            isUser ? "text-white/70" : "text-slate-400"
          )}
        >
          {new Date(message.createdAt).toLocaleTimeString("pt-BR", {
            hour: "2-digit",
            minute: "2-digit",
          })}
        </span>
      </div>
    </div>
  );
}
