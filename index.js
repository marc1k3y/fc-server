const express = require("express")
const cors = require("cors")
const mongoose = require("mongoose")
require("dotenv").config()

mongoose.connect(process.env.DB_URL)
mongoose.Promise = global.Promise

const app = express()

const userRouter = require('./routes/userApi')
const busRouter = require('./routes/busApi')

app.use(express.json())
app.use(cors())
app.use('/api/user', userRouter)
app.use('/api/bus', busRouter)

app.listen(process.env.PORT || 4000, function () {
  console.log("Server started")
})