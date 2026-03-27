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
import { completeUserSetup } from "../usecases/usersUseCases.js";

beforeEach(() => vi.clearAllMocks());

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
