var cors = require("cors");
const express = require("express");
const app = express();
const bodyParser = require("body-parser");
var cookieParser = require("cookie-parser");
const route = require("./routers/route");

require("dotenv").config();
const port = process.env.PORT || 8000;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cookieParser());
const corConfig = {
  origin: process.env.CORS_CONFIG,
  credentials: true,
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  optionsSuccessStatus: 200,
};

app.use(cors(corConfig));

route(app);

const db = require("./config/db");
db.connect();

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});

module.exports = app;
