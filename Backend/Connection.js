let mongo = require("mongoose")
require("dotenv").config();
let db_url = process.env.DB


let mydb_connection = async function(){
    mongo.connect(db_url)
}

module.exports = mydb_connection;