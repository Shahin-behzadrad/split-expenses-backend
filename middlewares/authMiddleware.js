import jwt from "jsonwebtoken";
import { formatResponse } from "../util/responseUtil.js";

const authenticateToken = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (!token) {
    return res.status(401).json(formatResponse(401, "user is not authorized!"));
  }

  jwt.verify(token, "SECRET_KEY", (err, decoded) => {
    if (err) {
      return res.status(401).json({ message: "Invalid token" });
    }
    req.user = decoded;
    next();
  });
};

export default authenticateToken;
