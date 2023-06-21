const router = require('express').Router();
const { optimize } = require('webpack');
const { models: { Orders, Order_items, Product } } = require('../db');

// GET /api/cart
router.get('/', async (req, res, next) => {
   try {
      const openOrder = await Orders.findOne({
         where: {
            userId: req.userId,
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
})

// POST /api/cart
router.post('/', async (req, res, next) => {
   try {
      const { product } = req.product;
      const { userId } = req.userId;
      let order;
      let orderItem;
      // Check if the user already has an open order
      const openOrder = await Orders.findOne({
         where: {
            userId: userId,
            pending: true
         }
      });

      if (openOrder) {
         order = openOrder
      } else {
         order = await Orders.create({
            userId: userId,
            pending: true
         });
      }
      
      // Check if the product is already in the order_items table
      const existingItem = await Order_items.findOne({
         where: {
            orderId: order.id,
            productId: product.id
         }
      });
      
      if (existingItem) {
         // Update the quantity of the existing Order_item
         existingItem.quantity += 1;
         existingItem.total = existingItem.quantity * product.price;
         await existingItem.save();
         orderItem = existingItem;
      } else {
         // Create a new Order_item associated with the product and the order
         orderItem = await Order_items.create({
            quantity: 1,
            total: product.price,
            orderId: order.id,
            productId: product.id,
         });
      }

      res.sendStatus(201).json(orderItem);
   } catch (err) {
      next(err);
   }
});

// DELETE /api/cart/:orderItemId
router.delete('/:orderItemId', async (req, res, next) => {
   try {
      const orderItemId = req.params.orderItemId;
      // Find the order item to delete
      const order = await Orders.findOne({
         where: {
            userId: req.userId,
            pending: true
         }
      });

      if (order) {
         // Remove the product from the order_items table
         await Order_items.destroy({
            where: {
               orderId: order.id,
               id: orderItemId
            }
         });
      }

      res.sendStatus(204).end();
   } catch (err) {
      next(err);
   }
});

// PUT /api/cart/:orderId
router.put('/:orderId', async (req, res, next) => {
   try {
      const { orderId } = req.params;
      const { quantity } = req.body;
      // Find the order item to update
      const orderItem = await Order_items.findByPk(orderId);

      if (orderItem) {
         orderItem.quantity = quantity;
         orderItem.total = quantity * orderItem.price;
         await orderItem.save();
      }

      res.sendStatus(204);
   } catch (err) {
      next(err);
   }
});

module.exports = router;