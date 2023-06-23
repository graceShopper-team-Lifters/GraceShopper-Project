const router = require('express').Router();
const { json } = require('sequelize');
const { models: { User, Orders, Order_items, Product } } = require('../db');

// GET /api/cart
router.get('/', async (req, res, next) => {
   try {
      const user = await User.findOne({
         where: {
            username: req.query.username
         }
      });

      const openOrder = await Orders.findOne({
         where: {
            userId: user.id,
            pending: true
         },
         include: {
            model: Order_items,
            include: Product
         }
      });

      if (openOrder) {
         const cartItems = await Order_items.findAll( {
            where: {
               orderId: openOrder.id
            }
         });

         res.status(200).json(cartItems)
      } else {
         res.status(200).json([])
      }
   } catch (err) {
      next(err)
   }
});

// POST /api/cart
router.post('/', async (req, res, next) => {
   try {
      const productId = req.body.productId;
      const username = req.body.username;
      let order;
      let orderItem;

      const user = await User.findOne({
         where: {
            username: username
         }
      });

      // Check if the user already has an open order
      const openOrder = await Orders.findOne({
         where: {
            userId: user.id,
            pending: true
         }
      });

      if (openOrder) {
         order = openOrder;
      } else {
         order = await Orders.create({
            userId: user.id,
            pending: true
         });
      }
      
      // Check if the product is already in the order_items table
      const existingItem = await Order_items.findOne({
         where: {
            orderId: order.id,
            productId: productId
         }
      });
      
      if (existingItem) {
         // Update the quantity of the existing Order_item
         existingItem.quantity += 1;
         existingItem.total = existingItem.quantity * existingItem.price;
         await existingItem.save();
         orderItem = existingItem;
         res.status(201).json(orderItem);
      } else {
         const product = await Product.findByPk(productId)
         // Create a new Order_item associated with the product and the order
         orderItem = await Order_items.create({
            name: product.name,
            price: product.price,
            quantity: 1,
            total: product.price,
            orderId: order.id,
            productId: product.id,
         });
         res.status(201).json(orderItem);
      }

      
   } catch (err) {
      next(err);
   }
});

// PUT /api/cart/:orderId
router.put('/:orderId', async (req, res, next) => {
   try {
      const { orderId } = req.params
      const { username, productId, quantity } = req.body

      const user = await User.findOne({
         where: {
            username: username
         }
      });

      const order = await Orders.findOne({
         where: {
            id: orderId,
            userId: user.id
         }
      });

      // Find the order item to update
      const orderItem = await Order_items.findOne({
         where: {
            orderId: order.id,
            productId: productId
         }
      });

      // Delete order item if amount is updated to zero
      if (quantity === 0) {
         const orderItemId = orderItem.id;
         await orderItem.destroy();
         res.status(201).json(orderItemId);
      }

      orderItem.quantity = quantity;
      orderItem.total = orderItem.quantity * orderItem.price;
      await orderItem.save();

      res.status(201).json(orderItem);
   } catch (err) {
      next(err);
   }
});

// DELETE ITEM
// DELETE /api/cart/:itemId
router.delete('/:itemId', async (req, res, next) => {
   try {
      const itemId = req.params.itemId;
      const { username, productId } = req.query;

      const user = await User.findOne({
         where: {
            username: username
         }
      });

      // Find the order of the item to be deleted
      const order = await Orders.findOne({
         where: {
            userId: user.id,
            pending: true
         }
      });

      if (order) {
         // Remove the product from the order_items table
         await Order_items.destroy({
            where: {
               id: itemId,
               orderId: order.id,
               productId: productId
            }
         });

         const orderItems = await Order_items.findAll({
            where: {
               orderId: order.id
            }
         });

         if (!orderItems || orderItems.length === 0)  {
            await order.destroy()
         }
      }

      res.sendStatus(204);
   } catch (err) {
      next(err);
   }
});

// CLEAR CART
// DELETE /api/cart/clear/:orderId
router.delete('/clear/:orderId', async (req, res, next) => {
   try {
      const orderId = req.params.orderId;
      const { username } = req.query;

      const user = await User.findOne({
         where: {
            username: username
         }
      });

      const order = await Orders.findOne({
         where: {
            id: orderId,
            userId: user.id,
            pending: true
         }
      });

      await order.destroy()

      await Order_items.destroy({
         where: {
            orderId: null,
         }
      });

      res.sendStatus(204);
   } catch (err) {
      next(err);
   }
});

//CHECKOUT
// POST /api/cart/checkout
router.post("/checkout", async (req, res, next) => {
   try {
      const { orderId, username } = req.body;

      const user = await User.findOne({
         where: {
            username: username
         }
      });

      const order = await Orders.findOne({
         where: {
            id: orderId,
            userId: user.id,
            pending: true
         }
      });

      order.pending = false

      await order.save();

      const boughtItems = await Order_items.findAll({
         where: {
            orderId: orderId
         }
      })

      res.status(200).json(boughtItems);
   } catch (err) {
      next(err);
   }
});

module.exports = router;