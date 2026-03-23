import { Router } from "express";
import { getProfile } from "../controllers/usersController.js";

const router = Router();

router.get("/:username", getProfile);

export default router;
