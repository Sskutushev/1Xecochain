// server/models/Token.js
// 
// PURPOSE: Token data model for MongoDB
// RESPONSIBILITY: Defines token schema and methods
// IMPLEMENTS: Token specification from design system
// 
// FIELDS:
// - name: Token name
// - symbol: Token symbol (e.g. BTC, ETH)
// - imageUrl: URL for token image
// - price: Current price
// - marketCap: Market capitalization
// - volume: Trading volume
// - holders: Number of token holders
// - blockchain: Blockchain platform
// - createdBy: User who created token
// - createdAt: Creation timestamp
// - description: Token description
// - replies: Number of replies/comments
// - contractAddress: Smart contract address
// - totalSupply: Total token supply
// - circulatingSupply: Circulating token supply

const mongoose = require('mongoose');

const tokenSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  symbol: {
    type: String,
    required: true,
    uppercase: true,
    trim: true
  },
  imageUrl: {
    type: String,
    default: null
  },
  price: {
    type: Number,
    required: true,
    default: 0
  },
  marketCap: {
    type: String,
    required: true
  },
  volume: {
    type: String,
    required: true
  },
  holders: {
    type: Number,
    required: true,
    default: 0
  },
  blockchain: {
    type: String,
    required: true,
    default: 'X1'
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  description: {
    type: String,
    required: true,
    maxlength: 1000
  },
  replies: {
    type: Number,
    default: 0
  },
  contractAddress: {
    type: String,
    required: true,
    unique: true
  },
  totalSupply: {
    type: Number,
    required: true
  },
  circulatingSupply: {
    type: Number,
    required: true
  },
  decimals: {
    type: Number,
    default: 18
  },
  isVerified: {
    type: Boolean,
    default: false
  }
}, {
  timestamps: true // Adds createdAt and updatedAt fields
});

module.exports = mongoose.model('Token', tokenSchema);