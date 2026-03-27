import { vi, describe, it, expect, beforeEach } from "vitest";

vi.mock("../repositories/userRepository.js", () => ({
  findByUsername: vi.fn(),
}));

vi.mock("../repositories/traitRepository.js", () => ({
  findByIds: vi.fn().mockImplementation((ids) => {
    const words = {
      "trait-1": { id: "trait-1", trait: "Curious", color: "#F59E0B", icebreaker: "What?" },
      "trait-2": { id: "trait-2", trait: "Creative", color: "#8B5CF6", icebreaker: "How?" },
    };
    return Promise.resolve(ids.map((id) => words[id]).filter(Boolean));
  }),
}));

vi.mock("../services/storageService.js", () => ({
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
  traitIds: ["trait-1", "trait-2"],
};

describe("getPublicProfile", () => {
  it("returns profile with words", async () => {
    userRepo.findByUsername.mockResolvedValue(fullUser);
    const profile = await getPublicProfile("alex");

    expect(profile.username).toBe("alex");
    expect(profile.firstName).toBe("Alex");
    expect(profile.traits).toHaveLength(2);
    expect(profile.traits[0].trait).toBe("Curious");
  });

  it("strips private fields from response", async () => {
    userRepo.findByUsername.mockResolvedValue(fullUser);
    const profile = await getPublicProfile("alex");

    expect(profile.email).toBeUndefined();
    expect(profile.setupComplete).toBeUndefined();
    expect(profile.connectionIds).toBeUndefined();
    expect(profile.traitIds).toBeUndefined();
  });

  it("throws 404 when user does not exist", async () => {
    userRepo.findByUsername.mockResolvedValue(null);
    await expect(getPublicProfile("nobody")).rejects.toEqual({ status: 404, message: "User not found" });
  });

  it("returns empty traits array when user has no traitIds", async () => {
    userRepo.findByUsername.mockResolvedValue({ ...fullUser, traitIds: undefined });
    const profile = await getPublicProfile("alex");
    expect(profile.traits).toEqual([]);
  });
});
