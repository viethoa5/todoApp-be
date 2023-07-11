var jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
var User = require("../models/user");

require("dotenv").config();

exports.generateToken = async function (
  username,
  password,
  secretString,
  tokenLife
) {
  try {
    return await jwt.sign(
      { username: username, password: password },
      secretString,
      { expiresIn: tokenLife }
    );
  } catch (err) {
    console.log(`Error in generate token:  + ${error}`);
    return null;
  }
};

exports.verifyExpiredToken = async function (token, secretString) {
  try {
    return await jwt.verify(token, secretString, { ignoreExpiration: true });
  } catch (error) {
    console.log(`Error in verify token:  + ${error}`);
    return null;
  }
};

exports.verifyActiveToken = async function (token, secretString) {
  try {
    return await jwt.verify(token, secretString);
  } catch (error) {
    console.log(`Error in verify token:  + ${error}`);
    return null;
  }
};

exports.validatePassword = async function (username, password) {
  try {
    const user = await User.findOne({ email: username });
    const isUser = await bcrypt.compare(password, user.password);
    return { isUser: isUser, user: user };
  } catch (error) {
    throw error;
  }
};

exports.hashPassword = async function (password) {
  try {
    const salt = await bcrypt.genSalt(parseInt(process.env.SECRET_NUMBER));
    const hash = await bcrypt.hash(password, salt);
    return hash ;
  } catch (error) {
    return -1;
  }
}
