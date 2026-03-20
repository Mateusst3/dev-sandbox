import { MessageRole } from "@prisma/client";
import {
  createMessage,
  listMessagesByChat,
} from "../repositories/message.repository.js";
import { requireChatForUser } from "./chat.service.js";
import { touchChat } from "../repositories/chat.repository.js";
import { generateWithDeepSeek } from "../lib/deepseek.js";
import { generateMockResponse } from "../lib/mock-ai.js";

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

  const deepSeekKey = process.env.DEEPSEEK_API_KEY?.trim();
  let aiText: string;

  if (!deepSeekKey) {
    aiText = generateMockResponse();
  } else {
    try {
      aiText = await generateWithDeepSeek(content);
    } catch (error) {
      const err = new Error("DeepSeek error.");
      (err as { statusCode?: number }).statusCode = 502;
      throw err;
    }
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
