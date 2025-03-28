const express = require('express');
const cors = require('cors');
const axios = require('axios');

const app = express();
const PORT = process.env.PORT || 8000;

// Middleware
app.use(cors({
  origin: ['http://localhost:3000', 'http://127.0.0.1:3000'],
  methods: ['GET', 'POST'],
  allowedHeaders: ['Content-Type']
}));
app.use(express.json());

// Logging middleware for debugging
app.use((req, res, next) => {
  console.log(`Received ${req.method} request to ${req.path}`);
  next();
});

// API endpoint to fetch random quote
app.get('/api/quote', async (req, res) => {
  console.log('Fetching a quote...');
  try {
    const response = await axios.get('https://zenquotes.io/api/random');
    console.log('API Response:', response.data); // ✅ Log the full response

    const quoteData = response.data[0]; // Since zenquotes.io returns an array

    console.log('Quote Data:', quoteData); // ✅ Log the quote data

    // Send the correct response to frontend
    res.json({
      quote: quoteData.q,   // q = quote text
      author: quoteData.a,  // a = author
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    console.error('API Error:', error.message);
    res.status(500).json({
      message: 'Internal server error',
      error: error.message,
    });
  }
});


app.get('/', (req, res) => {
  res.send('Server is running! Try /api/quote');
});


// Start the server
app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server running on http://localhost:${PORT}`);
});