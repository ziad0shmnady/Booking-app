const express = require('express')
const router = express.Router()
router.get('/', (req, res) => {
  res.send('hello world')
})

//add room
//delete room
//get room
//get all room
//update room


module.exports = router