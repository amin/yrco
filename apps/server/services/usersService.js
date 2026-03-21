import { db, FieldValue } from "../lib/firebase.js";

export async function getUser(uid) {
  const snap = await db.collection("users").doc(uid).get();
  if (!snap.exists) return null;
  return snap.data();
}

export async function updateUser(uid, data) {
  await db.collection("users").doc(uid).update({
    ...data,
    updatedAt: FieldValue.serverTimestamp(),
  });
}

export async function upsertUser(uid, { name, firstName, lastName, email, picture }) {
  const userRef = db.collection("users").doc(uid);
  const existing = await userRef.get();
  const isNewUser = !existing.exists;

  await userRef.set(
    {
      name,
      firstName,
      lastName,
      email,
      picture,
      updatedAt: FieldValue.serverTimestamp(),
      ...(isNewUser && { setupComplete: false, createdAt: FieldValue.serverTimestamp() }),
    },
    { merge: true },
  );

  return { isNewUser, setupComplete: isNewUser ? false : (await userRef.get()).data().setupComplete };
}
