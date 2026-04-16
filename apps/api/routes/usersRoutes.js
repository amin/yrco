import { Router } from "express";
import { requireAuth } from "../middleware/requireAuth.js";
import { requireSetup } from "../middleware/requireSetup.js";
import {
  handleGetPublicUser,
  handleGetAllUsers,
  handleGetCurrentUser,
  handleCompleteUserSetup,
  handleGetUserConnections,
  handleAddUserConnection,
  handleRemoveUserConnection,
  handleUpdateUser,
  handleSetEmailOptIn,
} from "../controllers/usersController.js";

const router = Router();

// /me routes must be declared before /:username
router.get("/me", requireAuth, handleGetCurrentUser);
router.patch("/me", requireAuth, requireSetup, handleUpdateUser);
router.patch("/me/email-opt-in", requireAuth, requireSetup, handleSetEmailOptIn);
router.post("/me/setup", requireAuth, handleCompleteUserSetup);
router.get("/me/connections", requireAuth, requireSetup, handleGetUserConnections);
router.post("/me/connections", requireAuth, requireSetup, handleAddUserConnection);
router.delete("/me/connections/:username", requireAuth, requireSetup, handleRemoveUserConnection);

router.get("/", requireAuth, requireSetup, handleGetAllUsers);
router.get("/:username", requireAuth, requireSetup, handleGetPublicUser);

export default router;
