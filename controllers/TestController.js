const TestModel = require("../models/TestModel");

const findType = async (req, res) => {
    try {
           const test = await TestModel.findmodel()
           res.status(200).json(test)

    }
    catch (error) {
           console.log(error)
           res.status(500).send("server error")
    }
}
module.exports = {
    findType
}
    
    
