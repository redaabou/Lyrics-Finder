import { User } from "../models/user";
import Express from "express";
import mongoose from "mongoose";

// update user 

export const updateUser = async (
    req: Express.Request,
    res: Express.Response
  ) => {
    try {
      if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
        return res.status(400).json({ message: "Invalid id" });
      }
  
      const user = await User.updateOne(
        { _id: req.params.id },
        { $set: req.body }
      );
  
      if (user.matchedCount === 0) {
        return res.status(404).json({ message: "user Not Found" });
      }
  
      res.status(200).json({ message: "user updated successfully" });
    } catch (error) {
      res.status(500).json({ error: error.toString() });
    }
  };