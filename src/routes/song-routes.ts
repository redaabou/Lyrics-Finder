import { Router } from 'express';
import { getLyrics, getArtists, getSongsByArtist, searchSongByLyrics, createSong } from '../controllers/song-controller';

const router: Router = Router();

// Route pour obtenir les paroles d'une chanson
router.get('/lyrics/:title', getLyrics);

// Route pour obtenir la liste des artistes
router.get('/artists', getArtists);

// Route pour obtenir la liste des chansons d'un artiste
router.get('/artists/:id/songs', getSongsByArtist);

// Route pour obtenir la chansons depuis son parole

router.get('/search/lyrics', searchSongByLyrics);

// Routw de la creation d un chanson

router.post('/addsong', createSong);


export default router;
