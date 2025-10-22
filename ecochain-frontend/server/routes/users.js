// server/routes/users.js
// 
// PURPOSE: User-related API routes
// RESPONSIBILITY: Defines all user API endpoints
// IMPLEMENTS: User API routes from specification
// 
// ENDPOINTS:
// - GET /:id: Get a specific user
// - PUT /:id: Update a user
// - DELETE /:id: Delete a user
// - POST /:id/portfolio: Add token to portfolio
// - DELETE /:id/portfolio/:tokenId: Remove token from portfolio
// - GET /:id/portfolio: Get user's portfolio

const express = require('express');
const router = express.Router();
const { 
  getUserById,
  updateUser,
  deleteUser,
  addTokenToPortfolio,
  removeTokenFromPortfolio,
  getUserPortfolio
} = require('../controllers/users');

// Middleware for authentication would go here in a real app
// const { protect } = require('../middleware/auth');

router.route('/:id')
  .get(getUserById)
  .put(/* protect, */ updateUser) // Uncomment protect in production
  .delete(/* protect, */ deleteUser); // Uncomment protect in production

router.route('/:id/portfolio')
  .post(/* protect, */ addTokenToPortfolio) // Uncomment protect in production
  .get(getUserPortfolio);

router.route('/:id/portfolio/:tokenId')
  .delete(/* protect, */ removeTokenFromPortfolio); // Uncomment protect in production

module.exports = router;