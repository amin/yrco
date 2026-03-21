import { db } from "./firebase.js";

let cache = null;

export async function getWordCache() {
  if (cache) return cache;
  const snap = await db.collection("words").get();
  cache = Object.fromEntries(
    snap.docs.map((doc) => [doc.id, { id: doc.id, ...doc.data() }])
  );
  return cache;
}
