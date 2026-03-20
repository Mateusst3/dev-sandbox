import { prisma } from "../lib/prisma.js";

export const findUserByEmail = (email: string) =>
  prisma.user.findUnique({ where: { email } });

export const findUserById = (id: string) =>
  prisma.user.findUnique({ where: { id } });

export const createUser = (data: {
  name: string;
  email: string;
  passwordHash: string;
}) =>
  prisma.user.create({
    data,
  });

export const updateUser = (
  id: string,
  data: { name?: string; email?: string }
) =>
  prisma.user.update({
    where: { id },
    data,
  });
