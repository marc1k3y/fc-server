const mongoose = require("mongoose")
const Schema = mongoose.Schema

const TrainerSchema = new Schema({
  login: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  }
})

const Trainer = mongoose.model('trainer', TrainerSchema)

module.exports = Trainer