const authMethod = require("../auth/auth");
const User = require("../models/user");
require("dotenv").config();
exports.isAuthenticated = async function (req, res, next) {
  try {
    const authHeader = req.headers["authorization"];
    if (authHeader.toString().startsWith("Bearer ")) {
      const token = authHeader.substring(7, authHeader.length);
      const verified = await authMethod.verifyActiveToken(
        token,
        process.env.ACCESS_SECRET
      );
      if (!verified) {
        return res.status(403).json({ message: "Forbidden" });
      }
      const user = await User.findOne({
        email: verified.username,
        password: verified.password,
      });
      req.user = user;
      return next();
    } else {
      return res.status(401).json({ message: "Unauthorized" });
    }
  } catch (err) {
    res.status(403).json({ message: err.message });
  }
};
