import { vi, describe, it, expect, beforeEach } from "vitest";

vi.mock("../repositories/userRepository.js", () => ({
  findById: vi.fn(),
  update: vi.fn(),
}));

vi.mock("../services/storageService.js", () => ({
  uploadImage: vi.fn(),
}));

vi.mock("../services/emailService.js", () => ({
  sendWelcomeEmail: vi.fn(),
}));

import * as userRepo from "../repositories/userRepository.js";
import { getMyAccount, completeSetup, getMyTraits } from "../useCases/users/index.js";

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
    userRepo.update.mockResolvedValue({ firstName: "Alex", email: "alex@example.com", traitIds: [] });
    await completeSetup("uid-1", { role: "student", education: "Web Developer" });
    expect(userRepo.update).toHaveBeenCalledWith("uid-1", {
      role: "student",
      education: "Web Developer",
      setupComplete: true,
    });
  });

  it("handles organization role with its fields", async () => {
    userRepo.update.mockResolvedValue({ firstName: "Alex", email: "alex@example.com", traitIds: [] });
    await completeSetup("uid-1", { role: "organization", organizationName: "Acme" });
    expect(userRepo.update).toHaveBeenCalledWith("uid-1", {
      role: "organization",
      organizationName: "Acme",
      setupComplete: true,
    });
  });
});

describe("getMyTraits", () => {
  it("returns words for the user", async () => {
    userRepo.findById.mockResolvedValue({
      traitIds: [
        { id: "trait-1", trait: "Curious", color: "#F59E0B", icebreaker: "What?" },
        { id: "trait-2", trait: "Creative", color: "#8B5CF6", icebreaker: "How?" },
      ],
    });
    const result = await getMyTraits("uid-1");
    expect(result).toHaveLength(2);
    expect(result[0].trait).toBe("Curious");
    expect(result[1].trait).toBe("Creative");
  });

  it("throws 404 when user not found", async () => {
    userRepo.findById.mockResolvedValue(null);
    await expect(getMyTraits("uid-1")).rejects.toEqual({ status: 404, message: "User not found" });
  });

  it("returns empty array when user has no traitIds", async () => {
    userRepo.findById.mockResolvedValue({ traitIds: undefined });
    const result = await getMyTraits("uid-1");
    expect(result).toEqual([]);
  });

  it("returns only the traits populate resolved", async () => {
    userRepo.findById.mockResolvedValue({
      traitIds: [{ id: "trait-1", trait: "Curious", color: "#F59E0B", icebreaker: "What?" }],
    });
    const result = await getMyTraits("uid-1");
    expect(result).toHaveLength(1);
    expect(result[0].trait).toBe("Curious");
  });
});
