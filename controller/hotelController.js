const Hotel = require('../models/hotelsModel')
const errorHandler = require('../utils/error')

exports.addHotel = (req, res, next) => {
  const newHotel = new Hotel(req.body)
  newHotel.save(newHotel).then((data) => {
    res.json(data)
  }).catch(err => {
    next(errorHandler.createError(400, 'Cant add this hotel'))
  })
}
exports.getHotel = (req, res, next) => {

  Hotel.findById(req.params.id).then((hotel) => {
    res.json(hotel)
  }).catch((err) => {
    next(errorHandler.createError(400, 'Cant get this hotel'))
  })
}
exports.getAllHotel = (req, res, next) => {
  // console.log('hello hotel middleware')
  // next()
  Hotel.find().then((data => {
    res.json(data)
  })).catch((err) => {
    next(errorHandler.createError(400, 'Cant get  hotels'))
  })
}
exports.editeHotel = (req, res, next) => {
  Hotel.findByIdAndUpdate(req.params.id, { $set: req.body }, { new: true }).then((data) => {
    res.json(data)
  }).catch(err => {
    next(errorHandler.createError(400, 'Cant edite this hotel'))
  })
}
exports.deleteHotel = (req, res, next) => {
  Hotel.findByIdAndDelete(req.params.id).then((data) => {
    res.json({ massage: "Success Deleted" })
  }).catch(err => {
    next(errorHandler.createError(400, 'Cant delete this hotel'))

  })
}
