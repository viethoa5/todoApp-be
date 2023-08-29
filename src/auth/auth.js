var jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
var User = require("../models/user");
const Token = require("../models/token");
var { nanoid } = require("nanoid");
const sendEmail = require("../config/sendEmail")
require("dotenv").config();

exports.generateToken = async function (
  email,
  password,
  secretString,
  tokenLife
) {
  try {
    return await jwt.sign(
      { email: email, password: password },
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

exports.validatePassword = async function (email, password) {
  try {
    const user = await User.findOne({ email: email });
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

exports.getResetPasswordLink = async function (email) {
  const user = await User.findOne({email: email});
  if (!user) {
    throw new Error ("EMail don't exist")
  }
  let token = await Token.findOne({userId : user._id});
  let resetToken = nanoid(64);
  const hash = await bcrypt.hash(resetToken, parseInt(process.env.SECRET_NUMBER));
  if (token) {
    token.token = hash;
    token.createdAt = Date.now();
  } else {
    token = await new Token({
      userId: user._id,
      token: hash,
      createdAt: Date.now(),
    });
  }
  token.save();
  const link = `${process.env.CORS_CONFIG}/passwordReset?token=${resetToken}&id=${user._id}`;
  if (user.name !== undefined) {
    await sendEmail(user.email,"Password Reset Request", user.name, link);
  } else {
    await sendEmail(user.email,"Password Reset Request", '', link);
  }
  return link;
}
