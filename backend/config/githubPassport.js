import { Strategy as GitHubStrategy } from "passport-github";
import dotenv from "dotenv";
dotenv.config();
import User from "../model/userSchema.js";

export default function configureGithubPassport(passport) {
  passport.use(
    new GitHubStrategy(
      {
        clientID: process.env.GITHUB_CLIENT_ID,
        clientSecret: process.env.GITHUB_CLIENT_SECRET,
        callbackURL: "http://localhost:8000/api/auth/github/callback",
        scope: ["user:email"],
      },
      async (accessToken, refreshToken, profile, cb) => {
        try {
          // console.log(profile);
          const email =
            profile.emails && profile.emails.length > 0
              ? profile.emails[0].value
              : `${profile.username}@github.com`;

          let user = await User.findOne({ githubId: profile.id });

          if (!user) {
            user = await User.findOne({ email });
          }
          if (!user) {
            user = await User.create({
              githubId: profile.id,
              name: profile.displayName || profile.username,
              email: email,
              authProvider: "github",
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
