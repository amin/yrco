import { vi, describe, it, expect, beforeEach } from "vitest";

vi.mock("../repositories/wordsRepository.js", () => ({
  findAll: vi.fn().mockResolvedValue({
    "word-1": { id: "word-1", word: "Curious", color: "#F59E0B", icebreaker: "What?" },
    "word-2": { id: "word-2", word: "Creative", color: "#8B5CF6", icebreaker: "How?" },
  }),
}));

import { getAllWords, getWordsByIds } from "../services/wordsService.js";

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

describe("getWordsByIds", () => {
  it("returns words matching the given IDs", async () => {
    const result = await getWordsByIds(["word-1"]);
    expect(result).toHaveLength(1);
    expect(result[0].word).toBe("Curious");
  });

  it("returns empty array for empty IDs", async () => {
    const result = await getWordsByIds([]);
    expect(result).toEqual([]);
  });

  it("filters out IDs that do not exist in the word map", async () => {
    const result = await getWordsByIds(["word-1", "nonexistent", "word-2"]);
    expect(result).toHaveLength(2);
    expect(result[0].word).toBe("Curious");
    expect(result[1].word).toBe("Creative");
  });

  it("returns empty array when no IDs match", async () => {
    const result = await getWordsByIds(["nope", "also-nope"]);
    expect(result).toEqual([]);
  });
});
