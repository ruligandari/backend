// src/routes/index.js
const express = require('express');
const router = express.Router();

const authRoutes = require('../modules/auth/auth.routes');
const dashboardRoutes = require('../modules/dashboard/dashboard.routes');
const karyawanRoutes = require('../modules/karyawan/karyawan.routes');
const divisiRoutes = require('../modules/divisi/divisi.routes');
// const karyawanRoutes = require('../modules/karyawan/karyawan.routes');
// const absensiRoutes = require('../modules/absensi/absensi.routes');
// const gajiRoutes = require('../modules/gaji/gaji.routes');

router.use('/auth', authRoutes);
router.use('/dashboard', dashboardRoutes);
router.use('/karyawan', karyawanRoutes);
router.use('/divisi', divisiRoutes);
// router.use('/karyawan', karyawanRoutes);
// router.use('/absensi', absensiRoutes);
// router.use('/gaji', gajiRoutes);

module.exports = router;
