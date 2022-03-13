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
  const { id } = req.query
  const { name, age } = req.body
  Sportsman.findOne({ _id: id })
    .then((spman) => {
      spman.name = name
      spman.age = age
      spman.save()
      res.sendStatus(200)
    })
    .catch(() => res.sendStatus(300))
})

router.delete("/delete", (req, res) => {
  const { id } = req.query
  Sportsman.deleteOne({ _id: id })
    .then(() => res.sendStatus(200))
    .catch(() => res.sendStatus(300))
})

router.put("/medals", (req, res) => {
  const { id } = req.query
  const { medals } = req.body
  Sportsman.findOne({ _id: id })
    .then((spman) => {
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
      spman.markModified("medals")
      spman.save()
      res.sendStatus(200)
    })
    .catch(() => res.sendStatus(300))
})

router.get("/all", (req, res) => {
  Sportsman.find({})
    .then((spmans) => {
      spmans = spmans.forEach(spman => 
        spman.rating = (
          (spman.medals?.gold.length * 5) +
          (spman.medals?.silver.length * 3) +
          (spman.medals?.bronze.length)))
      res.send(spmans)
    })
})

module.exports = router