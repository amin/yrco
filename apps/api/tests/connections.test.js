import { vi, describe, it, expect, beforeEach } from "vitest";

vi.mock("../services/emailService.js", () => ({
  sendWelcomeEmail: vi.fn(),
}));

vi.mock("../repositories/userRepository.js", () => ({
  findById: vi.fn(),
  findUidByUsername: vi.fn(),
  findByIds: vi.fn(),
  addConnection: vi.fn(),
  removeConnection: vi.fn(),
  update: vi.fn(),
}));

vi.mock("../repositories/traitsRepository.js", () => ({
  findAll: vi.fn().mockResolvedValue([
    { id: "trait-1", trait: "Curious", color: "#F59E0B", icebreaker: "What?" },
    { id: "trait-2", trait: "Creative", color: "#8B5CF6", icebreaker: "How?" },
  ]),
  findByIds: vi.fn().mockImplementation((ids) => {
    const traits = {
      "trait-1": { id: "trait-1", trait: "Curious", color: "#F59E0B", icebreaker: "What?" },
      "trait-2": { id: "trait-2", trait: "Creative", color: "#8B5CF6", icebreaker: "How?" },
    };
    return Promise.resolve(ids.map((id) => traits[id]).filter(Boolean));
  }),
}));

vi.mock("../services/storageService.js", () => ({
  uploadImage: vi.fn(),
}));

import * as userRepo from "../repositories/userRepository.js";
import { addConnection, removeConnection, listConnections } from "../useCases/account/index.js";

beforeEach(() => vi.clearAllMocks());

describe("addConnection", () => {
  it("adds a connection when target user exists", async () => {
    userRepo.findUidByUsername.mockResolvedValue("target-uid");
    await addConnection("my-uid", "alex");
    expect(userRepo.addConnection).toHaveBeenCalledWith("my-uid", "target-uid");
  });

  it("throws 404 when target user does not exist", async () => {
    userRepo.findUidByUsername.mockResolvedValue(null);
    await expect(addConnection("my-uid", "nobody")).rejects.toEqual({ status: 404, message: "User not found" });
    expect(userRepo.addConnection).not.toHaveBeenCalled();
  });

  it("throws 400 when trying to connect with yourself", async () => {
    userRepo.findUidByUsername.mockResolvedValue("my-uid");
    await expect(addConnection("my-uid", "myusername")).rejects.toEqual({ status: 400, message: "You cannot connect with yourself" });
    expect(userRepo.addConnection).not.toHaveBeenCalled();
  });
});

describe("removeConnection", () => {
  it("removes a connection when target user exists", async () => {
    userRepo.findUidByUsername.mockResolvedValue("target-uid");
    await removeConnection("my-uid", "alex");
    expect(userRepo.removeConnection).toHaveBeenCalledWith("my-uid", "target-uid");
  });

  it("throws 404 when target user does not exist", async () => {
    userRepo.findUidByUsername.mockResolvedValue(null);
    await expect(removeConnection("my-uid", "nobody")).rejects.toEqual({ status: 404, message: "User not found" });
    expect(userRepo.removeConnection).not.toHaveBeenCalled();
  });

  it("throws 400 when trying to disconnect from yourself", async () => {
    userRepo.findUidByUsername.mockResolvedValue("my-uid");
    await expect(removeConnection("my-uid", "myusername")).rejects.toEqual({ status: 400, message: "You cannot connect with yourself" });
    expect(userRepo.removeConnection).not.toHaveBeenCalled();
  });
});

describe("listConnections", () => {
  it("returns profiles with words for each connection", async () => {
    userRepo.findById.mockResolvedValue({ connectionIds: ["target-uid"] });
    userRepo.findByIds.mockResolvedValue([
      {
        name: "Alex Eriksson",
        firstName: "Alex",
        lastName: "Eriksson",
        picture: "https://example.com/alex.jpg",
        username: "alex",
        role: "student",
        education: "Web Developer",
        email: "alex@example.com",
        setupComplete: true,
        traitIds: ["trait-1", "trait-2"],
      },
    ]);

    const result = await listConnections("my-uid");

    expect(result).toHaveLength(1);
    expect(result[0].username).toBe("alex");
    expect(result[0].traits).toHaveLength(2);
    expect(result[0].traits[0].trait).toBe("Curious");
    // publicProfileSchema strips private fields
    expect(result[0].email).toBeUndefined();
    expect(result[0].setupComplete).toBeUndefined();
  });

  it("returns empty array when user has no connections", async () => {
    userRepo.findById.mockResolvedValue({ connectionIds: [] });
    userRepo.findByIds.mockResolvedValue([]);
    const result = await listConnections("my-uid");
    expect(result).toEqual([]);
    expect(userRepo.findByIds).toHaveBeenCalledWith([]);
  });

  it("returns empty array when connectionIds is undefined", async () => {
    userRepo.findById.mockResolvedValue({});
    userRepo.findByIds.mockResolvedValue([]);
    const result = await listConnections("my-uid");
    expect(result).toEqual([]);
  });

  it("throws 404 when user not found", async () => {
    userRepo.findById.mockResolvedValue(null);
    await expect(listConnections("my-uid")).rejects.toEqual({ status: 404, message: "User not found" });
  });

  it("throws when user data fails schema validation (e.g. missing role)", async () => {
    userRepo.findById.mockResolvedValue({ connectionIds: ["uid-bad"] });
    userRepo.findByIds.mockResolvedValue([
      {
        name: "Bad User",
        firstName: "Bad",
        lastName: "User",
        picture: "https://example.com/bad.jpg",
        username: "baduser",
        // missing required 'role' field
        traitIds: [],
      },
    ]);
    await expect(listConnections("my-uid")).rejects.toThrow();
  });
});
