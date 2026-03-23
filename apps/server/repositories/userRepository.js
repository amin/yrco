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

export const findByUsername = async (username) => {
  const snap = await db.collection("users").where("username", "==", username).limit(1).get();
  if (snap.empty) return null;
  return snap.docs[0].data();
};

export const isUsernameTaken = async (username) => {
  const snap = await db.collection("users").where("username", "==", username).limit(1).get();
  return !snap.empty;
};

export const save = async (uid, data) => {
  await db.collection("users").doc(uid).set(
    { ...data, updatedAt: FieldValue.serverTimestamp() },
    { merge: true },
  );
};
