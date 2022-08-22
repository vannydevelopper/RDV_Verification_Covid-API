const EchantillonModel = require("../models/EchantillonModel");

const ResultatModel = require("../models/ResultatModel");

const findEchantillon = async (req, res) => {
    try {
        const echantillon = await EchantillonModel.findType()
        res.status(200).json(echantillon)

    }
    catch (error) {
        console.log(error)
        res.status(500).send("server error")
    }
}
module.exports = 
{
    findEchantillon
}


