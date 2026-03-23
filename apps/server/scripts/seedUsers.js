import "dotenv/config";
import { db, FieldValue } from "../lib/firebase.js";

const words = await db.collection("words").get();
const wordIds = words.docs.map((doc) => doc.id);

const users = [
  {
    uid: "seed-user-1",
    username: "alex",
    name: "Alex Eriksson",
    firstName: "Alex",
    lastName: "Eriksson",
    email: "alex@example.com",
    picture: "https://i.pravatar.cc/150?u=alex",
    role: "student",
    education: "Web Developer",
    setupComplete: true,
    wordIds: wordIds.slice(0, 5),
  },
  {
    uid: "seed-user-2",
    username: "sara",
    name: "Sara Lindqvist",
    firstName: "Sara",
    lastName: "Lindqvist",
    email: "sara@example.com",
    picture: "https://i.pravatar.cc/150?u=sara",
    role: "student",
    education: "Digital Designer",
    setupComplete: true,
    wordIds: wordIds.slice(2, 7),
  },
  {
    uid: "seed-user-3",
    username: "marcus",
    name: "Marcus Berg",
    firstName: "Marcus",
    lastName: "Berg",
    email: "marcus@example.com",
    picture: "https://i.pravatar.cc/150?u=marcus",
    role: "organization",
    organizationName: "Spotify",
    roleAtCompany: "Engineering Manager",
    setupComplete: true,
    wordIds: wordIds.slice(5, 10),
  },
];

async function seedUsers() {
  const usersBatch = db.batch();
  const usernamesBatch = db.batch();

  for (const { uid, username, ...data } of users) {
    usersBatch.set(db.collection("users").doc(uid), {
      ...data,
      username,
      createdAt: FieldValue.serverTimestamp(),
      updatedAt: FieldValue.serverTimestamp(),
    });
    usernamesBatch.set(db.collection("usernames").doc(username), { uid });
  }

  await usersBatch.commit();
  await usernamesBatch.commit();
  console.log(`Seeded ${users.length} users.`);
}

seedUsers().catch((err) => {
  console.error("Seed failed:", err);
  process.exit(1);
});
