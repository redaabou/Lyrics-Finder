import { Router } from "express";
const router: Router = Router();
import { updateUser } from "../controllers/user-controller";

router.put("/:id", updateUser);

export { router as userRoutes}