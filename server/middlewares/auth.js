import jwt from "jsonwebtoken";

export const requireSignIn = (req, res, next) => {
  try {
    // Get token from header
    const decoded = jwt.verify(
      req.headers.authorization,
      process.env.JWT_SECRET
    );
    req.user = decoded;
    next();
  } catch (error) {
    console.log(error);
    res.status(401).json({ error: "Invalid or expired token" });
  }
};
