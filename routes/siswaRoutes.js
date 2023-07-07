const express = require('express');
const { getSiswa } = require('../controller/siswaController');
const router = express.Router();

router.get('/siswa', (req, res) => {
  getSiswa(res);
});

module.exports = router;
