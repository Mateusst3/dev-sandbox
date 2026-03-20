import { FastifyInstance } from "fastify";
import { login, register } from "../controllers/auth.controller.js";

export const registerAuthRoutes = (server: FastifyInstance) => {
  server.post("/register", register);
  server.post("/login", login);
};
