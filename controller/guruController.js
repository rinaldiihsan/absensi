const db = require('../db/koneksi');
const response = require('../src/response');

const getGuru = (res) => {
  const sql = 'SELECT * FROM guru';
  db.query(sql, (err, fields) => {
    if (err) throw err;
    response(200, fields, 'siswa get list', res);
  });
};

module.exports = {
  getGuru,
};
