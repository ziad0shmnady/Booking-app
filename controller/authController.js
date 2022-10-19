const User = require('../models/usersModel')
const bcrypt = require('bcrypt')
const strongPass = require('strong-pass-checker')
const error = require('../utils/error')
const jwt = require('jsonwebtoken')
const { response } = require('express')

exports.register = (req, res, next) => {

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
}
exports.login = async (req, res, next) => {
  try {
    const user = await User.findOne({ username: req.body.username });
    if (!user) return next(error.createError(404, "User not found!"));

    const isPasswordCorrect = await bcrypt.compare(
      req.body.password,
      user.password
    );
    if (!isPasswordCorrect)
      return next(error.createError(400, "Wrong password or username!"));

    const token = jwt.sign(
      { id: user._id, isAdmin: user.isAdmin },
      'pass'
    );

    const { password, isAdmin, ...otherDetails } = user._doc;
    res
      .cookie("access_token", token, {
        httpOnly: true,
      })
      .status(200)
      .json({ details: { ...otherDetails }, isAdmin });
  } catch (err) {
    next(err);
  }
};


