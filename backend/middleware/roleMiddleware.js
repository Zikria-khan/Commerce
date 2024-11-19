// middlewares/roleMiddleware.js

module.exports = function requireRole(role) {
    return (req, res, next) => {
      if (!req.user) {
        return res.status(401).json({ message: 'Unauthorized: No user logged in' });
      }
      if (req.user.role !== role) {
        return res.status(403).json({ message: 'Access forbidden: Insufficient permissions' });
      }
      next();
    };
  };
  