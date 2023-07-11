const express = require('express')
const app = express();
const bodyParser = require('body-parser');
var cookieParser = require('cookie-parser')
const route = require('./routers/route');

require('dotenv').config()  
const port = process.env.PORT || 8000;

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(cookieParser())

route(app)

const db = require('./config/db')
db.connect();

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})

module.exports = app;