import { User } from "../models/user";
import Express from "express";
import mongoose from "mongoose";
import nodemailer from "nodemailer";
import { sendEmail } from "../services/email-service";

// get the email of the subscriber from the user wher isSubscriber is true
export const sendMailToAllSubs = async (
  req: Express.Request,
  res: Express.Response
) => {
  try {
    const subscribers = await User.find({ isSubscriber: true });
    console.log(subscribers);

    if (subscribers.length == 0) {
      return res
        .status(404)
        .json({ message: "No Subscriber Found In The Database!" });
    }
    await sendEmail(subscribers);
    res.status(200).json({ message: "Emails sent successfully" });
  } catch (error) {
    res.status(500).json({ error: error.toString() });
  }
};

// subscribe to newsletter
export const subscribe = async (
  req: Express.Request,
  res: Express.Response
) => {
  try {
    const user = await User.updateOne(
      { _id: req.user.id },
      { $set: { isSubscriber: true } }
    );
    res.status(200).json({ message: "You have successfully subscribed" });
  } catch (error) {
    res.status(500).json({ error: error.toString() });
  }
};

// unsubscribe from newsletter
export const unsubscribe = async (
  req: Express.Request,
  res: Express.Response
) => {
  try {
    const user = await User.updateOne(
      { _id: req.user.id },
      { $set: { isSubscriber: false } }
    );
    res.status(200).json({ message: "You have successfully unsubscribed" });
  } catch (error) {
    res.status(500).json({ error: error.toString() });
  }
};
