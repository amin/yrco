import { getAllWords } from "../services/wordsService.js";

export async function getWords(_req, res) {
  const words = Object.values(await getAllWords());
  res.json(words);
}
