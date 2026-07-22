import { Router } from "express";
import * as authController from "../controllers/auth.controller";
import { authenticate } from "../middleware/auth.middleware";
import { validate } from "../../../shared/middleware";
import { registerSchema } from "../validators/register.validator";
import { loginSchema } from "../validators/login.validator";
import { updateProfileSchema } from "../validators/updateProfile.validator";

const router = Router();

router.post("/register", validate(registerSchema), authController.register);
router.post("/login", validate(loginSchema), authController.login);
router.post("/logout", authenticate, authController.logout);
router.get("/me", authenticate, authController.me);
router.patch("/profile", authenticate, validate(updateProfileSchema), authController.updateProfile);

export default router;
