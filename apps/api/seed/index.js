import { clearCollections } from "./helpers/clearDb.js";
import { seedWords } from "./seeders/seedWords.js";
import { seedUsers } from "./seeders/seedUsers.js";

async function seed() {
  await clearCollections("words", "users");
  await seedWords();
  await seedUsers();
  console.log("Database seeded successfully.");
  process.exit(0);
}

seed().catch((err) => {
  console.error("Seed failed:", err);
  process.exit(1);
});
