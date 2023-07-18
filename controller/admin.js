const db = require('../db/koneksi');
const response = require('../src/response');

const getAdmin = (res) => {
  const sql = 'SELECT * FROM admin';
  db.query(sql, (err, fields) => {
    if (err) throw err;
    response(200, fields, 'admin get list', res);
  });
};

//SISWA PAGE

const postSiswa = (req, res) => {
  const { nis, nama_siswa, password } = req.body;
  const sql = 'INSERT INTO siswa (nis, nama_siswa, password) VALUES (?, ?, ?)';
  const values = [nis, nama_siswa, password];

  db.query(sql, values, (err, result) => {
    if (err) {
      response(500, 'invalid', 'error', res);
    } else if (result.affectedRows > 0) {
      const data = {
        isSuccess: result.affectedRows,
        id: result.insertId,
      };
      response(200, data, 'POST DATA SISWA SUCCESS', res);
    } else {
      response(500, 'invalid', 'error', res);
    }
  });
};

const putSiswa = (req, res) => {
  const nis = req.params.nis;
  const { nama_siswa, password } = req.body;

  const sql = `UPDATE siswa SET nama_siswa = '${nama_siswa}', password = '${password}' WHERE nis = ${nis}`;

  db.query(sql, (err, fields) => {
    if (err) response(500, 'invalid', 'error', res);
    if (fields?.affectedRows) {
      const data = {
        isSuccess: fields.affectedRows,
        message: fields.message,
      };
      response(200, data, 'SUCCESS EDIT SISWA', res);
    } else {
      response(404, 'INVALID', 'USER NOT FOUND', res);
    }
  });
};

const deleteSiswa = (req, res) => {
  const nis = req.params.nis;
  const sql = `DELETE FROM siswa WHERE nis = ${nis}`;

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

//GURU
const postGuru = (req, res) => {
  const { nip, nama_guru, password } = req.body;
  const sql = `INSERT INTO guru (nip, nama_guru, password) VALUES  (${nip},'${nama_guru}','${password}')`;

  db.query(sql, (err, fields) => {
    if (err) response(500, 'invalid', 'error', res);
    if (fields?.affectedRows) {
      const data = {
        isSuccess: fields.affectedRows,
        id: fields.insertId,
      };
      response(200, data, 'POST DATA GURU SUCCESS', res);
    }
  });
};

const putGuru = (req, res) => {
  const nip = req.params.nip;
  const { nama_guru, password } = req.body;
  const sql = `UPDATE guru SET nama_guru = '${nama_guru}', password = '${password}' WHERE nip = ${nip}`;

  db.query(sql, (err, fields) => {
    if (err) response(500, 'invalid', 'error', res);
    if (fields?.affectedRows) {
      const data = {
        isSuccess: fields.affectedRows,
        message: fields.message,
      };
      response(200, data, 'SUCCESS EDIT GURU', res);
    } else {
      response(404, 'INVALID', 'USER NOT FOUND', res);
    }
  });
};

const deleteGuru = (req, res) => {
  const nip = req.params.nip;
  const sql = `DELETE FROM guru WHERE nip = ${nip}`;

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

//Kepsek
const postKepsek = (req, res) => {
  const { nip, nama_kepsek, password } = req.body;
  const sql = `INSERT INTO guru (nip, nama_kepsek, password) VALUES  (${nip},'${nama_kepsek}','${password}')`;

  db.query(sql, (err, fields) => {
    if (err) response(500, 'invalid', 'error', res);
    if (fields?.affectedRows) {
      const data = {
        isSuccess: fields.affectedRows,
        id: fields.insertId,
      };
      response(200, data, 'POST DATA GURU SUCCESS', res);
    }
  });
};

const putKepsek = (req, res) => {
  const nip = req.params.nip;
  const { nama_kepsek, password } = req.body;
  const sql = `UPDATE guru SET nama_guru = '${nama_kepsek}, password = '${password}' WHERE nip = ${nip}`;

  db.query(sql, (err, fields) => {
    if (err) response(500, 'invalid', 'error', res);
    if (fields?.affectedRows) {
      const data = {
        isSuccess: fields.affectedRows,
        message: fields.message,
      };
      response(200, data, 'SUCCESS EDIT GURU', res);
    } else {
      response(404, 'INVALID', 'USER NOT FOUND', res);
    }
  });
};

const deleteKepsek = (req, res) => {
  const nip = req.params.nip;
  const sql = `DELETE FROM kepsek WHERE nip = ${nip}`;

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
  getAdmin,
  postSiswa,
  putSiswa,
  deleteSiswa,
  postGuru,
  putGuru,
  deleteGuru,
  postKepsek,
  putKepsek,
  deleteKepsek,
};
