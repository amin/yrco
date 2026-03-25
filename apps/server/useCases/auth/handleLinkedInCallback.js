import axios from "axios";
import * as storageRepo from "../../repositories/storageRepository.js";
import { upsertUser } from "./upsertUser.js";

const LINKEDIN_TOKEN_URL = "https://www.linkedin.com/oauth/v2/accessToken";
const LINKEDIN_PROFILE_URL = "https://api.linkedin.com/v2/userinfo";

async function exchangeLinkedInCode(code) {
  const { data } = await axios.post(
    LINKEDIN_TOKEN_URL,
    new URLSearchParams({
      grant_type: "authorization_code",
      code,
      redirect_uri: process.env.LINKEDIN_REDIRECT_URI,
      client_id: process.env.LINKEDIN_CLIENT_ID,
      client_secret: process.env.LINKEDIN_CLIENT_SECRET,
    }),
    { headers: { "Content-Type": "application/x-www-form-urlencoded" } },
  );
  return data.access_token;
}

async function fetchLinkedInProfile(accessToken) {
  const { data } = await axios.get(LINKEDIN_PROFILE_URL, {
    headers: { Authorization: `Bearer ${accessToken}` },
  });
  return data;
}

async function uploadProfilePicture(uid, pictureUrl) {
  const { data } = await axios.get(pictureUrl, {
    responseType: "arraybuffer",
    headers: { "User-Agent": "Mozilla/5.0" },
  });
  return storageRepo.uploadImage(`profile-pictures/${uid}`, Buffer.from(data));
}

export async function handleLinkedInCallback(code) {
  const accessToken = await exchangeLinkedInCode(code);
  const profile = await fetchLinkedInProfile(accessToken);
  const pictureUrl = await uploadProfilePicture(profile.sub, profile.picture);

  const { setupComplete, username } = await upsertUser(profile.sub, {
    name: profile.name,
    firstName: profile.given_name,
    lastName: profile.family_name,
    email: profile.email,
    picture: pictureUrl,
  });

  return { uid: profile.sub, setupComplete, username };
}
