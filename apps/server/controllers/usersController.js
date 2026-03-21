import { db, FieldValue } from "../lib/firebase.js";
import { setupSchema } from "@yingle/shared";

export async function getMe(req, res) {
  const snap = await db.collection("users").doc(req.user.uid).get();
  if (!snap.exists) return res.status(404).json({ error: "User not found" });
  res.json(snap.data());
}

export async function completeSetup(req, res) {
  const result = setupSchema.safeParse(req.body);
  if (!result.success) {
    return res.status(400).json({ error: result.error.issues[0].message });
  }

  await db.collection("users").doc(req.user.uid).update({
    role: result.data.role,
    setupComplete: true,
    updatedAt: FieldValue.serverTimestamp(),
  });

  res.json({ ok: true });
}
