import { FastifyInstance } from "fastify";
import { createChat, listChats, removeChat, renameChat } from "../controllers/chat.controller.js";
import { createMessage, listMessages } from "../controllers/message.controller.js";

export const registerChatRoutes = (server: FastifyInstance) => {
  server.get("/chats", { preHandler: [server.authenticate] }, listChats);
  server.post("/chats", { preHandler: [server.authenticate] }, createChat);
  server.patch(
    "/chats/:chatId",
    { preHandler: [server.authenticate] },
    renameChat
  );
  server.delete(
    "/chats/:chatId",
    { preHandler: [server.authenticate] },
    removeChat
  );
  server.get(
    "/chats/:chatId/messages",
    { preHandler: [server.authenticate] },
    listMessages
  );
  server.post(
    "/chats/:chatId/message",
    { preHandler: [server.authenticate] },
    createMessage
  );
};
