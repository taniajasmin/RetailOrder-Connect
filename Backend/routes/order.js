const express = require('express');
const Order = require('../models/Order');
const authMiddleware = require('../middleware/auth'); // Import

const router = express.Router();

router.post('/', authMiddleware, async (req, res) => {
    const { productId, quantity, area } = req.body;
    try {
        const order = new Order({
            userId: req.user.id, // Taken from decoded JWT
            productId,
            quantity,
            area
        });
        await order.save();
        res.status(201).json(order);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

module.exports = router;
