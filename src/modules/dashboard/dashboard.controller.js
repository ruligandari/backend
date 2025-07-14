const {
  getJumlahMasukBulanan,
  getJumlahKeluarBulanan,
  getJumlahMasukHarian,
  getJumlahKeluarHarian,
} = require('../../models/dashboard.model');

const parseDate = (str) => {
  const [day, month, year] = str.split('-');
  return new Date(`${year}-${month}-${day}`);
};

exports.getDashboardData = async (req, res) => {
  try {
    const { month, startDate, endDate } = req.query;

    let start, end;

    if (startDate && endDate) {
      start = parseDate(startDate);
      end = parseDate(endDate);
      end.setDate(end.getDate() + 1); // Tambah 1 hari agar rentangnya inklusif
    } else if (month) {
      const now = new Date();
      const year = now.getFullYear();
      const monthInt = parseInt(month);
      start = new Date(year, monthInt - 1, 1);
      end = new Date(year, monthInt, 1);
    } else {
      const now = new Date();
      const year = now.getFullYear();
      const monthInt = now.getMonth();
      start = new Date(year, monthInt, 1);
      end = new Date(year, monthInt + 1, 1);
    }

    const today = new Date();
    const dayStart = new Date(today.toISOString().split('T')[0]);

    const masukBulanan = await getJumlahMasukBulanan(start, end);
    const keluarBulanan = await getJumlahKeluarBulanan(start, end);
    const masukHarian = await getJumlahMasukHarian(dayStart);
    const keluarHarian = await getJumlahKeluarHarian(dayStart);

    res.json({
    success: true,
      filter: {
        startDate: start.toISOString(),
        endDate: end.toISOString(),
      },
      bulanan: {
        masuk: masukBulanan,
        keluar: keluarBulanan,
      },
      harian: {
        masuk: masukHarian,
        keluar: keluarHarian,
      },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Gagal memuat data dashboard' });
  }
};
