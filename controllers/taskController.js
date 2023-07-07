const Task = require('../models/task')

class TaskController {
     index (req, res, next) {
       res.send("Success")
     }

     detail (req, res, next) {
        
     }

     update (req, res, next) {

     }

     delete (req, res, next) {
        
     }
}

module.exports = new TaskController();