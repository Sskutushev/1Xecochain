// server/controllers/tokens.js
// 
// PURPOSE: Token-related controller functions
// RESPONSIBILITY: Handles all token-related API requests
// IMPLEMENTS: Token API endpoints from specification
// 
// FUNCTIONS:
// - getAllTokens: Gets all tokens with pagination
// - getTokenById: Gets a specific token by ID
// - createToken: Creates a new token
// - updateToken: Updates token information
// - deleteToken: Deletes a token
// - getTokensByUser: Gets tokens created by a specific user

const Token = require('../models/Token');
const User = require('../models/User');

// @desc    Get all tokens
// @route   GET /api/tokens
// @access  Public
const getAllTokens = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 15;
    const skip = (page - 1) * limit;
    
    // Build query object
    let query = {};
    
    // Add search functionality
    if (req.query.search) {
      query.$or = [
        { name: { $regex: req.query.search, $options: 'i' } },
        { symbol: { $regex: req.query.search, $options: 'i' } }
      ];
    }
    
    // Add sorting functionality
    const sortOptions = {};
    if (req.query.sortBy) {
      const sortField = req.query.sortBy;
      const sortOrder = req.query.sortOrder === 'asc' ? 1 : -1;
      sortOptions[sortField] = sortOrder;
    } else {
      sortOptions.createdAt = -1; // Default sort by newest
    }
    
    const tokens = await Token.find(query)
      .populate('createdBy', 'name address')
      .sort(sortOptions)
      .limit(limit)
      .skip(skip);
    
    const total = await Token.countDocuments(query);
    
    res.json({
      success: true,
      count: tokens.length,
      page,
      totalPages: Math.ceil(total / limit),
      data: tokens
    });
  } catch (error) {
    console.error('Error fetching tokens:', error);
    res.status(500).json({
      success: false,
      message: 'Server Error'
    });
  }
};

// @desc    Get token by ID
// @route   GET /api/tokens/:id
// @access  Public
const getTokenById = async (req, res) => {
  try {
    const token = await Token.findById(req.params.id)
      .populate('createdBy', 'name address');
    
    if (!token) {
      return res.status(404).json({
        success: false,
        message: 'Token not found'
      });
    }
    
    res.json({
      success: true,
      data: token
    });
  } catch (error) {
    console.error('Error fetching token:', error);
    res.status(500).json({
      success: false,
      message: 'Server Error'
    });
  }
};

// @desc    Create a new token
// @route   POST /api/tokens
// @access  Private
const createToken = async (req, res) => {
  try {
    // In a real app, req.user would be populated by authentication middleware
    const userId = req.user ? req.user._id : '6534...' // Mock user ID for demo
    
    const { name, symbol, imageUrl, description, totalSupply, circulatingSupply, decimals } = req.body;
    
    // Validate required fields
    if (!name || !symbol || !description || !totalSupply || !circulatingSupply) {
      return res.status(400).json({
        success: false,
        message: 'Please provide all required fields'
      });
    }
    
    // Check if token symbol already exists
    const existingToken = await Token.findOne({ symbol: symbol.toUpperCase() });
    if (existingToken) {
      return res.status(400).json({
        success: false,
        message: 'Token symbol already exists'
      });
    }
    
    // Generate a mock contract address for demo
    const contractAddress = `0x${Math.random().toString(36).substring(2, 15)}${Math.random().toString(36).substring(2, 15)}`;
    
    // Create new token
    const token = new Token({
      name,
      symbol: symbol.toUpperCase(),
      imageUrl: imageUrl || null,
      description,
      totalSupply: Number(totalSupply),
      circulatingSupply: Number(circulatingSupply),
      decimals: decimals || 18,
      createdBy: userId,
      contractAddress,
      price: 0, // Initial price
      marketCap: '$0', // Initial market cap
      volume: '$0', // Initial volume
      holders: 0 // Initial holders
    });
    
    const savedToken = await token.save();
    
    // Update user's tokensCreated array
    await User.findByIdAndUpdate(userId, {
      $push: { tokensCreated: savedToken._id }
    });
    
    res.status(201).json({
      success: true,
      data: savedToken
    });
  } catch (error) {
    console.error('Error creating token:', error);
    res.status(500).json({
      success: false,
      message: 'Server Error'
    });
  }
};

// @desc    Update a token
// @route   PUT /api/tokens/:id
// @access  Private
const updateToken = async (req, res) => {
  try {
    const token = await Token.findById(req.params.id);
    
    if (!token) {
      return res.status(404).json({
        success: false,
        message: 'Token not found'
      });
    }
    
    // In a real app, check if the user has permission to update the token
    // if (token.createdBy.toString() !== req.user._id.toString()) {
    //   return res.status(403).json({
    //     success: false,
    //     message: 'Not authorized to update this token'
    //   });
    // }
    
    const updatedToken = await Token.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true
      }
    );
    
    res.json({
      success: true,
      data: updatedToken
    });
  } catch (error) {
    console.error('Error updating token:', error);
    res.status(500).json({
      success: false,
      message: 'Server Error'
    });
  }
};

// @desc    Delete a token
// @route   DELETE /api/tokens/:id
// @access  Private
const deleteToken = async (req, res) => {
  try {
    const token = await Token.findById(req.params.id);
    
    if (!token) {
      return res.status(404).json({
        success: false,
        message: 'Token not found'
      });
    }
    
    // In a real app, check if the user has permission to delete the token
    // if (token.createdBy.toString() !== req.user._id.toString()) {
    //   return res.status(403).json({
    //     success: false,
    //     message: 'Not authorized to delete this token'
    //   });
    // }
    
    await Token.findByIdAndDelete(req.params.id);
    
    res.json({
      success: true,
      message: 'Token deleted'
    });
  } catch (error) {
    console.error('Error deleting token:', error);
    res.status(500).json({
      success: false,
      message: 'Server Error'
    });
  }
};

// @desc    Get tokens by user
// @route   GET /api/tokens/user/:userId
// @access  Public
const getTokensByUser = async (req, res) => {
  try {
    const tokens = await Token.find({ createdBy: req.params.userId })
      .sort({ createdAt: -1 });
    
    res.json({
      success: true,
      count: tokens.length,
      data: tokens
    });
  } catch (error) {
    console.error('Error fetching user tokens:', error);
    res.status(500).json({
      success: false,
      message: 'Server Error'
    });
  }
};

module.exports = {
  getAllTokens,
  getTokenById,
  createToken,
  updateToken,
  deleteToken,
  getTokensByUser
};