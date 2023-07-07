const express = require('express');
const router  = express.Router();
const multer  = require('multer');
const upload = multer();

const authController = require('../controllers/authController')

router.post('/login', upload.none(), authController.login)
router.post('/register', upload.none(), authController.register)

module.exports = router;