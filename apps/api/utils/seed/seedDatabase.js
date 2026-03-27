import mongoose from "../../lib/mongoose.js";
import { COLLECTIONS } from "./config/collections.js";
import { seedTraits } from "./seeders/traitsSeeder.js";
import { seedUsers } from "./seeders/usersSeeder.js";

const SEEDERS = { traits: seedTraits, users: seedUsers };

async function seed() {
  const args = process.argv.slice(2).filter((a) => a !== "--");
  const target = args[0];

  if (target && !COLLECTIONS.includes(target)) {
    console.error(`No seeder found for "${target}". Available: ${COLLECTIONS.join(", ")}`);
    process.exit(1);
  }

  const toRun = target ? [target] : COLLECTIONS;

  for (const name of toRun) {
    await mongoose.connection.collection(name).deleteMany({});
    await SEEDERS[name]();
  }

  console.log("Database seeded successfully.");
  process.exit(0);
}

seed().catch((err) => {
  console.error("Seed failed:", err);
  process.exit(1);
});
