const express = require('express');
const cors = require('cors');
const routes = require('./routes');
const errorHandler = require('./middlewares/error.handler.mw');
const { dailySchedule } = require('./functions/schedule.fn');

const app = express();

dailySchedule();

app.use(cors());
app.use(express.json());
app.use('/public', express.static('public'));
app.use('/api', routes);
app.use(errorHandler);

module.exports = app;
