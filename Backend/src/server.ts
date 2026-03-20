import Fastify from "fastify";
import jwt from "@fastify/jwt";
import { ZodError } from "zod";
import { registerAuthRoutes } from "./routes/auth.routes.js";
import { registerUserRoutes } from "./routes/user.routes.js";
import { registerMessageRoutes } from "./routes/message.routes.js";

export const buildServer = () => {
  const server = Fastify({ logger: true });

  const jwtSecret = process.env.JWT_SECRET ?? "change-me";
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
      return reply.code(statusCode).send({ message: error.message });
    }

    return reply.send(error);
  });

  server.get("/health", async () => ({ ok: true }));

  registerAuthRoutes(server);
  registerUserRoutes(server);
  registerMessageRoutes(server);

  return server;
};
