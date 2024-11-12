const { body, validationResult } = require('express-validator');

// Middleware for email validation only
const validateEmail = [
  // Check if email is valid
  body('email')
    .isEmail()
    .withMessage('Please enter a valid email address'),
  
  // Middleware to handle validation result
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  }
];

// Middleware for validation
const validateUser = [
  // Check if email is valid
  body('email')
    .isEmail()
    .withMessage('Please enter a valid email address'),
  
  // Check if password meets the criteria
  body('password')
    .isLength({ min: 8 })
    .withMessage('Password must be at least 8 characters long')
    .matches(/[A-Z]/)
    .withMessage('Password must contain at least one uppercase letter')
    .matches(/\d/)
    .withMessage('Password must contain at least one number')
    .matches(/\W/)
    .withMessage('Password must contain at least one special character'),
  
  // Middleware to handle validation result
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  }
];

module.exports = {validateUser, validateEmail};