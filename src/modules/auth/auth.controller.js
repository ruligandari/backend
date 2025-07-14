const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const UserModel = require('../../models/user.model');

exports.login = async (req, res) => {
  const { email, username, password, role } = req.body;

  try {
    let user;
    if (role === 'admin') {
      user = await UserModel.findAdminByUsername(username);
    } else if (role === 'karyawan') {
      user = await UserModel.findKaryawanByEmail(email);
    } else {
      return res.status(400).json({ message: 'Role tidak valid' });
    }

    if (!user) return res.status(404).json({ message: 'Email tidak ditemukan' });

    const match = await bcrypt.compare(password, user.password);
    if (!match) return res.status(401).json({ message: 'Password salah' });

    const payload = {
      id: user.id,
      email: user.email ?? null,
      username: user.username ?? null,
      role,
      nama: role === 'admin' ? user.username : user.nama,
    };

    const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1d' });

    res.json({ token, user: payload });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Terjadi kesalahan saat login' });
  }
};
