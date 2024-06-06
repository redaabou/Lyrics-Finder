import { Router } from "express";
const router = Router();
import { createUser, logIn } from "../controllers/auth-controller";
import { requireAuth } from "../middlewares/auth-middleware";

router.post("/singup", requireAuth, createUser);
router.post("/login", logIn);

export { router as authRouters };
