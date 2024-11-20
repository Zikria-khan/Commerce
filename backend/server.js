const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors'); // Import CORS package
const connectDB = require('./config/db'); // Import the MongoDB connection function
const fetch = require('node-fetch'); // Import node-fetch for making HTTP requests
const productRoutes = require('./routes/productRoutes');
const userRoutes = require('./routes/userRoutes');
const cartRoutes = require('./routes/cartRoutes');
const reportRoutes = require('./routes/reportRoutes');
const reviewRoutes = require('./routes/reviewRoutes');
const { v4: uuidv4 } = require('uuid');

// Initialize environment variables
dotenv.config();

// Initialize Express app
const app = express();

// Enable CORS for all origins
app.use(cors()); // This will allow requests from any origin

// Middleware
app.use(express.json()); // Parse JSON bodies

// JazzCash Payment Gateway Configuration
const JAZZCASH_MERCHANT_ID = process.env.JAZZCASH_MERCHANT_ID;
const JAZZCASH_API_URL = 'https://jazzcashapi.com/'; // Example URL for JazzCash (Replace with actual JazzCash endpoint)

// Endpoint to create JazzCash payment request
app.post('/create-jazzcash-payment', async (req, res) => {
  const { amount, phoneNumber, cartItems } = req.body;

  // Prepare JazzCash payment data (Replace with actual API data format required by JazzCash)
  const paymentData = {
    amount: amount, // Amount to be paid
    phoneNumber: phoneNumber, // Customer's phone number (needed for JazzCash)
    merchantId: JAZZCASH_MERCHANT_ID, // Your merchant ID
    cartItems: cartItems, // The cart items (sent from frontend)
    callbackUrl: `${req.headers.origin}/payment-callback`, // URL to return to after payment
    // Add more parameters as required by JazzCash API
  };

  try {
    // Sending the payment request using fetch
    const response = await fetch(`${JAZZCASH_API_URL}/payment`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json', // Specify content type as JSON
      },
      body: JSON.stringify(paymentData), // Send the payment data in the request body
    });

    const data = await response.json(); // Parse the JSON response

    if (data.success) {
      res.json({ success: true, paymentUrl: data.paymentUrl }); // Assuming JazzCash returns a payment URL
    } else {
      res.status(400).json({ success: false, message: 'Payment initiation failed' });
    }
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error creating payment' });
  }
});
app.post('/api/products', async (req, res) => {
  try {
      const product = req.body;

      // Ensure 'sku' is unique
      if (!product.sku) {
          product.sku = uuidv4();
      }

      const result = await db.collection('products').insertOne(product);
      res.status(201).json({ message: 'Product added successfully', result });
  } catch (error) {
      res.status(400).json({ message: 'Error adding product', error });
  }
});
// Route handling
app.use('/api', cartRoutes);
app.use('/api', productRoutes);
app.use('/api/users', userRoutes);
app.use('/api', reportRoutes);
app.use('/api', reviewRoutes);

// Health check route
app.get('/', (req, res) => {
  res.status(200).json({ status: 'ok I am flying' });
});

// Connect to MongoDB
connectDB();

// Start server
const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

module.exports = app;
