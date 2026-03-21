import { Router } from "express";
import { linkedinRedirect, linkedinCallback, logout } from "../controllers/authController.js";
import { requireAuth } from "../middleware/auth.js";

const router = Router();

router.get("/linkedin", linkedinRedirect);
router.get("/linkedin/callback", linkedinCallback);
router.post("/logout", requireAuth, logout);

export default router;
