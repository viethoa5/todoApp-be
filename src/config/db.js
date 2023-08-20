const mongoose = require("mongoose");
require("dotenv").config();
mongoose.set("strictQuery", false);

async function connect() {
  try {
     mongoose.connect(process.env.DB_CONNECTION).then(() => console.log('DB Connected!'));
  } catch (error) {
    console.log(error);
  }
}
module.exports = { connect };


