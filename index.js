const express = require('express');
const app = express();
const api = require('./src/app');
const cors = require('cors');

app.use(cors());

app.use(api);
