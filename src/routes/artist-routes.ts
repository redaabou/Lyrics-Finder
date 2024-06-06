import Express from "express";
const router = Express.Router();
import {
  addArtist,
  getAllArtist,
  getOneArtist,
  updateArtist,
  deleteArtist,
} from "../controllers/artist-controller";
import { requireAuth } from "../middlewares/auth-middleware";

router.route("/add-artist").post(addArtist);
router.route("/").get(getAllArtist);
router.route("/search/:firstName?/:lastName?").get(getOneArtist);
router.route("/:id").put(updateArtist).delete(deleteArtist);

export default router;
