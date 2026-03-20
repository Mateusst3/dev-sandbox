import type { Message } from "../types";
import { cn } from "../lib/utils";

export function MessageBubble({ message }: { message: Message }) {
  const isUser = message.role === "USER";

  return (
    <div className={cn("flex", isUser ? "justify-end" : "justify-start")}>
      <div
        className={cn(
          "max-w-[75%] rounded-2xl px-4 py-3 text-sm leading-relaxed shadow-sm",
          isUser
            ? "bg-slate-900 text-white"
            : "bg-white text-slate-800 border border-slate-200"
        )}
      >
        <p className="whitespace-pre-wrap">{message.content}</p>
        <span
          className={cn(
            "mt-2 block text-xs",
            isUser ? "text-slate-300" : "text-slate-400"
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
