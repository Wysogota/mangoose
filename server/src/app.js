const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const adminPanel = require('./adminPanel');
const routes = require('./routes');
const { error } = require('./middlewares');
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
app.use(error);

module.exports = app;
