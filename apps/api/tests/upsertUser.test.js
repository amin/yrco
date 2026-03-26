import { vi, describe, it, expect, beforeEach } from "vitest";

vi.mock("../repositories/userRepository.js", () => ({
  findById: vi.fn().mockResolvedValue(null),
  claimUsername: vi.fn(),
  save: vi.fn(),
}));

vi.mock("../services/storageService.js", () => ({
  uploadImage: vi.fn(),
}));

import * as userRepo from "../repositories/userRepository.js";
import { upsertUser } from "../useCases/auth/helpers/_upsertUser.js";

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

  it("lowercases all characters", async () => {
    userRepo.claimUsername.mockResolvedValue(true);
    const { username } = await upsertUser("uid-1", {
      ...profile,
      firstName: "JOHN",
      lastName: "DOE",
    });
    expect(username).toBe("johndoe");
  });

  it("preserves numbers in names", async () => {
    userRepo.claimUsername.mockResolvedValue(true);
    const { username } = await upsertUser("uid-1", {
      ...profile,
      firstName: "Agent",
      lastName: "007",
    });
    expect(username).toBe("agent007");
  });

  it("strips emoji from names", async () => {
    userRepo.claimUsername.mockResolvedValue(true);
    const { username } = await upsertUser("uid-1", {
      ...profile,
      firstName: "Alex🔥",
      lastName: "Cool😎",
    });
    expect(username).toBe("alexcool");
  });

  it("handles accented Latin characters (é, ñ, ü)", async () => {
    userRepo.claimUsername.mockResolvedValue(true);
    const { username } = await upsertUser("uid-1", {
      ...profile,
      firstName: "René",
      lastName: "Muñoz",
    });
    expect(username).toBe("renemunoz");
  });
});

describe("upsertUser returning user", () => {
  it("preserves existing username on subsequent login", async () => {
    userRepo.findById.mockResolvedValueOnce({ username: "amintest", setupComplete: true });
    const { username } = await upsertUser("uid-1", profile);
    expect(username).toBe("amintest");
    expect(userRepo.claimUsername).not.toHaveBeenCalled();
  });

  it("preserves setupComplete status on subsequent login", async () => {
    userRepo.findById.mockResolvedValueOnce({ username: "amintest", setupComplete: true });
    const { setupComplete } = await upsertUser("uid-1", profile);
    expect(setupComplete).toBe(true);
  });

  it("does not overwrite createdAt or username on save", async () => {
    userRepo.findById.mockResolvedValueOnce({ username: "amintest", setupComplete: true });
    await upsertUser("uid-1", profile);

    const savedData = userRepo.save.mock.calls[0][1];
    expect(savedData.createdAt).toBeUndefined();
    expect(savedData.username).toBeUndefined();
  });

  it("sets setupComplete to false for new users", async () => {
    userRepo.claimUsername.mockResolvedValue(true);
    const { setupComplete } = await upsertUser("uid-1", profile);
    expect(setupComplete).toBe(false);
  });
});
