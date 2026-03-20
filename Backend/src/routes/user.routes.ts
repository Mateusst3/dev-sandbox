import { FastifyInstance } from "fastify";
import { getProfile, updateProfile } from "../controllers/user.controller.js";

export const registerUserRoutes = (server: FastifyInstance) => {
  server.get("/user", { preHandler: [server.authenticate] }, getProfile);
  server.patch("/user", { preHandler: [server.authenticate] }, updateProfile);
};
