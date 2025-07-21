const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');
require('dotenv').config();

const authRoutes = require('./routes/auth');
const deliveryRoutes = require('./routes/delivery');
const orderRoutes = require('./routes/order');
const productRoutes = require('./routes/product');

// console.log('typeof authRoutes:', typeof authRoutes);
// console.log('authRoutes:', authRoutes);
// console.log('typeof deliveryRoutes:', typeof deliveryRoutes);
// console.log('deliveryRoutes:', deliveryRoutes);
// console.log('typeof orderRoutes:', typeof orderRoutes);
// console.log('orderRoutes:', orderRoutes);
// console.log('typeof productRoutes:', typeof productRoutes);
// console.log('productRoutes:', productRoutes);

const app = express();
connectDB();

app.use(cors());
app.use(express.json()); // To parse JSON bodies

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/delivery', deliveryRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/products', productRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));