const express = require("express")
const router = express.Router()
const Sportsman = require("../models/sportsman")

router.post("/create", (req, res) => {
  const { name, age } = req.body
  Sportsman.create({ name, age })
    .then(() => res.sendStatus(200))
    .catch((e) => res.send(e.message))
})

module.exports = router