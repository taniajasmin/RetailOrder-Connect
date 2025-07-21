const express = require('express');
const Product = require('../models/Product');

const router = express.Router();

router.post('/', async (req, res) => {
    const { name, company, category, price } = req.body;
    try {
        const product = new Product({ name, company, category, price });
        await product.save();
        res.status(201).json(product);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

router.put('/:id', async (req, res) => {
    const { status } = req.body;
    try {
        const product = await Product.findByIdAndUpdate(req.params.id, { status }, { new: true });
        res.json(product);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

router.get('/', async (req, res) => {
    try {
        const products = await Product.find();
        res.json(products);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;