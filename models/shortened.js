const Sequelize = require('sequelize');
const database = require('../db/db');

const Shortened = database.define('shortened', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    shortUrl: {
        type: Sequelize.STRING(50),
        allowNull: false,
        unique: true
    },
    longUrl: {
        type: Sequelize.STRING,
        allowNull: false
    },
    clicks: {
        type: Sequelize.INTEGER
    }

})


module.exports = Shortened;