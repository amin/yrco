import * as wordsRepo from "../repositories/wordsRepository.js";

export const getAllWords = async () => Object.values(await wordsRepo.findAll());

export const getWordsByIds = async (ids) => {
  if (ids.length === 0) return [];
  const words = await wordsRepo.findAll();
  return ids.map((id) => words[id]).filter(Boolean);
};
