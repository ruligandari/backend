const jwt = require('jsonwebtoken');

exports.verifyToken = (req, res, next) => {
  const authHeader = req.headers.authorization;

  // Cek apakah header Authorization ada dan formatnya Bearer
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ message: 'Token tidak ditemukan' });
  }

  const token = authHeader.split(' ')[1]; // Ambil token-nya saja

  try {
    // Verifikasi token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // Simpan data token ke req.user
    next(); // Lanjut ke controller
  } catch (err) {
    return res.status(403).json({ message: 'Token tidak valid atau kedaluwarsa' });
  }
};
