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

  const { role, ...fields } = result.data;

  await db.collection("users").doc(req.user.uid).update({
    role,
    ...fields,
    setupComplete: true,
    updatedAt: FieldValue.serverTimestamp(),
  });

  res.json({ ok: true });
}

export async function getMyWords(req, res) {
  const userSnap = await db.collection("users").doc(req.user.uid).get();
  if (!userSnap.exists) return res.status(404).json({ error: "User not found" });

  const wordIds = userSnap.data().wordIds ?? [];
  if (wordIds.length === 0) return res.json([]);

  const snaps = await Promise.all(wordIds.map((id) => db.collection("words").doc(id).get()));
  const words = snaps
    .filter((s) => s.exists)
    .map((s) => ({ id: s.id, ...s.data() }));

  res.json(words);
}
