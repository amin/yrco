import { vi, describe, it, expect, beforeEach } from "vitest";

vi.mock("../../services/linkedInService.js", () => ({
  fetchAccessToken: vi.fn(),
  fetchProfile: vi.fn(),
  downloadProfilePicture: vi.fn(),
}));

vi.mock("../../repositories/userRepository.js", () => ({
  findById: vi.fn().mockResolvedValue(null),
  createWithUsername: vi.fn().mockResolvedValue(true),
  upsert: vi.fn(),
}));

vi.mock("../../services/storageService.js", () => ({
  uploadImage: vi.fn().mockResolvedValue("https://storage.example.com/pic.jpg"),
}));

vi.mock("../../repositories/sessionRepository.js", () => ({
  create: vi.fn(),
  deleteByUid: vi.fn(),
  deleteByToken: vi.fn(),
}));

import * as linkedInService from "../../services/linkedInService.js";
import * as userRepo from "../../repositories/userRepository.js";
import * as sessionRepo from "../../repositories/sessionRepository.js";
import { upsertUser, authenticateWithLinkedIn } from "../../usecases/authUseCases.js";

const linkedInProfile = {
  sub: "linkedin-uid-1",
  name: "Alex Eriksson",
  given_name: "Alex",
  family_name: "Eriksson",
  email: "alex@example.com",
  picture: "https://linkedin.com/photo.jpg",
};

const profile = {
  name: "Amin Test",
  firstName: "Amin",
  lastName: "Test",
  email: "amin@test.com",
  picture: "https://example.com/pic.jpg",
};

beforeEach(() => vi.clearAllMocks());

describe("upsertUser", () => {
  describe("generateUsername", () => {
    it("does not regenerate username for existing user", async () => {
      userRepo.findById.mockResolvedValueOnce({ username: "amintest", setupComplete: true });
      const { username } = await upsertUser("uid-1", profile);
      expect(username).toBe("amintest");
    });

    it("uses firstname + lastname as base username when available", async () => {
      const { username } = await upsertUser("uid-1", profile);
      expect(username).toBe("amintest");
    });

    it("increments when base username is taken", async () => {
      userRepo.createWithUsername
        .mockResolvedValueOnce(false)
        .mockResolvedValueOnce(true);
      const { username } = await upsertUser("uid-1", profile);
      expect(username).toBe("amintest1");
    });

    it("increments beyond 1 if multiple are taken", async () => {
      userRepo.createWithUsername
        .mockResolvedValueOnce(false)
        .mockResolvedValueOnce(false)
        .mockResolvedValueOnce(false)
        .mockResolvedValueOnce(true);
      const { username } = await upsertUser("uid-1", profile);
      expect(username).toBe("amintest3");
    });

    it("handles spaces in names", async () => {
      const { username } = await upsertUser("uid-1", {
        ...profile,
        firstName: "Anna Maria",
        lastName: "Van Berg",
      });
      expect(username).toBe("annamariavanberg");
    });

    it("strips special characters like åäö and - _ *", async () => {
      const { username } = await upsertUser("uid-1", {
        ...profile,
        firstName: "Åsa-Britta",
        lastName: "Öström*Berg",
      });
      expect(username).toBe("asabrittaostromberg");
    });

    it("lowercases all characters", async () => {
      const { username } = await upsertUser("uid-1", {
        ...profile,
        firstName: "JOHN",
        lastName: "DOE",
      });
      expect(username).toBe("johndoe");
    });

    it("preserves numbers in names", async () => {
      const { username } = await upsertUser("uid-1", {
        ...profile,
        firstName: "Agent",
        lastName: "007",
      });
      expect(username).toBe("agent007");
    });

    it("strips emoji from names", async () => {
      const { username } = await upsertUser("uid-1", {
        ...profile,
        firstName: "Alex🔥",
        lastName: "Cool😎",
      });
      expect(username).toBe("alexcool");
    });

    it("handles accented Latin characters (é, ñ, ü)", async () => {
      const { username } = await upsertUser("uid-1", {
        ...profile,
        firstName: "René",
        lastName: "Muñoz",
      });
      expect(username).toBe("renemunoz");
    });
  });

  it("preserves existing username on subsequent login", async () => {
    userRepo.findById.mockResolvedValueOnce({ username: "amintest", setupComplete: true });
    const { username } = await upsertUser("uid-1", profile);
    expect(username).toBe("amintest");
  });

  it("preserves setupComplete status on subsequent login", async () => {
    userRepo.findById.mockResolvedValueOnce({ username: "amintest", setupComplete: true });
    const { setupComplete } = await upsertUser("uid-1", profile);
    expect(setupComplete).toBe(true);
  });

  it("does not overwrite createdAt or username on save", async () => {
    userRepo.findById.mockResolvedValueOnce({ username: "amintest", setupComplete: true });
    await upsertUser("uid-1", profile);

    const savedData = userRepo.upsert.mock.calls[0][1];
    expect(savedData.createdAt).toBeUndefined();
    expect(savedData.username).toBeUndefined();
  });

  it("sets setupComplete to false for new users", async () => {
    const { setupComplete } = await upsertUser("uid-1", profile);
    expect(setupComplete).toBe(false);
  });
});

describe("authenticateWithLinkedIn", () => {
  beforeEach(() => {
    linkedInService.fetchAccessToken.mockResolvedValue("tok-123");
    linkedInService.fetchProfile.mockResolvedValue(linkedInProfile);
    linkedInService.downloadProfilePicture.mockResolvedValue(Buffer.from("img"));
  });

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
