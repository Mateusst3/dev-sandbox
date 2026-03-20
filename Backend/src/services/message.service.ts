import { MessageRole } from "@prisma/client";
import { createMessage, listMessagesByUser } from "../repositories/message.repository.js";
import { generateWithDeepSeek } from "../lib/deepseek.js";
import { generateWithOllama } from "../lib/ollama.js";

export const getMessagesForUser = async (userId: string) =>
  listMessagesByUser(userId);

export const sendMessage = async (userId: string, content: string) => {
  await createMessage({
    userId,
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

  return createMessage({
    userId,
    role: MessageRole.AI,
    content: aiText,
  });
};
