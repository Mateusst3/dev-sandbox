import { useState } from "react";
import { Button } from "./ui/button";
import { Textarea } from "./ui/textarea";

export function ChatComposer({
  onSend,
  sending,
}: {
  onSend: (content: string) => Promise<void>;
  sending: boolean;
}) {
  const [content, setContent] = useState("");

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (!content.trim()) return;
    const text = content.trim();
    setContent("");
    await onSend(text);
  };

  return (
    <form onSubmit={handleSubmit} className="mt-4 space-y-3">
      <Textarea
        value={content}
        onChange={(event) => setContent(event.target.value)}
        placeholder="Digite sua mensagem..."
        rows={3}
      />
      <div className="flex justify-end">
        <Button type="submit" disabled={sending || !content.trim()}>
          {sending ? "Enviando..." : "Enviar"}
        </Button>
      </div>
    </form>
  );
}
