//this is the access point for all things database related!

const db = require('./db')
const User = require('./models/User')
const Product = require('./models/Product');
const Review = require('./models/Review')
const Orders = require('./models/Orders');
const Order_items = require('./models/Order_items');

//------------------------------------------------>
User.hasMany(Orders);
Orders.belongsTo(User);

Orders.hasMany(Order_items);
Order_items.belongsTo(Orders);

Product.hasMany(Review);
Review.belongsTo(Product);

Order_items.belongsTo(Product);
Product.hasMany(Order_items);

module.exports = {
  db,
  models: {
    User,
    Product,
    Review,
    Orders,
    Order_items
  },
}
