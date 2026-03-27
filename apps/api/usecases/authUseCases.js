import * as userRepo from "../repositories/userRepository.js";
import * as linkedInService from "../services/linkedInService.js";
import * as storageService from "../services/storageService.js";
import { generateUsernameBase } from "../helpers/generateUsernameBase.js";

const generateUsername = async (firstName, lastName, uid) => {
  const base = generateUsernameBase(firstName, lastName);
  if (await userRepo.claimUsername(base, uid)) return base;

  let n = 1;
  while (!(await userRepo.claimUsername(`${base}${n}`, uid))) n++;
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

export async function processLinkedInCallback(code) {
  const accessToken = await linkedInService.fetchAccessToken(code);
  const profile = await linkedInService.fetchProfile(accessToken);

  let pictureUrl = `https://api.dicebear.com/9.x/initials/svg?seed=${encodeURIComponent(profile.name)}`;
  try {
    const picture = await linkedInService.downloadProfilePicture(profile.picture);
    pictureUrl = await storageService.uploadImage(`profile-pictures/${profile.sub}`, picture);
  } catch {
    // fall back to generated avatar
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
