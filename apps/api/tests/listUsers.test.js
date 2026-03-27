import { vi, describe, it, expect, beforeEach } from "vitest";

vi.mock("../services/emailService.js", () => ({
  sendWelcomeEmail: vi.fn(),
}));

vi.mock("../repositories/userRepository.js", () => ({
  findAll: vi.fn(),
  search: vi.fn(),
}));

import * as userRepo from "../repositories/userRepository.js";
import { listUsers } from "../useCases/users/index.js";

const traitObjects = [
  { id: "trait-1", trait: "Curious", color: "#F59E0B", icebreaker: "What?" },
  { id: "trait-2", trait: "Creative", color: "#8B5CF6", icebreaker: "How?" },
];

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

beforeEach(() => vi.clearAllMocks());

describe("listUsers", () => {
  it("returns users with hydrated words", async () => {
    userRepo.findAll.mockResolvedValue([makeUser("alex", traitObjects)]);
    const result = await listUsers(1, "");
    expect(result.users).toHaveLength(1);
    expect(result.users[0].username).toBe("alex");
    expect(result.users[0].traits).toHaveLength(2);
    expect(result.users[0].traits[0].trait).toBe("Curious");
  });

  it("strips private fields from public profiles", async () => {
    const user = { ...makeUser("alex"), email: "alex@example.com", uid: "uid-1", connectionIds: ["uid-2"] };
    userRepo.findAll.mockResolvedValue([user]);
    const result = await listUsers(1, "");
    expect(result.users[0].email).toBeUndefined();
    expect(result.users[0].uid).toBeUndefined();
    expect(result.users[0].connectionIds).toBeUndefined();
  });

  it("returns hasMore true when more pages exist", async () => {
    const users = Array.from({ length: 3 }, (_, i) => makeUser(`user${i}`));
    userRepo.findAll.mockResolvedValue(users);
    const result = await listUsers(1, "", 2);
    expect(result.hasMore).toBe(true);
    expect(result.users).toHaveLength(2);
  });

  it("returns hasMore false on last page", async () => {
    userRepo.findAll.mockResolvedValue([makeUser("alex")]);
    const result = await listUsers(1, "", 20);
    expect(result.hasMore).toBe(false);
  });

  it("delegates to search when search query provided", async () => {
    userRepo.search.mockResolvedValue([makeUser("alex")]);
    await listUsers(1, "alex");
    expect(userRepo.search).toHaveBeenCalledWith("alex", 1, 20);
    expect(userRepo.findAll).not.toHaveBeenCalled();
  });

  it("delegates to findAll when no search query", async () => {
    userRepo.findAll.mockResolvedValue([]);
    await listUsers(1, "");
    expect(userRepo.findAll).toHaveBeenCalledWith(1, 20);
    expect(userRepo.search).not.toHaveBeenCalled();
  });
});
