const express = require("express")
const cors = require("cors")
const mongoose = require("mongoose")
require("dotenv").config()

mongoose.connect(process.env.DB_URL)
mongoose.Promise = global.Promise

const app = express()

const spmanRouter = require("./routes/sportsman")
const trainerRouter = require("./routes/trainer")

app.use(express.json())
app.use(cors())
app.use("/api/spman", spmanRouter)
app.use("/api/trainer", trainerRouter)

app.listen(process.env.PORT || 4000, function () {
  console.log(`Server started`)
})