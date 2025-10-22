// server/controllers/wallet.js
// 
// PURPOSE: Wallet-related controller functions
// RESPONSIBILITY: Handles all wallet-related API requests
// IMPLEMENTS: Wallet API endpoints from specification
// 
// FUNCTIONS:
// - connectWallet: Connects a wallet to the platform
// - disconnectWallet: Disconnects a wallet
// - getWalletInfo: Gets wallet information
// - addLiquidity: Adds liquidity to a token pool
// - buyToken: Buys a specific token
// - sellToken: Sells a specific token

const Wallet = require('../models/Wallet');
const User = require('../models/User');
const Token = require('../models/Token');
const Transaction = require('../models/Transaction');

// @desc    Connect a wallet
// @route   POST /api/wallet/connect
// @access  Private
const connectWallet = async (req, res) => {
  try {
    // In a real app, this would verify the wallet signature
    const { address, publicKey } = req.body;
    
    if (!address || !publicKey) {
      return res.status(400).json({
        success: false,
        message: 'Wallet address and public key are required'
      });
    }
    
    // Check if wallet already exists
    let wallet = await Wallet.findOne({ address: address.toLowerCase() });
    
    if (wallet) {
      // If wallet exists, update its connection status
      wallet.isConnected = true;
      await wallet.save();
    } else {
      // Create new wallet if it doesn't exist
      wallet = new Wallet({
        user: req.user._id, // From authentication middleware
        address: address.toLowerCase(),
        publicKey
      });
      await wallet.save();
      
      // Update user with wallet info
      await User.findByIdAndUpdate(req.user._id, {
        address: address.toLowerCase(),
        name: `Wallet_${address.substring(0, 6)}...${address.substring(address.length - 4)}`
      });
    }
    
    res.json({
      success: true,
      message: 'Wallet connected successfully',
      data: {
        address: wallet.address,
        isConnected: wallet.isConnected
      }
    });
  } catch (error) {
    console.error('Error connecting wallet:', error);
    res.status(500).json({
      success: false,
      message: 'Server Error'
    });
  }
};

// @desc    Disconnect wallet
// @route   POST /api/wallet/disconnect
// @access  Private
const disconnectWallet = async (req, res) => {
  try {
    // Find wallet by user and update connection status
    const wallet = await Wallet.findOne({ user: req.user._id });
    
    if (!wallet) {
      return res.status(404).json({
        success: false,
        message: 'Wallet not found'
      });
    }
    
    wallet.isConnected = false;
    await wallet.save();
    
    res.json({
      success: true,
      message: 'Wallet disconnected successfully',
      data: {
        address: wallet.address,
        isConnected: wallet.isConnected
      }
    });
  } catch (error) {
    console.error('Error disconnecting wallet:', error);
    res.status(500).json({
      success: false,
      message: 'Server Error'
    });
  }
};

// @desc    Get wallet info
// @route   GET /api/wallet
// @access  Private
const getWalletInfo = async (req, res) => {
  try {
    const wallet = await Wallet.findOne({ user: req.user._id })
      .populate('user', 'name address balance');
    
    if (!wallet) {
      return res.status(404).json({
        success: false,
        message: 'Wallet not found'
      });
    }
    
    res.json({
      success: true,
      data: {
        address: wallet.address,
        publicKey: wallet.publicKey,
        balance: wallet.balance,
        isConnected: wallet.isConnected,
        user: wallet.user
      }
    });
  } catch (error) {
    console.error('Error fetching wallet info:', error);
    res.status(500).json({
      success: false,
      message: 'Server Error'
    });
  }
};

// @desc    Add liquidity to a token
// @route   POST /api/wallet/add-liquidity
// @access  Private
const addLiquidity = async (req, res) => {
  try {
    const { tokenId, x1Amount, nktAmount, tokenPriceUSD, tokenPriceX1 } = req.body;
    
    // Validate required fields
    if (!tokenId || !x1Amount || !nktAmount || !tokenPriceUSD || !tokenPriceX1) {
      return res.status(400).json({
        success: false,
        message: 'All fields are required'
      });
    }
    
    // Verify token exists
    const token = await Token.findById(tokenId);
    if (!token) {
      return res.status(404).json({
        success: false,
        message: 'Token not found'
      });
    }
    
    // In a real app, we would:
    // 1. Verify the user has enough tokens for liquidity
    // 2. Interact with the smart contract to add liquidity
    // 3. Record the transaction on the blockchain
    // 4. Update balances in the database
    
    // For this demo, we'll just return success
    res.json({
      success: true,
      message: 'Liquidity added successfully',
      data: {
        transactionHash: `0x${Math.random().toString(36).substring(2, 15)}${Math.random().toString(36).substring(2, 15)}`,
        x1Amount,
        nktAmount,
        tokenPriceUSD,
        tokenPriceX1
      }
    });
  } catch (error) {
    console.error('Error adding liquidity:', error);
    res.status(500).json({
      success: false,
      message: 'Server Error'
    });
  }
};

