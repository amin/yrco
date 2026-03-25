import Word from "../models/Word.js";
import User from "../models/User.js";
import { clearCollections } from "./helpers/clearDb.js";

const wordDocs = await Word.find().lean();
const wordIds = wordDocs.map((d) => d._id.toString());

const users = [
  {
    uid: "seed-user-1",
    username: "alex",
    name: "Alex Eriksson",
    firstName: "Alex",
    lastName: "Eriksson",
    email: "alex@example.com",
    picture: "https://i.pravatar.cc/150?u=alex",
    website: "https://alexeriksson.se",
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
    website: "https://saralindqvist.design",
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
    website: "https://spotify.com",
    role: "organization",
    organizationName: "Spotify",
    roleAtCompany: "Engineering Manager",
    setupComplete: true,
    wordIds: wordIds.slice(5, 10),
  },
];

async function seedUsers() {
  await clearCollections("users");
  await User.insertMany(users);
  console.log(`Seeded ${users.length} users.`);
  process.exit(0);
}

seedUsers().catch((err) => {
  console.error("Seed failed:", err);
  process.exit(1);
});
