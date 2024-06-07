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

const resetPasswordT = async (
  req: Request<{}, {}, { oldPassword: string; newPassword: string }>,
  res: Response
) => {
  const { oldPassword, newPassword } = req.body;
  const userId = req.user.id;
  try {
    // Find the user by email
    const user = await User.findOne({ _id: userId });
    if (!user) {
      // User not found
      return res.status(404).json({ error: "User not found." });
    }

    // Compare the provided password with the stored hashed password
    const isValidPassword = await bcrypt.compare(oldPassword, user.password);

    if (!isValidPassword) {
      // Password does not match
      return res.status(401).json({ error: "Invalid credentials." });
    }

    if (newPassword.length < 8) {
      return res.status(400).json({
        message: "New password must be at least 8 characters long",
      });
    }

    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(newPassword, salt);

    const updatedUser = await User.updateOne(
      { _id: userId },
      { password: hashedPassword }
    );

    if (updatedUser.modifiedCount === 0) {
      return res.status(500).json({
        status: "error",
        message: "Failed to update the password. Please try again later.",
      });
    }
    // return just for the test
    res
      .status(200)
      .json({ message: "password is updated", userEmail: user.email });
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

const generateToken = () => {
  return crypto
    .randomBytes(3)
    .toString("base64")
    .replace(/[^a-zA-Z0-9]/g, "")
    .slice(0, 4);
};

const forgotPassword = async (req, res) => {
  const { email } = req.body;
  const user = await User.findOne({ email });

  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }
  const code = generateToken();
  const salt = await bcrypt.genSalt();
  const hashedPassword = await bcrypt.hash(code, salt);

  //const resetToken = crypto.randomBytes(32).toString("hex");
  const hashedToken = jwt.sign(
    { email: email, token: hashedPassword },
    process.env.ACCESS_TOKEN_SECRET,
    {
      expiresIn: "1h",
    }
  );

  const resetURL = `${req.protocol}://${req.get(
    "host"
  )}/resetPassword/${hashedToken}`;
  const message = `
  Hi ${user.firstname} ${user.lastname},
  
  We received a request to reset your password. Please use the following code to reset your password:
  
  Restoration Code: ${code}
  
  You can also click the link below to reset your password directly:
  
  ${resetURL}
  
  If you did not request a password reset, please ignore this email or contact our support team if you have any concerns.
  
  Best regards,
  Lyrics Finder Team
  `;

  try {
    // use send email servise
    const subject = "Password Reset Request (Valid for 1 Hour)";

    const users = [user];
    await sendEmail(users, subject, message);

    res.status(200).json({
      status: "success",
      message:
        "A password reset link and code have been sent to your email address. Please check your inbox and follow the instructions to reset your password.",
    });
  } catch (err) {
    res.status(500).json({
      status: "error",
      message:
        "We encountered an issue while sending the email. Please check your email address and try again. If the problem persists, contact our support team.",
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
          const user = await User.findOne({ email: userEmail });

          if (!user) {
            return res.status(400).json({ message: "User not found" });
          }
          const isValidPassword = await bcrypt.compare(restoredCode, token);
          if (isValidPassword) {
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
              return res.status(500).json({
                status: "error",
                message:
                  "Failed to update the password. Please try again later.",
              });
            }

            const subject = "Password Successfully Changed";
            const message = `
            Hi ${user.firstname} ${user.lastname},
            
            This is a confirmation that your password has been successfully changed.
            
            If you did not perform this action, please contact our support team immediately.
            
            Best regards,
             Lyrics Finder  Team
            `;

            const users = [user.email];

            try {
              await sendEmail(users, subject, message);
              res.status(200).json({
                status: "success",
                message:
                  "Your password has been successfully changed. A confirmation email has been sent to your email address.",
              });
            } catch (err) {
              res.status(500).json({
                status: "error",
                message:
                  "Your password was changed, but we couldn't send the confirmation email. Please contact our support team if you have any concerns.",
              });
            }
          } else {
            res.status(403).json({
              status: "error",
              message:
                "You don't have permission to change the password. Please check the restoration code and try again.",
            });
          }
        }
      }
    );
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
};

export { createUser, logIn, forgotPassword, resetPassword, resetPasswordT };
