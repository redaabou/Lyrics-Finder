import Artist from "../models/artiste";
import Express from "express";
import mongoose from "mongoose";

// add artist
export const addArtist = async (
  req: Express.Request,
  res: Express.Response
) => {
  const artistData = req.body;
  try {
    console.log(artistData);
    const artist = await Artist.create(artistData);
    res.status(201).json({ message: "Artist added successfuly!", artist });
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

    if (!firstName && !lastName) {
      return res
        .status(400)
        .json({ message: "Please provide a first name or last name." });
    }

    let query = {};
    if (firstName && lastName) {
      query = { firstname: firstName, lastname: lastName };
    } else if (firstName) {
      query = { firstname: firstName };
    } else if (lastName) {
      query = { lastname: lastName };
    }

    const artist = await Artist.find(query);

    if (artist.length === 0) {
      return res.status(404).json({ message: "Artist Not Found" });
    }

    res.status(200).json(artist);
  } catch (error) {
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
