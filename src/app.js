const express = require('express');
const app = express();
const port = 4100;
const bodyParser = require('body-parser');
const cors = require('cors');

app.use(cors());

app.use(bodyParser.json());

const adminRoutes = require('../routes/adminRoutes');
const guruRoutes = require('../routes/guruRoutes');
const siswaRoutes = require('../routes/siswaRoutes');
const hadirRoutes = require('../routes/hadirRoutes');
const pulangRoutes = require('../routes/pulangRoutes');

app.get('/', (req, res) => {
  res.send('Selamat Datang di API absensi');
});

//routes
app.use(adminRoutes);
app.use(guruRoutes);
app.use(siswaRoutes);
app.use(hadirRoutes);
app.use(pulangRoutes);

app.listen(port, () => {
  console.log(`Server sedang berjalan di port ${port}`);
});

module.exports = app;
