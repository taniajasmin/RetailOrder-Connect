const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    name: { type: String, required: true },
    company: { type: String, required: true },
    category: { type: String, required: true },
    status: { type: String, enum: ['active', 'inactive'], default: 'active' },
    price: { type: Number, required: true }
});

module.exports = mongoose.model('Product', productSchema);