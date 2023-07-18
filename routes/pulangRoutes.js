const express = require('express');
const { postPulangSiswa, putPulangGuru, putPulangSiswa, deletePulangSiswa, postPulangGuru, deletePulangGuru, getPulangSiswa, getPulangGuru } = require('../controller/pulangController');
const router = express.Router();

router.get('/pulang/siswa', (req, res) => {
  getPulangSiswa(res);
});

router.post('/pulang/siswa', postPulangSiswa);
router.put('/pulang/siswa/:nis/:id', putPulangSiswa);
router.delete('/pulang/siswa/:nis/:id', deletePulangSiswa);

router.get('/pulang/guru', (req, res) => {
  getPulangGuru(res);
});
router.post('/pulang/guru', postPulangGuru);
router.put('/pulang/guru/:nip/:id', putPulangGuru);
router.delete('/pulang/guru/:nip/:id', deletePulangGuru);

module.exports = router;
