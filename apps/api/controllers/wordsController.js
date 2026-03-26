import { getAllWords } from "../useCases/words/index.js";

export async function handleGetWords(_req, res) {
  res.json(await getAllWords());
}
