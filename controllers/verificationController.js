const verificationModel = require("../models/verificationModel")
const Validation = require("../class/Validation");

const findByIdrequerant = async (req, res) => {

    try {
        const {cq_id} = req.query;

        var requerantRDV = (await verificationModel.findByIdC("RDV_ID", cq_id))[0];
        if (requerantRDV) {
            const payement = (await verificationModel.findPayement(cq_id))[0];
            console.log(requerantRDV)
            if (payement) {
                res.status(200).json
                    ({
                        success: true,
                        message: "Payement en ligne ",
                        // token,
                        requerantRDV,
                        payement
                    })
            }
            else {
                res.status(200).json
                    ({
                        success: true,
                        message: "Payement Par banque ",
                        requerantRDV,
                        payement

                    })
            }

        }
        else {
            res.status(404).json(
                {
                    success: false,
                    message: "Rendez vous invalide",
                    // errors: validation.getErrors(),
                })
            204
        }
    }
    catch (error) {
        console.log(error)
        res.status(500).send("server error")
    }
}
module.exports = {
    findByIdrequerant
}