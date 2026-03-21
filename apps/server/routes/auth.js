import { Router } from "express";
import { linkedinRedirect, linkedinCallback, logout } from "../controllers/authController.js";

const router = Router();

router.get("/linkedin", linkedinRedirect);
router.get("/linkedin/callback", linkedinCallback);
router.post("/logout", logout);

export default router;
