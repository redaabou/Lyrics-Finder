// importe the user model from the database
import { Request, Response } from "express";
import bcrypt from "bcryptjs"; // Assuming you're hashing passwords
import crypto from "crypto";
import cookie from "cookie-parser";
import jwt from "jsonwebtoken";
import { User } from "../models/user";
import { sendEmail } from "../services/email-service";

//hundel the error
function handleError(err) {
  let errors = {};

  if (err.code == 11000) {
    let emailError = { email: "This email is not valide" };
    errors = emailError;
    return errors;
  }
  if (err.message.includes("User validation failed")) {
    Object.values(err.errors).forEach(({ properties }) => {
      errors[properties.path] = properties.message;
    });
  }
  return errors;
}

// function to creat a jsonwebtoken

const maxAge = 3 * 24 * 60 * 60;
const createTocken = (id, isAdmin) => {
  return jwt.sign({ id, isAdmin }, process.env.ACCESS_TOKEN_SECRET, {
    expiresIn: maxAge,
  });
};
// implement the functionalty
const createUser = async (req, res) => {
  const { email, password, firstname, lastname } = req.body;
  try {
    // creat a new user
    const newUser = await User.create({
      email,
      password,
      firstname,
      lastname,
    });
    const token = createTocken(newUser._id, newUser.isAdmin);
    /*
    res.setHeader("Authorization", token, {
      httpOnly: true,
      maxAge: maxAge * 1000,
    });*/
    //res.cookie("JWT", token, { httpOnly: true, maxAge: maxAge * 1000 });
    res.setHeader("Authorization", token);

    // return just for the test
    res.status(201).json({ User: newUser._id });
  } catch (error) {
    const errors = handleError(error);
    res.status(404).json({ errors });
  }
};

const logIn = async (
  req: Request<{}, {}, { email: string; password: string }>,
  res: Response
) => {
  const { email, password } = req.body;
  try {
    // Find the user by email
    const user = await User.findOne({ email });
    if (!user) {
      // User not found
      return res.status(404).json({ error: "User not found." });
    }

    // Compare the provided password with the stored hashed password
    const isValidPassword = await bcrypt.compare(password, user.password);

    if (!isValidPassword) {
      // Password does not match
      return res.status(401).json({ error: "Invalid credentials." });
    }

    // Return the user details for the test
    const token = createTocken(user._id, user.isAdmin);
    res.setHeader("Authorization", token);

    /*
    res.setHeader("Authorization", token, {
      httpOnly: true,
      maxAge: maxAge * 1000,
    });*/

    //res.cookie("JWT", token, { httpOnly: true, maxAge: maxAge * 1000 });
    // return just for the test
    res.status(200).json({ User: user._id });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "An unexpected error occurred." });
  }
};
/*
  // Generate a random buffer of 4 bytes
  const buffer = crypto.randomBytes(4);

  // Convert the buffer to a hexadecimal string
  const token = buffer.toString("hex");

  // Convert hexadecimal to base64 to include alphanumeric characters
  const base64Token = Buffer.from(token, "hex").toString("base64");

  // Slice to ensure it's 6 characters long
  const finalToken = base64Token.slice(0, 6);

  */

const forgotPassword = async (req, res) => {
  const { email } = req.body;
  const user = await User.findOne({ email });

  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }

  const resetToken = crypto.randomBytes(32).toString("hex");

  const hashedToken = jwt.sign(
    { email: email, token: resetToken },
    process.env.ACCESS_TOKEN_SECRET,
    {
      expiresIn: "1h",
    }
  );

  const resetURL = `${req.protocol}://${req.get(
    "host"
  )}/resetPassword/${hashedToken}`;
  const message = `Forgot your password? This is your restored code: ${resetToken}. Click the link to reset your password: ${resetURL}`;

  try {
    // use send email servise
    const subject = "Your password reset token (valid for 1 hour)";
    await sendEmail(user, subject, message);

    res.status(200).json({
      status: "success",
      message: "Token sent to email!",
    });
  } catch (err) {
    res.status(500).json({
      status: "error",
      message: "There was an error sending the email. Try again later.",
    });
  }
};

const resetPassword = async (req, res) => {
  const { restoredCode, newPassword } = req.body;
  const hashedToken = req.params.token;

  try {
    jwt.verify(
      hashedToken,
      process.env.ACCESS_TOKEN_SECRET,
      async (err, decodedToken) => {
        if (err) {
          res.status(401).json({ message: "Invalid or expired token" });
        } else {
          const { email, token } = decodedToken;
          const userEmail = email;
          console.log(decodedToken);
          const user = await User.findOne({ email: userEmail });

          if (!user) {
            return res.status(400).json({ message: "User not found" });
          }
          if (token === restoredCode) {
            // Validate new password (example: check length)
            if (newPassword.length < 8) {
              return res.status(400).json({
                message: "New password must be at least 8 characters long",
              });
            }

            const salt = await bcrypt.genSalt();
            const hashedPassword = await bcrypt.hash(newPassword, salt);

            const updatedUser = await User.updateOne(
              { email: userEmail },
              { password: hashedPassword }
            );
            if (updatedUser.modifiedCount === 0) {
              return res
                .status(500)
                .json({ message: "Failed to update the password" });
            }
            const subject = "reset password";
            const message = "Password has been successfully changed";
            await sendEmail(user, subject, message);
            res.status(200).json({ message });
          } else {
            res.status(403).json({
              message: "You don't have permission to change the password",
            });
          }
        }
      }
    );
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
};

export { createUser, logIn, forgotPassword, resetPassword };
