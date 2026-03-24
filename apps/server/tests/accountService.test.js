import { vi, describe, it, expect, beforeEach } from "vitest";

vi.mock("../repositories/userRepository.js", () => ({
  findById: vi.fn(),
  update: vi.fn(),
}));

vi.mock("../repositories/wordsRepository.js", () => ({
  findAll: vi.fn().mockResolvedValue({
    "word-1": { id: "word-1", word: "Curious", color: "#F59E0B", icebreaker: "What?" },
    "word-2": { id: "word-2", word: "Creative", color: "#8B5CF6", icebreaker: "How?" },
  }),
}));

vi.mock("../repositories/storageRepository.js", () => ({
  uploadImage: vi.fn(),
}));

import * as userRepo from "../repositories/userRepository.js";
import { findAccount, saveSetup, findMyWords } from "../services/accountService.js";

beforeEach(() => vi.clearAllMocks());

describe("findAccount", () => {
  it("returns user when found", async () => {
    const user = { uid: "uid-1", name: "Alex" };
    userRepo.findById.mockResolvedValue(user);
    const result = await findAccount("uid-1");
    expect(result).toEqual(user);
    expect(userRepo.findById).toHaveBeenCalledWith("uid-1");
  });

  it("throws 404 when user not found", async () => {
    userRepo.findById.mockResolvedValue(null);
    await expect(findAccount("uid-1")).rejects.toEqual({ status: 404, message: "User not found" });
  });
});

describe("saveSetup", () => {
  it("passes role and fields to repository with setupComplete true", async () => {
    userRepo.update.mockResolvedValue();
    await saveSetup("uid-1", { role: "student", education: "Web Developer" });
    expect(userRepo.update).toHaveBeenCalledWith("uid-1", {
      role: "student",
      education: "Web Developer",
      setupComplete: true,
    });
  });

  it("handles organization role with its fields", async () => {
    userRepo.update.mockResolvedValue();
    await saveSetup("uid-1", { role: "organization", organizationName: "Acme" });
    expect(userRepo.update).toHaveBeenCalledWith("uid-1", {
      role: "organization",
      organizationName: "Acme",
      setupComplete: true,
    });
  });
});

describe("findMyWords", () => {
  it("returns words matching the given IDs", async () => {
    const result = await findMyWords(["word-1", "word-2"]);
    expect(result).toHaveLength(2);
    expect(result[0].word).toBe("Curious");
    expect(result[1].word).toBe("Creative");
  });

  it("returns empty array when wordIds is undefined", async () => {
    const result = await findMyWords(undefined);
    expect(result).toEqual([]);
  });

  it("returns empty array when wordIds is empty", async () => {
    const result = await findMyWords([]);
    expect(result).toEqual([]);
  });

  it("filters out non-existent word IDs", async () => {
    const result = await findMyWords(["word-1", "word-999"]);
    expect(result).toHaveLength(1);
    expect(result[0].word).toBe("Curious");
  });
});
