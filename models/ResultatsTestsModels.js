const { query } = require("../function/db")
const findByrequerant_labo = async (REQUERANT_ID) => {
    try {
        var sqlQuery = `SELECT REQU_LABO_ID FROM requerant_laboratoire rt  WHERE REQUERANT_ID =?`;
        return query(sqlQuery, [REQUERANT_ID]);
    }
    catch (error) {
        throw error
    }

}
const CreateResultats = async (DATE_PRELEVEMENT,DATE_RECEPTION, TYPE_ECHANTILLON_ID, TYPE_TEST_ID,RESULTAT_ID,CONCLUSION, DATE_CONCLUSION, METHODE_ID,REQUERANT_ID, NUMERO_LABO, REQU_LABO_ID, USER_ID) => {
    try {
        var sqlQuery = "INSERT INTO  labo_resultat_test(DATE_PRELEVEMENT,DATE_RECEPTION,TYPE_ECHANTILLON_ID,TYPE_TEST_ID,RESULTAT_ID,CONCLUSION,DATE_CONCLUSION,METHODE_ID,REQUERANT_ID,NUMERO_LABO,REQU_LABO_ID,USER_ID)";
        sqlQuery += "VALUES(?,?,?,?,?,?,?,?,?,?,?,?)"
        return query(sqlQuery, [
            DATE_PRELEVEMENT,
            DATE_RECEPTION,
            TYPE_ECHANTILLON_ID,
            TYPE_TEST_ID,
            RESULTAT_ID,
            CONCLUSION,
            DATE_CONCLUSION,
            METHODE_ID,
            REQUERANT_ID,
            NUMERO_LABO, 
            REQU_LABO_ID,
            USER_ID

        ]);
    } catch (error) {
        throw error
    }

}
const requerant_changement_statut = async (REQUERANT_STATUT_ID, REQUERANT_ID, USER_ID, DATE_TRAITEMENT, COMMENT) => {
    try {
        var sqlQuery = "INSERT INTO requerant_changement_statut (REQUERANT_STATUT_ID,REQUERANT_ID,USER_ID,DATE_TRAITEMENT,COMMENT)";
        sqlQuery += "VALUES(?,?,?,?,?)"
        return query(sqlQuery, [
            REQUERANT_STATUT_ID,
            REQUERANT_ID,
            USER_ID,
            DATE_TRAITEMENT,
            COMMENT
        ]);

    }
    catch (error) {
        console.log(error)
        res.status(500).send("server error")
    }
}
  const createTracking  = async (REQUERANT_ID,LONGITUDE,LATITUDE,ETAPE,USER_ID,DATE_INSERTION) => {
    try {
        var sqlQuery = "INSERT INTO requerant_tracking_gps (REQUERANT_ID,LONGITUDE,LATITUDE,ETAPE,USER_ID,DATE_INSERTION)";
        sqlQuery += "VALUES(?,?,?,?,?,?)"
        return query(sqlQuery, [
            REQUERANT_ID,
            LONGITUDE,
            LATITUDE,
            ETAPE,
            USER_ID,
            DATE_INSERTION
        ]);

    }
    catch (error) {
        console.log(error)
        res.status(500).send("server error")
    }
}


module.exports = {
    findByrequerant_labo,
    CreateResultats,
    requerant_changement_statut,
    createTracking
}