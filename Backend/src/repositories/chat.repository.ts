import { prisma } from "../lib/prisma.js";

export const listChatsByUser = (userId: string) =>
  prisma.chat.findMany({
    where: { userId },
    orderBy: { updatedAt: "desc" },
  });

export const createChat = (data: { userId: string; title: string }) =>
  prisma.chat.create({ data });

export const findChatByIdAndUser = (id: string, userId: string) =>
  prisma.chat.findFirst({ where: { id, userId } });

export const touchChat = (id: string) =>
  prisma.chat.update({
    where: { id },
    data: { updatedAt: new Date() },
  });

export const renameChat = (id: string, title: string) =>
  prisma.chat.update({
    where: { id },
    data: { title, updatedAt: new Date() },
  });

export const deleteChat = (id: string) =>
  prisma.chat.delete({
    where: { id },
  });
