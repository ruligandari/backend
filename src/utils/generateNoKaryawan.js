const prisma = require('../prisma');

const generateNoKaryawan = async () => {
  const lastKaryawan = await prisma.karyawan.findFirst({
    orderBy: { id: 'desc' },
    select: { no_karyawan: true },
  });

  let lastNumber = 0;

  if (lastKaryawan?.no_karyawan) {
    const match = lastKaryawan.no_karyawan.match(/QYM-(\d+)/);
    if (match) {
      lastNumber = parseInt(match[1]);
    }
  }

  const newNumber = lastNumber + 1;
  return `QYM-${newNumber.toString().padStart(4, '0')}`;
};

module.exports = generateNoKaryawan;
