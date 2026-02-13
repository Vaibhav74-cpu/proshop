import asyncHandler from "./asyncHandler.js";
// import cookieParser from "cookie-parser";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import User from "../model/userSchema.js";
dotenv.config();

export const protect = asyncHandler(async (req, res, next) => {
  let token;
  token = req.cookies.jwt;

  if (token) {
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = await User.findById(decoded.userId).select("-password");
      next();
    } catch (error) {
      res.status(401);
      throw new Error("unauthorised user, token failed");
    }
  } else {
    res.status(401);
    throw new Error("unauthorised user, no token");
  }
});

export const admin = (req, res, next) => {
  if (req.user && req.user.isAdmin) {
    next();
  } else {
    throw new Error("not authorized as admin");
  }
};
