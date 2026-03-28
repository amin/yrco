import { vi, describe, it, expect, beforeEach } from "vitest";

vi.mock("../../repositories/userRepository.js", () => ({
  findById: vi.fn(),
  findByUsername: vi.fn(),
  update: vi.fn(),
  findAll: vi.fn(),
  search: vi.fn(),
}));

vi.mock("../../services/storageService.js", () => ({
  uploadImage: vi.fn(),
}));

vi.mock("../../services/emailService.js", () => ({
  sendWelcomeEmail: vi.fn(),
}));

import * as userRepo from "../../repositories/userRepository.js";
import {
  getPublicUser,
  getAllUsers,
  getCurrentUser,
  completeUserSetup,
  updateUser,
} from "../../usecases/usersUseCases.js";

beforeEach(() => vi.clearAllMocks());

const traitObjects = [
  { id: "trait-1", trait: "Curious", color: "#F59E0B", icebreaker: "What?" },
  { id: "trait-2", trait: "Creative", color: "#8B5CF6", icebreaker: "How?" },
];

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
  traitIds: traitObjects,
};

const makeUser = (username, traitIds = []) => ({
  name: `${username} Test`,
  firstName: username,
  lastName: "Test",
  picture: `https://example.com/${username}.jpg`,
  username,
  role: "student",
  education: "Developer",
  traitIds,
});

describe("getPublicUser", () => {
  it("returns profile with traits", async () => {
    userRepo.findByUsername.mockResolvedValue(fullUser);
    const result = await getPublicUser("alex");

    expect(result.username).toBe("alex");
    expect(result.firstName).toBe("Alex");
    expect(result.traits).toHaveLength(2);
    expect(result.traits[0].trait).toBe("Curious");
  });

  it("strips private fields from response", async () => {
    userRepo.findByUsername.mockResolvedValue(fullUser);
    const result = await getPublicUser("alex");

    expect(result.email).toBeUndefined();
    expect(result.setupComplete).toBeUndefined();
    expect(result.connectionIds).toBeUndefined();
    expect(result.traitIds).toBeUndefined();
  });

  it("throws 404 when user does not exist", async () => {
    userRepo.findByUsername.mockResolvedValue(null);
    await expect(getPublicUser("nobody")).rejects.toEqual({ status: 404, message: "User not found" });
  });

  it("returns empty traits array when user has no traitIds", async () => {
    userRepo.findByUsername.mockResolvedValue({ ...fullUser, traitIds: undefined });
    const result = await getPublicUser("alex");
    expect(result.traits).toEqual([]);
  });
});

describe("getAllUsers", () => {
  it("returns users with hydrated traits", async () => {
    userRepo.findAll.mockResolvedValue([makeUser("alex", traitObjects)]);
    const result = await getAllUsers(1, "");
    expect(result.users).toHaveLength(1);
    expect(result.users[0].username).toBe("alex");
    expect(result.users[0].traits).toHaveLength(2);
    expect(result.users[0].traits[0].trait).toBe("Curious");
  });

  it("strips private fields from public profiles", async () => {
    const user = { ...makeUser("alex"), email: "alex@example.com", uid: "uid-1", connectionIds: ["uid-2"] };
    userRepo.findAll.mockResolvedValue([user]);
    const result = await getAllUsers(1, "");
    expect(result.users[0].email).toBeUndefined();
    expect(result.users[0].uid).toBeUndefined();
    expect(result.users[0].connectionIds).toBeUndefined();
  });

  it("returns hasMore true when more pages exist", async () => {
    const users = Array.from({ length: 3 }, (_, i) => makeUser(`user${i}`));
    userRepo.findAll.mockResolvedValue(users);
    const result = await getAllUsers(1, "", 2);
    expect(result.hasMore).toBe(true);
    expect(result.users).toHaveLength(2);
  });

  it("returns hasMore false on last page", async () => {
    userRepo.findAll.mockResolvedValue([makeUser("alex")]);
    const result = await getAllUsers(1, "", 20);
    expect(result.hasMore).toBe(false);
  });

  it("delegates to search when search query provided", async () => {
    userRepo.search.mockResolvedValue([makeUser("alex")]);
    await getAllUsers(1, "alex");
    expect(userRepo.search).toHaveBeenCalledWith("alex", 1, 20);
    expect(userRepo.findAll).not.toHaveBeenCalled();
  });

  it("delegates to findAll when no search query", async () => {
    userRepo.findAll.mockResolvedValue([]);
    await getAllUsers(1, "");
    expect(userRepo.findAll).toHaveBeenCalledWith(1, 20);
    expect(userRepo.search).not.toHaveBeenCalled();
  });
});

describe("getCurrentUser", () => {
  it("returns user when found", async () => {
    const user = { uid: "uid-1", name: "Alex" };
    userRepo.findById.mockResolvedValue(user);
    const result = await getCurrentUser("uid-1");
    expect(result).toEqual(user);
    expect(userRepo.findById).toHaveBeenCalledWith("uid-1");
  });

  it("throws 404 when user not found", async () => {
    userRepo.findById.mockResolvedValue(null);
    await expect(getCurrentUser("uid-1")).rejects.toEqual({ status: 404, message: "User not found" });
  });
});

describe("completeUserSetup", () => {
  it("passes role and fields to repository with setupComplete true", async () => {
    userRepo.update.mockResolvedValue({ firstName: "Alex", email: "alex@example.com", traitIds: [] });
    await completeUserSetup("uid-1", { role: "student", education: "Web Developer" });
    expect(userRepo.update).toHaveBeenCalledWith("uid-1", {
      role: "student",
      education: "Web Developer",
      setupComplete: true,
    });
  });

  it("handles organization role with its fields", async () => {
    userRepo.update.mockResolvedValue({ firstName: "Alex", email: "alex@example.com", traitIds: [] });
    await completeUserSetup("uid-1", { role: "organization", organizationName: "Acme" });
    expect(userRepo.update).toHaveBeenCalledWith("uid-1", {
      role: "organization",
      organizationName: "Acme",
      setupComplete: true,
    });
  });
});

describe("updateUser", () => {
  const traitIds = ["w1", "w2", "w3", "w4", "w5"];

  it("updates and returns the user", async () => {
    const user = { uid: "uid-1", traitIds };
    userRepo.update.mockResolvedValue(user);

    const result = await updateUser("uid-1", { traitIds });

    expect(userRepo.update).toHaveBeenCalledWith("uid-1", { traitIds });
    expect(result).toEqual(user);
  });

  it("throws 404 when user not found", async () => {
    userRepo.update.mockResolvedValue(null);
    await expect(updateUser("uid-1", { traitIds })).rejects.toEqual({
      status: 404,
      message: "User not found",
    });
  });
});
