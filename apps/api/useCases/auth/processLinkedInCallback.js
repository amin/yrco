import * as linkedInService from "../../services/linkedInService.js";
import * as storageService from "../../services/storageService.js";
import { upsertUser } from "./helpers/_upsertUser.js";

export async function processLinkedInCallback(code) {
  const accessToken = await linkedInService.fetchAccessToken(code);
  const profile = await linkedInService.fetchProfile(accessToken);
  const picture = await linkedInService.downloadProfilePicture(profile.picture);
  const pictureUrl = await storageService.uploadImage(`profile-pictures/${profile.sub}`, picture);

  const { setupComplete, username } = await upsertUser(profile.sub, {
    name: profile.name,
    firstName: profile.given_name,
    lastName: profile.family_name,
    email: profile.email,
    picture: pictureUrl,
  });

  return { uid: profile.sub, setupComplete, username };
}
