// server/routes/tokens.js
// 
// PURPOSE: Token-related API routes
// RESPONSIBILITY: Defines all token API endpoints
// IMPLEMENTS: Token API routes from specification
// 
// ENDPOINTS:
// - GET /: Get all tokens with pagination
// - GET /:id: Get a specific token
// - POST /: Create a new token
// - PUT /:id: Update a token
// - DELETE /:id: Delete a token
// - GET /user/:userId: Get tokens created by a specific user

const express = require('express');
const router = express.Router();
const { 
  getAllTokens, 
  getTokenById, 
  createToken, 
  updateToken, 
  deleteToken,
  getTokensByUser
} = require('../controllers/tokens');

// Middleware for authentication would go here in a real app
// const { protect } = require('../middleware/auth');

router.route('/')
  .get(getAllTokens)
  .post(/* protect, */ createToken); // Uncomment protect in production

router.route('/:id')
  .get(getTokenById)
  .put(/* protect, */ updateToken) // Uncomment protect in production
  .delete(/* protect, */ deleteToken); // Uncomment protect in production

router.route('/user/:userId')
  .get(getTokensByUser);

module.exports = router;