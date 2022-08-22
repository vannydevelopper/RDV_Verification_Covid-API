const express = require("express")

const resultatController = require("../controllers/resultatController")

const resultatRouter = express.Router()

resultatRouter.get("/afficher", resultatController.findResultat)

module.exports = resultatRouter