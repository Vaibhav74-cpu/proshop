import jwt from 'jsonwebtoken';

const generateToken = async (res, userId) => {
  //create token contain userId and then put it in http-only cookie
  const token = jwt.sign({ userId}, process.env.JWT_SECRET, {
    expiresIn: "12d",
  });

  //send cookie to the browser with the token (token is inside cookie)
  res.cookie("jwt", token, {
    httpOnly: true, //js canot access cookie
    secure: process.env.NODE_ENV !== "development",
    sameSite: "strict",
    maxAge: 30 * 24 * 60 * 60 * 1000,
  });
};

export default generateToken;
