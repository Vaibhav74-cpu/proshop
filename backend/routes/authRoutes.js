import express from "express";
import passport from "passport";
import {
  handleGooglecallback,
  userDataGoogle,
} from "../controllers/googleAuthControllers.js";
import { protect } from "../middleware/authMiddleware.js";
import {
  handleGithubCallback,
  userDataGithub,
} from "../controllers/githubAuthControllers.js";

const router = express.Router();

//goole oauth
router.get(
  "/google",
  passport.authenticate("google", {
    scope: ["email"],
    prompt: "select_account",
    // prompt: "consent",
  }),
); //redirect to consent screen

router.get(
  "/google/callback",
  passport.authenticate("google", { session: false }),
  handleGooglecallback,
); //continue screen or token creation

router.get("/me", protect, userDataGoogle); //current login users data on ui

//github oauth
router.get(
  "/github",
  passport.authenticate("github", { scope: ["user:email"] }),
);

router.get(
  "/github/callback",
  passport.authenticate("github", { session: false }),
  handleGithubCallback,
);

router.get("/mine", protect, userDataGithub);
export default router;
