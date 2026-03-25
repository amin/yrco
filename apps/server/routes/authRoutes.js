import { Router } from "express";
import { handleLinkedinRedirect, handleLinkedinCallback, handleLogout } from "../controllers/authController.js";
import { requireAuth } from "../middleware/auth.js";

const router = Router();

router.get("/linkedin", handleLinkedinRedirect);
router.get("/linkedin/callback", handleLinkedinCallback);

router.post("/logout", requireAuth, handleLogout);

export default router;
