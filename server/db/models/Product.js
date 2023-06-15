const Sequelize = require('sequelize');
const db = require('../db')

 const Product = db.define('product',{
    name:{
        type: Sequelize.STRING,
        allowNull: false
    },

    price: {
        type: Sequelize.INTEGER,
        allowNull: false,
    },

    description: {
        type: Sequelize.TEXT
    },

    imageURL: {
        type: Sequelize.TEXT
    },

    category: {
        type: Sequelize.STRING
    }
});

// Methods//

Product.findByCategory = async function(categoryKey) {
    try {
        const products = await Product.findAll({
            where: {
                category: {
                    [Sequelize.Op.like]: `%${categoryKey}%`
                }
            }
        });
        return products;
    } catch (error) {
        console.error('Could not retrieve products', error);
        throw error;
    }
}

module.exports = Product
