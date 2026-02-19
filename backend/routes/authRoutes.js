/**
 * Authentication Routes
 * Defines routes for authentication and password reset flow
 */

const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/authMiddleware');
const {
  signup,
  login,
  getProfile,
  forgotPassword,
  resetPassword,
  verifyResetToken,
} = require('../controllers/authController');

// POST /api/auth/signup - Register new user
router.post('/signup', signup);

// POST /api/auth/login - Login user
router.post('/login', login);

// GET /api/auth/profile - Get user profile (protected)
router.get('/profile', authMiddleware, getProfile);

// POST /api/auth/forgot-password - Request password reset
router.post('/forgot-password', forgotPassword);

// POST /api/auth/reset-password - Reset password with token
router.post('/reset-password', resetPassword);

// GET /api/auth/verify-token/:token - Verify reset token
router.get('/verify-token/:token', verifyResetToken);

module.exports = router;
