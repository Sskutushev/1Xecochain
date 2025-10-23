// server/controllers/users.js
// 
// PURPOSE: User-related controller functions
// RESPONSIBILITY: Handles all user-related API requests
// IMPLEMENTS: User API endpoints from specification
// 
// FUNCTIONS:
// - getUserById: Gets a specific user by ID
// - updateUser: Updates user information
// - deleteUser: Deletes a user
// - addTokenToPortfolio: Adds a token to user's portfolio
// - removeTokenFromPortfolio: Removes a token from user's portfolio

const User = require('../models/User');
const Token = require('../models/Token');

// @desc    Get user by ID
// @route   GET /api/users/:id
// @access  Public
const getUserById = async (req, res) => {
  try {
    const user = await User.findById(req.params.id)
      .select('-tokensCreated -tokensOwned'); // Don't return tokens in basic user info
    
    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }
    
    res.json({
      success: true,
      data: user
    });
  } catch (error) {
    console.error('Error fetching user:', error);
    res.status(500).json({
      success: false,
      message: 'Server Error'
    });
  }
};

// @desc    Update user
// @route   PUT /api/users/:id
// @access  Private
const updateUser = async (req, res) => {
  try {
    // In a real app, req.user would be populated by authentication middleware
    // if (req.user._id.toString() !== req.params.id) {
    //   return res.status(403).json({
    //     success: false,
    //     message: 'Not authorized to update this user'
    //   });
    // }
    
    const allowedUpdates = ['name', 'balance', 'avatar'];
    const updates = Object.keys(req.body);
    const isValidOperation = updates.every(update => allowedUpdates.includes(update));
    
    if (!isValidOperation) {
      return res.status(400).json({
        success: false,
        message: 'Invalid updates!'
      });
    }
    
    const user = await User.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true
      }
    );
    
    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }
    
    res.json({
      success: true,
      data: user
    });
  } catch (error) {
    console.error('Error updating user:', error);
    res.status(500).json({
      success: false,
      message: 'Server Error'
    });
  }
};

// @desc    Delete user
// @route   DELETE /api/users/:id
// @access  Private
const deleteUser = async (req, res) => {
  try {
    // In a real app, req.user would be populated by authentication middleware
    // if (req.user._id.toString() !== req.params.id) {
    //   return res.status(403).json({
    //     success: false,
    //     message: 'Not authorized to delete this user'
    //   });
    // }
    
    const user = await User.findById(req.params.id);
    
    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }
    
    await User.findByIdAndDelete(req.params.id);
    
    res.json({
      success: true,
      message: 'User deleted'
    });
  } catch (error) {
    console.error('Error deleting user:', error);
    res.status(500).json({
      success: false,
      message: 'Server Error'
    });
  }
};

// @desc    Add token to user's portfolio
// @route   POST /api/users/:id/portfolio
// @access  Private
const addTokenToPortfolio = async (req, res) => {
  try {
    const { tokenId } = req.body;
    
    // Validate token exists
    const token = await Token.findById(tokenId);
    if (!token) {
      return res.status(404).json({
        success: false,
        message: 'Token not found'
      });
    }
    
    // In a real app, req.user would be populated by authentication middleware
    // if (req.user._id.toString() !== req.params.id) {
    //   return res.status(403).json({
    //     success: false,
    //     message: 'Not authorized to modify this user portfolio'
    //   });
    // }
    
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }
    
    // Check if token is already in portfolio
    if (user.tokensOwned.includes(tokenId)) {
      return res.status(400).json({
        success: false,
        message: 'Token already in portfolio'
      });
    }
    
    // Add token to user's portfolio
    user.tokensOwned.push(tokenId);
    await user.save();
    
    res.json({
      success: true,
      message: 'Token added to portfolio',
      data: user
    });
  } catch (error) {
    console.error('Error adding token to portfolio:', error);
    res.status(500).json({
      success: false,
      message: 'Server Error'
    });
  }
};

// @desc    Remove token from user's portfolio
// @route   DELETE /api/users/:id/portfolio/:tokenId
// @access  Private
const removeTokenFromPortfolio = async (req, res) => {
  try {
    // In a real app, req.user would be populated by authentication middleware
    // if (req.user._id.toString() !== req.params.id) {
    //   return res.status(403).json({
    //     success: false,
    //     message: 'Not authorized to modify this user portfolio'
    //   });
    // }
    
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }
    
    // Remove token from user's portfolio
    user.tokensOwned = user.tokensOwned.filter(tokenId => 
      tokenId.toString() !== req.params.tokenId
    );
    await user.save();
    
    res.json({
      success: true,
      message: 'Token removed from portfolio',
      data: user
    });
  } catch (error) {
    console.error('Error removing token from portfolio:', error);
    res.status(500).json({
      success: false,
      message: 'Server Error'
    });
  }
};

// @desc    Get user's portfolio tokens
// @route   GET /api/users/:id/portfolio
// @access  Public
const getUserPortfolio = async (req, res) => {
  try {
    const user = await User.findById(req.params.id)
      .populate('tokensOwned', 'name symbol price imageUrl marketCap volume holders blockchain createdAt description replies');
    
    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }
    
    res.json({
      success: true,
      count: user.tokensOwned.length,
      data: user.tokensOwned
    });
  } catch (error) {
    console.error('Error fetching user portfolio:', error);
    res.status(500).json({
      success: false,
      message: 'Server Error'
    });
  }
};

module.exports = {
  getUserById,
  updateUser,
  deleteUser,
  addTokenToPortfolio,
  removeTokenFromPortfolio,
  getUserPortfolio
};