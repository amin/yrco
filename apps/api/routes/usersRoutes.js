import { Router } from "express";
import { handleGetProfile, handleListUsers } from "../controllers/usersController.js";

const router = Router();

router.get("/", handleListUsers);
router.get("/:username", handleGetProfile);

export default router;
