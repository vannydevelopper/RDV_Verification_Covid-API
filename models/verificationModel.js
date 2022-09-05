const { query } = require("../function/db");
const findByIdC = async (value) => {
        try {

          var sqlQuery = `SELECT tempo.TEMPO_REQUERANT_ID, tempo.NOM,tempo.DATE_VOYAGE,tempo.PRENOM ,tempo.TELEPHONE, tempo.DATE_NAISSANCE ,tempo.DATE_RENDEVOUS, tempo.EMAIL,tempo.NUMERO_DOCUMENT,tempo.LIEU_DE_NAISSANCE, tempo.ADRESSE_RESIDENCE, tempo.AEROPORT_EMBARQUEMA, tempo.DATE_INSERTION,labo_resultat_test.DATE_RESULTAT,vl_voyageur_documents.DOCUMENT_DESCR, countries.CommonName, requerant.DATE_PRELEVEMENT,requerant.REQUERANT_STATUT_ID,structures.STRUCTURE_NOM , labo_resultat_test.USER_ID,labo_resultat_test.RESULTAT_ID,requerant_changement_statut.USER_VALIDER_RESULTAT,requerant_changement_statut.DATE_VALIDATION_RESULTAT,requerant_changement_statut.DATE_TELECHARGEMENT_CERTIFICAT,users.USER_FNAME,users.USER_LNAME,requerant_tracking_gps.PATH_BORDEREAU,requerant_tracking_gps.PATH_PASSEPORT FROM tempo_requerant tempo LEFT JOIN vl_voyageur_documents ON vl_voyageur_documents.DOCUMENT_ID=tempo.DOCUMENT_ID LEFT JOIN countries ON countries.COUNTRY_ID=tempo.NATIONALITE_ID LEFT JOIN requerant ON requerant.TEMPO_REQUERANT_ID=tempo.TEMPO_REQUERANT_ID  LEFT JOIN structures ON structures.STRUCTURE_ID=tempo.STRUCTURE_ID LEFT JOIN  labo_resultat_test ON  labo_resultat_test.REQUERANT_ID=requerant.REQUERANT_ID LEFT JOIN requerant_changement_statut ON requerant.REQUERANT_ID=requerant_changement_statut.REQUERANT_ID LEFT JOIN users ON users.USER_ID=requerant_changement_statut.USER_ID LEFT JOIN requerant_tracking_gps ON requerant_tracking_gps.REQUERANT_ID=requerant.REQUERANT_ID `;
          if (value.length > 10) {
            sqlQuery += ` WHERE md5(tempo.TEMPO_REQUERANT_ID)=? `
          } else {
            sqlQuery += ` WHERE tempo.TEMPO_REQUERANT_ID = ? `
          }
          return query(sqlQuery, [value]);

        }
        catch (error) {
          throw error
        }

}
const findStatut= async  (column, value) => {
  try {
    
      var sqlQuery=`SELECT t.TRAITE FROM tempo_requerant t WHERE  ${column}= ?`
      return query(sqlQuery, [value]);
      
  }
  catch (error) {
      console.log(error)
      throw error
  }

}
const findStatut_requerant= async  (column, value) =>{
  try {
    
      var sqlQuery=`SELECT REQUERANT_STATUT_ID FROM requerant WHERE  ${column}= ?`
      return query(sqlQuery, [value]);
      
  }
  catch (error) {
      console.log(error)
      throw error
  }

}
const find_Requerant_statut_Id= async  (column, value) =>{
  try{
    
      var sqlQuery=`SELECT REQUERANT_STATUT_ID,EST_GENERE FROM requerant WHERE   ${column}= ?`
      return query(sqlQuery, [value]);
      
  }
  catch (error) {
      console.log(error)
      throw error
  }

}

const findPayement = async (cq_id) =>{
        try {

          var sqlQuery = `SELECT EMAIL_PAYE,MONTANT,DATE_INSERT_PAYEMENT,COMPTE_SIBLE,CARTE_TYPE,DEVISE FROM rdv_payement LEFT JOIN  tempo_requerant t ON t.RDV_ID=rdv_payement.RDV_ID  WHERE 1`;
          if (cq_id.length > 10) {
            sqlQuery += ` AND md5(TEMPO_REQUERANT_ID) = ? `
          } else {
            sqlQuery += ` AND TEMPO_REQUERANT_ID = ? `
          }
          return query(sqlQuery, [cq_id]);
        }
        catch (error) {
          throw error
        }
}
const findhistorique = async (RDV_ID) => {
        var sqlQuery = 'SELECT ID_RDV FROM historique WHERE 1 '
        if (cq_id.length > 10) {
          sqlQuery += ` AND md5(ID_RDV) = ? `
        } else {
          sqlQuery += ` AND ID_RDV = ? `
        }
        return query(sqlQuery, [RDV_ID])

}

const findInRequerant = async (cq_id) => {
        var sqlQuery = 'SELECT * FROM tempo_requerant WHERE TRAITE=1 '
        if (cq_id.length > 10) {
          sqlQuery += ` AND md5(TEMPO_REQUERANT_ID) = ? `
        } else {
          sqlQuery += ` AND TEMPO_REQUERANT_ID = ? `
        }
        return query(sqlQuery, [cq_id])

}



module.exports = {
      findByIdC,
      findPayement,
      findhistorique,
      findInRequerant,
      findStatut,
      findStatut_requerant,
      find_Requerant_statut_Id

}