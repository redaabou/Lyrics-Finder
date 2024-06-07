import { Request, Response } from 'express';
import { User } from "../models/user";
import { validationResult } from 'express-validator';
import Song from '../models/chanson';
import Artist from '../models/artiste';

export const updateUserRole = async (req: Request, res: Response): Promise<void> => {
    const { email, newRole } = req.body;
    console.log(email, newRole);
  
    try {
      const user = await User.findOne({ email });
  
      if (!user) {
        res.status(404).json({ message: 'User not found' });
        return;
      }
  
      await User.updateOne({ email }, { isAdmin: newRole });
  
      res.status(200).json({ message: 'User role updated successfully' });
    } catch (error) {
      res.status(500).json({ message: 'Server error', error: error.toString() });
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