import { Request, Response } from 'express';
import Song from '../models/Song';
import Artist from '../models/Artist';

// Contrôleur pour obtenir les paroles d'une chanson
export const getLyrics = async (req: Request, res: Response): Promise<void> => {
  try {
    const song = await Song.findOne({ title: req.params.title });
    if (!song) {
      res.status(404).json({ msg: 'Song not found' });
      return;
    }
    res.json(song);
  } catch (err) {
    res.status(500).send('Server Error');
  }
};

// Contrôleur pour obtenir la liste des artistes
export const getArtists = async (req: Request, res: Response): Promise<void> => {
  try {
    const artists = await Artist.find();
    res.json(artists);
  } catch (err) {
    res.status(500).send('Server Error');
  }
};

// Contrôleur pour obtenir la liste des chansons d'un artiste
export const getSongsByArtist = async (req: Request, res: Response): Promise<void> => {
  try {
    const artist = await Artist.findById(req.params.id);
    if (!artist) {
      res.status(404).json({ msg: 'Artist not found' });
      return;
    }
    const songs = await Song.find({ artist: req.params.id });
    res.json(songs);
  } catch (err) {
    res.status(500).send('Server Error');
  }
};
