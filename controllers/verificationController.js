const verificationModel = require("../models/verificationModel")
const Validation = require("../class/Validation");
const { query } = require("../function/db");
const { response } = require("express");
const findByIdrequerant = async (req, res) => {

    try {
        const { cq_id } = req.query;

        var requerantRDV = (await verificationModel.findByIdC(cq_id))[0];
        const requerant_Id = (await query("SELECT REQUERANT_ID FROM requerant WHERE TEMPO_REQUERANT_ID=?", [cq_id]))[0]

        // console.log(requerant_Id)
        if (requerantRDV) {
            const droit = (await verificationModel.checkdroit("USER_ID", req.userId))[0];
            console.log(droit)
            if (requerantRDV.PROVENANCE == 2 && requerantRDV.TRAITE==0) {

                if (droit.GESTION_RENDEZ_VOUS != 1 || droit.USER_PROFILE_ID != 5) {
                    return res.status(401).json({


                        message: "Vous n'avez pas de  droit pour scanner ce certificat du voyageur entrant",
                        requerantRDV,
                        requerant_Id

                    })
                }


            }
            else if (requerantRDV.PROVENANCE == 1 && requerantRDV.TRAITE==0) {
                if (droit.GESTION_RENDEZ_VOUS != 1 || droit.POINT_ENTREE_ID != 20) {
                    return res.status(401).json({

                        message: "Vous n'avez pas  droit pour scanner ce certificat du voyageur Sortant",
                        requerantRDV,
                        requerant_Id

                    })


                }

            }

            const traite = (await verificationModel.findStatut("TEMPO_REQUERANT_ID", cq_id))[0];

            if (traite.TRAITE == 1) {

                const Requerant_statut = (await verificationModel.findStatut_requerant("TEMPO_REQUERANT_ID", cq_id))[0];

                if (Requerant_statut && Requerant_statut.REQUERANT_STATUT_ID == 3) {
                    if (droit.GESTION_FILS_ATTENTE_LABO != 1) {
                        return res.status(401).json({

                            message: "Vous n'avez de  droit pour donner les résultats",
                            requerantRDV,
                            requerant_Id

                        })
                    }
                    return res.status(200).json
                        ({
                            success: true,
                            messageResultat: "Atteinte des résultats",
                            // token,
                            requerantRDV,
                            requerant_Id
                        })
                }

                const Requerant_statut_Id = (await verificationModel.find_Requerant_statut_Id("TEMPO_REQUERANT_ID", cq_id))[0];
                //console.log(Requerant_statut_Id)
                if (Requerant_statut_Id && Requerant_statut_Id.REQUERANT_STATUT_ID != 3 && Requerant_statut_Id.EST_GENERE == 0) {
                    if (droit.VALIDATION_RESULTAT != 1) {
                        return res.status(401).json({

                            message: "Vous n'avez de  droit de validation des résultats",
                            requerantRDV,
                            requerant_Id

                        })
                    }
                    return res.status(200).json
                        ({
                            success: true,
                            messageValidation: "Validation des résultats",
                            // token,
                            requerantRDV,
                            requerant_Id
                        })
                }
                else {
                    return res.status(200).json
                        ({
                            success: true,
                            requerantRDV,
                            requerant_Id,
                            message: "Le requerant n'a pas de droit   de validation",

                        })
                }


            } else {

                const payement = (await verificationModel.findPayement(cq_id))[0];
                if (payement) {
                    res.status(200).json
                        ({
                            success: true,
                            // message: "Payement en ligne ",
                            messageTraite0: "Traite0",
                            // token,
                            requerantRDV,
                            payement
                        })


                } else {
                    res.status(200).json
                        ({
                            success: true,
                            // message: "Payement Par banque ",
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