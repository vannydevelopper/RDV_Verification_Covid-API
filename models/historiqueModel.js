const { query } = require("../function/db");
const createOne = async (	REQUERANT_ID, LONGITUDE, LATITUDE, ETAPE, USER_ID, PATH_BORDEREAU, 	PATH_PASSEPORT ) => {
  try {
    var sqlQuery = "INSERT INTO requerant_tracking_gps(REQUERANT_ID,LONGITUDE,LATITUDE ,ETAPE,USER_ID, PATH_BORDEREAU, PATH_PASSEPORT)";
    sqlQuery += "VALUES(?,?,?,?,?,?,?)"
    return query(sqlQuery, [
      REQUERANT_ID,
      LONGITUDE,
      LATITUDE,
      ETAPE,
      USER_ID,
      PATH_BORDEREAU,
      PATH_PASSEPORT

    ]);

  }
  catch (error) {
    console.log(error)
    res.status(500).send("server error")
  }
}

const createLaboratoire = async (	STRUCTURE_ID, REQUERANT_ID, STATUT ) => {
  try {
    var sqlQuery = "INSERT INTO requerant_laboratoire(STRUCTURE_ID,REQUERANT_ID,STATUT)";
    sqlQuery += "VALUES(?,?,?)"
    return query(sqlQuery, [
      STRUCTURE_ID,
      REQUERANT_ID,
      STATUT
    ]);

  }
  catch (error) {
    console.log(error)
    res.status(500).send("server error")
  }
}

const findById = async (id) => {
  try {
    return query("SELECT * FROM historique WHERE ID_HISTORIQUE = ?", [id]);
  } catch (error) {
    throw error;
  }
};


const createOneRequerant = async (REQUERANT_NOM, REQUERANT_PRENOM,
  EMAIL, TELEPHONE, PROVINCE_ID_RESIDENCE, COMMUNE_ID_RESIDENCE,
  ZONE_ID_RESIDENCE, COLLINE_ID_RESIDENCE, NATIONALITE_ID, DATE_PRELEVEMENT,
  CNI_PASSPORT_CPGL, STRUCTURE_ID, DATE_NAISSANCE, AGE, TYPE_IDENTITE,
  SEXE_ID, EST_VOYAGEUR, PAYS_PROVENANCE_ID, HOTEL_ID, TYPE_PASSAGER_ID,
  REQUERANT_STATUT_ID, VOL_ID, DATE_ATTERISSAGE, TEMPO_REQUERANT_ID, AUTRE_HOTEL) => {
  try {
    var sqlQuery = "INSERT INTO requerant(REQUERANT_NOM,REQUERANT_PRENOM,EMAIL ,TELEPHONE,PROVINCE_ID_RESIDENCE,COMMUNE_ID_RESIDENCE, ZONE_ID_RESIDENCE, COLLINE_ID_RESIDENCE, NATIONALITE_ID, DATE_PRELEVEMENT, CNI_PASSPORT_CPGL, STRUCTURE_ID, DATE_NAISSANCE,AGE, TYPE_IDENTITE, SEXE_ID, EST_VOYAGEUR, PAYS_PROVENANCE_ID, HOTEL_ID, TYPE_PASSAGER_ID, REQUERANT_STATUT_ID, VOL_ID, DATE_ATTERISSAGE, TEMPO_REQUERANT_ID, AUTRE_HOTEL)";
    sqlQuery += "VALUES(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)"
    return query(sqlQuery, [
      REQUERANT_NOM, REQUERANT_PRENOM,
      EMAIL, TELEPHONE, PROVINCE_ID_RESIDENCE, COMMUNE_ID_RESIDENCE,
      ZONE_ID_RESIDENCE, COLLINE_ID_RESIDENCE, NATIONALITE_ID, DATE_PRELEVEMENT,
      CNI_PASSPORT_CPGL, STRUCTURE_ID, DATE_NAISSANCE, AGE, TYPE_IDENTITE,
      SEXE_ID, EST_VOYAGEUR, PAYS_PROVENANCE_ID, HOTEL_ID, TYPE_PASSAGER_ID,
      REQUERANT_STATUT_ID, VOL_ID, DATE_ATTERISSAGE, TEMPO_REQUERANT_ID, AUTRE_HOTEL

    ]);
  } catch (error) {
    throw error
  }

}


