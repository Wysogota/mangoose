const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const adminPanel = require('./adminPanel');
const routes = require('./routes');
const errorHandler = require('./middlewares/error.handler.mw');
const { dailySchedule } = require('./functions/schedule.fn');

const app = express();

const { CLIENT_PORT, DOMAIN } = process.env;
dailySchedule();

app.use(cors({ origin: `http://${DOMAIN}:${CLIENT_PORT}`, credentials: true }));
app.use(express.json());
app.use(cookieParser());
app.use('/public', express.static('public'));
app.use('/admin', adminPanel);
app.use('/api', routes);
app.use(errorHandler);

module.exports = app;
