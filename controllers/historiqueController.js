const historiqueModel = require("../models/historiqueModel")
const Validation = require("../class/Validation")
const path = require("path");
const moment = require("moment");
const { query } = require("../function/db");

const createhistorique = async (req, res) =>{

    try {
        const
            {
                TEMPO_REQUERANT_ID,
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
            var idCheck =(await historiqueModel.findByIdCheck(TEMPO_REQUERANT_ID))[0]
            const pointEntre = idCheck.PROVENANCE == 2 ? 20 : null
             const age = moment().get("year") - moment(idCheck.DATE_NAISSANCE).get("year")
            const { insertId } = await historiqueModel.createOneRequerant(
                idCheck.NOM,
                idCheck.PRENOM,
                idCheck.EMAIL,
                idCheck.TELEPHONE,
                idCheck.PROVINCE_ID_RESIDENCE,
                idCheck.COMMUNE_ID_RESIDENCE,
                idCheck.ZONE_ID_RESIDENCE,
                idCheck.COLLINE_ID_RESIDENCE,
                idCheck.DISTRICT_ID,
                idCheck.NATIONALITE_ID,
                moment().format('YYYY/MM/DD HH:mm:ss'),
                idCheck.NUMERO_DOCUMENT,
                idCheck.STRUCTURE_ID,
                idCheck.DATE_NAISSANCE,
                age,
                idCheck.DOCUMENT_ID,
                idCheck.GENRE_ID,
                EST_VOYAGEUR=1,
                idCheck.PROVENANCE_PAYS_ID,
                idCheck.HOTEL_ID,
                pointEntre,
                idCheck.PROVENANCE,
                REQUERANT_STATUT_ID=3,
                idCheck.VOL_ID,
                moment().format('YYYY/MM/DD HH:mm:ss'),
                idCheck.TEMPO_REQUERANT_ID,
                idCheck.AUTRE_DESTINATION ?  idCheck.AUTRE_DESTINATION : idCheck.AUTRE_HOTEL,
                idCheck.REQUERANT_LANGUE_CERTIFICAT,

            );

            //insertion dans la table requerant trakings
            const { IdTraking } = await historiqueModel.createOne(
                insertId,
                LONGITUDE,
                LATITUDE,
                ETAPE=1,
                req.userId,

                PHOTO_BRD ? `${req.protocol}://${req.get("host")}/images/photo_brd/${PHOTO_BRD.name}` :null,
                 `${req.protocol}://${req.get("host")}/images/photo_prs/${PHOTO_PRS.name}`,// IMAGE.name

            );
            
            //insertion dans la table requerant laboratoire
            const {idLaboratoire} =await historiqueModel.createLaboratoire(
                idCheck.STRUCTURE_ID,
                insertId,
                STATUT=1
            );

            await query ("update tempo_requerant SET TRAITE=?, USER_ID= ?, DATE_TRAITEMENT=? WHERE TEMPO_REQUERANT_ID=?",[
                1, req.userId, moment().format('YYYY/MM/DD HH:mm:ss'), TEMPO_REQUERANT_ID
            ])

            const historique = (await historiqueModel.findById(insertId))[0]
            res.status(200).json({
                success: true,
                message: "enregistrement reussi avec succes"
            })
           

        }
        else {
            res.status(411).json(
                {
                    success: false,
                    message: "La validation des données a échoué",
                    errors: validation.getErrors(),
                })

        }

        if (!req.files){
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
const findByIdrequerant = async (req, res) =>{

    try {
        const { cq_id }= req.query;

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
    const {q,limit,offset}=req.query

    try {
        const historique = await historiqueModel.findhistorique(req.userId,q,offset,limit)
        res.status(200).json(historique)

    }
    catch (error){
        console.log(error)
        res.status(500).send("server error")
    }
}
module.exports = {
    createhistorique,
    findAll,
    findByIdrequerant

}
