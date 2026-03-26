import mongoose from "../../lib/mongoose.js";

export async function clearCollections(...names) {
  for (const name of names) {
    const collection = mongoose.connection.collection(name);
    const { deletedCount } = await collection.deleteMany({});
    console.log(`Cleared ${deletedCount} docs from ${name}.`);
  }
}
