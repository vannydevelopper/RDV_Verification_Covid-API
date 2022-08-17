const mysql = require("mysql");
const util = require("util");

const connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "covid_prod_2",
});


connection.connect((error) => {
    if (error) throw error;
    console.log("Successfully connected to the database  ! ");
});
const query = util.promisify(connection.query).bind(connection);

module.exports =
{
    connection,
    query,
};