import { Router } from "express";
const router = Router();
import {
  createUser,
  logIn,
  forgotPassword,
  resetPassword,
} from "../controllers/auth-controller";
import { validate } from "../middlewares/validate";
import { registerValidationRules } from "../validators/registerValidation";
import { logInValidationRules } from "../validators/logInValidation";

router.post("/singup", registerValidationRules, validate, createUser);
router.post("/login", logInValidationRules, validate, logIn);
router.post("/forgotPassword", forgotPassword);
router.put("/resetPassword/:token", resetPassword);

export { router as authRouters };
