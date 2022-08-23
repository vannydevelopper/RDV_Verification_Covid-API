const express=require("express")
const TypeContyroller=require("../controllers/TypeContyroller")

const TypeRouter=express.Router()
TypeRouter.get("/afficher/:METHODE_TEST_ID",TypeContyroller.findType)
module.exports=TypeRouter