import { Router } from "express";
const router = Router();
import {
  createUser,
  logIn,
  forgotPassword,
  resetPassword,
  updatePassword,
} from "../controllers/auth-controller";
import { requireAuth } from "../middlewares/auth-middleware";
import { validate } from "../middlewares/validate";
import { registerValidationRules } from "../validators/registerValidation";
import { logInValidationRules } from "../validators/logInValidation";
import { validatePasswords } from "../validators/resetPasswordValidate";
import { validateEmail } from "../validators/forgetPasswordValidation";
import { validateRestoredCodeAndNewPassword } from "../validators/restPasswordValidationE";

router.post("/singup", registerValidationRules, validate, createUser);
router.post("/login", logInValidationRules, validate, logIn);
router.patch(
  "/resetPassword",
  validatePasswords,
  validate,
  requireAuth,
  updatePassword
);
router.post("/forgotPassword", validateEmail, validate, forgotPassword);
router.patch(
  "/resetPassword/:token",
  validateRestoredCodeAndNewPassword,
  validate,
  resetPassword
);

export { router as authRouters };
