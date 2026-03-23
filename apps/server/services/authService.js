import axios from "axios";
import * as userRepo from "../repositories/userRepository.js";
import * as storageRepo from "../repositories/storageRepository.js";

const LINKEDIN_AUTH_URL = "https://www.linkedin.com/oauth/v2/authorization";
const LINKEDIN_TOKEN_URL = "https://www.linkedin.com/oauth/v2/accessToken";
const LINKEDIN_PROFILE_URL = "https://api.linkedin.com/v2/userinfo";

const transliterate = (str) =>
  str.normalize("NFD").replace(/[\u0300-\u036f]/g, "");

const generateUsername = async (firstName, lastName, uid) => {
  const base = transliterate(`${firstName}${lastName}`).toLowerCase().replace(/[^a-z0-9_]/g, "");
  if (await userRepo.claimUsername(base, uid)) return base;

  let n = 1;
  while (!(await userRepo.claimUsername(`${base}${n}`, uid))) n++;
  return `${base}${n}`;
};

export const upsertUser = async (uid, profileData) => {
  const existing = await userRepo.findById(uid);
  const isNew = !existing;
  const username = isNew ? await generateUsername(profileData.firstName, profileData.lastName, uid) : existing.username;

  await userRepo.save(uid, {
    ...profileData,
    ...(isNew && { setupComplete: false, createdAt: new Date(), username }),
  });

  return { setupComplete: isNew ? false : existing.setupComplete, username };
};

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

export async function handleLinkedInCallback(code, state, expectedState) {
  if (!state || state !== expectedState) throw new Error("Invalid OAuth state");

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
