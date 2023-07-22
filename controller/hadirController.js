const db = require('../db/koneksi');
const response = require('../src/response');
const haversineDistance = require('./radius');

//hadirSiswa
const getHadirSiswa = (res) => {
  const sql = 'SELECT * FROM hadir_siswa';
  db.query(sql, (err, fields) => {
    if (err) throw err;
    response(200, fields, 'siswa get list', res);
  });
};

const postHadirSiswa = (req, res) => {
  const { nis, keterangan, latitude, longitude, tanggal } = req.body;

  //latlong
  const allowedLatitude = 4.013948966949593;
  const allowedLongitude = 98.2762727868;
  const maxDistance = 25; // dalam meter

  // Cek koordinat geografis pengguna
  const distance = haversineDistance(latitude, longitude, allowedLatitude, allowedLongitude);
  if (distance > maxDistance) {
    response(403, 'invalid', 'Anda tidak dapat mengirimkan data kehadiran dari lokasi ini', res);
    return;
  }

  // Mencari data siswa berdasarkan nis
  const findSiswaSql = 'SELECT nama_siswa,kelas FROM siswa WHERE nis = ?';
  const findSiswaValues = [nis];

  db.query(findSiswaSql, findSiswaValues, (err, result) => {
    if (err) {
      response(500, 'invalid', 'error', res);
    } else if (result.length > 0) {
      const { nama_siswa, kelas } = result[0];

      // Memasukkan data hadir_siswa ke dalam tabel
      const insertHadirSiswaSql = 'INSERT INTO hadir_siswa (nis, nama_siswa,kelas, keterangan, latitude, longitude, tanggal) VALUES (?, ?, ?, ?, ?, ?, ?)';
      const insertHadirSiswaValues = [nis, nama_siswa, kelas, keterangan, latitude, longitude, tanggal];

      db.query(insertHadirSiswaSql, insertHadirSiswaValues, (err, result) => {
        if (err) {
          response(500, 'invalid', 'error', res);
        } else if (result.affectedRows > 0) {
          const data = {
            isSuccess: result.affectedRows,
            id: result.insertId,
          };
          response(200, data, 'POST DATA HADIR SISWA SUCCESS', res);
        } else {
          response(500, 'invalid', 'error', res);
        }
      });
    } else {
      response(404, 'invalid', 'Siswa not found', res);
    }
  });
};

const putHadirSiswa = (req, res) => {
  const id_hadir = req.params.id;
  const nis = req.params.nis;
  const { keterangan } = req.body;

  // Perbarui data hadir_siswa berdasarkan ID dan NIS
  const sql = 'UPDATE hadir_siswa SET keterangan = ? WHERE id_hadir = ? AND nis = ?  ';
  const updateValues = [keterangan, id_hadir, nis];

  db.query(sql, updateValues, (err, result) => {
    if (err) {
      response(500, 'invalid', 'error', res);
    } else if (result.affectedRows > 0) {
      const data = {
        isSuccess: result.affectedRows,
        message: 'SUCCESS EDIT HADIR SISWA',
      };
      response(200, data, 'SUCCESS EDIT HADIR SISWA', res);
    } else {
      response(404, 'INVALID', 'USER NOT FOUND', res);
    }
  });
};

const deleteHadirSiswa = (req, res) => {
  const id_hadir = req.params.id;
  const nis = req.params.nis;
  const sql = `DELETE FROM hadir_siswa WHERE nis = ${nis} AND id_hadir = ${id_hadir}`;

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
const getHadirGuru = (res) => {
  const sql = 'SELECT * FROM hadir_guru';
  db.query(sql, (err, fields) => {
    if (err) throw err;
    response(200, fields, 'guru get list', res);
  });
};

const postHadirGuru = (req, res) => {
  const { nip, keterangan, latitude, longitude, tanggal } = req.body;

  const allowedLatitude = 4.013948966949593;
  const allowedLongitude = 98.2762727868;
  const maxDistance = 25; // dalam meter

  // Cek koordinat geografis pengguna
  const distance = haversineDistance(latitude, longitude, allowedLatitude, allowedLongitude);
  if (distance > maxDistance) {
    response(403, 'invalid', 'Anda tidak dapat mengirimkan data kehadiran dari lokasi ini', res);
    return;
  }

  // Mencari data guru berdasarkan nis
  const findGuruSql = 'SELECT nama_guru FROM guru WHERE nip = ?';
  const findGuruValues = [nip];

  db.query(findGuruSql, findGuruValues, (err, result) => {
    if (err) {
      response(500, 'invalid', 'error', res);
    } else if (result.length > 0) {
      const { nama_guru } = result[0];

      // Memasukkan data hadir_guru ke dalam tabel
      const insertHadirguruSql = 'INSERT INTO hadir_guru (nip, nama_guru, keterangan,latitude,longitude,tanggal) VALUES (?, ?, ?,?,?,?)';
      const insertHadirguruValues = [nip, nama_guru, keterangan, latitude, longitude, tanggal];

      db.query(insertHadirguruSql, insertHadirguruValues, (err, result) => {
        if (err) {
          response(500, 'invalid', 'error', res);
        } else if (result.affectedRows > 0) {
          const data = {
            isSuccess: result.affectedRows,
            id: result.insertId,
          };
          response(200, data, 'POST DATA HADIR GURU SUCCESS', res);
        } else {
          response(500, 'invalid', 'error', res);
        }
      });
    } else {
      response(404, 'invalid', 'guru not found', res);
    }
  });
};

const putHadirGuru = (req, res) => {
  const id_hadir = req.params.id;
  const nip = req.params.nip;
  const { keterangan } = req.body;

  const sql = `UPDATE hadir_guru SET keterangan = '${keterangan}' WHERE id_hadir = ${id_hadir} AND nip = ${nip} `;

  db.query(sql, (err, fields) => {
    if (err) response(500, 'invalid', 'error', res);
    if (fields?.affectedRows) {
      const data = {
        isSuccess: fields.affectedRows,
        message: fields.message,
      };
      response(200, data, 'SUCCESS EDIT HADIR GURU', res);
    } else {
      response(404, 'INVALID', 'USER NOT FOUND', res);
    }
  });
};

const deleteHadirGuru = (req, res) => {
  const id_hadir = req.params.id;
  const nip = req.params.nip;
  const sql = `DELETE FROM hadir_guru WHERE nip = ${nip} AND id_hadir = ${id_hadir}`;

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
  getHadirSiswa,
  postHadirSiswa,
  putHadirSiswa,
  deleteHadirSiswa,
  getHadirGuru,
  postHadirGuru,
  putHadirGuru,
  deleteHadirGuru,
};
