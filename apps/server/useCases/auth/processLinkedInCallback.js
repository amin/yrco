import * as linkedInRepo from "../../repositories/linkedInRepository.js";
import * as storageRepo from "../../repositories/storageRepository.js";
import { upsertUser } from "./helpers/_upsertUser.js";

export async function processLinkedInCallback(code) {
  const accessToken = await linkedInRepo.fetchAccessToken(code);
  const profile = await linkedInRepo.fetchProfile(accessToken);
  const picture = await linkedInRepo.downloadProfilePicture(profile.picture);
  const pictureUrl = await storageRepo.uploadImage(`profile-pictures/${profile.sub}`, picture);

  const { setupComplete, username } = await upsertUser(profile.sub, {
    name: profile.name,
    firstName: profile.given_name,
    lastName: profile.family_name,
    email: profile.email,
    picture: pictureUrl,
  });

  return { uid: profile.sub, setupComplete, username };
}
