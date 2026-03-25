import Word from "../models/Word.js";
import { createCache } from "../lib/cache.js";

const cache = createCache();

export const findAll = async () => {
  if (cache.has()) return cache.get();
  const docs = await Word.find().lean();
  cache.set(
    Object.fromEntries(
      docs.map((doc) => {
        const id = doc._id.toString();
        return [id, { id, word: doc.word, color: doc.color, icebreaker: doc.icebreaker }];
      }),
    ),
  );
  return cache.get();
};

export const findByIds = async (ids) => {
  if (ids.length === 0) return [];
  const words = await findAll();
  return ids.map((id) => words[id]).filter(Boolean);
};
