const express = require('express');
const router = express.Router();
const karyawanController = require('./karyawan.controller');
const { verifyToken } = require('../../middlewares/verifyToken');
const { requireRole } = require('../../middlewares/auth.middleware');
const uploadFoto = require('../../middlewares/uploadFoto');

// GET: List semua karyawan (dengan pagination & search)
router.get(
  '/',
  verifyToken,
  requireRole(['admin', 'superadmin']),
  karyawanController.getKaryawanList
);

// GET: Detail karyawan by ID
router.get(
  '/:id',
  verifyToken,
  requireRole(['admin', 'superadmin']),
  karyawanController.getKaryawanById
);

// POST: Tambah karyawan baru
router.post(
  '/',
  verifyToken,
  requireRole(['admin', 'superadmin']),
  ...uploadFoto, // <-- satu middleware saja
  karyawanController.createKaryawan
);

// PUT: Update karyawan by ID
router.put(
  '/:id',
  verifyToken,
  requireRole(['admin', 'superadmin']),
  karyawanController.updateKaryawan
);

// DELETE: Hapus karyawan by ID
router.delete(
  '/:id',
  verifyToken,
  requireRole(['admin', 'superadmin']),
  karyawanController.deleteKaryawan
);

module.exports = router;
