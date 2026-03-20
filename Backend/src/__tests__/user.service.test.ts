import { describe, expect, it, vi } from "vitest";
import { getUser, updateUserProfile } from "../services/user.service.js";

vi.mock("../repositories/user.repository.js", () => ({
  findUserById: vi.fn(),
  updateUser: vi.fn(),
}));

const { findUserById, updateUser } = await import(
  "../repositories/user.repository.js"
);

describe("user.service", () => {
  it("returns user profile", async () => {
    (findUserById as ReturnType<typeof vi.fn>).mockResolvedValue({
      id: "user-1",
      name: "Test",
      email: "test@mail.com",
    });

    const user = await getUser("user-1");
    expect(user.name).toBe("Test");
  });

  it("throws when user not found", async () => {
    (findUserById as ReturnType<typeof vi.fn>).mockResolvedValue(null);

    await expect(getUser("missing")).rejects.toMatchObject({
      statusCode: 404,
    });
  });

  it("updates user profile", async () => {
    (updateUser as ReturnType<typeof vi.fn>).mockResolvedValue({
      id: "user-1",
      name: "Updated",
      email: "updated@mail.com",
    });

    const user = await updateUserProfile("user-1", {
      name: "Updated",
      email: "updated@mail.com",
    });

    expect(updateUser).toHaveBeenCalled();
    expect(user.name).toBe("Updated");
  });
});
