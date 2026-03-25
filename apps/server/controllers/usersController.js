import { getPublicProfile } from "../useCases/users/index.js";
import { usernameSchema } from "@colyr/shared";

export async function handleGetProfile(req, res) {
  const result = usernameSchema.safeParse(req.params.username);
  if (!result.success) throw { status: 400, message: result.error.issues[0].message };

  res.json(await getPublicProfile(result.data));
}
