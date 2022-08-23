const verificationModel = require("../models/verificationModel")
const Validation = require("../class/Validation");

const findByIdrequerant = async (req, res) =>{

    try {
        const {cq_id} =req.query;
       
        // var id_tempo_requerant=(await verificationModel.findInRequerant(cq_id))[0]
        // if(id_tempo_requerant){
        //     return res.status(422).json(
        //         {
        //             success: false,
        //             message: "Rendez-vous  déjà scanné",
        //             type: "CONFIRME"   
        //         })
        // }
        
            var requerantRDV =(await verificationModel.findByIdC(cq_id))[0];
            if (requerantRDV) {
                const payement = (await verificationModel.findPayement(cq_id))[0];
                if (payement) {
                    const traite = (await verificationModel.findStatut("TEMPO_REQUERANT_ID",cq_id))[0];

                   if(traite.TRAITE==1)
                     {
                        const Requerant_statut = (await verificationModel.findStatut_requerant("TEMPO_REQUERANT_ID",cq_id))[0];

                        if(Requerant_statut.REQUERANT_STATUT_ID==3)
                        {
                            res.status(200).json
                            ({
                                success: true,
                                message: "Payement en ligne ",
                                messageResultat:"Atteinte des resultats",
                                // token,
                                requerantRDV,
                                payement
                            })
                        }
                        else
                        {
                            res.status(200).json
                            ({
                                success: true,
                                message: "Le requerant n'a pas de droit ",
                               
                            })
                        }
                        
                     }
                     else
                     {
                        res.status(200).json
                        ({
                            success: true,
                            message: "Payement en ligne ",
                            messageTraite0:"Traite0",
                            // token,
                            requerantRDV,
                            payement
                        })
                     }



                   
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