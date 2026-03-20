import { describe, expect, it, vi } from "vitest";
import { sendMessage, getMessagesForUser } from "../services/message.service.js";
import { MessageRole } from "@prisma/client";

vi.mock("../repositories/message.repository.js", () => ({
  listMessagesByUser: vi.fn(),
  createMessage: vi.fn(),
}));

vi.mock("../lib/ollama.js", () => ({
  generateWithOllama: vi.fn(async () => "AI response"),
}));

const { listMessagesByUser, createMessage } = await import(
  "../repositories/message.repository.js"
);
const { generateWithOllama } = await import("../lib/ollama.js");

describe("message.service", () => {
  it("lists messages for user", async () => {
    (listMessagesByUser as ReturnType<typeof vi.fn>).mockResolvedValue([
      {
        id: "msg-1",
        userId: "user-1",
        role: MessageRole.USER,
        content: "Hi",
        createdAt: new Date(),
      },
    ]);

    const messages = await getMessagesForUser("user-1");
    expect(messages.length).toBe(1);
  });

  it("creates user and AI messages", async () => {
    (createMessage as ReturnType<typeof vi.fn>).mockResolvedValueOnce({
      id: "user-msg",
      role: MessageRole.USER,
      content: "Hello",
      createdAt: new Date(),
    });
    (createMessage as ReturnType<typeof vi.fn>).mockResolvedValueOnce({
      id: "ai-msg",
      role: MessageRole.AI,
      content: "AI response",
      createdAt: new Date(),
    });

    const aiMessage = await sendMessage("user-1", "Hello");

    expect(generateWithOllama).toHaveBeenCalled();
    expect(aiMessage.role).toBe(MessageRole.AI);
  });

  it("throws 502 when ollama fails", async () => {
    (generateWithOllama as ReturnType<typeof vi.fn>).mockRejectedValue(
      new Error("fail")
    );

    await expect(sendMessage("user-1", "Hello")).rejects.toMatchObject({
      statusCode: 502,
    });
  });
});
