const { Result } = require('express-validator');
const prisma = require('../prisma');

// Ambil semua divisi dengan pagination dan optional filter
const getAllDivisi = async ({ page = 1, limit = 10, search = '' }) => {
  const take = parseInt(limit);
  const skip = (parseInt(page) - 1) * take;

  const where = search
    ? {
        nama_divisi: {
          contains: search,
          mode: 'insensitive',
        },
      }
    : {};

  const [data, total] = await Promise.all([
    prisma.divisi.findMany({
      where,
      skip,
      take,
      orderBy: { id: 'desc' },
    }),
    prisma.divisi.count({ where }),
  ]);

  return {
    data,
    total,
    currentPage: parseInt(page),
    totalPages: Math.ceil(total / take),
  };
};

// create divisi baru
const createDivisi = async (data) => {
  const { nama_divisi } = data;

  // validasi nama divisi tidak boleh kosong
  if (!nama_divisi) {
    throw new Error('Nama divisi tidak boleh kosong');
  }

  return await prisma.divisi.create({
    data: {
      nama_divisi,
    },
  });
}

// update divisi
const updateDivisi = async (id, data) => {
  const { nama_divisi } = data;

  // validasi nama divisi tidak boleh kosong
  if (!nama_divisi) {
    throw new Error('Nama divisi tidak boleh kosong');
  }

  return await prisma.divisi.update({
    where: { id: parseInt(id) },
    data: {
      nama_divisi,
    },
  });
}

// delete divisi
const deleteDivisi = async (id) => {
  return await prisma.divisi.delete({
    where: { id: parseInt(id) },
  });
}
// get divisi by ID
const getDivisiById = async (id) => {
  const result = await prisma.divisi.findUnique({
    where: { id: parseInt(id) },
  });

  if (!result) {
    return null;
  }
  
  return result;
}

module.exports = {
  getAllDivisi,
  createDivisi,
  updateDivisi,
  deleteDivisi,
  getDivisiById,
};