const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    productId: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
    quantity: { type: Number, required: true },
    status: { type: String, enum: ['pending', 'delivered', 'cancelled'], default: 'pending' },
    area: { type: String, required: true },
    orderDate: { type: Date, default: Date.now },
    deliveryDate: { type: Date }
});

module.exports = mongoose.model('Order', orderSchema);