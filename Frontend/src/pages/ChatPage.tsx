import { useEffect, useState } from "react";
import { api } from "../lib/api";
import type { Message } from "../types";
import { MessageList } from "../components/MessageList";
import { ChatComposer } from "../components/ChatComposer";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";

export function ChatPage() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(true);
  const [sending, setSending] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const load = async () => {
      try {
        const response = await api.get<{ messages: Message[] }>("/messages");
        setMessages(response.data.messages);
      } catch (err: any) {
        setError(err?.response?.data?.message ?? "Falha ao carregar mensagens");
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  const handleSend = async (content: string) => {
    setSending(true);
    setError(null);
    const tempUserMessage: Message = {
      id: `temp-${Date.now()}`,
      role: "USER",
      content,
      createdAt: new Date().toISOString(),
    };
    setMessages((prev) => [...prev, tempUserMessage]);
    try {
      const response = await api.post<Message>("/message", { content });
      setMessages((prev) => [...prev, response.data]);
    } catch (err: any) {
      setError(err?.response?.data?.message ?? "Falha ao enviar mensagem");
    } finally {
      setSending(false);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Chat com a IA</CardTitle>
      </CardHeader>
      <CardContent>
        {error ? <p className="mb-4 text-sm text-rose-600">{error}</p> : null}
        {loading ? (
          <div className="flex h-[420px] items-center justify-center text-sm text-slate-500">
            Carregando mensagens...
          </div>
        ) : (
          <MessageList messages={messages} showTyping={sending} />
        )}
        <ChatComposer onSend={handleSend} sending={sending} />
      </CardContent>
    </Card>
  );
}
