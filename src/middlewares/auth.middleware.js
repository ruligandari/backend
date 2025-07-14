// src/middlewares/auth.middleware.js

exports.requireRole = (allowedRoles) => (req, res, next) => {
  const { role } = req.user;
  if (!allowedRoles.includes(role)) {
    return res.status(403).json({ message: 'Akses ditolak' });
  }
  next();
};
