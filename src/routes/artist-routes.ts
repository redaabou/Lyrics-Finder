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
import { validateArtist } from "../validators/artisteValidation";
import { validate } from "../middlewares/validate";
import upload from "./../config/multer";

router.post(
  "/add-artist",
  requireAuth,
  upload,
  validateArtist,
  validate,
  addArtist
);
router.route("/").get(getAllArtist);
router.route("/search/:firstName?/:lastName?").get(getOneArtist);
router.route("/:id").put(updateArtist).delete(deleteArtist);

export default router;
