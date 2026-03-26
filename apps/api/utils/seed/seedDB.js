import mongoose from "../../lib/mongoose.js";
import { COLLECTIONS } from "./config/collections.js";

async function seed() {
  const args = process.argv.slice(2).filter((a) => a !== "--");
  const target = args[0];

  const toRun = target ? [target] : COLLECTIONS;

  if (target && !COLLECTIONS.includes(target)) {
    console.error(`No seeder found for "${target}". Available: ${COLLECTIONS.join(", ")}`);
    process.exit(1);
  }

  for (const name of toRun) {
    await mongoose.connection.collection(name).deleteMany({});
    const mod = await import(`./seeders/seed${name[0].toUpperCase() + name.slice(1)}.js`);
    await Object.values(mod)[0]();
  }

  console.log("Database seeded successfully.");
  process.exit(0);
}

seed().catch((err) => {
  console.error("Seed failed:", err);
  process.exit(1);
});
