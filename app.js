const express = require('express')
const app = express();
const bodyParser = require('body-parser');
const route = require('./routers/route');

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

require('dotenv').config()  
const port = process.env.PORT || 8000;

route(app)

const db = require('./config/db')
db.connect();

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})

module.exports = app;