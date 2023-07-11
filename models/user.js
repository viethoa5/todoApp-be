const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const bcrypt = require("bcrypt");

require("dotenv").config();

const User = new Schema({
  isAdmin: { type: Boolean, default: false },
  name: { type: String },
  email: {
    type: String,
    trim: true,
    lowercase: true,
    unique: true,
    validate: {
      validator: function (v) {
        return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(v);
      },
      message: "Please enter a valid email",
    },
    required: [true, "Email required"],
  },
  password: {
    type: String,
    required: [true, "Password required"],
  },
  access_token: String,
  createdAt: { type: Date, default: Date.now() },
  updatedAt: { type: Date, default: Date.now() },
});

// User.pre('save', async function (next) {
//   var user = this;
//   // only hash the password if it has been modified (or is new)
//   if (!user.isModified("password")) return next();
//   try {
//     const salt = await bcrypt.genSalt(parseInt(process.env.SECRET_NUMBER));
//     const hash = await bcrypt.hash(user.password, salt);
//     user.password = hash;
//     return next();
//   } catch (error) {
//     return next(error);
//   }
// });

User.methods.validatePassword = async function validatePassword (plainPassword) {
  return bcrypt.compare(plainPassword, this.password);
};

module.exports = mongoose.model("user", User);
