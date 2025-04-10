const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');
const path = require('path');

// Load env variables
dotenv.config();

const app = express();

// Middleware
app.use(cors({
  origin:[ 'https://jewelery-visual-search-qb9k.vercel.app',
             'http://localhost:3000'
  ],
  credentials: true
}));
app.use(express.json());

// Serve static files
app.use('/dataset', express.static(path.join(__dirname, 'dataset')));
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Route imports
const searchRoutes = require('./routes/searchRoutes');
const authRoutes = require('./routes/authRoutes');
const adminRoutes = require('./routes/adminRoutes');

// API Routes
app.use('/api/search', searchRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/admin', adminRoutes);

// MongoDB Connection
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log("✅ MongoDB connected"))
.catch((err) => console.error("❌ MongoDB connection error:", err));

// Start server
const PORT = process.env.PORT || 10000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
