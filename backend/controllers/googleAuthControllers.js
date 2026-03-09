import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

export const handleGooglecallback = async (req, res) => {
  try {
    const user = req.user;
    const token = jwt.sign(
      {
        id: user._id,
        name: user.name,
        email: user.email,
      },
      process.env.JWT_SECRET,
      { expiresIn: "1d" },
    );

    res.cookie("jwt", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    });



    res.redirect(`http://localhost:5173/auth-success?token=${token}`);
  } catch (error) {
    res.redirect(`http://localhost:5173/login?error=google_failed`);
  }
};

export const userDataGoogle = (req, res) => {
  try {
    res.json({
      success: true,
      user: {
        _id: req.user._id,
        name: req.user.name,
        email: req.user.email,
        isAdmin: req.user.isAdmin,
      },
    });
  } catch (error) {
    console.error("Get user error:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch user",
    });
  }
};
