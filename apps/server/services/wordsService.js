import { db } from "../lib/firebase.js";
import { createCache } from "../lib/cache.js";

const wordsCache = createCache();

export async function getAllWords() {
  if (wordsCache.has()) return wordsCache.get();
  const snap = await db.collection("words").get();
  wordsCache.set(
    Object.fromEntries(snap.docs.map((doc) => [doc.id, { id: doc.id, ...doc.data() }]))
  );
  return wordsCache.get();
}

export async function getWordsByIds(ids) {
  if (ids.length === 0) return [];
  const words = await getAllWords();
  return ids.map((id) => words[id]).filter(Boolean);
}
