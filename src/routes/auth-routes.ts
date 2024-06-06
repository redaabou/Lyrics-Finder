import { Router } from "express";
const router = Router();
import { createUser, logIn } from "../controllers/auth-controller";
import { validate } from "../middlewares/validate";
import { registerValidationRules } from "../validators/registerValidation";
import { logInValidationRules } from "../validators/logInValidation";

router.post("/singup", registerValidationRules, validate, createUser);
router.post("/login", registerValidationRules, validate, logIn);

export { router as authRouters };
