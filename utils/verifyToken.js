const jwt = require('jsonwebtoken')
const error = require('../utils/error')

exports.verifyUser = (req, res, next) => {
  const token = req.cookies.access_token;
  jwt.verify(token, 'pass', (err, data) => {
    if (err) {
      return next(error.createError(403, "you are not authenticated! "))
    } else {
      if (data.id === req.params.id) {
        next()
      }
      return next(error.createError(403, "You are not User!"));
    }
  })
}
exports.verifyAdmin = (req, res, next) => {
  const token = req.cookies.access_token;
  jwt.verify(token, 'pass', (err, data) => {
    if (err) {
      return next(error.createError(403, "you are not authenticated! "))
    } else {
      if (data.isAdmin) {
        next()
      }
      return next(error.createError(403, "You are not Admin!"));
    }
  })
}
