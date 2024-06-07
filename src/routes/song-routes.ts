import { Router } from "express";
import {
  getLyrics,
  getArtists,
  getSongsByArtistId,
  searchSongByLyrics,
  getSongsByArtistName,
  getSongById,
} from "../controllers/song-controller";

import { requireAuth } from "../middlewares/auth-middleware";
const router: Router = Router();

// Route pour obtenir les paroles d'une chanson
router.get("/lyrics/:title",requireAuth, getLyrics);

// Route pour obtenir la liste des artistes
router.get("/artists",requireAuth, getArtists);

// Route pour obtenir la liste des chansons d'un artiste
router.get("/artists/:id/songs",requireAuth, getSongsByArtistId);

//search by artist full name
router.get("/artistname",requireAuth, getSongsByArtistName);

// Route pour obtenir la chansons depuis son parole

router.get("/search/lyrics",requireAuth, searchSongByLyrics);

router.get('/songs/:id',requireAuth, getSongById);



export default router;
