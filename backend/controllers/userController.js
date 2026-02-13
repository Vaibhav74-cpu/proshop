import asyncHandler from "../middleware/asyncHandler.js";
import User from "../model/userSchema.js";
import jwt from "jsonwebtoken";
// import cookie from "cookie-parser";

//      @desc    get token and get auth user
//      @routes  POST /api/users/login
//      @access  /public
export const authUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });

  // const isPasswordMatch = await user.matchPassword(password); //optiona
  if (user && (await user.matchPassword(password))) {
    //create token contain userId and then put it in http-only cookie
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
      expiresIn: "12d",
    });

    //send cookie to the browser with the token (token is inside cookie)
    res.cookie("jwt", token, {
      httpOnly: true, //js canot access cookie
      secure: process.env.NODE_ENV !== "development",
      sameSite: "strict",
      maxAge: 30 * 24 * 60 * 60 * 1000,
    });

    res.json({
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
  res.send("register user");
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
  res.send("get my own user profile");
});

//      @desc    update user profile
//      @routes  PUT /api/users/profile
//      @access  /private
export const updateUserProfile = asyncHandler(async (req, res) => {
  res.send("update my (user) profile");
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
