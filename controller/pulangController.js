const db = require('../db/koneksi');
const response = require('../src/response');

//pulangSiswa
const getPulangSiswa = (res) => {
  const sql = 'SELECT * FROM pulang_siswa';
  db.query(sql, (err, fields) => {
    if (err) throw err;
    response(200, fields, 'siswa get list', res);
  });
};

const postPulangSiswa = (req, res) => {
  const { nis, keterangan } = req.body;

  // Mencari data siswa berdasarkan nis
  const findSiswaSql = 'SELECT nama_siswa FROM siswa WHERE nis = ?';
  const findSiswaValues = [nis];

  db.query(findSiswaSql, findSiswaValues, (err, result) => {
    if (err) {
      response(500, 'invalid', 'error', res);
    } else if (result.length > 0) {
      const { nama_siswa } = result[0];

      // Memasukkan data hadir_siswa ke dalam tabel
      const insertPulangSiswaSql = 'INSERT INTO pulang_siswa (nis, nama_siswa, keterangan) VALUES (?, ?, ?)';
      const insertPulangSiswaValues = [nis, nama_siswa, keterangan];

      db.query(insertPulangSiswaSql, insertPulangSiswaValues, (err, result) => {
        if (err) {
          response(500, 'invalid', 'error', res);
        } else if (result.affectedRows > 0) {
          const data = {
            isSuccess: result.affectedRows,
            id: result.insertId,
          };
          response(200, data, 'POST DATA PULANG SISWA SUCCESS', res);
        } else {
          response(500, 'invalid', 'error', res);
        }
      });
    } else {
      response(404, 'invalid', 'Siswa not found', res);
    }
  });
};

const putPulangSiswa = (req, res) => {
  const nis = req.params.nis;
  const { keterangan } = req.body;

  const sql = `UPDATE pulang_siswa SET keterangan = '${keterangan}' WHERE nis = ${nis}`;

  db.query(sql, (err, fields) => {
    if (err) response(500, 'invalid', 'error', res);
    if (fields?.affectedRows) {
      const data = {
        isSuccess: fields.affectedRows,
        message: fields.message,
      };
      response(200, data, 'SUCCESS EDIT PULANG SISWA', res);
    } else {
      response(404, 'INVALID', 'USER NOT FOUND', res);
    }
  });
};

const deletePulangSiswa = (req, res) => {
  const nis = req.params.nis;
  const sql = `DELETE FROM pulang_siswa WHERE nis = ${nis}`;

  db.query(sql, (err, fields) => {
    if (err) response(500, 'INVALID', 'ERROR', res);
    if (fields?.affectedRows) {
      const data = {
        isDelete: fields.affectedRows,
      };
      response(200, data, 'SUCCESS DELETE DATA', res);
    } else {
      response(404, 'USER NOT FOUND', 'ERROR', res);
    }
  });
};

//hadirGuru
const getPulangGuru = (res) => {
  const sql = 'SELECT * FROM pulang_guru';
  db.query(sql, (err, fields) => {
    if (err) throw err;
    response(200, fields, 'guru get list', res);
  });
};

const postPulangGuru = (req, res) => {
  const { nip, keterangan } = req.body;

  // Mencari data guru berdasarkan nis
  const findGuruSql = 'SELECT nama_guru FROM guru WHERE nip = ?';
  const findGuruValues = [nip];

  db.query(findGuruSql, findGuruValues, (err, result) => {
    if (err) {
      response(500, 'invalid', 'error', res);
    } else if (result.length > 0) {
      const { nama_guru } = result[0];

      // Memasukkan data hadir_guru ke dalam tabel
      const insertPulangGuruSql = 'INSERT INTO pulang_guru (nip, nama_guru, keterangan) VALUES (?, ?, ?)';
      const insertPulangGuruValues = [nip, nama_guru, keterangan];

      db.query(insertPulangGuruSql, insertPulangGuruValues, (err, result) => {
        if (err) {
          response(500, 'invalid', 'error', res);
        } else if (result.affectedRows > 0) {
          const data = {
            isSuccess: result.affectedRows,
            id: result.insertId,
          };
          response(200, data, 'POST DATA PULANG GURU SUCCESS', res);
        } else {
          response(500, 'invalid', 'error', res);
        }
      });
    } else {
      response(404, 'invalid', 'guru not found', res);
    }
  });
};

const putPulangGuru = (req, res) => {
  const nip = req.params.nip;
  const { keterangan } = req.body;

  const sql = `UPDATE pulang_guru SET keterangan = '${keterangan}' WHERE nip = ${nip}`;

  db.query(sql, (err, fields) => {
    if (err) response(500, 'invalid', 'error', res);
    if (fields?.affectedRows) {
      const data = {
        isSuccess: fields.affectedRows,
        message: fields.message,
      };
      response(200, data, 'SUCCESS EDIT PULANG GURU', res);
    } else {
      response(404, 'INVALID', 'USER NOT FOUND', res);
    }
  });
};

const deletePulangGuru = (req, res) => {
  const nip = req.params.nip;
  const sql = `DELETE FROM pulang_guru WHERE nip = ${nip}`;

  db.query(sql, (err, fields) => {
    if (err) response(500, 'INVALID', 'ERROR', res);
    if (fields?.affectedRows) {
      const data = {
        isDelete: fields.affectedRows,
      };
      response(200, data, 'SUCCESS DELETE DATA', res);
    } else {
      response(404, 'USER NOT FOUND', 'ERROR', res);
    }
  });
};

module.exports = {
  getPulangSiswa,
  postPulangSiswa,
  putPulangSiswa,
  deletePulangSiswa,
  getPulangGuru,
  postPulangGuru,
  putPulangGuru,
  deletePulangGuru,
};
