import { describe, it, expect } from "vitest";
import { generateUsernameBase } from "../../helpers/generateUsernameBase.js";

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
