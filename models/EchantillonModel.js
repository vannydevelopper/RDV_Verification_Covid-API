const {query}=require("../function/db");
const findType=async()=>{
    try{

        return query(" SELECT TYPE_ECHANTILLON_ID,	DESCRIPTION FROM labo_type_echantillon  WHERE 1");
    }
    catch(error)
    {
        throw error

    }
}
module.exports={
    findType
}