const express = require('express');
const { query } = require('express-validator');
const router = express.Router();

const { getDashboardData } = require('./dashboard.controller');
const { verifyToken } = require('../../middlewares/verifyToken');
const { requireRole } = require('../../middlewares/auth.middleware');

router.get(
  '/',
  [
    query('month').optional().isInt({ min: 1, max: 12 }),
    query('startDate').optional().isString(),
    query('endDate').optional().isString(),
  ],
  verifyToken,
  requireRole(['admin', 'superadmin']),
  getDashboardData
);

module.exports = router;
