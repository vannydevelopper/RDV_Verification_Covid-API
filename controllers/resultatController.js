const ResultatModel = require("../models/ResultatModel");

const findResultat = async (req, res) => {
    try {
        const test = await ResultatModel.findTest()
        res.status(200).json(test)

    }
    catch (error) {
        console.log(error)
        res.status(500).send("server error")
    }
}
module.exports = 
{
    findResultat
}


