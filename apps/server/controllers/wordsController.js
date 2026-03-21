import { getAllWords } from "../services/wordsService.js";

export async function getWords(_req, res) {
  res.json(await getAllWords());
}
