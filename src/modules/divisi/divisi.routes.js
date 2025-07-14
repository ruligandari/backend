const express = require('express');
const router = express.Router();
const divisiController = require('./divisi.controller');
const { verifyToken } = require('../../middlewares/verifyToken');
const { requireRole } = require('../../middlewares/auth.middleware');
// GET: List semua divisi
router.get(
  '/',
  verifyToken,
  requireRole(['admin', 'superadmin']),
  divisiController.getDivisiList
);
// GET: Detail divisi by ID
router.get(
  '/:id',
  verifyToken,
  requireRole(['admin', 'superadmin']),
  divisiController.getDivisiById
);
// POST: Tambah divisi baru
router.post(
  '/',
  verifyToken,
  requireRole(['admin', 'superadmin']),
  divisiController.createDivisi
);
// PUT: Update divisi by ID
router.put(
  '/:id',
  verifyToken,
  requireRole(['admin', 'superadmin']),
  divisiController.updateDivisi
);
// DELETE: Hapus divisi by ID
router.delete(
  '/:id',
  verifyToken,
  requireRole(['admin', 'superadmin']),
  divisiController.deleteDivisi
);

module.exports = router;