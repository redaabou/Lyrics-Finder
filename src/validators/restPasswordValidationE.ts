const { body, validationResult } = require("express-validator");

// Middleware for validating restoredCode and newPassword
export const validateRestoredCodeAndNewPassword = [
  // Assuming restoredCode should be a string and not empty
  body("restoredCode").notEmpty().withMessage("Restored code is required"),

  // Assuming newPassword should meet certain criteria, e.g., minimum length
  body("newPassword")
    .notEmpty()
    .withMessage("New password is required")
    .isLength({ min: 8 })
    .withMessage("New password must be at least 8 characters long"),

  // Additional validations can be added here, such as checking password strength or uniqueness

  // Middleware to handle validation errors
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  },
];
