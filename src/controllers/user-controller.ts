import { User } from "../models/user";
import Express from "express";

// update user 

export const updateUser = async (
    req: Express.Request,
    res: Express.Response
  ) => {
    try {
      const exestingUser = await User.findOne({ _id: req.user.id });
      if (!exestingUser) {
        res.status(404).json({ message: "user not found" });
        return;
      }
      
      const { email, firstname, lastname } = req.body;

      if (email || firstname || lastname) {
        const user = await User.updateOne(  
          { _id: req.user.id },
          { email, firstname, lastname }
        );
    
        res.status(200).json({ message: "user updated successfully" });
      }else{
        res.status(400).json({ message: "you can only update email, firstname or lastname" });

      }
     
    } catch (error) {
      res.status(500).json({ error: error.toString() });
    }
  };