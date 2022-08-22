const express = require("express")

const TestController = require("../controllers/TestController")

const TestRouter = express.Router()

TestRouter.get("/afficher", TestController.findType)

module.exports = TestRouter