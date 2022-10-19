const express = require('express')
const mongoose = require('mongoose')
const Hotel = require('../models/hotelsModel')
const router = express.Router()
hotelController = require('../controller/hotelController')
const verification = require('../utils/verifyToken')
//create
router.post('/addHotel', verification.verifyAdmin, hotelController.addHotel)
//update
router.put('/:id', verification.verifyAdmin, hotelController.editeHotel)
//delete
router.delete('/:id', verification.verifyAdmin, hotelController.deleteHotel)
//get all
router.get('/getAllHotel', hotelController.getAllHotel)

//get
router.get('/:id', hotelController.getHotel)


module.exports = router



