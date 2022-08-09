const express = require("express");
const requireAuth = require("../middleware/requireAuth")
const userController = require("../controllers/userController")

const userRouter = express.Router();
userRouter.post("/login", userController.login)
//userRouter.get("/login", userController.login)

module.exports =userRouter