import {User} from "../models/user";
import Express from "express";
import mongoose from "mongoose";
import nodemailer from 'nodemailer';


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
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: process.env.SMTP_PORT,
      secure: true,
      auth: {
          user: process.env.SMTP_USER,
          pass: process.env.SMTP_PASS,
      },
  });

  await transporter.sendMail({
    from: process.env.SMTP_USER,
    to: subscribers.map(subscriber => subscriber.email).join(',') ,
    subject: 'Welcome to our Newsletter!',
    text: 'Thank you for subscribing to our newsletter. You will now receive regular updates from us.'
});

  res.status(200).json({ message: 'Emails sent successfully' });

  } catch (error) {
    res.status(500).json({ error: error.toString() });
  }
};

// subscribe to newsletter
export const subscribe = async (req:Express.Request, res:Express.Response) => {
  try {
    const user = await User.updateOne(
      { _id: req.user.id },
      { $set: { isSubscriber: true } }
    );
    res.status(200).json({ message: "You have successfully subscribed" });
  } catch (error) {
    res.status(500).json({ error: error.toString() });
  }
}

// unsubscribe from newsletter
export const unsubscribe = async (req:Express.Request, res:Express.Response) => {
  try {
    const user = await User.updateOne(
      { _id: req.user.id },
      { $set: { isSubscriber: false } }
    );
    res.status(200).json({ message: "You have successfully unsubscribed"});
  } catch (error) {
    res.status(500).json({ error: error.toString() });
  }
}

