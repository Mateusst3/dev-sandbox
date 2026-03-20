import { useEffect, useMemo, useState } from "react";
import { api } from "../lib/api";
import type { Chat, Message } from "../types";
import { MessageList } from "../components/MessageList";
import { ChatComposer } from "../components/ChatComposer";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";
import { ChatSidebar } from "../components/ChatSidebar";

export function ChatPage() {
  const [chats, setChats] = useState<Chat[]>([]);
  const [activeChatId, setActiveChatId] = useState<string | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [loadingChats, setLoadingChats] = useState(true);
  const [loadingMessages, setLoadingMessages] = useState(false);
  const [sending, setSending] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [sidebarMounted, setSidebarMounted] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    const loadChats = async () => {
      try {
        const response = await api.get<{ chats: Chat[] }>("/chats");
        setChats(response.data.chats);
        if (response.data.chats.length > 0) {
          setActiveChatId(response.data.chats[0].id);
        }
      } catch (err: any) {
        setError(err?.response?.data?.message ?? "Falha ao carregar conversas");
      } finally {
        setLoadingChats(false);
      }
    };
    loadChats();
  }, []);

  useEffect(() => {
    if (!activeChatId) {
      setMessages([]);
      return;
    }
    const loadMessages = async () => {
      setLoadingMessages(true);
      try {
        const response = await api.get<{ messages: Message[] }>(
          `/chats/${activeChatId}/messages`
        );
        setMessages(response.data.messages);
      } catch (err: any) {
        setError(err?.response?.data?.message ?? "Falha ao carregar mensagens");
      } finally {
        setLoadingMessages(false);
      }
    };
    loadMessages();
  }, [activeChatId]);

  const bumpChat = (chatId: string) => {
    setChats((prev) => {
      const now = new Date().toISOString();
      const updated = prev.map((chat) =>
        chat.id === chatId ? { ...chat, updatedAt: now } : chat
      );
      return updated.sort((a, b) => (a.updatedAt < b.updatedAt ? 1 : -1));
    });
  };

  const createChat = async () => {
    const response = await api.post<Chat>("/chats", {
      title: "Nova conversa",
    });
    setChats((prev) => [response.data, ...prev]);
    setActiveChatId(response.data.id);
    setMessages([]);
    return response.data;
  };

  const handleSelectChat = (chatId: string) => {
    setActiveChatId(chatId);
    closeSidebar();
  };

  const handleNewChat = async () => {
    setError(null);
    try {
      await createChat();
      closeSidebar();
    } catch (err: any) {
      setError(err?.response?.data?.message ?? "Falha ao criar chat");
    }
  };

  const handleRenameChat = async (chatId: string, title: string) => {
    try {
      const response = await api.patch<Chat>(`/chats/${chatId}`, { title });
      setChats((prev) =>
        prev.map((chat) => (chat.id === chatId ? response.data : chat))
      );
    } catch (err: any) {
      setError(err?.response?.data?.message ?? "Falha ao renomear chat");
    }
  };

  const handleDeleteChat = async (chatId: string) => {
    try {
      await api.delete(`/chats/${chatId}`);
      setChats((prev) => {
        const updated = prev.filter((chat) => chat.id !== chatId);
        if (activeChatId === chatId) {
          setActiveChatId(updated[0]?.id ?? null);
          setMessages([]);
        }
        return updated;
      });
    } catch (err: any) {
      setError(err?.response?.data?.message ?? "Falha ao excluir chat");
    }
  };

  const handleSend = async (content: string) => {
    setSending(true);
    setError(null);
    let chatId = activeChatId;
    try {
      if (!chatId) {
        const created = await createChat();
        chatId = created.id;
      }
      const tempUserMessage: Message = {
        id: `temp-${Date.now()}`,
        chatId,
        role: "USER",
        content,
        createdAt: new Date().toISOString(),
      };
      setMessages((prev) => [...prev, tempUserMessage]);
      const response = await api.post<Message>(`/chats/${chatId}/message`, {
        content,
      });
      setMessages((prev) => [...prev, response.data]);
      bumpChat(chatId);
    } catch (err: any) {
      setError(err?.response?.data?.message ?? "Falha ao enviar mensagem");
    } finally {
      setSending(false);
    }
  };

  const emptyState = useMemo(() => {
    if (loadingChats) return "Carregando conversas...";
    if (chats.length === 0) return "Crie sua primeira conversa.";
    if (!activeChatId) return "Selecione uma conversa.";
    return null;
  }, [loadingChats, chats.length, activeChatId]);

  const openSidebar = () => {
    setSidebarMounted(true);
    requestAnimationFrame(() => setSidebarOpen(true));
  };

  const closeSidebar = () => {
    setSidebarOpen(false);
    window.setTimeout(() => setSidebarMounted(false), 220);
  };

  return (
    <div className="flex flex-col gap-6 md:flex-row">
      <div className="flex items-center justify-between md:hidden">
        <button
          type="button"
          onClick={openSidebar}
          className="rounded-md border border-slate-200 bg-white p-2 text-slate-600 shadow-sm transition hover:bg-slate-50 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-300 dark:hover:bg-slate-800"
          aria-label="Abrir menu"
        >
          <svg
            aria-hidden="true"
            viewBox="0 0 24 24"
            className="h-5 w-5"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path d="M3 6h18" />
            <path d="M3 12h18" />
            <path d="M3 18h18" />
          </svg>
        </button>
        <span className="text-sm text-slate-500 dark:text-slate-400">
          {activeChatId ? "Conversas" : "Nova conversa"}
        </span>
      </div>
      <ChatSidebar
        chats={chats}
        activeChatId={activeChatId}
        onSelect={handleSelectChat}
        onNewChat={handleNewChat}
        onRename={handleRenameChat}
        onDelete={handleDeleteChat}
        className="hidden md:block"
      />
      <div className="flex-1">
        <Card>
          <CardHeader>
            <CardTitle>Chat com a IA</CardTitle>
          </CardHeader>
          <CardContent>
            {error ? <p className="mb-4 text-sm text-rose-600">{error}</p> : null}
            {emptyState ? (
              <div className="flex h-[420px] items-center justify-center text-sm text-slate-500 dark:text-slate-400">
                {emptyState}
              </div>
            ) : loadingMessages ? (
              <div className="flex h-[420px] items-center justify-center text-sm text-slate-500 dark:text-slate-400">
                Carregando mensagens...
              </div>
            ) : (
              <MessageList messages={messages} showTyping={sending} />
            )}
            <ChatComposer onSend={handleSend} sending={sending} />
          </CardContent>
        </Card>
      </div>
      {sidebarMounted ? (
        <div className="fixed inset-0 z-40 md:hidden">
          <div
            className={`absolute inset-0 bg-slate-900/40 transition-opacity duration-200 ${
              sidebarOpen ? "opacity-100" : "opacity-0"
            }`}
            onClick={closeSidebar}
          />
          <div
            className={`absolute left-0 top-0 h-full w-72 bg-slate-50 p-4 shadow-xl transition-transform duration-200 dark:bg-slate-950 ${
              sidebarOpen ? "translate-x-0" : "-translate-x-full"
            }`}
          >
            <div className="mb-4 flex items-center justify-between">
              <span className="text-sm font-semibold text-slate-600 dark:text-slate-300">
                Conversas
              </span>
              <button
                type="button"
                onClick={closeSidebar}
                className="rounded-md p-1 text-slate-500 hover:bg-slate-200 dark:hover:bg-slate-800"
                aria-label="Fechar menu"
              >
                <svg
                  aria-hidden="true"
                  viewBox="0 0 24 24"
                  className="h-5 w-5"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path d="M18 6 6 18" />
                  <path d="M6 6l12 12" />
                </svg>
              </button>
            </div>
            <ChatSidebar
              chats={chats}
              activeChatId={activeChatId}
              onSelect={handleSelectChat}
              onNewChat={handleNewChat}
              onRename={handleRenameChat}
              onDelete={handleDeleteChat}
              className="max-w-none"
            />
          </div>
        </div>
      ) : null}
    </div>
  );
}
