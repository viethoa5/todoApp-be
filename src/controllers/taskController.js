const Task = require("../models/task");

class TaskController {
  async index(req, res, next) {
    try {
      if (req.query.hasOwnProperty("content")) {
        const searchString = req.query.content ;
        const taskfind = await Task.find({
          content: { $regex: searchString, $options: 'i' },
          userId: req.user._id,
        });
        res.json(taskfind);
      } else {
        const tasks = await Task.find({ userId: req.user._id });
        res.json(tasks);
      }
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  }

  async detail(req, res, next) {
    try {

      const taskDetail = await Task.findOne({
        userId: req.user._id,
        _id: req.params.id,
      });
      res.json(taskDetail);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  }

  async update(req, res, next) {
    try {
      console.log(req.body)
      const taskUpdated = await Task.findOneAndUpdate(
        {
          userId: req.user._id,
          _id: req.params.id,
        },
        req.body,
        {new : true}
      );
      res.json(taskUpdated);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  }

  async delete(req, res, next) {
    try {
      const taskDeleted = await Task.findOneAndDelete(
        {
          userId: req.user._id,
          _id: req.params.id,
        },
        req.body
      );
      res.json({ message: 'Delete success'})
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  }

  async create(req, res, next) {
    try {
      const newTask = new Task({
        content: req.body.content,
        status: req.body.status,
        userId: req.user._id,
      });
      await newTask.save(req, res);
      res.json(newTask);
    } catch (err) {
      res.status(503).json({ message: err.message });
    }
  }
}

module.exports = new TaskController();
