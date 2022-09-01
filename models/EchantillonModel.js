const {query}=require("../function/db");
const findType=async(METHODE_TEST_ID)=>{
    try{
        
        return query("SELECT * FROM labo_type_echantillon  WHERE TYPE_ECHANTILLON_ID NOT IN (9,10,11) AND METHODE_TEST_ID=?",[METHODE_TEST_ID]);
    }
    catch(error)
    {
        throw error

    }
}
module.exports={
    findType
}