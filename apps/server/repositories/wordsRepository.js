import { db } from "../lib/firebase.js";
import { createCache } from "../lib/cache.js";

const cache = createCache();

export const findAll = async () => {
  if (cache.has()) return cache.get();
  const snap = await db.collection("words").get();
  cache.set(
    Object.fromEntries(snap.docs.map((doc) => [doc.id, { id: doc.id, ...doc.data() }])),
  );
  return cache.get();
};

export const findByIds = async (ids) => {
  if (ids.length === 0) return [];
  const words = await findAll();
  return ids.map((id) => words[id]).filter(Boolean);
};
