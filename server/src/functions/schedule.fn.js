const cron = require('node-cron');
const { RefreshToken } = require('../models');

/* 12:00 every day */
module.exports.dailySchedule = () => cron.schedule(
  '0 12 * * *',
  async () => {
    await RefreshToken.destroyExpiredTokens();
  }
); 