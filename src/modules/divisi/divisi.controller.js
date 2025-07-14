const {
    getAllDivisi,
    getDivisiById,
    createDivisi,
    updateDivisi, 
  } = require('../../models/divisi.model');
const {
    success,
    error,   
} = require('../../utils/response');
const { createDivisiSchema } = require('../../validations/divisiValidation');
const prisma = require('../../prisma');
// GET /api/divisi?page=1&limit=10&search=''
exports.getDivisiList = async (req, res) => {
  try {
    const { page, limit, search } = req.query;
    const result = await getAllDivisi({ page, limit, search });
    return success(res, result, 'Data divisi berhasil diambil');
  } catch (err) {
    console.error(err);
    return error(res, 'Gagal mengambil data divisi', 500);
  }
}
// GET /api/divisi/:id
exports.getDivisiById = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await getDivisiById(id);
    if (!result) return error(res, 'Divisi tidak ditemukan', 404);
    return success(res, result, 'Detail divisi berhasil diambil');
  } catch (err) {
    console.error(err);
    return error(res, 'Gagal mengambil detail divisi', 500);
  }
}
// POST /api/divisi
exports.createDivisi = async (req, res) => {
  try {
    // validasi divisi
    await createDivisiSchema.validate(req.body, { abortEarly: false });
    // create divisi
    const newDivisi = await prisma.divisi.create({
      data: {
        ...req.body,
        created_at: new Date(),
        updated_at: new Date(),
      },
    });
   
    // return success response
    return success(res, newDivisi, 'Divisi berhasil dibuat');
  } catch (err) {
    // error handling
    if (err.name === 'ValidationError') {
      return error(res, err.errors.join(', '), 400);
    }
    console.error(err);
    return error(res, 'Gagal membuat divisi', 500);
  }
}

// PUT /api/divisi/:id
exports.updateDivisi = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedDivisi = await updateDivisi(id, req.body);
    return success(res, updatedDivisi, 'Divisi berhasil diupdate');
  } catch (err) {
    console.error(err);
    return error(res, err.message || 'Gagal mengupdate divisi', 500);
  }
}
// DELETE /api/divisi/:id
exports.deleteDivisi = async (req, res) => {
  try {
    const { id } = req.params;
    await deleteDivisi(id);
    return success(res, null, 'Divisi berhasil dihapus');
  } catch (err) {
    console.error(err);
    return error(res, err.message || 'Gagal menghapus divisi', 500);
  }
}