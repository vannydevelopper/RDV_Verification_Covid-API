const typeModel = require("../models/typeModel");

const findType = async (req, res) => {
    try {
        const type = await typeModel.findTest()
        res.status(200).json(type)

    }
    catch (error){
        console.log(error)
        res.status(500).send("server error")
    }
}
module.exports = 
{
    findType
}


