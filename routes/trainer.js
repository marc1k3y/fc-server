const express = require("express")
const router = express.Router()
const Trainer = require("../models/trainer")

router.post("/login", (req, res) => {
  const { login, password } = req.body
  Trainer.findOne({ login })
    .then((trainer) => {
      trainer.password === password
        ? res.send(trainer._id)
        : res.sendStatus(300)
    })
    .catch((e) => res.send(e.message))
})

router.get("/check", (req, res) => {
  const { id } = req.query
  Trainer.findOne({ _id: id })
    .then((trainer) => {
      res.send(trainer._id)
    })
    .catch(() => res.sendStatus(300))
})

router.post("/reg", (req, res) => {
  const { login, password } = req.body
  Trainer.create({ login, password })
    .then(() => res.sendStatus(200))
    .catch((e) => res.send(e.message))
})

module.exports = router