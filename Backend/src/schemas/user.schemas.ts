import { z } from "zod";

export const userResponseSchema = z.object({
  id: z.string(),
  name: z.string(),
  email: z.string().email(),
});

export const updateUserBodySchema = z.object({
  name: z.string().min(2).optional(),
  email: z.string().email().optional(),
});
