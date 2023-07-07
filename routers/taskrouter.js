const express = require('express');
const router  = express.Router();
const multer  = require('multer');
const upload = multer();

const TaskController = require('../controllers/taskController');
const taskController = require('../controllers/taskController');

router.get('/', taskController.index)
router.put('/:id', taskController.update)
router.delete('/:id', taskController.delete)
router.get('/:id', taskController.detail)

module.exports = router;