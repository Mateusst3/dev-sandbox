import { FastifyReply, FastifyRequest } from "fastify";
import {
  chatBodySchema,
  chatResponseSchema,
  chatsResponseSchema,
  chatUpdateSchema,
} from "../schemas/chat.schemas.js";
import {
  createChatForUser,
  deleteChatForUser,
  getChatsForUser,
  renameChatForUser,
} from "../services/chat.service.js";

export const listChats = async (request: FastifyRequest, reply: FastifyReply) => {
  const userId = request.user.sub;
  const chats = await getChatsForUser(userId);

  const response = chatsResponseSchema.parse({
    chats: chats.map((chat) => ({
      id: chat.id,
      title: chat.title,
      createdAt: chat.createdAt.toISOString(),
      updatedAt: chat.updatedAt.toISOString(),
    })),
  });

  return reply.send(response);
};

export const createChat = async (request: FastifyRequest, reply: FastifyReply) => {
  const userId = request.user.sub;
  const body = chatBodySchema.parse(request.body ?? {});
  const title = body.title ?? "Nova conversa";
  const chat = await createChatForUser(userId, title);

  const response = chatResponseSchema.parse({
    id: chat.id,
    title: chat.title,
    createdAt: chat.createdAt.toISOString(),
    updatedAt: chat.updatedAt.toISOString(),
  });

  return reply.code(201).send(response);
};

export const renameChat = async (request: FastifyRequest, reply: FastifyReply) => {
  const userId = request.user.sub;
  const { chatId } = request.params as { chatId: string };
  const body = chatUpdateSchema.parse(request.body ?? {});
  const chat = await renameChatForUser(chatId, userId, body.title);

  const response = chatResponseSchema.parse({
    id: chat.id,
    title: chat.title,
    createdAt: chat.createdAt.toISOString(),
    updatedAt: chat.updatedAt.toISOString(),
  });

  return reply.send(response);
};

export const removeChat = async (request: FastifyRequest, reply: FastifyReply) => {
  const userId = request.user.sub;
  const { chatId } = request.params as { chatId: string };
  await deleteChatForUser(chatId, userId);
  return reply.code(204).send();
};
