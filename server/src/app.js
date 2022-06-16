const express = require('express');
const cors = require('cors');
const router = require('./router');
const errorHandler = require('./middlewares/error.handler.mw');

const app = express();

app.use(cors());
app.use(express.json());
app.use('/public', express.static('public'));
app.use(router);
app.use(errorHandler);

module.exports = app;
