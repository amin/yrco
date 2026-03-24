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
  const usernameSnap = await db.collection("usernames").doc(username).get();
  if (!usernameSnap.exists) return null;
  const { uid } = usernameSnap.data();
  const userSnap = await db.collection("users").doc(uid).get();
  if (!userSnap.exists) return null;
  return userSnap.data();
};

export const claimUsername = async (username, uid) => {
  const ref = db.collection("usernames").doc(username);
  try {
    await db.runTransaction(async (tx) => {
      const snap = await tx.get(ref);
      if (snap.exists && snap.data().uid !== uid) throw new Error("TAKEN");
      tx.set(ref, { uid });
    });
    return true;
  } catch (err) {
    if (err.message === "TAKEN") return false;
    throw err;
  }
};

export const findUidByUsername = async (username) => {
  const snap = await db.collection("usernames").doc(username).get();
  return snap.exists ? snap.data().uid : null;
};

export const addConnection = async (uid, targetUid) => {
  await db.collection("users").doc(uid).update({
    connectionIds: FieldValue.arrayUnion(targetUid),
    updatedAt: FieldValue.serverTimestamp(),
  });
};

export const removeConnection = async (uid, targetUid) => {
  await db.collection("users").doc(uid).update({
    connectionIds: FieldValue.arrayRemove(targetUid),
    updatedAt: FieldValue.serverTimestamp(),
  });
};

export const findByIds = async (uids) => {
  if (uids.length === 0) return [];
  const refs = uids.map((uid) => db.collection("users").doc(uid));
  const snaps = await db.getAll(...refs);
  return snaps.filter((s) => s.exists).map((s) => s.data());
};

export const save = async (uid, data) => {
  await db.collection("users").doc(uid).set(
    { ...data, updatedAt: FieldValue.serverTimestamp() },
    { merge: true },
  );
};
