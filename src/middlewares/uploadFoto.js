const multer = require('multer');
const path = require('path');
const fs = require('fs');
const sharp = require('sharp');

// Simpan di public/uploads/foto
const destination = path.join(__dirname, '../../public/uploads/foto');

// Pastikan folder ada
if (!fs.existsSync(destination)) {
  fs.mkdirSync(destination, { recursive: true });
}

// Inisialisasi multer (tanpa penyimpanan ke disk)
const storage = multer.memoryStorage();
const upload = multer({
  storage,
  limits: { fileSize: 10 * 1024 * 1024 }, // max 10 MB
  fileFilter: (req, file, cb) => {
    const ext = path.extname(file.originalname).toLowerCase();
    if (!['.jpg', '.jpeg', '.png', '.webp'].includes(ext)) {
      return cb(new Error('Hanya file gambar (JPG, PNG, WEBP) yang diperbolehkan'));
    }
    cb(null, true);
  },
});

// Middleware untuk menyimpan gambar dan convert ke webp
const prosesFoto = async (req, res, next) => {
  if (!req.file) return next();

  const namaFile = `${Date.now()}-${Math.round(Math.random() * 1e9)}.webp`;
  const filePath = path.join(destination, namaFile);

  try {
    console.log('[DEBUG] File diterima:', req.file.originalname);
    console.log('[DEBUG] Buffer size:', req.file.buffer.length);
    console.log('[DEBUG] Menyimpan ke:', filePath);

    const info = await sharp(req.file.buffer)
      .resize(300)
      .webp({ quality: 80 })
      .toFile(filePath);

    console.log('[DEBUG] sharp info:', info);

    req.body.foto = `uploads/foto/${namaFile}`;
    next();
  } catch (err) {
    console.error('[ERROR] sharp gagal:', err.message);
    return res.status(500).json({ message: 'Gagal memproses foto', error: err.message });
  }
};


module.exports = [upload.single('foto'), prosesFoto];
