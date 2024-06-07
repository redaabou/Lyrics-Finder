import { Router } from "express";
const router: Router = Router();
import { updateUser } from "../controllers/user-controller";
import { requireAuth } from "../middlewares/auth-middleware";

router.patch("/", requireAuth, updateUser);

export { router as userRoutes };
