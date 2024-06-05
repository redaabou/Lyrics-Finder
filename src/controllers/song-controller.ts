import { Request, Response } from 'express';
import { validationResult } from 'express-validator';
import Song from '../models/chanson';
import Artist from '../models/artiste';

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

export const searchSongByLyrics = async (req: Request, res: Response): Promise<void> => {
  try {
    const { lyrics } = req.query;
    if (!lyrics) {
      res.status(400).json({ msg: 'Lyrics query parameter is required' });
      return;
    }
    const songs = await Song.find({ lyrics: { $regex: lyrics, $options: 'i' } });
    if (songs.length === 0) {
      res.status(404).json({ msg: 'No songs found' });
      return;
    }
    res.json(songs);
  } catch (err) {
    res.status(500).send('Server Error');
  }
};

export const createSong = async (req: Request, res: Response): Promise<Response> => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const { genre, title, recorded_date, lyrics, artist } = req.body;

    // Check if the artist exists
    const existingArtist = await Artist.findById(artist);
    if (!existingArtist) {
      res.status(404).json({ msg: 'Artist not found' });
      return;
    }

    const newSong = new Song({
      genre,
      title,
      recorded_date,
      lyrics,
      artist,
    });

    const song = await newSong.save();
    res.status(201).json(song);
  } catch (err) {
    res.status(500).send('Server Error');
  }
};