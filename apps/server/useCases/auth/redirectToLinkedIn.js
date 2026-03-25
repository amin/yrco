import { buildLinkedInAuthUrl } from "../../services/linkedInService.js";

export const redirectToLinkedIn = (state) => buildLinkedInAuthUrl(state);
