const cron = require('node-cron');
const { RefreshToken } = require('../models');

/**
 * Check every day at 12:00 if it need to derstroy expired refresh tokens 
 */
module.exports.dailySchedule = () => cron.schedule(
  '0 12 * * *',
  async () => {
    await RefreshToken.destroyExpiredTokens();
  }
); 