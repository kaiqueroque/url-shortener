const Sequelize = require('sequelize');
const database = require('../db/db');

const User = database.define('users', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    name: {
        type: Sequelize.STRING(255),
        allowNull: false
    },
    username: {
        type: Sequelize.STRING(50),
        allowNull: false,
        unique: true
    },
    email: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true
    },
    password: {
        type: Sequelize.STRING,
        get() {
            return() => this.getDataValue('password')
        }
    },
    salt: {
        type: Sequelize.STRING,
        get() {
            return() => this.getDataValue('salt')
        }
    }

})


module.exports = User;