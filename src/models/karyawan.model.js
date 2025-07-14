const { Result } = require('express-validator');
const prisma = require('../prisma');

// Ambil semua karyawan dengan pagination dan optional filter
const getAllKaryawan = async ({ page = 1, limit = 10, search = '', id_divisi }) => {
  const take = parseInt(limit);
  const skip = (parseInt(page) - 1) * take;

  const where = {
    AND: [
      search
        ? {
            OR: [
              { nama: { contains: search} },
              { no_karyawan: { contains: search} },
              { email: { contains: search} },
            ],
          }
        : {},
      id_divisi ? { id_divisi: parseInt(id_divisi) } : {},
    ],
  };


  const [rawData, total] = await Promise.all([
    prisma.karyawan.findMany({
      where,
      skip,
      take,
      orderBy: { id: 'desc' },
      include: {
        divisi: { select: { nama_divisi: true } },
      },
    }),
    prisma.karyawan.count({ where }),
  ]);

  const data = rawData.map(({ password, ...karyawan }) => karyawan);
  return {
    data,
    total,
    currentPage: parseInt(page),
    totalPages: Math.ceil(total / take),
  };
};

// Ambil detail karyawan
const getKaryawanById = async (id) => {
  const result = await  prisma.karyawan.findUnique({
    where: { id: parseInt(id) },
    include: {
      divisi: { select: { nama_divisi: true } },
    },
  });

  // jangan tampilkan password

  if (!result){
    return null;
  }
  const { password, ...karyawanWithoutPassword } = result;
  return karyawanWithoutPassword;
};

// Tambah karyawan baru
const createKaryawan = async (data) => {
  return await prisma.karyawan.create({
    data,
  });
};

// Update karyawan
const updateKaryawan = async (id, data) => {
  return await prisma.karyawan.update({
    where: { id: parseInt(id) },
    data,
  });
};

// Hapus karyawan
const deleteKaryawan = async (id) => {
  return await prisma.karyawan.delete({
    where: { id: parseInt(id) },
  });
};

module.exports = {
  getAllKaryawan,
  getKaryawanById,
  createKaryawan,
  updateKaryawan,
  deleteKaryawan,
};
