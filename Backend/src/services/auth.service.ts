import { createUser, findUserByEmail } from "../repositories/user.repository.js";
import { hashPassword, verifyPassword } from "../lib/password.js";

export const registerUser = async (input: {
  name: string;
  email: string;
  password: string;
}) => {
  const existing = await findUserByEmail(input.email);
  if (existing) {
    const error = new Error("Email already registered.");
    (error as { statusCode?: number }).statusCode = 409;
    throw error;
  }

  const passwordHash = await hashPassword(input.password);
  return createUser({
    name: input.name,
    email: input.email,
    passwordHash,
  });
};

export const authenticateUser = async (input: {
  email: string;
  password: string;
}) => {
  const user = await findUserByEmail(input.email);
  if (!user) {
    const error = new Error("Invalid credentials.");
    (error as { statusCode?: number }).statusCode = 401;
    throw error;
  }

  const ok = await verifyPassword(input.password, user.passwordHash);
  if (!ok) {
    const error = new Error("Invalid credentials.");
    (error as { statusCode?: number }).statusCode = 401;
    throw error;
  }

  return user;
};
