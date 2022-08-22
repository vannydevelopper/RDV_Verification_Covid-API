const {query}=require("../function/db");
const findTest=async()=>{
    try{

        return query(" SELECT TYPE_TEST_ID,DESCRIPTION FROM labo_type_tests WHERE 1");
    }
    catch(error)
    {
        throw error

    }
}
module.exports={
    findTest
}