import { Router } from "express";
import {
  updateUserRole,
  createSong,
  updateSongById,
  deleteSongById
} from "../controllers/admin-controller";
import { validateCreateSong } from "../validators/songValidation";
import { validate } from "../middlewares/validate";
import { requireAuth } from "../middlewares/auth-middleware";
import { checkAdmin } from '../middlewares/isAdmin'
const router: Router = Router();

//admin Routes
router.put('/updateRole',requireAuth,checkAdmin, updateUserRole );
router.post("/addsong",requireAuth,checkAdmin, validateCreateSong, validate, createSong);
router.put('/songs/:id',requireAuth,checkAdmin, updateSongById);
router.delete('/songs/:id',requireAuth,checkAdmin, deleteSongById);

export default router;