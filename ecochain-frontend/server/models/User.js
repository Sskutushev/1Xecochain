// server/models/User.js
// 
// PURPOSE: User data model for MongoDB
// RESPONSIBILITY: Defines user schema and methods
// IMPLEMENTS: User specification from design system
// 
// FIELDS:
// - address: Wallet address (unique identifier)
// - name: Display name
// - balance: Token balance
// - avatar: Avatar image URL
// - isVerified: Verification status
// - tokensCreated: List of tokens created by user
// - tokensOwned: List of tokens owned by user

const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  address: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true
  },
  name: {
    type: String,
    required: true,
    trim: true
  },
  balance: {
    type: String,
    required: true,
    default: '0.00 USDT'
  },
  avatar: {
    type: String,
    default: null
  },
  isVerified: {
    type: Boolean,
    default: false
  },
  tokensCreated: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Token'
  }],
  tokensOwned: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Token',
    default: []
  }],
  createdAt: {
    type: Date,
    default: Date.now
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('User', userSchema);