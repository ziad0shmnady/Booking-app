const express = require('express')
const router = express.Router()
const authController = require('../controller/authController')
const verifyToken = require('../utils/verifyToken')

router.post('/register', authController.register)
router.post('/login', authController.login)
module.exports = router