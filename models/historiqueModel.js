const { query } = require("../function/db");
const createOne = async (ID_USER, ID_RDV, LONGITUDE, LATITUDE, PHOTO_BRD, PHOTO_PRS) => {
  try {
    var sqlQuery = "INSERT INTO historique(ID_USER,ID_RDV,LONGITUDE ,LATITUDE,PHOTO_BRD,PHOTO_PRS)";
    sqlQuery += "VALUES(?,?,?,?,?,?)"
    return query(sqlQuery, [
      ID_USER,
      ID_RDV,
      LONGITUDE,
      LATITUDE,
      PHOTO_BRD,
      PHOTO_PRS,

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
const findhistorique = async (userId, q, offset = 0, limit = 10) => {
  try {
    var binds = [userId];
    var sqlQuery = `SELECT hist.*, temp.NOM, temp.PRENOM, temp.EMAIL, temp.TELEPHONE, temp.DATE_NAISSANCE, temp.DATE_RENDEVOUS FROM historique hist LEFT JOIN tempo_requerant temp ON hist.ID_RDV=temp.RDV_ID  WHERE hist.ID_USER=? `;
    if (q && q != "") {
      sqlQuery += " AND ( temp.NOM LIKE ? OR temp.PRENOM LIKE ? OR temp.EMAIL LIKE ? OR temp.TELEPHONE LIKE ? OR temp.DATE_NAISSANCE LIKE ? OR temp.DATE_RENDEVOUS LIKE ?)";
      binds.push(`%${q}%` ,`%${q}%`, `%${q}%`, `%${q}%`, `%${q}%`, `%${q}%`);
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
module.exports = {
  createOne,
  findhistorique,
  findById,
  findByIdC
}