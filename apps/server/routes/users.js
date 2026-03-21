import { Router } from "express";
import { getMe, completeSetup } from "../controllers/usersController.js";
import { requireAuth } from "../middleware/auth.js";

const router = Router();

router.get("/me", requireAuth, getMe);
router.post("/me/setup", requireAuth, completeSetup);

export default router;
