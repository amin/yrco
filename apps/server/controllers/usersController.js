import { db, FieldValue } from "../lib/firebase.js";

export async function getMe(req, res) {
  const snap = await db.collection("users").doc(req.user.uid).get();
  if (!snap.exists) return res.status(404).json({ error: "User not found" });
  res.json(snap.data());
}

export async function completeSetup(req, res) {
  const { role } = req.body;

  if (role !== "student" && role !== "organization") {
    return res.status(400).json({ error: "Invalid role" });
  }

  await db.collection("users").doc(req.user.uid).update({
    role,
    setupComplete: true,
    updatedAt: FieldValue.serverTimestamp(),
  });

  res.json({ ok: true });
}
