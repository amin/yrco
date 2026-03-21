import { db } from "../lib/firebase.js";

export async function getWords(req, res) {
  const snap = await db.collection("words").get();
  const words = snap.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
  res.json(words);
}
