const User = require("../models/user");
const authMethod = require("../auth/auth");
require("dotenv").config();

class AuthController {
  async login(req, res) {
    try {
      const user = await User.findOne({ email: req.body.email });
      const isUser = await user.validatePassword(req.body.password);
      if (isUser) {
        const accessToken = await authMethod.generateToken(
          req.body.email,
          user.password,
          process.env.ACCESS_SECRET,
          process.env.ACCESS_EXPIRED
        );
        const refreshToken = await authMethod.generateToken(
          req.body.email,
          user.password,
          process.env.REFRESH_SECRET,
          process.env.REFRESH_EXPIRED
        );
        res.cookie("refresh_Token", refreshToken, {
          expires: new Date(
            Date.now() + parseInt(process.env.REFRESH_EXPIRED_DATE) * 60 * 1000
          ),
          httpOnly: true,
        });
        res.cookie("access_Token", accessToken, {
          expires: new Date(
            Date.now() + parseInt(process.env.REFRESH_EXPIRED_DATE) * 60 * 1000
          ),
          httpOnly: true,
        });
        res.json({ access_token: accessToken, refresh_token: refreshToken });
      } else {
        res.status(500).json({ message: "Invalid password" });
      }
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  }

  async register(req, res) {
    try {
      const newUser = await new User(req.body);
      const hashpassword = await authMethod.hashPassword(req.body.password);
      if (hashpassword != -1) {
        newUser.password = hashpassword;
        newUser
          .save()
          .then(() => {
            res.json(newUser);
          })
          .catch((err) => {
            if (err.code === 11000) {
              return res.status(500).json({ message: "Email existed" });
            }
            res.status(500).json({ message: err.message });
          });
      } else {
        res.status(503).json({ message: "Fail to hash password" });
      }
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  }

  async refresh(req, res) {
    try {
      const authHeader = req.headers["authorization"];
      if (authHeader.toString().startsWith("Bearer ")) {
        const token = authHeader.substring(7, authHeader.length);
        if (token == req.cookies.access_Token) {
          const recoveryRefreshToken = await authMethod.verifyActiveToken(
            req.cookies.refresh_Token,
            process.env.REFRESH_SECRET
          );
          const new_AccessToken = await authMethod.generateToken(
            recoveryRefreshToken.email,
            recoveryRefreshToken.password,
            process.env.ACCESS_SECRET,
            process.env.ACCESS_EXPIRED
          );
          res.cookie("access_Token", new_AccessToken, {
            expires: new Date(
              Date.now() + parseInt(process.env.REFRESH_EXPIRED_DATE) * 60 * 1000
            ),
            httpOnly: true,
          });
          res.json({ access_token: new_AccessToken });
        } else {
          res.status(401).json({ message: "Unauthorized" });
        }
      } else {
        res.status(401).json({ message: "Unauthorized" });
      }
    } catch (err) {
      res.status(401).json({ message: err.message });
    }
  }
}

module.exports = new AuthController();
