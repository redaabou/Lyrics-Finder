import  Express  from "express";
const router = Express.Router()
import {addArtist} from '../controllers/artist-controller'
import { validateArtist } from '../validators/artisteValidation';
import {validate} from '../middleware/validate';
import upload from './../config/multer';

router.post('/add-artist',upload, validateArtist, validate, addArtist);

export default router