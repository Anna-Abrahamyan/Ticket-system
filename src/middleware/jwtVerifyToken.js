import jwt from "jsonwebtoken";
import Users from "../models/users.model.js";

async function verifyJwt(req, res, next) {
  const token = req.headers["x-access-token"];
  if (!token) {
    res.status(401).json({
      error: "You must be logged in to access this resource.",
    });
    return;
  }
  try {
    const decoded = await jwt.verify(token, process.env.JWT_SECRET);
    const user = await Users.findOne({
      id: decoded.id,
    });
    if (!user) {
      throw new Error("User not found");
    }
    req.user = user;
    next();
  } catch (err) {
    res.status(401).json({
      error: "You must be logged in to access this resource.",
    });
  }
}

export default verifyJwt;
