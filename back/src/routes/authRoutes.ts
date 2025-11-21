import { Router } from "express";
import { login, register } from "../controllers/authController";
import { validate } from "../middlewares/validate";
import { loginSchema, registerSchema } from "../schemas/authSchema";

const router = Router();

router.post("/register", validate(registerSchema), register);
router.post("/login", validate(loginSchema),  login);

export default router;
