const Sequelize = require('sequelize');
const db = require('../db');

const Orders = db.define('order',{
    pending: {
        type: Sequelize.BOOLEAN,
        defaultValue: true
    }

})

module.exports = Orders