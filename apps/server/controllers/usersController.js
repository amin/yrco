import { db } from "../lib/firebase.js";

export async function getMe(req, res) {
  const snap = await db.collection("users").doc(req.user.uid).get();
  if (!snap.exists) return res.status(404).json({ error: "User not found" });
  res.json(snap.data());
}
