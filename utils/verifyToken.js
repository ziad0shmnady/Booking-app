const jwt = require('jsonwebtoken')
const error = require('../utils/error')
exports.verifyToken = (req, res, next) => {
  const token = req.cookies.access_token;
  if (!token) {
    return next(error.createError(404, "you are not authenticated!"))
  }
  jwt.verify(token, 'pass', (err, user) => {
    if (err) {
      return next(error.createError(403, "Token is not vaild "))

    }
    req.user = user
    next()
  })
}
exports.verifyUser = (req, res, next) => {
  this.verifyToken(req, res, next, () => {
    if (req.user.id === req.params.id || req.user.isAdmin) {
      next();
    } else {
      return next(createError(403, "You are not authorized!"));
    }
  });
}
exports.verifyAdmin = (req, res, next) => {
  this.verifyToken(req, res, next, () => {
    if (req.user.isAdmin) {
      next();
    } else {
      return next(createError(403, "You are not authorized!"));
    }
  });
}