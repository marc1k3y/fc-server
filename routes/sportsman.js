const express = require("express")
const router = express.Router()
const Sportsman = require("../models/sportsman")

router.post("/create", (req, res) => {
  const { name, age } = req.body
  Sportsman.create({ name, age })
    .then(() => res.sendStatus(200))
    .catch((e) => res.send(e.message))
})

router.put("/update", (req, res) => {
  const { id, name, age, medals } = req.body
  Sportsman.findOne({ _id: id })
    .then((spman) => {
      spman.name = name
      spman.age = age
      if (medals.gold && spman.medals?.gold) {
        medals.gold.map(medal => spman.medals.gold.push(medal))
      } else if (medals.gold) {
        spman.medals = { ...spman.medals, gold: medals.gold }
      }
      if (medals.silver && spman.medals?.silver) {
        medals.silver.map(medal => spman.medals.silver.push(medal))
      } else if (medals.silver) {
        spman.medals = { ...spman.medals, silver: medals.silver }
      }
      if (medals.bronze && spman.medals?.bronze) {
        medals.bronze.map(medal => spman.medals.bronze.push(medal))
      } else if (medals.bronze) {
        spman.medals = { ...spman.medals, bronze: medals.bronze }
      }
      spman.save()
      res.sendStatus(200)
    })
})

router.get("/all", (req, res) => {
  Sportsman.find({})
    .then((spmans) => {
      res.send(spmans)
    })
})

module.exports = router