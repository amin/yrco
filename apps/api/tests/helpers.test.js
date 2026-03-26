import { describe, it, expect } from "vitest";
import { generateUsernameBase } from "../helpers/generateUsernameBase.js";
import { buildLinkedInAuthUrl } from "../helpers/buildLinkedInAuthUrl.js";

describe("generateUsernameBase", () => {
  it("concatenates and lowercases", () => {
    expect(generateUsernameBase("Alex", "Eriksson")).toBe("alexeriksson");
  });

  it("strips diacritics", () => {
    expect(generateUsernameBase("Björn", "Åberg")).toBe("bjornaberg");
  });

  it("removes non-alphanumeric characters", () => {
    expect(generateUsernameBase("Mary-Jane", "O'Brien")).toBe("maryjaneobrien");
  });

  it("preserves underscores", () => {
    expect(generateUsernameBase("test_user", "name")).toBe("test_username");
  });
});

describe("buildLinkedInAuthUrl", () => {
  it("returns a valid LinkedIn auth URL with all params", () => {
    const url = buildLinkedInAuthUrl("state-123", {
      clientId: "client-id",
      redirectUri: "http://localhost:3000/callback",
    });

    const parsed = new URL(url);
    expect(parsed.origin + parsed.pathname).toBe("https://www.linkedin.com/oauth/v2/authorization");
    expect(parsed.searchParams.get("response_type")).toBe("code");
    expect(parsed.searchParams.get("client_id")).toBe("client-id");
    expect(parsed.searchParams.get("redirect_uri")).toBe("http://localhost:3000/callback");
    expect(parsed.searchParams.get("state")).toBe("state-123");
    expect(parsed.searchParams.get("scope")).toBe("openid profile email");
  });
});
