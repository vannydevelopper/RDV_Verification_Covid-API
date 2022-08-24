const express = require("express")

const ResultatsTestsController= require("../controllers/ResultatsTestsController")

const ResultatsRouter = express.Router()
const requireAuth = require("../middleware/requireAuth")
ResultatsRouter.post("/",requireAuth,ResultatsTestsController.CreateResultats)

module.exports = ResultatsRouter