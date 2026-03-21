import { Router } from "express";
import { getMe, setupComplete, getMyWordsHandler } from "../controllers/usersController.js";
import { requireAuth } from "../middleware/auth.js";

const router = Router();

router.get("/me", requireAuth, getMe);
router.get("/me/words", requireAuth, getMyWordsHandler);
router.post("/me/setup", requireAuth, setupComplete);

export default router;
