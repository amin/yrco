import { db, FieldValue } from "../lib/firebase.js";

export const findById = async (uid) => {
  const snap = await db.collection("users").doc(uid).get();
  if (!snap.exists) return null;
  return snap.data();
};

export const update = async (uid, data) => {
  await db.collection("users").doc(uid).update({
    ...data,
    updatedAt: FieldValue.serverTimestamp(),
  });
};

export const save = async (uid, data) => {
  await db.collection("users").doc(uid).set(
    { ...data, updatedAt: FieldValue.serverTimestamp() },
    { merge: true },
  );
};
