const express = require('express');
const { getAdmin, postSiswa, putSiswa, putGuru, deleteGuru, deleteSiswa, postGuru, postKepsek, putKepsek, deleteKepsek } = require('../controller/admin');
const router = express.Router();

router.get('/admin', (req, res) => {
  getAdmin(res);
});

router.post('/admin/siswa', postSiswa);
router.put('/admin/siswa/:nis', putSiswa);
router.delete('/admin/siswa/:nis', deleteSiswa);

router.post('/admin/guru', postGuru);
router.put('/admin/guru/:nip', putGuru);
router.delete('/admin/guru/:nip', deleteGuru);

router.post('/admin/kepsek', postKepsek);
router.put('/admin/kepsek/:nip', putKepsek);
router.delete('/admin/kepsek/:nip', deleteKepsek);

module.exports = router;
