import { FastifyReply, FastifyRequest } from "fastify";
import { loginBodySchema, registerBodySchema, authResponseSchema } from "../schemas/auth.schemas.js";
import { authenticateUser, registerUser } from "../services/auth.service.js";

export const register = async (request: FastifyRequest, reply: FastifyReply) => {
  const body = registerBodySchema.parse(request.body);
  const user = await registerUser(body);
  const token = request.server.jwt.sign({ sub: user.id });

  const response = authResponseSchema.parse({
    token,
    user: { id: user.id, name: user.name, email: user.email },
  });

  return reply.code(201).send(response);
};

export const login = async (request: FastifyRequest, reply: FastifyReply) => {
  const body = loginBodySchema.parse(request.body);
  const user = await authenticateUser(body);
  const token = request.server.jwt.sign({ sub: user.id });

  const response = authResponseSchema.parse({
    token,
    user: { id: user.id, name: user.name, email: user.email },
  });

  return reply.send(response);
};
