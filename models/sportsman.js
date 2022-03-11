const mongoose = require("mongoose")
const Schema = mongoose.Schema

const SportsmanSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  age: {
    type: Number,
    required: true
  },
  medals: {
    type: Object,
    gold: {
      type: Array
    },
    silver: {
      type: Array
    },
    bronze: {
      type: Array
    }
  },
  rating: {
    type: Number,
    default: 1
  }
})

const Sportsman = mongoose.model('spman', SportsmanSchema)

module.exports = Sportsman