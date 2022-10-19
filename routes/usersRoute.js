const express = require('express')
const router = express.Router()
const User = require('../models/usersModel')
const bcrypt = require('bcrypt')
const strongPass = require('strong-pass-checker')
const error = require('../utils/error')
const jwt = require('jsonwebtoken')
const userController = require('../controller/userController')
const verification = require('../utils/verifyToken')
//create
router.post('/addUser', userController.addUser)
//update
router.put('/:id', verification.verifyUser, userController.editeUser)
//delete
router.delete('/:id', verification.verifyUser, userController.deleteUser)
//get all
router.get('/getAllUser', verification.verifyUser, userController.getAllUser)

//get
router.get('/:id', userController.getUser)



module.exports = router