const express = require('express');
const { getGuru } = require('../controller/guruController');
const router = express.Router();

router.get('/guru', (req, res) => {
  getGuru(res);
});

module.exports = router;
