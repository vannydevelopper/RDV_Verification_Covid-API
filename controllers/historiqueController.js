const historiqueModel = require("../models/historiqueModel")
const Validation = require("../class/Validation")
const path = require("path");

const createhistorique = async (req, res) => {

    try {
        const
            {
                ID_RDV,
                LONGITUDE,
                LATITUDE
            } = req.body

        var PHOTO_BRD = req.files?.PHOTO_BRD;
        var PHOTO_PRS = req.files?.PHOTO_PRS;
        if (!req.files) {
            res.send({
                status: false,
                message: 'No file uploaded'
            });
        }
        else {
            // let PHOTO_BRD = req.files.PHOTO_BRD;
            //console.log(req.files.PHOTO_BRD)
            if (PHOTO_BRD) {
                PHOTO_BRD.mv('./public/images/photo_brd/' + PHOTO_BRD.name, async function (err) {
                    if (err) {
                        console.log(err)
                        return res.status(422).json({
                            message: "Image non ajoute"
                        })
                    }
                });
            }

            // let PHOTO_PRS = req.files.PHOTO_PRS;
            //console.log(req.files.PHOTO_PRS)

                PHOTO_PRS.mv('./public/images/photo_prs/' + PHOTO_PRS.name, async function (err) {
                    if (err) {
                        console.log(err)
                        return res.status(422).json({
                            message: "Image non ajoute"
                        })
                    }
                });
        
        }
        const validation = new Validation(req.body,
            {

                IMAGES:
                {
                    image: 20480
                },

            },
            {
                LONGITUDE:
                {
                    required: "Longitude  est obligatoire",
                    length: "Longitude invalide",
                },
                LATITUDE:
                {
                    required: "Latitude  est obligatoire",
                    length: "Latitude invalide",
                }
            }
        )

        validation.run()
        if (validation.isValidate()) {
            const { insertId } = await historiqueModel.createOne(
                req.userId,
                ID_RDV,
                LONGITUDE,
                LATITUDE,

                PHOTO_BRD ? `${req.protocol}://${req.get("host")}/images/photo_brd/${PHOTO_BRD.name}` :null,
                 `${req.protocol}://${req.get("host")}/images/photo_prs/${PHOTO_PRS.name}`,// IMAGE.name

            );
            console.log(req.userId,)

            const historique = (await historiqueModel.findById(insertId))[0]
            res.status(200).json({
                success: true,
                message: "enregistrement reussi avec succes"
            })
            console.log(req.userId)

        }
        else {
            res.status(411).json(
                {
                    success: false,
                    message: "La validation des données a échoué",
                    errors: validation.getErrors(),
                })

        }

        if (!req.files) {
            res.send({
                status: false,
                message: 'No files uploaded'
            });
        }

    }

    catch (error) {
        console.log(error)
        res.status(500).send("server error")
    }
}
const findByIdrequerant = async (req, res) => {

    try {
        const { cq_id } = req.query;

        var requerantRDV = (await historiqueModel.findByIdC("TEMPO_REQUERANT_ID", cq_id))[0];
        if (requerantRDV) {
            res.status(200).json
                ({
                    success: true,
                    message: "conquerant existe",
                    requerantRDV
                });

        }
        else {
            res.status(404).json(
                {
                    success: false,
                    message: "conquerant n'existe pas",

                })
            204
        }
    }
    catch (error) {
        console.log(error)
        res.status(500).send("server error")
    }
}

const findAll = async (req, res) => {
    try {
        const historique = await historiqueModel.findhistorique()
        res.status(200).json(historique)

    }
    catch (error) {
        console.log(error)
        res.status(500).send("server error")
    }
}
module.exports = {
    createhistorique,
    findAll,
    findByIdrequerant

}
