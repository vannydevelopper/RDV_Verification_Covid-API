const express = require("express");
const verificationController=require("../controllers/verificationController");
const requireAuth = require("../middleware/requireAuth");

const verificationRouter=express.Router()
verificationRouter.get("/", requireAuth, verificationController.findByIdrequerant)
module.exports=verificationRouter



