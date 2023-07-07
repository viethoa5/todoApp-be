const mongoose = require('mongoose');
require("dotenv").config();

mongoose.set("strictQuery", false);

async function connect() {
  try {
    mongoose
      .connect("mongodb://127.0.0.1:27017/test")
      .then(() => console.log("DB Connected!"));
  } catch (err) {
    console.log(error);
  }
}

module.exports = { connect };
