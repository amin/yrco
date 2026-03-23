import { db } from "../../lib/firebase.js";

export async function clearCollections(...names) {
  for (const name of names) {
    const snap = await db.collection(name).get();
    const batch = db.batch();
    snap.docs.forEach((doc) => batch.delete(doc.ref));
    await batch.commit();
    console.log(`Cleared ${snap.size} docs from ${name}.`);
  }
}
