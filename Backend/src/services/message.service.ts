import { MessageRole } from "@prisma/client";
import { createMessage, listMessagesByUser } from "../repositories/message.repository.js";
import { generateWithOllama } from "../lib/ollama.js";

export const getMessagesForUser = async (userId: string) =>
  listMessagesByUser(userId);

export const sendMessage = async (userId: string, content: string) => {
  await createMessage({
    userId,
    role: MessageRole.USER,
    content,
  });

  let aiText: string;
  try {
    aiText = await generateWithOllama(content);
  } catch (error) {
    const err = new Error("Ollama error.");
    (err as { statusCode?: number }).statusCode = 502;
    throw err;
  }

  return createMessage({
    userId,
    role: MessageRole.AI,
    content: aiText,
  });
};
