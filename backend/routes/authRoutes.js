import express from "express";
import passport from "passport";
import {
  handleGooglecallback,
  userDataGoogle,
} from "../controllers/googleAuthControllers.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.get(
  "/google",
  passport.authenticate("google", { scope: ["email"], prompt: "consent" }),
); //redirect to consent screen

router.get(
  "/google/callback",
  passport.authenticate("google", { session: false }),
  handleGooglecallback,
); //continue screen or token creation
router.get("/me", protect, userDataGoogle); //current login users data on ui

export default router;
