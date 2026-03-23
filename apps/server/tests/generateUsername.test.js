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
  it("does not regenerate username for existing user", async () => {
    userRepo.findById.mockResolvedValueOnce({ username: "amintest", setupComplete: true });
    const { username } = await upsertUser("uid-1", profile);
    expect(username).toBe("amintest");
    expect(userRepo.claimUsername).not.toHaveBeenCalled();
  });

  it("uses firstname + lastname as base username when available", async () => {
    userRepo.claimUsername.mockResolvedValue(true);
    const { username } = await upsertUser("uid-1", profile);
    expect(username).toBe("amintest");
  });

  it("increments when base username is taken", async () => {
    userRepo.claimUsername
      .mockResolvedValueOnce(false)
      .mockResolvedValueOnce(true);
    const { username } = await upsertUser("uid-1", profile);
    expect(username).toBe("amintest1");
  });

  it("increments beyond 1 if multiple are taken", async () => {
    userRepo.claimUsername
      .mockResolvedValueOnce(false)
      .mockResolvedValueOnce(false)
      .mockResolvedValueOnce(false)
      .mockResolvedValueOnce(true);
    const { username } = await upsertUser("uid-1", profile);
    expect(username).toBe("amintest3");
  });

  it("handles spaces in names", async () => {
    userRepo.claimUsername.mockResolvedValue(true);
    const { username } = await upsertUser("uid-1", {
      ...profile,
      firstName: "Anna Maria",
      lastName: "Van Berg",
    });
    expect(username).toBe("annamariavanberg");
  });

  it("strips special characters like åäö and - _ *", async () => {
    userRepo.claimUsername.mockResolvedValue(true);
    const { username } = await upsertUser("uid-1", {
      ...profile,
      firstName: "Åsa-Britta",
      lastName: "Öström*Berg",
    });
    // å→a, ö→o, - and * are stripped
    expect(username).toBe("asabrittaostromberg");
  });
});
