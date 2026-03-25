const LINKEDIN_AUTH_URL = "https://www.linkedin.com/oauth/v2/authorization";

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
