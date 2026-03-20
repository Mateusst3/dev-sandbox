import { MessageRole } from "@prisma/client";
import { createMessage, listMessagesByChat } from "../repositories/message.repository.js";
import { requireChatForUser } from "./chat.service.js";
import { touchChat } from "../repositories/chat.repository.js";
import { generateWithDeepSeek } from "../lib/deepseek.js";
import { generateWithOllama } from "../lib/ollama.js";

export const getMessagesForChat = async (chatId: string, userId: string) => {
  await requireChatForUser(chatId, userId);
  return listMessagesByChat(chatId, userId);
};

export const sendMessage = async (
  userId: string,
  chatId: string,
  content: string
) => {
  await requireChatForUser(chatId, userId);

  await createMessage({
    userId,
    chatId,
    role: MessageRole.USER,
    content,
  });

  const provider = (process.env.AI_PROVIDER ?? "deepseek").toLowerCase();
  let aiText: string;
  try {
    if (provider === "ollama") {
      aiText = await generateWithOllama(content);
    } else {
      aiText = await generateWithDeepSeek(content);
    }
  } catch (error) {
    const err = new Error(
      provider === "ollama" ? "Ollama error." : "DeepSeek error."
    );
    (err as { statusCode?: number }).statusCode = 502;
    throw err;
  }

  const aiMessage = await createMessage({
    userId,
    chatId,
    role: MessageRole.AI,
    content: aiText,
  });

  await touchChat(chatId);

  return aiMessage;
};
