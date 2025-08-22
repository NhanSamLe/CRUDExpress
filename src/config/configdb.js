import {Model, Sequelizerc} from "sequelize";
require('dotenv').config();
const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASS, {
  host: process.env.DB_HOST,
  dialect: "mysql",
  logging: false
});
 
let connectDB = async () => {
    try{
        await  sequelize.authenticate();
        console.log("Connection to the database has been established successfully.");
    }
    catch(err)
    {
        console.error("Unable to connect to the database:", err);
    }
}

module.exports = connectDB; 