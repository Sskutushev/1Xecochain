// server/server.js
// 
// PURPOSE: Main backend server entry point
// RESPONSIBILITY: Sets up Express server, connects to database, defines API routes
// IMPLEMENTS: Backend API as specified in design system
// 
// KEY FEATURES:
// - Express.js server setup
// - CORS configuration
// - MongoDB connection via Mongoose
// - API routes for tokens, users, and wallet operations
// - JWT-based authentication
// - Web3 integration
// 
// SPECIFICATION COMPLIANCE:
// - RESTful API endpoints
// - Proper response formats
// - Error handling

const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/ecochain', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('MongoDB connected'))
.catch(err => console.log('MongoDB connection error:', err));

// Import routes
const tokenRoutes = require('./routes/tokens');
const userRoutes = require('./routes/users');
const walletRoutes = require('./routes/wallet');

// API routes
app.use('/api/tokens', tokenRoutes);
app.use('/api/users', userRoutes);
app.use('/api/wallet', walletRoutes);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Something went wrong!' });
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

module.exports = app;