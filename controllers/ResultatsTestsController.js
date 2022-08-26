const ResultatsTestsModels = require("../models/ResultatsTestsModels")
const Validation = require("../class/Validation")
const { query } = require("../function/db");
const moment = require("moment");
const CreateResultats = async (req, res) => {
    try {
        const
            {
                METHODE_ID,
                DATE_PRELEVEMENT,
                TYPE_ECHANTILLON_ID,
                TYPE_TEST_ID,
                TEMPO_REQUERANT_ID,
                COMMENT,
                REQUERANT_STATUT_ID
            } = req.body
        const validation = new Validation(req.body)
        validation.run()
        if (validation.isValidate()) {
            const requerant = (await query("SELECT REQUERANT_ID FROM requerant WHERE TEMPO_REQUERANT_ID=?", [TEMPO_REQUERANT_ID]))[0]

            var REQUERANT_ID = requerant.REQUERANT_ID
            console.log(requerant)
            var requerant_labo = (await ResultatsTestsModels.findByrequerant_labo(REQUERANT_ID))[0]

            const { insertId } = await ResultatsTestsModels.CreateResultats(
                DATE_PRELEVEMENT,
                TYPE_ECHANTILLON_ID,
                TYPE_TEST_ID,
                moment().format('YYYY/MM/DD HH:mm:ss'),
                METHODE_ID,
                1,
                requerant_labo.REQU_LABO_ID,
                req.userId
            );
            const {id_statut_changement } = await ResultatsTestsModels.requerant_changement_statut(

                REQUERANT_STATUT_ID,
                REQUERANT_ID,
                req.userId,
                moment().format('YYYY/MM/DD HH:mm:ss'),
                COMMENT


            );
            await query("update requerant SET REQUERANT_STATUT_ID=? WHERE TEMPO_REQUERANT_ID=?", [REQUERANT_STATUT_ID, TEMPO_REQUERANT_ID
            ])

            await query("update requerant_laboratoire SET 	DATE_RESPONSE=?,STATUT=? WHERE REQU_LABO_ID=?", [moment().format('YYYY/MM/DD HH:mm:ss'), 0, requerant_labo.REQU_LABO_ID,
            ])
            res.status(200).json({
                success: true,
                message: "l'enregistrement est faite avec succes"
            })
        }
        else {
            res.status(422).json({
                success: false
            })
        }
    }
    catch (error) {
        console.log(error)
        res.status(500).send("server error")
    }

}

module.exports = {
    CreateResultats
}