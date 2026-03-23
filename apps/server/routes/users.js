import { Router } from "express";
import { getMe, setupComplete, getMyWordsHandler, getProfile } from "../controllers/usersController.js";
import { requireAuth } from "../middleware/auth.js";

const router = Router();

router.get("/me", requireAuth, getMe);
router.get("/me/words", requireAuth, getMyWordsHandler);
router.post("/me/setup", requireAuth, setupComplete);
router.get("/:username", getProfile);

export default router;
