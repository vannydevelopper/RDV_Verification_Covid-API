const {query}=require("../function/db");
const findTest=async(METHODE_TEST_ID)=>{
    try{

        return query("SELECT * FROM labo_type_tests WHERE 1 AND METHODE_TEST_ID=?",[METHODE_TEST_ID]);
    }
    catch(error)
    {
        throw error

    }
}
module.exports={
    findTest
}