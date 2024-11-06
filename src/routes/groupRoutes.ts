import { Router } from "express";
import groupController from "../controllers/groupController";

const router = Router();

router.get("/", groupController.getAllGroups);
router.get("/:id", groupController.getGroupById);
router.post("/", groupController.createGroup);
router.patch("/:id", groupController.updateGroup);

export default router;
