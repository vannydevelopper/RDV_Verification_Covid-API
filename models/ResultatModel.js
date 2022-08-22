const {query}=require("../function/db");
const findTest=async()=>{
    try{

        return query("SELECT RESULTAT_ID,DESCRIPTION FROM labo_resultat  WHERE 1");
    }
    catch(error)
    {
        throw error

    }
}
module.exports={
    findTest
}