const yup = require('yup');

const createKaryawanSchema = yup.object({
  nama: yup.string().required('Nama wajib diisi'),
  email: yup.string().email().required('Email wajib diisi'),
  password: yup.string().min(6).required('Password wajib diisi'),
  jenis_kelamin: yup.string().oneOf(['L', 'P']).required('Jenis kelamin wajib diisi'),
  id_divisi: yup.number().required('Divisi wajib dipilih'),
  alamat: yup.string().required('Alamat wajib diisi'),
  no_telp: yup.string().required('No. telepon wajib diisi'),
  no_rekening: yup.string().required('No. rekening wajib diisi'),
  // Tambah field lain jika perlu
});

module.exports = { createKaryawanSchema };
