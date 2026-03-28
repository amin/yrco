import * as userRepo from "../repositories/userRepository.js";
import * as linkedInService from "../services/linkedInService.js";
import * as storageService from "../services/storageService.js";
import { generateUsernameBase } from "../helpers/generateUsernameBase.js";

const generateUsername = async (firstName, lastName, uid) => {
  const base = generateUsernameBase(firstName, lastName);
  if (await userRepo.claimUsername(base, uid)) return base;

  const MAX_ATTEMPTS = 100;
  let n = 1;
  while (n <= MAX_ATTEMPTS && !(await userRepo.claimUsername(`${base}${n}`, uid))) n++;
  if (n > MAX_ATTEMPTS) throw { status: 500, message: "Failed to generate unique username" };
  return `${base}${n}`;
};

export const upsertUser = async (uid, profileData) => {
  const existing = await userRepo.findById(uid);

  if (existing) {
    await userRepo.upsert(uid, profileData);
    return { setupComplete: existing.setupComplete, username: existing.username };
  }

  const username = await generateUsername(profileData.firstName, profileData.lastName, uid);
  await userRepo.upsert(uid, {
    ...profileData,
    setupComplete: false,
    createdAt: new Date(),
    username,
  });
  return { setupComplete: false, username };
};

export async function authenticateWithLinkedIn(code) {
  const accessToken = await linkedInService.fetchAccessToken(code);
  const profile = await linkedInService.fetchProfile(accessToken);

  let pictureUrl = `https://api.dicebear.com/9.x/initials/svg?seed=${encodeURIComponent(profile.name)}`;
  try {
    const picture = await linkedInService.downloadProfilePicture(profile.picture);
    pictureUrl = await storageService.uploadImage(`profile-pictures/${profile.sub}`, picture);
  } catch (err) {
    console.error("Failed to upload profile picture, falling back to DiceBear:", err);
  }

  const { setupComplete, username } = await upsertUser(profile.sub, {
    name: profile.name,
    firstName: profile.given_name,
    lastName: profile.family_name,
    email: profile.email,
    picture: pictureUrl,
  });

  return { uid: profile.sub, setupComplete, username };
}
