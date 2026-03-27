import { vi, describe, it, expect, beforeEach } from "vitest";

vi.mock("../repositories/userRepository.js", () => ({
  findById: vi.fn(),
  update: vi.fn(),
}));

vi.mock("../services/storageService.js", () => ({
  uploadImage: vi.fn(),
}));

vi.mock("../services/emailService.js", () => ({
  sendWelcomeEmail: vi.fn(),
}));

import * as userRepo from "../repositories/userRepository.js";
import { getCurrentUser } from "../usecases/usersUseCases.js";

beforeEach(() => vi.clearAllMocks());

describe("getCurrentUser", () => {
  it("returns user when found", async () => {
    const user = { uid: "uid-1", name: "Alex" };
    userRepo.findById.mockResolvedValue(user);
    const result = await getCurrentUser("uid-1");
    expect(result).toEqual(user);
    expect(userRepo.findById).toHaveBeenCalledWith("uid-1");
  });

  it("throws 404 when user not found", async () => {
    userRepo.findById.mockResolvedValue(null);
    await expect(getCurrentUser("uid-1")).rejects.toEqual({ status: 404, message: "User not found" });
  });
});
