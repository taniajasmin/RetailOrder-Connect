const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    role: { type: String, enum: ['distributor', 'retailer'], required: true },
    area: { type: String } // For retailers
});

module.exports = mongoose.model('User', userSchema);