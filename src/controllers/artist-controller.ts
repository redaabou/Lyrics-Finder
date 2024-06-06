import { Request, Response } from 'express';
import Artist from '../models/artiste';
import { validationResult } from 'express-validator';
import { cloudinary } from '../config/cloudinary';

export const addArtist = async (req: Request, res: Response): Promise<void> => {
  
    const { firstname, lastname, genre, born_date, born_city, died_date } = req.body;
    
    try {
      const existingArtist = await Artist.findOne({firstname, lastname})
      if (existingArtist) {
        res.status(409).json({msg: 'Aritst already exists'});
        return;
      }
      let picture_url = null;
      if (req.file) {
        const result = await cloudinary.uploader.upload(req.file.path);
        picture_url = result.secure_url;
      }

      const artist = new Artist({
        firstname,
        lastname,
        genre,
        born_date,
        born_city,
        died_date,
        picture_url,
      });

      await artist.save();
      res.status(201).json(artist);
    } catch (error) {
      res.status(500).json({ error: error.toString() });
    }
};
