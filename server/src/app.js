const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');

const routes = require('./routes');
const { error } = require('./middlewares');
const { dailySchedule } = require('./functions/schedule.fn');
const { inveromentAction } = require('./functions/deployment.fn');

const app = express();

const { CLIENT_DOMAIN } = process.env;
dailySchedule();

app.use(cors({ origin: CLIENT_DOMAIN, credentials: true }));
app.use(express.json());
app.use(cookieParser());
app.use('/public', express.static('public'));

inveromentAction({
  local: {
    action: () => {
      const adminPanel = require('./admin');
      app.use('/admin', adminPanel);
    }
  }
});

app.use('/api', routes);
app.use(error);

module.exports = app;
