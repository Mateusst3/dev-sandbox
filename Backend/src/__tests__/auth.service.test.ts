import { describe, expect, it, vi } from "vitest";
import { authenticateUser, registerUser } from "../services/auth.service.js";

vi.mock("../repositories/user.repository.js", () => ({
  findUserByEmail: vi.fn(),
  createUser: vi.fn(),
}));

vi.mock("../lib/password.js", () => ({
  hashPassword: vi.fn(async () => "hashed"),
  verifyPassword: vi.fn(async () => true),
}));

const { findUserByEmail, createUser } = await import(
  "../repositories/user.repository.js"
);
const { verifyPassword } = await import("../lib/password.js");

describe("auth.service", () => {
  it("registers a new user", async () => {
    (findUserByEmail as ReturnType<typeof vi.fn>).mockResolvedValue(null);
    (createUser as ReturnType<typeof vi.fn>).mockResolvedValue({
      id: "user-1",
      name: "Test",
      email: "test@mail.com",
      passwordHash: "hashed",
    });

    const user = await registerUser({
      name: "Test",
      email: "test@mail.com",
      password: "123456",
    });

    expect(createUser).toHaveBeenCalled();
    expect(user.email).toBe("test@mail.com");
  });

  it("throws if email already exists", async () => {
    (findUserByEmail as ReturnType<typeof vi.fn>).mockResolvedValue({
      id: "user-1",
    });

    await expect(
      registerUser({
        name: "Test",
        email: "test@mail.com",
        password: "123456",
      })
    ).rejects.toMatchObject({ statusCode: 409 });
  });

  it("authenticates valid user", async () => {
    (findUserByEmail as ReturnType<typeof vi.fn>).mockResolvedValue({
      id: "user-1",
      email: "test@mail.com",
      passwordHash: "hashed",
    });

    const user = await authenticateUser({
      email: "test@mail.com",
      password: "123456",
    });

    expect(verifyPassword).toHaveBeenCalled();
    expect(user.id).toBe("user-1");
  });

  it("rejects invalid credentials", async () => {
    (findUserByEmail as ReturnType<typeof vi.fn>).mockResolvedValue(null);

    await expect(
      authenticateUser({
        email: "test@mail.com",
        password: "123456",
      })
    ).rejects.toMatchObject({ statusCode: 401 });
  });
});
