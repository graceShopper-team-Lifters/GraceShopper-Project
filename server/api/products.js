const router = require('express').Router()
const { models: { Product }} = require('../db')
module.exports = router

router.get('/', async(req, res, next) => {
    try {
        const products = await Product.findAll();
        res.send(products);
    } catch (error) {
        next(error)  
    }
})

router.get('/:category', async(req, res, next) => {
    try {
        const category = req.params.category

        const specifiedProducts = await Product.findAll({
            where:{category: category}
        });
        res.send(specifiedProducts);
    } catch (error) {
        next(error)
    }
})

