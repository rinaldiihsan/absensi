const express = require('express');
const { postHadirSiswa, getHadirSiswa, putHadirSiswa, deleteHadirSiswa, postHadirGuru, putHadirGuru, deleteHadirGuru } = require('../controller/hadirController');
const router = express.Router();

router.get('/hadir/siswa', (req, res) => {
  getHadirSiswa(res);
});

router.post('/hadir/siswa', postHadirSiswa);
router.put('/hadir/siswa/:nis', putHadirSiswa);
router.delete('/hadir/siswa/:nis', deleteHadirSiswa);

router.post('/hadir/guru', postHadirGuru);
router.put('/hadir/guru/:nip', putHadirGuru);
router.delete('/hadir/guru/:nip', deleteHadirGuru);

module.exports = router;
