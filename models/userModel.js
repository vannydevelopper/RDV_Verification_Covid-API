
const {query}=require("../function/db");
const findBy = async (column, value) => 
{
  try 
  {
    var sqlQuery = `SELECT * FROM users  WHERE ${column} = ? `;
    return query(sqlQuery, [value]);
  } 
  catch (error) 
  {
    throw error;
  }
};
module.exports={
    findBy
}