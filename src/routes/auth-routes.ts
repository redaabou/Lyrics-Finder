import { Router } from "express";
const router = Router();
import { createUser, logIn } from "../controllers/auth-controller";

router.post("/singup", createUser);
router.post("/login", logIn);

export { router as authRouters };
