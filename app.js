const express = require('express')
const dotenv = require('dotenv')
const mongoose = require('mongoose')
const usersRoute = require('./routes/usersRoute')
const authRoute = require('./routes/authRoute')
const roomsRoute = require('./routes/roomsRoute')
const hotelsRoute = require('./routes/hotelsRoute')
const bodyParser = require('body-parser')

app = express()
dotenv.config()
//connected with database
mongoose.connect(process.env.MONGO, () => {
  console.log('Connected with DataBase')
})

app.use(express.json())
app.use(bodyParser.urlencoded({ extended: true }))
//Maddlewares
app.use('/users', usersRoute)
app.use('/rooms', roomsRoute)
app.use('/auth', authRoute)
app.use('/hotels', hotelsRoute)

app.use((err, req, res, next) => {
  errorStatus=err.status ||500
  errorMassage=err.message ||'something is wrong'
  return res.status(500).json({
    success: false,
    status: errorStatus,
    message: errorMassage,
    stack:err.stack
  })
})


app.listen(process.env.PORT, () => {
  console.log(`Port is connected ${process.env.PORT}`)
})