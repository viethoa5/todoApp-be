const express = require("express");
const router = express.Router();
const multer = require("multer");
const upload = multer();

const taskController = require("../controllers/taskController");
const authMiddleware = require("../middleware//authMiddleware");
router.get("/", authMiddleware.isAuthenticated, taskController.index);
router.put("/:id",upload.none() ,authMiddleware.isAuthenticated, taskController.update);
router.delete("/:id", authMiddleware.isAuthenticated, taskController.delete);
router.get("/:id", authMiddleware.isAuthenticated, taskController.detail);
router.post(
  "/create",
  upload.none(),
  authMiddleware.isAuthenticated,
  taskController.create
);

module.exports = router;
