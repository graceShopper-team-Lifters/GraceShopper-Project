const router = require('express').Router();
const { models: { Orders, Order_items } } = require('../db');

// POST /api/orders
router.post('/', async (req, res, next) => {
   try {
      const { cartItems } = req.body;

      const  order = await Orders.create({ pending: true });

      for (const item of cartItems) {
         await Order_items.create({
            quantity: item.quantity,
            total: item.quantity * item.price,
            orderId: order.id,
            productId: item.id,
         });
      }

      res.sendStatus(201);
   } catch (err) {
      next(err);
   }
});

module.exports = router;