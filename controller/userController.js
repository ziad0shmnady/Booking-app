const User = require('../models/usersModel')
const errorHandler = require('../utils/error')

exports.addUser = (req, res, next) => {
  const newUser = new User(req.body)
  newUser.save(newUser).then((data) => {
    res.json(data)
  }).catch(err => {
    next(errorHandler.createError(401, "Can't add user"))
  })
}
exports.getUser = (req, res, next) => {

  User.findById(req.params.id).then((User) => {
    res.json(User)
  }).catch((err) => {
    next(errorHandler.createError(401, "Can't fint this user"))
  })
}
exports.getAllUser = (req, res, next) => {
  // console.log('hello User middleware')
  // next()
  User.find().then((data => {
    res.json(data)
  })).catch((err) => {
    next(errorHandler.createError(401, "Can't get all user"))
  })
}
exports.editeUser = (req, res, next) => {
  User.findByIdAndUpdate(req.params.id, { $set: req.body }, { new: true }).then((data) => {
    res.json(data)
  }).catch(err => {
    next(errorHandler.createError(401, "Can't edite this user"))

  })
}
exports.deleteUser = (req, res, next) => {
  User.findByIdAndDelete(req.params.id).then((data) => {
    res.json({ massage: "Success Deleted" })
  }).catch(err => {
    next(errorHandler.createError(401, "Can't delete this user"))

  })
}
