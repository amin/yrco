import { getAllTraits } from "../usecases/traitsUseCases.js";

export async function handleGetAllTraits(_req, res) {
  res.json(await getAllTraits());
}
