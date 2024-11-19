const express = require('express');
const router = express.Router();
const { register, login, getProfile, updateProfile } = require('../controllers/userController');
const { authenticateToken, isAdmin } = require('../middleware/auth');

// Public routes
router.post('/register', register);
router.post('/login', login);

// Protected routes
router.get('/profile', authenticateToken, getProfile);
router.put('/profile', authenticateToken, updateProfile);

// Example of an admin-only route
router.get('/admin', authenticateToken, isAdmin, (req, res) => {
  res.json({ message: 'Admin access granted' });
});

module.exports = router;
