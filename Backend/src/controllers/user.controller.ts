import { FastifyReply, FastifyRequest } from "fastify";
import { updateUserBodySchema, userResponseSchema } from "../schemas/user.schemas.js";
import { getUser, updateUserProfile } from "../services/user.service.js";

export const getProfile = async (request: FastifyRequest, reply: FastifyReply) => {
  const userId = request.user.sub;
  const user = await getUser(userId);

  const response = userResponseSchema.parse({
    id: user.id,
    name: user.name,
    email: user.email,
  });

  return reply.send(response);
};

export const updateProfile = async (request: FastifyRequest, reply: FastifyReply) => {
  const userId = request.user.sub;
  const body = updateUserBodySchema.parse(request.body);
  const user = await updateUserProfile(userId, body);

  const response = userResponseSchema.parse({
    id: user.id,
    name: user.name,
    email: user.email,
  });

  return reply.send(response);
};
