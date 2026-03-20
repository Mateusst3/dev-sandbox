import { prisma } from "../lib/prisma.js";
import { MessageRole } from "@prisma/client";

export const listMessagesByUser = (userId: string) =>
  prisma.message.findMany({
    where: { userId },
    orderBy: { createdAt: "asc" },
  });

export const createMessage = (data: {
  userId: string;
  role: MessageRole;
  content: string;
}) =>
  prisma.message.create({
    data,
  });
