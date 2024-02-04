import jwt from "jsonwebtoken";

const secret = "jwtsecret";

const generateToken = (userId, res) => {
  const token = jwt.sign({ userId }, secret, { expiresIn: "15d" });

  res.cookie("jwt", token, {
    maxAge: 15 * 24 * 60 * 60 * 1000, // MS
    httpOnly: true, // prevent XSS attacks cross-site scripting attacks
    sameSite: "strict", // CSRF attacks cross-site request forgery attacks
    secure: "development" !== "development",
  });
};

export default generateToken;
