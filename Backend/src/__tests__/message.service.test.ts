import { describe, expect, it, vi } from "vitest";
import { sendMessage, getMessagesForChat } from "../services/message.service.js";
import { MessageRole } from "@prisma/client";

vi.mock("../repositories/message.repository.js", () => ({
  listMessagesByChat: vi.fn(),
  createMessage: vi.fn(),
}));

vi.mock("../repositories/chat.repository.js", () => ({
  touchChat: vi.fn(),
}));

vi.mock("../services/chat.service.js", () => ({
  requireChatForUser: vi.fn(),
}));

vi.mock("../lib/deepseek.js", () => ({
  generateWithDeepSeek: vi.fn(async () => "AI response"),
}));

vi.mock("../lib/mock-ai.js", () => ({
  generateMockResponse: vi.fn(() => "Mock response"),
}));

const { listMessagesByChat, createMessage } = await import(
  "../repositories/message.repository.js"
);
const { generateWithDeepSeek } = await import("../lib/deepseek.js");
const { generateMockResponse } = await import("../lib/mock-ai.js");

describe("message.service", () => {
  it("lists messages for chat", async () => {
    (listMessagesByChat as ReturnType<typeof vi.fn>).mockResolvedValue([
      {
        id: "msg-1",
        userId: "user-1",
        chatId: "chat-1",
        role: MessageRole.USER,
        content: "Hi",
        createdAt: new Date(),
      },
    ]);

    const messages = await getMessagesForChat("chat-1", "user-1");
    expect(messages.length).toBe(1);
  });

  it("creates user and AI messages with DeepSeek", async () => {
    process.env.DEEPSEEK_API_KEY = "test";

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

    const aiMessage = await sendMessage("user-1", "chat-1", "Hello");

    expect(generateWithDeepSeek).toHaveBeenCalled();
    expect(aiMessage.role).toBe(MessageRole.AI);
  });

  it("uses mock response when DeepSeek key is missing", async () => {
    process.env.DEEPSEEK_API_KEY = "";

    (createMessage as ReturnType<typeof vi.fn>).mockResolvedValueOnce({
      id: "user-msg",
      role: MessageRole.USER,
      content: "Hello",
      createdAt: new Date(),
    });
    (createMessage as ReturnType<typeof vi.fn>).mockResolvedValueOnce({
      id: "ai-msg",
      role: MessageRole.AI,
      content: "Mock response",
      createdAt: new Date(),
    });

    const aiMessage = await sendMessage("user-1", "chat-1", "Hello");

    expect(generateMockResponse).toHaveBeenCalled();
    expect(aiMessage.content).toBe("Mock response");
  });

  it("throws 502 when deepseek fails", async () => {
    process.env.DEEPSEEK_API_KEY = "test";
    (generateWithDeepSeek as ReturnType<typeof vi.fn>).mockRejectedValue(
      new Error("fail")
    );

    await expect(sendMessage("user-1", "chat-1", "Hello")).rejects.toMatchObject({
      statusCode: 502,
    });
  });
});
