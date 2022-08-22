const {query}=require("../function/db");
const findmodel=async()=>{
    try{

        return query(" SELECT METHODE_TEST_ID,DESCRIPTION FROM labo_methode_test  WHERE 1");
    }
    catch(error)
    {
        throw error

    }
}
module.exports={
    findmodel
}