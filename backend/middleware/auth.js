const jwt = require("jsonwebtoken");

// Middleware to authenticate user using JWT or fallback to hardcoded user for dev
exports.authenticate = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  if (authHeader && authHeader.startsWith("Bearer ")) {
    const token = authHeader.split(" ")[1];
    try {
      // Replace 'your_jwt_secret' with your actual secret
      const decoded = jwt.verify(
        token,
        process.env.JWT_SECRET || "your_jwt_secret"
      );
      req.user = { id: decoded.userId };
      return next();
    } catch (err) {
      return res.status(401).json({ message: "Invalid or expired token" });
    }
  }
  // Fallback for development: hardcoded user
  req.user = { id: "60c72b2f9b1e8b001c8e9d3d" };
  next();
};
