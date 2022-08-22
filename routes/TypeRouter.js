const express=require("express")
const TypeContyroller=require("../controllers/TypeContyroller")

const TypeRouter=express.Router()
TypeRouter.get("/afficher",TypeContyroller.findType)
module.exports=TypeRouter