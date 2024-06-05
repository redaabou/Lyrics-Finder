import { Router } from "express";
const router = Router();
import { singUpPost, logInPost } from "../controllers/auth-controller";

router.post("/singup", singUpPost);
router.post("/login", logInPost);

export { router as authRouters };
