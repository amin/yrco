import { vi, describe, it, expect, beforeEach } from "vitest";

vi.mock("../repositories/userRepository.js", () => ({
  update: vi.fn(),
}));

vi.mock("../services/emailService.js", () => ({
  sendWelcomeEmail: vi.fn(),
}));

import * as userRepo from "../repositories/userRepository.js";
import { updateProfile } from "../usecases/users.js";

beforeEach(() => vi.clearAllMocks());

const wordIds = ["w1", "w2", "w3", "w4", "w5"];

describe("updateProfile", () => {
  it("updates and returns the user", async () => {
    const user = { uid: "uid-1", wordIds };
    userRepo.update.mockResolvedValue(user);

    const result = await updateProfile("uid-1", { wordIds });

    expect(userRepo.update).toHaveBeenCalledWith("uid-1", { wordIds });
    expect(result).toEqual(user);
  });

  it("throws 404 when user not found", async () => {
    userRepo.update.mockResolvedValue(null);

    await expect(updateProfile("uid-1", { wordIds })).rejects.toEqual({
      status: 404,
      message: "User not found",
    });
  });
});