const findhistorique = async (userId, q, offset = 0, limit = 10) => {
  try {
    var binds = [userId];
    var sqlQuery = `SELECT hist.*, temp.NOM, temp.PRENOM, temp.EMAIL, temp.TELEPHONE, temp.DATE_NAISSANCE, temp.DATE_RENDEVOUS FROM historique hist LEFT JOIN tempo_requerant temp ON hist.ID_RDV=temp.RDV_ID  WHERE hist.ID_USER=? `;
    if (q && q != "") {
      sqlQuery += " AND ( temp.NOM LIKE ? OR temp.PRENOM LIKE ? OR temp.EMAIL LIKE ? OR temp.TELEPHONE LIKE ? OR temp.DATE_NAISSANCE LIKE ? OR temp.DATE_RENDEVOUS LIKE ?)";
      binds.push(`%${q}%`, `%${q}%`, `%${q}%`, `%${q}%`, `%${q}%`, `%${q}%`);
    }
    sqlQuery += " ORDER BY hist.DATE DESC ";
    sqlQuery += `LIMIT ${offset}, ${limit}`;
    return query(sqlQuery, binds);
  }
  catch (error) {
    throw error
  }


}
const findByIdC = async (column, value) => {
  try {

    var sqlQuery = `SELECT NOM,PRENOM ,TELEPHONE  FROM tempo_requerant  WHERE ${column} = ? `;
    return query(sqlQuery, [value]);
  }
  catch (error) {
    throw error
  }

}

const findByIdCheck = async (TEMPO_REQUERANT_ID) => {
  try {

    // var sqlQuery = `SELECT TEMPO_REQUERANT_ID FROM tempo_requerant  WHERE md5(TEMPO_REQUERANT_ID) = ? `;
    var sqlQuery = `SELECT NOM,TEMPO_REQUERANT_ID, PRENOM, EMAIL, TELEPHONE, PROVINCE_ID_RESIDENCE, COMMUNE_ID_RESIDENCE, ZONE_ID_RESIDENCE, COLLINE_ID_RESIDENCE ,NATIONALITE_ID, NUMERO_DOCUMENT, STRUCTURE_ID, DATE_NAISSANCE,DOCUMENT_ID, GENRE_ID,PROVENANCE_PAYS_ID,HOTEL_ID,PROVENANCE, VOL_ID,STRUCTURE_ID,AUTRE_DESTINATION,REQUERANT_LANGUE_CERTIFICAT  FROM tempo_requerant WHERE TEMPO_REQUERANT_ID = ? `;
    return query(sqlQuery, [TEMPO_REQUERANT_ID]);
  }
  catch (error) {
    throw error
  }

}

const findByIdChecknonCripte = async (TEMPO_REQUERANT_ID) => {
  try {
    var sqlQuery = `SELECT NOM,TEMPO_REQUERANT_ID, PRENOM, EMAIL, TELEPHONE, PROVINCE_ID_RESIDENCE, COMMUNE_ID_RESIDENCE, ZONE_ID_RESIDENCE, COLLINE_ID_RESIDENCE ,NATIONALITE_ID, NUMERO_DOCUMENT, STRUCTURE_ID, DATE_NAISSANCE,DOCUMENT_ID, GENRE_ID,PROVENANCE_PAYS_ID,HOTEL_ID,PROVENANCE, VOL_ID,STRUCTURE_ID,AUTRE_DESTINATION,REQUERANT_LANGUE_CERTIFICAT  FROM tempo_requerant WHERE TEMPO_REQUERANT_ID = ? `;
    return query(sqlQuery, [TEMPO_REQUERANT_ID]);
  }
  catch (error) {
    throw error
  }

}
module.exports = {
  createOne,
  findhistorique,
  findById,
  findByIdC,
  findByIdCheck,
  findByIdChecknonCripte,
  createOneRequerant,
  createLaboratoire
}