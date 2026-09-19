import { Router } from "express";
import passport from "passport";
import {
  validate,
  registerUserValidationRules,
} from "../Middleware/validation.middlware.js";
import {
    register,
    googleAuthCallback
} from "../Controller/auth.controller.js";
const router = Router();

router.post("/register", registerUserValidationRules, validate, register);
router.get(
  "/google",

  passport.authenticate("google", {
    scope: ["profile", "email"],
  }),
);

router.get(
  "/google/callback",

  passport.authenticate("google", {
    session: false,
  }),

  googleAuthCallback,
);

export default router;
