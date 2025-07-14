const {
  getAllKaryawan,
  getKaryawanById,
  createKaryawan,
  updateKaryawan,
  deleteKaryawan,
} = require('../../models/karyawan.model');
const generateNoKaryawan = require('../../utils/generateNoKaryawan');
const { createKaryawanSchema } = require('../../validations/karyawanValidation');
const { success, error } = require('../../utils/response');
// prisma client
const prisma = require('../../prisma');

// GET /api/karyawan?page=1&limit=10&search=&id_divisi=
exports.getKaryawanList = async (req, res) => {
  try {
    const { page, limit, search, id_divisi } = req.query;
    const result = await getAllKaryawan({ page, limit, search, id_divisi });
    return success(res, result, 'Data karyawan berhasil diambil');
  } catch (err) {
    console.error(err);
    return error(res, 'Gagal mengambil data karyawan', 500);
  }
};

// GET /api/karyawan/:id
exports.getKaryawanById = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await getKaryawanById(id);
    if (!result) return error(res, 'Karyawan tidak ditemukan', 404);
    return success(res, result, 'Detail karyawan berhasil diambil');
  } catch (err) {
    console.error(err);
    return error(res, 'Gagal mengambil detail karyawan', 500);
  }
};

// POST /api/karyawan
exports.createKaryawan = async (req, res) => {
  try {
    await createKaryawanSchema.validate(req.body, { abortEarly: false });

     // Validasi manual file foto
    if (!req.file) {
      return error(res, 'Foto wajib diunggah', 400);
    }

    if (req.body.id_divisi) {
  req.body.id_divisi = parseInt(req.body.id_divisi);
}

    const existing = await prisma.karyawan.findUnique({
      where: { email: req.body.email },
    });

    if (existing) {
      return error(res, 'Email sudah digunakan', 400);
    }

    const no_karyawan = await generateNoKaryawan();

    // Ambil path foto jika ada
    const fotoPath = req.body.foto || null;

    const newKaryawan = await prisma.karyawan.create({
      data: {
        ...req.body,
        no_karyawan,
        foto: fotoPath,
        created_at: new Date(),
        updated_at: new Date(),
      },
    });

    return success(res, newKaryawan, 'Karyawan berhasil dibuat');
  } catch (err) {
    if (err.name === 'ValidationError') {
      return error(res, err.errors.join(', '), 400);
    }

    console.error(err);
    return error(res, 'Gagal membuat karyawan', 500);
  }
};



// PUT /api/karyawan/:id
exports.updateKaryawan = async (req, res) => {
  try {
    const { id } = req.params;
    const data = req.body;
    const result = await updateKaryawan(id, data);
    return success(res, result, 'Karyawan berhasil diperbarui');
  } catch (err) {
    console.error(err);
    return error(res, 'Gagal memperbarui karyawan', 500);
  }
};

// DELETE /api/karyawan/:id
exports.deleteKaryawan = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await deleteKaryawan(id);
    return success(res, result, 'Karyawan berhasil dihapus');
  } catch (err) {
    console.error(err);
    return error(res, 'Gagal menghapus karyawan', 500);
  }
};
