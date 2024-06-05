import mongoose from "mongoose";
import { Artist } from "../models/artiste";
import Express  from "express";

export const addArtist = async (req:Express.Request, res:Express.Response) => {
    const artistData = req.body;
    try {
        const artist = await Artist.create(artistData);
        res.status(201).json(artist);
    } catch (error) {
        res.status(500).json({ error: error.toString() });
    }
};