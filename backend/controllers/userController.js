import asyncHandler from "../middleware/asyncHandler.js";
import User from "../model/userSchema.js";
import generateToken from "../utils/generateToken.js";
// import jwt from "jsonwebtoken";
// import cookie from "cookie-parser";

//      @desc    get token and get auth user
//      @routes  POST /api/users/login
//      @access  /public
export const authUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });

  // const isPasswordMatch = await user.matchPassword(password); //optiona
  if (user && (await user.matchPassword(password))) {
    generateToken(res, user._id);

    res.status(200).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
    });
  } else {
    res.status(401);
    throw new Error("Invalid email and password");
  }
});

//      @desc    save the register user
//      @routes  POST /api/users/register
//      @access  /public
export const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;
  const userExist = await User.findOne({ email });

  if (userExist) {
    res.status(401);
    throw new Error("User is already exist");
  }

  const user = await User.create({
    name,
    email,
    password,
  });

  if (user) {
    generateToken(res, user._id); // used res to store token on the browser

    res.status(200).json({
      //send res back to the frontend
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
    });
  } else {
    res.status(400);
    throw new Error("Invalid user data");
  }
});

//      @desc    logout the user & destroy token/cookie
//      @routes  POST /api/users/logout
//      @access  /private
export const logoutUser = asyncHandler(async (req, res) => {
  //logout -> clear token inside cookied
  res.cookie("jwt", "", {
    httpOnly: true,
    expires: new Date(0),
  });

  res.status(200).json("Logged Out Succesfully");
});

//      @desc   show user profile on ui
//      @routes GET /api/users/profile
//      @access  /private
export const getUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);
  if (user) {
    res.status(200).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
    });
  } else {
    throw new Error("User not found");
  }
});

//      @desc    update user profile
//      @routes  PUT /api/users/profile
//      @access  /private
export const updateUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);
  if (user) {
    user.name = req.body.name || user.name;
    user.email = req.body.email || user.email;

    if (req.body.password) {
      user.password = req.body.password;
    }

    const updatedUser = await user.save();

    res.status(200).json({
      _id: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email,
      isAdmin: updatedUser.isAdmin,
    });
  } else {
    res.status(404);
    throw new Error("user not found");
  }
});

//Admin

//      @desc    get users
//      @routes  GET  /api/users
//      @access  /private admin
export const getUsers = asyncHandler(async (req, res) => {
  res.send(" get all users by admin");
});

//      @desc    get user by id
//      @routes  GET /api/users/:id
//      @access  /private admin
export const getUserById = asyncHandler(async (req, res) => {
  res.send(" get user by id(admin)");
});

//      @desc    update user by id
//      @routes PUT /api/users/:id
//      @access  /private admin
export const updateUser = asyncHandler(async (req, res) => {
  res.send(" update user by id(admin)");
});

//      @desc    delete user by id
//      @routes  DELETE /api/users/:id
//      @access  /private admin
export const deleteUser = asyncHandler(async (req, res) => {
  res.send(" delete user by id(admin)");
});

//public ->no token or cookie needed
//private->authentication and cookie needed
