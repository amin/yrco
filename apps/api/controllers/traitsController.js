import { getAllTraits } from "../useCases/traits/index.js";

export async function handleGetTraits(_req, res) {
  res.json(await getAllTraits());
}
