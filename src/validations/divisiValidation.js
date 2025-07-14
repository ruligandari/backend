const yup = require('yup');
const { karyawan } = require('../prisma');

const createDivisiSchema = yup.object({
  nama_divisi: yup.string().required('Nama divisi wajib diisi'),
  tipe_gaji: yup.string().required('Tipe gaji wajib diisi'),
});

module.exports = { createDivisiSchema };