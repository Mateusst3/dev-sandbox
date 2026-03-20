import { z } from "zod";

export const chatBodySchema = z.object({
  title: z.string().min(1).max(80).optional(),
});

export const chatUpdateSchema = z.object({
  title: z.string().min(1).max(80),
});

export const chatResponseSchema = z.object({
  id: z.string(),
  title: z.string(),
  createdAt: z.string(),
  updatedAt: z.string(),
});

export const chatsResponseSchema = z.object({
  chats: z.array(chatResponseSchema),
});
