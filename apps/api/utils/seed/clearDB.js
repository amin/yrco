import mongoose from "../../lib/mongoose.js";
import { COLLECTIONS } from "./config/collections.js";

async function clear() {
  for (const name of COLLECTIONS) {
    const { deletedCount } = await mongoose.connection.collection(name).deleteMany({});
    console.log(`Cleared ${deletedCount} docs from ${name}.`);
  }
  console.log("Database cleared.");
  process.exit(0);
}

clear().catch((err) => {
  console.error("Clear failed:", err);
  process.exit(1);
});
