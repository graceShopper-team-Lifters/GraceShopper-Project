const Sequelize = require('sequelize');
const db = require('../db');

const Order_items = db.define('order_items',{
    quantity: {
        type: Sequelize.INTEGER,
        defaultValue: 1
    },

    total: {
        type: Sequelize.INTEGER
    }
});

module.exports = Order_items;