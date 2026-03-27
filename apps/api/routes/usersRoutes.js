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
} from "../controllers/usersController.js";

const router = Router();

// /me routes must be declared before /:username
router.get("/me", requireAuth, handleGetCurrentUser);
router.patch("/me", requireAuth, requireSetup, handleUpdateUser);
router.post("/me/setup", requireAuth, handleCompleteUserSetup);
router.get("/me/connections", requireAuth, requireSetup, handleGetUserConnections);
router.post("/me/connections", requireAuth, requireSetup, handleAddUserConnection);
router.delete("/me/connections/:username", requireAuth, requireSetup, handleRemoveUserConnection);

router.get("/", handleGetAllUsers);
router.get("/:username", handleGetPublicUser);

export default router;
