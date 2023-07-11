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

     async create (req, res, next) {
      try {
        const newTask = new Task({content : req.body.content , status : req.body.status, userId : req.user._id});
        await newTask.save(req, res);
        res.json(newTask);
      } catch (err) {
        res.status(503).json({message: err.message});
      }
     }
}

module.exports = new TaskController();