require('dotenv').config();
const Sequelize = require("sequelize");

const sequelize = new Sequelize(process.env.NAME_DATABASE, process.env.USER_DATABASE, process.env.PASSWORD_DATABASE, {
    dialect: process.env.DIALECT_DATABASE,
    host: process.env.URL_DATABASE,
    port: process.env.PORT_DATABASE
})

module.exports = sequelize;