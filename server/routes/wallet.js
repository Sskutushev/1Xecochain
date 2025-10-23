// server/routes/wallet.js
// 
// PURPOSE: Wallet-related API routes
// RESPONSIBILITY: Defines all wallet API endpoints
// IMPLEMENTS: Wallet API routes from specification
// 
// ENDPOINTS:
// - POST /connect: Connect wallet
// - POST /disconnect: Disconnect wallet
// - GET /: Get wallet info
// - POST /add-liquidity: Add liquidity
// - POST /buy: Buy token
// - POST /sell: Sell token

const express = require('express');
const router = express.Router();
const { 
  connectWallet,
  disconnectWallet,
  getWalletInfo,
  addLiquidity,
  buyToken,
  sellToken
} = require('../controllers/wallet');

// Middleware for authentication would go here in a real app
// const { protect } = require('../middleware/auth');

router.route('/connect')
  .post(/* protect, */ connectWallet); // Uncomment protect in production

router.route('/disconnect')
  .post(/* protect, */ disconnectWallet); // Uncomment protect in production

router.route('/')
  .get(/* protect, */ getWalletInfo); // Uncomment protect in production

router.route('/add-liquidity')
  .post(/* protect, */ addLiquidity); // Uncomment protect in production

router.route('/buy')
  .post(/* protect, */ buyToken); // Uncomment protect in production

router.route('/sell')
  .post(/* protect, */ sellToken); // Uncomment protect in production

module.exports = router;