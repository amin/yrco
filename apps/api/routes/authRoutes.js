import { Router } from "express";
import {
  handleLinkedInRedirect,
  handleLinkedInCallback,
  handleLogout,
} from "../controllers/authController.js";
import { requireAuth } from "../middleware/requireAuth.js";
import { authLimiter } from "../middleware/rateLimit.js";

const router = Router();

router.use(authLimiter);

router.get("/linkedin", handleLinkedInRedirect);
router.get("/linkedin/callback", handleLinkedInCallback);

router.delete("/logout", requireAuth, handleLogout);

export default router;
