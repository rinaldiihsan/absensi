const express = require('express');
const { getAdmin, postSiswa, putSiswa, putGuru, deleteGuru, deleteSiswa, postGuru, postKepsek, putKepsek, deleteKepsek, loginSiswa, loginGuru } = require('../controller/admin');
const router = express.Router();
const cors = require('cors');

router.get('/admin', cors(), (req, res) => {
  getAdmin(res);
});

router.post('/admin/siswa', cors(), postSiswa);
router.put('/admin/siswa/:nis', cors(), putSiswa);
router.delete('/admin/siswa/:nis', cors(), deleteSiswa);

router.post('/admin/guru', cors(), postGuru);
router.put('/admin/guru/:nip', cors(), putGuru);
router.delete('/admin/guru/:nip', cors(), deleteGuru);

router.post('/admin/kepsek', cors(), postKepsek);
router.put('/admin/kepsek/:nip', cors(), putKepsek);
router.delete('/admin/kepsek/:nip', cors(), deleteKepsek);

router.post('/login/siswa', cors(), loginSiswa);
router.post('/login/guru', cors(), loginGuru);

module.exports = router;
