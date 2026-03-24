import { vi, describe, it, expect, beforeEach } from "vitest";

vi.mock("axios", () => ({
  default: { post: vi.fn(), get: vi.fn() },
}));

vi.mock("../repositories/userRepository.js", () => ({
  findById: vi.fn().mockResolvedValue(null),
  claimUsername: vi.fn().mockResolvedValue(true),
  save: vi.fn(),
}));

vi.mock("../repositories/storageRepository.js", () => ({
  uploadImage: vi.fn().mockResolvedValue("https://storage.example.com/pic.jpg"),
}));

import axios from "axios";
import { handleLinkedInCallback } from "../services/authService.js";

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

  // Happy path: token exchange returns access_token
  axios.post.mockResolvedValue({ data: { access_token: "tok-123" } });
  // Happy path: profile fetch returns user data
  axios.get.mockImplementation((url) => {
    if (url.includes("userinfo")) return Promise.resolve({ data: linkedInProfile });
    // Picture download
    return Promise.resolve({ data: Buffer.from("img") });
  });
});

describe("handleLinkedInCallback", () => {
  it("returns uid, setupComplete and username on success", async () => {
    const result = await handleLinkedInCallback("auth-code");
    expect(result).toEqual({
      uid: "linkedin-uid-1",
      setupComplete: false,
      username: "alexeriksson",
    });
  });

  it("exchanges code with LinkedIn token endpoint", async () => {
    await handleLinkedInCallback("auth-code");
    expect(axios.post).toHaveBeenCalledWith(
      expect.stringContaining("accessToken"),
      expect.any(URLSearchParams),
      expect.objectContaining({ headers: { "Content-Type": "application/x-www-form-urlencoded" } }),
    );
  });

  it("propagates error when token exchange fails", async () => {
    axios.post.mockRejectedValue(new Error("LinkedIn API down"));
    await expect(handleLinkedInCallback("bad-code")).rejects.toThrow("LinkedIn API down");
  });

  it("propagates error when profile fetch fails", async () => {
    axios.get.mockRejectedValue(new Error("Profile fetch failed"));
    await expect(handleLinkedInCallback("auth-code")).rejects.toThrow("Profile fetch failed");
  });

  it("propagates error when picture upload fails", async () => {
    axios.get.mockImplementation((url) => {
      if (url.includes("userinfo")) return Promise.resolve({ data: linkedInProfile });
      return Promise.reject(new Error("Image download failed"));
    });
    await expect(handleLinkedInCallback("auth-code")).rejects.toThrow("Image download failed");
  });
});
