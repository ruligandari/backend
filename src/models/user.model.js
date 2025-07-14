const prisma = require('../prisma');

const findAdminByUsername = async (username) => {
  return await prisma.admin.findUnique({
    where: { username },
  });
};
const findKaryawanByEmail = async (email) => {
  return await prisma.karyawan.findUnique({
    where: { email },
  });
};

module.exports = {
  findAdminByUsername,
  findKaryawanByEmail,
};