// @desc    Buy a token
// @route   POST /api/wallet/buy
// @access  Private
const buyToken = async (req, res) => {
  try {
    const { tokenId, amount } = req.body;
    
    // Validate required fields
    if (!tokenId || !amount) {
      return res.status(400).json({
        success: false,
        message: 'Token ID and amount are required'
      });
    }
    
    if (amount <= 0) {
      return res.status(400).json({
        success: false,
        message: 'Amount must be greater than 0'
      });
    }
    
    // Verify token exists
    const token = await Token.findById(tokenId);
    if (!token) {
      return res.status(404).json({
        success: false,
        message: 'Token not found'
      });
    }
    
    // In a real app, we would:
    // 1. Verify the user has enough balance
    // 2. Calculate the total cost based on token price
    // 3. Execute the transaction on the blockchain
    // 4. Update user's token holdings
    // 5. Record the transaction
    
    // Create a mock transaction
    const transaction = new Transaction({
      from: req.user.address, // Mock user address
      to: token.contractAddress,
      token: tokenId,
      amount: parseFloat(amount),
      transactionHash: `0x${Math.random().toString(36).substring(2, 15)}${Math.random().toString(36).substring(2, 15)}`,
      status: 'confirmed',
      type: 'buy',
      fee: 0.001 // Mock fee
    });
    
    await transaction.save();
    
    // Update token holders count
    token.holders += 1;
    await token.save();
    
    res.json({
      success: true,
      message: 'Token purchased successfully',
      data: {
        transactionHash: transaction.transactionHash,
        amount: parseFloat(amount),
        token: token.symbol
      }
    });
  } catch (error) {
    console.error('Error buying token:', error);
    res.status(500).json({
      success: false,
      message: 'Server Error'
    });
  }
};

// @desc    Sell a token
// @route   POST /api/wallet/sell
// @access  Private
const sellToken = async (req, res) => {
  try {
    const { tokenId, amount } = req.body;
    
    // Validate required fields
    if (!tokenId || !amount) {
      return res.status(400).json({
        success: false,
        message: 'Token ID and amount are required'
      });
    }
    
    if (amount <= 0) {
      return res.status(400).json({
        success: false,
        message: 'Amount must be greater than 0'
      });
    }
    
    // Verify token exists
    const token = await Token.findById(tokenId);
    if (!token) {
      return res.status(404).json({
        success: false,
        message: 'Token not found'
      });
    }
    
    // In a real app, we would:
    // 1. Verify the user owns enough of this token
    // 2. Calculate the total value based on token price
    // 3. Execute the transaction on the blockchain
    // 4. Update user's token holdings
    // 5. Record the transaction
    
    // Create a mock transaction
    const transaction = new Transaction({
      from: token.contractAddress,
      to: req.user.address, // Mock user address
      token: tokenId,
      amount: parseFloat(amount),
      transactionHash: `0x${Math.random().toString(36).substring(2, 15)}${Math.random().toString(36).substring(2, 15)}`,
      status: 'confirmed',
      type: 'sell',
      fee: 0.001 // Mock fee
    });
    
    await transaction.save();
    
    res.json({
      success: true,
      message: 'Token sold successfully',
      data: {
        transactionHash: transaction.transactionHash,
        amount: parseFloat(amount),
        token: token.symbol
      }
    });
  } catch (error) {
    console.error('Error selling token:', error);
    res.status(500).json({
      success: false,
      message: 'Server Error'
    });
  }
};

module.exports = {
  connectWallet,
  disconnectWallet,
  getWalletInfo,
  addLiquidity,
  buyToken,
  sellToken
};