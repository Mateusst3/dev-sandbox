import { useEffect, useRef } from "react";
import type { Message } from "../types";
import { MessageBubble } from "./MessageBubble";
import { TypingBubble } from "./TypingBubble";

export function MessageList({
  messages,
  showTyping,
}: {
  messages: Message[];
  showTyping: boolean;
}) {
  const endRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <div className="no-scrollbar flex h-[420px] flex-col gap-4 overflow-y-auto rounded-xl border border-slate-200 bg-slate-50 p-4 dark:border-slate-800 dark:bg-slate-950">
      {messages.length === 0 && !showTyping ? (
        <div className="flex h-full items-center justify-center text-sm text-slate-500">
          Nenhuma mensagem ainda. Inicie a conversa.
        </div>
      ) : (
        messages.map((message) => (
          <MessageBubble key={message.id} message={message} />
        ))
      )}
      {showTyping ? <TypingBubble /> : null}
      <div ref={endRef} />
    </div>
  );
}
