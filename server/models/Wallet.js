// server/models/Wallet.js
// 
// PURPOSE: Wallet data model for MongoDB
// RESPONSIBILITY: Defines wallet schema and methods
// IMPLEMENTS: Wallet specification from design system
// 
// FIELDS:
// - user: Reference to user
// - address: Wallet address
// - publicKey: Public key
// - encryptedPrivateKey: Encrypted private key
// - balance: Balance in various tokens
// - transactions: List of wallet transactions
// - isConnected: Connection status

const mongoose = require('mongoose');

const walletSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  address: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true
  },
  publicKey: {
    type: String,
    required: true
  },
  encryptedPrivateKey: {
    type: String,
    required: true
  },
  balance: {
    type: Map,
    of: Number,
    default: { 'USDT': 0 }
  },
  transactions: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Transaction'
  }],
  isConnected: {
    type: Boolean,
    default: false
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Wallet', walletSchema);