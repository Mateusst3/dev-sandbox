import { FastifyReply, FastifyRequest } from "fastify";
import { messageBodySchema, messageResponseSchema, messagesResponseSchema } from "../schemas/message.schemas.js";
import { getMessagesForUser, sendMessage } from "../services/message.service.js";

export const listMessages = async (request: FastifyRequest, reply: FastifyReply) => {
  const userId = request.user.sub;
  const messages = await getMessagesForUser(userId);

  const response = messagesResponseSchema.parse({
    messages: messages.map((message) => ({
      id: message.id,
      role: message.role,
      content: message.content,
      createdAt: message.createdAt.toISOString(),
    })),
  });

  return reply.send(response);
};

export const createMessage = async (request: FastifyRequest, reply: FastifyReply) => {
  const userId = request.user.sub;
  const body = messageBodySchema.parse(request.body);
  const aiMessage = await sendMessage(userId, body.content);

  const response = messageResponseSchema.parse({
    id: aiMessage.id,
    role: aiMessage.role,
    content: aiMessage.content,
    createdAt: aiMessage.createdAt.toISOString(),
  });

  return reply.code(201).send(response);
};
