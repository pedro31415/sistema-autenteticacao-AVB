import { Router } from "express";
import { authMiddleware } from "../middlewares/authMIddleware";
import { getProfile } from "../controllers/userController";

const router = Router();

router.get("/profile", authMiddleware, getProfile);

export default router;