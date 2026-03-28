import { vi, describe, it, expect, beforeEach } from "vitest";

vi.mock("../services/linkedInService.js", () => ({
  fetchAccessToken: vi.fn(),
  fetchProfile: vi.fn(),
  downloadProfilePicture: vi.fn(),
}));

vi.mock("../repositories/userRepository.js", () => ({
  findById: vi.fn().mockResolvedValue(null),
  claimUsername: vi.fn().mockResolvedValue(true),
  upsert: vi.fn(),
}));

vi.mock("../services/storageService.js", () => ({
  uploadImage: vi.fn().mockResolvedValue("https://storage.example.com/pic.jpg"),
}));

vi.mock("../repositories/sessionRepository.js", () => ({
  create: vi.fn(),
}));

import * as linkedInService from "../services/linkedInService.js";
import * as userRepo from "../repositories/userRepository.js";
import * as sessionRepo from "../repositories/sessionRepository.js";
import { authenticateWithLinkedIn } from "../usecases/authUseCases.js";

const linkedInProfile = {
  sub: "linkedin-uid-1",
  name: "Alex Eriksson",
  given_name: "Alex",
  family_name: "Eriksson",
  email: "alex@example.com",
  picture: "https://linkedin.com/photo.jpg",
};

beforeEach(() => {
  vi.clearAllMocks();
  linkedInService.fetchAccessToken.mockResolvedValue("tok-123");
  linkedInService.fetchProfile.mockResolvedValue(linkedInProfile);
  linkedInService.downloadProfilePicture.mockResolvedValue(Buffer.from("img"));
});

describe("authenticateWithLinkedIn", () => {
  it("returns sessionToken, maxAge, setupComplete and username on success", async () => {
    const result = await authenticateWithLinkedIn("auth-code");
    expect(result.setupComplete).toBe(false);
    expect(result.username).toBe("alexeriksson");
    expect(typeof result.sessionToken).toBe("string");
    expect(typeof result.maxAge).toBe("number");
  });

  it("creates a session mapped to the linkedin uid", async () => {
    const result = await authenticateWithLinkedIn("auth-code");
    expect(sessionRepo.create).toHaveBeenCalledWith(
      result.sessionToken,
      "linkedin-uid-1",
      expect.any(Date),
    );
  });

  it("fetches access token with the auth code", async () => {
    await authenticateWithLinkedIn("auth-code");
    expect(linkedInService.fetchAccessToken).toHaveBeenCalledWith("auth-code");
  });

  it("propagates error when token exchange fails", async () => {
    linkedInService.fetchAccessToken.mockRejectedValue(new Error("LinkedIn API down"));
    await expect(authenticateWithLinkedIn("bad-code")).rejects.toThrow("LinkedIn API down");
  });

  it("propagates error when profile fetch fails", async () => {
    linkedInService.fetchProfile.mockRejectedValue(new Error("Profile fetch failed"));
    await expect(authenticateWithLinkedIn("auth-code")).rejects.toThrow("Profile fetch failed");
  });

  it("falls back to UI Avatars when picture download fails", async () => {
    linkedInService.downloadProfilePicture.mockRejectedValue(new Error("Image download failed"));
    await authenticateWithLinkedIn("auth-code");
    const savedPicture = userRepo.upsert.mock.calls[0][1].picture;
    expect(savedPicture).toContain("dicebear.com");
    expect(savedPicture).toContain("Alex%20Eriksson");
  });
});
