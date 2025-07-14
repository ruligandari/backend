const prisma = require('../prisma');

const getJumlahMasukBulanan = async (start, end) => {
  const data = await prisma.absensi.findMany({
    where: {
      jam_masuk: { not: undefined },
      tanggal: {
        gte: start,
        lt: end,
      },
    },
    distinct: ['id_karyawan'],
    select: { id_karyawan: true },
  });
  return data.length;
};

const getJumlahKeluarBulanan = async (start, end) => {
  const data = await prisma.absensi.findMany({
    where: {
      jam_keluar: { not: undefined },
      tanggal: {
        gte: start,
        lt: end,
      },
    },
    distinct: ['id_karyawan'],
    select: { id_karyawan: true },
  });
  return data.length;
};

const getJumlahMasukHarian = async (date) => {
  const data = await prisma.absensi.findMany({
    where: {
      jam_masuk: { not: undefined },
      tanggal: date,
    },
    distinct: ['id_karyawan'],
    select: { id_karyawan: true },
  });
  return data.length;
};

const getJumlahKeluarHarian = async (date) => {
  const data = await prisma.absensi.findMany({
    where: {
      jam_keluar: { not: undefined },
      tanggal: date,
    },
    distinct: ['id_karyawan'],
    select: { id_karyawan: true },
  });
  return data.length;
};

module.exports = {
  getJumlahMasukBulanan,
  getJumlahKeluarBulanan,
  getJumlahMasukHarian,
  getJumlahKeluarHarian,
};
