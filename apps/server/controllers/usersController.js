import { getPublicProfile } from "../services/usersService.js";
import { usernameSchema } from "@colyr/shared";

export async function getProfile(req, res) {
  const result = usernameSchema.safeParse(req.params.username);
  if (!result.success) return res.status(400).json({ error: result.error.issues[0].message });

  const profile = await getPublicProfile(result.data);
  if (!profile) return res.status(404).json({ error: "User not found" });
  res.json(profile);
}
