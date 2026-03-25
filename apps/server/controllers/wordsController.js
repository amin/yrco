import { getAllWords } from "../useCases/words/index.js";

export async function getWords(_req, res) {
  res.json(await getAllWords());
}
