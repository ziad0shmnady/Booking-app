const express = require('express')
const mongoose = require('mongoose')
const Hotel = require('../models/hotelsModel')
const router = express.Router()
const errorHandler=require('../utils/error')

//create
router.post('/addHotel', (req, res) => {
  const newHotel = new Hotel(req.body)
  newHotel.save(newHotel).then((data) => {
    res.json(data)
  }).catch(err => {
    res.json({ message: err.message || "some error occurred while creating" })
  })
})
//update
router.put('/:id', (req, res) => {
  Hotel.findByIdAndUpdate(req.params.id, { $set: req.body }, { new: true }).then((data) => {
    res.json(data)
  }).catch(err => {
    res.json({ message: err.message || "some error occurred while creating" })
  })
})
//delete
router.delete('/:id', (req, res) => {
  Hotel.findByIdAndDelete(req.params.id).then((data) => {
    res.json({ massage: "Success Deleted" })
  }).catch(err => {
    res.json({ message: err.message || "some error occurred while deleting" })
  })
})
//get all
router.get('/getAllHotel', (req, res) => {
  // console.log('hello hotel middleware')
  // next()
  Hotel.find().then((data => {
    res.json(data)
  })).catch((err) => {
    res.json({ message: err.message || "some error occurred while getting" })
  })
})

//get
router.get('/:id', (req, res, next) => {

  Hotel.findById(req.params.id).then((hotel) => {
    res.json(hotel)
  }).catch((err) => {
    next(err)
  })
})


module.exports = router



