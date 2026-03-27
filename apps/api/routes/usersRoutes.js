import { Router } from "express";
import { requireAuth } from "../middleware/auth.js";
import { requireSetup } from "../middleware/requireSetup.js";
import {
  handleGetProfile,
  handleListUsers,
  handleGetMe,
  handleGetMyTraits,
  handleCompleteSetup,
  handleListConnections,
  handleAddConnection,
  handleRemoveConnection,
  handleUpdateProfile,
} from "../controllers/usersController.js";

const router = Router();

// /me routes must be declared before /:username
router.get("/me", requireAuth, handleGetMe);
router.patch("/me", requireAuth, requireSetup, handleUpdateProfile);
router.post("/me/setup", requireAuth, handleCompleteSetup);
router.get("/me/traits", requireAuth, requireSetup, handleGetMyTraits);
router.get("/me/connections", requireAuth, requireSetup, handleListConnections);
router.post("/me/connections", requireAuth, requireSetup, handleAddConnection);
router.delete("/me/connections/:username", requireAuth, requireSetup, handleRemoveConnection);

router.get("/", handleListUsers);
router.get("/:username", handleGetProfile);

export default router;
