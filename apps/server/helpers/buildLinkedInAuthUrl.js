const LINKEDIN_AUTH_URL = "https://www.linkedin.com/oauth/v2/authorization";

export function buildLinkedInAuthUrl(state, { clientId, redirectUri }) {
  const params = new URLSearchParams({
    response_type: "code",
    client_id: clientId,
    redirect_uri: redirectUri,
    scope: "openid profile email",
    state,
  });
  return `${LINKEDIN_AUTH_URL}?${params}`;
}
