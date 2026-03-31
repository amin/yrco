import mongoose, { connectDB } from "../../lib/mongoose.js";
import { COLLECTIONS } from "./config/collections.js";

async function clear() {
  await connectDB();
  const args = process.argv.slice(2).filter((a) => a !== "--");
  const target = args[0];

  if (target && !COLLECTIONS.includes(target)) {
    console.error(`No collection found for "${target}". Available: ${COLLECTIONS.join(", ")}`);
    process.exit(1);
  }

  const toRun = target ? [target] : COLLECTIONS;

  for (const name of toRun) {
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
