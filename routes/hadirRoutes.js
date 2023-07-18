const express = require('express');
const { postHadirSiswa, getHadirSiswa, putHadirSiswa, deleteHadirSiswa, postHadirGuru, putHadirGuru, deleteHadirGuru, getHadirGuru } = require('../controller/hadirController');
const router = express.Router();

router.get('/hadir/siswa', (req, res) => {
  getHadirSiswa(res);
});

router.post('/hadir/siswa', postHadirSiswa);
router.put('/hadir/siswa/:nis/:id', putHadirSiswa);
router.delete('/hadir/siswa/:nis/:id', deleteHadirSiswa);

router.get('/hadir/guru', (req, res) => {
  getHadirGuru(res);
});

router.post('/hadir/guru', postHadirGuru);
router.put('/hadir/guru/:nip/:id', putHadirGuru);
router.delete('/hadir/guru/:nip/:id', deleteHadirGuru);

module.exports = router;
