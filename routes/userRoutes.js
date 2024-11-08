import { Router } from "express";
import userController from "../controllers/userController.js";

const router = Router();

router.post("/signup", userController.PostSignup);
router.post("/login", userController.PostLogin);

export default router;
