const jwt = require("jsonwebtoken");

const verifyToken = (req, res, next) => {
  // Get token from request headers, query parameters, or cookies
  const token = req.headers.authorization;

  if (!token) {
    return res
      .status(401)
      .json({ message: "Unauthorized: No token provided", success: false });
  }

  jwt.verify(token, "Abhishek", (err, decoded) => {
    if (err) {
      return res
        .status(403)
        .json({ message: "Forbidden: Invalid token", success: false });
    }
    req.userId = decoded.userId; // Attach user ID to request object
    next(); // Call next middleware
  });
};

module.exports = verifyToken;
