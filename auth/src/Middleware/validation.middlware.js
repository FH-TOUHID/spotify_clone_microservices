import { body, validationResult } from "express-validator";

function validate(req, res, next) {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({
      errors: errors.array(),
    });
  }

  next();
}

const registerUserValidationRules = [
  body("email").isEmail().withMessage("Invalid email address"),

  body("password")
    .isLength({ min: 6 })
    .withMessage("Password must be at least 6 characters"),

  body("fullname.firstName").notEmpty().withMessage("First name is required"),

  body("fullname.lastName").notEmpty().withMessage("Last name is required"),
];

export { validate, registerUserValidationRules };