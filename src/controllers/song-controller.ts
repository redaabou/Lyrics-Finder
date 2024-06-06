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
export const getSongsByArtistId = async (req: Request, res: Response): Promise<void> => {
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
export const getSongsByArtistName = async (req: Request, res: Response): Promise<void> => {
  try {
    let { firstname, lastname } = req.query;

    // Check if both first name and last name are provided
    if (!firstname || !lastname) {
      res.status(400).json({ msg: 'Both first name and last name are required in the query parameters' });
      return;
    }

    // Convert the input names to lowercase
    firstname = (firstname as string).toLowerCase();
    lastname = (lastname as string).toLowerCase();

    // Find the artist by lowercase first name and last name
    const artist = await Artist.findOne({ firstname: { $regex: new RegExp('^' + firstname + '$', 'i') }, lastname: { $regex: new RegExp('^' + lastname + '$', 'i') } });
    
    if (!artist) {
      res.status(404).json({ msg: 'Artist not found' });
      return;
    }

    // Once you have the artist, find their songs
    const songs = await Song.find({ artist: artist._id });
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

export const createSong = async (req: Request, res: Response): Promise<void> => {
  
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


//update
export const updateSongById = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const { genre, title, recorded_date, lyrics, artist } = req.body;

    // Check if the song exists
    const existingSong = await Song.findById(id);
    if (!existingSong) {
      res.status(404).json({ msg: 'Song not found' });
      return;
    }

    // Check if the artist exists (if provided)
    if (artist) {
      const existingArtist = await Artist.findById(artist);
      if (!existingArtist) {
        res.status(404).json({ msg: 'Artist not found' });
        return;
      }
    }

    // Update the song fields
    existingSong.genre = genre ?? existingSong.genre;
    existingSong.title = title ?? existingSong.title;
    existingSong.recorded_date = recorded_date ?? existingSong.recorded_date;
    existingSong.lyrics = lyrics ?? existingSong.lyrics;
    existingSong.artist = artist ?? existingSong.artist;

    const updatedSong = await existingSong.save();
    res.status(200).json(updatedSong);
  } catch (err) {
    res.status(500).send('Server Error');
  }
};

//getSongById

export const getSongById = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;

    const song = await Song.findById(id);
    if (!song) {
      res.status(404).json({ msg: 'Song not found' });
      return;
    }

    res.status(200).json(song);
  } catch (err) {
    res.status(500).send('Server Error');
  }
};

//deleteSong

export const deleteSongById = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;

    const song = await Song.findByIdAndDelete(id);
    if (!song) {
      res.status(404).json({ msg: 'Song not found' });
      return;
    }

    res.status(200).json({ msg: 'Song deleted successfully' });
  } catch (err) {
    res.status(500).send('Server Error');
  }
};