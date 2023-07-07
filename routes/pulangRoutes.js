const express = require('express');
const { postPulangSiswa, putPulangGuru, putPulangSiswa, deletePulangSiswa, postPulangGuru, deletePulangGuru } = require('../controller/pulangController');
const router = express.Router();

router.get('/pulang/siswa', (req, res) => {
  getHadirSiswa(res);
});

router.post('/pulang/siswa', postPulangSiswa);
router.put('/pulang/siswa/:nis', putPulangSiswa);
router.delete('/pulang/siswa/:nis', deletePulangSiswa);

router.post('/pulang/guru', postPulangGuru);
router.put('/pulang/guru/:nip', putPulangGuru);
router.delete('/pulang/guru/:nip', deletePulangGuru);

module.exports = router;
