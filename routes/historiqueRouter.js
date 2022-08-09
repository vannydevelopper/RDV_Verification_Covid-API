const express = require("express");
const historiqueController = require("../controllers/historiqueController")
const requireAuth = require("../middleware/requireAuth")
const historiqueRouter=express.Router(); 
//historiqueRouter.post("/ajouter", historiqueController.createhistorique)
historiqueRouter.post("/ajouter", historiqueController.createhistorique);
historiqueRouter.get("/afficher", historiqueController.findAll)
module.exports=historiqueRouter