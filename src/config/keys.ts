require("dotenv").config()
export default {
    // dbUri: process.env.DB_URI,
    DBHOST: process.env.DBHOST,
    DBNAME: process.env.DBNAME,
    DBUSER: process.env.DBUSER,
    DBPASSWORD: process.env.DBPASSWORD,
    DBPORT: process.env.DBPORT
}