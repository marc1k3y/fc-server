const express = require("express")
const router = express.Router()
const Trainer = require("../models/trainer")

router.post("/login", (req, res) => {
  const { login, password } = req.body
  Trainer.findOne({ login })
    .then((trainer) => {
      trainer.password === password
        ? res.sendStatus(200)
        : res.sendStatus(300)
    })
    .catch((e) => res.send(e.message))
})

router.post("/reg", (req, res) => {
  const { login, password } = req.body
  Trainer.create({ login, password })
    .then(() => res.sendStatus(200))
    .catch((e) => res.send(e.message))
})

module.exports = router