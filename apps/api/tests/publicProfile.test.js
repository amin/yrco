import { vi, describe, it, expect, beforeEach } from "vitest";

vi.mock("../repositories/userRepository.js", () => ({
  findByUsername: vi.fn(),
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
import { getPublicProfile } from "../useCases/users/index.js";

beforeEach(() => vi.clearAllMocks());

const fullUser = {
  name: "Alex Eriksson",
  firstName: "Alex",
  lastName: "Eriksson",
  picture: "https://example.com/alex.jpg",
  username: "alex",
  role: "student",
  education: "Web Developer",
  email: "alex@example.com",
  setupComplete: true,
  connectionIds: ["uid-2", "uid-3"],
  wordIds: ["word-1", "word-2"],
};

describe("getPublicProfile", () => {
  it("returns profile with words", async () => {
    userRepo.findByUsername.mockResolvedValue(fullUser);
    const profile = await getPublicProfile("alex");

    expect(profile.username).toBe("alex");
    expect(profile.firstName).toBe("Alex");
    expect(profile.words).toHaveLength(2);
    expect(profile.words[0].word).toBe("Curious");
  });

  it("strips private fields from response", async () => {
    userRepo.findByUsername.mockResolvedValue(fullUser);
    const profile = await getPublicProfile("alex");

    expect(profile.email).toBeUndefined();
    expect(profile.setupComplete).toBeUndefined();
    expect(profile.connectionIds).toBeUndefined();
    expect(profile.wordIds).toBeUndefined();
  });

  it("throws 404 when user does not exist", async () => {
    userRepo.findByUsername.mockResolvedValue(null);
    await expect(getPublicProfile("nobody")).rejects.toEqual({ status: 404, message: "User not found" });
  });

  it("returns empty words array when user has no wordIds", async () => {
    userRepo.findByUsername.mockResolvedValue({ ...fullUser, wordIds: undefined });
    const profile = await getPublicProfile("alex");
    expect(profile.words).toEqual([]);
  });
});
