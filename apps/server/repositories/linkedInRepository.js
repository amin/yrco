import axios from "axios";

const LINKEDIN_TOKEN_URL = "https://www.linkedin.com/oauth/v2/accessToken";
const LINKEDIN_PROFILE_URL = "https://api.linkedin.com/v2/userinfo";

export const fetchAccessToken = async (code) => {
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
};

export const fetchProfile = async (accessToken) => {
  const { data } = await axios.get(LINKEDIN_PROFILE_URL, {
    headers: { Authorization: `Bearer ${accessToken}` },
  });
  return data;
};

export const downloadProfilePicture = async (url) => {
  const { data } = await axios.get(url, {
    responseType: "arraybuffer",
    headers: { "User-Agent": "Mozilla/5.0" },
  });
  return Buffer.from(data);
};
