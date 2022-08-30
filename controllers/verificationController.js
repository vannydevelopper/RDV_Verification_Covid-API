const verificationModel = require("../models/verificationModel")
const Validation = require("../class/Validation");
const { query } = require("../function/db");
const findByIdrequerant = async (req, res) => {

    try {
        const { cq_id } = req.query;

       var requerantRDV = (await verificationModel.findByIdC(cq_id))[0];
       const requerant_Id = (await query("SELECT REQUERANT_ID FROM requerant WHERE TEMPO_REQUERANT_ID=?",[cq_id]))[0]
       //const REQUERANT_ID=requerant_Id.REQUERANT_ID
      // console.log(requerant_Id)
        if (requerantRDV) {
            const traite = (await verificationModel.findStatut("TEMPO_REQUERANT_ID", cq_id))[0];

            if (traite.TRAITE == 1) {
                const Requerant_statut = (await verificationModel.findStatut_requerant("TEMPO_REQUERANT_ID", cq_id))[0];

                if (Requerant_statut && Requerant_statut.REQUERANT_STATUT_ID ==3){
                    return res.status(200).json
                        ({
                            success: true,
                            messageResultat: "Atteinte des resultats",
                            // token,
                            requerantRDV,
                            requerant_Id
                        })
                }
                const Requerant_statut_Id = (await verificationModel.find_Requerant_statut_Id("TEMPO_REQUERANT_ID", cq_id))[0];
                //console.log(Requerant_statut_Id)
                if (Requerant_statut_Id && Requerant_statut_Id.REQUERANT_STATUT_ID !=3 && Requerant_statut_Id.EST_GENERE == 0) {

                    return res.status(200).json
                        ({
                            success: true,
                            messageValidation: "Validation des resultats",
                            // token,
                            requerantRDV,
                            requerant_Id
                        })
                }
                else {
                    return res.status(200).json
                        ({
                            success: true,
                            message: "Le requerant n'a pas de droit a  la validation",

                        })
                }
            

            } else {

                const payement = (await verificationModel.findPayement(cq_id))[0];
                if (payement) {
                    res.status(200).json
                        ({
                            success: true,
                            message: "Payement en ligne ",
                            messageTraite0: "Traite0",
                            // token,
                            requerantRDV,
                            payement
                        })
    
    
                } else {
                    res.status(200).json
                        ({
                            success: true,
                            message: "Payement Par banque ",
                            requerantRDV,
                            payement,
                            messageTraite0: "Traite0",
    
                        })
                }
            }

        }
        else {
            res.status(404).json(
                {
                    success: false,
                    message: "Rendez vous invalide",
                    type: "INVALIDE"
                    // errors: validation.getErrors(),
                })

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