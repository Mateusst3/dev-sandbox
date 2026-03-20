import Fastify from "fastify";
import jwt from "@fastify/jwt";
import cors from "@fastify/cors";
import { ZodError } from "zod";
import { registerAuthRoutes } from "./routes/auth.routes.js";
import { registerUserRoutes } from "./routes/user.routes.js";
import { registerChatRoutes } from "./routes/chat.routes.js";

export const buildServer = () => {
  const server = Fastify({ logger: true });

  const corsOrigin =
    process.env.CORS_ORIGIN ?? "http://localhost:5173";
  server.register(cors, {
    origin: corsOrigin.split(",").map((origin) => origin.trim()),
    methods: ["GET", "POST", "PATCH", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  });

  const jwtSecret = process.env.JWT_SECRET ?? "";
  server.register(jwt, { secret: jwtSecret });

  server.decorate("authenticate", async (request, _reply) => {
    await request.jwtVerify();
  });

  server.setErrorHandler((error, _request, reply) => {
    if (error instanceof ZodError) {
      return reply.code(400).send({
        message: "Validation error.",
        issues: error.flatten(),
      });
    }

    const statusCode = (error as { statusCode?: number }).statusCode;
    if (statusCode) {
      return reply.code(statusCode).send({ message: (error as any).message as string });
    }

    return reply.send(error);
  });

  server.get("/health", async () => ({ ok: true }));

  registerAuthRoutes(server);
  registerUserRoutes(server);
  registerChatRoutes(server);

  return server;
};
