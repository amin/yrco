import { vi, describe, it, expect, beforeEach } from "vitest";

vi.mock("../repositories/wordsRepository.js", () => ({
  findAll: vi.fn().mockResolvedValue({
    "word-1": { id: "word-1", word: "Curious", color: "#F59E0B", icebreaker: "What?" },
    "word-2": { id: "word-2", word: "Creative", color: "#8B5CF6", icebreaker: "How?" },
  }),
}));

import { getAllWords } from "../useCases/words/index.js";

beforeEach(() => vi.clearAllMocks());

describe("getAllWords", () => {
  it("returns all words as an array", async () => {
    const result = await getAllWords();
    expect(result).toHaveLength(2);
    expect(result).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ word: "Curious" }),
        expect.objectContaining({ word: "Creative" }),
      ]),
    );
  });
});
