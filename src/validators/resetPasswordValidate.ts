const { body, validationResult } = require("express-validator");

// Middleware for validating oldPassword and newPassword
export const validatePasswords = [
  // Check if oldPassword and newPassword are not empty
  body("oldPassword").notEmpty().withMessage("Old password cannot be empty"),
  body("newPassword").notEmpty().withMessage("New password cannot be empty"),

  // Additional validations can be added here, such as checking password length or complexity

  // Middleware to handle validation errors
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  },
];
