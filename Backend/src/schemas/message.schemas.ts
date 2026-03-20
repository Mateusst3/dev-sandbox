import { z } from "zod";

export const messageBodySchema = z.object({
  content: z.string().min(1),
});

export const messageResponseSchema = z.object({
  id: z.string(),
  chatId: z.string(),
  role: z.enum(["USER", "AI"]),
  content: z.string(),
  createdAt: z.string(),
});

export const messagesResponseSchema = z.object({
  messages: z.array(messageResponseSchema),
});
