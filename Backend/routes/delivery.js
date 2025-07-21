const express = require('express');
const Delivery = require('../models/Delivery');

const router = express.Router();

router.post('/', async (req, res) => {
    const { area, schedule, frequency } = req.body;
    try {
        const delivery = new Delivery({ area, schedule, frequency });
        await delivery.save();
        res.status(201).json(delivery);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

router.get('/', async (req, res) => {
    try {
        const deliveries = await Delivery.find();
        res.json(deliveries);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;