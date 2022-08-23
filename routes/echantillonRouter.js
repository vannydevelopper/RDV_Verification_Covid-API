const express = require("express")

const EchantillonController = require("../controllers/EchantillonController")

const echantillonRouter = express.Router()

echantillonRouter.get("/afficher/:METHODE_TEST_ID", EchantillonController.findEchantillon)

module.exports = echantillonRouter