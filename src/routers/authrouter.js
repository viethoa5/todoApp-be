const express = require('express');
const router  = express.Router();
const multer  = require('multer');
const upload = multer();

const authController = require('../controllers/authController')

router.post('/login', upload.none(), authController.login)
router.get('/', (req, res) => {
    res.send("Swagger Page is in /api-docs route")
})
router.post('/register', upload.none(), authController.register)
router.post('/refresh', upload.none(), authController.refresh)
router.post('/reset-password', upload.none(), authController.requestRefresh)
module.exports = router;