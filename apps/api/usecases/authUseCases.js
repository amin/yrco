import crypto from "crypto";
import * as userRepo from "../repositories/userRepository.js";
import * as sessionRepo from "../repositories/sessionRepository.js";
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

async function uploadProfilePicture(sub, name, linkedInPictureUrl) {
  const fallback = `https://api.dicebear.com/9.x/initials/svg?seed=${encodeURIComponent(name)}`;
  if (!linkedInPictureUrl) return;

  try {
    const picture = await linkedInService.downloadProfilePicture(linkedInPictureUrl);
    const pictureUrl = await storageService.uploadImage(`profile-pictures/${sub}`, picture);
    await userRepo.upsert(sub, { picture: pictureUrl });
  } catch (err) {
    console.error("Failed to upload profile picture, falling back to DiceBear:", err);
    await userRepo.upsert(sub, { picture: fallback });
  }
}

export async function authenticateWithLinkedIn(code) {
  const accessToken = await linkedInService.fetchAccessToken(code);
  const profile = await linkedInService.fetchProfile(accessToken);

  const fallbackPicture = `https://api.dicebear.com/9.x/initials/svg?seed=${encodeURIComponent(profile.name)}`;

  const { setupComplete, username } = await upsertUser(profile.sub, {
    name: profile.name,
    firstName: profile.given_name,
    lastName: profile.family_name,
    email: profile.email,
    picture: fallbackPicture,
  });

  await sessionRepo.deleteByUid(profile.sub);

  const sessionToken = crypto.randomUUID();
  const maxAge = 7 * 24 * 60 * 60 * 1000;
  await sessionRepo.create(sessionToken, profile.sub, new Date(Date.now() + maxAge));

  // Upload profile picture in the background — don't block login
  uploadProfilePicture(profile.sub, profile.name, profile.picture);

  return { sessionToken, maxAge, setupComplete, username };
}

export async function logout(token) {
  await sessionRepo.deleteByToken(token);
}
