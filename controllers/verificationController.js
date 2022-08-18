const verificationModel = require("../models/verificationModel")
const Validation = require("../class/Validation");

const findByIdrequerant = async (req, res) =>{

    try {
        const {cq_id} =req.query;
        //var date_rendez_vous=(await verificationModel.findDateRendevous(cq_id))[0]

      // var id_rendez_vous=(await verificationModel.findhistorique(parseInt(cq_id)))[0]
        //var id_rendez_vous=(await verificationModel.findhistorique(cq_id))[0]
        var id_tempo_requerant=(await verificationModel.findInRequerant(cq_id))[0]
        if(id_tempo_requerant){
            return res.status(422).json(
                {
                    success: false,
                    message: "Requérant est déjà confirmé",
                    type: "CONFIRME"   
                })
        }
        
            var requerantRDV =(await verificationModel.findByIdC(cq_id))[0];
            if (requerantRDV) {
                const payement = (await verificationModel.findPayement(cq_id))[0];
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