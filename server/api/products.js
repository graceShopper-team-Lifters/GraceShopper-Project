const router = require('express').Router();
const { models: { Product } } = require('../db');

// GET /api/products
router.get('/', async (req, res, next) => {
   try {
      const products = await Product.findAll();
      res.json(products);
   } catch (err) {
      next(err);
   }
});

// GET /api/products/patience
router.get('/patience', async (req, res, next) => {
   try {
      const products = await Product.findAll({
         where: {
            category: 'Patience'
         }
      });
      res.json(products);
   } catch (err) {
      next(err);
   }
});

// GET /api/products/charisma
router.get('/charisma', async (req, res, next) => {
   try {
      const products = await Product.findAll({
         where: {
            category: 'Charisma'
         }
      });
      res.json(products);
   } catch (err) {
      next(err);
   }
});

// GET /api/products/attitude
router.get('/attitude', async (req, res, next) => {
   try {
      const products = await Product.findAll({
         where: {
            category: 'Attitude'
         }
      });
      res.json(products);
   } catch (err) {
      next(err);
   }
});

// GET /api/products/dicipline
router.get('/discipline', async (req, res, next) => {
   try {
      const products = await Product.findAll({
         where: {
            category: 'Discipline'
         }
      });
      res.json(products);
   } catch (err) {
      next(err);
   }
});

// GET /api/products/:id
router.get('/:id', async (req, res, next) => {
   try {
      const product = await Product.findByPk(req.params.id);
      if (product) {
         res.json(product);
      } else {
         res.status(404).json({ error: 'Product not found' });
      }
   } catch (err) {
      next(err);
   }
});

module.exports = router;