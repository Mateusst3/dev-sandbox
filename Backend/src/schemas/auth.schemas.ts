import { z } from "zod";
import { userResponseSchema } from "./user.schemas.js";

export const registerBodySchema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  password: z.string().min(6),
});

export const loginBodySchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
});

export const authResponseSchema = z.object({
  token: z.string(),
  user: userResponseSchema,
});
