const {query}=require("../function/db");
const findByIdC = async (column, value) => {
    try {
        
        var sqlQuery = `SELECT NOM,PRENOM ,TELEPHONE,DATE_NAISSANCE,DATE_RENDEVOUS, EMAIL,LIEU_DE_NAISSANCE, ADRESSE_RESIDENCE, AEROPORT_EMBARQUEMA,DATE_INSERTION  FROM tempo_requerant  WHERE ${column} = ? `;
        return query(sqlQuery, [value]);
    }
    catch (error) {
        throw error
    }
  
    
  }
  const findPayement= async (RDV_ID) => {
    try {
        
        var sqlQuery = `SELECT EMAIL_PAYE,MONTANT,DATE_INSERT_PAYEMENT,COMPTE_SIBLE,CARTE_TYPE,DEVISE FROM rdv_payement WHERE RDV_ID=? `;
        return query(sqlQuery, [RDV_ID]);
    }
    catch (error){
        throw error
    }
  }
  const findhistorique= async(ID_RDV)=>{
    var sqlQuery='SELECT ID_RDV FROM historique WHERE 1 AND ID_RDV=?'
    return query(sqlQuery,[ID_RDV])
  }
  module.exports={
    findByIdC,
    findPayement,
    findhistorique
  }