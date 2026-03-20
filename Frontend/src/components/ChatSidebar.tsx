import { useState } from "react";
import { Button } from "./ui/button";
import type { Chat } from "../types";
import { cn } from "../lib/utils";

type ChatSidebarProps = {
  chats: Chat[];
  activeChatId: string | null;
  onSelect: (chatId: string) => void;
  onNewChat: () => void;
  onRename: (chatId: string, title: string) => void;
  onDelete: (chatId: string) => void;
  className?: string;
};

export function ChatSidebar({
  chats,
  activeChatId,
  onSelect,
  onNewChat,
  onRename,
  onDelete,
  className,
}: ChatSidebarProps) {
  const [actionsChatId, setActionsChatId] = useState<string | null>(null);

  return (
    <aside className={cn("w-full max-w-[260px] shrink-0", className)}>
      <div className="rounded-2xl border border-app-border bg-app-card p-4 shadow-panel dark:border-slate-800 dark:bg-slate-900">
        <div className="flex items-center justify-between">
          <h2 className="text-sm font-semibold uppercase tracking-widest text-slate-400 dark:text-slate-500">
            Conversas
          </h2>
          <Button variant="ghost" size="sm" onClick={onNewChat}>
            Novo
          </Button>
        </div>
        <div className="mt-4 flex max-h-[520px] flex-col gap-2 overflow-y-auto no-scrollbar">
          {chats.length === 0 ? (
            <p className="text-sm text-slate-500">Nenhuma conversa.</p>
          ) : (
            chats.map((chat) => (
              <div
                key={chat.id}
                className={cn(
                  "group flex items-center justify-between gap-2 rounded-lg border border-transparent px-3 py-2 text-left text-sm transition",
                  chat.id === activeChatId
                    ? "bg-slate-900 text-white dark:bg-slate-100 dark:text-slate-900"
                    : "text-slate-700 hover:border-app-border hover:bg-slate-50 dark:text-slate-200 dark:hover:border-slate-800 dark:hover:bg-slate-800"
                )}
              >
                <button
                  type="button"
                  onClick={() => {
                    setActionsChatId(null);
                    onSelect(chat.id);
                  }}
                  className="flex-1 text-left"
                >
                  <div className="truncate font-medium">{chat.title}</div>
                  <div className="text-xs text-slate-400 dark:text-slate-500">
                    {new Date(chat.updatedAt).toLocaleDateString("pt-BR", {
                      day: "2-digit",
                      month: "short",
                    })}
                  </div>
                </button>
                {actionsChatId === chat.id ? (
                  <div className="flex items-center gap-1">
                    <button
                      type="button"
                      onClick={(event) => {
                        event.stopPropagation();
                        const title = window.prompt("Novo nome", chat.title);
                        if (title && title.trim()) {
                          onRename(chat.id, title.trim());
                        }
                        setActionsChatId(null);
                      }}
                      className="rounded-md p-1 text-slate-200 transition hover:bg-white/10"
                      aria-label="Renomear conversa"
                      title="Renomear"
                    >
                      <svg
                        aria-hidden="true"
                        viewBox="0 0 24 24"
                        className="h-4 w-4"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                      >
                        <path d="M12 20h9" />
                        <path d="M16.5 3.5a2.12 2.12 0 0 1 3 3L7 19l-4 1 1-4Z" />
                      </svg>
                    </button>
                    <button
                      type="button"
                      onClick={(event) => {
                        event.stopPropagation();
                        if (window.confirm("Excluir esta conversa?")) {
                          onDelete(chat.id);
                        }
                        setActionsChatId(null);
                      }}
                      className="rounded-md p-1 text-rose-200 transition hover:bg-rose-500/10"
                      aria-label="Excluir conversa"
                      title="Excluir"
                    >
                      <svg
                        aria-hidden="true"
                        viewBox="0 0 24 24"
                        className="h-4 w-4"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                      >
                        <path d="M3 6h18" />
                        <path d="M8 6V4h8v2" />
                        <path d="M10 11v6" />
                        <path d="M14 11v6" />
                        <path d="M5 6l1 14h12l1-14" />
                      </svg>
                    </button>
                  </div>
                ) : (
                  <button
                    type="button"
                    onClick={(event) => {
                      event.stopPropagation();
                      setActionsChatId((current) =>
                        current === chat.id ? null : chat.id
                      );
                    }}
                    className="rounded-md p-1 text-slate-200/70 opacity-0 transition hover:bg-white/10 group-hover:opacity-100"
                    aria-label="Acoes da conversa"
                    title="Acoes"
                  >
                    <svg
                      aria-hidden="true"
                      viewBox="0 0 24 24"
                      className="h-4 w-4"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                    >
                      <path d="M12 20h9" />
                      <path d="M16.5 3.5a2.12 2.12 0 0 1 3 3L7 19l-4 1 1-4Z" />
                    </svg>
                  </button>
                )}
              </div>
            ))
          )}
        </div>
      </div>
    </aside>
  );
}
