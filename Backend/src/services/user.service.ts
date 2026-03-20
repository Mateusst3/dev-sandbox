import { findUserById, updateUser } from "../repositories/user.repository.js";

export const getUser = async (id: string) => {
  const user = await findUserById(id);
  if (!user) {
    const error = new Error("User not found.");
    (error as { statusCode?: number }).statusCode = 404;
    throw error;
  }
  return user;
};

export const updateUserProfile = async (
  id: string,
  data: { name?: string; email?: string }
) => updateUser(id, data);
