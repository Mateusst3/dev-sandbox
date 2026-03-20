import { FastifyReply, FastifyRequest } from "fastify";
import { messageBodySchema, messageResponseSchema, messagesResponseSchema } from "../schemas/message.schemas.js";
import { getMessagesForChat, sendMessage } from "../services/message.service.js";

export const listMessages = async (request: FastifyRequest, reply: FastifyReply) => {
  const userId = request.user.sub;
  const { chatId } = request.params as { chatId: string };
  const messages = await getMessagesForChat(chatId, userId);

  const response = messagesResponseSchema.parse({
    messages: messages.map((message) => ({
      id: message.id,
      chatId: message.chatId,
      role: message.role,
      content: message.content,
      createdAt: message.createdAt.toISOString(),
    })),
  });

  return reply.send(response);
};

export const createMessage = async (request: FastifyRequest, reply: FastifyReply) => {
  const userId = request.user.sub;
  const { chatId } = request.params as { chatId: string };
  const body = messageBodySchema.parse(request.body);
  const aiMessage = await sendMessage(userId, chatId, body.content);

  const response = messageResponseSchema.parse({
    id: aiMessage.id,
    chatId: aiMessage.chatId,
    role: aiMessage.role,
    content: aiMessage.content,
    createdAt: aiMessage.createdAt.toISOString(),
  });

  return reply.code(201).send(response);
};
