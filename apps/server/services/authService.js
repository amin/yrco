import axios from "axios";
import * as storageRepo from "../repositories/storageRepository.js";
import { upsertUser } from "./usersService.js";

const LINKEDIN_AUTH_URL = "https://www.linkedin.com/oauth/v2/authorization";
const LINKEDIN_TOKEN_URL = "https://www.linkedin.com/oauth/v2/accessToken";
const LINKEDIN_PROFILE_URL = "https://api.linkedin.com/v2/userinfo";

export function buildLinkedInAuthUrl(state) {
  const params = new URLSearchParams({
    response_type: "code",
    client_id: process.env.LINKEDIN_CLIENT_ID,
    redirect_uri: process.env.LINKEDIN_REDIRECT_URI,
    scope: "openid profile email",
    state,
  });
  return `${LINKEDIN_AUTH_URL}?${params}`;
}

export async function exchangeLinkedInCode(code) {
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

export async function fetchLinkedInProfile(accessToken) {
  const { data } = await axios.get(LINKEDIN_PROFILE_URL, {
    headers: { Authorization: `Bearer ${accessToken}` },
  });
  return data;
}

export async function uploadProfilePicture(uid, pictureUrl) {
  const { data } = await axios.get(pictureUrl, {
    responseType: "arraybuffer",
    headers: { "User-Agent": "Mozilla/5.0" },
  });
  return storageRepo.uploadImage(`profile-pictures/${uid}`, Buffer.from(data));
}

export async function handleLinkedInCallback(code, state, expectedState) {
  if (!state || state !== expectedState) throw new Error("Invalid OAuth state");

  const accessToken = await exchangeLinkedInCode(code);
  const profile = await fetchLinkedInProfile(accessToken);
  const pictureUrl = await uploadProfilePicture(profile.sub, profile.picture);

  const { setupComplete } = await upsertUser(profile.sub, {
    name: profile.name,
    firstName: profile.given_name,
    lastName: profile.family_name,
    email: profile.email,
    picture: pictureUrl,
  });

  return { uid: profile.sub, setupComplete };
}
