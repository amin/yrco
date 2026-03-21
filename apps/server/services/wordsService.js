import { db } from "../lib/firebase.js";

let cache = null;

export async function getAllWords() {
  if (cache) return cache;
  const snap = await db.collection("words").get();
  cache = Object.fromEntries(
    snap.docs.map((doc) => [doc.id, { id: doc.id, ...doc.data() }])
  );
  return cache;
}

export async function getWordsByIds(ids) {
  if (ids.length === 0) return [];
  const wordCache = await getAllWords();
  return ids.map((id) => wordCache[id]).filter(Boolean);
}
