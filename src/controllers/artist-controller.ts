import { Request, Response } from "express";
import Artist from "../models/artiste";
import { validationResult } from "express-validator";
import { cloudinary } from "../config/cloudinary";
import { disconnect } from "process";
import Express from "express";
import mongoose from "mongoose";
import artiste from "../models/artiste";

export const addArtist = async (req: Request, res: Response): Promise<void> => {
  const { firstname, lastname, genre, born_date, born_city, died_date } =
    req.body;

  try {
    const existingArtist = await Artist.findOne({ firstname, lastname });
    if (existingArtist) {
      res.status(409).json({ msg: "Aritst already exists" });
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

// get all artist
export const getAllArtist = async (
  req: Express.Request,
  res: Express.Response
) => {
  try {
    const artists = await Artist.find();
    if (artists.length == 0) {
      return res
        .status(404)
        .json({ message: "No Artist Found In The Database!" });
    }
    res
      .status(200)
      .json({ message: "This Is ALL The Artist In The Database:", artists });
  } catch (error) {
    res.status(500).json({ error: error.toString() });
  }
};

// get artist by name or last name
export const getOneArtist = async (
  req: Express.Request,
  res: Express.Response
) => {
  try {
    const { firstName, lastName } = req.query;

    // Validate query parameters
    if (!firstName && !lastName) {
      return res
        .status(400)
        .json({ message: "Please provide a first name or last name." });
    }

    // Build the query conditionally based on provided parameters
    let query = {};
    if (firstName && lastName) {
      query = { firstname: firstName, lastname: lastName };
    } else if (firstName) {
      query = { firstname: firstName };
    } else if (lastName) {
      query = { lastname: lastName };
    }

    // Find the artist by the constructed query
    const artist = await Artist.find(query);

    // If no artist is found, return a 404 response
    if (artist.length === 0) {
      return res.status(404).json({ message: "Artist Not Found" });
    }

    // Respond with the artist data
    res.status(200).json(artist);
  } catch (error) {
    // Handle any errors that occur during the process
    res.status(500).json({ error: error.message });
  }
};

// update artist
export const updateArtist = async (
  req: Express.Request,
  res: Express.Response
) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return res.status(400).json({ message: "Invalid id" });
    }

    const artist = await Artist.updateOne(
      { _id: req.params.id },
      { $set: req.body }
    );
    console.log(artist);

    if (artist.matchedCount === 0) {
      return res.status(404).json({ message: "Artist Not Found" });
    }

    res.status(200).json({ message: "Artist updated successfully" });
  } catch (error) {
    res.status(500).json({ error: error.toString() });
  }
};

// delete artist
export const deleteArtist = async (
  req: Express.Request,
  res: Express.Response
) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return res.status(400).json({ message: "Invalid id" });
    }

    const artist = await Artist.deleteOne({ _id: req.params.id });

    if (artist.deletedCount === 0) {
      return res.status(404).json({ message: "Artist Not Found " });
    }
    res.status(200).json({ message: "Artist deleted successfully", artist });
  } catch (error) {
    res.status(500).json({ error: error.toString() });
  }
};
