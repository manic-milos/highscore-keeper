{
  const jwt = require("jsonwebtoken");
  const bcrypt = require("bcryptjs");
  const asyncHandler = require("express-async-handler");
  const User = require("../models/userModel");

  const protect = asyncHandler(async (req, res, next) => {
    let token;
    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer")
    ) {
      try {
        token = req.headers.authorization.split(" ")[1];
      } catch (err) {
        res.status(401);
        throw new Error("Unauthorized");
      }
    }

    if (!token) {
      res.status(401);
      throw new Error("No token, authorization denied");
    }
    const id = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(id).select("-password");
    if (!user) {
      res.status(401);
      throw new Error("User not found");
    }
    req.user = user;
    next();
  });

  module.exports = { protect };
}
