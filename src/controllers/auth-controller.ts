// importe the user model from the database
import { Request, Response } from "express";
import bcrypt from "bcryptjs"; // Assuming you're hashing passwords
import cookie from "cookie-parser";
import jwt from "jsonwebtoken";
import { User } from "../models/user";

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
const createTocken = (id) => {
  return jwt.sign({ id }, process.env.ACCESS_TOKEN_SECRET, {
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
    const token = createTocken(newUser._id);
    /*
    res.setHeader("Authorization", token, {
      httpOnly: true,
      maxAge: maxAge * 1000,
    });*/
    //res.cookie("JWT", token, { httpOnly: true, maxAge: maxAge * 1000 });
    res.setHeader("Authorization", "Bearer " + token);

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
    const token = createTocken(user._id);
    res.setHeader("Authorization", "Bearer " + token);

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

export { createUser, logIn };
