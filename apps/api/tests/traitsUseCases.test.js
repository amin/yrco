import { vi, describe, it, expect, beforeEach } from "vitest";

vi.mock("../models/Trait.js", () => ({
  default: {
    find: vi.fn().mockReturnValue({
      lean: vi.fn().mockResolvedValue([
        { _id: { toString: () => "trait-1" }, trait: "Curious", color: "#F59E0B", icebreaker: "What?" },
        { _id: { toString: () => "trait-2" }, trait: "Creative", color: "#8B5CF6", icebreaker: "How?" },
      ]),
    }),
  },
}));

import { getAllTraits } from "../useCases/traits/index.js";

beforeEach(() => vi.clearAllMocks());

describe("getAllTraits", () => {
  it("returns all traits as an array", async () => {
    const result = await getAllTraits();
    expect(result).toHaveLength(2);
    expect(result).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ trait: "Curious" }),
        expect.objectContaining({ trait: "Creative" }),
      ]),
    );
  });
});
