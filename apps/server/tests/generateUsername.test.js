import { vi, describe, it, expect, beforeEach } from "vitest";

vi.mock("../repositories/userRepository.js", () => ({
  findById: vi.fn().mockResolvedValue(null),
  claimUsername: vi.fn(),
  save: vi.fn(),
}));

vi.mock("../repositories/storageRepository.js", () => ({
  uploadImage: vi.fn(),
}));

import * as userRepo from "../repositories/userRepository.js";
import { upsertUser } from "../services/authService.js";

const profile = {
  name: "Amin Test",
  firstName: "Amin",
  lastName: "Test",
  email: "amin@test.com",
  picture: "https://example.com/pic.jpg",
};

beforeEach(() => vi.clearAllMocks());

describe("generateUsername", () => {
  it("uses first name as base username when available", async () => {
    userRepo.claimUsername.mockResolvedValue(true);
    const { username } = await upsertUser("uid-1", profile);
    expect(username).toBe("amin");
  });

  it("increments when base username is taken", async () => {
    userRepo.claimUsername
      .mockResolvedValueOnce(false)
      .mockResolvedValueOnce(true);
    const { username } = await upsertUser("uid-1", profile);
    expect(username).toBe("amin1");
  });
});
