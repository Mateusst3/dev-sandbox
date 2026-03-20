import { prisma } from "../lib/prisma.js";
import { MessageRole } from "@prisma/client";

export const listMessagesByChat = (chatId: string, userId: string) =>
  prisma.message.findMany({
    where: { chatId, userId },
    orderBy: { createdAt: "asc" },
  });

export const createMessage = (data: {
  userId: string;
  chatId: string;
  role: MessageRole;
  content: string;
}) =>
  prisma.message.create({
    data,
  });
