import { Router } from 'express';
import { getLyrics, getArtists, getSongsByArtistId, searchSongByLyrics, createSong, getSongsByArtistName } from '../controllers/song-controller';
import { validateCreateSong } from '../validators/songValidation';
import {validate} from '../middleware/validate';
const router: Router = Router();

// Route pour obtenir les paroles d'une chanson
router.get('/lyrics/:title', getLyrics);

// Route pour obtenir la liste des artistes
router.get('/artists', getArtists);

// Route pour obtenir la liste des chansons d'un artiste
router.get('/artists/:id/songs', getSongsByArtistId);

//search by artist full name
router.get('/artistname', getSongsByArtistName);

// Route pour obtenir la chansons depuis son parole

router.get('/search/lyrics', searchSongByLyrics);

// Routw de la creation d un chanson

router.post('/addsong',validateCreateSong, validate, createSong);


export default router;
