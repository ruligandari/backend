// src/utils/response.js

exports.success = (res, data = null, message = 'Berhasil', extra = {}) => {
  return res.status(200).json({
    success: true,
    message,
    data,
    ...extra,
  });
};

exports.error = (res, message = 'Terjadi kesalahan', status = 500, errors = null) => {
  return res.status(status).json({
    success: false,
    message,
    errors,
  });
};
