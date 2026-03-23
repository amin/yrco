import { Router } from "express";
import { getMe, setupComplete, getMyWordsHandler } from "../controllers/usersController.js";
import { requireAuth } from "../middleware/auth.js";

const router = Router();

router.use(requireAuth);
router.get("/", getMe);
router.get("/words", getMyWordsHandler);
router.post("/setup", setupComplete);

export default router;
