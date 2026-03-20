import { FastifyInstance } from "fastify";
import { createMessage, listMessages } from "../controllers/message.controller.js";

export const registerMessageRoutes = (server: FastifyInstance) => {
  server.get("/messages", { preHandler: [server.authenticate] }, listMessages);
  server.post("/message", { preHandler: [server.authenticate] }, createMessage);
};
