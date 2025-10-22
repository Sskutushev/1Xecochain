// server/models/Transaction.js
// 
// PURPOSE: Transaction data model for MongoDB
// RESPONSIBILITY: Defines transaction schema and methods
// IMPLEMENTS: Transaction specification from design system
// 
// FIELDS:
// - from: Sender wallet address
// - to: Recipient wallet address
// - token: Token being transferred
// - amount: Amount transferred
// - transactionHash: Blockchain transaction hash
// - status: Transaction status
// - type: Transaction type (buy, sell, transfer, etc.)
// - fee: Transaction fee

const mongoose = require('mongoose');

const transactionSchema = new mongoose.Schema({
  from: {
    type: String,
    required: true,
    lowercase: true,
    trim: true
  },
  to: {
    type: String,
    required: true,
    lowercase: true,
    trim: true
  },
  token: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Token',
    required: true
  },
  amount: {
    type: Number,
    required: true
  },
  transactionHash: {
    type: String,
    required: true,
    unique: true
  },
  status: {
    type: String,
    enum: ['pending', 'confirmed', 'failed'],
    default: 'pending'
  },
  type: {
    type: String,
    enum: ['buy', 'sell', 'transfer', 'create', 'liquidity'],
    required: true
  },
  fee: {
    type: Number,
    default: 0
  },
  timestamp: {
    type: Date,
    default: Date.now
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Transaction', transactionSchema);