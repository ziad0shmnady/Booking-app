const express = require('express')
const router = express.Router()
const User = require('../models/usersModel')
const bcrypt = require('bcrypt')
const strongPass = require('strong-pass-checker')
const error = require('../utils/error')
//register user
router.post('/register', (req, res) => {
  let { username, email, password, phone, city, country } = req.body
  const salt = bcrypt.genSaltSync(10);
  const hash = bcrypt.hashSync(password, salt)
  const newuser = new User({
    username,
    email,
    password: hash,
    phone,
    city,
    country
  })
  newuser.save().then((user) => {
    res.json({ message: "success Register" })
  }).catch((err) => {
    res.json({ message: err.message })
  })
})
router.post('/login', (req, res, next) => {
  const user = User.findOne({ username:req.body.username }).then((user) => {
    if (!user) { return next(error.createError(400, "wrong username or password ")) }
    const isCorrect = bcrypt.compare(req.body.password, user.password)
    if (!isCorrect) { return next(error.createError(400, "wrong username or password ")) }
    res.json({user})
  })

})
//get user
//get all user
//update user



module.exports = router