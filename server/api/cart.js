const router = require('express').Router();
const { optimize } = require('webpack');
const { models: { Orders, Order_items, Product } } = require('../db');

// GET /api/cart
router.get('/', async (req, res, next) => {
   try {
      const openOrder = await Orders.findOne({
         where: {
            userId: req.user.id,
            pending: true
         },
         include: {
            model: Order_items,
            include: Product
         }
      });

      if (openOrder) {
         res.status(200).json(openOrder.Order_items)
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
      const { cartItems } = req.body;
      let order;
      // Check if the user already has an open order
      const openOrder = await Orders.findOne({
         where: {
            userId: req.user.id,
            pending: true
         }
      });

      if (openOrder) {
         order = openOrder
      } else {
         order = await Orders.create({
            userId: req.user.id,
            pending: true
         });
      }
      
      for (const item of cartItems) {
         // Check if the product is already in the order_items table
         const existingItem = await Order_items.findOne({
            where: {
               orderId: order.id,
               productId: item.id
            }
         });
         
         if (existingItem) {
            // Update the quantity of the existing Order_item
            existingItem.quantity += item.quantity;
            existingItem.total = existingItem.quantity * item.price;
            await existingItem.save();
         } else {
            // Create a new Order_item associated with the product and the order
            await Order_items.create({
               quantity: item.quantity,
               total: item.quantity * item.price,
               orderId: order.id,
               productId: item.id,
            });
         }
      }

      res.sendStatus(201);
   } catch (err) {
      next(err);
   }
});

// DELETE /api/cart/:productId
router.delete('/:productId', async (req, res, next) => {
   try {
      const productId = req.params.productId;
      // Find the order item to delete
      const order = await Orders.findOne({
         where: {
            userId: req.user.id,
            pending: true
         }
      });

      if (order) {
         // Remove the product from the order_items table
         await Order_items.destroy({
            where: {
               orderId: order.id,
               productId
            }
         });
      }

      res.sendStatus(204);
   } catch (err) {
      next(err);
   }
});

// PUT /api/cart/:orderItemId
router.put('/:orderItemId', async (req, res, next) => {
   try {
      const { orderItemId } = req.params;
      const { quantity } = req.body;
      // Find the order item to update
      const orderItem = await Order_items.findByPk(orderItemId);

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