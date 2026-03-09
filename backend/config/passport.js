import passport from "passport";
import dotenv from "dotenv";
dotenv.config();
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import User from "../model/userSchema.js";

export default function configurePassport(passport) {
  passport.use(
    new GoogleStrategy(
      {
        clientID: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        callbackURL: "http://localhost:8000/api/auth/google/callback",
      },
      async (accessToken, refreshToken, profile, cb) => {
        try {
          // console.log(profile);

          let user = await User.findOne({ googleId: profile.id });

          if (!user) {
            user = await User.findOne({ email: profile.emails[0].value });
          }
          if (!user) {
            user = await User.create({
              googleId: profile.id,
              name: profile.displayName,
              email: profile.emails[0].value,
              authProvider: "google",
              isVerified: true,
              isLoggedIn: true,
            });
          }
          return cb(null, user);
        } catch (error) {
          return cb(error, null);
        }
      },
    ),
  );
}
