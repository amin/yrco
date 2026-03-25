import { buildLinkedInAuthUrl } from "../../services/linkedInService.js";

export const redirectToLinkedIn = (state) =>
  buildLinkedInAuthUrl(state, {
    clientId: process.env.LINKEDIN_CLIENT_ID,
    redirectUri: process.env.LINKEDIN_REDIRECT_URI,
  });
