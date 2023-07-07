const db = require('../db/koneksi');
const response = require('../src/response');

const getLokasi = (res) => {
  const sql = 'SELECT * FROM lokasi';
  db.query(sql, (err, fields) => {
    if (err) throw err;
    response(200, fields, 'lokasi get list', res);
  });
};

module.exports = {
  getLokasi,
};
