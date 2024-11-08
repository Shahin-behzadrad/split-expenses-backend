import { Router } from "express";
import groupController from "../controllers/groupController.js";
import authenticateToken from "../middlewares/authMiddleware.js";

const router = Router();

router.get("/groups", authenticateToken, groupController.getAllGroups);
router.get("/groups/:groupId", authenticateToken, groupController.getGroupById);
router.post("/groups", authenticateToken, groupController.createGroup);
router.patch(
  "/groups/:groupId",
  authenticateToken,
  groupController.updateGroup
);
router.delete(
  "/groups/:groupId",
  authenticateToken,
  groupController.deleteGroup
);

export default router;
