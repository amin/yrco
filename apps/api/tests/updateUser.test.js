import { vi, describe, it, expect, beforeEach } from "vitest";

vi.mock("../repositories/userRepository.js", () => ({
  update: vi.fn(),
}));

vi.mock("../services/emailService.js", () => ({
  sendWelcomeEmail: vi.fn(),
}));

import * as userRepo from "../repositories/userRepository.js";
import { updateUser } from "../usecases/usersUseCases.js";

beforeEach(() => vi.clearAllMocks());

const wordIds = ["w1", "w2", "w3", "w4", "w5"];

describe("updateUser", () => {
  it("updates and returns the user", async () => {
    const user = { uid: "uid-1", wordIds };
    userRepo.update.mockResolvedValue(user);

    const result = await updateUser("uid-1", { wordIds });

    expect(userRepo.update).toHaveBeenCalledWith("uid-1", { wordIds });
    expect(result).toEqual(user);
  });

  it("throws 404 when user not found", async () => {
    userRepo.update.mockResolvedValue(null);

    await expect(updateUser("uid-1", { wordIds })).rejects.toEqual({
      status: 404,
      message: "User not found",
    });
  });
});
