import  Express  from "express";
const router = Express.Router()
import {addArtist} from '../controllers/artist-controller'

router.route('/add-artist').post(addArtist)

export default router