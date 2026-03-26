import { vi, describe, it, expect, beforeEach } from "vitest";

vi.mock("../repositories/userRepository.js", () => ({
  findById: vi.fn(),
  update: vi.fn(),
}));

vi.mock("../repositories/wordsRepository.js", () => ({
  findByIds: vi.fn().mockImplementation((ids) => {
    const words = {
      "word-1": { id: "word-1", word: "Curious", color: "#F59E0B", icebreaker: "What?" },
      "word-2": { id: "word-2", word: "Creative", color: "#8B5CF6", icebreaker: "How?" },
    };
    return Promise.resolve(ids.map((id) => words[id]).filter(Boolean));
  }),
}));

vi.mock("../repositories/storageRepository.js", () => ({
  uploadImage: vi.fn(),
}));

import * as userRepo from "../repositories/userRepository.js";
import { getMyAccount, completeSetup, getMyWords } from "../useCases/account/index.js";

beforeEach(() => vi.clearAllMocks());

describe("getMyAccount", () => {
  it("returns user when found", async () => {
    const user = { uid: "uid-1", name: "Alex" };
    userRepo.findById.mockResolvedValue(user);
    const result = await getMyAccount("uid-1");
    expect(result).toEqual(user);
    expect(userRepo.findById).toHaveBeenCalledWith("uid-1");
  });

  it("throws 404 when user not found", async () => {
    userRepo.findById.mockResolvedValue(null);
    await expect(getMyAccount("uid-1")).rejects.toEqual({ status: 404, message: "User not found" });
  });
});

describe("completeSetup", () => {
  it("passes role and fields to repository with setupComplete true", async () => {
    userRepo.update.mockResolvedValue();
    await completeSetup("uid-1", { role: "student", education: "Web Developer" });
    expect(userRepo.update).toHaveBeenCalledWith("uid-1", {
      role: "student",
      education: "Web Developer",
      setupComplete: true,
    });
  });

  it("handles organization role with its fields", async () => {
    userRepo.update.mockResolvedValue();
    await completeSetup("uid-1", { role: "organization", organizationName: "Acme" });
    expect(userRepo.update).toHaveBeenCalledWith("uid-1", {
      role: "organization",
      organizationName: "Acme",
      setupComplete: true,
    });
  });
});

describe("getMyWords", () => {
  it("returns words for the user", async () => {
    userRepo.findById.mockResolvedValue({ wordIds: ["word-1", "word-2"] });
    const result = await getMyWords("uid-1");
    expect(result).toHaveLength(2);
    expect(result[0].word).toBe("Curious");
    expect(result[1].word).toBe("Creative");
  });

  it("throws 404 when user not found", async () => {
    userRepo.findById.mockResolvedValue(null);
    await expect(getMyWords("uid-1")).rejects.toEqual({ status: 404, message: "User not found" });
  });

  it("returns empty array when user has no wordIds", async () => {
    userRepo.findById.mockResolvedValue({ wordIds: undefined });
    const result = await getMyWords("uid-1");
    expect(result).toEqual([]);
  });

  it("filters out non-existent word IDs", async () => {
    userRepo.findById.mockResolvedValue({ wordIds: ["word-1", "word-999"] });
    const result = await getMyWords("uid-1");
    expect(result).toHaveLength(1);
    expect(result[0].word).toBe("Curious");
  });
});
