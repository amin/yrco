import { Router } from "express";
import { handleGetProfile } from "../controllers/usersController.js";

const router = Router();

router.get("/:username", handleGetProfile);

export default router;
