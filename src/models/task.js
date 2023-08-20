const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const Task = new Schema({
    content : String,
    status : String,
    userId : ObjectId,
})

module.exports = mongoose.model('task', Task)