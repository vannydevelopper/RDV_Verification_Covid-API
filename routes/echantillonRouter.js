const express = require("express")

const EchantillonController = require("../controllers/EchantillonController")

const echantillonRouter = express.Router()

echantillonRouter.get("/afficher", EchantillonController.findEchantillon)

module.exports = echantillonRouter