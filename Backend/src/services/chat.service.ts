import {
  createChat,
  deleteChat,
  findChatByIdAndUser,
  listChatsByUser,
  renameChat,
} from "../repositories/chat.repository.js";

export const getChatsForUser = async (userId: string) =>
  listChatsByUser(userId);

export const createChatForUser = async (userId: string, title: string) =>
  createChat({ userId, title });

export const requireChatForUser = async (chatId: string, userId: string) => {
  const chat = await findChatByIdAndUser(chatId, userId);
  if (!chat) {
    const error = new Error("Chat not found.");
    (error as { statusCode?: number }).statusCode = 404;
    throw error;
  }
  return chat;
};

export const renameChatForUser = async (
  chatId: string,
  userId: string,
  title: string
) => {
  await requireChatForUser(chatId, userId);
  return renameChat(chatId, title);
};

export const deleteChatForUser = async (chatId: string, userId: string) => {
  await requireChatForUser(chatId, userId);
  await deleteChat(chatId);
};
