import { vi, describe, it, expect, beforeEach } from "vitest";

vi.mock("../repositories/userRepository.js", () => ({
  findById: vi.fn(),
  findUidByUsername: vi.fn(),
  findByIds: vi.fn(),
  addConnection: vi.fn(),
  removeConnection: vi.fn(),
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
import { connectWithUser, disconnectFromUser, getConnections } from "../services/accountService.js";

beforeEach(() => vi.clearAllMocks());

describe("connectWithUser", () => {
  it("adds a connection when target user exists", async () => {
    userRepo.findUidByUsername.mockResolvedValue("target-uid");
    const result = await connectWithUser("my-uid", "alex");
    expect(result).toEqual({ ok: true });
    expect(userRepo.addConnection).toHaveBeenCalledWith("my-uid", "target-uid");
  });

  it("returns not_found when target user does not exist", async () => {
    userRepo.findUidByUsername.mockResolvedValue(null);
    const result = await connectWithUser("my-uid", "nobody");
    expect(result).toEqual({ error: "not_found" });
    expect(userRepo.addConnection).not.toHaveBeenCalled();
  });

  it("returns self when trying to connect with yourself", async () => {
    userRepo.findUidByUsername.mockResolvedValue("my-uid");
    const result = await connectWithUser("my-uid", "myusername");
    expect(result).toEqual({ error: "self" });
    expect(userRepo.addConnection).not.toHaveBeenCalled();
  });
});

describe("disconnectFromUser", () => {
  it("removes a connection when target user exists", async () => {
    userRepo.findUidByUsername.mockResolvedValue("target-uid");
    const result = await disconnectFromUser("my-uid", "alex");
    expect(result).toEqual({ ok: true });
    expect(userRepo.removeConnection).toHaveBeenCalledWith("my-uid", "target-uid");
  });

  it("returns not_found when target user does not exist", async () => {
    userRepo.findUidByUsername.mockResolvedValue(null);
    const result = await disconnectFromUser("my-uid", "nobody");
    expect(result).toEqual({ error: "not_found" });
    expect(userRepo.removeConnection).not.toHaveBeenCalled();
  });

  it("returns self when trying to disconnect from yourself", async () => {
    userRepo.findUidByUsername.mockResolvedValue("my-uid");
    const result = await disconnectFromUser("my-uid", "myusername");
    expect(result).toEqual({ error: "self" });
    expect(userRepo.removeConnection).not.toHaveBeenCalled();
  });
});

describe("getConnections", () => {
  it("returns profiles with words for each connection", async () => {
    userRepo.findByIds.mockResolvedValue([
      {
        name: "Alex Eriksson",
        firstName: "Alex",
        lastName: "Eriksson",
        picture: "https://example.com/alex.jpg",
        username: "alex",
        email: "alex@example.com",
        setupComplete: true,
        wordIds: ["word-1", "word-2"],
      },
    ]);

    const result = await getConnections(["target-uid"]);

    expect(result).toHaveLength(1);
    expect(result[0].username).toBe("alex");
    expect(result[0].words).toHaveLength(2);
    expect(result[0].words[0].word).toBe("Curious");
    // publicProfileSchema strips private fields
    expect(result[0].email).toBeUndefined();
    expect(result[0].setupComplete).toBeUndefined();
  });

  it("returns empty array when no connections", async () => {
    userRepo.findByIds.mockResolvedValue([]);
    const result = await getConnections([]);
    expect(result).toEqual([]);
    expect(userRepo.findByIds).toHaveBeenCalledWith([]);
  });

  it("returns empty array when connectionIds is undefined", async () => {
    userRepo.findByIds.mockResolvedValue([]);
    const result = await getConnections(undefined);
    expect(result).toEqual([]);
  });
});
