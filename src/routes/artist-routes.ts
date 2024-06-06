import Express from "express";
const router = Express.Router();
import { addArtist } from "../controllers/artist-controller";
import { requireAuth } from "../middlewares/auth-middleware";

router.route("/add-artist").post(requireAuth, addArtist);

export default router;
