const jwt = require('jsonwebtoken');
const User = require('../Models/userSchema');
const SECRET_KEY = process.env.JWT_SECRET || 'your_secret_key';

// Middleware to protect routes
const authenticateToken = async (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];

  if (!token) return res.status(401).json({ message: 'Access Denied' });

  try {
    const decoded = jwt.verify(token, SECRET_KEY);
    req.user = await User.findById(decoded.id).select('-password'); // Exclude password from req.user
    if (!req.user) return res.status(404).json({ message: 'User not found' });
    next();
  } catch (error) {
    return res.status(403).json({ message: 'Invalid token' });
  }
};

// Middleware to check admin role
const isAdmin = (req, res, next) => {
  if (req.user.role !== 'admin') {
    return res.status(403).json({ message: 'Admin access required' });
  }
  next();
};

module.exports = { authenticateToken, isAdmin };
