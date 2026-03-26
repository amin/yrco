import { vi, describe, it, expect, beforeEach } from "vitest";

vi.mock("../services/linkedInService.js", () => ({
  fetchAccessToken: vi.fn(),
  fetchProfile: vi.fn(),
  downloadProfilePicture: vi.fn(),
}));

vi.mock("../repositories/userRepository.js", () => ({
  findById: vi.fn().mockResolvedValue(null),
  claimUsername: vi.fn().mockResolvedValue(true),
  save: vi.fn(),
}));

vi.mock("../services/storageService.js", () => ({
  uploadImage: vi.fn().mockResolvedValue("https://storage.example.com/pic.jpg"),
}));

import * as linkedInRepo from "../services/linkedInService.js";
import { processLinkedInCallback } from "../useCases/auth/index.js";

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
  linkedInRepo.fetchAccessToken.mockResolvedValue("tok-123");
  linkedInRepo.fetchProfile.mockResolvedValue(linkedInProfile);
  linkedInRepo.downloadProfilePicture.mockResolvedValue(Buffer.from("img"));
});

describe("processLinkedInCallback", () => {
  it("returns uid, setupComplete and username on success", async () => {
    const result = await processLinkedInCallback("auth-code");
    expect(result).toEqual({
      uid: "linkedin-uid-1",
      setupComplete: false,
      username: "alexeriksson",
    });
  });

  it("fetches access token with the auth code", async () => {
    await processLinkedInCallback("auth-code");
    expect(linkedInRepo.fetchAccessToken).toHaveBeenCalledWith("auth-code");
  });

  it("propagates error when token exchange fails", async () => {
    linkedInRepo.fetchAccessToken.mockRejectedValue(new Error("LinkedIn API down"));
    await expect(processLinkedInCallback("bad-code")).rejects.toThrow("LinkedIn API down");
  });

  it("propagates error when profile fetch fails", async () => {
    linkedInRepo.fetchProfile.mockRejectedValue(new Error("Profile fetch failed"));
    await expect(processLinkedInCallback("auth-code")).rejects.toThrow("Profile fetch failed");
  });

  it("propagates error when picture download fails", async () => {
    linkedInRepo.downloadProfilePicture.mockRejectedValue(new Error("Image download failed"));
    await expect(processLinkedInCallback("auth-code")).rejects.toThrow("Image download failed");
  });
});
