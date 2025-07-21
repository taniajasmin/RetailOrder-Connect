const mongoose = require('mongoose');

const deliverySchema = new mongoose.Schema({
    area: { type: String, required: true },
    schedule: { type: String, required: true }, // e.g., "Sunday"
    frequency: { type: String, enum: ['weekly', 'biweekly'], default: 'weekly' }
});

module.exports = mongoose.model('Delivery', deliverySchema);