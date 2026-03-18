import { Router } from "express";
import { linkedinRedirect, linkedinCallback } from "../controllers/authController.js";

const router = Router();

router.get("/linkedin", linkedinRedirect);
router.get("/linkedin/callback", linkedinCallback);

export default router;
