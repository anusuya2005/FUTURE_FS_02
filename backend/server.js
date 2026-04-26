require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const https = require('https');

const app = express();

// CORS - only allow our frontend
app.use(cors({
  origin: [
    'http://localhost:5173',
    'https://future-fs-02-5ey2cmf75-anusuya2005s-projects.vercel.app/'
  ],
  credentials: true
}));

app.use(express.json());

// Routes
app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/leads', require('./routes/leadRoutes'));

// Test route
app.get('/', (req, res) => {
  res.send('Mini CRM Backend is Running! 🚀');
});

// Keep Render awake - pings every 14 minutes
const keepAlive = () => {
  setInterval(() => {
    https.get(
      'https://future-fs-02-backend-tcf7.onrender.com',
      (res) => {
        console.log(`🔄 Keep alive ping - Status: ${res.statusCode}`);
      }
    ).on('error', (err) => {
      console.log('⚠️ Keep alive error:', err.message);
    });
  }, 14 * 60 * 1000);
};

// Connect to MongoDB then start server
mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log('✅ MongoDB Connected');
    app.listen(process.env.PORT || 5000, () => {
      console.log(`✅ Server running on port ${process.env.PORT || 5000}`);
      keepAlive(); // Start keep alive after server starts
    });
  })
  .catch((err) => console.log('❌ DB Connection Error:', err));