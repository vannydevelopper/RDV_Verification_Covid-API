const { query } = require("../function/db");
const findByIdC = async (value) => {
  try {

    var sqlQuery = `SELECT TEMPO_REQUERANT_ID, NOM,PRENOM ,TELEPHONE,DATE_NAISSANCE,DATE_RENDEVOUS, EMAIL,LIEU_DE_NAISSANCE, ADRESSE_RESIDENCE, AEROPORT_EMBARQUEMA,DATE_INSERTION  FROM tempo_requerant  WHERE 1`;
        if(value.length > 10){
          sqlQuery += ` AND md5(TEMPO_REQUERANT_ID) = ? `
        }else{
          sqlQuery += ` AND TEMPO_REQUERANT_ID = ? `
        }  
    return query(sqlQuery,[value]);

  }
  catch (error){
    throw error
  }

}
const findPayement = async (RDV_ID) => {
  try {

    var sqlQuery = `SELECT EMAIL_PAYE,MONTANT,DATE_INSERT_PAYEMENT,COMPTE_SIBLE,CARTE_TYPE,DEVISE FROM rdv_payement LEFT JOIN  tempo_requerant t ON t.RDV_ID=rdv_payement.RDV_ID  WHERE 1`;
        if(RDV_ID.length > 10){
          sqlQuery += ` AND md5(TEMPO_REQUERANT_ID) = ? `
        }else{
          sqlQuery += ` AND TEMPO_REQUERANT_ID = ? `
        }  
    return query(sqlQuery, [RDV_ID]);
  }
  catch (error) {
    throw error
  }
}
const findhistorique = async (cq_id) => {
  var sqlQuery = 'SELECT ID_RDV FROM historique WHERE 1 '
    if(cq_id.length > 10){
      sqlQuery += ` AND md5(ID_RDV) = ? `
    }else{
      sqlQuery += ` AND ID_RDV = ? `
    } 
  return query(sqlQuery, [cq_id])

}
const findDateRendevous = async (cq_id) =>{
  var sqlQuery = 'SELECT DATE_RENDEVOUS FROM tempo_requerant WHERE 1 '
   
  return query(sqlQuery, [cq_id])

}
module.exports = {
  findByIdC,
  findPayement,
  findhistorique,
  findDateRendevous
}