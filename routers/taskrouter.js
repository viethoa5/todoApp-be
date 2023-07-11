const express = require("express");
const router = express.Router();
const multer = require("multer");
const upload = multer();

const taskController = require("../controllers/taskController");
const authMiddleware = require("../middleware//authMiddleware");
router.get("/", taskController.index);
router.put("/:id", taskController.update);
router.delete("/:id", taskController.delete);
router.get("/:id", taskController.detail);
router.post(
  "/create",
  upload.none(),
  authMiddleware.isAuthenticated,
  taskController.create
);

module.exports = router;
