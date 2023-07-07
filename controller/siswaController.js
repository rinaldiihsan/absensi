const db = require('../db/koneksi');
const response = require('../src/response');

const getSiswa = (res) => {
  const sql = 'SELECT * FROM siswa';
  db.query(sql, (err, fields) => {
    if (err) throw err;
    response(200, fields, 'siswa get list', res);
  });
};

module.exports = {
  getSiswa,
};
